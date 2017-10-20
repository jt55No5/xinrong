var AccountSettings,IsSettingSafePwd=true,addr=null;
var RelationShip=['配偶','其他','父母','子女','兄弟姐妹','同事','同学'];
(function(){
	var $this = {
        box:null,
		// isEsw:null,
		init:function(){
			$this.initAccountSettingsInfo();
			$this.initEmergency();
			$this.bindEvent();
		},
		isLogin:function(){
			$.ajax({
				url:'/v2/login/in_session_data.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
					if(result.state==0){
						$this.init();
					}else{
						AA.RapidLogin.popup();
						return;
					}
				}
			});
		},
		initAccountSettingsInfo:function(){
			UserAPI.GetPersonalInfo({},function(result){
				if(result.state == 0){
					var isCheckedEmail = result.isCheckedEmail;
					var isCheckedIdentification = result.isCheckedIdentification;
					var isCheckedMobile = result.isCheckedMobile;
					var isCheckedBankCard = result.isCheckedBankCard;
					var name = result.name;
					//var completion = result.completion;
					var completion = (isCheckedEmail+isCheckedIdentification+isCheckedMobile+isCheckedBankCard)*25;
					var email = result.email;
					var mobile = result.telephone;
					var realName = result.realName;
					var idcard = result.idcard;
					var bankName = result.bankName;
					var bankNo = result.bankNo;
					var provinceName = result.provinceName;
					var cityName = result.cityName;
					var districtName = result.districtName;
					var subBranchName = result.subBranchName;
					var isBindQuick = result.isBindQuick;
					
					$('#user_name').html(name);
					$('#completion').width(completion);
					$('#completion_val').html(completion);
					
					//add by sundy 2016-5-16 风险测评
					$('#risk_type').html(result.riskType);
					$("#to_risk").show();
					if (result.riskType =='未测评') {
						$("#tp2").html("点击进行自评");
					}else{
						$("#tp2").html("重新测评");
					}
					if(email != ''){
						$('#email').removeClass('red');
						$('#email').html(email);
					}
					if(isCheckedEmail == 1){
						$('#auth_email').removeClass('sgray');
						$('#auth_email span').removeClass('red');
						$('#auth_email span').addClass('gray');
						$('#auth_email span').html('已认证');
						
						var icongou = $('#email').parent().find(".icongou").html();
						if(icongou == undefined){
							$('#email').after(' <i class="AllIcon icongou"></i>');
						}
						$('#email_msg_1').hide();
						
						//$('#up_email').show();
						$('#do_email').hide();
					}else{
						$('#email_msg_1').show();
						$('#do_email').show();
					}
					
					$('#mobile').html(mobile);
					if(isCheckedMobile == 1){
						$('#auth_mobile').removeClass('sgray');
						$('#auth_mobile span').removeClass('red');
						$('#auth_mobile span').addClass('gray');
						$('#auth_mobile span').html('已认证');
						
						var icongou = $('#mobile').parent().find(".icongou").html();
						if(icongou == undefined){
							$('#mobile').after(' <i class="AllIcon icongou"></i>');
						}

					}else{
						$('#do_phone').hide();
					}
					if(!!realName){
						$('#id_view #realName').html(realName);
						$('#id_view #idcard').html(idcard);
						$('#id_view').show();
						$('#id_view_none').hide();
					}
					if(isCheckedIdentification == 1){
						$('#auth_identity').removeClass('sgray');
						$('#auth_identity span').removeClass('red');
						$('#auth_identity span').addClass('gray');
						$('#auth_identity span').html('已认证');
						
						var icongou = $('#id_view p').find(".icongou").html();
						if(icongou == undefined){
							$('#id_view p').append(' <i class="AllIcon icongou"></i>');
						}
					}
					if(bankName != ''){
						$('#bankName').html(bankName);
						$('#bankNo').html(bankNo);
						$('#provinceName').html(provinceName);
						$('#cityName').html(cityName);
						$('#districtName').html(districtName);
						$('#subBranchName').html(XR.Tool.XssEncode(subBranchName));
						
						$('#bank_view').show();
						$('#bank_view_none').hide();
					}
					if(isCheckedBankCard == 1){
						$('#auth_bankcard').html($('#auth_bankcard a').html());
						$('#auth_bankcard').removeClass('sgray');
						$('#auth_bankcard span').removeClass('red');
						$('#auth_bankcard span').addClass('gray');
						$('#auth_bankcard span').html('已认证');
						
						var icongou = $('#bank_view p').find(".icongou").html();
						if(icongou == undefined){
							$('#bank_view p:eq(0)').append(' <i class="AllIcon icongou"></i>');
						}
						$('#bank_msg_4').hide();
						$('#bank_check_prompt').hide();
						
					}

                    $.ajax({
                        url:'/v2/member/esw_account_info.jso',
                        type:'POST',
                        dataType:'json',
                        success:function(result2){
                            if(result2.state == 0) {
                                if (result2.eswAccountId != null) {
                                    $('#do_phone').hide();
                                }else{
                                    if(isCheckedIdentification == 0){
                                        $("#do_bank").unbind("click").bind("click",function(){
                                            BankQuickAuthWin.show();
                                        });
                                        $("#do_bank").show();
                                        BankQuickAuthWin.show();
                                    }else if(isCheckedBankCard == 1 && isBindQuick == 1){
                                        $("#do_bank").hide();
                                    }else{
                                        $("#do_bank").unbind("click").bind("click",function(){

                                            modifyBankInfo.show();
                                        });
                                        $("#do_bank").show().html("修改银行卡");
                                    }
								}

                            }else{
                                if(isCheckedIdentification == 0){
                                    $("#do_bank").unbind("click").bind("click",function(){
                                        BankQuickAuthWin.show();
                                    });
                                    $("#do_bank").show();
                                    BankQuickAuthWin.show();
                                }else if(isCheckedBankCard == 1 && isBindQuick == 1){
                                    $("#do_bank").hide();
                                }else{
                                    $("#do_bank").unbind("click").bind("click",function(){

                                        modifyBankInfo.show();
                                    });
                                    $("#do_bank").show().html("修改银行卡");
                                }

                            }
                        }
                    });

                    if(IsSettingSafePwd ==false){
						
						//showAuthorize();
						$("#do_safe_password").html("设置交易密码");
						$("#do_safe_password").attr("style","background:#FF8410");
						$("#safe_pwd_state").html("未设置");
						//$("#reset_safePwd").attr('onfocus','this.blur()');
						
					}
					
					if(!$.isEmptyObject(result.addr)){
						addr = result.addr;
						//var address = addr.province+'，'+addr.city+'，'+addr.districe+'，'+addr.address+'，'+addr.zip;
						var address = '';
						if(addr.province){
							address += addr.province+'，';
							//$("#province").html('<option>'+addr.province+'</option>')
						}
						if(addr.city){
							address += addr.city+'，';
							
							//$("#city").html('<option>'+addr.city+'</option>')
						}
						if(addr.districe){
							address += addr.districe+'，';
							
							//$("#district").html('<option>'+addr.districe+'</option>')
						}
						if(addr.address){
							address += addr.address+'，';
							$("#address").attr("value",addr.address);
						}
						if(addr.zip){
							address += addr.zip;
							$("#zip").attr("value",addr.zip);
						}else{
							address.substring(0,address.length-1);
						}
						$('#show_address').html(address);
						
						/*var icongou = $('#address_view p').find(".icongou").html();
						if(icongou == undefined){
							$('#address_view p').append(' <i class="AllIcon icongou"></i>');
						}*/
						
						$('#address_msg_1').hide();
						$('#address_view_none').hide();
						$('#address_view').show();
						$('#do_address').html('修改地址');
					}else{
						$('#address_view_none').show();
						$('#address_view').hide();
					}
				}
			});

			$.ajax({
				url:'/v2/member/esw_account_info.jso',
				type:'POST',
				dataType:'json',
				success:function(result1){
					if(result1.state == 0){
						if(result1.eswAccountId != null){
							$('#esw_state_view_none').hide();
							$('#esw_state_view').show();
							$('#do_esw_create_btn').hide();
                            // $this.isEsw = result1.eswAccountId;
                            $("#do_bank").hide();
							 $('#esw_password_set').show();

							 if(result1.eswPasswordFlag==1){

							 $("#esw_password_set dd a").text("重置交易密码");
							 $("#esw_password_set dd a").attr("href","javascript:AccountSettings.resetEswPassword();");
							 $("#esw_password_set dd span").text("已设置");
							 }else if(result1.eswPasswordFlag==0){

							 $("#esw_password_set dd a").attr("href","javascript:AccountSettings.setEswPassword();");
							 $("#esw_password_set dd a").text("立即设置");
							 $("#esw_password_set dd span").text("未设置");


							 var wboxCgpsw = $("#wbox_cgpsw").wBox({
							 title : "温馨提示",
							 html : $("#wbox_cgpsw").html()
							 });
							 wboxCgpsw.showBox();
							 }

						}
					}
				}
			});
		},
        setEswPassword:function () {
            Esw_account_api.setEswPassword(0,1,function () {
            });
        },
        resetEswPassword:function (sms_captcha,sms_seed) {
            Esw_account_api.resetEswAccountPassword(1,function () {
            });
        },
		bindEvent:function(){
			
			$('#do_email').unbind('click').click(function(){
				clearTimeout($this.g_timer3);
				var wBox=$("#wbox_email").wBox({
					title: "邮箱认证",
					html: $('#wbox_email').html()
				});
				
				wBox.showBox();
				$this.initEmailAuthCaptcha();
				//$('#wBox #email_box_1').show();
				if($('#email').html() != '未填写'){
					$('#wBox #auth_email').val($('#email').html());
				}
				
				$('#wBox #auth_email_send').unbind('click').click(function(){
					var email = $('#wBox #auth_email').val();
					var _errorView = $('#wBox #auth_email').next('p');
					var _errorCaptchaView = $('#wBox #email_captcha_code').next('p');
					_errorView.empty();
					_errorCaptchaView.empty();
					if(email == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入邮箱地址').show();
						return;
					}
					var captcha = $('#wBox #email_captcha_code').val();

					if(captcha == ''){
						_errorCaptchaView.html('<i class="AllIcon iconx"></i>请输入图形验证码').show();
						return;
					}

					UserAPI.AuthEmail({
						email:email,captcha:captcha,seed: $('#wBox #email_captcha_seed').val()
					},function(result){
						if(result.state == 0){
							$('#wBox #suc_email').html(email);
							var url = AA.Helper.buildEmailUrl(email);
							$('#wBox #check_email').attr('href',url);
							
							$('#wBox #again_send').removeClass().addClass('sub01');
							$this.sendAuthEmailCountDown(120);
							$this.sendAuthEmailCountDownFun = (function(){
								UserAPI.AuthEmail({
									email:email
								},function(result){
									if(result.state == 0){
										$('#wBox #again_send').removeClass().addClass('sub01');
										$this.sendAuthEmailCountDown(120);
									}
								});
							});
							
							$('#wBox #email_box_1').hide();
							$('#wBox #email_box_3').show();
						}else{//异常信息
							var msg = result.msg;
						    if(msg == ''){ 
						    	msg = '系统繁忙!'
						    }
							$this.getEmailAuthCaptcha();
							if(result.state == -12){
								_errorCaptchaView.removeClass().addClass('red');
								_errorCaptchaView.html('<i class="AllIcon iconx"></i>'+result.msg).show();
								$this.getUpMobilePicCaptcha1();
							}else if(result.state==2010){
								_errorCaptchaView.removeClass().addClass('red');
								_errorCaptchaView.html('<i class="AllIcon iconx"></i>'+result.msg).show();
								$this.getUpMobilePicCaptcha1();
							}
							else{
								_errorView.removeClass().addClass('red');
								_errorView.html('<i class="AllIcon iconx"></i>'+result.msg).show();
							}

						}
					});
				});
				
				$('#wBox #email_over').unbind('click').click(function(){
					wBox.close();
					$this.initAccountSettingsInfo();
				});
				$('#wBox #back_up_email').unbind('click').click(function(){
					$('#wBox #auth_email_loading').hide();
					$('#wBox #email_box_3').hide();
					$('#wBox #email_box_1').show();
				});
				
			});
			
			$('#do_phone').unbind('click').click(function(){
				clearTimeout($this.g_timer1);
				clearTimeout($this.g_timer2);
				var wBox=$("#wbox_phone").wBox({
					title: "修改手机号码",
					html: $('#wbox_phone').html()
				});
				
				wBox.showBox();
				$this.isSendMobile = false;
				$('#wBox #up_mobile_old_mobile').html($('#mobile').html());
				$this.initUpMobilePicCaptcha1();
				$('#wBox #send_mobile_captcha_1').unbind('click').click(function(){
					var picCaptcha = $('#wBox #up_mobile_pic_captcha_code_1').val();
					var picCaptchaSeed = $('#wBox #up_mobile_pic_captcha_seed_1').val();
					var mobileCaptcha = $('#wBox #up_mobile_mobile_captcha_1').val();
					var _errorMsgView = $('#wBox #up_mobile_pic_captcha_code_1').nextAll('span');
					var _errorMsgView2 = $('#wBox #up_mobile_mobile_captcha_1').nextAll('p:eq(1)');
					_errorMsgView.empty();
					_errorMsgView2.empty();
					
					var validate = true;
					if(picCaptcha == ''){
						_errorMsgView.removeClass().addClass('red');
						_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
						validate = false;
					}
					if(!validate){
						return;
					}
					UserAPI.ModifyPhoneStep1({
						captcha:picCaptcha,
						seed:picCaptchaSeed
					},function(result){
						if(result.state == 0){
							$this.isSendMobile = true;
							$this.upMobileMobileCaptchaCountDown1(120);
							$this.showVoiceTip1();
							$this.upMobileMobileCaptchaCountDown1Fun = (function(){
								var picCaptcha = $('#wBox #up_mobile_pic_captcha_code_1').val();
								var picCaptchaSeed = $('#wBox #up_mobile_pic_captcha_seed_1').val();
								var _errorMsgView = $('#wBox #up_mobile_pic_captcha_code_1').nextAll('span');
								_errorMsgView.empty();
								var validate = true;
								if(picCaptcha == ''){
									_errorMsgView.removeClass().addClass('red');
									_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
									validate = false;
								}
								if(!validate){
									return;
								}
								UserAPI.ModifyPhoneStep1({
									captcha:picCaptcha,
									seed:picCaptchaSeed
								},function(result){
									if(result.state == 0){
										$this.isSendMobile = true;
										$this.upMobileMobileCaptchaCountDown1(120);
										$this.showVoiceTip1();
									}else{
										if(result.state == 2010){
											_errorMsgView.removeClass().addClass('red');
											_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
											$this.getUpMobilePicCaptcha1();
										}else{
											_errorMsgView.removeClass().addClass('red');
											_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
										}
									}
								});
							});
						}else{//异常信息
							if(result.state == 2010){
								_errorMsgView.removeClass().addClass('red');
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								$this.getUpMobilePicCaptcha1();
							}else{
								_errorMsgView.removeClass().addClass('red');
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						}
					});
					
				});
				
				$('#wBox #up_mobile_next_1').unbind('click').click(function(){
					if($this.isSendMobile||false && $this.isSendMobile == true){
						var mobileCaptcha = $('#wBox #up_mobile_mobile_captcha_1').val();
						var _errorMsgView = $('#wBox #up_mobile_mobile_captcha_1').nextAll('p:eq(1)');
						_errorMsgView.empty();
						var validate = true;
						if(mobileCaptcha == ''){
							_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机验证码');
							validate = false;
						}
						if(!validate){
							return;
						}
						
						UserAPI.ModifyPhoneStep2({
							mobileCaptcha:mobileCaptcha
						},function(result){
							if(result.state == 0){
								$('#wBox #mobile_box_1').hide();
								$('#wBox #mobile_box_2').show();
								$this.isSendMobile2 = false;
								
								$this.initUpMobilePicCaptcha2();
							}else{
								_errorMsgView.removeClass().addClass('red');
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						});
					}else{
						var _errorMsgView2 = $('#wBox #up_mobile_mobile_captcha_1').nextAll('p:eq(1)');
						_errorMsgView2.removeClass().addClass('red');
						_errorMsgView2.html('<i class="AllIcon iconx"></i>请先发送手机验证码');
					}
				});
				
				$('#wBox #send_mobile_captcha_2').unbind('click').click(function(){
					var newMobile = $('#wBox #newMobile').val();
					var picCaptcha = $('#wBox #up_mobile_pic_captcha_code_2').val();
					var picCaptchaSeed = $('#wBox #up_mobile_pic_captcha_seed_2').val();
					var mobileCaptcha = $('#wBox #up_mobile_mobile_captcha_2').val();
					var _errorMsgView = $('#wBox #up_mobile_pic_captcha_code_2').nextAll('span');
					var _errorMsgView2 = $('#wBox #up_mobile_mobile_captcha_2').nextAll('p:eq(1)');
					var _errorMsgView3 = $('#wBox #newMobile').nextAll('p');
					_errorMsgView.empty();
					_errorMsgView2.empty();
					_errorMsgView3.empty();
					
					var validate = true;
					if(newMobile == ''){
						_errorMsgView3.removeClass().addClass('red');
						_errorMsgView3.html('<i class="AllIcon iconx"></i>请填新手机号');
						validate = false;
					}
					if(picCaptcha == ''){
						_errorMsgView.removeClass().addClass('red');
						_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
						validate = false;
					}
					if(!validate){
						return;
					}
					UserAPI.ModifyPhoneStep3({
						captcha:picCaptcha,
						seed:picCaptchaSeed,
						newMobile:newMobile
					},function(result){
						if(result.state == 0){
							$this.isSendMobile2 = true;
							$this.upMobileMobileCaptchaCountDown2(120);
							$this.showVoiceTip2();
							$this.upMobileMobileCaptchaCountDown2Fun = (function(){
								var newMobile = $('#wBox #newMobile').val();
								var picCaptcha = $('#wBox #up_mobile_pic_captcha_code_2').val();
								var picCaptchaSeed = $('#wBox #up_mobile_pic_captcha_seed_2').val();
								var _errorMsgView = $('#wBox #up_mobile_pic_captcha_code_2').nextAll('span');
								var _errorMsgView3 = $('#wBox #newMobile').nextAll('p');
								_errorMsgView.empty();
								_errorMsgView3.empty();
								var validate = true;
								if(newMobile == ''){
									_errorMsgView3.removeClass().addClass('red');
									_errorMsgView3.html('<i class="AllIcon iconx"></i>请填新手机号');
									validate = false;
								}
								if(picCaptcha == ''){
									_errorMsgView.removeClass().addClass('red');
									_errorMsgView.html('<i class="AllIcon iconx"></i>请填写图形验证码');
									validate = false;
								}
								if(!validate){
									return;
								}
								UserAPI.ModifyPhoneStep3({
									captcha:picCaptcha,
									seed:picCaptchaSeed,
									newMobile:newMobile
								},function(result){
									if(result.state == 0){
										$this.isSendMobile2 = true;
										$this.upMobileMobileCaptchaCountDown2(120);
										$this.showVoiceTip2();
									}else{
										if(result.state == 2010){
											_errorMsgView.removeClass().addClass('red');
											_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
											$this.getUpMobilePicCaptcha2();
										}else{
											_errorMsgView.removeClass().addClass('red');
											_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
										}
									}
								});
							});
						}else{//异常信息
							if(result.state == 2010){
								_errorMsgView.removeClass().addClass('red');
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								$this.getUpMobilePicCaptcha1();
							}else{
								_errorMsgView.removeClass().addClass('red');
								_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						}
					});
					
				});
				
				$('#wBox #up_mobile_next_2').unbind('click').click(function(){
					if($this.isSendMobile2||false && $this.isSendMobile2 == true){
						var newMobile = $('#wBox #newMobile').val();
						var mobileCaptcha = $('#wBox #up_mobile_mobile_captcha_2').val();
						var _errorMsgView = $('#wBox #up_mobile_mobile_captcha_2').nextAll('p:eq(1)');
						var _errorMsgView3 = $('#wBox #newMobile').nextAll('p');
						_errorMsgView.empty();
						_errorMsgView3.empty();
						var validate = true;
						if(newMobile == ''){
							_errorMsgView3.removeClass().addClass('red');
							_errorMsgView3.html('<i class="AllIcon iconx"></i>请填新手机号');
							validate = false;
						}
						if(mobileCaptcha == ''){
							_errorMsgView.html('<i class="AllIcon iconx"></i>请填写手机验证码');
							validate = false;
						}
						if(!validate){
							return;
						}
						
						UserAPI.ModifyPhoneStep4({
							newMobile:newMobile,
							mobileCaptcha:mobileCaptcha
						},function(result){
							if(result.state == 0){
								$('#wBox #mobile_box_2').hide();
								$('#wBox #mobile_box_3').show();
							}else{
								if(result.state == 2011){
									_errorMsgView.removeClass().addClass('red');
									_errorMsgView.html('<i class="AllIcon iconx"></i>'+result.msg);
								}else{
									_errorMsgView3.removeClass().addClass('red');
									_errorMsgView3.html('<i class="AllIcon iconx"></i>'+result.msg);
								}
							}
						});
					}else{
						var _errorMsgView = $('#wBox #up_mobile_mobile_captcha_2').nextAll('p:eq(1)');
						var _errorMsgView3 = $('#wBox #newMobile').nextAll('p');
						_errorMsgView.removeClass().addClass('red');
						_errorMsgView.html('<i class="AllIcon iconx"></i>请先发送手机验证码');
						_errorMsgView3.removeClass().addClass('red');
						_errorMsgView3.html('<i class="AllIcon iconx"></i>请填写新手机号');
					}
				});
				
				$('#wBox #up_mobile_next_3').unbind('click').click(function(){
					wBox.close();
					$this.initAccountSettingsInfo();
				});
			});
			
			$('#do_password').unbind('click').click(function(){
				
				var wBox=$("#wbox_password").wBox({
					title: "修改登录密码",
					html: $('#wbox_password').html()
						
					});

				wBox.showBox();
				
				$('#wBox #modifyPwdBut').unbind('click').click(function(){
					var curPwd = $("#wBox #curPwd").val();
					var newPwd = $("#wBox #newPwd").val();
					var confirmPwd = $("#wBox #confirmPwd").val();
					
					if(curPwd.length < 6 || curPwd.length > 16){
						$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>当前密码长度必须在6~16之间').show();
						return;
					}
					
					if(newPwd.length < 6 || newPwd.length > 16){
						$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>新密码长度必须在6~16之间').show();
						return; 
					}
					
					if(curPwd == newPwd){
						$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>新密码不能与当前密码相同').show();
						return;
					}
					
					if(confirmPwd != newPwd){
						$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>两次密码输入不一致').show();
						return;
					}
					
					$("#wBox #msg_view").html('').hide();
					
					UserAPI.ModifyLoginPassword({
						oldPassword:AA.Helper.encrypPw(curPwd),
						newPassword:AA.Helper.encrypPw(confirmPwd)
					},function(result){
						if(result.state == 0){
							$('#wBox #pwd_box_1').hide();
							$('#wBox #pwd_box_2').show();
						}else{//异常信息
							var msg = result.msg;
						    if(msg == ''){ 
						    	msg = '系统繁忙!'
						    }
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>'+msg).show();
						}
					});
				});
			});
			
			$('#do_safe_password').unbind('click').click(function(){
				if(IsSettingSafePwd==false){
					var wBox=$("#wbox_aqpassword1").wBox({
					title: "设置交易密码",
					html: $('#wbox_aqpassword1').html()
						
					});
	
					wBox.showBox();
					
					$('#wBox #modifyPwdBut').unbind('click').click(function(){
						
						var newPwd = $("#wBox #newPwd").val();
						var confirmPwd = $("#wBox #confirmPwd").val();
						
						
						if(newPwd.length < 6 || newPwd.length > 16){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>新密码长度必须在6~16之间').show();
							return; 
						}
						
					
						
						if(confirmPwd != newPwd){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>两次密码输入不一致').show();
							return;
						}
						
						$("#wBox #msg_view").html('').hide();
						
						$.ajax({
								url : '/v2/account/set_secure_pwd.jso',       
								type : 'post',
								data:{newPwd:confirmPwd},  
								dataType : 'json',
								success : function(data) {
									if(data.state == 0 && data.data == 'success' ){
										$('#wBox #pwd_box_1').hide();
										$('#wBox #pwd_box_2').show(); 
									}else{//异常信息
										var msg = data.msg;
									    if(msg == '') msg = '系统繁忙!'; 
										$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>'+msg).show();
									}
								}   
						});   
					});
				}else{
					var wBox=$("#wbox_aqpassword").wBox({
					title: "修改交易密码",
					html: $('#wbox_aqpassword').html()
						
					});
	
					wBox.showBox();
					
					$('#wBox #modifyPwdBut').unbind('click').click(function(){
						var curPwd = $("#wBox #curPwd").val();
						var newPwd = $("#wBox #newPwd").val();
						var confirmPwd = $("#wBox #confirmPwd").val();
						
						if(curPwd.length < 6 || curPwd.length > 16){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>当前密码长度必须在6~16之间').show();
							return;
						}
						
						if(newPwd.length < 6 || newPwd.length > 16){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>新密码长度必须在6~16之间').show();
							return; 
						}
						
						if(curPwd == newPwd){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>新密码不能与当前密码相同').show();
							return;
						}
						
						if(confirmPwd != newPwd){
							$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>两次密码输入不一致').show();
							return;
						}
						
						$("#wBox #msg_view").html('').hide();
						
						UserAPI.ModifySafePassword({
							newPassword:AA.Helper.encrypPw(confirmPwd),
							oldPassword:AA.Helper.encrypPw(curPwd)
						},function(result){
							if(result.state == 0){
								$('#wBox #pwd_box_1').hide();
								$('#wBox #pwd_box_2').show();
							}else{//异常信息
								var msg = result.msg;
							    if(msg == ''){ 
							    	msg = '系统繁忙!'
							    }
								$("#wBox #msg_view").html('<i class="AllIcon iconx"></i>'+msg).show();
							}
						});
					});
				}
			});
			
			$('#do_address').unbind('click').click(function(){
				var wBox=$("#wbox_address").wBox({
					title: "设置收件地址",
					html: $('#wbox_address').html()
				});

				wBox.showBox();
				
				loc = new Location();
				//var _province_options = '<option value="" data-id="">请选择省份</option>';
				var _province_options = $("#province").html();
                $.each(loc.find('0'), function (key, value) {
                    _province_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
                });


                $('#wBox #province').empty().append(_province_options);

                
                //初始化省市区
                if(addr!=null&&addr.province!=null&&addr.city!=null&&addr.districe!=null){
                	$('#wBox #province').find('option[value="'+addr.province+'"]').attr('selected',true);
	                var _pid = '0,'+$('option:selected', $('#wBox #province')).attr('data-id');
	                var _city_options = '<option value="" data-id="">请选择城市</option>';
	                $.each(loc.find(_pid), function (key, value) {
	                        _city_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
	                    });
	        			$('#wBox #district').html('').html('<option value="" data-id="">请选择地区</option>');
	        			$('#wBox #city').empty().append(_city_options);

	        		$('#wBox #city').find('option[value="'+addr.city+'"]').attr('selected',true);


	        		var _pid_district = '0,'+$('#wBox #province option:selected').attr('data-id')+','+$('option:selected', $('#wBox #city')).attr('data-id');
					var _district_options = '<option value="" data-id="">请选择地区</option>';
					//var _district_options = $("#district").html();
					if(loc.find(_pid_district)){
						$.each(loc.find(_pid_district), function (key, value) {
		                    _district_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
		                });
					}else{
						_district_options += '<option value="' + $('option:selected', $('#wBox #city')).val() + '" data-id="' + $('option:selected', $('#wBox #city')).attr('data-id') + '">' + $('option:selected', $('#wBox #city')).val() + '</option>';
					}
					
		            $('#wBox #district').html('').append(_district_options);

		            $('#wBox #district').find('option[value="'+addr.districe+'"]').attr('selected',true);
				}
				$('#wBox #province').change(function(){
                	var _pid = '0,'+$('option:selected', this).attr('data-id');
        			var _city_options = '<option value="" data-id="">请选择城市</option>';
        			//var _city_options = $("#city").html();
        			$.each(loc.find(_pid), function (key, value) {
                        _city_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
                    });
        			$('#wBox #district').html('').html('<option value="" data-id="">请选择地区</option>');
        			$('#wBox #city').empty().append(_city_options);
                });
				
				$('#wBox #city').change(function(){
					var _pid = '0,'+$('#wBox #province option:selected').attr('data-id')+','+$('option:selected', this).attr('data-id');
					var _district_options = '<option value="" data-id="">请选择地区</option>';
					//var _district_options = $("#district").html();
					if(loc.find(_pid)){
						$.each(loc.find(_pid), function (key, value) {
	                        _district_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
	                    });
					}else{
						_district_options += '<option value="' + $('option:selected', this).val() + '" data-id="' + $('option:selected', this).attr('data-id') + '">' + $('option:selected', this).val() + '</option>';
					}
					
                    $('#wBox #district').html('').append(_district_options);
				});
				
				$('#wBox #address_next_btn').unbind('click').click(function(){
					var province = $('#wBox #province').val();
					var city = $('#wBox #city').val();
					var district = $('#wBox #district').val();
					var address = $.trim($('#wBox #address').val());
					var zip = $.trim($('#wBox #zip').val());
					var _errorView = $('#wBox #error_view');
					_errorView.empty();
					if(province == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请选择省份');
						return;

					}
					if(city == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请选择城市');
						return;
					}
					if(district == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请选择地区');
						return;
					}
					if(address == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入街道地址');
						return;
					}
					if(zip == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入邮编');
						return;
					}else if(!/^([\d]{6})$/.test(zip)){
						_errorView.html('<i class="AllIcon iconx"></i>邮编格式错误');
						return;
					}
					var confirmAddress =XR.Tool.XssEncode( province+','+city+','+district+','+address+','+zip);

					$('#wBox #confirm_address').html(confirmAddress);
					$('#wBox #address_box_1').hide();
					$('#wBox #address_box_2').show();
				});
				
				$('#wBox #address_back_btn').unbind('click').click(function(){
					$('#wBox #address_box_2').hide();
					$('#wBox #address_box_1').show();
				});
				
				$('#wBox #address_confirm_btn').unbind('click').click(function(){
					var province = $('#wBox #province').val();
					var city = $('#wBox #city').val();
					var district = $('#wBox #district').val();
					var address = $.trim($('#wBox #address').val());
					var zip = $.trim($('#wBox #zip').val());
					UserAPI.SaveActiveAddress({
						province:province,
						city:city,
						district:district,
						address:address,
						zip:zip
					},function(result){
						if(result.state == 0){
							wBox.close();
							$this.initAccountSettingsInfo();
						}else{
							if(result.state == 1009){
								AA.RapidLogin.popup();
							}
						}
					});
				});
			});
			
			//add by sundy 2016-5-17
			$('#to_risk').unbind('click').click(function(){
				$this.showRiskDialog();
			});
			
			$('#do_emergency').unbind('click').click(function(){
				var wBox=$('#wbox_emergency').wBox({
					title:"设置紧急联系人",
					html:$('#wbox_emergency').html()
				});
				wBox.showBox();
				$('#wBox #emergency_next_btn').unbind('click').click(function(){
					var emergencyName = $('#wBox #emergencyName').val();
					var emergencyMobile =$.trim( $('#wBox #emergencyMobile').val());
					var emergencyType = $.trim($('#wBox #emergencyType').val());
					var _errorView = $('#wBox #emergencyError');
					if(emergencyName == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入名字');
						return;
					}
					if(emergencyMobile == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入电话号码');
						return;
					}
					if(emergencyType == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请选择关系');
						return;
					}
					if(emergencyName.length>10){
						_errorView.html('<i class="AllIcon iconx"></i>名字长度必须小于10位');
						return;
					}
					if(!(/^[A-Za-z]{2,11}$/.test(emergencyName)||(/^[\u4e00-\u9fa5]{2,11}$/.test(emergencyName)))){
						_errorView.html('<i class="AllIcon iconx"></i>名字必须是2位以上的纯汉字或纯英文');
						return;
					}
					/*if(!(/^([1][0-9]{10})|([0][0-9]{10,11})$/.test(emergencyMobile))){
						_errorView.html('<i class="AllIcon iconx"></i>手机号码格式错误或者座机前未加区号');
						return;
					}*/
					if(!((/^0\d{9,11}$/.test(emergencyMobile))||(/^1\d{10}$/.test(emergencyMobile)))){
						_errorView.html('<i class="AllIcon iconx"></i>手机号码必须为11位或者座机前加区号');
						return;
					}
					var confirmEmergency = emergencyName+','+emergencyMobile+','+RelationShip[emergencyType];
					$('#wBox #confirm_emergency').html(confirmEmergency);
					$('#wBox #emergency_box_1').hide();
					$('#wBox #emergency_box_2').show();
					var emergencyView1=$('#wBox #emergencyError1');
					emergencyView1.html('');
				});
				$('#wBox #emergency_back_btn').unbind('click').click(function(){
					$('#wBox #emergency_box_2').hide();
					$('#wBox #emergency_box_1').show();
					var _errorView = $('#wBox #emergencyError');
					_errorView.html('');
				});
				$('#wBox #emergency_confirm_btn').unbind('click').click(function(){
					var emergencyName1 = $('#wBox #emergencyName').val();
					var emergencyMobile1 =$.trim( $('#wBox #emergencyMobile').val());
					var emergencyType1 = $.trim($('#wBox #emergencyType').val());
					var emergencyView1=$('#wBox #emergencyError1');
					UserAPI.UpdateEmergency({
						emergencyName:emergencyName1,
						emergencyMobile:emergencyMobile1,
						emergencyType:emergencyType1
					},function(result){
						if(result.state == 0){
							wBox.close();
							$this.init();
						}else{
							if(result.state == 1009){
								AA.RapidLogin.popup();
							}else{
								emergencyView1.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						}
					});
				});
			});
			$('#up_emergency').unbind('click').click(function(){
				var wBox=$('#wbox_emergency').wBox({
					title:"修改紧急联系人",
					html:$('#wbox_emergency').html()
				});
				wBox.showBox();
				$('#wBox #emergencyName').attr("value",emergencyName);
				$('#wBox #emergencyMobile').attr("value",emergencyMobile);
				$('#wBox #emergencyType').val(emergencyTtpe);
				$('#wBox #emergency_next_btn').unbind('click').click(function(){
					var emergencyName = $('#wBox #emergencyName').val();
					var emergencyMobile = $('#wBox #emergencyMobile').val();
					var emergencyType = $.trim($('#wBox #emergencyType').val());
					var _errorView = $('#wBox #emergencyError');
					if(emergencyName == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入名字');
						return;
					}
					if(emergencyMobile == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请输入电话号码');
						return;
					}
					if(emergencyType == ''){
						_errorView.html('<i class="AllIcon iconx"></i>请选择关系');
						return;
					}
					if(emergencyName.length>10){
						_errorView.html('<i class="AllIcon iconx"></i>名字长度必须小于10位');
						return;
					}
					if(!(/^[A-Za-z]{2,11}$/.test(emergencyName)||(/^[\u4e00-\u9fa5]{2,11}$/.test(emergencyName)))){
						_errorView.html('<i class="AllIcon iconx"></i>名字必须是2位以上的纯汉字或纯英文');
						return;
					}
					/*if(!(/^([1][0-9]{10})|([0][0-9]{10,11})$/.test(emergencyMobile))){
						_errorView.html('<i class="AllIcon iconx"></i>手机号码格式错误或者座机前未加区号');
						return;
					}*/
					if(!((/^0\d{9,11}$/.test(emergencyMobile))||(/^1\d{10}$/.test(emergencyMobile)))){
						_errorView.html('<i class="AllIcon iconx"></i>手机号码必须为11位或者座机前加区号');
						return;
					}
					var confirmEmergency = emergencyName+','+emergencyMobile+','+RelationShip[emergencyType];
					$('#wBox #confirm_emergency').html(confirmEmergency);
					$('#wBox #emergency_box_1').hide();
					$('#wBox #emergency_box_2').show();
					var emergencyView1=$('#wBox #emergencyError1');
					emergencyView1.html('');
				});
				$('#wBox #emergency_back_btn').unbind('click').click(function(){
					$('#wBox #emergency_box_2').hide();
					$('#wBox #emergency_box_1').show();
					var _errorView = $('#wBox #emergencyError');
					_errorView.html('');
					
				});
				$('#wBox #emergency_confirm_btn').unbind('click').click(function(){
					var emergencyName1 = $('#wBox #emergencyName').val();
					var emergencyMobile1 = $('#wBox #emergencyMobile').val();
					var emergencyType1 = $.trim($('#wBox #emergencyType').val());
					var emergencyView1=$('#wBox #emergencyError1');
					UserAPI.UpdateEmergency({
						emergencyName:emergencyName1,
						emergencyMobile:emergencyMobile1,
						emergencyType:emergencyType1
					},function(result){
						if(result.state == 0){
							wBox.close();
							$this.init();
						}else{
							if(result.state == 1009){
								AA.RapidLogin.popup();
							}else{
								emergencyView1.html('<i class="AllIcon iconx"></i>'+result.msg);
							}
						}
					});
				});
			});
			
			/*$('#do_esw_create_btn').unbind('click').click(function(){
				var wBox=$('#wbox_esw_create').wBox({
					title:"存管认证",
					html:$('#wbox_esw_create').html(),
					callBack:function(){
						showLocation2();
						
						$.ajax({
							url:'/v2/member/get_personal_info.jso',
							type:'post',
							dataType:'json',
							success:function(result){
								if(result.state == '0'){
									$('#wBox #esw_mobile').val(result.telephone);
								}else{
									if(result.state == '1009'){
										wBox.close();
										AA.RapidLogin.popup();
									}
								}
							}
						});
						
						$('#wBox #esw_img_captcha').unbind('click').click(function(){
							$this.getEswCreateImgageCaptcha();
						});
						$this.getEswCreateImgageCaptcha();
						$this.eswSendSmsFun = (function(){
							var seed = $('#wBox #esw_captcha_seed').val();
							var captcha = $('#wBox #esw_captcha').val();
							$this.hideEswErrMsg();
							if(captcha.length!=4){
								$this.showEswErrMsg('请正确输入图形验证码');
								return;
							}
							$.ajax({
								url:'/v2/account/esw_get_mobile_captcha.jso',
								type:'post',
								dataType:'json',
								data:{
									captcha:captcha,
									seed:seed,
									type:0
								},
								success:function(result){
									if(result.state == '0'){
										$('#wBox #esw_auth_code').val(result.data);
										$this.eswCountDownTime = 120;
										$this.eswCountDown();
									}else{
										if(result.state == '1009'){
											wBox.close();
											AA.RapidLogin.popup();
										}else if(result.state==2010){
											$this.showEswErrMsg('图形验证码输入错误,请点击图形刷新重试');
										}else if(result.state==2019){
											$this.showEswErrMsg('等待120秒后再重试');
										}else{
											$this.showEswErrMsg(result.msg);
										}
									}
								}
							});
						});
						
						$('#wBox #esw_send_sms').unbind('click').click($this.eswSendSmsFun);
						$this.eswCountDownTime = 0;
						$this.eswCountDown = (function(){
							if($this.eswCountDownTime > 0){
								$this.eswCountDownTime--;
								$('#wBox #esw_send_sms').removeClass("sub04").addClass("sub01").html('(' + $this.eswCountDownTime + 's)重发');
								$('#wBox #esw_send_sms').unbind("click");
								setTimeout("AccountSettings.eswCountDown()", 1000);
							}else{
								$('#wBox #esw_send_sms').removeClass("sub01").addClass("sub04").html('发送验证码');
								$('#wBox #esw_send_sms').unbind("click").bind('click',$this.eswSendSmsFun);
								
								$this.getEswCreateImgageCaptcha();
							}
						});
						
						$('#wBox #esw_step_one_next1').unbind('click').click(function(){
							var name = $('#wBox #esw_real_name').val();
							var cardNo = $('#wBox #esw_cert_no').val();
							var bankName = $('#wBox #esw_bank_name').val();
							var loc_province = $("#wBox #loc_province :selected").text();
							var loc_city = $("#wBox #loc_city :selected").text();
							var loc_town = $("#wBox #loc_town :selected").text();
							var city = loc_province+ ' ' + loc_city + ' ' +　loc_town;
							var branchName = $('#wBox #esw_branch_name').val();
							var bankNo = $('#wBox #esw_bank_no').val();
							//var mobile = $('#wBox #esw_mobile').val();
							var smsCaptcha = $('#wBox #esw_sms_captcha').val();
							var authCode = $('#wBox #esw_auth_code').val();
							
							$this.hideEswErrMsg();
							
							if(name == ''){
								$this.showEswErrMsg('真实姓名不能为空');
								return;
							}
							if(cardNo == ''){
								$this.showEswErrMsg('身份证号不能为空');
								return;
							}
							if(cardNo.length != 18){
								$this.showEswErrMsg('身份证号必须为18位');
								return;
							}
							
							if(!checkIdentityNumber(cardNo)){
								$this.showEswErrMsg('身份证输入不合法');
								return;
							}
							
							if(bankName == '请选择银行' ){
								$this.showEswErrMsg('请选择银行');
								return;
							}
							
							if(branchName == ''){
								$this.showEswErrMsg('支行名称不能为空');
								return;
							}
							
							if(bankNo == ''){
								$this.showEswErrMsg('银行卡号不能为空');
								return;
							}
							if(isNaN(bankNo)){
								$this.showEswErrMsg('银行卡号只能为数字');
								return;
							}
							
							if(loc_province == '请选择省份'){
								$this.showEswErrMsg('请选择省份');
								return;
							}
							if(loc_city == '请选择城市'){
								$this.showEswErrMsg('请选择城市');
								return;
							}
							if(loc_town == '请选择地区'){
								$this.showEswErrMsg('请选择地区');
								return;
							}
							
							if(mobile.length != 11){
								$this.showEswErrMsg('请正确输入手机号');
								return;
							}
							
							if(smsCaptcha.length != 6){
								$this.showEswErrMsg('请正确输入手机号验证码');
								return;
							}
							
							if(authCode == ''){
								$this.showEswErrMsg('请先发送手机验证码');
								return;
							}
							
							var userType = $('#wBox #esw_user_type').val();
							
							$.ajax({
								url:'/v2/account/esw_create_account.jso',
								type:'post',
								dataType:'json',
								data:{
									name:name,
									//mobile:mobile,
									idCardNo:cardNo,
									bandCardNo:bankNo,
									bankName:bankName,
									batchName:branchName,
									city:city,
									captcha:smsCaptcha,
									authCode:authCode,
									userType:userType
								},
								success:function(result){
									if(result.state == '0'){
										wBox.close();
										alert('开户成功');
									}else{
										if(result.state == '1009'){
											wBox.close();
											AA.RapidLogin.popup();
										}else{
											$this.showEswErrMsg(result.msg);
										}
									}
								}
							});
						});
					}
				});
				wBox.showBox();
			});*/
		},
		getEswCreateImgageCaptcha:function(){
			var seed = new Date().getTime();
			$('#wBox #esw_captcha_seed').val(seed);
			$('#wBox #esw_img_captcha').attr('src','/v2/login/get_captcha.raw?seed='+seed);
		},
		showEswErrMsg:function(msg){
			$("#wBox #esw_error_info").html('<i class="AllIcon iconx"></i>'+msg).show();
		},
		hideEswErrMsg:function(){
			$("#wBox #esw_error_info").html('').hide();
		},
		sendAuthEmailCountDown:function(count){
			var el = $('#wBox #again_send');
			el.html('重发(' + count + ')');
			el.unbind('click');
			if ($this.g_timer3) {
                clearTimeout($this.g_timer3);
            }
            if (--count >= 0) {
            	$this.g_timer3 = setTimeout('AccountSettings.sendAuthEmailCountDown(' + count + ')' ,1000);
            } else {
            	el.removeClass().addClass('sub02');
                el.html('重新发送');
                el.click($this.sendAuthEmailCountDownFun);
            }
		},
		initUpMobilePicCaptcha1:function(){
			$this.getUpMobilePicCaptcha1();
			$('#wBox #up_mobile_pic_captcha_1').unbind('click').click(function(){
				AccountSettings.getUpMobilePicCaptcha1();
			});
			$('#wBox #up_mobile_pic_captcha_1').nextAll('a').unbind('click').click(function(){
				AccountSettings.getUpMobilePicCaptcha1();
			});
		},

		getUpMobilePicCaptcha1:function(){
			$this.seed=new Date().getTime();
			$("#wBox #up_mobile_pic_captcha_seed_1").val($this.seed);
			$('#wBox #up_mobile_pic_captcha_1').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		upMobileMobileCaptchaCountDown1:function(count){
			var el = $('#wBox #send_mobile_captcha_1');
			el.html('(' + count + 's)重发');
			el.unbind('click');
			el.removeClass('sub04').addClass('sub01');
			if ($this.g_timer1) {
                clearTimeout($this.g_timer1);
            }
            if (--count >= 0) {
            	$this.g_timer1 = setTimeout('AccountSettings.upMobileMobileCaptchaCountDown1(' + count + ')' ,1000);
            } else {
                el.prop('disabled',false).html('发送验证码');
                el.click($this.upMobileMobileCaptchaCountDown1Fun);
                el.removeClass('sub01').addClass('sub04');
                $('#wBox #up_mobile_pic_captcha_code_1').val('');
				$this.getUpMobilePicCaptcha1();
            }
		},
		initEmailAuthCaptcha:function(){
			$this.getEmailAuthCaptcha();
			$('#wBox #email_captcha_pic').unbind('click').click(function(){
				AccountSettings.getEmailAuthCaptcha();
			});
			$('#wBox #email_captcha_pic').nextAll('a').unbind('click').click(function(){
				AccountSettings.getEmailAuthCaptcha();
			});
		},
		getEmailAuthCaptcha:function(){
			$this.seed=new Date().getTime();
			$("#wBox #email_captcha_seed").val($this.seed);
			$('#wBox #email_captcha_pic').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		showVoiceTip1:function(){
			$('#wBox #voice_tip_view_1').show();
			setTimeout(function(){
				$('#wBox #voice_tip_view_1').hide();
			},100000);
		},
		initUpMobilePicCaptcha2:function(){
			$this.getUpMobilePicCaptcha2();
			$('#wBox #up_mobile_pic_captcha_2').unbind('click').click(function(){
				AccountSettings.getUpMobilePicCaptcha2();
			});
			$('#wBox #up_mobile_pic_captcha_2').nextAll('a').unbind('click').click(function(){
				AccountSettings.getUpMobilePicCaptcha2();
			});
		},
		getUpMobilePicCaptcha2:function(){
			$this.seed=new Date().getTime();
			$("#wBox #up_mobile_pic_captcha_seed_2").val($this.seed);
			$('#wBox #up_mobile_pic_captcha_2').attr('src','/v2/login/get_captcha.raw?seed='+$this.seed);
		},
		upMobileMobileCaptchaCountDown2:function(count){
			var el = $('#wBox #send_mobile_captcha_2');
			el.html('(' + count + 's)重发');
			el.unbind('click');
			el.removeClass('sub04').addClass('sub01');
			if ($this.g_timer2) {
                clearTimeout($this.g_timer2);
            }
            if (--count >= 0) {
            	$this.g_timer2 = setTimeout('AccountSettings.upMobileMobileCaptchaCountDown2(' + count + ')' ,1000);
            } else {
                el.prop('disabled',false).html('发送验证码');
                el.click($this.upMobileMobileCaptchaCountDown2Fun);
                el.removeClass('sub01').addClass('sub04');
                $('#wBox #up_mobile_pic_captcha_code_2').val('');
				$this.getUpMobilePicCaptcha2();
            }
		},
		showVoiceTip2:function(){
			$('#wBox #voice_tip_view_2').show();
			setTimeout(function(){
				$('#wBox #voice_tip_view_2').hide();
			},100000);
		},
		emergencyMobile:null,
		emergencyName:null,
		emergencyTtpe:null,
		initEmergency:function(){
			$.ajax({
					url:'/v2/communication/get_user_emergency_info.jso',
					type:'post',
					dataType:'json',
					success:function(data){
						if (data.state == 0) {
							var status=data.emergencyStatus;
							emergencyName=data.emergencyName;
							emergencyMobile=data.emergencyMobile;
							emergencyTtpe=data.emergencType;
							if(status==null||status==0){
								$("#do_emergency").show();
								$("#up_emergency").hide();
								$("#hasemergencyInfo_view").hide();
								$('#noemergencyInfo_view').show();
							}else{
								$("#do_emergency").hide();
								$('#noemergencyInfo_view').hide();
								
								var emergencyInfo=emergencyName+","+emergencyMobile+","+RelationShip[emergencyTtpe];
								$("#emergencyInfo").html(emergencyInfo);
								$("#up_emergency").show();
								$("#hasemergencyInfo_view").show();
								
							}
							
						}
					}
					}
					);
		},
		showRiskDialog:function (){
			var wBox=$("#cp-box").wBox({
					title:'风险测评',
					html: $('#cp-box').html()
				});
				wBox.showBox();
				
				var answers; //记录答案集合
				var answer1;
				var answer2;
				var answer3;
				var answer4;
				var answer5;
				var answer6;
				var answer7;
				var answer8;
				var answer9;
				var answer10;
				//第1题
				$('#wBox #risk_next_captcha_1').unbind('click').click(function(){
					answer1 = $('#wBox [name="radio_1"]:checked').val();
					if (answer1==null||answer1=="") {
						$("#wBox #tp-cp-1").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-1").html("");
						$("#wBox #tp-cp-2").html("");
						$('#wBox #cp-list_1').hide();
						$('#wBox #cp-list_2').show();
					}
				});
				//第2题
				$('#wBox #risk_back_captcha_2').unbind('click').click(function(){
					$('#wBox #cp-list_2').hide();
					$('#wBox #cp-list_1').show();
				});
				$('#wBox #risk_next_captcha_2').unbind('click').click(function(){
					answer2 = $('#wBox [name="radio_2"]:checked').val();
					if (answer2==null||answer2=="") {
						$("#wBox #tp-cp-2").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-2").html("");
						$("#wBox #tp-cp-3").html("");
						$('#wBox #cp-list_2').hide();
						$('#wBox #cp-list_3').show();
					}
				});
				//第3题
				$('#wBox #risk_back_captcha_3').unbind('click').click(function(){
					$('#wBox #cp-list_3').hide();
					$('#wBox #cp-list_2').show();
				});
				$('#wBox #risk_next_captcha_3').unbind('click').click(function(){
					answer3 = $('#wBox [name="radio_3"]:checked').val();
					if (answer3==null||answer3=="") {
						$("#wBox #tp-cp-3").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-3").html("");
						$("#wBox #tp-cp-4").html("");
						$('#wBox #cp-list_3').hide();
						$('#wBox #cp-list_4').show();
					}
				});
				//第4题
				$('#wBox #risk_back_captcha_4').unbind('click').click(function(){
					$('#wBox #cp-list_4').hide();
					$('#wBox #cp-list_3').show();
				});
				$('#wBox #risk_next_captcha_4').unbind('click').click(function(){
					answer4 = $('#wBox [name="radio_4"]:checked').val();
					if (answer4==null||answer4=="") {
						$("#wBox #tp-cp-4").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-4").html("");
						$("#wBox #tp-cp-5").html("");
						$('#wBox #cp-list_4').hide();
						$('#wBox #cp-list_5').show();
					}
				});
				//第5题
				$('#wBox #risk_back_captcha_5').unbind('click').click(function(){
					$('#wBox #cp-list_5').hide();
					$('#wBox #cp-list_4').show();
				});
				$('#wBox #risk_next_captcha_5').unbind('click').click(function(){
					answer5 = $('#wBox [name="radio_5"]:checked').val();
					if (answer5==null||answer5=="") {
						$("#wBox #tp-cp-5").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-5").html("");
						$("#wBox #tp-cp-6").html("");
						$('#wBox #cp-list_5').hide();
						$('#wBox #cp-list_6').show();
					}
				});
				//第6题
				$('#wBox #risk_back_captcha_6').unbind('click').click(function(){
					$('#wBox #cp-list_6').hide();
					$('#wBox #cp-list_5').show();
				});
				$('#wBox #risk_next_captcha_6').unbind('click').click(function(){
					answer6 = $('#wBox [name="radio_6"]:checked').val();
					if (answer6==null||answer6=="") {
						$("#wBox #tp-cp-6").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-6").html("");
						$("#wBox #tp-cp-7").html("");
						$('#wBox #cp-list_6').hide();
						$('#wBox #cp-list_7').show();
					}
				});
				//第7题
				$('#wBox #risk_back_captcha_7').unbind('click').click(function(){
					$('#wBox #cp-list_7').hide();
					$('#wBox #cp-list_6').show();
				});
				$('#wBox #risk_next_captcha_7').unbind('click').click(function(){
					answer7 = $('#wBox [name="radio_7"]:checked').val();
					if (answer7==null||answer7=="") {
						$("#wBox #tp-cp-7").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-7").html("");
						$("#wBox #tp-cp-8").html("");
						$('#wBox #cp-list_7').hide();
						$('#wBox #cp-list_8').show();
					}
				});
				//第8题
				$('#wBox #risk_back_captcha_8').unbind('click').click(function(){
					$('#wBox #cp-list_8').hide();
					$('#wBox #cp-list_7').show();
				});
				$('#wBox #risk_next_captcha_8').unbind('click').click(function(){
					answer8 = $('#wBox [name="radio_8"]:checked').val();
					if (answer8==null||answer8=="") {
						$("#wBox #tp-cp-8").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-8").html("");
						$("#wBox #tp-cp-9").html("");
						$('#wBox #cp-list_8').hide();
						$('#wBox #cp-list_9').show();
					}
				});
				//第9题
				$('#wBox #risk_back_captcha_9').unbind('click').click(function(){
					$('#wBox #cp-list_9').hide();
					$('#wBox #cp-list_8').show();
				});
				$('#wBox #risk_next_captcha_9').unbind('click').click(function(){
					answer9 = $('#wBox [name="radio_9"]:checked').val();
					if (answer9==null||answer9=="") {
						$("#wBox #tp-cp-9").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-10").html("");
						$("#wBox #tp-cp-9").html("");
						$('#wBox #cp-list_9').hide();
						$('#wBox #cp-list_10').show();
					}
				});
				//第10题
				$('#wBox #risk_back_captcha_10').unbind('click').click(function(){
					$('#wBox #cp-list_10').hide();
					$('#wBox #cp-list_9').show();
				});
				//提交按钮
				$('#wBox #risk_submit').unbind('click').click(function(){
					answer10 = $('#wBox [name="radio_10"]:checked').val();
					if (answer10==null||answer10=="") {
						$("#wBox #tp-cp-10").html('<i class="AllIcon iconx"></i>选项不能为空')
					}else{
						$("#wBox #tp-cp-10").html("");
						answers = answer1+","+answer2+","+answer3+","+answer4+","+answer5+","+answer6+","+answer7+","+answer8+","+answer9+","+answer10;
						$('#wBox #cp-list_10').hide();
						$.ajax({
							url:'/v2/login/risk_assessment.jso',
							data:{answers:answers},
						    type:'POST' ,
						    dataType:'json',
						    success:function (result) {
								if(result.state==0){
									var riskType = result.riskType;
									if (riskType=='保守型') {
										$('#wBox #cp-ht_1').show();
										$("#tp2").html("重新测评");
										$("#risk_type").html(riskType);
									}else if (riskType=='稳健型') {
										$('#wBox #cp-ht_2').show();
										$("#tp2").html("重新测评");
										$("#risk_type").html(riskType);
									}else if (riskType=='平衡型') {
										$('#wBox #cp-ht_3').show();
										$("#tp2").html("重新测评");
										$("#risk_type").html(riskType);
									}else if (riskType=='积极型') {
										$('#wBox #cp-ht_4').show();
										$("#tp2").html("重新测评");
										$("#risk_type").html(riskType);
									}else if (riskType=='激进型') {
										$('#wBox #cp-ht_5').show();
										$("#tp2").html("重新测评");
										$("#risk_type").html(riskType);
									}else{
										alert("系统繁忙");
										wBox.close();
									}
								}else if (result.state == '1009') {
									wBox.close();
									AA.RapidLogin.popup();
								}else {
									alert("系统繁忙");
									wBox.close();
								}
							}
						});
					}
				});
				$('#wBox #cp-ht-ok_1').unbind('click').click(function(){
					wBox.close();
				});
				$('#wBox #cp-ht-ok_2').unbind('click').click(function(){
					wBox.close();
					$("#risk_type").html(riskType);
				});
				$('#wBox #cp-ht-ok_3').unbind('click').click(function(){
					wBox.close();
					$("#risk_type").html(riskType);
				});
				$('#wBox #cp-ht-ok_4').unbind('click').click(function(){
					wBox.close();
					$("#risk_type").html(riskType);
				});
				$('#wBox #cp-ht-ok_5').unbind('click').click(function(){
					wBox.close();
					$("#risk_type").html(riskType);
				});
				$('#wBox #cp-tz_1').unbind('click').click(function(){
					wBox.close();
					location.href="/invest.shtml";
				});
				$('#wBox #cp-tz_2').unbind('click').click(function(){
					wBox.close();
					location.href="/invest.shtml";
				});
				$('#wBox #cp-tz_3').unbind('click').click(function(){
					wBox.close();
					location.href="/invest.shtml";
				});
				$('#wBox #cp-tz_4').unbind('click').click(function(){
					wBox.close();
					location.href="/invest.shtml";
				});
				$('#wBox #cp-tz_5').unbind('click').click(function(){
					wBox.close();
					location.href="/invest.shtml";
				});
		}
	};
	$(function(){
		$this.isLogin();
		(function checkSafePasswod(){
				$.ajax({
					url : '/v2/login/is_set_safe_pwd.jso',       
					type : 'post',
					dataType : 'json',
					success : function(data) {
					if(data.state == 0){
						IsSettingSafePwd=true; //已设置密码
					}else if(data.state == 2222){//异常信息
						IsSettingSafePwd=false; //未设置密码
						}else {
			    		//	AA.RapidLogin.popup();
							}
					}   
				});  
				
			})();
	});
	AccountSettings = $this;
})();
