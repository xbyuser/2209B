//继承父类属性
function limitDrag(id){
   Drag.call(this,id)
}
//继承父类方法-用的拷贝继承
for(var i in Drag.prototype){
  limitDrag.prototype[i]=Drag.prototype[i]
}

//限制范围移动-会覆盖父类的方法move
limitDrag.prototype.move=function(ev){
   var event=ev||window.event;
   var l=event.clientX-this.disx;
   var t=event.clientY-this.disy;
   if(l<0) l=0;
   if(l>document.documentElement.clientWidth-this.odiv1.offsetWidth)   l=document.documentElement.clientWidth-this.odiv1.offsetWidth;
   this.odiv1.style.left=l+'px';
   this.odiv1.style.top=t+'px';
}

