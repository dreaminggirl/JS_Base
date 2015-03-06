/* 获取样式
IE9+以及现代浏览器：getComputedStyle(element,null);获取元素的最终计算样式
IE678：lement.currentStyle;
获取某个某个样式属性值（现代浏览器）：可以采用键值的写法，也可以采用.getPropertyvalue('');
但是键值不可以直接访问属性float，而是cssfloat，使用方法访问的话，不能使用键值访问
IE678通过getAttribute方法,但是该方法支持的是驼峰显示的属性名字。
.getPropertyvalue支持的是--原生的写法。
使用replace方法只是生成副本并没有真正替换

 * 
 * */

function getStyle(node,attr){
	var pattern=/\-([a-z])/;				
	var ostyle=node.currentStyle?node.currentStyle:getComputedStyle(node,null);
	if(ostyle.getPropertyValue){
		return ostyle.getPropertyValue(attr);
	}else{
		while(pattern.exec(attr)){
			var re=RegExp.$1.toUpperCase();
			attr=attr.replace(pattern,re);
		}
		return ostyle.getAttribute(attr);//IE6~8
	}
}
/* 透明度与其他属性*/
function startMove(obj,json,v,fn){
		clearInterval(obj.timer);//放置速度重复，防止触发多物体运动时妨碍其他物体运动
		//为obj添加属性timer
		obj.timer=setInterval(function(){
			var flag=true;//flag标记，表明目前需要改变的属性值是否均到达目的值
			for(var attr in json){
				//取当前值
				var icur=0,speed=0;
				if(attr=='opacity'){
					icur=Math.round(parseFloat(getStyle(obj,attr))*100);//去除浮点误差硬性
				}else{
					icur=parseInt(getStyle(obj,attr));
				}
				//计算速度
				speed=(json[attr]-icur)/v;
						//分别采用向上取整与向下取整，来保证运动结尾时，速度的绝对值递增1，而不是0
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				//检测是否尚有未到达目标值的属性
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
			}//for结束
			//将需要变动的属性均循环后，需要判断flag值，如果为true，表示该次递增并为修改flag值，即均达到目标值
			//即停止计时器
			if(flag){
				clearInterval(obj.timer);
					if(fn){
						fn(); 
					}
			}
		},30)
}













