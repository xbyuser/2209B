// index.js 
Page({
  data: {
    msg:"hello world",
    img:"/images/film.png",
    arr:['a','b','c'],
    list:{a:11,b:22,c:33},
    arrList: [ 
       { a: 44 },
       { a: 55 },
       { a: 66 },
      ],
   isLogin:true,
   item2:'小程序',
   num:0,
   show:false,
   value:'测试双向绑定',
    // 有赞 选择日期（年月日）
   minHour: 10,
   maxHour: 20,
   minDate: new Date().getTime(),
   maxDate: new Date(2019, 10, 1).getTime(),
   currentDate: new Date().getTime(),
   // swiper组件调用数据
   background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
   indicatorDots: true,
   vertical: false,
   autoplay: false,
   circular: false,
   interval: 2000,
   duration: 500,
   previousMargin: 0,
   nextMargin: 0,
  },
 
 //相当于vue里的mouted
  onLoad() {
       console.log('进入页面自动加载的'); 
  },
  //点击自增
  add(){
        this.data.num++  
       console.log(this.data.num); //调用数据，视图不更新
       //对数据进行响应式更新this.setData({data对应的键名:更新的值})
       this.setData({
         num:this.data.num
       })
  },
  // 跳转方法
  go(){
      wx.navigateTo({
        url: '../test2/test2?id=5',
      })
  },
  //跳转tab页-不能传参
  goTab(){
      wx.switchTab({
        url: '../test/test',
      })
  },
  //日期插件触发方法
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onClose() {
    this.setData({ show: false });
  },
 //小程序页面生命周期
  // onLoad: function(options) {
  //   // 生命周期回调—监听页面加载
  // },
  // onReady: function() {
  //   // 生命周期回调—监听页面初次渲染完成
  // },
  // onShow: function() {
  //   // 生命周期回调—监听页面显示
  // },
  // onHide: function() {
  //   // 生命周期回调—监听页面隐藏
  // },
  // onUnload: function() {
  //   // 生命周期回调—监听页面卸载
  // },

})
