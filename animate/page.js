function Page(total_page,currrnt_page,pager_length,header_length,tailer_length,main_length){
		this.total_page=total_page;
		this.currrnt_page=currrnt_page;
		this.pager_length=pager_length;
		this.header_length=header_length;
		this.tailer_length=tailer_length;
		this.main_length=main_length;
}
var page=new Page(100,10,11,2,2,7);
var tag={
	tag_name:['a','span'],
	tag_class:['','disabled','current',"ellipsis"],
	tag_id:['','prev','next'],
	name:''
}
var i=0;
function filltag(_tagname,_class,_id,_name,_html){
	_class=(_class=='')? '':' class="'+_class+'"';
	_id=(_id=='')? '':' id="'+_id+'"';
	_name=(_name=='')? '':' name="'+_name+'"';
	var code='<'+_tagname+_class+_id+_name+'>'+_html+'</'+_tagname+'>';
	return code;
}
function upade_page(p,page){

	//判断总页数是不是小于分页的长度，若小于，则直接显示
	var code='';
	if(page.total_page<=page.pager_length){
		for(i=0;i<page.total_page;i++){
			code+=(i+1!=page.currrnt_page)?filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i+1):filltag(tag.tag_name[1],tag.tag_class[2],tag.tag_id[0],tag.name,i+1);
		}
	}else{
		var offset=(page.pager_length-1)/2;
		if(page.currrnt_page<=offset+1){
			var tailer='';
			for(i=0;i<page.header_length+page.main_length;i++){
				code+=(i+1!=page.currrnt_page)?filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i+1):filltag(tag.tag_name[1],tag.tag_class[2],tag.tag_id[0],tag.name,i+1);
			}
			code+=filltag(tag.tag_name[1],tag.tag_class[3],tag.tag_id,tag.name,'……')
			for(i=page.total_page;i>page.total_page-page.tailer_length;i--){
				tailer=filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i)+tailer;
			}
			code+=tailer;
		}else if(page.currrnt_page>=page.total_page-offset){
			var header='';
			for(i=0;i<page.header_length;i++){
				header+=filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i+1);
			}
			header+=filltag(tag.tag_name[1],tag.tag_class[3],tag.tag_id[0],tag.name,'……');
			for(i=page.total_page;i>page.total_page-page.main_length-1;i--){
				code=((i!=page.currrnt_page)?filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i):filltag(tag.tag_name[1],tag.tag_class[2],tag.tag_id[0],tag.name,i))+code;
			}
			code=header+code;
		}else{
			var header='';
			var tailer='';
			for(i=0;i<page.header_length;i++){
				header+=filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i+1);								
			}
			header+=filltag(tag.tag_name[1],tag.tag_class[3],tag.tag_id[0],tag.name,'……');	
			for(i=page.total_page;i>page.total_page-page.tailer_length;i--){
				tailer=filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i)+tailer;			
			}
			tailer=filltag(tag.tag_name[1],tag.tag_class[3],tag.tag_id[0],tag.name,'……')+tailer;
			//处理中间：目的是保证生成当前页在main部分的中间。
			var j,partA,partB;
			var count=parseInt((page.main_length-1)/2)+parseInt(page.currrnt_page);
			for(i=j=page.currrnt_page;i<=count;i++,j--){
				partA=(i==j)?filltag(tag.tag_name[1],tag.tag_class[2],tag.tag_id[0],tag.name,i):filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,j)+partA;
				partB+=(i==j)?'':filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[0],tag.name,i);
			}
			code=header+partA+partB+tailer;
		}
	}
	var prev=(page.currrnt_page==1)?filltag(tag.tag_name[1],tag.tag_class[1],tag.tag_id[1],tag.name,'上一页'):filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[1],tag.name,'上一页');
	var next=(page.currrnt_page==page.total_page)?filltag(tag.tag_name[1],tag.tag_class[1],tag.tag_id[2],tag.name,'下一页'):filltag(tag.tag_name[0],tag.tag_class[0],tag.tag_id[2],tag.name,'下一页');
	code=prev+code+next;
	document.getElementById(p).innerHTML=code;
//需要添加一个监听函数，来获得每次单击页码，然后修改page对象内的当前页值
	for(var i=0;i<page.pager_length+2;i++){
		var a=document.getElementById('page').children[i];
		if(parseInt( a.innerHTML)>0)
		eventUtil.addHandler(a,'click',function(){
			page.currrnt_page=this.innerHTML;
			document.getElementById('page').innerHTML='';
			upade_page('page',page);
		})
	}
	var pe=document.getElementById('prev');
	var ne=document.getElementById('next');
	eventUtil.addHandler(pe,'click',function(){
		if(page.currrnt_page!=1){
			page.currrnt_page-=1;
			upade_page('page',page);
		}
	});
	eventUtil.addHandler(ne,'click',function(){
		if(page.currrnt_page!=page.total_page){
			page.currrnt_page+=1;
			upade_page('page',page);
		}
	})
}
