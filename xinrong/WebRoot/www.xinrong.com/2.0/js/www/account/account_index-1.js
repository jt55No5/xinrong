var AccountIndex,IsSettingSafePwd=true;
(function(){
	var $this = {
		init:function(){
			$this.initAccountIndexInfo();
			$this.initAccountXcbInfo();
			$this.initAccountAssetOverview();
			$this.initAccountNearRefundList();
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
		initAccountIndexInfo:function(){
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
			    		AA.RapidLogin.popup();
							}
					}   
				});  
				
			})();
				
		function showAuthorize(){
			$.dialog({
				title : '提示',
				//height:324,
				//width:548,
				padding:'0px 0px',
				content : $('#authorize_box').html(),
				initialize : function() {
					var d = this;
					$('#authorize_box_ok').click(function(){
						d.close();
						var wBox=$("#wbox_aqpassword1").wBox({
						title: "设置交易密码",
						html: $('#wbox_aqpassword1').html()
							
						});
		
						
						/*	
						$('#wBox #modifyPwdBut').unbind('click').click(function(){
							window.location.href="https://www.xinrong.com/2.0/views/account/back_password.shtml";
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
						});*/
						
					});
					$('#authorize_box_cancel').click(function(){
						d.close();
					});
				}
			});
		}	
			UserAPI.AccountIndexInfo({},function(result){
				var name = result.name;
				var isCheckedBankCard = result.isCheckedBankCard;
				var isCheckedEmail = result.isCheckedEmail;
				var isCheckedIdentification = result.isCheckedIdentification;
				var isCheckedMobile = result.isCheckedMobile;
				var vipDeadLine = result.vipDeadLine;   
				var vip = result.vip;
				var money = result.money;
				var rewardMoney = result.rewardMoney;
				var score = result.score;
				
				$("#leftTitle").html(getTimeQuantum()+name);
				
				if(isCheckedEmail == 1){
					//$("#isCheckedEmail i").removeClass("wmail");
					//$("#isCheckedEmail i").addClass("ymail");
					$("#isCheckedEmail i").attr("class","ymail AllIcon");
				}else{
					$("#isCheckedEmail").attr('href','account_settings.shtml');
				}
				if(isCheckedIdentification == 1){
					//$("#isCheckedIdentification i").removeClass("wID");
					//$("#isCheckedIdentification i").addClass("yID");
					$("#isCheckedIdentification i").attr("class","yID AllIcon");
				}else if(isCheckedIdentification == 0){
					$("#isCheckedIdentification").attr('href','account_settings.shtml');
					
					BankQuickAuthWin.show();
				}
				if(isCheckedIdentification == 1&&IsSettingSafePwd ==false){
						
						showAuthorize();
						//$("#do_safe_password").html("设置交易密码");
						//$("#do_safe_password").attr("class","accsub01");
						//$("#reset_safePwd").attr('onfocus','this.blur()');
						
					}
				if(isCheckedMobile == 1){
					//$("#isCheckedMobile i").removeClass("wtel");
					//$("#isCheckedMobile i").addClass("ytel");
					$("#isCheckedMobile i").attr("class","ytel AllIcon"); 
				}else{
					$("#isCheckedMobile").attr('href','account_settings.shtml');
				}
				if(isCheckedBankCard == 1){
					//$("#isCheckedBankCard i").removeClass("wbank");
					//$("#isCheckedBankCard i").addClass("ybank");
					$("#isCheckedBankCard i").attr("class","ybank AllIcon");
				}else{
					$("#isCheckedBankCard").attr('href','account_settings.shtml');
				}
				
				if(vipDeadLine == 0 || vip == 0){
					$("#unVip").show();
					$("#vip").hide();
				}else{
					$("#unVip").hide();
					$("#vip").show();
					$("#vipGrade").html('VIP'+vip);
					$("#vipDeadLine").html(getLocalTime(vipDeadLine));
					
				}
				
				$("#money").html(money);
				$("#crMoney").val(money);
				$("#rewardMoney").html(rewardMoney);
				if(rewardMoney > 0){
					$("#deadline").html("（有效期剩余 "+result.deadline+"天)");
				}
				$('#score').html(score);
			});
		},
		initAccountXcbInfo:function(){
			UserAPI.AccountXcbInfo({},function(result){
				var tenThousandIncome = result.tenThousandIncome == "" ? "0.00" : result.tenThousandIncome;     
				var rate = result.rate == "" ? "0.00" : result.rate;
				var money = result.money;
				var todayIncome = result.todayIncome; 
				var availableMoneyLeft = result.availableMoneyLeft;
				var sumIncome = result.sumIncome;    
				
				/*var isRedeem = result.isRedeem;
				var isReply = result.isReply;
				var unconfirmRechargeMoney = result.unconfirmRechargeMoney;
				var unconfirmHotMoney = result.unconfirmHotMoney;
				var unconfirmMoney = parseFloat(""+unconfirmRechargeMoney) + parseFloat(""+unconfirmHotMoney);
				unconfirmMoney = toFixed(unconfirmMoney,2);//取两位小数
				var confirmRechargeMoney = result.confirmRechargeMoney;
				var confirmHotMoney = result.confirmHotMoney;
				var confirmMoney = parseFloat(""+confirmRechargeMoney) + parseFloat(""+confirmHotMoney);
				confirmMoney = toFixed(confirmMoney,2);//取两位小数
				var conversionProgress;
				if(confirmMoney!=0){
					conversionProgress = Math.floor(parseFloat(""+confirmHotMoney)/confirmMoney*100);
				}else{
					conversionProgress = 0;
				}*/
				
				if(availableMoneyLeft > 1000000){
					availableMoneyLeft = ">100万"; 
				}
				$("#xcbMoney").html(money);
				$("#rate").html(rate); 
				$("#todayIncome").html(todayIncome); 
				$("#tenThousandIncome").html(tenThousandIncome);   
				$("#syed").html(availableMoneyLeft); 
	            
	        	$this.initAccountInvestIncomeStatistics(result.sumIncome);
			});
		},
		initAccountAssetOverview:function(){
			UserAPI.AccountAssetOverview({},function(result){
				var all=Number(result.accountBalance)+
						Number(result.xcbTotalMoney)+
						Number(result.rewardMoney)+
						Number(result.earningMoney)+
						Number(result.moneyWithdraw)+
						Number(result.overdue);
				
				$('#all').html(commafy(all));
				$('#t_money').html(commafy(result.accountBalance));
				$('#xcb_money').html(result.xcbTotalMoney);
				$('#all_reward').html(commafy(result.rewardMoney));
				$('#earnMoney').html(commafy(result.earningMoney));
				$('#withdraw').html(commafy(result.moneyWithdraw));
				$('#overdue').html(commafy(result.overdue));
			});
		},
		initAccountInvestIncomeStatistics:function(xcb_total_income){
			UserAPI.AccountInvestIncomeStatistics({},function(result){
				$('#earn_recharge_recharge').html(commafy(result.recharge));
				$('#earn_recharge_ct').html(result.rechargeNum);
				
				$('#earn_withdraw_withdraw').html(commafy(result.withdraw));
	         	$('#earn_withdraw_ct').html(result.withdrawNum);
	         	$('#earn_withdraw_fee').html(commafy(result.withdrawFee));
	         	
	         	$('#earn_invest_invest').html(commafy(result.invest));
	        	$('#earn_invest_ct').html(result.investNum);
	        	$('#earn_invest_ag').html(commafy(result.investAvg));
	        	
	        	var earn_all = Number(result.receivedRetain)+
	        				   Number(xcb_total_income)+
	        				   //Number(result.profitingRetain)+
	        				   Number(result.deductedReward);
	        	
	        	$('#earn_all').html(commafy(earn_all));
	        	
	        	$('#earn_back').html(commafy(result.receivedRetain));
	        	//$('#earn_earn').html(commafy(result.profitingRetain));
	        	$('#xcb_total_income').html(xcb_total_income);
	        	$('#reward_use').html(commafy(result.deductedReward));
			});
		},
		initAccountNearRefundList:function(){
			$('a[id^="a-type-"]').click(function(){
				var type = $(this).attr('id');
				type = type.substring(type.length-1,type.length);
				$this.changeNearRefundType(type);
			});
			$('#searchBtn').click(function(){
				$this.changeNearRefundType(5);
			});
			$('#init_query_btn').click(function(){
				$this.loadAccountNearRefundList(1);
			});
            $this.loadAccountNearRefundList(1);
		},
		loadAccountNearRefundList:function(pindex){
			$('#query_btn_view').hide();
			var psize=5;
			var data = {
				type:$('#type').val(),
				pageSize:psize,
				pageIndex:pindex,
				beginTime:$('#stime').val(),
				endTime:$('#etime').val()
			};
			UserAPI.AccountUpcomingRefundList(data,function(result){
				if(result.state != 1){
					return;
				}
				if(typeof(result.data.startTime)!=undefined&&result.data.startTime!=null){
	        		$('#s-time').val(result.data.startTime);
	        	}
				if(typeof(result.data.endTime)!=undefined&&result.data.endTime!=null){
	        		$('#e-time').val(result.data.endTime);
	        	}
				
				if(result.data.nextRefundDay==''){
					$('#nextRefundDay').html('--');
				}else{
					$('#nextRefundDay').html(result.data.nextRefundDay);
	        	}
				
				$('#nextRefundSum').html(toCentHalfUp(result.data.nextRefundSum));
				var rows = result.data.rows;
				var _body_html='';
				if(rows.length<=0){
            		$('#result_view').hide();
  					$('#show_stat').hide();
  					$('.font_not').show();
            		return;
            	}else{
            		$('#result_view').show();
            		$('#show_stat').show();
            		$('.font_not').hide();
            	}
				
				$.each(rows ,function (index ,row) {
					var show_name='信<i class="g-dian">·</i>无忧贷';
					if(row.loanType==2){
						show_name='信<i class="g-dian">·</i>优企贷';
					}else if(row.loanType==3){
						show_name='信<i class="g-dian">·</i>赎楼贷';
					}else if(row.loanType==4||row.loanType==7||row.loanType==11){
						show_name='信<i class="g-dian">·</i>消费贷';
					}else if(row.loanType==5){
						show_name='信<i class="g-dian">·</i>精选贷';
					}else if(row.loanType==6){
						show_name='信<i class="g-dian">·</i>质抵贷';
					}else if(row.loanType==8){
						show_name='品<i class="g-dian">·</i>融360';
					}else if(row.loanType==9){
						show_name='品<i class="g-dian">·</i>吉屋网';
					}else if(row.loanType==10){
						show_name='信<i class="g-dian">·</i>优资贷';
					}else if(row.loanType==12){
						show_name='品<i class="g-dian">·</i>保理贷';
					}else if(row.loanType==13){
						show_name='品<i class="g-dian">·</i>分期X';
					}else if(row.loanType==14){
						show_name='信<i class="g-dian">·</i>消费JS';
					}else if(row.loanType==15){
						show_name='品<i class="g-dian">·</i>票据贷';
					}else if(row.loanType==16){
						show_name='信<i class="g-dian">·</i>车贷';
					}else if(row.loanType==17){
						show_name='品<i class="g-dian">·</i>明特';
					}
					
					var sn=Common.Loan.subInvestSn(row.sn);
					
					var l_href='/2.0/detail.shtml?sid='+row.sectionId;
					
					var refundType=Common.Loan.RefundType[row.refundType];
					
					var loanStatus='收益中';
					if(row.status==5){
                 		loanStatus='正常回款';
                 	}else if(row.status==7){
                 		loanStatus='逾期中';
                 	}
					
					var show_refund_money=toCentHalfUp(row.refundSum);
					show_refund_money="<a href='javascript:AccountIndex.refundPlanShow("+row.loanId+","+row.sn.substr(3)+","+row.refundType+","+row.loanType+");'>"+toCentHalfUp(row.refundSum)+"</a>";
					
					var i_time=row.investTime;
					var bg = '';
					if((index+1)%2==0){
						bg = ' class="bg"';
					}
					_body_html +=
                    	'<tr'+bg+'>'+
							'<td align="center">'+row.refundDay+'</td>'+
                    		'<td align="center"><a href="' + l_href + '" data-lid="' + row.lid + '" target="_blank">' + show_name + '-' + sn + '</a></td>'+
                    		'<td align="center">'+i_time+'</td>'+
                    		'<td align="center">'+toCentHalfUp(row.investMoney)+' 元</td>'+
                    		'<td align="center">'+row.deadline+'</td>'+
                    		'<td align="center">'+row.rate+'%</td>'+
                    		'<td align="center">'+refundType+'</td>'+
                    		'<td align="center">'+show_refund_money+' 元</td>'+
                    		'<td align="center">'+loanStatus+'</td>'+
                		'</tr>';
				});
				
				$('#result_view').html(_body_html);
				
				if(result.data.total>psize){
					$('#page_tool_view').show();
					$('#page_tool_view').pagination({
                		 'container':'#page_tool_view',
                         'pageSize':psize ,
                         'total':result.data.total ,
                         'pageIndex':pindex ,
                         'callback':'AccountIndex.loadAccountNearRefundList'
					});
				}else{
 					$('#page_tool_view').hide();
 				}
				
				var h='&nbsp;&nbsp;&nbsp;&nbsp;共 <strong class="red">'+result.data.total+'</strong> 笔回款，';
				h=h+'合计<strong class="red">'+toCentHalfUp(result.data.moneyAndRetain)+
					'</strong> 元（本金合计<strong class="red">'+toCentHalfUp(result.data.money)+
					'</strong> 元，实收收益合计<strong class="red">'+toCentHalfUp(result.data.retain)+
					'</strong> 元，服务费合计<strong class="red">'+toCentHalfUp(result.data.investManage)+'</strong> 元）';
				$('#show_stat').html(h);
			});
		},
		changeNearRefundType:function(ty){
			if(ty==5){
				var _stime = $.trim($('#s-time').val());
				var _etime = $.trim($('#e-time').val());
				if (_stime != '') {
					$('#stime').val(Common.Tool.timespan(_stime + ' 00:00:00'));
				}
				
				if (_etime != '') {
					$('#etime').val(Common.Tool.timespan(_etime + ' 23:59:59'));
				}
				
				if($('#stime').val()==0){
					return;
				}
				
				if($('#etime').val()==0){
					return;
				}
				
				$('a[id^="a-type-"]').removeClass('cur'); 
			}else{
				for(var i=1;i<=4;i++){
					if(i==ty){
						$('#a-type-'+i).addClass('cur');
					}else{
						$('#a-type-'+i).removeClass('cur'); 
					}
				}
			}
			$('#type').val(ty);
			$this.loadAccountNearRefundList(1);
		},
		refundPlanShow:function(loan_id,sn,refund_type,loan_type){
			UserAPI.RefundPlanInfo({loanId:loan_id},function(result){
				if(result.state==0){
					RefundPlan.initData(result,sn,refund_type,loan_type);
				}
			});
		},
		bindEvent:function(){
		    $("#tool01").unbind("click").bind("click",function(){
		        var $content = $(this).next();
		        $("#crMoneyError").html(""); 
		        $("#crPassError").html("");      
		        //$("#crMoney").val("");
		        $("#crPass").val(""); 
		        if($content.is(":visible")){
		            $content.hide();
		        }else{
		            $content.show();
		            $("#tool02").next().hide();
		            $("#tool03").next().hide();
		            $("#tool04").next().hide(); 
		            $("#tool05").next().hide();
		        }
		    });
			$("#tool02").unbind("click").bind("click",function(){
		        var $content = $(this).next();
		        $("#zcMoneyError").html(""); 
		        $("#zcPassError").html("");      
		        $("#zcMoney").val("");
		        $("#zcPass").val("");  
		        if($content.is(":visible")){
		            $content.hide();
		        }else{
		            $content.show();
		            $("#tool01").next().hide();
		            $("#tool03").next().hide();
		            $("#tool04").next().hide(); 
		            $("#tool05").next().hide();
		        }
		    });
			
			$('#tool01_close').click(function(){
				$("#tool01").next().hide(); 
			});
			
			$('#tool02_close').click(function(){
				$("#tool02").next().hide(); 
			});
			
		    $("#crSub").unbind("click").bind("click",function(){
		    	if($("#crMoneyError").html().length != 0){  
		    		$("#crMoneyError").html("金额格式不对");
		    		return;
		    	}
		    	
		    	if($("#crPassError").html().length != 0){
		    		$("#crPassError").html("交易密码不能为空");  
		    		return; 
		    	} 
		    	
		    	if($("#crSub").html() == "正在提交..."){
		    		return;       
		    	} 
		    	
		    	$("#crSub").html("正在提交...");     
		    	setTimeout('$("#crSub").html("提交")',1000);//1s后恢复按钮               
		         
		    	if(!$("#readme").is(':checked')){
		    		$.alert({
		    			tipCls:'info1' ,
		    			title:'请阅读信存宝协议!', 
		    			content:'', 
		    			txtBtn:'关闭', 
		    			init:function (d ,btn,btn1 ) {
		    				btn.click(function () {
		    					d.close();
		    				});
		    			}    
		    		});  
		    		return;     
		    	}
		    	var _money = $("#crMoney").val();
		    	var _pass = $("#crPass").val(); 

		    	if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(_money)){
		    		$("#crMoneyError").html("金额格式不对");
		    		return;  
		    	}

		    	if(_pass.length == 0){ 
		    		$("#crPassError").html("交易密码不能为空"); 
		    		return;   
		    	} 
		          
		    	$("#crjuhua").attr("style","display:block");   
		    	$("#crFailP").attr("style","display:none");   
		          
		    	$("#crPass").val('');
		    	//申购
		    	$.ajax({
		    		url : '/v2/xincunbao/buy_apply.jso',      
		    		type : 'post',
		    		data:{money:_money,pass:AA.Helper.encrypPw(_pass)},
		    		dataType : 'json', 
		    		success : function(data) {
		    			if(data.state == 0){
							//信存宝存入成功后弹窗
							$("#xcb_cr_suc_money").html(_money);
		    				var xcbSucWindow = $.popup1({
		    					title:'' ,
								width:'341',
								padding:'0',
								content:$("#xcb_cr_suc").html(),
		    					init:function (d ,btn,btn1 ) {
		    						btn.click(function () {
		    							d.close();
		    							setTimeout("AccountIndex.init()",1000);  //初始化数据 
		    						});
		    					}  
		    				}); 
							$(".suc-close").bind("click",function(){
														xcbSucWindow.close();
													});
													//信存宝存入成功后弹窗
		    				$("#crjuhua").attr("style","display:none");
		    				$("#tool01").next().hide();   
		            			 
		    			} else{
		    				$("#crjuhua").attr("style","display:none");
		    				$("#crFailP").attr("style","display:block"); 
		    				$("#crFail").html(data.msg);   
		    			} 
		    		}     
		    	});      
		    });
		    
		    $("#zcSub").unbind("click").bind("click",function(){   
		    	if($("#zcMoneyError").html().length != 0){  
		    		$("#zcMoneyError").html("金额格式不对");
		    		return;
		    	}
			    	
		    	if($("#zcPassError").html().length != 0){
		    		$("#zcPassError").html("交易密码不能为空");  
		    		return;  
		    	}   
			    	
		    	if($("#zcSub").html() == "正在提交..."){
		    		return;       
		    	}  
			    	
		    	$("#zcSub").html("正在提交...");     
		    	setTimeout('$("#zcSub").html("提交")',1000);//1s后恢复按钮                  
			         
		    	if(!$("#readme").is(':checked')){ 
		    		$.alert({
		    			tipCls:'info1' ,
		    			title:'请阅读信存宝协议!', 
		    			content:'', 
		    			txtBtn:'关闭', 
		    			init:function (d ,btn,btn1 ) {
		    				btn.click(function () {
		    					d.close();
		    				});
		    			}    
		    		});  
		    		return;     
		    	}    
				 
		    	var _money = $("#zcMoney").val();
		    	var _pass = $("#zcPass").val();

		    	if(!$("#readme2").is(':checked')){
		    		$.alert({
		    			tipCls:'info1' ,
		    			title:'请阅读信存宝协议!', 
		    			content:'', 
		    			txtBtn:'关闭', 
		    			init:function (d ,btn,btn1 ) {
		    				btn.click(function () {
		    					d.close();
		    				});
		    			}   
		    		});  
		    		return;    
		    	}   
			        
		    	if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(_money)){
		    		$("#zcMoneyError").html("金额格式不对");
		    		return;  
		    	}

		    	if(_pass.length == 0){
		    		$("#zcPassError").html("交易密码不能为空");   
		    		return;    
		    	}  

		    	$("#zcjuhua").attr("style","display:block");  
		    	$("#zcFailP").attr("style","display:none");
		    	
		    	$("#zcPass").val('');
		    	//赎回
		    	$.ajax({
		    		url : '/v2/xincunbao/redeem_apply.jso',       
		    		type : 'post',
		    		data:{money:_money,pass:AA.Helper.encrypPw(_pass)},
		    		dataType : 'json', 
		    		success : function(data) {
		    			if(data.state == 0){
		    				$.alert({
		    					tipCls:'success1' ,
		    					title:'您在信存宝成功转出：<span style="color:red">'+_money +"</span>&nbsp;元", 
		    					content:'', 
		    					txtBtn:'关闭', 
		    					init:function (d ,btn,btn1 ) {
		    						btn.click(function () {
		    							d.close();
		    							setTimeout("AccountIndex.init()",1000);  //初始化数据
		    						});
		    					}   
		    				}); 
		    				$("#zcjuhua").attr("style","display:none");
		    				$("#tool02").next().hide();  
		    			}else if(data.state == 1){//待赎回状态
		    				$.alert({
		    					tipCls:'success1' ,
		    					title:data.msg,  
		    					content:'', 
		    					txtBtn:'关闭', 
		    					init:function (d ,btn,btn1 ) {
		    						btn.click(function () {
		    							d.close();
		    							setTimeout("AccountIndex.init()",1000);  //初始化数据 
		    						}); 
		    					}   
		    				});   
		    				$("#zcjuhua").attr("style","display:none");
		    				$("#tool02").next().hide();   
		    			}else{
		    				$("#zcjuhua").attr("style","display:none");
		    				$("#zcFailP").attr("style","display:block");    
		    				$("#zcFail").html(data.msg);  
		    			}  
		    		}     
		    	});         
		    });
		    
		    $("#crMoney").unbind("blur").bind("blur",function(){
				var _money = $(this).val();   
				if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(_money)){
		            $("#crMoneyError").html("金额格式不对");
		        } else{
		        	$("#crMoneyError").html(""); 
		        } 
			});
		    
		    $("#crPass").unbind("blur").bind("blur",function(){
				var _pass = $(this).val();    
				if(_pass.length == 0){ 
		      	  $("#crPassError").html("交易密码不能为空"); 
		        } else{
		          $("#crPassError").html("");  
		        } 
			});
		    
			$("#zcMoney").unbind("blur").bind("blur",function(){
				var _money = $(this).val();   
				if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(_money)){
		            $("#zcMoneyError").html("金额格式不对");
		        } else{
		        	$("#zcMoneyError").html(""); 
		        } 
			});
			
			$("#zcPass").unbind("blur").bind("blur",function(){
				var _pass = $(this).val();    
				if(_pass.length == 0){ 
		      	  $("#zcPassError").html("交易密码不能为空"); 
		        } else{
		          $("#zcPassError").html("");   
		        } 
			});
		}
	};
	$(function(){
		$this.isLogin();
	});
	AccountIndex = $this;
	
	/**
	 * 获得时间段
	 * @returns {String}
	 */
	function getTimeQuantum(){
		return Common.Tool.getTimeQuantum()+'，';
	}
	/**
	 * 时间戳转换成日期(日期小于9的自动补0) 
	 * @param nS 
	 * @returns {String}
	 */
	function getLocalTime(nS) {
		return Common.Tool.FormateDate(nS,'Y-m-d');
	}
	
	function commafy(num){
		return Common.Tool.commafy(Common.Tool.toCent(num));
	}
	
	function toCentHalfUp(num){
		return Common.Tool.toCentHalfUp(num).toFixed(2);
	}
	function toFixed(number ,fractionDigits) {
	    var _fractionDigits = fractionDigits || 2;
	    with (Math) {
	        return floor(number * pow(10 ,_fractionDigits)) / pow(10 ,_fractionDigits);
	    }
	}
})();