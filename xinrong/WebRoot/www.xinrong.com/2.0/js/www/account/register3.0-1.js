/**
 * 
 */
 var isFirstGetCaptcha=true;
$(function(){
	logout();  
	loadpage();
	bindPasswordInputToggle();
	getInviter();
	
	XR.Global.PageRank("HKU_PC_REGISTER_OPEN");
});

function logout(){
	//var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	var keys=['ci_session','cookie_user_id','ci_session_id','aadai_userid','aadai_username','auth'];
	var exp = new Date(); 
	exp.setTime(exp.getTime() - 1); 
	if (keys) {
		for (var i =  keys.length; i--;){
			document.cookie=keys[i]+'=0;expires=' +exp.toGMTString()+';path=/;';
		}
	}
}
function getInviter(){
	var inviter=GetRequest('inviter');
	if(inviter!=null)
	{
		$("#referee").val(inviter.inviter);
	}
}
function loadpage() {
	$('#img-captcha').unbind('click').click(function(){
		getCaptcha();
	});
	getCaptcha();

	$(document).keyup(function(e) {
		var curKey = e.keyCode;
		if (curKey == 13) {
			registerCheck();
		}
	});
}

function getCaptcha(){
	var seed = new Date().getTime();
	$('#img-captcha').attr('src','/v2/login/get_captcha.raw?seed='+seed);
	$('#seed').val(seed);
}

// 短信验证时间
var msgTime = 120;
// 语音验证时间
var yuyinTime = 120;

function sendCaptcha(){
	var mobilemsg = "";
	var mobilephone = $.trim($("#mobilephone").val());
	
	// 手机号码非空验证
	if ("" == mobilephone) {
		mobilemsg += "请输入手机号码";
		disMobileMsg(mobilemsg);
	 
		return false;
	}
	if ("" != mobilephone) {
		if (11 != mobilephone.length) {
			mobilemsg += "请输入11位手机号码";
			disMobileMsg(mobilemsg);
			 
			return false;
		}
		if (!/^[0-9]+$/.test(mobilephone)) {
			mobilemsg += "手机号码格式不正确";
			disMobileMsg(mobilemsg);
			
			return false;
		} else {
			$('#error_icon').removeClass();
			$('#error_icon').addClass("tsicon01");
			$('#error_icon').show();
		}
	}
	
    var capacha = $.trim($("#capacha").val()); 
    var seed = $.trim($("#seed").val());

	// 验证码非空验证
	if($("#pic_captcha_view").is(":visible")){
		if ("" == capacha) {
			$("#yzm_length").html("请填写图形验证码");
			$("#yzm_length").show();
	 
			getCaptcha();
			return false;
		}
		if ("" != capacha) {
			// 验证码必须为4位的字符
			if (4 != capacha.length) {
				$("#yzm_length").html("请输入4位图形验证码");
				$("#yzm_length").show();
			 
				getCaptcha();
				return false;
			}

			if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(capacha)) {
				$("#yzm_length").html("图形验证码格式不对");
				$("#yzm_length").show();
	 
				getCaptcha();
				return false;
			}
		}
	}
	
	//请求发送验证码
	$.ajax({
		url:'/v2/register/register_tel_captcha_check_ip_and_phone.jso',
		type : 'post',
		dataType : 'json',
		data:{tellPhone:mobilephone,type:0,word:capacha,sd:seed},
		success : function(data) {
			if(data.state == 0){
				countDwonCaptcha();
			}else if(data.state == 2010){
				if(isFirstGetCaptcha){
					isFirstGetCaptcha=false;
					$("#pic_captcha_view").show();
					getCaptcha();
				}else{
					$("#yzm_length").html("图形验证码输入不正确");
					$("#yzm_length").show();
					getCaptcha();
				}
			}else if(data.state == 1007){
				mobilemsg += "手机号码已存在";
				disMobileMsg(mobilemsg);
				getCaptcha();
			}else if(data.state == 2019){
				disMobileMsg("等待120秒后在重试");
				getCaptcha();
			}else{
				disMobileMsg("系统繁忙");
				getCaptcha();
			}
		}
	});
}

function sendYuyin() {
	var mobilemsg = "";
	//请求语音验证码
	var mobilephone = $.trim($("#mobilephone").val());
	
	// 手机号码非空验证
	if ("" == mobilephone) {
		mobilemsg += "请输入手机号码";
		disMobileMsg(mobilemsg);
	 
		return false;
	}
	if ("" != mobilephone) {
		if (11 != mobilephone.length) {
			mobilemsg += "请输入11位手机号码";
			disMobileMsg(mobilemsg);
			 
			return false;
		}
		if (!/^[0-9]+$/.test(mobilephone)) {
			mobilemsg += "手机号码格式不正确";
			disMobileMsg(mobilemsg);
			
			return false;
		} else {
			$('#error_icon').removeClass();
			$('#error_icon').addClass("tsicon01");
			$('#error_icon').show();
		}
	}
	
	var capacha = $.trim($("#capacha").val());
	var seed = $.trim($("#seed").val());
	
	// 验证码非空验证
	if($("#pic_captcha_view").is(":visible")){
		if ("" == capacha) {
			$("#yzm_length").html("请填写图形验证码");
			$("#yzm_length").show();
	 
			getCaptcha();
			return false;
		}
		
		if ("" != capacha) {
			// 验证码必须为4位的字符
			if (4 != capacha.length) {
				$("#yzm_length").html("请输入4位图形验证码");
				$("#yzm_length").show();
			 
				getCaptcha();
				return false;
			}

			if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(capacha)) {
				$("#yzm_length").html("图形验证码格式不对");
				$("#yzm_length").show();
	 
				getCaptcha();
				return false;
			}

		}
	}
	
	//请求发送验证码
	$.ajax({
		url:'/v2/register/register_tel_captcha_check_ip_and_phone.jso',
		type : 'post',
		dataType : 'json',
		data:{tellPhone:mobilephone,type:1,word:capacha,sd:seed},
		success : function(data) {
			if(data.state == 0){
				countDwonYuyin();
				//showVoiceTip();
			}else if(data.state == 2010){
				if(isFirstGetCaptcha){
					isFirstGetCaptcha=false;
					$("#pic_captcha_view").show();
					getCaptcha();
				}else{
					$("#yzm_length").html("图形验证码输入不正确");
					$("#yzm_length").show();
					getCaptcha();
				}
			}else if(data.state == 1007){
				mobilemsg += "手机号码已存在";
				disMobileMsg(mobilemsg);
				getCaptcha();
			}else if(data.state == 2019){
				disMobileMsg("等待120秒后在重试");
				getCaptcha();     
			}else{
				disMobileMsg("系统繁忙"); 
				getCaptcha();
			}
		}
	}); 
}

function showVoiceTip(){
	$('#voice_tip_view').show();
	setTimeout(function(){
		$('#voice_tip_view').hide();
	},100000);
}


// 发送短信验证码倒计时
function countDwonCaptcha() {
	$('#sendYuyinMsg').css("display", "none");
	$('#huo').css("display", "none")

	if (msgTime > 0) {
		$('#sendCaptcha').html('<a href="javascript:void(0);" style="background:#d7d7d7;">(' + msgTime + 's)重发</a>');
		msgTime--;
		setTimeout("countDwonCaptcha()", 1000);
		
		$("#mobilephone").attr("disabled","disabled");
	} else {
		msgTime = 120;
		$('#sendCaptcha').html("<a href='javascript:sendCaptcha()'>短信验证码</a>");
		$('#huo').html('或');
		$('#sendYuyinMsg').html("<a href='javascript:sendYuyin()'>语音验证码</a>");
		$('#sendYuyinMsg').show();
		$('#huo').show();
	}

}




// 发送语音验证码倒计时
function countDwonYuyin() {
	$('#sendCaptcha').css("display", "none");
	$('#huo').css("display", "none")

	if (yuyinTime > 0) {
		$('#sendYuyinMsg').html('<a href="javascript:void(0);" style="background:#d7d7d7;">(' + yuyinTime + 's)重发</a>');
		yuyinTime--;
		setTimeout("countDwonYuyin()", 1000);
		
		$("#mobilephone").attr("disabled","disabled");
	} else {
		yuyinTime = 120;
		$('#sendCaptcha').html("<a href='javascript:sendCaptcha()'>短信验证码</a>");
		$('#huo').html('或');
		$('#sendYuyinMsg').html("<a href='javascript:sendYuyin()'>语音验证码</a>");
		$('#sendCaptcha').show();
		$('#huo').show();
	}

}
// 注册验证
function registerCheck() {

	$('#error_icon').hide();
	var mobilephone = $.trim($("#mobilephone").val());
	var seed = $.trim($("#seed").val());
	var capacha = $.trim($("#capacha").val());
	var mobilecapacha = $.trim($("#mobilecapacha").val());
	var agree = document.getElementById("read_agree").checked;//$('#read_agree').attr('checked')
	var mobilemsg = "";
	var referee = $.trim($("#referee").val());
	// 手机号码非空验证
	if ("" == mobilephone) {
		mobilemsg += "请输入手机号码";
		disMobileMsg(mobilemsg);
		getCaptcha();
		return false;
	}
	if ("" != mobilephone) {
		if (11 != mobilephone.length) {
			mobilemsg += "请输入11位手机号码";
			disMobileMsg(mobilemsg);
			 
			getCaptcha();
			return false;
		}
		if (!/^[0-9]+$/.test(mobilephone)) {
			mobilemsg += "手机号码格式不正确";
			disMobileMsg(mobilemsg);
			getCaptcha();
			return false;
		} else {
			$('#error_icon').removeClass();
			$('#error_icon').addClass("tsicon01");
			$('#error_icon').show();
		}
	}

	// 手机验证码非空验证
	if ("" == mobilecapacha) {
		$("#yy_yzm_length").html("手机验证码不能为空");
		$("#yy_yzm_length").show();
	 
		getCaptcha();
		return false;
	}
	if (mobilecapacha.length != 6) {
		$("#yy_yzm_length").html("请输入6位手机验证码");
		$("#yy_yzm_length").show();
		 
		getCaptcha();
		return false;
	}
	// 协议未勾选验证
	if (true != agree) {
		$("#agree_msg").html("请勾选已阅读并同意《信融财富服务协议》");
		$("#agree_msg").show();
	 
		getCaptcha();
		return false;
	}
	var obj = GetRequest();  
	
	var password = $.trim($("#password").val());
	var passwordmsg = "";


	if (null == password || "" == password) {
		passwordmsg += "请输入密码";
		disPasswordMsg(passwordmsg);
		clearPwdLever();
		return false;

	}

	if (6 > password.length || 16 < password.length) {
		passwordmsg += "密码长度必须为6~16个字符";
		disPasswordMsg(passwordmsg);
		clearPwdLever();
		return false;
	}


	$.ajax({
		url : '/v2/register/register_with_mobile_as_user_name.jso',
		data:{loginPwd:AA.Helper.encrypPw(password),referee:referee,tellPhone:mobilephone,tellCaptcha:mobilecapacha,qdh:obj.c},
		type : 'post',
		dataType : 'json', 
		success : function(data) {
			var result = data.msg;
			var code = data.state;
			if (result == "success") {
				
				// 跳转到下一步
				XR.Global.PageRank("HKU_PC_REGISTER_SUBMIT",function(){location.href = 'registersuc_3.0.shtml';});
				
				
			} else {
				
				
				//再次核对是否成功注册
				validateRegistSuccess(function(rs){
					
					if(rs.state==0){//如果已经登录成功就直接跳转，不提示
						
						XR.Global.PageRank("HKU_PC_REGISTER_SUBMIT",function(){location.href = 'registersuc_3.0.shtml';});
				
					}else{
						
						if (code == "1004") {
							disUsernameMsg(result);
						} else if (code == "1002" || code == "1005") {
							disEmailMsg(result);
						}
						//密码不能为空
						else if(code=="1003"){
							disPasswordMsg(result);
						}
						//用户名包含过滤字符
						else if(code=="1006"){
							disUsernameMsg(result);
						}
						else if(code=="2011"){
							disMobilCaptchaMsg(result);
						}
						else {
							disUsernameMsg(result); 
						}
					}
				});
				
			}
		}
	});

}

function validateRegistSuccess(callback){
	
	$.ajax({
		url : '/v2/member/get_base_info.jso',   
		data:{},
		type : 'post',
		dataType : 'json', 
		success : function(rs) {
			callback(rs);
		}
	});
	
}
function GetRequest() {
	var url = location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function syncPasswords()
{
	if($("#password").is(":visible"))
	{
		$("#password_plain").val($("#password").val());
	}
	else
	{
		$("#password").val($("#password_plain").val());
	}
}
function pwdlever() {
	syncPasswords();
	var score = 0;
	var input = $("#password").val();
	if (input.length >= 6 && input.length <= 16) {
		if (/[a-zA-Z]+/.test(input) && /[0-9]+/.test(input)
				&& /\W+\D+/.test(input)) {
			score = 3;
		} else if (/[a-zA-Z]+/.test(input) || /[0-9]+/.test(input)
				|| /\W+\D+/.test(input)) {
			if (/[a-zA-Z]+/.test(input) && /[0-9]+/.test(input)) {
				score = 2;
			} else if (/\[a-zA-Z]+/.test(input) && /\W+\D+/.test(input)) {
				score = 2;
			} else if (/[0-9]+/.test(input) && /\W+\D+/.test(input)) {
				score = 2;
			} else {
				score = 1;
			}
		}
	} else {
		score = 0;
	}
	disPwdLever(score);

}
function disPwdLever(score) {

	switch (score) {
	case 1:
		$("#soso").removeClass("sebg");
		$("#hard").removeClass("sebg");
		$("#easy").addClass("sebg");
		$("#easy").show();
		break;
	case 2:
		$("#hard").removeClass("sebg");
		$("#easy").removeClass("sebg");
		$("#soso").addClass("sebg");
		$("#soso").show();
		break;
	case 3:
		$("#easy").removeClass("sebg");
		$("#soso").removeClass("sebg");
		$("#hard").addClass("sebg");
		$("#hard").show();
		break;
	default:
		clearPwdLever();

	}
}

function clearPwdLever() {
	$("#soso").removeClass("sebg");
	$("#hard").removeClass("sebg");
	$("#easy").removeClass("sebg");

}
function clearPwdMsg() {

	$("#show_msg_pwd").removeClass("red");
	$("#show_msg_pwd").addClass("cc6c6c6");
	$("#show_msg_pwd").html("6～16个英文字母、数字、特殊字符或其组合");

}
function disMobileMsg(msg) {
	$('#error_icon').removeClass();
	$('#error_icon').addClass("tsicon");
	$('#error_icon').show();
	$('#mobile_msg').removeClass("cc6c6c6");
	$('#mobile_msg').html("");
	$('#mobile_msg').addClass("red")
	$('#mobile_msg').html(msg);
}
// 手机号码录入框获取焦点，去掉错误图标及为空的提示信息
function clearMobileMsg() {
	$("#error_icon").hide();
	$("#mobile_msg").removeClass("red");
	$("#mobile_msg").html("");
	$("#mobile_msg").addClass("cc6c6c6");
	$("#mobile_msg").html("用于接收资金变动信息、重要公告、找回密码等");
}

function disPasswordMsg(msg) {

	$("#show_msg_pwd").removeClass("cc6c6c6");
	$("#show_msg_pwd").addClass("red");
	$("#show_msg_pwd").html(msg);
	$("#show_msg_pwd").show();
}
function disMobilCaptchaMsg(msg) {

	$("#yy_yzm_length").removeClass("cc6c6c6");
	$("#yy_yzm_length").addClass("red");
	$("#yy_yzm_length").html(msg);
	$("#yy_yzm_length").show();
}


// 清除验证码为空的提示信息
function clearYzmMsg() {
	$("#yzm_length").html("");
	$("#yzm_length").hide();
}
// 清除手机验证码为空的提示信息
function clearYyYzmMsg() {
	$("#yy_yzm_length").html("");
	$("#yy_yzm_length").hide();
}
// 清除未勾选协议的提示信息
function clearAgressMsg() {
	$("#agree_msg").html("");
	$("#agree_msg").hide();
}

function disUsernameMsg(msg) {
	$("#error_icon").addClass("tsicon");
	$("#error_icon").show();
	$("#mobile_msg").removeClass("cc6c6c6");
	$("#mobile_msg").addClass("red");
	$("#mobile_msg").html(msg);

}


function bindPasswordInputToggle() {
			$("#password_toggle_open").unbind("click").bind("click",function () {
				syncPasswords();
				$("#password").toggle();
				$("#password_plain").toggle();
				$("#password_toggle_close").toggle();
				$("#password_toggle_open").toggle();
				
			});
			$("#password_toggle_close").unbind("click").bind("click",function () {
				syncPasswords();
				$("#password").toggle();
				$("#password_plain").toggle();
				$("#password_toggle_close").toggle();
				$("#password_toggle_open").toggle();
			});

}


