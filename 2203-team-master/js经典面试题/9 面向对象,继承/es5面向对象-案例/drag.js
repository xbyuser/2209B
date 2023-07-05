function Drag(id){
    this.odiv1=document.getElementById(id);
    this.disx=0;
    this.disy=0;
}
Drag.prototype.init=function(){
    var This = this;
    this.odiv1.onmousedown = function (ev) {
      This.down(ev);
      return false;  //注意放到down事件后,去除默认,防止选中文字
    }
}
Drag.prototype.down=function(ev){
   var This = this;
   var event=ev||window.event;
   this.disx=event.clientX-this.odiv1.offsetLeft;
   this.disy=event.clientY-this.odiv1.offsetTop;
  //调用移动方法-注意事件给到document上面
  document.onmousemove = function (ev) {
      This.move(ev);
    }
  //调用释放方法
  document.onmouseup = function () {
      This.up();
    }
}
//移动
Drag.prototype.move=function(ev){
   var event=ev||window.event;
   this.odiv1.style.left=event.clientX-this.disx+'px';
   this.odiv1.style.top=event.clientY-this.disy+'px'; 
}
//释放
Drag.prototype.up=function(){
  document.onmousemove=null;
  document.onmouseup=null;
  
}
