
// 按钮权限核心思路-所谓按钮权限，就是根据不同登录用户，权限具体到可以操作哪些按钮。
//如何设置按钮权限？通过定义全局的自定义指令，结合后台返回的权限列表，前端是否显示隐藏哪个按钮。1.不同用户进来，后台会返回一个按钮权限列表 2.在前端写自定义指令,在指令函数里里获取按钮权限列表跟页面传入的那个是否匹配，如果匹配不上就不显示该按钮(通过display,none把当前节点隐藏删除掉)。3. 给所有组件里面的按钮绑定自定义指令,从而实现按钮的权限控制。这样当达到了更细一级的按钮控制 

export default {
    //绑定到元素触发的钩子函数(el当前对象,binding当前绑定属性)
    bind(el, bindings) {
        //此处在项目中应该获取接口返回的数据,因为此项目没有接口,本地模拟了数据["creat","edit","delete"]  创建权限 修改权限  删除权限
        const arr = JSON.parse(localStorage.getItem("permission"))
        //当前元素绑定的数据
        const has = bindings.value
        // console.log('绑定对象',el,bindings)
        //判断权限是否存在
        const hasPermission = arr.includes(has)  //返回true或false
        //如果不存在进行隐藏
        if (!hasPermission) {

            el.style.display = "none"
            // 如果绑定的是bind,需要异步获取下。bind它会在渲染完毕之前触发所以将删除元素改为异步
            setTimeout(() => {
                //从父级删除当前元素
                el.parentNode.removeChild(el)
            }, 0);
        }
    }
}