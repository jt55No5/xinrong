(function(a) {
a.RapidLogin = {
    isValid: false,
    tip: null,
    failLoginTimes:0,
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
    init: function() {
        var _login = a.RapidLogin,
        	_form = $("#rapid-login-form"),
        	_input = _form.find(".ui-form-input"),
        	_btn = _form.find(".ui-button");
        
        _input.eq(0).focus();
        _login.tip = _btn.next('.ui-tip');
        
        _btn.click(function() {
        	_input.each(function() {
                 if ($(this).is(":visible") && !_login.validate(this)) {
                    $(this).focus();
                    return false
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
                        	$.ajax({
                        		url:'/login/api_bbs_login',
                        		type:'post',
                        		dataType:'json',
                        		complete:function(XMLHttpRequest,textStatus){
                        			if(location.href.indexOf('register') != -1){
                            			location.href = '/2.0/views/account/account_index.shtml';
                            		}else{
                            			location.reload(true);
                            		}
                        		}
                        	});
                        }else {
                        	var msg=result.msg;
													a.RapidLogin.failLoginTimes=msg.substring(msg.indexOf("登录失败次数：")+7);
													var time=a.RapidLogin.failLoginTimes;
													if(parseInt(time)>=3){
														$('#captcha_view').show();
													}
                        if(result.state==2010){
                            	_login.warning('验证码错误');
                            	$('#rapid-captcha').val('');
                            	_login.getCaptcha();
        					}else if(result.state==9998||result.state==9999){
        						_login.warning('账户名或密码错误');
        						$('#rapid-captcha').val('');
        						_login.getCaptcha();
        					}else{
        						_login.warning('账户名或密码错误');
        						$('#rapid-captcha').val('');
        						_login.getCaptcha();
        					}
                        }
            		}
            	});
            }
            return false;
        });
    },
    validate: function(f) {
        var d = a.RapidLogin,
        c = $(f),
        g = $.trim(c.val()),
        e = c.prevAll(".ui-form-label").html().replace("\uff1a", "").replace("\u3000", ""),
        b = a.Helper.getLength(g);
        if (g == "") {
            return d.warning("\u8bf7\u586b\u5199" + e)
        } else {
            if (f.id == "rapid-userPw" && (b < 6 || b > 16)) {
                return d.warning("\u767b\u5f55\u5bc6\u7801\u5fc5\u987b\u4e3a6-16\u4e2a\u5b57\u7b26")
            }
            if (f.id == "rapid-captcha" && b != 4) {
                return d.warning("\u9a8c\u8bc1\u7801\u5fc5\u987b\u4e3a4\u4e2a\u5b57\u7b26")
            }
            d.tip.hide();
            d.isValid = true;
            return true
        }
    },
    warning: function(b) {
        a.RapidLogin.isValid = false;
        a.RapidLogin.tip.addClass("error").html(b).show();
        return false
    },
    popup: function(b) {
        $.popup({
            action: "login",
            title: "\u767b\u5f55",
            padding: "0",
            initialize: function() {
            		$.ajax({
				    		url:'/v2/login/get_login_fail_times.jso',
				    	    type:'GET' ,
				    	    dataType:'json',
				    	    success:function (result) {
				    	    	if(result.state==0){
				    	    		a.RapidLogin.failLoginTimes=result.loginTimes;
				    	    		if(a.RapidLogin.failLoginTimes>=3)
				    	    			$("#captcha_view").show();
			                a.RapidLogin.initCaptcha();
			                a.RapidLogin.init()
			              }
                	}
				      	});
            }
        });
        $("#login_redirect").val(b)
    },
	qqClick:function(){
		var retSearch = location.search.replace(/\?/g,'!');
		retSearch = retSearch.replace(/&/g,'!');
		var retPathname = location.pathname;
		var retUrl = retPathname + retSearch;
		$.ajax({
			url : '/v2/qq/get_code.jso',   
			type : 'post', 
			dataType : 'json', 
			data:{ret:retUrl},
			success : function(result) {
				var status=result.state;
				var ahref=result.data;
				if(status==0){
        			location.href=ahref;
				}
			}
		});
	}
}
})(AA);