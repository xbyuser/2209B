

(function ($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function (options) {
        var elements = this;

        var $container;
        var settings = {
            //  effect_speed:动画执行的时间

            threshold: 0, //用来判断高度的阈值/偏差值...// 提前开始加载
            failure_limit: 0, //执行失败的限制
            event: "scroll",
            effect: "show", //jq效果名
            container: window, //事件容器
            data_attribute: "original", //数据属性
            skip_invisible: true, //跳过不可见
            appear: null, //图片加载前可执行的方法
            load: null, //加载后可执行的方法
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };//占位符 //图片未被加载显示 这里默认是被base64编码过的 字符串形式的图片
        /*
        $("img.lazy").lazyload({
          placeholder : "img/grey.gif", //用图片提前占位
            // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
          effect: "fadeIn", // 载入使用何种效果
            // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
          threshold: 200, // 提前开始加载
            // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
          event: 'click',  // 事件触发时才加载
            // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
          container: $("#container"),  // 对某容器中的图片实现效果
            // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
          failurelimit : 10 // 图片排序混乱时
             // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
        });
        
        */

        //入口
        function update() {
            var counter = 0;
            elements.each(function () {
                var $this = $(this);
                //:visible 选择器选取每个当前是可见的元素。
                if (settings.skip_invisible && !$this.is(":visible")) {
                    //被隐藏的图片不会被加载

                    return; // true && 不可见 跳过   
                }

                if ($.abovethetop(this, settings) || //元素在视口上部
                    $.leftofbegin(this, settings)) { //元素在视口左部
                    // 啥也不干

                } else if (!$.belowthefold(this, settings) && //不在下部
                    !$.rightoffold(this, settings)) { //不在右部  !!出现

                    $this.trigger("appear"); //触发事件

                    counter = 0; //重置

                } else {

                    // 超出限制 跳出循环
                    if (++counter > settings.failure_limit) {//没有在页面上找到元素则视为失败, 计数器自增
                        return false;
                    }
                }
            });

        }

        //合并参数
        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; //判断先前版本的属性  failure_limit
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; //判断先前版本的属性  effect_speed
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        // 获取容器(包含图片的盒子) ===> 未设置默认 window 
        $container = (settings.container === undefined ||
            settings.container === window) ? $window : $(settings.container);

        /* 为容器绑定事件 只限 scroll */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update();
            });
        }

        //遍历图片绑定站位图, 加载事件
        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false; // 为所有图片添加属性 , 一开始还以为是元素就有的mmp

            // 初始化src   #####
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            //one() 方法为被选元素添加一个或多个事件处理程序，并规定当事件发生时运行的函数。每个元素只能运行一次事件处理器函数。
            $self.one("appear", function () {

                if (!this.loaded) {

                    if (settings.appear) { //如果传入方法则调用
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />").bind("load", function () {
                        
                        var original = $self.attr("data-" + settings.data_attribute); //获取到图片地址
                        $self.hide(); // 将元素隐藏

                        if ($self.is("img")) {
                            $self.attr("src", original);
                        } else {
                            $self.css("background-image", "url('" + original + "')");
                        }


                        $self[settings.effect](settings.effect_speed); //根据传入名称, 调用jq对应效果

                        self.loaded = true; //加载完成

                        /*$.grep()过滤数组 获取到未被加载的元素. */
                        var temp = $.grep(elements, function (element) {
                            return !element.loaded;
                        });
                        elements = $(temp);

                        if (settings.load) { //如果传入函数则调用
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings);
                        }
                    })
                        .attr("src", $self.attr("data-" + settings.data_attribute)) //赋值 src ,当该图片被加载完成 调用原始图片赋值
                }
            });

            // 当事件不是scroll 为图片自身绑定触发事件
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* 窗口大小改变 */
        $window.bind("resize", function () {
            update();
        });

        //判断操作平台
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            //当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件 ==> 这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发
            $window.bind("pageshow", function (event) {
                // event.originalEvent jq的event中的原生event
                // persisted只读属性指示网页是否从缓存加载。
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* 文档加载完成. */
        $(document).ready(function () {
            update();
        });

        return this;
    };





    //垂直方向
    $.belowthefold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {

            //获取浏览器滚动距离与视口高度
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {

            //获取传入对比元素最底部top值
            fold = $(settings.container).offset().top + $(settings.container).height();
        }
        // 滚动 + 视口 <= 元素top值 ===>元素在视口下部为true
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        // 滚动 >= 元素底部top值 ===> 元素在视口上部为true
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    //判断水平方向
    $.rightoffold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }
        // 视口宽 + 水平滚动距离 >= 元素左部  ==> 元素在视口右部为true
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.leftofbegin = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        //  水平滚动距离 >= 元素右部  ==> 元素在视口左部为true
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    //视口
    $.inviewport = function (element, settings) {
        //元素 位于视口内部 ==> true
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /**
   * 可以在jQuery.expr['']对象
   *    下扩展jQuery的选择器表达式;这是Sizzle.selectors.filters的别名。
   *    每个新的过滤器表达式都被定义为这个对象的属性。
   *     说白了就是自定义伪类选择器 
   * * */
    $.extend($.expr[":"], {
        "below-the-fold": function (a) { return $.belowthefold(a, { threshold: 0 }); }, //在视口底部以下的元素
        "above-the-top": function (a) { return !$.belowthefold(a, { threshold: 0 }); },//在视口底部以上的元素
        "right-of-screen": function (a) { return $.rightoffold(a, { threshold: 0 }); }, //在视口右部元素
        "left-of-screen": function (a) { return !$.rightoffold(a, { threshold: 0 }); },//在视口右部以内元素
        "in-viewport": function (a) { return $.inviewport(a, { threshold: 0 }); },//在视口以内元素

        /* 版本维护 */
        "above-the-fold": function (a) { return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-fold": function (a) { return $.rightoffold(a, { threshold: 0 }); },
        "left-of-fold": function (a) { return !$.rightoffold(a, { threshold: 0 }); }
    });

})(jQuery, window, document);
