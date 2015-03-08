eventUtil.readyEvent(function(){
	var div=document.getElementById("show").getElementsByClassName('div');
	var p=document.getElementById("show").getElementsByClassName('p');
	var n=p.length;
	for(var i=0;i<n;i++){
		p[i].timer=null;
		eventUtil.addHandler(div[i],"mouseover",function(n){
			 return function(){
			 	
				 startMove(p[n],{'top':0},5);
				 
				 }
		}(i))
		eventUtil.addHandler(div[i],"mouseout",function(n){
			 return function(){
				 startMove(p[n],{'top':-60},5);
				 }
		}(i))
	}
	
});
eventUtil.readyEvent(function(){
	var close=document.getElementById("ico");
	var pic=document.getElementsByClassName('rightAd')[0];
	eventUtil.addHandler(close,'click',function(){
		if(!parseInt(getStyle(pic,'width')) ){
			startMove(pic,{'width':373},10,function(){
			close.className='';})
		}else{
			startMove(pic,{'width':0},10,function(){
			close.className='fh';})
		}
	})
	setTimeout(function(){
		startMove(pic,{'width':0},10,function(){
			close.className='fh';})
	},2000)
});	
eventUtil.readyEvent(function(){
	var lksAd=document.getElementsByClassName("middle")[0];
	var adimg=document.getElementById('adimg');
	var close=document.getElementById("close")
	function lashenguanggao(){
		function createSet(obj,json,v){
			return function(){
				startMove(obj,json,v,function(){
					close.style.display='block'
					adimg.style.display='none';
					});
			}
		}
		startMove(lksAd,{'height':219},50,function(){
			setTimeout(createSet(lksAd,{'height':50},50),2000);
		});
	}
	lashenguanggao();
	var play=document.getElementById("play");
	eventUtil.addHandler(close,'click',function(){
			lksAd.style.display='none';
		})
	eventUtil.addHandler(play,'click',function(){
				close.style.display='none'
				adimg.style.display='block';
				lksAd.style.display='block';
				lksAd.style.height=0+'px';
				lashenguanggao();
	})
})
eventUtil.readyEvent(function(){
	var toTop=document.getElementsByClassName('totop')[0].getElementsByTagName('a');
	for(var i=0;i<toTop.length;i++){
		eventUtil.addHandler(toTop[i],'mouseover',function(){
		this.className='activeTop';
		})
		eventUtil.addHandler(toTop[i],'mouseout',function(){
		this.className='';
		})
	}
	var top1=document.getElementById("toTop");
	var timer=null;
	var isTop=true;
	eventUtil.addHandler(top1,'click',function(){
		this.className='activeTop';
		var osTop,speed;
		timer=setInterval(function(){
			osTop=document.documentElement.scrollTop||document.body.scrollTop;
			speed=Math.ceil(osTop/23);
			if(osTop==0){
				clearInterval(timer);
			}else{
				document.documentElement.scrollTop=document.body.scrollTop-=speed;
				isTop=true;//想要手动的时候不执行，那么就要为程序运行留下标记
			}
		},20)
		})
	eventUtil.addHandler(window,'scroll',function(){
		if(!isTop){
			clearInterval(timer);
		}
		isTop=false;
		osTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(osTop>500){
			for(var i=0;i<toTop.length;i++){
				toTop[i].style.visibility='visible';
			}
		}else{
			for(var i=0;i<toTop.length;i++){
				toTop[i].style.visibility='hidden';
			}
		}
	})
	
})
eventUtil.readyEvent(function(){
	var ourter=document.getElementById("good_show");
	var list=ourter.getElementsByTagName('li');
	for(var i=0;i<list.length;i++){
		eventUtil.addHandler(list[i],'mouseover',function(e){
			var target=eventUtil.getTarget(e);
			for(var i=0;i<list.length;i++){list[i].className='';}
			while(target.tagName!='LI'&&target.tagName!='BODY'){
				target=target.parentNode;
			}
			target.className='big';
		})
	}
})
eventUtil.readyEvent(function(){
	var filter=document.getElementById("filter");
	var jm=document.getElementById("jm");
	var w=jm.offsetWidth;
	var h=jm.offsetHeight;
	var nod=jm,offL=0,offT=0;
	while(nod.tagName!='BODY'){
		offL+=nod.offsetLeft;
		offT+=nod.offsetTop;
		nod=nod.offsetParent;
	}
	eventUtil.addHandler(jm,'mouseenter',function(e){
		var e=eventUtil.getEvent();
		var x=(e.pageX-offL-w/2)*((w>h) ? h/w : 1);//w>h时，将差值缩小比例，使之落入与高度等直径的圆内
		var y=(e.pageY-offT-h/2)*((h>w) ? w/h : 1);
		var direction=Math.round(((Math.atan2(y,x)*180/Math.PI)+180)/90+3)%4;
		//反正切值求得的是弧度，需要转化为角度结果可能为[-135,-45],[-45,0]&&[0,45],[45,135],[-135,-180]&&[135,180]
		//再加上180之后[45,135],[135,180]&&[180,315],[225,315],[45,0]&&[315,360]
		//除以90的原因是因为正好四个象限，是判断四个方向，结果四舍五入的结果为1,2,3,[4||0]
		switch(direction){
			case 0:
				filter.style.top=-113+'px';
				filter.style.right=0;
				startMove(filter,{'top':0},5);
				break;
			case 1:
				filter.style.top=0+'px';
				filter.style.right=-113+'px';
				startMove(filter,{'right':0},5);
				break;
			case 2:
				filter.style.top=113+'px';
				filter.style.right=0;
				startMove(filter,{'top':0},5);
				break;
			case 3:
				filter.style.top=0+'px';
				filter.style.right=113+'px';
				startMove(filter,{'right':0},5);
				break;
				
		}
	})
		eventUtil.addHandler(jm,'mouseleave',function(e){
		var e=eventUtil.getEvent();
		var x=(e.pageX-offL-w/2)*((w>h) ? h/w : 1);//当w
		var y=(e.pageY-offT-h/2)*((h>w) ? w/h : 1);
		var direction=Math.round(((Math.atan2(y,x)*180/Math.PI)+180)/90+3)%4;
		switch(direction){
			case 0:
				filter.style.top=0+'px';
				filter.style.right=0+'px';
				startMove(filter,{'top':-113},5);
				break;
			case 1:
				filter.style.top=0+'px';
				filter.style.right=0+'px';
				startMove(filter,{'right':-113},5);
				break;
			case 2:
				filter.style.top=0+'px';
				filter.style.right=0+'px';
				startMove(filter,{'top':113},5);
				break;
			case 3:
				filter.style.top=0+'px';
				filter.style.right=0+'px';
				startMove(filter,{'right':113},5);
				break;
				
		}
	})
	
	

})
eventUtil.readyEvent(function(){
	upade_page('page',page);
})
eventUtil.readyEvent(function(){
	//声明变量
	var container=document.getElementById("LB");
	var list=container.getElementsByTagName('ul')[0];
	var buttons=document.getElementById("button").getElementsByTagName('span');
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var index=1,len=5,animated=false,interval=3000;
	var timer;
	//匀速运动
	function animate(offset){
		animated=true;
		var newleft=parseInt(list.style.left)+offset;
		var time=400;//位移总时间
		var interval=10;//位移间隔时间
		var speed=offset/(time/interval);
//		var speed=offset>0?Math.ceil(offset/(time/interval)):Math.floor(offset/(time/interval));//这个不像是缓冲运动，除完后，结果会变，这个是固定的常值,而且可以是小数
		function go(){
			//速度小于零只能说明offset的值，但是
			//(speed<0&&parseInt(list.style.left)>newleft)||(speed>0&&parseInt(list.style.left)<newleft)
			//直接判断不等为什么不行？因为速度结果可能不是整除，这样，当速度大于零时，一直以固定步速加速，会使得结果在临近目标值时，然后就差一点，导致再加步速，使得结果越过了目标值，也是属于不相等的情况。
			if((speed<0&&parseInt(list.style.left)>newleft)||(speed>0&&parseInt(list.style.left)<newleft)){
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(go,interval)
			}else{
				animated=false;
				list.style.left=newleft+'px';//这个就是为了处理，当判断发现越界，或者正好相等时的情况
				if(newleft>-400){
					list.style.left=-1200+'px';
				}
				if(newleft<-1200){
					list.style.left=-400+'px';
				}
			}
		}
		go();
	}
	//左右箭头
	left.onclick=function(){
		if(!animated){
			if(index==3){
				index=1;
			}else{
				index=index+1;
			}
			showButton();
			animate(-400);			
		}

	}
	right.onclick=function(){
		if(!animated){
			if(index==1){
				index=3
			}else{
				index=index-1;
			}
			showButton();
			animate(400);			
		}

	}
	//亮起小圆点
	function showButton(){
		for(var i=0;i<buttons.length;i++){
			buttons[i].className='';
		}
		buttons[index-1].className='on';
		
	}
	//小圆点事件
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick=function(){
			if(!animated){
				var myIndex=parseInt(this.getAttribute('index'));
				var offset=(myIndex-index)*(-400);
				animate(offset);
				index=myIndex;
				showButton();				
			}

		}
	}
	//自动播放
	function play(){
		timer=setInterval(function(){
			left.onclick();
		},3000)
	}
	function stop(){
		clearInterval(timer);
	}
	eventUtil.addHandler(container,'mouseover',stop);
	eventUtil.addHandler(container,'mouseout',play);
	play();
})