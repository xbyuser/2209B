 //1.封装setCookie()方法
 	
 function setCookie(key,value,day){
    var now=new Date();
    now.setDate(now.getDate()+day)
    document.cookie=key+'='+value+';expires='+now;
}
// setCookie('kuige','dashuaige',30);

 
//思考:2.封装getCookie(name)通用方法,传入哪个名字，返回哪个值
//数据:var str='user1=kuige;password=123456;' //传入键，返回值

function getCookie(name)
{
  //'username=abc; password=123456; aaa=123; bbb=4r4er'
  var arr=document.cookie.split('; '); //获取cookie后分割
  var i=0;
  
  //arr->['username=abc', 'password=123456', ...]
  
  for(i=0;i<arr.length;i++)
  {
      //arr2->['username', 'abc']
      var arr2=arr[i].split('=');
      
      if(arr2[0]==name)
      {
          return arr2[1];
      }
  }
  
  return '';
}
// alert(getCookie('password')) //123456

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