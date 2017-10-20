var AccountIndex;
(function(){
	var $this = {
		pageSize:10,
		tradeType:0,
		viewType:1,
		init:function(){	
			$this.initAccountInfo();
			$this.tranceListByInfo(1);
			$this.RechargeListByInfo(1);
			$this.WithdrawListByInfo(1);
			$this.initInvestRecord();
			$this.bind();
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
		initAccountInfo:function(){
			UserAPI.BaseInfoWithEswJx({},function(result){
				if (result.state == 0) {
					if (result.eswAccountId == null) {
						$('#no_open_account').show();
						$('#open_account').hide();
						return;
					}
					$('#user_name').html(result.name);
					$('#esw_account_id').html(result.eswAccountId);

				}
			});
			UserAPI.AssetOverviewWithEswJx({},function(result){
				if (result.state == 0) {
					var eswAccountBalance = result.eswAccountBalance;
					var eswEarning = result.eswEarning;
					var eswEarningMoney = result.eswEarningMoney;
					var eswEarningRetain = result.eswEarningRetain;
					var eswRewardMoney = 0;//result.rewardMoney;
					var eswMoneyWithdraw = 0;//result.moneyWithdraw;
					var eswOverdue = result.eswOverdue;
					var eswXcbTotalMoney = 0;//result.xcbTotalMoney;
					var eswAvialBalance = result.eswAvialBalance;
					var eswFreezeBalance=result.eswFreezeBalance;




					var eswAll = Number(eswAccountBalance)+Number(eswRewardMoney)+Number(eswEarningMoney)+
						Number(eswMoneyWithdraw)+Number(eswXcbTotalMoney);

					$('#totle_money').html(eswAll == '0'?'0.00':XR.Tool.commafy(XR.Tool.formatDecimals(XR.Tool.toCent(eswAll))));
					$('#can_user_money').html(XR.Tool.toCent(eswAvialBalance));
					$('#frezze_money').html(XR.Tool.toCent(eswFreezeBalance));
					$('#earn_money').html(XR.Tool.toCent(result.eswEarning));
					$('#earning_retain').html(XR.Tool.toCent(result.eswEarningRetain));
					$('#earn_all').html(XR.Tool.toCent(eswEarningMoney));

				}
			});
			UserAPI.InvestInfoWithEswJx({},function(result){
				if (result.state == 0) {
					$('#sum_invest_money').html(XR.Tool.toCent(result.eswInvestSum));
					var profitingMoney = XR.Tool.toCent(result.eswProfitingMoney);
					$("#profitingMoney").html(profitingMoney==0?'0.00':XR.Tool.commafy(XR.Tool.formatDecimals(profitingMoney)));
					var profitingRetain = XR.Tool.toCentHalfUp(result.eswProfitingRetain);
					$("#profitingRetain").html(profitingRetain==0?'0.00':XR.Tool.commafy(XR.Tool.formatDecimals(profitingRetain)));
					var receivedRetain = XR.Tool.toCent(result.eswReceivedRetain);
					var totalInvestRetain = XR.Tool.toCent(result.eswTotalInvestRetain);
                    $("#receivedRetain").html(totalInvestRetain==0?'0.00':XR.Tool.commafy(XR.Tool.formatDecimals(totalInvestRetain)));

				}
			});
			// UserAPI.BaseAccountInfoWithEswJx({},function(result){
			// 	if (result.state == 0) {
					
			// 	}
			// });
		
			
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
		loadAccountNearRefundList:function(pindex){
			// $('#query_btn_view').hide();
			var psize=5;
			var data = {
				type:$('#type').val(),
				pageSize:psize,
				pageIndex:pindex,
				beginTime:$('#stime').val(),
				endTime:$('#etime').val()
			};
			$this.LoanUpcomingRefundList(data);
		},
		LoanUpcomingRefundList:function(data){
					$.ajax({
						url:'/v2/member/get_esw_upcoming_refund_list.jso',
						data:data,
						dataType:'json',
						type:'post',
						success:function(result){
							if(result.state==1){
								var rows = result.data.rows;//列表数据
								var moneyAndRetain = XR.Tool.toCentHalfUp(result.data.moneyAndRetain);//回款总额
								var total = result.data.total;//总笔数
								$("#refundNum").html(total);
								$("#refundSum").html(moneyAndRetain);
								if(typeof(result.data.startTime)!=undefined&&result.data.startTime!=null){
					        		$('#s-time').val(result.data.startTime);
					        	}
								if(typeof(result.data.endTime)!=undefined&&result.data.endTime!=null){
					        		$('#e-time').val(result.data.endTime);
					        	}
								var _html='';
								$('#'+targetListView).html('');
								for(var i=0;i<rows.length;i++){
									var loanType = XR.Loan.LoanType[rows[i].loanType];
									var sn = rows[i].sn.substring(3,9)+'..'+rows[i].sn.substring(rows[i].sn.length-3, rows[i].sn.length);
									var title = loanType+'-'+sn;
									var refundDay = rows[i].refundDay;
									var refundSum = XR.Tool.toCentHalfUp(rows[i].refundSum);
									var investTime =rows[i].investTime;
									var investMoney=rows[i].investMoney
									var deadline=rows[i].deadline;
									var rate=rows[i].rate;
									var refundType=rows[i].refundType;
			                        if(rows[i].eswType==1)
			                        {
			                            _html+='<tr>' +
							              '<td align="center">' + refundDay + '</td>' +
							              '<td align="center">' + title + '</td>' +
							              '<td align="center">' + investTime + '</td>' +
							              '<td align="center">' + investMoney+ '</td>' +   //<td align="center">-0.17 元</td>
							              '<td align="center">' + deadline + '%</td>' +
							              '<td align="center">' + rate + ' 元</td>' +
							              '<td align="center">' + refundType + '</td>' +
							              '<td align="center">' + refundSum + '元</td>' +
							              '<td align="center">' + '收益中' + '</td>' +
							              '</tr>';

			                        }
									
								}
								var targetPageView='pagination_view_refund';
								var targetListView='refundList';
								$('#'+targetListView).html(_html);
								$('#'+targetPageView).pagination({
		                		 'container':'#'+targetPageView,
		                         'pageSize':10 ,
		                         'total':result.data.total,
		                         'pageIndex':pageIndex ,
		                         'callback':'AccountIndex.LoanUpcomingRefundList'
								});
			                   

							}else if(result.state==1009){
								XR.Global.Login();
								return;
						}
					}
				});
			},
		tranceListByInfo:function(pageIndex,targetviewType,type){
			var timeType=$('#time_type').val();
			if (timeType==null ||typeof timeType =='undefined' ||timeType =='') {
				timeType=4;
			}
			var tranceType=$('#select_type').val();
			if (tranceType==null ||typeof tranceType =='undefined' ||tranceType =='') {
				tranceType=0;
			}
			
			UserAPI.getIncomeAndExpense({
				pageSize:10,
				pageIndex:pageIndex,
				time:timeType,
				type:tranceType,
				startTime:0,
				endTime:0
				},
				function(result){
					if(result.state==0){
						var rows = result.recordField;
						var countField=result.countField;
						var _html;
						var targetListView;
						var targetPageView;

						var sumTranNum=0;
						
						targetListView='payments_record';
						targetPageView='pagination_view_trade';
						var totle_sum=0,in_sum=0,in_num=0,out_sum=0,out_num=0;
						$('#all_view').html('');
						for (var i = 0; i < countField.length; i++) {
							totle_sum+=parseInt(countField[i].count)
							if (countField[i].streamType == 1) {
								in_num=countField[i].count;
								in_sum=countField[i].sum;
							}else {
								out_num=countField[i].count;
								out_sum=countField[i].sum;
							}
						}
						if (parseInt(rows.length) <1) {
							$('#'+targetListView).html('<tr style="text-align: center;">无</tr>');
							// var html='共 <span class="orange" >'+totle_sum+'</span> 笔收支明细：收入 <span id="money_in_num">'+ in_num +'</span> 笔，共 <span class="orange" id="money_in">'+ in_sum +'</span> 元；支出 <span>'+ out_num +'</span> 笔，共 <span class="orange" id="money_out">'+ out_sum +'</span> 元。';
							// $('#all_view').html(html);
							return;
						}

						// if (tranceType == 0) {
							// '共 <strong class="g-out">' + _d.total + '</strong> 笔收支明细：收入 <span>'
       //                                  + _d.iNum + '</span> 笔，共 <strong class="g-out">'
       //                                  + _d.iMoney + '</strong> 元；支出 <span>'
       //                                  + _d.oNum + '</span> 笔，共 <strong class="g-out">'
       //                                  + _d.oMoney + '</strong> 元。';
							var html='共 <span class="orange" >'+totle_sum+'</span> 笔收支明细：收入 <span id="money_in_num">'+ in_num +'</span> 笔，共 <span class="orange" id="money_in">'+ in_sum +'</span> 元；支出 <span>'+ out_num +'</span> 笔，共 <span class="orange" id="money_out">'+ out_sum +'</span> 元。';
							$('#all_view').html(html);
							// $('#all_view').show();
							// $('#in_out_sum_num').html(sumTranNum);
							// $('#money_in_num').html(countField[0].count);
							// $('#money_in').html(countField[0].sum);
							// $('#money_out_num').html(countField[1].count);
							// $('#money_out').html(countField[1].sum);
						// }else {
						// 	if (countField) {}
						// } 

					
						$('#'+targetListView).html('');
						$('#'+targetPageView).pagination({
                		 'container':'#'+targetPageView,
                         'pageSize':10 ,
                         'total':totle_sum,
                         'pageIndex':pageIndex ,
                         'callback':'AccountIndex.tranceListByInfo'
						});


						for (var i = 0; i < rows.length; i++) {
							


							var ctime = XR.Tool.FormateDate(rows[i].ctime,'Y-m-d h:m:s');

							var roleType = rows[i].roleType;
							var tradeType = rows[i].tradeType;

							var tradeTypeStr = XR.Global.getTradeTypeStr(roleType,tradeType);


							var streamType = rows[i].streamType;

							var sign;
							if(streamType==1){//收入
								sign = '+';
							}else{//支出
								sign = '-';
							}

							var money = rows[i].money;

							var balanceMoney = rows[i].balanceMoney;

							var note = rows[i].note||'';

							var sn =rows[i].sn;
							if(note != ''){
								tradeTypeStr = note;
							}
						
							if (streamType ==1) {
								_html +=  '<tr>' +
						              '<td align="center">' + ctime + '</td>' +
						              '<td align="center">' + tradeTypeStr + '</td>' +
						              '<td align="center">' + sn + '</td>' +
						              '<td align="center">' + money + '元</td>' +   //<td align="center">-0.17 元</td>
						              '<td align="center">0.00 元</td>' +
						              '<td align="center">' + balanceMoney + ' 元</td>' +
						              '<td align="center">' + note + '</td>' +
						            '</tr>';
								}else {
									_html +=  '<tr>' +
							              '<td align="center">' + ctime + '</td>' +
							              '<td align="center">' + tradeTypeStr + '</td>' +
							              '<td align="center">' + sn + '</td>' +
							              '<td align="center">0.00 元</td>' +
							              '<td align="center">' + money + '元</td>' +   //<td align="center">-0.17 元</td>
							              '<td align="center">' + balanceMoney + ' 元</td>' +
							              '<td align="center">' + note + '</td>' +
							            '</tr>';
								}
								

						}
						$("#"+targetListView).html(_html);
						
					}

				}
			)
		},
		RechargeListByInfo:function(pageIndex){
			var timeType=$('#time_type_recharge').val();
			if (timeType==null ||typeof timeType =='undefined' ||timeType =='') {
				timeType=4;
			}
			UserAPI.getIncomeAndExpense({
				pageSize:10,
				pageIndex:pageIndex,
				time:timeType,
				type:5,
				startTime:0,
				endTime:0
				},
				function(result){
					if(result.state==0){
						var rows = result.recordField;
						var countField=result.countField;
						var _html;
						var targetListView;
						var targetPageView;

						var sumTranNum=0;

						targetListView='recharge_record';
						targetPageView='pagination_view_recharge';
						var totle_sum=0,in_sum=0,in_num=0,out_sum=0,out_num=0;
						for (var i = 0; i < countField.length; i++) {
							totle_sum+=parseInt(countField[i].count)
							if (countField[i].streamType == 1) {
								in_num=countField[i].count;
								in_sum=countField[i].sum;
							}else {
								out_num=countField[i].count;
								out_sum=countField[i].sum;
							}
						}
						if (parseInt(rows.length) <1) {
							$('#'+targetListView).html('<tr style="text-align: center;">无</tr>');
							// var html='共 <span class="orange" >'+0+'</span> 笔收支明细：收入 <span id="money_in_num">'+ 0 +'</span> 笔，共 <span class="orange" id="money_in">'+ 0 +'</span> 元；支出 <span>'+ 0 +'</span> 笔，共 <span class="orange" id="money_out">'+ out_sum +'</span> 元。';
							// $('#recharge_view').html(html);
							// return;
						}
						var html='共 <span class="orange" >'+totle_sum+'</span> 笔充值记录：收入 <span id="money_in_num">'+ in_num +'</span> 笔，共 <span class="orange" id="money_in">'+ in_sum +'</span> 元；支出 <span>'+ out_num +'</span> 笔，共 <span class="orange" id="money_out">'+ out_sum +'</span> 元。';
						$('#recharge_view').html(html);

						if (timeType == 4) {
							if (countField.length != 0) {
								$('#sum_recharge_money').html(countField[0].sum);
							}else {
								$('#sum_recharge_money').html(0);
								return;
							}
							
						}
						totle_sum=countField[0].count;
					
						$('#'+targetListView).html('');
						$('#'+targetPageView).pagination({
                		 'container':'#'+targetPageView,
                         'pageSize':10 ,
                         'total':totle_sum,
                         'pageIndex':pageIndex ,
                         'callback':'AccountIndex.RechargeListByInfo'
						});


						for (var i = 0; i < rows.length; i++) {
							


							var ctime = XR.Tool.FormateDate(rows[i].ctime,'Y-m-d h:m:s');

							var roleType = rows[i].roleType;
							var tradeType = rows[i].tradeType;

							var tradeTypeStr = XR.Global.getTradeTypeStr(roleType,tradeType);


							var streamType = rows[i].streamType;

							var sign;
							if(streamType==1){//收入
								sign = '+';
							}else{//支出
								sign = '-';
							}

							var money = rows[i].money;

							var balanceMoney = rows[i].balanceMoney;

							var note = rows[i].note||'';

							var sn =rows[i].sn;
							if(note == ''){
								tradeTypeStr = note;
							}
							
							_html +=  '<tr>' +
					              '<td align="center">' + ctime + '</td>' +
					              '<td align="center">' + tradeTypeStr + '</td>' +
					              '<td align="center">' + sn + '</td>' +
					             												// '<td align="center">0.00 元</td>' +
					              '<td align="center">' + money + '元</td>' +   //<td align="center">-0.17 元</td>
					              '<td align="center">' + balanceMoney + ' 元</td>' +
					              '<td align="center">' + note + '</td>' +
					            '</tr>';

						}
						$("#"+targetListView).html(_html);
						
					}

				}
			)
		},
		WithdrawListByInfo:function(pageIndex){
			var timeType=$('#time_type_withdraw').val();
			if (timeType==null ||typeof timeType =='undefined' ||timeType =='') {
				timeType=4;
			}
	
			UserAPI.getIncomeAndExpense({
				pageSize:10,
				pageIndex:pageIndex,
				time:timeType,
				type:6,
				startTime:0,
				endTime:0
				},
				function(result){
					if(result.state==0){
						var rows = result.recordField;
						var countField=result.countField;
						var _html;
						var targetListView;
						var targetPageView;

						var sumTranNum;
				
						targetListView='withdraw_record';
						targetPageView='pagination_view_withdraw';
						var totle_sum=0,in_sum=0,in_num=0,out_sum=0,out_num=0;
						for (var i = 0; i < countField.length; i++) {
							totle_sum+=parseInt(countField[i].count)
							if (countField[i].streamType == 1) {
								in_num=countField[i].count;
								in_sum=countField[i].sum;
							}else {
								out_num=countField[i].count;
								out_sum=countField[i].sum;
							}
						}
						if (parseInt(rows.length) <1) {
							$('#'+targetListView).html('<tr style="text-align: center;">无</tr>');
							
						}
						var html='共 <span class="orange" >'+totle_sum+'</span> 笔提现记录：收入 <span id="money_in_num">'+ in_num +'</span> 笔，共 <span class="orange" id="money_in">'+ in_sum +'</span> 元；支出 <span>'+ out_num +'</span> 笔，共 <span class="orange" id="money_out">'+ out_sum +'</span> 元。';
							$('#withdraw_view').html(html);
						if (timeType == 4) { 
							if (countField != 0) {
								$('#sum_withdraw_money').html(countField[0].sum);
							}else {
								$('#sum_withdraw_money').html(0);
								return;
							}
							
						}
						totle_sum=countField[0].count;
						$('#'+targetListView).html('');
						$('#'+targetPageView).pagination({
                		 'container':'#'+targetPageView,
                         'pageSize':10 ,
                         'total':totle_sum,
                         'pageIndex':pageIndex ,
                         'callback':'AccountIndex.WithdrawListByInfo'
						});


						for (var i = 0; i < rows.length; i++) {
							


							var ctime = XR.Tool.FormateDate(rows[i].ctime,'Y-m-d h:m:s');

							var roleType = rows[i].roleType;
							var tradeType = rows[i].tradeType;

							var tradeTypeStr = XR.Global.getTradeTypeStr(roleType,tradeType);
							var oppId=rows[i].oppId;

							var streamType = rows[i].streamType;

							var sign;
							if(streamType==1){//收入
								sign = '+';
							}else{//支出
								sign = '-';
							}

							var money = rows[i].money;

							var balanceMoney = rows[i].balanceMoney;

							var note = rows[i].note||'';

							var sn =rows[i].sn;
							if(note == ''){
								tradeTypeStr = note;
							}
						
							_html +=  '<tr>' +
				              '<td align="center">' + ctime + '</td>' +
				              '<td align="center">' + oppId + '</td>' +
				              '<td align="center">' + sn + '</td>' +
				              '<td align="center">' +money +'元</td>' +
				              '<td align="center">' + balanceMoney+ '元</td>' +   //<td align="center">-0.17 元</td>
				             												// '<td align="center">' + balanceMoney + ' 元</td>' +
				              '<td align="center">' + note + '</td>' +
				            '</tr>';
							}


						
						$("#"+targetListView).html(_html);
						
					}

				}
			)
		},
		initInvestRecord:function(){
			$('#sl_time,#status,#refund_type').change(function () {
                if (this.id == 'sl_time') {
                	$("#time").val($(this).val());
                    if ($(this).val() != '3') {
                        $('#pk_time').hide();
                        $this.loadInvestRecord(1);
                    } else {
                        $('#pk_time').show();
                    }
                } else {
                	$this.loadInvestRecord(1);
                }
            });
			
			$this.loadInvestRecord(1);
		},
		loadInvestRecord:function(pageIndex){
			var refundType = $('#refund_type').val();
			var status = $('#status').val();
			var time = $("#time").val();
			$.ajax({
				url:'/v2/escrow/get_invest_record_list.jso',
				data:{
					time:time,
					startTime:0,
					endTime:2524579200,
					status:status,
					refundType:0,
					pageSize:5,
					pageIndex:pageIndex
				},
				type:'post',
				dataType:'json',
				success:function(result){
					if(result.state == 1){
						var list = result.data.rows;
						var total = result.data.total;
						var totalInvestMoney = result.data.totalInvestMoney;
						var html = '';
						$.each(list,function(i,v){
							var loanType = XR.Loan.LoanType[v.loanType];
							var sn = v.sn.substring(0,6)+'..'+v.sn.substring(v.sn.length-3, v.sn.length);
							var title = loanType+'-'+sn;
							var investMoney = XR.Tool.toCentHalfUp(v.investMoney);
							var loanId = v.loanId;
							var investTime = v.itime||'';
							var deadline = v.deadline;
							var deadlineDay = v.deadline;
							var secType = v.secType;
							var rate = v.rate
							//var profitingRetain = v.profitingRetain;
							//var ptime = v.ptime||'';
							var refund_type = AA.Api.Loan.refundType[v.refundType];
							var r_status = '';
							if(v.eswBidStatus==0x20){
								if(v.status==3){
									r_status = '收益中';
								}else{
									r_status = '已回款';
								}
							}else{
								r_status = $this.transEswBidStatus(v.eswBidStatus);
							}
							var deadlineStr = deadline+'个月';
							if(secType == 1 && deadlineDay > 0){
								deadlineStr += deadlineDay+'天';
							}
							
							html += '<tr>\
					              <td align="center">'+title+'</td>\
					              <td align="center">'+investTime+'</td>\
					              <td align="center">'+investMoney+'元</td>\
					              <td align="center">'+deadlineStr+'</td>\
					              <td align="center">'+rate+'%</td>\
					              <td align="center">'+refund_type+'</td>\
					              <td align="center">'+r_status+'</td>\
					            </tr>';
							
						});
						$('#invest_record_view').html(html);
						
						//$('#invest_record_page_view').html('');
						$('#invest_record_page_view').pagination({
                		 'container':'#invest_record_page_view',
                         'pageSize':5 ,
                         'total':total,
                         'pageIndex':pageIndex ,
                         'callback':'AccountIndex.loadInvestRecord'
						});
						
						if(total > 0){
							$('#invest_record_total_view').show();
							$('#invest_record_total').html(total);
							$('#invest_record_all_invest_money').html(totalInvestMoney);
						}else{
							$('#invest_record_total_view').hide();
						}
					}
				}
			});
		},
		transEswBidStatus:function(s){
			var result="";
			switch(s){
				case 0x0:
					result="处理中";
					break;
				case 0x10:
					result="冻结中";
					break;
				case 0x20:
					result="成功";
					break;
				case 0x30:
					result="失败";
					break;
				case 0x40:
					result="已取消";
					break;
				case 0x50:
					result="超时";
					break;
				case 0x60:
					result="取消中";
					break;
				case 0x70:
					result="已取消";
					break;
				case 0x80:
					result="异常";
					break;
			}
			return result;
		},
		refreshMoney:function(){
			$("#refresh_money").unbind('click').html("正在刷新");
			$('#can_user_money').html('获取中...');
			$.ajax({
				type:'post',
				url:'/v2/account/esw_sync_account.jso',
				dataType:'json',
				success:function(result){
					if(result.state == 0){
						$('#can_user_money').html(XR.Tool.toCent(result.data.realAvailBalance));
						$("#refresh_money").bind('click',function(){
							$this.refreshMoney();
						}).html('刷新余额');
					}
				}
			});
		},
		bind:function(){
			$('#tab1').bind('click',function(){
				$this.tranceListByInfo(1,1,0);
			})
			$('#tab2').bind('click',function(){
				$this.RechargeListByInfo(1);
			})
			$('#tab3').bind('click',function(){
				$this.WithdrawListByInfo(1);
			})
			$('#refresh_money').bind('click',function(){
				$this.refreshMoney();
			})
			
			// $('#tab4').bind('click',function(){
			// 	$this.RechargeListByInfo(1);
			// })
			// $('#tab5').bind('click',function(){
			// 	$this.WithdrawListByInfo(1);
			// })
			// $('a[id^="a-type-"]').click(function(){
			// 	var type = $(this).attr('id');
			// 	type = type.substring(type.length-1,type.length);
			// 	$this.changeNearRefundType(type);
			// });
			// $('#searchBtn').click(function(){
			// 	$this.changeNearRefundType(5);
			// });
		},

	};
	$(function(){
		$this.isLogin();
		$("#time_to_say").html(getTimeQuantum());
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
