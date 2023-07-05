/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 - 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
 */
import { request } from "../../request/http.js";
Page({
   data:{
    inpValue:'',
    goods:[
      // {
      //     "goods_id": 57445,
      //     "cat_id": 9,
      //     "goods_name": "创维（Skyworth）65V9E 65英寸25核4K HDR高清智能电视",
      //     "goods_price": 6499,
      //     "goods_number": 100,
      //     "goods_weight": 100,
      //     "goods_big_logo": "",
      //     "goods_small_logo": "",
      //     "add_time": 1516663280,
      //     "upd_time": 1516663280,
      //     "hot_mumber": 0,
      //     "is_promote": false,
      //     "cat_one_id": 1,
      //     "cat_two_id": 3,
      //     "cat_three_id": 9
      // }
  ],
    hidden:true, //默认隐藏,
   },
   timer:'',
   onLoad(){
     
   },
   //输入内容触发-
   handleInput(e){
      console.log(43,this.data.inpValue);
      //调用异步-!!!注意小程序input框输入后变为[object promise]问题,可单独调用异步方法,不能直接在本方法里写异步 参考 https://blog.csdn.net/lixiaonaaa/article/details/113116094
      if(this.data.inpValue.length>0){
          this.getSearchList()
      }
      
   },
 async getSearchList(){
      //走接口
      let res=await request({url:`goods/search?query=${this.data.inpValue}`})
      console.log('搜索',res);
      if(res.meta.status===200){
        let goods=res.message.goods
        this.setData({
             goods
        })
      } 

  },
  //取消按钮触发
  handleCancel(){
      
  }
})