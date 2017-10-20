$(function(){
getBindstatus();
})


function getBindstatus(){
$.ajax({
		url : '/v2/qq/check_is_bind.jso',   
		type : 'post', 
		dataType : 'json', 
		success : function(result) {
		var status=result.state;
		if(status==0){
		var data=result.data;
			if(data==1){
			$('#noBind').show();
			
			}else{
			$('#bindqq').show();
			}
		
		}else{
		}
		
		}
});
}


function bind(){
		$.ajax({
		url : '/v2/qq/get_code.jso',   
		type : 'post', 
		dataType : 'json', 
		success : function(result) {
		var status=result.state;
		var ahref=result.data;
		if(status==0){
		location.href=ahref;
		}
				}
});
}


function showdiv(){
$.popup({
                
                title:'解除QQ登录绑定',
                padding:'0',
                content:$('#showHidediv').html(),
                initialize:function () {
                	
                }
            });


}

function beforeunbind(){
var password=$('#loginpassword').val();
$.ajax({
		url : '/v2/qq/unbindqq.jso',   
		type : 'post', 
		data:{loginPassword:password},
		dataType : 'json', 
		success : function(result) {
		var status=result.state;
		if(status==0){
		//window.location.reload();
		//$("#content2").show();
		window.location.href = '/2.0/views/account/account_settings.shtml?tab=2';
		}else{
		$('#error_icon').show();
		$('#qqunbinderror').html(result.msg);
		}
				}
});
}


function clearErrorTip(){
$('#error_icon').hide();
		$('#qqunbinderror').html("");
}