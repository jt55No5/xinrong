/**
 * 
 */

var isOuter = false,gobalPageNum=5;
function load_media_reports(pIndex,pageNum,callback){

	var pageNum=gobalPageNum;

	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(searchString, position){
		  position = position || 0;
		  return this.substr(position, searchString.length) === searchString;
	  };
	}

	$.ajax({
		url:'/v2/report/media_report.jso',
		type:'GET',
		data:{pageSize:pageNum,pageIndex:pIndex,type:0},
		dataType:'json',
		success:function(result){
			
			var html='';
			
			var rs=result.data;
			var titleImage;
			var logoImage;
			for(var i=0;i<rs.length;i++){
				logoImage=rs[i].href;
				html+='<dl>';
				if(rs[i].ext_1!=null && rs[i].ext_1 != ""){
                    titleImage=rs[i].ext_1;
				}else{
                    titleImage="/2.0/images/about/media/General-logo.jpg";
				}
				var content = subContent(removeHTMLTag(rs[i].content),115);
				// if(titleImage!=null && !titleImage.startsWith("/")) titleImage='/'+titleImage;
				// if(logoImage!=null&&!logoImage.startsWith("/")) logoImage='/'+logoImage;
				html+='<img src="'+titleImage+'" width="197" height="137" /></dt>';
				// html+='<dd><h2><a href="/2.0/views/about/media_report_detail_content.shtml?id='+rs[i].id+'&pi='+pIndex+'">'+rs[i].title+'</a></h2>'+subContent(removeHTMLTag(rs[i].content),120)+'<div class="d_font"><span class="left"><img src="'+logoImage+'" width="71" height="35" />'+rs[i].author+'</span><span class="right">——'+AA.Helper.date(rs[i].ctimeLong/1000,'Y-m-d')+'</span></div></dd>';
				html+='<dd><h2><a href="javascript:void(0)" onclick="load_media_report_detail('+rs[i].id+')">'+rs[i].title+'</a></h2>'+content+'<div class="d_font"><span class="left"><img src="'+logoImage+'" width="71" height="35" />&nbsp;</span><span class="right">'+AA.Helper.date(rs[i].ctimeLong/1000,'Y-m-d')+'</span></div></dd>';
				html+='<div class="clear"></div>';
				html+='</dl>';

			}
			
			$('#media_report').html(html);

			scrollToTop();

			if(result.total>1){
        		
       		 	$('#wgt-pagination1').pagination({
           		 'container':'#wgt-pagination1',
                    'pageSize':pageNum ,
                    'total':result.total ,
					'curCls':'pageCur',
                    'pageIndex':pIndex ,
                    'callback':'load_media_reports',
					'callbackExtraArg':callback
                });
			}
			callback && callback(result);
		}
	});
	
}

function load_media_report_detail(id){
	// var id=	GetQueryString('id');
	// var pi=	GetQueryString('pi');
	// if(pi==null) pi=1;
	// $('#back_to_list').attr('href','media_report_content.shtml?pi='+pi);
	if(id!=null&&id!=undefined&&id!=0){
		$.ajax({
			url:'/v2/report/media_report_detail.jso',
			type:'GET',
			data:{mediaId:id},
			dataType:'json',
			success:function(result){
				
				$('#title').html(result.data.title);
				
				$('#author').html(result.data.author);
				$('#source').html(result.data.author);			
				
				$('#ctime').html(AA.Helper.date(result.data.ctimeLong/1000,'Y-m-d'));
				
				$('#mediaDetail').html(aTagAppendBlank(result.data.content));

				toggle_list_detail(false);

			}
		});
		if(isOuter){
			$.ajax({
				url:'/v2/report/media_report_location.jso',
				type:'GET',
				data:{id:id,type:0},
				dataType:'json',
				success:function(result){
					if(result.state == 0){
						var page = Math.ceil(result.data / gobalPageNum);
						load_media_reports(page,gobalPageNum);
					}else{
						load_media_reports(1,gobalPageNum);
					}
				}
			});
			isOuter = false;
		}else{
			var url = "/2.0/views/about/media_report.shtml?di="+id;
			var state = {url:url,showList:false};
			history.replaceState(state,"信融财富媒体报道",url);
		}
	}
}

function toggle_list_detail(showList) {
	if(showList){
		$("#report_detail_div video").trigger("pause");
		$('#report_detail_div').hide();
		$('#report_list_div').fadeIn();
		var url = "/2.0/views/about/media_report.shtml";
		var state = {url:url,showList:true};
		history.replaceState(state,"信融财富媒体报道",url);
		scrollToTop();
	}else{
		$('#report_list_div').hide();
		$('#report_detail_div').fadeIn();
		scrollToTop();
	}
}

function GetQueryString(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	}
function aTagAppendBlank(str) {
	return str = str.replace("<a","<a target='_blank'");
}
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}
function subContent(str,limit) {
	if(str.length > limit){
		str = str.substr(0,limit) + "...";
	}
	return str;
}
function scrollToTop(){
	$('html,body').animate({scrollTop: '200px'}, 600);
}