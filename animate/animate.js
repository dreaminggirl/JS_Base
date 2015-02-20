
/*
 * 问题：多次触发事件，会导致速度加快，
 * 原因是第一次创建的setinterval函数依然存在，
 * 再次触发事件会又开启一个setinterval函数，
 * 进而导致每隔30ms加2次步长。
 * 采用offsetleft来获取样式值，是因为，通过style只能获得内嵌样式,
 * getAttribute只能获得属性节点
 * 解决办法：每次触发调用该函数，要取消前面创建的setinterva函数
 
function startMove(){
		var oDiv=document.getElementById('div1');
		timer=setInterval(function(){
			if(oDiv.offsetLeft==0){
				clearInterval(timer);
			}else{
				oDiv.style.left=oDiv.offsetLeft+1+'px';
			}
		},1)
}
*/
/*
 * 判断目标值与目前值的大小比较，来进行速度的正负判断
 
var timer=null
function startMove(itarget){
		clearInterval(timer);
		var oDiv=document.getElementById('div1');
		timer=setInterval(function(){
			speed=0;
			if(oDiv.offsetLeft>itarget){
				speed=-10;
			}else{
				speed=10;
			}
			if(oDiv.offsetLeft==itarget){
				clearInterval(timer);
			}else{
				oDiv.style.left=oDiv.offsetLeft+speed+'px';
			}
		},1)
}*/
/*
 * 透明度：
 
var timer=null;
var alpha=30;
function startMove(itarget){
		clearInterval(timer);
		var oDiv2=document.getElementById('div2');
		timer=setInterval(function(){
			speed=0;
			if(alpha>itarget){
				speed=-10;
			}else{
				speed=10;
			}
			if(alpha==itarget){
				clearInterval(timer);
			}else{
				alpha+=speed;
				oDiv2.style.filter='alpha(opacity='+alpha+')';
				oDiv2.style.opacity=alpha/100;
				alert(alpha/100)
			}
		},30)
}*/
/*
 缓冲运动
 speed=speed>0?Math.ceil(speed):Math.floor(speed);
 默认情况下，不对速度进行设置，那么在浏览器内会对浮点速度值进行四舍五入
 比如当left=-4.5时，四舍五入为5，然后再次计算速度，依旧为0.5，然后left依旧为-4.5
 就这样陷入死循环。
 如果采用解决方法，相反的方法设置，那么会导致speed为0.9时，取0.导致每次增加的步长
 均为0，陷入死循环。
 所以采用解决办法中的办法，使得当为0.9时，值为1，这样逐次逼近，达到效果
 * 
var timer=null
function startMove(itarget){
		clearInterval(timer);
		var oDiv=document.getElementById('div1');
		timer=setInterval(function(){
			speed=(itarget-oDiv.offsetLeft)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed)
			if(oDiv.offsetLeft==itarget){
				clearInterval(timer);
			}else{
				oDiv.style.left=oDiv.offsetLeft+speed+'px';
			}
		},3)
}
*/

/* 多物体运动
 注意：设置自己的定时器，取消自己的定时器
 * 
function startMove(obj,itarget){
		clearInterval(obj.timer);
		var oDiv=document.getElementById('div1');
		obj.timer=setInterval(function(){
			speed=(itarget-obj.offsetWidth)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed)
			if(obj.offsetWidth==itarget){
				clearInterval(timer);
			}else{
				obj.style.width=obj.offsetWidth+speed+'px';
			}
		},30)
}
*/
/* 修改多物体的透明D度

function startMove(obj,itarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			speed=0;
			if(obj.alpha>itarget){
				speed=-1;
			}else{
				speed=1;
			}
			if(obj.alpha==itarget){
				clearInterval(obj.timer);
			}else{
				obj.alpha+=speed;
				obj.style.filter='alpha(opacity='+obj.alpha+')';
				obj.style.opacity=obj. alpha/100;
			}
		},30)
}*/
/* 获取样式
IE9+以及现代浏览器：getComputedStyle(element,null);获取元素的最终计算样式
IE678：lement.currentStyle;
获取某个某个样式属性值（现代浏览器）：可以采用键值的写法，也可以采用.getPropertyvalue('');
但是键值不可以直接访问属性float，而是cssfloat，使用方法访问的话，不能使用键值访问
IE678通过getAttribute方法。
 * 
 * */
function getStyle(obj,attr){
	var oStyle=obj.currentStyle ? obj.currentStyle:getComputedStyle(obj,null);
	if(oStyle.getPropertyValue){
		return oStyle.getPropertyValue(attr) ;
	}else{
		return oStyle.getAttribute(attr);
	}
}
/* 当元素设置宽度后，会发现offset获得的宽度是包括边框以及内边距的
 所以使用getstyle这个方法来获取样式,记住要加parseint啊
 
 * 
function startMove(obj,itarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			speed=(itarget-getStyle(obj,'width'))/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(getStyle(obj,'width')==itarget){
				clearInterval(obj.timer);
			}else{
				obj.style.width=getStyle(obj,'width')+speed+'px';
			}
		},30)
}
*/
/* 透明度与其他属性*/
function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var flag=true;
			for(var attr in json){
				//取当前值
				var icur=0,speed=0;
				if(attr=='opacity'){
					icur=Math.round(parseFloat(getStyle(obj,attr))*100);//去除浮点误差硬性
				}else{
					icur=parseInt(getStyle(obj,attr));
				}
				//计算速度
				speed=(json[attr]-icur)/15;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				//检测停止
				if(icur!=json[attr]){
					flag=false;
				}
				//设置运动
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity='+icur+speed+' )';
					obj.style.opacity=(icur+speed)/100;
				}else{
					obj.style[attr]=icur+speed+'px';
				}
			}
			if(flag){
				clearInterval(obj.timer);
					if(fn){
						fn(); 
					}
			}
		},30)
}













