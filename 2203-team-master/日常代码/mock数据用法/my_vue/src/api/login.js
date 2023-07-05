import Server from "./http";
// 登录
const list = () => {
    let data = Server.get("home/catitems")
    return data
}

export {
    list
}