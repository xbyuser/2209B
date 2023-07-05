// components/TabList/TabList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
       tabs:{
          type:Array,
          value:[]
       }
  },

  /**
   * 组件的初始数据
   */
  data: {
     test:'测试'
  },
  lifetimes: {
     // 在组件实例刚刚被创建时执行 
     created: function () {
         console.log('可以获取data',this.data);
      },
    // 相当于mouted  
    attached: function () {
         console.log('可以获取传过来的props属性',this.data);
     },
  },
  /**
   * 组件的方法列表
   */
  methods: {
       // 点击事件
    handleItemTap(e){
      // 1 获取点击的索引
      console.log('当前索引',e);
      const {index}=e.currentTarget.dataset;
      // 2 触发 父组件中的事件 自定义
       this.triggerEvent('tabsItemChange',index)
    }
  },
//   observers监听properties和data变化
  observers:{
    'tabs': function(val){
      console.log('属性监听',val)
    }
  }
})
