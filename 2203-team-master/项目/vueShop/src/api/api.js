import server from './http.js' //导入axios   
//axios基本用法  axios.get('url?key=value'),axios.get('url',{ params:{}})   axios.post('url',{})   axios({url:url,method:get/post,data:{},headers:{Authorization:token},})

//接口要命名规范,-获取数据getLogin,提交数据 setLogin,删除数据 delLogin,列表数据 loginList等
// 登录模块
const getLogin = (msg) => {
    let data = server.post('/login', msg)
    return data
}
//左侧导航
const menusList = () => {
    let data = server.get('/menus')
    return data
}

// 用户模块
//用户列表 {query:'a',pagenum:'1',pagesize:'5'}
const userlist = (params) => {
    //get请求字符串拼接方式
    // let data =  server.get(`/users?query=${params.query}&pagenum=${params.pagenum}&pagesize=${params.pagesize}`)
    // let data =  server.get('/users', {params:params}) //es6中对象键值一样可以省略
    let data = server.get('/users', { params })
    return data
}
//填加用户
const adduser = (msg) => {
    let data = server.post('/users', msg)
    // let data =  server.post('/users', { username: msg.username, password: msg.password, email: msg.email, mobile: msg.mobile })
    return data
}

//修改状态
const changestatus = (msg) => {
    console.log(msg.id);
    // let data =  server.put('users/' + msg.id + '/state/' + msg.status)
    let data = server({ url: `users/${msg.id}/state/${msg.status}`, method: 'put' })
    return data
}
//删除用户
const deluser = (msg) => {
    // let data =  server.delete('users/' + msg)
    let data = server({ url: `users/${msg}`, method: 'delete' })
    return data
}
//根据id查询用户
const getUserById = (msg) => {
    // let data =  server.get('users/' + msg)
    let data = server.get(`users/${msg}`)
    return data
}

//编辑修改用户 {id:'',email:'',mobile:''}
const edituser = (msg) => {
    // let data =  server.put('users/' + msg.id, { email: msg.email, mobile: msg.mobile })
    let data = server({ url: `users/${msg.id}`, data: { email: msg.email, mobile: msg.mobile }, method: 'put' })
    return data
}

//分配角色-前面调用{id:用户id,rid:角色id}
const saverole = (msg) => {
    // let data =  server.put(`users/${msg.id}/role`, { rid: msg.rid })
    let data = server({ url: `users/${msg.id}/role`, data: { rid: msg.rid }, method: 'put' })
    return data
}

//权限管理模块
//角色列表
const roleslist = () => {
    let data = server.get('roles')
    return data
}

//填加角色
const addrole = (msg) => {
    let data = server.post('/roles', { roleName: msg.name, roleDesc: msg.desc })
    return data
}
//编辑角色
const editrole = (msg) => {
    let data = server({
        url: `roles/${msg.id}`, data: { roleName: msg.name, roleDesc: msg.desc }, method: 'put'
    })
    return data
}
//删除角色
const delrole = (msg) => {
    let data = server({ url: `roles/${msg}`, method: 'delete' })
    return data
}
//根据id删除角色({roleId:角色id,rightId:权限id})
const delroleById = (msg) => {
    let data = server({ url: `roles/${msg.roleId}/rights/${msg.rightId}`, method: 'delete' })
    return data
}

//所有权限列表
const allrights = (msg) => {
    let data = server.get(`rights/${msg}`)
    return data
}
//更新角色授权updaterole({id:"",rids:""})
const updaterole = (msg) => {
    let data = server.post(`roles/${msg.id}/rights`, { rids: msg.rids })
    return data
}

//商品管理模块-商品分类
//商品分类列表
const catelist = (msg) => {
    let data = server.get('/categories', msg)
    return data
}
//填加分类
const addcate = (msg) => {
    let data = server.post('/categories', msg)
    return data
}
// 编辑提交分类
const editcate = (msg) => {
    // let data =  server.put('/categories/' + msg.id, { cat_name: msg.name })
    let data = server({ url: `/categories/${msg.id}`, data: { cat_name: msg.name }, method: 'put' })
    return data
}
//删除分类
const delcate = (msg) => {
    let data = server({ url: `/categories/${msg.id}`, method: 'delete' })
    return data
}

//分类参数功能
//参数列表  attrlist({id:cateid,sel:'many'})
const attrlist = (msg) => {
    let data = server.get(`categories/${msg.id}/attributes`, {params:{sel:msg.sel}})
    return data
}
//填加参数或属性
const addattr = (msg) => {
    let data = server.post(`categories/${msg.id}/attributes`, {
        attr_name: msg.attr_name,
        attr_sel: msg.attr_sel
    })
    return data
}
//删除参数或属性
const delattr = (msg) => {
    let data = server({ url: `categories/${msg.cate_id}/attributes/${msg.attr_id}`, method: 'delete' })
    return data
}

//根据id查询参数
const getAttrById = (msg) => {
    let data = server.get(`categories/${msg.cate_id}/attributes/${msg.attr_id}`,
        {
            params: { attr_sel: msg.attr_sel }
        })
    return data
}
//提交更新参数或属性 updateattr({id:分类id,attr_id:属性id,attr_name:属性名,attr_sel:tab项,attr_vals:字符串提交,})
const updateattr = (msg) => {
    let data = server({ url: `categories/${msg.id}/attributes/${msg.attr_id}`, data: { attr_name: msg.attr_name, attr_sel: msg.attr_sel, attr_vals: msg.attr_vals }, method: 'put' })
    return data
}

//商品列表功能
//商品列表接口-此处get接口，用了解构 {params:{}},调用时直接传对象
const goodslist = (params) => {
    let data = server.get(`/goods`, { params })
    return data
}

//填加商品
const addgoods = (msg) => {
    let data = server.post('/goods', msg)
    return data
}
//编辑提交商品
const editgoods = (msg) => {
    console.log(msg);
    let data = server({ url: `/goods/${msg.id}`, data: { goods_name: msg.name, goods_price: msg.price, goods_number: msg.num, goods_weight: msg.weigth }, method: 'put' })
    return data
}
//删除商品
const delgoods = (msg) => {
    let data = server({ url: `/goods/${msg}`, method: 'delete' })
    return data
}


//数据统计功能
const reportlist = () => {
    let data = server.get('reports/type/1')
    return data
}

export {
    getLogin, menusList, userlist, adduser, changestatus, deluser, getUserById, edituser, saverole, roleslist, addrole, editrole, delrole, delroleById, allrights, updaterole, catelist, addcate, editcate, delcate, attrlist, addattr, delattr, getAttrById, updateattr, goodslist, addgoods, editgoods, delgoods, reportlist
}