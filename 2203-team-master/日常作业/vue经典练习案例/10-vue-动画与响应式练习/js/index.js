//定义子组件-模态框作为模板
var appLightbox = Vue.component('appLightbox', {
    template: `<div id='overlay' @click='close'>
        <img :src='imgsource.imgUrl' alt='' />
        <span>{{ imgsource.caption }}</span>
    </div>`,
    //父组件向子组件传值-传哪些值可在props里去定义，props就可接收外部参数
    props: {
        imgsource: Object, //通过对象形式获取父级当前图片信息
        close: Function //通过方法形式调用父级关闭方法
    },
    mounted: function () {
        var overlay = document.getElementById('overlay');
        overlay.setAttribute('style', `height:${window.innerHeight}px;width:${window.innerWidth}px`);
        // console.log(window.innerWidth);
    }
});


var app = new Vue({
    el: '#app',
    components: {
        appLightbox: appLightbox
    },
    data: {
        picdata: [
            {
                id: 1,
                caption: '测试1',
                imgUrl: 'images/1.jpeg'
            },
            {
                id: 2,
                caption: '测试2',
                imgUrl: 'images/2.jpg'
            },
            {
                id: 3,
                caption: '测试3',
                imgUrl: 'images/3.jpeg'
            },
            {
                id: 4,
                caption: '测试4',
                imgUrl: 'images/4.jpeg'
            },
            {
                id: 5,
                caption: '测试5',
                imgUrl: 'images/5.jpg'
            },
            {
                id: 9,
                caption: '测试6',
                imgUrl: 'images/6.jpg'
            }
        ],
        currentPic: '',
        lightBoxToggle: false
    },
    methods: {
        openBox: function (d) {
            this.currentPic = d;
            this.lightBoxToggle = !this.lightBoxToggle;
        },
        closeBox: function () {
            this.lightBoxToggle = false;
        }
    }
});