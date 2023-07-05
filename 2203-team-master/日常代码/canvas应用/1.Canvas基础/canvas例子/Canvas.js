//弧度
function d2a(n)
{
	return n*Math.PI/180;
}

//绘制矩形
function Rect(l, t, w, h, r)
{
	this.left=l||0;
	this.top=t||0;
	this.width=w||0;
	this.height=h||0;
	
	//颜色
	this.background='none';
	this.border='black';
	
	//原点
	this.orginX=this.width/2;
	this.orginY=this.height/2;
	
	//旋转
	this.r=r||0;
}
//该方法继承绘制矩形方法,主要供定时器里调用
Rect.prototype.draw=function (gd)
{
	gd.save();
	
	//颜色
	gd.fillStyle=this.background;
	gd.strokeStyle=this.border;
	
	//变换
	gd.translate(this.left+this.orginX, this.top+this.orginY);
	gd.rotate(d2a(this.r));
	
	//正式画
	if(this.background!='none')
	{
		gd.fillRect(-this.orginX, -this.orginY, this.width, this.height);
	}
	if(this.border!='none')
	{
		gd.strokeRect(-this.orginX, -this.orginY, this.width, this.height);
	}
	
	gd.restore();
};

//-----------------------

function Circle(cx, cy, radius)
{
	this.cx=cx||0;
	this.cy=cy||0;
	this.radius=radius||0;
	
	this.background='none';
	this.border='black';
}

Circle.prototype.draw=function (gd)
{
	gd.beginPath();
	
	gd.fillStyle=this.background;
	gd.strokeStyle=this.border;
	
	gd.arc(this.cx, this.cy, this.radius, 0, 2*Math.PI, false);
	
	if(this.border!='none')
	{
		gd.stroke();
	}
	
	if(this.background!='none')
	{
		gd.fill();
	}
	
	gd.closePath();
};

//-----------------------
//静态调用用
function Canvas(oC)
{
	var _this=this;
	var gd=oC.getContext('2d');
	
	this.arr=[];	//存图形对象
	
	//定时器
	setInterval(function (){
		gd.clearRect(0, 0, oC.width, oC.height);
		
		for(var i=0;i<_this.arr.length;i++)
		{
			_this.arr[i].draw(gd);
		}
	}, 16);
}

Canvas.prototype.add=function (obj)
{
	this.arr.push(obj);
}








