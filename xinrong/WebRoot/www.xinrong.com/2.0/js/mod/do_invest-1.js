/**
 * 投资JS
 */
var DO_INVEST_TITLE='';
var DO_INVEST_DEADLINE='';
var get_reward = 0;
var wBox = null;
$('#jiang_show').val(0);
var investSuc = '<div class="esw_dialog" style="width: 450px;">\
    <div class="invest_font">\
    <h2><i class="icondai"></i>投资处理中</h2>\
    <p class="t-f">您的资金将会被短暂冻结，投资结果请稍后查询投资记录</p>\
<a href="javascript:wBox.close();" class="sub02">确定</a> </div>\
    </div>\
    <div class="black20"></div>';
//var PROJECT_TYPE = 0;   //用作是否等额本息转让标标记

/**
 * 投资第一步
 */
function do_invest_step_one(section_id,deadline,title,loan_type,auto_invest,titleIcons,rate,reward,escrowFlag){
	if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {
        AA.RapidLogin.popup();
	}else{
		EswDialog.checkEswCreateStatus(escrowFlag,function(){
			if (!G_ENV_VAR.IS_CHECKED_MOBILE) {
				$.alert({
					title:'您的手机号尚未经过认证！',
	                content:'为了保护您的资金安全，请先完成手机认证后再投资',
	                txtBtn:'立即认证',
	                url:'/2.0/views/account/account_settings.shtml'
	            });
			} else if (!G_ENV_VAR.IS_ID_BANK_LOAD || !G_ENV_VAR.IS_CHECKED_IDENTIFICATION) {
				$.alert({
					title:'您尚未通过实名认证！',
	                content:'为了确定您的电子合同主体，请先完成实名认证再投资',
	                txtBtn:'立即认证',
	                url:'/2.0/views/account/account_settings.shtml'
	            });
//			}else if (!G_ENV_VAR.HAS_TRADE_PASSWORD) {
//				$.alert({
//	                title:'您尚未设置交易密码！',
//	                content:'为了您的资金安全，请先设置交易密码后再投资',
//	                txtBtn:'立即设置',
//	                url:'/2.0/views/account/account_settings.shtml?tab=2'
//				});
			} else{
				var _html = $('#dlg_do_invest_step_one').html();
				$.ajax({
					url:'/v2/project/loan_detail_show.jso',
	         	    type:'POST' ,
	         	    dataType:'json',
	         	    data:{sid:section_id},
	         	    success:function (result) {
	         	    	var money = toDecimal(parseFloat(result.amountMoney)-parseFloat(result.rasiedMoney)+0.0005);
	         	    	var amount = toDecimal(parseFloat(result.amountMoney)+0.0005);
	         	    	if(result.state==0){
	         	    		$.ajax({
	         	    			url:'/v2/escrow/get_account_base_info.jso',
	         	         	    type:'GET' ,
	         	         	    dataType:'json',
	         	         	    success:function (rs) {
	         	         	    	if(rs.state == '0'){
	         	         	    		$.dialog({
	         	         	    			'id':'invest_frist',
	         	         	    			'title':'投资',
	         	         	    			'padding':'10px 10px 10px 10px',
	         	         	    			'content':_html,
	         	         	    			'initialize':function () {
	         	         	    				var dialog=this;
	         	         	    				$('#do_invest_dlg_title').html(title);
												if(typeof titleIcons!='undefined'){
													$('#do_invest_dlg_title_icons').html(getTitleIcons(decodeURIComponent(titleIcons)));
												}
												if(decodeURIComponent(titleIcons).indexOf('E')>=0)
												{
													$('#invest_recharge1').attr('href','/2.0/views/account/esw_recharge.html');
													$('#invest_recharge1').html('存管充值')
												}else{
													$('#invest_recharge1').attr('href','/my/recharge');
													$('#invest_recharge1').html('充值')
												}
												$('#do_invest_dlg_rate').html(rate+"%");
												$('#do_invest_dlg_uname').html(G_ENV_VAR.UNAME);
												
												var totalMoney;
												if(escrowFlag == 1){
													totalMoney = parseFloat(rs.eswRealAvailMoney) + parseFloat(rs.totalMoney);
												}else{
													totalMoney = rs.totalMoney;
												}
	         	         	    				$('#do_invest_dlg_total_money').html(toDecimal(parseFloat(totalMoney)+parseFloat(rs.rewardMoney)+0.0005));
												// if(parseFloat(rs.rewardMoney)<=0)
												// {
												//         	    					$('#do_invest_dlg_reward').html('无礼金可抵扣');
												// 	$('#do_invest_dlg_reward_unit').hide();
												// }
												// else {
													$('#do_invest_dlg_reward').html('--');
													$('#do_invest_dlg_reward_unit').show();
												// }
												$('#do_invest_dlg_reward_total').val(rs.rewardMoney);
	         	         	    				//add by sundy zhou 2016-5-12
	         	         	    				//用户点击“投资”时，判断该项目是否为等额本息转让项目.若是，投资弹框提示信息为“100元起投”.若不是，投资弹框提示信息为“100元起投，需100元整数倍”
	         	         	    				if(result.refundType==2&&result.transferOrnot==1){
	         	         	    					//PROJECT_TYPE = 1;
	         	         	    					$("#do_invest_dlg_invest_tip").css('display','none');
	         	         	    					$("#allicon_iconI").css('display','none');
	         	         	    				}else{
	         	         	    					//PROJECT_TYPE = 0;
	         	         	    					$('#do_invest_dlg_invest_tip').html("100元起投，需100元整数倍");
	         	         	    				}
	         	         	    				//end
	                                            //console.info(deadline);
	         	         	    				var show_deadline=deadline;
												if(loan_type==1){
													show_deadline=''+deadline+'';
												}else{
													if(deadline.indexOf("月")>0){
														show_deadline=''+deadline+'';
													}else{
														show_deadline=''+deadline+'个月';
													}
												}
												/*var computeLength=1;
												var newDeadlineStr=show_deadline;
												if(G_ENV_VAR.VIP>0){
														if(newDeadlineStr.indexOf("月")>-1){
															for(i=0;i<show_deadline.length;i++){
																	if(!/^[0-9]+[0-9]*]*$/.test(show_deadline[i]))
																	{computeLength=i;
																	break;
																	}
															}
															if(show_deadline.substring(0,computeLength)>=2){
																newDeadlineStr="1~"+show_deadline;	
																}else{
																	newDeadlineStr=show_deadline;
																	$('#show_vip_tip').hide();
																}
														}
												
																				
												}else{
													newDeadlineStr=show_deadline;
													for(i=0;i<show_deadline.length;i++){
													if(!/^[0-9]+[0-9]*]*$/.test(show_deadline[i]))
													{computeLength=i;
													break;}
													}
												if(show_deadline.substring(0,computeLength)>=2){
														
													}else{
														
														$('#show_vip_tip').hide();
													}
												}
	         	         	    	        	$('#do_invest_dlg_deadline').html(newDeadlineStr);*/
												$('#do_invest_dlg_deadline').html(show_deadline);

	         	         	    	        	if(money!=null&&money<=100){
	         	    								$('#do_invest_dlg_invest_money').val(money);
	         	    								$('#do_invest_dlg_invest_money').attr('readonly','readonly');
	         	    								$('#transfer_tip').show();
													$('#transfer_tip').html('<i class="AllIcon iconI"></i><font>融资金额不足100元，需一次性全额投完</font>');
	         	        						}
	         	         	    	        	/*if(money%100!=0){
	         	         	    	        		$('#do_invest_dlg_invest_money').attr('readonly','readonly');
	         	         	    	        		$('#do_invest_dlg_invest_money').val(money);
	         	         	    	        	}*/

	         	         	    	        	$('#hl_section').val(section_id);
	         	         	    	        	$('#hl_auto').val(auto_invest);
	         	         	    	        	DO_INVEST_TITLE=title;
	         	         	    	        	DO_INVEST_DEADLINE=show_deadline;
	         	         	    	        	if(money!=null){
	         	         	    	        		$('#do_invest_dlg_section_amount').text(money);
	         	         	    	        	}else{
	         	         	    	        		$('#do_invest_dlg_section_amount').text(amount);
	         	         	    	        	}
												get_reward=0;
												if(reward>0){
													$('#get_reward').text(reward+'%');
													$('#get_reward').val(reward+'%');
													$('#get_reward_li').show();
													get_reward=reward;
												}

//												$('#do_invest_dlg_invest_money').keyup(function(){
//													var investMoney=parseFloat($('#do_invest_dlg_invest_money').val());
//													if(parseFloat(rs.rewardMoney)<=0)
//													{
//														$('#do_invest_dlg_reward').html("无礼金可抵扣");
//														$('#do_invest_dlg_reward_unit').hide();
//													}else{
//														if(investMoney>parseFloat(rs.rewardMoney))
//														{
//																$('#do_invest_dlg_reward').html(rs.rewardMoney);
//														}else {
//																$('#do_invest_dlg_reward').html(investMoney);
//														}
//														$('#do_invest_dlg_reward_unit').show();
//													}
//													// $.ajax({
//													// 	url:'/v2/project/get_refund_info.jso',
//										      //    	    type:'POST' ,
//										      //    	    dataType:'json',
//										      //    	    data:{sid:section_id,money:$('#do_invest_dlg_invest_money').val()},
//										      //    	    success:function (result) {
//													// 					if(result.state==0)
//													// 					{
//													// 						$('#do_invest_dlg_total_interest').html(result.totalInterest);
//													// 					}
//													// 					else {
//													// 						$('#do_invest_dlg_total_interest').html("--");
//													// 					}
//													// 				}
//													// 			});
//													// console.log(	);
//												});
	         	         	    	        	if(parseFloat(rs.rewardMoney)<=0)
												{
													$('#do_invest_dlg_reward').html("无礼金可抵扣");
													$('#do_invest_dlg_reward_unit').hide();
												}else{
													if(parseFloat(money)>parseFloat(rs.rewardMoney))
													{
															$('#do_invest_dlg_reward').html(rs.rewardMoney);
													}else {
															$('#do_invest_dlg_reward').html(money);
													}
													$('#do_invest_dlg_reward_unit').show();
												}
	         	         	    	        	
												document.onkeydown = function(e){
													var ev = document.all ? window.event : e;
													if(ev.keyCode==13) {
														var target=ev.srcElement ? ev.srcElement : ev.target;
														//var target=e.target;
														if(target.id=='do_invest_dlg_invest_money'){
															//console.log('fire do_invest_dlg_sub_next');
															$('#do_invest_dlg_sub_next').click();
														}else{
															/*e.preventDefault();
															var nextTabIndex = parseInt($('#'+target.id).attr('tabindex')) + 1;
															console.log('Trigger cr @'+target.id+' nav2 tabindex '+nextTabIndex );
															jQuery("[tabindex='"+nextTabIndex+"']:first").focus();
															*/
														}
													 }
												}
												

												$('#do_invest_dlg_sub_next').bind('click',function () {
													//console.log("do_invest_dlg_sub_next.click");
													//修改2因为之前拿的是标的总额，所以修改成剩余可投余额
													if(result.transferOrnot==1){//是转让保持以前逻辑//其中0代表没转让
														sub_do_invest_next(amount,section_id,loan_type,dialog,titleIcons,rate,escrowFlag);
													}else{
														if(money!=null){
															sub_do_invest_next(money,section_id,loan_type,dialog,titleIcons,rate,escrowFlag);
														}else{
															sub_do_invest_next(amount,section_id,loan_type,dialog,titleIcons,rate,escrowFlag);
														}
													}
	         	         	    	        		
	         	         	    	        	});
												$('#do_invest_dlg_invest_money').focus();
												//添加等额本息转让提示
												if(result.refundType==2&&result.transferOrnot==1){
													 $('#btn_auto_fill').removeAttr('href');
													 $('#btn_auto_fill').removeAttr('onclick');
	         	         	    					if(parseFloat(toDecimal(parseFloat(totalMoney)+parseFloat(rs.rewardMoney)+0.0005))<parseFloat(money)){
														$('#invest_so_error_tip').show();
														 $('#invest_so_error_msg').text('等额本息转让项目需一次性投完，您的可用金额不足');
														 $("#do_invest_dlg_invest_money").val(parseFloat(money));
														 $('#do_invest_dlg_sub_next').unbind('click');
													}else{
														//足够的金额时，应该填充
														var usermoney=parseFloat(money);
														$("#do_invest_dlg_invest_money").val(usermoney);
														$("#do_invest_dlg_invest_money").attr('readonly','true');
														$('#transfer_tip').show();
													}
	         	         	    				}
	         	         	    			}
	         	         	    		});
	         	         	    	}else{
	         	         	    		//增加两小时后登陆超时情况
	         	         	    		if(rs.state == '1009'){
	         	         	    			AA.RapidLogin.popup();
	         	         	    			return;
	         	         	    		}
	         	         	    	}
	         	         	    }
	         	    		});
	         	    	}
	         	    }
				});
			}
		});
	}
}

/**
 * 投资第二步，核实投资额度，项目余额，开始时间
 */
function sub_do_invest_next(amount,section_id,loan_type,dialog,titleIcons,rate,escrowFlag){
	var my=$('#do_invest_dlg_invest_money').val();
	$('#quick_invest_error_view').empty();
	var balance=parseFloat($('#do_invest_dlg_total_money').html());
	var reward=parseFloat($('#do_invest_dlg_reward_total').val());
	
	if(!!!my || isNaN(my)){
		$('#invest_so_error_tip').show();
        $('#invest_so_error_msg').text('请输入正确金额数');
        $('#totalInterest').html('- 元');
        $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>100元起投，需投100元整数倍');
		return ;
	}
	
	if(my>10000000000){
        $('#invest_so_error_tip').show();
        $('#invest_so_error_msg').text('请输入正确金额数');
        $('#totalInterest').html('- 元');
        $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>100元起投，需投100元整数倍');
		return ;
	}
	
	
	if(parseFloat(my)>balance)
	{
		$('#invest_so_error_tip').show();
        $('#invest_so_error_msg').text('账户可投余额不足,请及时充值');
        $('#totalInterest').html('- 元');
        $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>账户可投余额不足,请及时充值');
		return;
	}
	//添加用户输入金额大于100元的要100整投，要么就要全吃了
	if(parseFloat(my)>=100)
	{
		if(parseFloat(amount)!=parseFloat(my)){
		if(my%100!=0){
		$('#invest_so_error_tip').show();
        $('#invest_so_error_msg').text('请输入正确金额数');
        $('#totalInterest').html('- 元');
        $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>100元起投，需投100元整数倍');
		return;
		}
		}
	}else{
		//用户输入金额小于100的时候，如果标的剩余金额》=100的时候，那么提示要100整投，如果标的金额小于100的时候，那么用户要全投了
		if(parseFloat(amount)>=100){
			if(parseFloat(my)<100){
				$('#invest_so_error_tip').show();
					$('#invest_so_error_msg').text('请输入正确金额数');
					$('#totalInterest').html('- 元');
					$('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>100元起投，需投100元整数倍');
					return;
			}
		}else{
			my=amount.toString();
		}
		
	}	
	//添加由于输入以.00结束的判断有误 所以添加
	var newMy=my.toString();
	if(/^([0-9]+\.[0]{1,2})$/.test(my.toString())){
		var pointIndex=newMy.indexOf("\.");
		my=newMy.substr(0,pointIndex);
	}
	
	var check_money=check_validateNum(my,amount);
	if(check_money){
		do_invest_show_trade_pass(my,section_id, loan_type,titleIcons,rate,escrowFlag);
		document.onkeydown=null;
		dialog && dialog.close();
		/*AA.Api.async({
			url:'/loan/api_invest_frist',
			data:{lid:section_id,money:my},
			success:function (result) {
				if(result.state==1){
					do_invest_show_trade_pass(my,section_id, loan_type,titleIcons,rate,escrowFlag);
					document.onkeydown=null;
					dialog && dialog.close();
				}else if(result.error==401){
					dialog && dialog.close();
					$.alert({
						title:'此项目已融资完，敬请期待下一项目！',
		                content:'<p style="margin-top: 5px;">项目余额：<font color=red>0.00</font>元</p><p style="margin-top: 10px;">项目总金额：'+amount+'</p>',
		                txtBtn:'确定',
		                init:function (d ,txtBtn) {
		                	txtBtn.click(function () {
		                    	 d.close();
		                 	});
		                 }
		            });
				}else if(result.error==402){
					//dialog && dialog.close();
					$.alert({
		                title:'项目余额不足',
		                content:'<p style="margin-top: 5px;">项目余额：<font color=red>'+result.money+'</font> 元</p><p style="margin-top: 10px;">投资总额：'+my+' 元</p>',
						txtBtn:'按余额投资',
		                txtBtn1:'重新设定',
		                init:function (d ,txtBtn,txtBtn1) {
		                	txtBtn.click(function(){
		                		var mo=result.money;
		                		AA.Api.async({
		                			url:'/loan/api_invest_frist',
		                			data:{lid:section_id,money:my},
		                			success:function (rs) {
		                				if(rs.state==1){

		                				}
		                			}
		                		});
		                	});
							txtBtn.click(function () {
								$('#do_invest_dlg_invest_money').val(result.money);
		                		d.close();
		                	});
		                	txtBtn1.click(function () {
		                		d.close();
		                	});
		                }
					});
				}
			}
		});*/
	}else{
		$('#invest_so_error_tip').show();
        $('#invest_so_error_msg').text('请输入正确金额数');
        $('#totalInterest').html('- 元');
        $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>100元起投，需投100元整数倍');
	}
}


/**
 * 投资弹层-输入交易密码
 */
function do_invest_show_trade_pass(money,section_id,loan_type,titleIcons,rate,escrowFlag){
	$.ajax({
		url:'/v2/escrow/get_account_base_info.jso',
		type:'post',
		dataType:'json',
		success:function (result) {
			var _html = $('#wgt-dialog-invest-two-wrapper').html();
			$.dialog({
				title:'投资确认',
				padding:'10px 10px 10px 10px',
				content:_html,
				height:'380px',
				initialize:function () {
					var _dialog = this,
					_input = $("#do_invest_two_tradepass"),
					_btn_submit = $('#do_invest_two_sub'),
					_tip = $('#do_invest_two_error_tip'),
					_tip_msg=$('#do_invest_two_error_msg'),
					_totalMoney = parseFloat(result.totalMoney), // 账户余额
					_rewardMoney = parseFloat(result.rewardMoney), //投资礼金
					_money = parseFloat(money), //投资金额
					_giftMoney, //礼金抵扣
					_payMoney = _money, //支付金额
					_lack = (_totalMoney + _rewardMoney) < _money;//余额+礼金 ? 投资金额
					
					if(escrowFlag == 1){
						_totalMoney = parseFloat(result.eswRealAvailMoney);
						_lack = (_totalMoney + _rewardMoney) < _money;
					}
					
					$('#do_invest_dlg_total_interest').html("...");
					$('#do_invest_manage_fee').html("...");
					$('#ui-tip01').hide();
					
					if(typeof titleIcons!='undefined') {
						$('#do_invest_dlg_title_icons').html(getTitleIcons(decodeURIComponent(titleIcons)));
					}
					$('#do_invest_dlg_rate').html(rate+"%");
					if(_rewardMoney<=0){
						$('#do_invest_two_reward').html("无礼金可抵扣");
						$('#do_invest_two_reward_unit').hide();
					}else{
						if(_money>_rewardMoney)
							$('#do_invest_two_reward').html(_rewardMoney);
						else {
								$('#do_invest_two_reward').html(_money);
						}
						$('#do_invest_two_reward_unit').show();
					}
					
					{
						$('#do_invest_two_tradepass_eyeclose').unbind('click').bind('click',function(e){
							$("#do_invest_two_tradepass").toggle();
							$("#do_invest_two_tradepass_plain").toggle();
							$(".d_eye_close").toggle();
							$(".d_eye_open").toggle();
						});
						$('#do_invest_two_tradepass_eyeopen').unbind('click').bind('click',function(e){
							$("#do_invest_two_tradepass").toggle();
							$("#do_invest_two_tradepass_plain").toggle();
							$(".d_eye_close").toggle();
							$(".d_eye_open").toggle();
						});
						$("#do_invest_two_tradepass").unbind("change").bind("change",function () {
							if($("#do_invest_two_tradepass").is(":visible"))
							{
								$("#do_invest_two_tradepass_plain").val($("#do_invest_two_tradepass").val());
							}
						});
						$("#do_invest_two_tradepass_plain").unbind("change").bind("change",function () {
							if($("#do_invest_two_tradepass_plain").is(":visible"))
							{
								$("#do_invest_two_tradepass").val($("#do_invest_two_tradepass_plain").val());
							}
						});
					}
					
					//初始化验证码
					init_tradepass_dlg_captcha();
	
					$.ajax({
		      			url:'/v2/project/get_refund_info_by_user.jso',
		      			type:'post',
		      			dataType:'json',
		      			data:{
		      				sid:section_id,
		      				money:money,
		      			},
		      			success:function(result){
							$('#do_invest_dlg_total_interest').html(result.totalInterest);
							$('#do_invest_manage_fee').html(result.totalInvestManage);
	
						}
					});
					
					$('#do_invest_two_tradepass').focus();
					$('#do_invest_two_title').html(DO_INVEST_TITLE);
					$('#do_invest_two_uname').html(G_ENV_VAR.UNAME);
					$('#do_invest_two_user_total_money').html(_totalMoney);
					$('#do_invest_two_money').html(money);
					if(get_reward>0){
						$('#get_reward').text(get_reward+'%');
						$('#get_reward').val(get_reward+'%');
						$('#get_reward_li').show();
					} else if(0!=$('#jiang_show').val() && undefined !=$('#jiang_show').val()){
						$('#get_reward').text($('#jiang_show').val());
						$('#get_reward_li').show();
					}
					get_reward=0;
					//添加1-xx
					/*var computeLength=1;
					var newDeadlineStr=DO_INVEST_DEADLINE;
					if(G_ENV_VAR.VIP>0){
								if(newDeadlineStr.indexOf("月")>-1){
									for(i=0;i<DO_INVEST_DEADLINE.length;i++){
								if(!/^[0-9]+[0-9]*]*$/.test(DO_INVEST_DEADLINE[i]))
								{computeLength=i;
								break;}
								}
							if(DO_INVEST_DEADLINE.substring(0,computeLength)>=2){
								newDeadlineStr="1~"+DO_INVEST_DEADLINE;	
								}else{
									newDeadlineStr=DO_INVEST_DEADLINE;
									$('#show_vip_tip').hide();
								}
								}
								
					}else{
						newDeadlineStr=DO_INVEST_DEADLINE;
						for(i=0;i<DO_INVEST_DEADLINE.length;i++){
						if(!/^[0-9]+[0-9]*]*$/.test(DO_INVEST_DEADLINE[i]))
						{computeLength=i;
						break;}
						}
					if(DO_INVEST_DEADLINE.substring(0,computeLength)>=2){
						
						}else{
							
							$('#show_vip_tip').hide();
						}
					}
					
	  	      		$('#do_invest_two_deadline').html(newDeadlineStr);*/
					$('#do_invest_two_deadline').html(DO_INVEST_DEADLINE);
					
					var vip_level;
					//获取VIP 等级
					$.ajax({
						url : '/v2/vip/user_growth_info.jso',
						type : 'post',
						dataType : 'json',
						success : function(result) {
							if(result.state == 0){
								vip_level = result.curVip;;
							}else{
								_tip_msg.html('系统繁忙，请您稍后再试!');
							}
							$('#do_invest_two_tradepass').focus();
						}
					});
					var double_act = false;
					//获取是否双倍积分活动
					$.ajax({
						url:'/v2/active/get_conf_double_score_or_not.jso',
						type:'post',
						dataType:'json',
						success:function(result){
							if(result.state == 1 && result.data == true){
								double_act = true;
							}
							$('#do_invest_two_tradepass').focus();
						}
					});
					var isReward = false;
					var reward = 0;
					//判断是否应该计算礼金
					$.ajax({
						url : '/v2/project/validate_reward.jso',
						type : 'post',
						dataType : 'json',
						data:{id:section_id},
						success : function(result) {
							if(result.state == 0){
								if(result.sectionType==0  && Number(result.reward) > 0){
									isReward=true;
									reward = Number(result.reward);
								}
							}else{
								_tip_msg.html('系统繁忙，请您稍后再试!');
							}
							$('#do_invest_two_tradepass').focus();
						}
					});
					
					if (result.state == 0) {
						if(escrowFlag == 1){
							var captcha=$('#do_invest_two_cap_input');
							esw_do_invest_pay({
								lackBalance:_lack,
								callback:function (_captcha,_seed) {
									EscrowApiJx.manualInvest({'section_id':section_id,'lMoney':money,'captcha':_captcha,'seed':_seed,'channel':1},function(result){
										if(result.state==1101){
    										_tip_msg.html('账户可投余额不足,请及时充值');
    										_tip.show();
    									}else if(result.state==1111){
    										_dialog.close();
    										$.alert({
    											title:'投资出现异常！',
    											content:'<p style="margin-top: 5px;">请检查您的网络连接或稍后再试。</p>',
    											txtBtn:'确定',
    											init:function (d ,txtBtn) {
    												txtBtn.click(function () {
    													d.close();
    												});
    											}
    										});
    									}else if(result.state==2075){
    										_tip_msg.html(result.msg);
    										_tip.show();
    									}else if(result.state==2008||result.state==2009){
    										_tip_msg.html('交易密码错误!');
    										_tip.show();
    										captcha.val('');
    										get_tradepass_dlg_captcha();
    									}else if(result.state==2010){
    										_tip_msg.html('验证码错误!');
    										_tip.show();
    										captcha.val('').focus();
    										get_tradepass_dlg_captcha();
    									}else if(result.state==3002){
    										_tip_msg.html('每个手动限额项目投资项目不能高于1万元');
    										_tip.show();
    									}else if(result.state==1102){
    										_tip_msg.html('验证码失效');
    										_tip.show();
    										captcha.val('').focus();
    										get_tradepass_dlg_captcha();
    									}else if(result.state==1110){
    										_tip_msg.html('您不能投资自己转让的项目');
    										_tip.show();
    									}else if(result.state == 1140){
    										_tip_msg.html('项目余额不足，请重新输入投资金额');
    										_tip.show();
    									}else if(result.state == 1009){
    										_dialog.close();
    										AA.RapidLogin.popup();
    									}else{
    										_tip_msg.html('系统繁忙，请您稍后再试!');
    										_tip.show();
    									}
									});
								}
							});
						}else{
							$('#do_invest_two_tradepass').focus();
							do_invest_pay({
	  	      					lackBalance:_lack,
	  	      					callback:function (_val,_captcha,_seed) {
		  	      					$.ajax({
	  	      							url:'/v2/invest/invest.jso',
	  	      							type:'post',
	  	      							dataType:'json',
	  	      							data:{
	  	      								sPass:AA.Helper.encrypPw(_val),
	  	      								section_id:section_id,
	  	      								lMoney:money,
	  	      								captcha:_captcha,
	  	      								seed:_seed
	  	      							},
	  	      							success:function(result){
		  	      							var captcha=$('#do_invest_two_cap_input');
	  	      								var _isVip = G_ENV_VAR.VIP == '0',
	  	      								_extraInfo = '<div class="extra-info"><a href="' + AA.Helper.buildUrl('vip') + '" target="_blank">';
	  	      								
	  	      								if(result.state==0){
		  	      								$('#ui-tip01').hide();
	  	      									var _d = result.data;
	  	      									if(_d.p_time==null||_d.p_time==0){
	  	      										_tip_msg.html('系统繁忙，请您稍后再试!');
	  	      										_tip.show();
	  	      										return;
	  	      									}
	  	      									_dialog.close();
	  	      									
	  	      									AA.Api.async({
	  	      										url:'/contract/api_con',
	  	      										type:'GET',
	  	      										data:{lid:result.lid}
	  	      									});
	  	      									
		  	      								var p_time=_d.deadline+'个月';
	  	      									var d = _d.deadline;
	  	      									if(_d.tui>0){
	  	      										p_time=p_time+'+'+_d.tui+'天。' ;
	  	      										d = _d.deadline + _d.tui/30;
	  	      									}
	  	      									
		  	      								var rTime=AA.Helper.date(_d.p_time,'Y-m-d');
	  	      									
	  	      									try {
	  	      										Index.initLoanInfo();
	  	      									} catch (e) {
	  	      										try {
	  	      											Invest.initLoanInfo();
	  	      										} catch (e) {
	  	      											initInvestList();
	  	      										}
	  	      									}
	  	      									
		  	      								var vipRateList=[1.1,1.1,1.2,1.2,1.3,1.3,1.4,1.4,1.5];
	  	      									var vipRate ;
	  	      									if (vip_level>0) {
	  	      										vipRate = vipRateList[vip_level-1];
	  	      									}else{
	  	      										vipRate = 1;
	  	      									}
	  	      									
	  	      									//计算本次投资获得的积分
	  	      									//var jifen = money*0.25*d*vipRate;
	  	      									var jifenDay = money*0.25*_d.deadline*vipRate;
	  	      									var jifenMonth = money*0.25*_d.tui/30*vipRate;
	  	      									var jifen = parseInt(jifenDay) + parseInt(jifenMonth);
	  	      									if (double_act) {
	  	      										jifen = jifen*2;
	  	      									}
	  	      									//向下取整
	  	      									jifen = parseInt(jifen);
	  	      									
	  	      									var _reward = 0;
	  	      									if (isReward) {
	  	      										_reward = (money*reward/100).toFixed(2);
	  	      									}
	  	      									
		  	      								var contents ;
	  	      									if (_reward!=0) {
	  	      										contents = '<p style="margin-top: 10px;">到期本息：'+ _d.earn + '元，回款日期：'+rTime+'，计息时长：'+p_time+'</p>'
	  	      										+'<p style="margin-top: 10px;">获得礼金：'+_reward+'元'+'<i class="AllIcon iconI" style="margin-left:15px"></i>可抵用部分或全部投资金额</p>'
	  	      										+'<p style="margin-top: 10px;">获得积分：'+jifen+'分<a href="/gift" target="_black" class="blue" style="margin-left:15px">兑礼品></a><a href="/action/jf" target="_black"  class="blue" style="margin:5px">去抽奖></a></p>';
	  	      									}else{
	  	      										contents = '<p style="margin-top: 10px;">到期本息：'+ _d.earn + '元，回款日期：'+rTime+'，计息时长：'+p_time+'</p>'
	  	      										+'<p style="margin-top: 10px;">获得积分：'+jifen+'分<a href="/gift" target="_black"  class="blue" style="margin-left:15px">兑礼品></a><a href="/action/jf" target="_black"  class="blue" style="margin:5px">去抽奖></a></p>';
	  	      									}
	  	      									
		  	      								$.alert({
	  	      										padding:'30px 0 0 45px',
	  	      										height:'300px',
	  	      										tipCls:'success1',
	  	      										title:'您的投资已成功！',
	  	      										content:contents,
	  	      										txtBtn:'继续投资',
	  	      										txtBtn1:'返回',
	  	      										init:function (dialog ,btn ,btn1) {
	  	      											btn.click(function () {
	  	      												dialog.close();
	  	      												//window.open(AA.Helper.buildUrl('/action/jf'),'newwindow');
	  	      												window.open(AA.Helper.buildUrl('/invest.shtml'),'newwindow');
	  	      												
	  	      											});
	  	      											
	  	      											btn1.click(function () {
	  	      												dialog.close();
	  	      												//window.open(AA.Helper.buildUrl('/gift'),'newwindow');
	  	      											});
	  	      										}
	  	      									});
		  	      								_isVip ? $('.wgt-dialog-alert').append(_extraInfo + '成为VIP会员，享受本金收益保障等多项特权！</a></div>') : '';
	  	      								}else{
	  	      									if(result.state==1101){
	  	      										_tip_msg.html('账户可投余额不足,请及时充值');
	  	      										_tip.show();
	  	      										_input.val('').focus();
	  	      									}else if(result.state==1111){
	  	      										_dialog.close();
	  	      										$.alert({
	  	      											title:'投资出现异常！',
	  	      											content:'<p style="margin-top: 5px;">请检查您的网络连接或稍后再试。</p>',
	  	      											txtBtn:'确定',
	  	      											init:function (d ,txtBtn) {
	  	      												txtBtn.click(function () {
	  	      													d.close();
	  	      												});
	  	      											}
	  	      										});
	  	      									}else if(result.state==2075){
	  	      										_tip_msg.html(result.msg);
	  	      										_tip.show();
	  	      									}else if(result.state==2008||result.state==2009){
	  	      										_tip_msg.html('交易密码错误!');
	  	      										_tip.show();
	  	      										_input.val('').focus();
	  	      										captcha.val('');
	  	      										get_tradepass_dlg_captcha();
	  	      									}else if(result.state==2010){
	  	      										_tip_msg.html('验证码错误!');
	  	      										_tip.show();
	  	      										captcha.val('').focus();
	  	      										get_tradepass_dlg_captcha();
	  	      									}else if(result.state==3002){
	  	      										_tip_msg.html('每个手动限额项目投资项目不能高于1万元');
	  	      										_tip.show();
	  	      										_input.val('').focus();
	  	      									}else if(result.state==1102){
	  	      										_tip_msg.html('验证码失效');
	  	      										_tip.show();
	  	      										captcha.val('').focus();
	  	      										get_tradepass_dlg_captcha();
	  	      									}else if(result.state==1110){
	  	      										_tip_msg.html('您不能投资自己转让的项目');
	  	      										_tip.show();
	  	      										_input.val('').focus();
	  	      									}else if(result.state == 1140){
	  	      										_tip_msg.html('项目余额不足，请重新输入投资金额');
	  	      										_tip.show();
	  	      									}else if(result.state == 2062){
	  	      										_tip_msg.html('您需要通过实名认证');
	  	      										_tip.show();
	  	      									}else if(result.state == 1009){
	  	      										_dialog.close();
	  	      										AA.RapidLogin.popup();
	  	      									}else{
	  	      										_tip_msg.html('系统繁忙，请您稍后再试!');
	  	      										_tip.show();
	  	      									}
	  	      								}
	  	      								$('#do_invest_two_tradepass').focus();
	  	      							}
		  	      					});
	  	      					}
							});
						}
					}
				}
			});
			
		}
	});
}

function investRetShow(){
    var sn=XR.Global.GetUrlParam("bidSn");
    if(sn == null){
    	return;
    }

    var c = XR.Global.GetCookie("investSuc");
    if(!!c&&c==sn){
    	return;
	}
    EscrowApiJx.queryInvestResult({sn:sn},function(result){
		if(result.state==0){
			var double_act = false;
			var reward = 0;
			//获取是否双倍积分活动

            wBox= $.dialog({
                'title':'提示',
                'padding':'0px 0px 0px 0px',
                'content':investSuc,
                'initialize':function () {
                }
            });


            XR.Global.SetCookie("investSuc",sn,1);
			
		}
	});
}

function do_invest_pay(data){
	var _input = $("#do_invest_two_tradepass"),
	_errorForm = $('#do_invest_two_error_tip'),
	_btn = $('#do_invest_two_sub'),
	_tip = $('#do_invest_two_error_tip'),
	_tip_msg=$('#do_invest_two_error_msg'),
	_lack = data.lackBalance || false
	_captcha=$("#do_invest_two_cap_input");

	_btn.click(function () {
		//console.log("do_invest_pay click!");
		var _val = $.trim(_input.val());

		if (_val == "") {
			_tip_msg.html('请填写交易密码');
			_tip.show();
			_input.focus();
			return false;
		} else if (_val.length < 6 || _val.length > 16) {
			_tip_msg.html('交易密码必须为6-16个字符');
			_tip.show();
			_input.focus();
			return false;
		} else {
			_tip.hide();

			var _cVal=_captcha.val();
			if(_cVal==""){
				_tip_msg.html('请填写验证码');
				_tip.show();
				_captcha.focus();
				return false;
			}else if(_cVal.length !=4){
				_tip_msg.html('验证码必须为4个字符');
				_tip.show();
				_captcha.focus();
				return false;
			}else{
				_tip.hide();

				$('#ui-tip01').show();
				data.callback && data.callback(_val,_cVal,$('#do_invest_two_seed').val());
			}
		}
	});
	document.getElementById('do_invest_two_tradepass').focus();
	//_input.focus();
	document.onkeydown = function(e){
		var ev = document.all ? window.event : e;
		if(ev.keyCode==13) {
			var target=ev.srcElement ? ev.srcElement : ev.target;
			if(target.id=='do_invest_two_sub')
			{
//				console.log("fire click!");
//				$('#do_invest_two_sub').click();
			}
			else
			{
				$('#do_invest_two_sub').click();
				/*	e.preventDefault();
					var nextTabIndex = parseInt($('#'+target.id).attr('tabindex')) + 1;
					console.log('Trigger cr @'+target.id+' nav2 tabindex '+nextTabIndex );
					jQuery("[tabindex='"+nextTabIndex+"']:first").focus();*/
			}

		 }
	}
}

function esw_do_invest_pay(data){
	var _input = $("#do_invest_two_tradepass"),
	_errorForm = $('#do_invest_two_error_tip'),
	_btn = $('#do_invest_two_sub'),
	_tip = $('#do_invest_two_error_tip'),
	_tip_msg=$('#do_invest_two_error_msg'),
	_lack = data.lackBalance || false
	_captcha=$("#do_invest_two_cap_input");

	$('.d-dialog dl.tradepass').hide();
	_btn.click(function () {
		_tip.hide();

		var _cVal=_captcha.val();
		if(_cVal==""){
			_tip_msg.html('请填写验证码');
			_tip.show();
			_captcha.focus();
			return false;
		}else if(_cVal.length !=4){
			_tip_msg.html('验证码必须为4个字符');
			_tip.show();
			_captcha.focus();
			return false;
		}else{
			_tip.hide();

			$('#ui-tip01').show();
			data.callback && data.callback(_cVal,$('#do_invest_two_seed').val());
		}
	});

	document.onkeydown = function(e){
		var ev = document.all ? window.event : e;
		if(ev.keyCode==13) {
			var target=ev.srcElement ? ev.srcElement : ev.target;
			if(target.id=='do_invest_two_sub'){
//				console.log("fire click!");
//				$('#do_invest_two_sub').click();
			}else{
				$('#do_invest_two_sub').click();
			}
		 }
	}
}


function check_validateNum(value,all){
	var isnum=value.match(new RegExp("^[0-9]+$"));

	if(isnum!=null){
		var zs=(value%100==0);
		if(zs){
			if(value>=100){
				return true;
			}else{
				if(all*1.0==value*1.0){
					return true;
				}else{
					return false;
				}
			}
		}else{
			if(all%100!=0){
				return true;
			}
			return false;
		}
	}else{
		if(all%100!=0){
			return true;

		}
		return false;
	}
}

//function auto_fill(){
//	var sid=$('#hl_section').val();
//	var url='/v2/invest/auto_fill_money.jso';
//
//	if($('#hl_auto').val()==0){
//		url='/turn/api_auto_fill_special_money';
//		AA.Api.async({
//			url:url,
//			data:{section_id:sid},
//			success:function (result) {
//				if(result.state==1){
//					if(result.money>=100){
//						$('#do_invest_dlg_invest_money').val(result.money);
//						$('#do_invest_dlg_invest_money').keyup();
//					}
//				}else{
//		            if(result.error==1010){
//			            $('#btn_auto_fill').css('color','gray');
//			            $('#btn_auto_fill').css('cursor','default');
//		            	//$('#error-form').show();
//			            // $('#error_show').text('余额不足，请立即充值!');
//		            }
//				}
//			}
//		});
//	}else{
//		AA.Api.async({
//			url:url,
//			data:{sid:sid},
//			success:function (result) {
//				if(result.state==0){
//					if(result.money>=100){
//						var money;
//						if (PROJECT_TYPE==0) { //非等额本息转让
//							if (result.money%100>0) { //非100整数倍
//								money= parseInt(result.money);
//							}else{
//								money=(parseInt(result.money/100))*100;
//							}
//							
//						}else{
//							money=Number(result.money).toFixed(2);
//						}
//						$('#do_invest_dlg_invest_money').val(money);
//						$('#do_invest_dlg_invest_money').keyup();
//					}
//				}else{
//		            if(result.error==1010){
//			            $('#btn_auto_fill').css('color','gray');
//			        	$('#btn_auto_fill').css('cursor','default');
//		            	//$('#error-form').show();
//			           // $('#error_show').text('余额不足，请立即充值!');
//		            }
//				}
//			}
//		});
//	}
//}


function auto_fill(){
	var sid=$('#hl_section').val();
	var url='/v2/invest/auto_fill_money.jso';

	if($('#hl_auto').val()==0){
		url='/turn/api_auto_fill_special_money';
		AA.Api.async({
			url:url,
			data:{section_id:sid},
			success:function (result) {
				if(result.state==1){
					if(result.money>=100){
						$('#do_invest_dlg_invest_money').val(result.money);
						$('#do_invest_dlg_invest_money').keyup();
					}
				}else{
		            if(result.error==1010){
			            $('#btn_auto_fill').css('color','gray');
			            $('#btn_auto_fill').css('cursor','default');
		            }
				}
			}
		});
	}else{
		AA.Api.async({
			url:url,
			data:{sid:sid},
			success:function (result) {
				if(result.state==0){
					if(result.money>=100){
						//var money=(parseInt(result.money/100))*100;
						$('#do_invest_dlg_invest_money').val(parseFloat(result.money));
						$('#do_invest_dlg_invest_money').keyup();
					}
				}else{
		            if(result.error==1010){
			            $('#btn_auto_fill').css('color','gray');
			        	$('#btn_auto_fill').css('cursor','default');
		            }
				}
			}
		});
	}
}

function init_tradepass_dlg_captcha(){
	$('.d-dialog #img-captcha').unbind('click').click(function(){
		get_tradepass_dlg_captcha();
	});
	get_tradepass_dlg_captcha();
}

function get_tradepass_dlg_captcha(){
	var seed=new Date().getTime();
	$('.d-dialog #img-captcha').attr('src','/v2/login/get_captcha.raw?seed='+seed);
	$('.d-dialog #do_invest_two_seed').val(seed);
}
function getTitleIcons(iconStr)
{
	var strIcons='';
	if(iconStr.indexOf('D')>=0)
	{
		strIcons+= '<a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>';
	}
	if(iconStr.indexOf('B')>=0)
	{
		strIcons+='<i class="danbao" title="风险准备金垫付">备</i>';
	}

	if(iconStr.indexOf('Y')>=0)
	{
		strIcons+='<i class="danbao" title="">押</i>';
	}
	if(iconStr.indexOf('Z')>=0)
	{
		strIcons+='<a href="#"><i class="zhuan" title="此项目为转让项目">转</i></a>';
	}
	if(iconStr.indexOf('S')>=0)
	{
		strIcons+='<i class="shouxian" title="仅限手动投资且不超过1万元">手限</i>';
	}
	if(iconStr.indexOf('J')>=0)
	{
		strIcons+= '<i class="jiang">奖</i>';
	}
	if(iconStr.indexOf('E')>=0)
	{
		strIcons+= '<i class="escrow" title="仅限存管账户投资">存管</i>';
	}
	return strIcons;
}
