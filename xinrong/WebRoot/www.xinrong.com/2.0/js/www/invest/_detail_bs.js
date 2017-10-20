var DETAIL_BS=DETAIL_BS||{};
(function(DETAIL_BS){
	DETAIL_BS.InitData={
		'SID':'',
		Timer:null,
		Times:0,
		BeginTime:0,
		SectionObj:null,
		Offset:undefined, //服务器时间-本地时间
		HaveInitSlider:false,//是否已经初始化滑块
		HasScrollRefundList:false,
		RefundListLength:0,
		DEADLINE:'',
		recentRefundHtml:'',
		recentRefundHtml:'',
		transfer:null,
		/**
		 * 获取借款标信息
		 * @param loan_id
		 */
		Title:function(section_id){
			DETAIL_BS.InitData.InitOffset();
			DETAIL_BS.InitData.SID=XR.Global.GetUrlParam("sid");

			DETAIL_BS.Api.InitTitle({sid:DETAIL_BS.InitData.SID},function(result){
				if(result.state==0){
					DETAIL_BS.InitData.SectionObj = result;//保存项目对象，便于之后取相关信息
					var danbao_ornot=XR.Loan.ShowDanbaoOrnot(result.enterName);
					
					if(danbao_ornot){
						$('#danbao_icon').show();
						$('#li_danbao_show').html("第三方公司："+result.enterName);
					}else{
						if(result.loanType!=8&&result.loanType!=9&&result.loanType!=12&&result.loanType!=13&&result.loanType!=15){
							if(result.loanType==5 || result.loanType==6|| result.loanType==16){
								if(result.loanType!=5){
									$('#ya_icon').show();
									$('#li_danbao_show').html("还款保障：债务人足额资产质/抵押");
								}else{
									$('#li_danbao_show').html("还款保障：债务人在平台足额的债权");
								}
							}else{
								$('#bei_icon').show();
								$('#li_danbao_show').html("还款保障：风险准备金 <i class='AllIcon iconI explain-icon'></i> <div class='explain'><i class='tri' style='right: 149px;'><i></i></i>如发生第三方违约或风险准备金不足，可能造成投资人本金/利息损失。</div>");
							}
						}
					}
					
					/*if(danbao_ornot){
						$('#li_danbao_show').html("第三方公司："+result.enterName);
					}else{
						if(result.loanType == 6 || result.loanType == 16){
							$('#li_danbao_show').html("还款保障：债务人资产质/抵押");
						}else if(result.loanType == 5){
							$('#li_danbao_show').html("还款保障：债务人在平台足额的债权");
						}else{
							$('#li_danbao_show').html("还款保障：足额风险准备金保障");
						}
					}*/

					/*var can_transfer_ornot=XR.Loan.ShowCanTransferOrnot(result.deadline,result.transferOrnot);

					if(can_transfer_ornot){
						$('#kezhuan_icon').show();
					}*/

					var loanSn=XR.Loan.TypeShow(result.loanType,result.conSn);

					if(result.transferOrnot){//转让标
						$('#loan_title').html(loanSn+"转让");
						$('#zhuan_icon').show();
					}else{//非转让
						var sort=XR.Loan.TypeSortShow(result.loanType,result.conSn,result.sort);
						$('#loan_title').html(loanSn+"之"+sort);

						if(result.amountMoney - result.rasiedMoney != 0){
							if(Number(result.reward) > 0){
								$('#jiang_icon').show();
								$('#jiang_view').show();
								$('#jiang_show').html(result.reward+'%');
								$('#jiang_show').val(result.reward+'%');
							}
						}
					}
					//添加1-xx
				var computeLength=1;
				var deadlineStr=result.deadlineStr;
				var newDeadlineStr=deadlineStr;
				if(deadlineStr.indexOf("个月")>-1){
					for(i=0;i<deadlineStr.length;i++){
					if(!/^[0-9]+[0-9]*]*$/.test(deadlineStr[i]))
					{computeLength=i;
					break;}
					}
				if(deadlineStr.substring(0,computeLength)>=2){
					newDeadlineStr="1~"+deadlineStr;	
					}else{
						newDeadlineStr=deadlineStr;
					}
				}
					$('#deadline_show').html("<b class='orange'>"+newDeadlineStr+"</b>");
					//$('#deadline_show').html("<b class='orange'>"+result.deadlineStr+"</b>");

					DETAIL_BS.InitData.DEADLINE = result.deadlineStr;

					$('#rate_show').html(XR.Tool.toCentHalfUp(result.rate)+"%");
					$('#money_show').html(XR.Tool.commafy(XR.Tool.toFixed(result.amountMoney)));
					$('#begin_data_value_show').html(result.beginDataRate);
					var extraneous=null;
					if (result.extraneous.match("礼品兑换")){
							//var liwuduihuan=result.extraneous.substring(result.extraneous.indexOf("礼品兑换"),result.extraneous.indexOf("礼品兑换")+4);
							
							//$('#extraneous_show1').html(jifenchoujiang);
							/*if (extraneous==null){
								extraneous="<a href='/gift' target='_blank' style='color:#0078B6'>"+liwuduihuan+"</a>";
							}else {
								extraneous=extraneous+"/"+"<a href='/gift' target='_blank' style='color:#0078B6'>"+liwuduihuan+"</a>";
							}
							*/
							var liwuduihuan = "投资送积分";
							extraneous="<a href='/2.0/views/about/help.shtml?tab=tab6&href=f1' target='_blank' style='color:#0078B6'>"+liwuduihuan+"</a>";
					}

					var href2 = "<a href='/gift' target='_blank' style='color:#0078B6'>"+"兑礼品"+"</a>";
					if (extraneous==null){
						extraneous=href2;
					}else{
						extraneous=extraneous+","+href2;
					}

					if (result.extraneous.match("积分抽奖")){
							//var jifenchoujiang=result.extraneous.substring(result.extraneous.indexOf("积分抽奖"),result.extraneous.indexOf("积分抽奖")+4);
							
							//$('#extraneous_show').html("<a href='httpsaction/jf'>"+jifenchoujiang+"</a>");
							//extraneous="<a href='/action/jf' target='blank' style='color:#0078B6'>"+jifenchoujiang+"</a>";

							var jifenchoujiang = "抽大奖";
							if (extraneous==null){
								extraneous="<a href='/action/jf' target='_blank' style='color:#0078B6'>"+jifenchoujiang+"</a>";
							}else {
								extraneous=extraneous+"/"+"<a href='/action/jf' target='_blank' style='color:#0078B6'>"+jifenchoujiang+"</a>";
							}
					}

					
					
					if (extraneous!=null)
					$('#extraneous_show').html(extraneous);
					$('#amount_money_show').html(XR.Tool.commafy(XR.Tool.formatDecimals(XR.Tool.toCent(result.amountMoney - result.rasiedMoney))));
					$('#refund_type_show').html(XR.Loan.RefundShow(result.refundType));

					if(result.autoInvest=="0"){
						$('#shouxian_icon').show();
					}
					
					DETAIL_BS.InitData.escrowFlag = result.escrowFlag;
					if(result.escrowFlag == '1'){
						$('#esw_icon').show();
					}

					//初始化快速投资
					DETAIL_BS.InitData.QuickInvest(result);
					//初始化【项目信息】
					DETAIL_BS.InitData.ProjectDetail();
					//初始化【项目进程】
					DETAIL_BS.InitData.ProjectProcess(result);
				}
			})
		},
		QuickInvest:function(data){
			var start_time=data.startTime;
			XR.Global.GetServerTime(function(now_time){
				if(now_time<start_time){//未启动
					$('#div_quick_invest_time').show();
					$('#div_quick_invest_progress').hide();
					$("#investBtn").html('<a href="javascript:DETAIL_BS.Api.do_invest_no_start('+XR.Tool.toFixed(data.amountMoney)+','+start_time+');" class="sub04" >未开始</a>');

					//初始化滑条
					DETAIL_BS.InitData.Slider(data);
					DETAIL_BS.InitData.BeginTime=start_time;
					DETAIL_BS.InitData.QuickInvestCountDownTime();
					DETAIL_BS.InitData.Timer=window.setInterval("DETAIL_BS.InitData.QuickInvestCountDownTime()",1000);
				}else if(data.amountMoney - data.rasiedMoney == 0){//已投满
					$('#div_quick_invest_time').hide();
					$('#div_quick_invest_progress').show();
					$("#investBtn").html('<a href="javascript:void(0)" class="sub01" >已投满</a>');

					//这个逻辑是不能出现滑条的，所以，如果已经存在滑条，需要把滑条给干掉
					if(DETAIL_BS.InitData.HaveInitSlider){
						$("#slider-range-max").hide();
					}

					$("#slider_amount").val(0);
					$("#slider_amount").attr('readonly','true');
					$("#totalInterest").html('--');
					$("#ptime").html('--');
				}else{//立即投资
					var deadlineParam;
					if(data.transferOrnot==1){
						deadlineParam = data.deadlineStr;
					}else{
						deadlineParam = ''+data.deadline;//统一成字符串
					}

					var pics=encodeURIComponent(DETAIL_BS.Api.getTitlePics(DETAIL_BS.InitData.SectionObj.loanType,
						DETAIL_BS.InitData.SectionObj.conSn,
						DETAIL_BS.InitData.SectionObj.sort,
						DETAIL_BS.InitData.SectionObj.enterId,
						DETAIL_BS.InitData.SectionObj.deadline,
						DETAIL_BS.InitData.SectionObj.autoInvest,
						DETAIL_BS.InitData.SectionObj.transferOrnot,
						'','',DETAIL_BS.InitData.SectionObj.reward,
						DETAIL_BS.InitData.SectionObj.state,
						DETAIL_BS.InitData.escrowFlag));
						var rate=Math.round(DETAIL_BS.InitData.SectionObj.rate*1000)/1000;
					//把按钮换成"快速投资"按钮
					//修改二因为现在拿的是标的总额，只有转让的时候才会是标的总额，所以要加判断//其中0代表没转让
					if(data.transferOrnot==1){
						$("#investBtn").html('<a href="javascript:DETAIL_BS.InitData.DoInvest('+XR.Tool.toFixed(data.amountMoney)+','+DETAIL_BS.InitData.SID+','+data.transferOrnot+',\''+pics+'\','+rate+',\''+DETAIL_BS.InitData.escrowFlag+'\')" class="sub02">快速投资</a>');
					
					}else{
						$("#investBtn").html('<a href="javascript:DETAIL_BS.InitData.DoInvest('+XR.Tool.toFixed(data.amountMoney - data.rasiedMoney)+','+DETAIL_BS.InitData.SID+','+data.transferOrnot+',\''+pics+'\','+rate+',\''+DETAIL_BS.InitData.escrowFlag+'\')" class="sub02">快速投资</a>');
					
					}
					$('#div_quick_invest_time').hide();
					$('#div_quick_invest_progress').show();

					//初始化滑条
					DETAIL_BS.InitData.Slider(data);
				}
				DETAIL_BS.InitData.QuickInvestInitProgress(data);
			})

		},
		QuickInvestCountDownTime:function(){
			var begin_time=DETAIL_BS.InitData.BeginTime;

			if(DETAIL_BS.InitData.Offset){//如果已经初始化服务器和本地时间的偏移量了，就直接用这个偏移量+本地时间，得到“服务器”时间
				var localTime=new Date().getTime()/1000;//本地时间
				DETAIL_BS.InitData.UpdateQuickInvestTimeShow(localTime+DETAIL_BS.InitData.Offset,begin_time);
			}else{//还没有初始化偏移量，那就直接访问服务器拿时间
				XR.Global.GetServerTime(function(now_time){
					DETAIL_BS.InitData.UpdateQuickInvestTimeShow(now_time,begin_time);
				});
			}
		},
		/**
		 * 刷新倒计时显示
		 */
		UpdateQuickInvestTimeShow:function(now_time,begin_time){
			if(/*rs.length==0*/now_time>begin_time){//到点
				DETAIL_BS.InitData.ConfirmStartOrnot();
			}else{//继续倒计时
				var rs=XR.Tool.CountDownTime(begin_time,now_time);

				var hour = parseInt(rs[0]) * 24 + parseInt(rs[1]);

				var html='<span class="lifont01"><i class="AllIcon icon03"></i>\
					<span>'+hour+'</span>时<span>'+rs[2]+'</span>分<span>'+rs[3]+'</span>秒</span>\
					<span class="lifont">\
					<i class="AllIcon icon02"></i>'+XR.Tool.FormateDate(begin_time,"h:m")+'开始抢投</span>';

				//$('#span_count_dowm_time').html(html);
				$('#div_quick_invest_time').html(html);

				DETAIL_BS.InitData.Times++;
			}
		},
		QuickInvestInitProgress:function(data){
			//progressbg
			var progress=XR.Tool.toFixed((data.rasiedMoney)/data.amountMoney*100,2);
			$('#progressbg').css("width",progress+"%");
			$('#progressbg_font').html(progress+"%");
		},
		Slider:function(data){
			var leftMoney = XR.Tool.toCentHalfUp(data.amountMoney-data.rasiedMoney);
			//等额本息转让标，必须一口吃掉
			DETAIL_BS.InitData.transfer=data.transferOrnot;
			if(data.refundType==2 && data.transferOrnot==1){
				
				$("#slider_amount").val(leftMoney);
				$("#slider_amount").attr('readonly','true');
				DETAIL_BS.InitData.GetRefundInfo(DETAIL_BS.InitData.SID, $("#slider_amount").val());
				$('#transfer_tip').show();
			}else{
				
				DETAIL_BS.Api.GetUserAccount(function(result){
					var maxInvestMoney;
					if(result.state==0){
						var moneyAndReward=XR.Tool.toCentHalfUp(parseFloat(result.totalMoney)+parseFloat(result.rewardMoney));
						if(data.escrowFlag == 1){
							moneyAndReward = XR.Tool.toCentHalfUp(parseFloat(result.eswRealAvailMoney)+parseFloat(result.totalMoney)+parseFloat(result.rewardMoney));
						}
						//因为快速投资小于100不能投资所以修改
						if(leftMoney<100){
							if(leftMoney<=moneyAndReward){
								maxInvestMoney=leftMoney;
								$('#transfer_tip').show();
								$('#transfer_tip').html('<i class="AllIcon iconI"></i><font>融资金额不足100元，需一次性全额投完</font>');
							}else{
								     $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>账户可投余额不足,请及时充值');
						
							}
							
						}else{
							//maxInvestMoney = DETAIL_BS.InitData.GetMinValue(leftMoney,moneyAndReward);
							if(moneyAndReward>=leftMoney){
								maxInvestMoney=leftMoney;
							}else{
								maxInvestMoney=DETAIL_BS.InitData.GetMinValue(leftMoney,moneyAndReward);
							}
							if(maxInvestMoney<100)
							{
							  $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>账户可投余额不足,请及时充值');
						    }
						}
						
					}else{//未登录
						maxInvestMoney = leftMoney;
					}
					if(maxInvestMoney<100)
					{
						$( "#slider_amount" ).attr("disabled","true");
					}else {

						$( "#slider_amount" ).removeAttr("disabled");
					}
					if(!DETAIL_BS.InitData.HaveInitSlider){//如果从来没初始化过，则初始化
						$("#slider-range-max" ).slider({
					    	range: "max",
					     	value: maxInvestMoney,
					        min: 0,
					        max: maxInvestMoney,
					        step:100,
					        slide: function( event, ui ) {
					        	$('#quick_invest_error_view').empty();
					        	$( "#slider_amount" ).val( ui.value );
					        },
					        stop: function(event, ui){
					        	DETAIL_BS.InitData.GetRefundInfo(DETAIL_BS.InitData.SID, $("#slider_amount").val());
					    	}
						});
					 	$( "#slider_amount" ).val(  $( "#slider-range-max" ).slider( "value" ) );

						$("#slider_amount").bind('change',function(){
					    	$('#quick_invest_error_view').empty();
					    	$( "#slider-range-max" ).slider("value",$("#slider_amount").val());
					    	DETAIL_BS.InitData.GetRefundInfo(DETAIL_BS.InitData.SID, $("#slider_amount").val());
							var newAmount=$("#slider_amount").val();
							if(newAmount/100!=0){
								  $('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>一百整投');
							}else{
								$('#quick_invest_error_view').hide();
							}
						});

						DETAIL_BS.InitData.HaveInitSlider=true;
					}else{//如果初始化了，就直接设置各种属性即可
						$( "#slider-range-max" ).slider("option","max",maxInvestMoney);
						$( "#slider-range-max" ).slider("option","value",maxInvestMoney);
						$( "#slider_amount" ).val(  $( "#slider-range-max" ).slider( "value" ) );
					}
					DETAIL_BS.InitData.GetRefundInfo(DETAIL_BS.InitData.SID, $("#slider_amount").val());
				});

			}
		},
		GetRefundInfo:function(sid, money){
			DETAIL_BS.Api.GetRefundInfo({sid:sid, money:money},function(result){
				if(result.state==0){
					$("#totalInterest").html(result.totalInterest+" 元");
					$("#ptime").html(result.lastPTimeStr);
					var rows = result.refundUnits;
					var _html='';
					var j;
					for(var i=0;i<rows.length;i++){
						j=i+1;
						_html += '<tr><td width="99">'+rows[i].ptimeStr+'</td>'+
						'<td width="98" align="right">'+rows[i].moneyInterest+'</td>'+
						'<td align="center">'+j+'</td></tr>';
					}

					$("#refundPlanList").html(_html);
				}
			});
		},
		/**
		 * flag:0隐藏回款计划 1显示回款计划
		 */
		ToggleRefundPlan:function(flag){
			if(flag == 0){
				$("#div_quick_invest").show();
				$("#div_quick_refund").hide();
			}else{
				$("#div_quick_invest").hide();
				$("#div_quick_refund").show();
			}
		},
		/**
		 * 初始化服务器时间与本地时间的偏移量
		 */
		InitOffset:function(){
			XR.Global.GetServerTime(function(server_time){
				DETAIL_BS.InitData.Offset = server_time - new Date().getTime()/1000;
			});
		},
		/**
		 * 快速投资逻辑，直接进入step_two
		 */
		DoInvest:function(amount,sid,transferOrnot,pics,rate,escrowFlag){
			if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {
		        AA.RapidLogin.popup();
		        return;
		    }else{
		    	EswDialog.checkEswCreateStatus(escrowFlag,function(){
		    		if (!G_ENV_VAR.IS_CHECKED_MOBILE) {
		    			$.alert({
		    				title:'您的手机号尚未经过认证！',
		    				content:'为了保护您的资金安全，请先完成手机认证后再投资',
		    				txtBtn:'立即认证',
		    				url:'/2.0/views/account/account_settings.shtml'
		    			});
		    			return;
		    		} else if (!G_ENV_VAR.IS_CHECKED_IDENTIFICATION) {
		    			$.alert({
		    				title:'您尚未通过实名认证！',
		    				content:'为了确定您的电子合同主体，请先完成实名认证再投资',
		    				txtBtn:'立即认证',
		    				url:'/2.0/views/account/account_settings.shtml'
		    			});
		    			return;
		    		}else if (!G_ENV_VAR.HAS_TRADE_PASSWORD) {
		    			$.alert({
		    				title:'您尚未设置交易密码！',
		    				content:'为了您的资金安全，请先设置交易密码后再投资',
		    				txtBtn:'立即设置',
		    				url:'/2.0/views/account/account_settings.shtml?tab=2'
		    			});
		    			return;
		    		}else{
		    			
		    			
		    			var slider_amount = $("#slider_amount").val();
		    			
		    			$('#do_invest_dlg_invest_money').val($("#slider_amount").val());//在step_two里面，需要读取#do_invest_dlg_invest_money中的值
		    			DO_INVEST_TITLE=$('#loan_title').html();
		    			DO_INVEST_DEADLINE=DETAIL_BS.InitData.SectionObj.deadlineStr;
		    			
		    			$.ajax({
							url:'/v2/escrow/get_account_base_info.jso',
							type:'GET' ,
							dataType:'json',
							success:function (rs) {
								if(rs.state == 0){
									var totalMoney;
									if(escrowFlag == 1){
										totalMoney = parseFloat(rs.eswRealAvailMoney) + parseFloat(rs.totalMoney);
									}else{
										totalMoney = rs.totalMoney;
									}
									$('#do_invest_dlg_total_money').html(toDecimal(parseFloat(totalMoney)+parseFloat(rs.rewardMoney)+0.0005));
									$('#do_invest_dlg_reward_total').val(rs.rewardMoney);
									
									
									////添加等额本息转让提示
					    			if(DETAIL_BS.InitData.transfer==1){
					    				$.ajax({
					    					url:'/v2/project/loan_detail_show.jso',
					    					type:'POST' ,
					    					dataType:'json',
					    					data:{sid:sid},
					    					success:function (result) {
					    						if(result.state==0){
					    							var money = toDecimal(parseFloat(result.amountMoney)-parseFloat(result.rasiedMoney)+0.0005);
					    							var amount = toDecimal(parseFloat(result.amountMoney)+0.0005);
					    							if(result.refundType==2&&result.transferOrnot==1){
														if(toDecimal(parseFloat(totalMoney)+parseFloat(rs.rewardMoney)+0.0005)<money){
		    												$('#transfer_tip').hide();
		    												$('#quick_invest_error_view').html('<i class="AllIcon" style="width: 14px;height: 17px;background-position: -492px -85px;display: inline-block;vertical-align: middle; margin-right: 4px;"></i>等额本息转让项目需一次性投完');
		    												return;
		    											}else{
		    												sub_do_invest_next(amount,sid,transferOrnot,undefined,pics ,rate,escrowFlag);
		    											}
					    							}else{
					    								sub_do_invest_next(amount,sid,transferOrnot,undefined,pics ,rate,escrowFlag);
					    							}
					    						}
					    					}
					    				});
					    			}else{
					    				sub_do_invest_next(amount,sid,transferOrnot,undefined,pics ,rate,escrowFlag);
					    			}
								}else{
									//增加两小时后登陆超时情况
									if(rs.state == 1009){
										AA.RapidLogin.popup();
										return;
									}
								}
							}
						});
		    		}
		    	});
		    }
		},
		/**
		 * 对是否开始作最终确认
		 */
		ConfirmStartOrnot:function(){
			XR.Global.GetServerTime(function(server_time){
				var begin_time=DETAIL_BS.InitData.BeginTime;
				if(server_time>=begin_time){//确实已经开始
					//清除计时器
					clearInterval(DETAIL_BS.InitData.Timer);
					DETAIL_BS.InitData.Timer=null;
					var pics=encodeURIComponent(DETAIL_BS.Api.getTitlePics(DETAIL_BS.InitData.SectionObj.loanType,
						DETAIL_BS.InitData.SectionObj.conSn,
						DETAIL_BS.InitData.SectionObj.sort,
						DETAIL_BS.InitData.SectionObj.enterId,
						DETAIL_BS.InitData.SectionObj.deadline,
						DETAIL_BS.InitData.SectionObj.autoInvest,
						DETAIL_BS.InitData.SectionObj.transferOrnot,
						'','',DETAIL_BS.InitData.SectionObj.reward,
						DETAIL_BS.InitData.SectionObj.state,
						DETAIL_BS.InitData.escrowFlag));
					var rate=Math.round(DETAIL_BS.InitData.SectionObj.rate*1000)/1000;
					//把按钮换成"快速投资"按钮
					$("#investBtn").html('<a href="javascript:DETAIL_BS.InitData.DoInvest('+XR.Tool.toFixed(DETAIL_BS.InitData.SectionObj.amountMoney)+','+DETAIL_BS.InitData.SID+','+DETAIL_BS.InitData.SectionObj.transferOrnot+',\''+pics+'\','+rate+',\''+DETAIL_BS.InitData.escrowFlag+'\')" class="sub02">快速投资</a>');
					$('#div_quick_invest_time').hide();
					$('#div_quick_invest_progress').show();
				}else{
					DETAIL_BS.InitData.UpdateQuickInvestTimeShow(server_time,begin_time);
				}
			});
		},
		/**
		 * 【项目进程】
		 */
		ProjectProcess:function(data){
			//设置项目上线时间
			$("#ctime").html("上线时间："+XR.Tool.FormateDate(data.ctime,"Y-m-d"));

			//分阶段讨论
			XR.Global.GetServerTime(function(now_time){
				if(now_time>=data.startTime){//已经启动
					$("#beginAndEndtimePic").attr('class','font01 boxbg');
					$("#beginAndEndtimeFont").css('font-weight','bold');
					$("#beginAndEndtime").html("开始时间："+XR.Tool.FormateDate(data.startTime,"Y-m-d"));

					if(data.amountMoney == data.rasiedMoney){//已经筹满
						$("#beginAndEndtimePic").attr('class','font01');
						$("#beginAndEndtimeFont").css('font-weight','normal');
						var _html = $("#beginAndEndtime").html()+"/"+"完成时间:"+XR.Tool.FormateDate(data.ltime,"Y-m-d");
						$("#beginAndEndtime").html(_html);

						$("#endtime").html("完成时间:"+XR.Tool.FormateDate(data.ltime,"Y-m-d"));
						$("#endtimePic").attr('class','font01');

						//获得整个回款计划
						DETAIL_BS.Api.GetRefundPlanForProgress({sid:DETAIL_BS.InitData.SID},function(result){
							if(result.state==0){
								var refundUnits = result.refundUnits;

								if(refundUnits.length>0){
									var i=0;
									var refundedMoney=0.00;
									var refundedNum=0;
									while(i<refundUnits.length && refundUnits[i].ptime<=now_time){
										refundedMoney += parseFloat(refundUnits[i].moneyInterest);
										i++;
									}
									refundedNum = i;

								    var totalRefundMoney=0.00;
								    for(var j=0;j<refundUnits.length;j++){
								    	totalRefundMoney += parseFloat(refundUnits[j].moneyInterest);
								    }

								    var toRefundMoney = XR.Tool.toCentHalfUp(totalRefundMoney) - XR.Tool.toCentHalfUp(refundedMoney);
								    var toRefundNum = refundUnits.length - refundedNum;


								    if(refundedNum>0 && refundedNum<refundUnits.length){//回款正在进行时
								    	$("#refundProgressPic").attr('class','font01 boxbg');
								    	$("#refundProgressFont").css('font-weight','bold');
								    }
								    if(refundedNum == refundUnits.length){//回款完成了
								    	$("#refundProgressPic").attr('class','font01');
								    }

								    $("#refundProgress").html("已还款："+XR.Tool.toCentHalfUp(refundedMoney)+"（"+refundedNum+"期） | 待还款："+XR.Tool.toCentHalfUp(toRefundMoney)+"（"+toRefundNum+"期）");
								}
							}
						});

					}
				}

			});
		},
		/**
		 * 【项目信息】
		 */
		ProjectDetail:function(){
			DETAIL_BS.Api.QueryTotalProjectInfoBySid({sid: DETAIL_BS.InitData.SID},function(result){
				if(result.state==0){
					var data = result.data;

					if(data.loanType==4 || data.loanType==7 || data.loanType==8 || data.loanType==9 ||data.loanType==11||data.loanType==17){//消费贷的债务人字段取name
						DETAIL_BS.Api.GetNameById({userId:data.loaner},function(rs){
							var name = rs.data;//使用baseOutput类里面的data字段，装载name
							$("#debtor").html(name);//债务人
						})
					}else{
						$("#debtor").html(data.debtorIntroduction);//债务人
					}

					if(data.loanType==1 && data.life){
						$("#debtLifetime").html(data.life);
						$("#debtLifetimeField").show();
					}
					if(data.moneyUsage){
						$("#usage").html(data.moneyUsage);//资金用途
						$("#usageField").show();
					}
					if(data.showName!=null&&data.showCertificatenumber!=null){
						$("#showCert").html(data.showName+"   "+data.showCertificatenumber);//债务人证件号展示
						$("#showCertificate").show();

					}


					if(data.mainBusiness){
						$("#mainBusiness").html(data.mainBusiness);//主要经营
						$("#mainBusinessField").show();
					}
					if(data.companyEstablishDate){
						$("#companyEstablishDate").html(data.companyEstablishDate);
						$("#companyEstablishDateField").show();
					}
					if(data.registeredCapital){
						$("#registeredCapital").html(data.registeredCapital);
						$("#registeredCapitalField").show();
					}
					if(data.companyType){
						$("#companyType").html(data.companyType);
						$("#companyTypeField").show();
					}
					if(data.debtorQualification){
						$("#debtorQualification").html(data.debtorQualification);//资质介绍
						$("#debtorQualificationField").show();
					}
					if(data.repaymentGuarantee){
						$("#repaymentGuarantee").html(data.repaymentGuarantee);//还款保障
						$("#repaymentGuaranteeField").show();
					}

					if(data.loanerIntroduction==0){//录入个人信息
						$("#personalInfoField").show();
						if(data.sex==0){
							$("#sex").html("女");
						}else if(data.sex==1){
							$("#sex").html("男");
						}

						if(data.age){
							$("#age").html(data.age);
						}

						if(data.industry){
							$("#industry").html(data.industry);
						}

						if(data.education){
							$("#education").html(data.education);
						}

						if(data.marriage==0){
							$("#marriage").html("未婚");
						}else if(data.marriage==1){
							$("#marriage").html("已婚");
						}else if(data.marriage==2){
							$("#marriage").html("离异");
						}else if(data.marriage==3){
							$("#marriage").html("单身");
						}

						if(data.annualIncome){
							$("#yearIncome").html(data.annualIncome);
						}

						if(data.position){
							$("#position").html(data.position);
						}

						if(data.house==1){
							$("#house").html("有");
						}

						if(data.car==1){
							$("#car").html("有");
						}
						if(data.city){
							$("#city").html(data.city);
						}

					}else if(data.loanType==11){//纯线上借贷，获取个人详细资料
						DETAIL_BS.Api.QueryLoanerInformation({loanerId:data.loaner},function(data){
							$("#personalInfoField").show();

							$("#sex").html(data.sex);
							$("#age").html(data.age);
							var industry = data.industry;
							if(industry.length>6){
								$("#industry").html('<a href="javascript:void(0)" style="text-decoration:none;" title = "'+industry+'">'+industry.substr(0,6)+'...</a>');
							}else{
								$("#industry").html(industry);
							}
							if(data.userName!=null&&data.userCredentialsNo!=null){
								$("#showCert").html(data.userName+"   "+data.userCredentialsNo);//债务人证件号展示
								$("#showCertificate").show();
							}
							$("#education").html(data.userEduStr);
							$("#marriage").html(data.userMarrStr);
							$("#yearIncome").html(data.userSalary/10000+' 万元');
							$("#position").html(data.userPositionStr);
							$("#house").html("-");
							$("#car").html("-");
							$("#city").html(data.userCommuAdd);

						});
					}else if(data.loanType==8||data.loanType==13){
						DETAIL_BS.Api.GetLoanerInfo({loanerId:data.loaner},function(data){
							if(data.state==0){
								$("#personalInfoField").show();
								$("#sex").html(data.sex);
								$("#age").html(data.age);
								$("#city").html(data.userCommuAdd);
							}
						});
					}

					if(data.loanType==1 && data.transferorIntroduction){//出让人简介
						$("#transferorIntroduction").html(data.transferorIntroduction);
						$("#transferorIntroductionField").show();
					}

					if(data.guaranteeCorporation!=62167){//有担保
						$("#enterInfo").show();

						var arr = XR.Loan.GetEnterNameAndUrl(data.guaranteeCorporation);
						if(data.guaranteeCorporation==560677||data.guaranteeCorporation==26050){
							$("#enterName").html(arr[0]);
							$("#enterName").next().hide();
							}else{
						$("#enterName").html(arr[0]);
						$("#enterName").next().attr("href",arr[1]);
						}
						if(data.guaranteeCorporation==55){
							$("#huazhenQualification").show();
						}else if(data.guaranteeCorporation==560677){
							$("#guoxingQualification").show();
						}
					}

					var safeguardHtml = XR.Loan.GetSafeguardHtml(data.loanType,data.guaranteeCorporation);
					$("#safeguard").html(safeguardHtml);

					//项目材料及授权凭证
					DETAIL_BS.InitData.ShowPictures(data.filePaths,data.pictureCodes);
				}
			});
		},
		/**
		 *
		 */
		ShowPictures:function(filePaths,pictureCodes){
			if(filePaths && pictureCodes){
				//修理一下字符串,把最后的'&'去掉
				filePaths = filePaths.substring(0,filePaths.length-1);
				pictureCodes = pictureCodes.substring(0,pictureCodes.length-1);

				var filePathArr = filePaths.split("&");
				var pictureCodeArr = pictureCodes.split("&");

				var _html='';
				for(var i=0;i<filePathArr.length;i++){

					//var url = 'https://www.xinrong.com/'+filePathArr[i];
					var url = '/'+filePathArr[i];
					var code = pictureCodeArr[i];
					if(i==0){
						//_html += '<li><img name="'+url+'" alt=""  title="" class="curr" src="'+url+'"/><span>'+code+'</span></li>';
						_html += '<li><img name="'+url+'" alt="" title="" src="'+url+'"/><span>'+code+'</span></li>';
						$("#spec-n1").find("img").attr("src",url);
					}else{
						_html += '<li><img name="'+url+'" alt="" title="" src="'+url+'"/><span>'+code+'</span></li>';
					}

				}
				$("#pictureList").html(_html);

				initPicList();
			}else{
				//把图片列表隐藏掉
				$("#pictureList").hide();
				$("#tab3").hide();
			}
		},

		/**
		 * 投资记录列表对外接口
		 */
		InvestRecord:function(){
			DETAIL_BS.InitData.ObtainInvestRecord(1);
		},
		ObtainInvestRecord:function(pageIndex){
			$.ajax({
				url:'/v2/project/obtain_invest_record_by_sid.jso',
				data:{pageSize:8,pageIndex:pageIndex,sid:DETAIL_BS.InitData.SID},
				dataType:'json',
				type:'post',
				success:function(result){

					if(result.state==0){
						var rows = result.rows;

						var _html='';
						for(var i=0;i<rows.length;i++){

							var money = XR.Tool.toCentHalfUp(parseFloat(rows[i].money));
							var rate = XR.Tool.toCentHalfUp(parseFloat(rows[i].rate));
							var interest = XR.Tool.toCentHalfUp(parseFloat(rows[i].interest));
							var time = XR.Tool.FormateDate(rows[i].time,'Y-m-d h:m:s');
							var userName = rows[i].userName;
							//modify by sundy zhou 2016-5-13
							var isAuto = rows[i].isAuto;
							if(rows[i].isAuto==1){
								isAuto = "自动投资成功";
							}else{
								isAuto = "手动投资成功";
							}
							if(rows[i].userId==47593){
								userName="信存宝";
								isAuto = "自动投资成功";
							}


							_html+='<tr>'+
								'<td align="center">'+userName+'</td>'+
								'<td align="center">'+money+'元</td>'+
								'<td align="center">'+rate+'%</td>'+
								'<td align="center">'+interest+' 元</td>'+
								'<td align="center">'+time+'</td>'+
								'<td align="center">'+isAuto+'</td>'+
							'</tr>';
						}

						$("#investRecordList").html(_html);//把整个列表内容放到html页面对应的位置

						var pageNum = Math.ceil(result.total/8);//总页数
						DETAIL_BS.InitData.ShowInvestRecordBtn(pageIndex,pageNum);

					}
				}
			});
		},
		//根据总页数，和当前页码，生成分页按钮布局
		ShowInvestRecordBtn:function(pageIndex,pageNum){
			var _html='<a href="javascript:DETAIL_BS.InitData.PreviousInvestRecordPage('+pageIndex+','+pageNum+')">上一页</a>';
			if(pageNum<=7){
				for(var i=1;i<=pageNum;i++){
					if(i==pageIndex){
						_html+='<span>'+i+'</span>';
					}else{
						_html+='<a href="javascript:DETAIL_BS.InitData.ObtainInvestRecord('+i+')">'+i+'</a>';
					}
				}
			}else{//总页数大于7时
				var marginLeft = pageIndex-1;
				var marginRight = pageNum-pageIndex;
				var startIndex;
				var endIndex;
				if(marginLeft<3){
					startIndex=1;
				}else if(marginRight<3){
					startIndex=pageNum-6;
				}else{
					startIndex=pageIndex-3;
				}

				if(startIndex==2){
					_html+='<a href="javascript:DETAIL_BS.InitData.ObtainInvestRecord(1)">1</a>';
					_html+='...';
				}

				if(startIndex>2){
					_html+='<a href="javascript:DETAIL_BS.InitData.ObtainInvestRecord(1)">1</a>';
					_html+='<a href="javascript:DETAIL_BS.InitData.ObtainInvestRecord(2)">2</a>';
					_html+='...';
				}

				for(var i=startIndex;i<startIndex+7;i++){
					if(i==pageIndex){
						_html+='<span>'+i+'</span>';
					}else{
						_html+='<a href="javascript:DETAIL_BS.InitData.ObtainInvestRecord('+i+')">'+i+'</a>';
					}
				}

				endIndex=startIndex+6;
				if(endIndex<pageNum){
					_html+='...';
				}
			}
			_html+='<a href="javascript:DETAIL_BS.InitData.NextInvestRecordPage('+pageIndex+','+pageNum+')">下一页</a>';
			$("#investRecordBtn").html(_html);
		},
		//入参为当前页码和总页数
		PreviousInvestRecordPage:function(pageIndex,pageNum){
			pageIndex--;

			//如果递减后的pageIndex合法，则根据新的pageIndex获取列表，并且正确展示分页按钮
			if(pageIndex>=1&&pageIndex<=pageNum){
				DETAIL_BS.InitData.ObtainInvestRecord(pageIndex);
			}
		},
		//入参为当前页码和总页数
		NextInvestRecordPage:function(pageIndex,pageNum){
			pageIndex++;

			//如果递增后的pageIndex合法，则根据新的pageIndex获取列表，并且正确展示分页按钮
			if(pageIndex>=1&&pageIndex<=pageNum){
				DETAIL_BS.InitData.ObtainInvestRecord(pageIndex);
			}
		},
		GetRecentInvestAndRefundList:function (){
			$.ajax({
				url:'/v2/project/obtain_recent_invest_and_refund_list.jso',
				type:'post',
				dataType:'json',
				success : function(result){
					if(result.state==0){
						var _html;
						var loanTypeStr;
						var money;
						var time;
						var investList=result.investList;//得到后台返回的最近投资列表
						var refundList=result.refundList;//得到后台返回的最近回款列表

						//最近投资
						_html='';
						for(var i in investList){

							time = AA.Helper.date(investList[i].time,'m-d h:m');

							loanTypeStr = XR.Loan.LoanType[investList[i].loanType];

							money = investList[i].money;
							if(money.indexOf('.')>-1){
								money = money.substring(0,money.indexOf('.'));
							}
							if(Number(money)>=10000){
								money=AA.Helper.toFixed(money/10000)+'万';
							}
							var snLastStr=investList[i].sn.substr(15,3);
							_html+='<li><span class="litime">'+time+'</span><span class="liname">'+investList[i].name+'</span><span class="xmname">'+loanTypeStr+'</span><span class="money">'+money+'元</span></li>';
						}

						DETAIL_BS.InitData.recentInvestHtml = '<ul class="recentlyfont">'+_html+'</ul>';

						//最近回款
						_html='';
						for(var i in refundList){

							time = AA.Helper.date(refundList[i].time,'m-d h:m');
							loanTypeStr = XR.Loan.LoanType[refundList[i].loanType];

							money = refundList[i].money;
							if(money.indexOf('.')>-1){
								money = money.substring(0,money.indexOf('.'));
							}
							if(Number(money)>=10000){
								money=AA.Helper.toFixed(money/10000)+'万';
							}
							var snLastStr=refundList[i].sn.substr(15,3);
							_html+='<li><span class="litime">'+time+'</span><span class="liname">'+refundList[i].name+'</span><span class="xmname">'+loanTypeStr+'</span><span class="money">'+money+'元</span></li>';
						}
						DETAIL_BS.InitData.recentRefundHtml = '<ul class="recentlyfont">'+_html+'</ul>';

						$("#s1").html(DETAIL_BS.InitData.recentInvestHtml);
						$("#s1").jCarouselLite({auto:3000, speed:1000, vertical:true, visible:8, start:0, scroll:8});

					}
				},
				error : function(rs){
				}
			});
		},
		ScrollInvestList:function(){
			$("#s1").html(DETAIL_BS.InitData.recentInvestHtml);
			$("#s1").jCarouselLite({auto:3000, speed:1000, vertical:true, visible:8, start:0, scroll:8});
		},
		ScrollRefundList:function(){
			$("#s1").html(DETAIL_BS.InitData.recentRefundHtml);
			$("#s1").jCarouselLite({auto:3000, speed:1000, vertical:true, visible:8, start:0, scroll:8});
		},
		GetMinValue:function(x,y){
			var minValue=x<y?x:y;
			minValue =100*parseInt(minValue/100);

			return minValue;
		},
		/**
		 * 测试用
		 */
		RemoveSlider:function(){
		},
		initDoubleScoreTitleShow:function(){
			$.ajax({
				 url:'/v2/active/get_conf_double_score_or_not.jso',
				 type:'post',
				 dataType:'json',
				 success:function(result){
				 	if(result.state == 1 && result.data == true){
				 		$('.invest_double').show();
				 	}
				 }
			});
		}
	},
	DETAIL_BS.Api={
		InitTitle:function (data ,success ,error) {
			XR.Global.async({
	            url:'/v2/project/loan_detail_show.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
	    },
		getTitlePics:function(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag,escrowFlag){
			var pics;
			var db_pic = '';//担保图标
			var kz_pic = '';//可转/转 图标
			var sx_pic = '';//手限图标
			var ya_pic='';
			var bei_pic='';
			var jiang_pic='';//奖励图标
			var esw_pic='';
			if(enterId != 62167){
				db_pic = 'D';
			}else{
				if(type!=6&&type!=5&&type!=16){
					bei_pic='B';
				}else{
					if(type == 6||type == 16){
						ya_pic='Y';
					}
				}
			}

			if(seletionType==1){
				kz_pic = 'Z';
			}
			/*else if(conDeadline > 1){
				kz_pic = '<a href="javascript:void(0)"><i class="kezhuan" title="投资一个月后即可转让">可转</i></a>';
			}*/

			if(autoInvest == 0){
				sx_pic = 'S';
			}

			if(seletionType==0 && flag != 2 && Number(reward) > 0){
				jiang_pic = 'J';
			}
			
			if(escrowFlag == 1){
				esw_pic = 'E';
			}


			pics=ya_pic+bei_pic+db_pic+kz_pic+sx_pic+jiang_pic+esw_pic;
			return pics;
			},
		GetRefundInfo:function(data, success, error){
			XR.Global.async({
	            url:'/v2/project/get_refund_info.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
		},
		GetRefundPlanForProgress:function(data, success, error){
			XR.Global.async({
	            url:'/v2/project/get_refund_plan_by_sid.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
		},
		QueryTotalProjectInfoBySid:function(data, success, error){
			XR.Global.async({
	            url:'/v2/project/query_total_project_info_by_sid.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
		},
		QueryLoanerInformation:function(data, success, error){
			XR.Global.async({
	            url:'/v2/onlineloan/query_loaner_information.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
		},
		/**
		 * 根据融资方id取融资方的代号，或者，根据担保方id取担保方名称(该接口不能查询普通投资者，以免泄露用户信息)
		 */
		GetNameById:function(data,success,error){
			XR.Global.async({
	            url:'/v2/project/get_name_by_id.jso' ,
	            type:'POST' ,
	            data:data ,
	            success:success ,
	            error:error
	        });
		},

		GetUserAccount:function(success,error){
			XR.Global.async({
	            url:'/v2/escrow/get_account_base_info.jso',
	            type:'POST' ,
	            success:success ,
	            error:error
	        });
		},
		GetLoanerInfo:function(data,success,error){
			XR.Global.async({
	            url:'/v2/project/get_loaner_info.jso',
	            type:'POST' ,
				 data:data ,
	            success:success ,
	            error:error
	        });
		},
		/**
		 * 未开始的项目 弹出层
		 */
		do_invest_no_start:function(project_money,invest_time){
			if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {//检查登录态，如果没登陆，就弹出登录界面
				AA.RapidLogin.popup();
				return;
			}
			invest_time = DETAIL_BS.Api.helper_date(invest_time,'Y-m-d h:m:s');
			$.alert({
				 title:'此项目暂未开始抢投，请稍作等待！',
				 content:'起投时间：'+invest_time+'<br/><br/>项目金额：<span style="color:red">'+project_money+'</span> 元  '
					+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#999">(100元起投，需100元整数倍)</span> ',
				 txtBtn:'关闭',
				 height:'260px',
				 init:function (d ,btn,btn1 ) {
				    btn.click(function () {
				    	d.close();
				    });
				 }
			});
		},
		helper_date:function (timestamp ,format) {
			var _date, _year, _month, _day, _hour, _minute, _second;
			_date = new Date(timestamp * 1000);//时间戳要乘1000
			_year = _date.getFullYear();
			_month = (_date.getMonth() + 1 < 10) ? ('0' + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
			_day = (_date.getDate() < 10) ? ('0' + _date.getDate()) : (_date.getDate());
			_hour = (_date.getHours() < 10) ? ('0' + _date.getHours()) : (_date.getHours());
			_minute = (_date.getMinutes() < 10) ? ('0' + _date.getMinutes()) : (_date.getMinutes());
			_second = (_date.getSeconds() < 10) ? ('0' + _date.getSeconds()) : (_date.getSeconds());
			if (format == 'Y-m-d h:m:s') {
				return (_year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second);
			} else if (format == 'Y-m-d') {
				return (_year + '-' + _month + '-' + _day);
			} else if (format == 'm-d') {
				return (_month + '-' + _day);
			} else if (format == 'm-d h:m:s') {
				return (_month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second);
			} else if (format == 'm-d h:m') {
				return (_month + '-' + _day + ' ' + _hour + ':' + _minute);
			} else if(format == 'h:m:s'){
				 return ( _hour + ':' + _minute + ':' + _second);
			} else if(format == 'Y-m-d h:m'){
				return (_year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute);
			}
			else {
				return 0;
			}
		}
	}
})(DETAIL_BS);
