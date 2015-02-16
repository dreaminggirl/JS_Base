
	var eventUtil={
		readyEvent:function(fn){
			var oldonload=window.onload;
			if(typeof window.onload!='function'){
				window.onload=fn;
			}else{
				window.onload=function(){
					oldonload();
					fn();
				}
			}
		},
		getEvent:function(e){
			return this.getEvent.caller.arguments[0]||window.event;
		},
		getTarget:function(e){
			return e.target||e.srcElement;
		},
		stopPropagation:function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
		},
		preventDefault:function(){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
		},
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element['e'+type]=function(){
					handler.call(this);
				}
				element.attachEvent('on'+type,element['e'+type])
			}else{
				element['on'+type]=handler
			}
		},
		removeHandler:function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}else if(element.detachEvent){
				element.detachEvent('on'+type,element['e'+type]);
				element['e'+type]=null;
			}else{
				element['on'+type]=null;
			}
		},
		addHandlers:function(element,type,handlers){
			var n=handlers.length;
			if(element.addEventListener){
				for (var i=0;i<n;i++) {
					element.addEventListener(type,handlers[i],false);
				}
			}else if(element.attachEvent){
				for (var i=n-1;i>=0;i--) {
					element[i+type]=function(num){
						return function(){
							handlers[num].call(element);
						}
					}(i);
					element.attachEvent('on'+type,element[i+type]);
				}
			}else{
				//
			}
		},
		removeHandlers:function(element,type,handlers){
			var n=handlers.length;
			if(element.removeEventListener){
				for (var i=0;i<n;i++) {
					element.removeEventListener(type,handlers[i],false);
				}
			}else if(element.detachEvent){
				for (var i=n-1;i>=0;i--) {
					element.detachEvent('on'+type,element[i+type]);
					element[i+type]=null;
				}
			}else{
				//
			}
		}
		
	};
