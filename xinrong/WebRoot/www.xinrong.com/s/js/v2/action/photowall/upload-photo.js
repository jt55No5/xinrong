/**
 * 
 */

var drd;

function checkUserVoice() {
	 
	var user_voice = $.trim($('#user_voice').val());
	var erro_info = "";
	/*if ($('#province').val() == "") {
		erro_info += "请选择省份";
		dis_info(erro_info);
		return false;
	}
	if ($('#city').val() == "") {
		erro_info += "请选择城市";
		dis_info(erro_info);
		return false;
	}*/
	if (user_voice == "") {
		erro_info += "请输入用户心声";
		dis_info(erro_info);
		return false;
	}
	if (60 < user_voice.length) {
		erro_info += "请输入60个字符";
		dis_info(erro_info);
		return false;
	}
	
	if($('#is_upload_photo').val()!=1){
		erro_info += "请上传图片";
		dis_info(erro_info);
		return false;
	}
	
	//subInfo($('#province').val(),$('#city').val(),user_voice);
	subInfo(user_voice);
}
function clear_info() {
	$('#errorinfo').html("");
	$('#error_icon').hide();
 
}

function dis_info(info) {
  
  $('#error_icon').attr("style","diplay:block");
 $('#errorinfo').html("");
 $('#errorinfo').html(info);
 
}



function filechoose() {
	
	
	
	
	$('#file_body').click();
}


function subPhoto(){
	
	
	$.ajaxFileUpload({
        url:'/v2/active/two_bill_upload_user_photo.jso',
        secureuri:false,
        fileElementId:'file_body',
        dataType: 'json',
        success: function(data,status){
           if(data.state==0){
        	   var url=data.data+'?t='+new Date().getTime();
        	   
        	  
        	   
        	   $('#big').attr("src",url);
        	   $('#mid').attr("src",url);
        	   $('#small').attr("src",url);
        	   
        	  
        	   $('#is_upload_photo').val(1);
        	   
        	   
           }else{
        	   dis_info('上传图片失败，文件格式错误或者文件超过5M');
           }
        },
        error: function(data,status,e){
            
            
        }
    });
}


function subInfo(voice){
	
	$.ajax({
		url:AA.Helper.buildUrl('v2/photowall/photo_wall_add.jso'),
		data:{voice:voice},
        type:'POST' ,
        dataType:'json',
        success:function (result) {
        	if(result.state==0){
        		
        		drd.close();
        		
        		initMapVoice();
        	}else {
                dis_info(result.msg);
            }
        }
		 
	});
}

function initMapVoice(){
	
	
	$.ajax({
		url:AA.Helper.buildUrl('v2/photowall/photo_wall_select_province_num.jso'),
		data:{},
        type:'GET' ,
        dataType:'json',
        success:function (result) {
        	
        	for(var i=0;i<result.length;i++){
        		
        		
        		$('.'+result[i].provinceCode).show();
        		
        		$('.'+result[i].provinceCode+" img").attr("src",result[i].photoUrl+"?t="+new Date().getTime());
        		
        		$('.'+result[i].provinceCode+" img").bind('error',{id:result[i].provinceCode+" img"},on_load_error);
        		
        		$('.'+result[i].provinceCode+" font").html(result[i].num);
        		
        		$('.'+result[i].provinceCode+' i').bind('click',{rs:result[i]},show_vioce_list);
        		
        		$('.'+result[i].provinceCode+" img").bind('click',{rs:result[i]},show_vioce_list);
        	}
        	
        	
        	
        	
        }
		 
	});
}

function show_vioce_list(e){
	
	$('.dialogmain').hide();
	
	$.ajax({
		url:AA.Helper.buildUrl('v2/photowall/photo_wall_province_select.jso'),
		data:{num:5,province:e.data.rs.province},
        type:'POST' ,
        dataType:'json',
        success:function (result) {
        	
        	var html='<div id="dialogmain_'+e.data.rs.province+'" class="dialogmain"><h2>投资者用户心声</h2>';
        	
        	for(var i=0;i<result.length;i++){
        		
        		var content=result[i].voice;
        		
        		if(content.length>12){
        			content=content.substr(0,12)+"...";
        		}
        		
        		html+='<dl><dt class="mappic01"><img src="'+result[i].photoUrl+'" onerror="on_load_error_img(this);" /></dt><dd>'+result[i].name+'<p>'+content+'</p></dd><div class="clear"></div></dl>';
        	}
        	
        	html+='<p class="more"><a href="/action/action_21_photowall" class="blue">更多>></a></p><div class="dialogpng"></div><div class="dialogclose" onclick="close_dlg(\'dialogmain_'+e.data.rs.province+'\')"></div></div>';
        	
        	
        	$('.'+e.data.rs.provinceCode).append(html);
        }
		
	});
}

function on_load_error(e){

	$('.'+e.data.id).attr("src","/s/images/action/photowall/pic/m10.jpg");
	

}


function on_load_error_img(img){

	img.src='/s/images/action/photowall/pic/m10.jpg';
	

}


function close_dlg(id){
	
	$('#'+id).hide();
}