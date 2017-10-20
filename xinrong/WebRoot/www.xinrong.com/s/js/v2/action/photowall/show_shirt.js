/**
 * 
 */



$(document).ready(function() {
   
	loadData(1); 
});


function loadData(pIndex){
	
	if(pIndex<1){
		pIndex=1;
	}
	
	var pageSize=8;
	
	var pic_class=["rotate15","rotatef15","rotate10","rotatef10","rotate5","rotatef5","rotate18","rotatef18"];
	   
	   $.ajax({
			url:AA.Helper.buildUrl('v2/photowall/photo_wall_select.jso'),
			type:'GET',
			data:{pageSize:pageSize,pageIndex:pIndex},
			dataType:'json',
			success:function(result){
				
				if(result.total==null||result.total==undefined||result.total==0){
					return;
				}
				
				var html='';
				
				for(var i=0;i<result.data.length;i++){
					
					html+='<li class="'+pic_class[i]+'">\
						<img src="'+result.data[i].photoUrl+'" width="250" height="250" onerror="on_load_error(this);" />\
						<span class="lifont"><p>'+result.data[i].voice+'</p><div class="paddingli"><span>'+result.data[i].name+'</span>\
						<span>'+AA.Helper.date(result.data[i].time,"Y-m-d")+'</span>\
						</div></span></li>';
						
				}
				
				$('#photo_list').html(html);
	

				var total=result.total;
				
				var pageCount=parseInt(total/pageSize);
				
				if(pageCount>1){
					if(total%pageSize!=0){
						pageCount++;
					}
				}
				
				if(pageCount>1){
					
					var preIndex=pIndex-1;
					
					var html1='';
					
					html1+='<a href="javascript:loadData('+preIndex+');">上一页</a>';
					
					var showCount=5;
					
					//计算中间页码数字           
	                var _midNo = Math.ceil(showCount / 2),
	                    _beginNo = pIndex <= _midNo ? 1 : (pIndex - _midNo + 1),
	                    _endNo = _beginNo + showCount - 1;

	                //结束页码不能大于总页码
	                if (_endNo > pageCount || pageCount <= showCount + 1) {
	                    _endNo = pageCount;
	                }

	                //保证一直有'显示页数'个页码
	                if ((_endNo - _beginNo + 1) < showCount) {
	                    _beginNo = _endNo + 1 - showCount;
	                }

	                _beginNo = _beginNo < 1 ? 1 : _beginNo;
					
	             
	                if (pageCount > showCount + 1 && pIndex >= 4) {
	                	 html1 += '<a href="javascript:loadData(1);">1</a>';
	                        if (_beginNo > 2) {
	                        	 html1 += '<a href="javascript:loadData(2);">2</a>';
	                        }
	                	html1+='<span>...</span>';
	                }
	                
	               
	                
					for(var i=_beginNo;i<=_endNo;i++){
						if(i!=pIndex){
							html1+='<a href="javascript:loadData('+i+');">'+i+'</a>';
							
						}else{
							html1+='<a class="cur" href="javascript:loadData('+i+');">'+i+'</a>';
						}
						
					}
					
					if (pageCount > showCount && (pageCount - pIndex > 2)) {
		                	html1+='<span>...</span>';
	                }
					
					var afterIndex=pIndex+1;
					
					
					html1+='<a href="javascript:loadData('+afterIndex+');">下一页</a>';
					
					
					$('.pagefont').html(html1);
					
					$('.pagefont').show();
				}
			}
	           		 	
	   });
	
	
}


function on_load_error(img){
	img.src='/s/images/action/photowall/pic/m10.jpg';
}