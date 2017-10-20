/**
 * 
 */
$(document).ready(function() {
	var obj = GetRequest();  //获取推荐人信息
	if(obj.c || obj.channel){
		get_channel();
	}else{
		if(GetIOSAppVersion()>2)//2.06+版本的ios版本在此设置渠道号
			get_channel();

		var cookie=getCookie("channel");
		
		if(cookie==null||cookie==undefined||cookie==""){
			get_channel();
		}
	} 
	var inviterValue = encodeURIComponent(obj.inviter);
	if(obj.inviter){
		setCookie("inviter",inviterValue);
	}
	
});

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

function getCookie(objName) {// 获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for ( var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName)
			return decodeURIComponent(temp[1]);
	}
}

function get_channel() {
	var channel = getQueryString("channel");

	if (channel == null || channel == undefined || channel == "") {
		channel = getQueryString("c");
	}
	if(channel == null || channel == undefined || channel == "") {
		if(GetIOSAppVersion()>2)
			channel = "hios";
	}

	var referrer = getReferrer();

	if (referrer == null || referrer == undefined || referrer == "") {
		referrer = 'https://www.xinrong.com';
	}
	
	if (channel != null && channel != undefined && channel != "") {
		if (referrer.indexOf('?') < 0) {
			referrer = referrer + '?' + 'xrchannel=' + channel;
		} else {
			referrer = referrer + '&' + 'xrchannel=' + channel;
		}
	}

	setCookie("channel", referrer);
}

function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + encodeURIComponent(value) + ";expires="
			+ exp.toGMTString() + ";path=/";
}

function getReferrer() {
	return document.referrer;
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

function GetIOSAppVersion(){
		var ua = navigator.userAgent.toLowerCase();
		var ver=-1;
		if(ua.match(/XINRONG-IOS/i)=="xinrong-ios") {
			var uaparts=ua.match(/XINRONG-IOS;Ver:(\d+)/i);
			if(uaparts!=null && uaparts.length>0)
			{
				ver=uaparts[1];
			}
			return ver;
	 	} else {
			if(typeof sessionStorage.ios!='undefined' && sessionStorage.ios!="") 
				return sessionStorage.ios;
	 		return ver;
		}
	}
