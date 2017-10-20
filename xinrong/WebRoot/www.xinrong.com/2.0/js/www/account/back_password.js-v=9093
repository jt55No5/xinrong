var BackPassword;
(function(){
	var $this = {
		tab:'1',
		seed:0,
		g_timer:null,
		g_timer2:null,
		init:function(){
			$this.bindEvent();
		},
		bindEvent:function(){
			$('#tab1').click(function(){
				$this.initFindPassword();
				$this.initFindPasswordView();
			});
			
			$('#tab2').click(function(){
				$this.isLogin();
				$this.initFindSafePasswordView();
			});
			
			$('#tab3').click(function(){
				$this.initFindUserName();
				$this.initFindUserNameView();
			});
		},
		initFindPasswordView:function(){
			$('#find_pwd_1').show();
			$('#find_pwd_mobile').val('');
			$('#find_pwd_capacha_code').val('');
			$('#find_pwd_mobile_code').val('');
			$('#voice_tip_view_1').hide();
			$('#rsloginpwd_loading').hide();
			$('#pwd').val('');
			$('#rsloginpwd_error_view').empty();
			
			$('#find_pwd_2').hide();
		},
		initFindSafePasswordView:function(){
			$('#find_safe_pwd_1').show();
			$('#find_safe_pwd_pic_captcha_code').val('');
			$('#find_safe_pwd_mobile_captcha').val('');
			$('#voice_tip_view_2').hide();
			$('#safe_pwd').val('');
			$('#rssafepwd_error_view').empty();
			
			$('#find_safe_pwd_2').hide();
		},
		initFindUserNameView:function(){
			$('#find_name_style_view').show();
			$('#find_name_style_1').prop('checked',true);
			$('#find_name_email_view').show();
			$('#find_name_email').val('');
			$('#find_name_email').next('span').empty();
			$('#find_name_mobile_view').hide();
			$('#find_name_mobile').val('');
			$('#find_name_mobile').next('span').removeClass().addClass('gray').html('<i class="AllIcon iconi"></i>如未完成手机认证请选用邮箱找回');
			
			$('#find_name_check_code_view').show();
			$('#find_name_check_code').val('');
			$('#find_name_check_code').next('span').removeClass().addClass('gray paddingleft').html('请输入下面图片显示的字符，不区分大小写');
			
			$('#find_name_btn_view').show();
			$('#find_name_next').show();
			$('#find_name_send').hide();
			
			$('#find_name_email_suc').hide();
			$('#find_name_mobile_suc').hide();
		},
		initFindPassword:function(){
			$this.initFindPasswordCapacha();
			$('#find_pwd_mobile_code_send').unbind('click').click(function(){
				var mobile = $('#find_pwd_mobile').val();
				var capacha = $('#find_pwd_capacha_code').val();
				var seed = $('#find_pwd_capacha_seed').val();
				var _errorMsgView = $('#rsloginpwd_error_view');
				_errorMsgView.empty();
				if(mobile == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机号');
					return;
				}
				if(capacha == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写验证码');
					return;
				}
				$.ajax({
					url:'/v2/login/reset_login_password_send_mobile_captcha.jso',
					type:'post',
					dataType:'json',
					data:{mobile:mobile,captcha:capacha,seed:seed},
					success:function(result){
						if(result.state == 1){
							$this.showVoiceTip('voice_tip_view_1');
							$this.findPasswordMobileCodeCountDown(120);
							$this.findPasswordMobileCodeCountDownFun = (function(){
								var mobile = $('#find_pwd_mobile').val();
								var capacha = $('#find_pwd_capacha_code').val();
								var seed = $('#find_pwd_capacha_seed').val();
								var _errorMsgView = $('#rsloginpwd_error_view');
								_errorMsgView.empty();
								if(mobile == ''){
									_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机号');
									return;
								}
								if(capacha == ''){
									_errorMsgView.html('<i class="AllIcon iconx"></i>请填写验证码');
									return;
								}
								$.ajax({
									url:'/v2/login/reset_login_password_send_mobile_captcha.jso',
									type:'post',
									dataType:'json',
									data:{mobile:mobile,captcha:capacha,seed:seed},
									success:function(result){
										if(result.state == 1){
											$this.showVoiceTip('voice_tip_view_1');
											$this.findPasswordMobileCodeCountDown(120);
										}else{
											if(result.state == 2010 || result.state == 2019){
												_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
												BackPassword.getFindPasswordCapacha();
											}else{
												_errorMsgView.html('<i class="AllIcon iconx"></i>系统繁忙');
												BackPassword.getFindPasswordCapacha();
											}
										}
									}
								});
							});
						}else{
							if(result.state == 2010 || result.state == 2019){
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								BackPassword.getFindPasswordCapacha();
							}else if(result.state == 2055){
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								BackPassword.getFindPasswordCapacha();
							}else{
								_errorMsgView.html('<i class="AllIcon iconx"></i>系统繁忙');
								BackPassword.getFindPasswordCapacha();
							}
						}
					}
				});
			});
			
			$('#rest_pwd').unbind('click').click(function(){
				var mobile = $('#find_pwd_mobile').val();
				var mobileCode = $('#find_pwd_mobile_code').val();
				var pwd = $('#pwd').val();
				var _errorMsgView = $('#rsloginpwd_error_view');
				_errorMsgView.empty();
				if(mobile == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机号');
					return;
				}
				if(mobileCode == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机验证码');
					return;
				}
				if(pwd == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写新密码');
					return;
				}
				if(pwd.length < 6 || pwd.length > 16){
					_errorMsgView.html('<i class="AllIcon iconx"></i>密码长度为6-16位');
					return;
				}
				$('#rsloginpwd_loading').show();
				$.ajax({
					url:'/v2/login/reset_login_password_check_mobile_captcha_and_execute.jso',
					type : 'post',
					dataType : 'json',
					data:{mobile:mobile,mobileCaptcha:mobileCode,password:Common.Tool.encrypPw(pwd)},
					success:function(result) {
						$('#rsloginpwd_loading').hide();
						if(result.msg == 'success'){
							$('#find_pwd_1').hide();
							$('#find_pwd_2').show();
						}else if(result.msg == 'success1'){
							$('#find_pwd_1').hide();
							$('#find_pwd_2').show();
							$('#success_tip1').attr("style","display:none");
							$('#success_tip2').attr("style","display:block");
							}else if(result.state == 2011){
								BackPassword.getFindPasswordCapacha();
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}else if(result.state == 2055){
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}else{
								if(result.msg!=null && typeof result.msg !='undefined' && result.msg.length>0){
									_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								}else{
									_errorMsgView.html('<i class="AllIcon iconx"></i>系统繁忙');
								}
							}
						}
					
				});
			});
			
			$('#password_toggle_btn').unbind('click').click(function(){
				if($('#pwd').is(':text')){
					$('#pwd').attr('type','password');
					$(this).find('img').attr('src','/2.0/images/eye_close.png');
				}else{
					$('#pwd').attr('type','text');
					$(this).find('img').attr('src','/2.0/images/eye_open.png');
				}
			});
		},
		findPasswordMobileCodeCountDown:function(count){
			var el = $('#find_pwd_mobile_code_send');
			el.html('(' + count + 's)重发');
			el.unbind('click');
			el.removeClass('sub03').addClass('sub01');
			if ($this.g_timer) {
                clearTimeout($this.g_timer);
            }
            if (--count >= 0) {
            	$this.g_timer = setTimeout('BackPassword.findPasswordMobileCodeCountDown(' + count + ')' ,1000);
            } else {
            	el.removeClass('sub01').addClass('sub03');
                el.prop('disabled',false).html('发送验证码');
                el.unbind('click').click($this.findPasswordMobileCodeCountDownFun);
                $('#find_pwd_capacha_seed_2').val('');
                $this.initFindPasswordCapacha();
            }
		},
		initFindPasswordCapacha:function(){
			$this.getFindPasswordCapacha();
			$('#find_pwd_capacha').unbind('click').click(function(){
				BackPassword.getFindPasswordCapacha();
			});
			$('#find_pwd_capacha').next('a').unbind('click').click(function(){
				BackPassword.getFindPasswordCapacha();
			});
		},
		getFindPasswordCapacha:function(){
			$this.seed=new Date().getTime();
			$("#find_pwd_capacha_seed").val($this.seed);
			$('#find_pwd_capacha').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		initFindSafePassword:function(){
			$this.is_send_mobile = false;
			$this.initFindSafePasswordCapacha();
			UserAPI.GetPersonalInfo({},function(result){
				if(result.state == 0){
					var name = result.name;
					var mobile = result.telephone;
					$('#find_safe_pwd_user_name').html(name);
					$('#find_safe_pwd_mobile').html(mobile);
				}
			});
			
			$('#find_safe_pwd_send').unbind('click').click(function(){
				var pic_captcha = $('#find_safe_pwd_pic_captcha_code').val();
				var pic_captcha_seed = $('#find_safe_pwd_pic_captcha_seed').val();
				var _errorMsgView = $('#rssafepwd_error_view');
				_errorMsgView.empty();
				if(pic_captcha == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
					return;
				}
				$.ajax({
					url:'/v2/login/reset_security_password_send_mobile_captcha.jso',
					type:'post',
					dataType:'json',
					data:{captcha:pic_captcha,seed:pic_captcha_seed},
					success:function(result){
						if(result.state == 1){
							$this.showVoiceTip('voice_tip_view_2');
							$this.findSafePasswordMobileCodeCountDown(120);
							$this.findSafePasswordMobileCodeCountDownFun = (function(){
								var pic_captcha = $('#find_safe_pwd_pic_captcha_code').val();
								var pic_captcha_seed = $('#find_safe_pwd_pic_captcha_seed').val();
								var _errorMsgView = $('#rssafepwd_error_view');
								_errorMsgView.empty();
								if(pic_captcha == ''){
									_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
									return;
								}
								$.ajax({
									url:'/v2/login/reset_security_password_send_mobile_captcha.jso',
									type:'post',
									dataType:'json',
									data:{captcha:pic_captcha,seed:pic_captcha_seed},
									success:function(result){
										if(result.state == 1){
											$this.showVoiceTip('voice_tip_view_2');
											$this.findSafePasswordMobileCodeCountDown(120);
										}else{
											if(result.state == 2010 || result.state == 2019){
												_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
												BackPassword.getFindSafePasswordCapacha();
											}else if(result.state == 1009){
												AA.RapidLogin.popup();
											}else{
												_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
											}
										}
									}
								});
							});
						}else{
							if(result.state == 2010 || result.state == 2019){
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								BackPassword.getFindSafePasswordCapacha();
							}else if(result.state == 1009){
								AA.RapidLogin.popup();
							}else{
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						}
					}
				});
			});
			
			$('#rest_safe_pwd').unbind('click').click(function(){
				var mobile_captcha = $('#find_safe_pwd_mobile_captcha').val();
				var pwd = $('#safe_pwd').val();
				var _errorMsgView = $('#rssafepwd_error_view');
				_errorMsgView.empty();
				if(pwd == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写新交易密码');
					return;
				}
				if(pwd.length < 6 || pwd.length > 16){
					_errorMsgView.html('<i class="AllIcon iconx"></i>密码长度为6-16位');
					return;
				}
				$('#rssafepwd_loading').show();
				$.ajax({
					url:'/v2/login/reset_security_password_check_mobile_captcha_and_execute.jso',
					type:'post',
					dataType:'json',
					data:{mobileCaptcha:mobile_captcha,password:Common.Tool.encrypPw(pwd)},
					success:function(result){
						$('#rssafepwd_loading').hide();
						if(result.msg == 'success'){
							$('#find_safe_pwd_1').hide();
							$('#find_safe_pwd_2').show();
						}else if(result.state == 2011){
										BackPassword.getFindSafePasswordCapacha();
										_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
									}else
										if(result.msg!=null && typeof result.msg !='undefined' && result.msg.length>0){
											_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
										}else{
											_errorMsgView.html('<i class="AllIcon iconx"></i>系统繁忙');
										}
							}
				});
			});
			
			$('#safepwd_toggle_btn').unbind('click').click(function(){
				if($('#safe_pwd').is(':text')){
					$('#safe_pwd').attr('type','password');
					$(this).find('img').attr('src','/2.0/images/eye_close.png');
				}else{
					$('#safe_pwd').attr('type','text');
					$(this).find('img').attr('src','/2.0/images/eye_open.png');
				}
			});
		},
		findSafePasswordMobileCodeCountDown:function(count){
			var el = $('#find_safe_pwd_send');
			el.html('(' + count + 's)重发');
			el.removeClass('sub03').addClass('sub01');
			el.unbind('click');
			if ($this.g_timer2) {
                clearTimeout($this.g_timer2);
            }
            if (--count >= 0) {
            	$this.g_timer2 = setTimeout('BackPassword.findSafePasswordMobileCodeCountDown(' + count + ')' ,1000);
            } else {
            	el.removeClass('sub01').addClass('sub03');
                el.prop('disabled',false).html('发送验证码');
                el.unbind('click').click($this.findSafePasswordMobileCodeCountDownFun);
                $('#find_safe_pwd_pic_captcha_code').val('');
				BackPassword.getFindSafePasswordCapacha();
            }
		},
		initFindSafePasswordCapacha:function(){
			$this.getFindSafePasswordCapacha();
			$('#find_safe_pwd_pic_captcha').unbind('click').click(function(){
				BackPassword.getFindSafePasswordCapacha();
			});
			$('#find_safe_pwd_pic_captcha').nextAll('a').unbind('click').click(function(){
				BackPassword.getFindSafePasswordCapacha();
			});
		},
		getFindSafePasswordCapacha:function(){
			$this.seed=new Date().getTime();
			$("#find_safe_pwd_pic_captcha_seed").val($this.seed);
			$('#find_safe_pwd_pic_captcha').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		initFindUserName:function(){
			$this.initCapacha();
			$('[name="find_name_style"]').change(function(){
				var value = $(this).val();
				if(value == 1){
					$('#find_name_email_view').show();
					$('#find_name_next').show();
					$('#find_name_mobile_view').hide();
					$('#find_name_check_code_view').show();
					$('#find_name_send').hide();
				}else{
					$('#find_name_email_view').hide();
					$('#find_name_next').hide();
					$('#next_loading').hide();
					$('#find_name_mobile_view').show();
					$('#find_name_check_code_view').show();
					$('#find_name_send').show();
				}
			});
			
			$('#find_name_next').unbind('click').click(function(){
				var email = $('#find_name_email').val();
				var _errorMsgView = $('#find_name_email').next('span');
				_errorMsgView.empty();
				if(email == ''){
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写邮箱地址');
					return;
				}

				var capacha = $('#find_name_check_code').val();
				var _errorMsgView2 = $('#find_name_check_code').next('span');
				var seed = $('#seed').val();
				_errorMsgView.empty();
				_errorMsgView2.empty();
				var validate = true;
				if(capacha == ''){
					_errorMsgView2.removeClass().addClass('red');
					_errorMsgView2.html('<i class="AllIcon iconx"></i>请填写验证码');
					validate = false;
				}
				if(!validate){
					return;
				}

				$('#next_loading').show();
				UserAPI.FindUserName({
					email:email,
					mobile:'',
					type:1,
					captcha:capacha,
					seed:seed
				},function(result){
					$('#next_loading').hide();
					if(result.state == 0){
						$('#find_name_style_view').hide();
						$('#find_name_email_view').hide();
						$('#find_name_btn_view').hide();
						$('#find_name_check_code_view').hide();
						$('#find_name_email_suc').show();
						var url = Common.Tool.buildEmailUrl(email);
						$('#check_email').attr('href',url);
					}else{
						if(result.state == 2010){
							_errorMsgView2.removeClass().addClass('red');
							_errorMsgView2.html('<i class="AllIcon iconx"></i>'+result.msg);
							BackPassword.getCapacha();
						}else{
							_errorMsgView.removeClass().addClass('red');
							_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
						}
					}
				});
			});
			
			$('#find_name_send').unbind('click').click(function(){
				var mobile = $('#find_name_mobile').val();
				var _errorMsgView = $('#find_name_mobile').next('span');
				var capacha = $('#find_name_check_code').val();
				var _errorMsgView2 = $('#find_name_check_code').next('span');
				var seed = $('#seed').val();
				_errorMsgView.empty();
				_errorMsgView2.empty();
				var validate = true;
				if(mobile == ''){
					_errorMsgView.removeClass().addClass('red');
					_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机号码');
					validate = false;
				}
				if(capacha == ''){
					_errorMsgView2.removeClass().addClass('red');
					_errorMsgView2.html('<i class="AllIcon iconx"></i>请填写验证码');
					validate = false;
				}
				if(!validate){
					return;
				}
				$('#next_loading').show();
				UserAPI.FindUserName({
					email:'',
					mobile:mobile,
					type:2,
					captcha:capacha,
					seed:seed
				},function(result){
					$('#next_loading').hide();
					if(result.state == 0){
						$('#find_name_style_view').hide();
						$('#find_name_mobile_view').hide();
						$('#find_name_btn_view').hide();
						$('#find_name_check_code_view').hide();
						
						$('#find_name_mobile_suc').show();
					}else{
						if(result.state == 2010){
							_errorMsgView2.removeClass().addClass('red');
							_errorMsgView2.html('<i class="AllIcon iconx"></i>'+result.msg);
							BackPassword.getCapacha();
						}else{
							_errorMsgView.removeClass().addClass('red');
							_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
						}
					}
				});
			});
		},
		initCapacha:function(){
			$this.getCapacha();
			$('#find_username_capacha').unbind('click').click(function(){
				BackPassword.getCapacha();
			});
			$('#find_username_capacha').next('a').unbind('click').click(function(){
				BackPassword.getCapacha();
			});
		},
		getCapacha:function(){
			$this.seed=new Date().getTime();
			$("#seed").val($this.seed);
			$('#find_username_capacha').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		showVoiceTip:function(eventId){
			$('#'+eventId).show();
			setTimeout(function(){
				$('#'+eventId).hide();
			},100000);
		},
		isLogin:function(){
			$.ajax({
				url:'/v2/login/in_session_data.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
					if(result.state==0){
						$this.initFindSafePassword();
					}else{
						AA.RapidLogin.popup();
						return;
					}
				}
			});
		}
	};
	$(function(){
		$this.init();
		$this.tab = Common.Global.GetUrlParam('tab') || '1';
		if($this.tab == 2){
			$this.isLogin();
		}else if($this.tab == 1){
			$this.initFindPassword();
		}else if($this.tab == 3){
			$this.initFindUserName();
		}
	});
	BackPassword = $this;
	
	function get(val){
		if(val == null){
			return '';
		}
		if(typeof val == 'undefined'){
			return '';
		}
		return val;
	}
})();
