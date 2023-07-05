//动态路由核心-把后端树状结构转成列表结构
export function fn(data) {
    let arr = []
    function deep(data) {
        data.forEach(item => {
            if (item.children.length) {
                //递归开始
                deep(item.children)
            } else {
                //把路径变成自己本地的名字
                let pathBig = item.path.slice(0, 1).toUpperCase() + item.path.slice(1)
                // console.log('首字母大写',pathBig);
                arr.push({
                    path: "/" + item.path,
                    name: item.path,
                    component: () => import(`@/views/list/${pathBig}.vue`)
                    // component: (resolve) => require([`@/views/${pathBig}.vue`], resolve)
                })
            }
        })
    }
    deep(data)
    return arr
}