/**
 * @author    : aNd1coder
 * @overview  : 通用快速登录弹层
 * @update    : $Id: dlg_login.js 1500 2013-01-04 08:23:40Z and1coder $
 * @todo      :
 */
(function (AA) {
AA.RapidLogin = {
    isValid:false,
    tip:null,
    failLoginTimes:0,
	commitBtn:undefined,
    initCaptcha:function(){
    	$('#img-captcha').unbind('click').bind("click",function () {
    		AA.RapidLogin.getCaptcha();
        });
    	AA.RapidLogin.getCaptcha();
    },
    getCaptcha:function () {
        var _ph = $('#img-captcha'), _seed = $('#rapid-seed');
        var seed=new Date().getTime();
        _ph.attr('src','/v2/login/get_captcha.raw?seed='+seed);
        _seed.val(seed);
    },
    init:function () {
        var _login = AA.RapidLogin,
            _form = $("#rapid-login-form"),
            _input = _form.find('.ui-form-input'),
            _btn = _form.find(".ui-button");

        _input.eq(0).focus();

        _btn.click(function () {
            _input.each(function () {
                if ($(this).is(":visible") && !_login.validate(this)) {
                    $(this).focus();
                    return false;
                }
            });

            if (_login.isValid) {
            	$.ajax({
            		url:'/v2/login/login.jso',
            		type:'post',
            		dataType:'json',
            		data:{
            			username:_form.find('#rapid-userName').val(),
            			password:AA.Helper.encrypPw(_form.find('#rapid-userPw').val()),
            			captcha:_form.find('#rapid-captcha').val(),
            			seed:_form.find('#rapid-seed').val()
            		},
            		success:function(result){
            			if (result.state == 0) {
                            sessionStorage.setItem('afterAnswer',null);
                        	 $.ajax({
                        	 	url:'/login/api_bbs_login',
                        	 	type:'post',
                        	 	dataType:'json',
                        	 	complete:function(XMLHttpRequest,textStatus){
                        	 		//从bbs登陆，登陆成功后返回bbs页面
                                    var fromBbs = document.location.hash
									if(fromBbs.indexOf('bbs.xinrong.com')>0){
										var bbsUrl = fromBbs.replace(/#frombbs/,'');
										window.location.href = bbsUrl;
                                        return;
                                    }

									var url = document.referrer;
									if( url.indexOf("register")!= -1){
										window.location.href = '/2.0/views/account/account_index.shtml';
									}else if (url.indexOf("/2.0/views/huahua/xr_huahua.html")>-1) {
                                        window.location.href = '/2.0/views/huahua/huahua.html';
									}else if( url != "" || url){
                                        window.location.href = url;
                                    }else{
										window.location.href = "/";
									}
                        	 	}
                        	 });
                        }else {
                        	var msg=result.msg;
													AA.RapidLogin.failLoginTimes=msg.substring(msg.indexOf("登录失败次数：")+7);
													var time=AA.RapidLogin.failLoginTimes;
													if(parseInt(time)>=3){
														$('#captcha_view').show();
													}
                            if(result.state==2010){
                            	_login.warning('验证码有误',$("#cap-error"));
                            	$('#rapid-captcha').val('');
                            	_login.getCaptcha();
        					}else if(result.state==9998||result.state==9999){
        						_login.warning('账户名或密码错误',$("#userPw-error"));
        						$('#rapid-captcha').val('');
        						_login.getCaptcha();
        					}else{
        						_login.warning('账户名或密码错误',$("#userPw-error"));
        						$('#rapid-captcha').val('');
        						_login.getCaptcha();
        					}
                        }
            		}
            	});
            }
            return false;
        });

		AA.RapidLogin.commitBtn = _btn;
		_form[0].onkeydown =	AA.RapidLogin.onKeyDown;
    },
    validate:function (o) {
        var _login = AA.RapidLogin,
            _input = $(o),
            _val = $.trim(_input.val()),
            _label = _input.prevAll('.ui-form-label').html().replace('：','').replace('　',''),
            _len = AA.Helper.getLength(_val);
			AA.RapidLogin.tip = $(o).nextAll(".ui-tip");

        if (_val == "") {
            return _login.warning("请输入" + _label);
        } else {
            if (o.id == 'rapid-userPw' && (_len < 6 || _len > 16)) {
                return _login.warning('登录密码必须为6-16个字符');
            }
            if (o.id == 'rapid-captcha' && _len != 4 && $("#captcha_view").is(":visible")) {
                return _login.warning('验证码必须为4个字符');
            }
            _login.tip.hide();
            _login.isValid = true;
            return true;
        }
    },
    warning:function (msg,holder) {
    	if(holder)AA.RapidLogin.tip=holder;
        AA.RapidLogin.isValid = false;
        AA.RapidLogin.tip.addClass('error').html(msg).show();
        return false;
    },
    popup:function (url) {
    	$.popup({
            title:'登录',
            padding:'0',
            content:$('#sidebar-login-box').html(),
            initialize:function () {
            	$.ajax({
				    		url:'/v2/login/get_login_fail_times.jso',
				    	    type:'GET' ,
				    	    dataType:'json',
				    	    success:function (result) {
				    	    	if(result.state==0){
				    	    		AA.RapidLogin.failLoginTimes=result.loginTimes;
				    	    		if(AA.RapidLogin.failLoginTimes>=3)
				    	    			$("#captcha_view").show();
				            	$('#rapid-userName').focus();
				            	AA.RapidLogin.initCaptcha();
				                AA.RapidLogin.init();
				              }
				            }
				          });
            }
        });
        $('#login_redirect').val(url);
    },
    isLogin:function(callback){
    	$.ajax({
    		url:'/v2/login/in_session_data.jso',
    	    type:'GET' ,
    	    dataType:'json',
    	    success:function (result) {
    	    	if(result.state==0){
    	    		G_ENV_VAR.IS_CHECKED_EMAIL=result.isAuthEmail==0?false:true;
    	    		G_ENV_VAR.IS_CHECKED_MOBILE=result.isAuthMobile==0?false:true;
    	    		G_ENV_VAR.IS_CHECKED_IDENTIFICATION=result.isAuthIden==0?false:true;
    	    		G_ENV_VAR.IS_CHECKED_BANKCARD=result.isAuthBankCard==0?false:true;
    	    		G_ENV_VAR.UNAME=result.uname;
    	    		G_ENV_VAR.UID=result.uid;
    	    		G_ENV_VAR.VIP=result.vip;

    	    		if(G_ENV_VAR.UID!=''&&G_ENV_VAR.UID>0){
    	    			$('#no_login_box').hide();

    	    			$('#login_box_uname').html(G_ENV_VAR.UNAME);
    	    			$('#top_user_name').html('你好! '+G_ENV_VAR.UNAME);
    	    			$('#top_show_login_out').show();
    	    			if(G_ENV_VAR.VIP==0){

    	    				$('#login_vip_show').show();
    	    			}

    	    			$('#login_box').show();

    	    			$('#global_top_login').hide();

    	    			$('#global_top_register').hide();

    	    			callback();
    	    		}else{
    	    			 AA.RapidLogin.popup();
    	    			 return;
    	    		}
    	    	}else{
    	    		AA.RapidLogin.popup();
    	    		return;
    	    	}
    	    }
    	});
    },
    loginout:function(){
    	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    	var exp = new Date();
    	exp.setTime(exp.getTime() - 1);
    	if (keys) {
    		for (var i =  keys.length; i--;)
    			document.cookie=keys[i]+'=0;expires=' +exp.toGMTString()+';path=/;';
	    }
    	location.href='/logout';
    },
	qqClick:function(){
		var ref = document.referrer;
		if(ref){
			ref = ref.replace(/\?/g,'!');
			ref = ref.replace(/&/g,'!');
			if(!(ref.indexOf("www.xinrong.com")>-1)){
				ref = "/index.shtml";
			}
		}else{
			ref = "/index.shtml";
		}
		$.ajax({
			url : '/v2/qq/get_code.jso',
			type : 'post',
			dataType : 'json',
			data:{ret:ref},
			success : function(result) {
				var status=result.state;
				var ahref=result.data;
				if(status==0){
        			location.href=ahref;
				}
			}
		});
	},
	onKeyDown:function (e) {
		var theEvent = e || window.event;
		var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
		if (code == 13) {
			AA.RapidLogin.commitBtn.click();
			return false;
		}
		return true;
	}
};
})(AA);
