function setCookie(key,value,days) {
    document.cookie=key+"="+value+";max-age="+days*24*60*60;
}
function getCookie(key) {
    var arr=document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split("=");
        if(arr2[0]==key){
            return arr2[1];
        }
    }
	return '';
}
//3.删除1个cookie
function removeCookie(name){
  setCookie(name,'',-1)
}

//4.删除全部cookie
function removeCookieAll() {
    var arr=document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split("=");
        document.cookie=arr2[0]+"=;max-age=0";
    }
}