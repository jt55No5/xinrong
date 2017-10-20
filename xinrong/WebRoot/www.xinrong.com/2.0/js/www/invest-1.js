var Invest;
(function(){
	var $this = {
		pageSize:5,
		pageIndex1:1,
		pageIndex2:1,
		pageIndex3:1,
		pageIndex4:1,
		oneKeyLoad:false,
		init:function(){
			$this.initLoginView();
			$this.initXcbRateInfo();
			$this.initXcbDialog();
			$this.initLoanInfo();
			$this.initLoanShowOrder();
			$this.initServerTime();
			$this.initServiceData();
			$this.initLastMonthInvestRanking();
			$this.initOneKeyInvest();
			$this.initDoubleScoreTitleShow();
			$this.initInvestRetShow();
		},
		initLoginView:function(){
			$.ajax({
				url:'v2/login/in_session_data.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
			    	if(result.state==0){
			    		$.ajax({
			                url: '/v2/member/get_bank_card_is_save_and_check.jso',
			                type: 'post',
			                dataType: 'json',
			                success: function(result){
			                	if (result.state == 0) {
			                		G_ENV_VAR.IS_CHECKED_IDENTIFICATION  = result.isCheckedIdentification == 0?false:true;
                    				G_ENV_VAR.IS_CHECKED_BANKCARD = result.hasBankCardRecord == 0?false:true;
                    				G_ENV_VAR.IS_ID_BANK_LOAD = true;
			                	}
			                }
			            });
			    		G_ENV_VAR.IS_CHECKED_EMAIL=result.isAuthEmail==0?false:true;
			    		G_ENV_VAR.IS_CHECKED_MOBILE=result.isAuthMobile==0?false:true;
			    		G_ENV_VAR.IS_CHECKED_IDENTIFICATION=result.isAuthIden==0?false:true;
			    		G_ENV_VAR.IS_CHECKED_BANKCARD=result.isAuthBankCard==0?false:true;
			    		G_ENV_VAR.UNAME=result.uname;
			    		G_ENV_VAR.UID=result.uid;
			    		G_ENV_VAR.VIP=result.vip;

			    		if(G_ENV_VAR.UID!=''&&G_ENV_VAR.UID>0){
			    			$this.initAccountInfo();
			    			$('#invest_no_login_view').hide();
			    			$('#invest_user_info_view').show();
			    			
			    			$('#top_exit').show();
			    			
			    			$('#hello_title').html(G_ENV_VAR.UNAME+'，'+getTimeQuantum());
			    		}
			    		
			    		if(G_ENV_VAR.VIP > 0){
			    			$('#invest_vip_btn').hide();
			    		}
			    		
			    	}else if(result.state == 1009){
			    		$('.h-login').show();
			    		$('#hello_title').html('嗨，'+getTimeQuantum());
			    	}
			    }
			});
		},
		initAccountInfo:function(){
			$.ajax({
				url:'/v2/xincunbao/get_index_info.jso',
				type:'post',
				dataType:'json',
				success:function(result){
					if(result.state==0){
						$("#balanceMoney").html(result.money);

						var _html = '<span class="red">'+result.rewardMoney+'</span>元';
						if(result.rewardMoney>0){
							_html+='<span class="gray">(期限'+result.deadline+'天)</span>';
						}

						$("#rewardMoney").html(_html);
						$("#score").html(result.score);
					}
				}
			});
		},
		initXcbRateInfo:function(){
			$.ajax({
				url : '/v2/xincunbao/xcb_product_info.jso',
				type : 'post',
				dataType : 'json',
				success : function(data) {
					if(data.state == 0 ){
						RateData=data.rate;
						var rate = data.rate == "" ? "0.00" : data.rate;
						if (rate=="0.00") {
							var rateText="昨日年化收益率计算中";
							$("#xcb_rateText").html(rateText);
							
							$this.xcbLoadRateFun = (function(){
								var spanText=$("#xcb_load").html()||'';
								var len = spanText.length;
								if(len<3){
									spanText += '.';
								}else{
									spanText = '.';
								}
								$("#xcb_load").html(spanText);
								setTimeout(function(){
									Invest.xcbLoadRateFun();
								},1000);
							});
							$this.xcbLoadRateFun();
						}
						$("#xcb_rate").html(rate+"%");
					}
				}
			});
		},
		initXcbDialog:function(){
			$('#invest_xcb_cr').unbind('click').click(function(){
				if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {//检查登录态，如果没登陆，就弹出登录界面
					AA.RapidLogin.popup();
					return;
				}
				
				var dd = $.popup1({
			        title:'' ,
			        width:'341',
			        padding:'0',
			        content:$("#xcb_window").html(),
			        initialize:function (d) {
			        	$this.initDialogAccoutMoney();
			        	$this.initXcbMoneyLeft();
			        	
			        	$('#xcb_cr').unbind('click').click(function(){
			        		if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {//检查登录态，如果没登陆，就弹出登录界面
			        			AA.RapidLogin.popup();
			        			return;
			        		}
			        		
			        		$("#xcb_cr").attr("disabled","disabled");

			        		setTimeout('$("#xcb_cr").attr("disabled", false)',2000);//2秒后启动

			        		$("#crSuccess").attr("style","display:none");//成功图标隐藏
			        		
			        		var errorObj = $("#errorInfo");
			        		if(!$("#readme").is(':checked')){
			        	    	$("#icls").addClass("icon01");
			        	    	errorObj.html('请阅读信存宝协议');
			        	    	return;
			        		}
			        		
			        		var _money = $("#xcb_cr_money").val();
			        		var _pass = $("#xcb_cr_password").val();

			        		if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(_money)){
			        			$("#icls").addClass("icon01");
			        			errorObj.html("金额格式不对");
			        			$("#xcb_cr_money").focus();
			        			return;
			        		}
			        		
			        		if(_pass.length == 0){
			        			$("#icls").addClass("icon01");
			        			errorObj.html("交易密码不能为空");
			        			$("#xcb_cr_password").focus();
			        			return;
			        		}
			        		errorObj.html("");//清空错误提示
			        		$("#crLogo").attr("style","display:block");
			        		
			        		//申购
			        		$.ajax({
			        			url : '/v2/xincunbao/buy_apply.jso',
			        			type : 'post',
			        			data:{money:_money,pass:AA.Helper.encrypPw(_pass)},
			        			dataType : 'json',
			        			success : function(data) {
			        				if(data.state == 0){
			        					$("#crLogo").attr("style","display:none");
			        					//信存宝存入成功后弹窗
										$("#xcb_cr_suc_money").html(_money);
										dd.close();
										var xcbSucWindow = $.popup1({title:'' ,
											width:'341',
											padding:'0',
											content:$("#xcb_cr_suc").html()
										});
										$(".suc-close").bind("click",function(){
											xcbSucWindow.close();
										});
										//信存宝存入成功后弹窗 
			        	        		$("#xcb_cr_money").val("");
			        	    			$("#xcb_cr_password").val("");
			        	    			
			        	    			$this.initDialogAccoutMoney();
			    			        	$this.initXcbMoneyLeft();
			        				} else{
			        					$("#icls").addClass("icon01");
			        					$("#crLogo").attr("style","display:none");
			        					errorObj.html(data.msg);
			        				}
			        			}
			        		});
			        	});
			        }
				});
				
				//绑定关闭事件
				$(".d-close").bind("click",function(){
					dd.close();
				});
				
				document.onkeydown = function(e){
					var ev = document.all ? window.event : e;
					if(ev.keyCode==13) {
						var target=ev.srcElement ? ev.srcElement : ev.target;
						if(target.id!='xcb_cr'){
							$('#xcb_cr').click();
						}
					}
				}
			});
		},
		initDialogAccoutMoney:function(){
			$.ajax({
				url : '/v2/xincunbao/get_index_info.jso',
				type : 'post',
				dataType : 'json',
				success : function(data) {
					 if(data.state == 0){
						 var money = data.money;
						 var name = data.name;
						 $("#index_account_money").html(money);
						 $("#xcb_cr_money").val(money);
						 $("#index_xcb_name").html(name);
					 }
				}
			});
		},
		initXcbMoneyLeft:function(){
			$.ajax({
				url : '/v2/xincunbao/get_xcb_info.jso',
				type : 'post',
				dataType : 'json',
				success : function(data) {
		            var availableMoneyLeft = data.availableMoneyLeft;
					if(availableMoneyLeft > 1000000){
						availableMoneyLeft = ">100万";
					}
					$("#index_xcb_money").html(availableMoneyLeft);
				}
			});
		},
		initLoanInfo:function(){
			$this.loadLoanListCout = 0;
			
			$this.pageIndex1 = 1;
			$this.getSectionList1($this.pageIndex1);
			
			$this.pageIndex2 = 1;
			$this.getSectionList2($this.pageIndex2);
			
			$this.pageIndex3 = 1;
			$this.getSectionList3($this.pageIndex3);
			
			$this.pageIndex4 = 1;
			$this.getSectionList4($this.pageIndex4);
			
		},
		initLoanShowOrder:function(){
			if(Invest.loadLoanListCout < 3){
				setTimeout(function(){
					Invest.initLoanShowOrder();
				},500);
				return;
			}
			if(Invest['loanListBeginCount1'] == 0){
				//无可投标，禁用一键投资
				$('#onekey_btn').unbind('click');
				$('#onekey_btn').css('background-color','#c8c8c8');
				if(Invest['loanListBeginCount2'] == 0){
					if(Invest['loanListBeginCount3'] != 0){
						$('#tab3').click();
					}
				}else{
					$('#tab2').click();
				}
			}
		},
		getSectionList1:function(pageIndex){
			/**
			 * 品牌专区（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_available_brand_section_list.jso',
				data:{pageSize:$this.pageSize,pageIndex:pageIndex},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.pageIndex1 = pageIndex;
					$this.showLoanList(result,'1');
					$this.leftAmountSum1 = formatAmount(result.leftAmountSum);
					$('#leftAmountSum').html($this.leftAmountSum1);
					if(result.rows.length == 0){
						$('#onekey_btn').unbind('click');
						$('#onekey_btn').css('background-color','#c8c8c8');
					}
				}
			});
		},
		getSectionList2:function(pageIndex){
			/**
			 * 信·优企贷/无忧贷（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_available_big_section_list.jso',
				data:{pageSize:$this.pageSize,pageIndex:pageIndex},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.pageIndex2 = pageIndex;
					$this.showLoanList(result,'2');
				}
			});
		},
		getSectionList3:function(pageIndex){
			/**
			 * 信·消费贷（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_available_small_section_list.jso',
				data:{pageSize:$this.pageSize,pageIndex:pageIndex},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.pageIndex3 = pageIndex;
					$this.showLoanList(result,'3');
				}
			});
		},
		getSectionList4:function(pageIndex){
			/**
			 * 过期项目
			 */
			$.ajax({
				url:'/v2/project/obtain_outdated_section_list.jso',
				data:{pageSize:$this.pageSize,pageIndex:pageIndex},
				dataType:'json',
				type:'post',
				success:function(result){
					//$this.loadLoanListCout += 1;
					$this.pageIndex4 = pageIndex;
					$this.showLoanList(result,'4');
				}
			});
		},
		showLoanList:function(result,target){
			if(result.state != 0){
				return;
			}
			
			var targetView = $("#loanList"+target);
			
			var html = '';
			var noBeginNum = 0;
			var dataList = result.rows;
			var sectionAvailableCount = result.sectionAvailableCount;
			
			if(sectionAvailableCount == 0){
				$('#tab'+target+' i').remove();
			}else{
				if($('#tab'+target+' i').length > 0){
					$('#tab'+target+' i').html(sectionAvailableCount);
				}else{
					$('#tab'+target).append('<i>'+sectionAvailableCount+'</i>');
				}
			}
			
			if(!!!$this['loanListBeginCount'+target]){
				$this['loanListBeginCount'+target] = 0;
			}
			
			$.each(dataList,function(i,obj){
				var loanType = obj.loanType;
				var sn = obj.conSn;//截取2到10位
				var sort = obj.sort;//非转让标
				var seletionType = obj.sectionType;
				var enterId = obj.enterId;
				var conDeadline = obj.conDeadline;
				var autoInvest = obj.autoInvest;
				var amount = obj.amount;//融资金额
				var raisedAmount = obj.raisedAmount;//已投金额
				var deadlineStr = obj.deadlineStr;//融资期限
				var refundType = obj.refundType;//1 到期一次性 2等额本息 3 等额本金 4 按月付息
				var rate = obj.rate;
				var progress = amount == 0 ? 0 : changeTwoDecimal(raisedAmount/amount);//进度
				var flag = obj.flag;//0 未启动 1 已启动未投满 2 已投满
				var id = obj.id;
				var randNum = obj.randNum;
				var reward = obj.reward;
				var stime = obj.stime;
				var escrowFlag = obj.escrowFlag;
				
				var pics = encodeURIComponent(getTitlePics(loanType,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag,escrowFlag));
				var loanTitle = getXRLoanTitle(loanType,sn,sort,seletionType);
				var loanTitlePic = getXRLoanTitlePic(loanType,enterId,autoInvest,seletionType,reward,flag,escrowFlag);
				//添加1-xx
				var computeLength=1;
				var newDeadlineStr=obj.deadlineStr;
				if(newDeadlineStr.indexOf("个月")>-1){
					for(i=0;i<deadlineStr.length;i++){
					if(!/^[0-9]+[0-9]*]*$/.test(deadlineStr[i]))
					{computeLength=i;
					break;}
					}
				if(obj.deadlineStr.substring(0,computeLength)>=2){
					newDeadlineStr="<b>"+"1~"+"</b>"+deadlineStr;	
					}
				}
				
				
				if(deadlineStr.indexOf('天') > -1){
					deadlineStr = '<span>'+deadlineStr.replace("个月","</span>个月<span>").replace("天","</span>天");
				}else{
					deadlineStr = '<span>'+deadlineStr.replace("个月","</span>个月");
				}
				if(newDeadlineStr.indexOf('天') > -1){
					newDeadlineStr = '<span>'+newDeadlineStr.replace("个月","</span>个月<span>").replace("天","</span>天");
				}else{
					newDeadlineStr = '<span>'+newDeadlineStr.replace("个月","</span>个月");
				}
			
			
				
				var biginStimeView = '';
				
				if(flag == 0){
					btn = '<a href="javascript:void(0)" methodHref="Invest.doInvestNoStart('+formatAmount(amount)+','+obj.stime+');" class="sub03 invest_btn">未开始</a>';
					var stimeStrObj = getTimes2(stime);
					var stimeStr = stimeStrObj[0]+':'+stimeStrObj[1];
					biginStimeView = '<span class="p_time">\
										<span class="blue">'+stimeStr+'</span>开始抢投\
									  </span><input id="stime" type="hidden" value="'+stime+'" />';
					//<p class="blue" id="count_down_view">00:00:00</p>\
					noBeginNum += 1;
				}else if(flag == 1){
					if(seletionType!=0){
						reward=0;
					}
					var call_str="do_invest_step_one("+id+",'"+deadlineStr+"','"+loanTitle+"',"+seletionType+","+autoInvest+",'"+pics+"','"+rate+"','"+reward+"','"+escrowFlag+"')";
					btn = '<a href="javascript:void(0)" methodHref="'+call_str+'" class="sub02 invest_btn">立即投资</a>';
					$this['loanListBeginCount'+target] += 1;
				}else if(flag == 2){
					btn = '<a href="javascript:void(0)" class="sub01 invest_btn">已投满</a>';
				}
				
				if(reward>0 && seletionType==0 && flag!=2){
					html += '<dl onclick="window.open(\'/2.0/detail.shtml?sid='+id+'\')">\
								<dt>'+loanTitle+'&nbsp;'+loanTitlePic+'</dt>\
								<dd>\
									<ul>\
										<li class="wf_text"><h2 class="orange"><span>'+rate+'</span>%<span class="f-raise">+<b>'+(reward*12/conDeadline).toFixed(2)+'%</b></span></h2>预期年化收益率</li>\
										<li class="wf_text wf01"><h2>'+newDeadlineStr+'</h2>融资期限</li>\
										<li><h3>'+fmoney(formatAmount(XR.Tool.toCent(Number(amount)-Number(raisedAmount))))+'</h3>剩余可投</li>\
										<li><h3>'+getRefundType(refundType)+'</h3>回款方式</li>\
									</ul>\
									<div class="clear"></div>\
									'+biginStimeView+'\
									<span class="p_sub">'+btn+'<p>100元起投</p></span>\
								</dd>\
								\
							</dl>';
				} else {
					html += '<dl onclick="window.open(\'/2.0/detail.shtml?sid='+id+'\')">\
								<dt>'+loanTitle+'&nbsp;'+loanTitlePic+'</dt>\
								<dd>\
									<ul>\
										<li class="wf_text"><h2 class="orange"><span>'+rate+'</span>%</h2>预期年化收益率</li>\
										<li class="wf_text wf01"><h2>'+newDeadlineStr+'</h2>融资期限</li>\
										<li><h3>'+fmoney(formatAmount(XR.Tool.toCent(Number(amount)-Number(raisedAmount))))+'</h3>剩余可投</li>\
										<li><h3>'+getRefundType(refundType)+'</h3>回款方式</li>\
									</ul>\
									<div class="clear"></div>\
									'+biginStimeView+'\
									<span class="p_sub">'+btn+'<p>100元起投</p></span>\
								</dd>\
								\
							</dl>';
				}
			});
			
			targetView.empty();
			targetView.append(html);
			
			if(result.total>$this.pageSize){
				var pageIndex = eval('$this.pageIndex'+target);
				$('#pageView'+target).show();
				var pageData = {
	        		 'container':'#pageView'+target,
	                 'pageSize':$this.pageSize ,
	                 'total':result.total ,
	                 'pageIndex':pageIndex ,
	                 'callback':'Invest.getSectionList'+target,
	                 'disabledCls':'c-font'
				};
				if(target != '4'){
					pageData['showFirst'] = true;
					pageData['showLast'] = true;
				}
				$('#pageView'+target).pagination(pageData);
			}else{
				$('#pageView'+target).hide();
			}
			
			if(dataList.length == 0){
				$('#noneList'+target).show();
			}
			
			if(noBeginNum > 0){
				if($this['showSectionCountDownTimer'+target]){
					clearInterval($this['showSectionCountDownTimer'+target]);
				}
				$this['showSectionCountDownTimer'+target] = setInterval(function(){
					Invest.showSectionCountDown(target);
				},1000);
			}
			
			$('#loanList'+target).find('.invest_btn').unbind('click').click(function(event){
				 event.stopPropagation();
				 var methodHref = $(this).attr('methodHref');
				 if(methodHref){
					 eval(''+methodHref);
				 }
			});
			
			if($this['pageIndex'+target] != 1){
				$('body').scrollTop(280);
			}
		},
		initServerTime:function(){
			$this.getServerTime();
			setInterval("Invest.getServerTime()",10000);//每10秒去服务器拿时间 校验本地时间
			setInterval("Invest.increateSeconds()",1000);  // 每1秒加1秒时间 用于项目倒计时
		},
		increateSeconds:function(){
			var value = $("#server_time").val();
			$("#server_time").val(++value);
		},
		getServerTime:function(){
			$.ajax({
				url:'/dumy.txt?t='+new Date().getTime(),
				type:'GET',
				complete:function(xhr,ts){
					var date=new Date(xhr.getResponseHeader('Date'));
					server_times=date.getTime()/1000;//当前的时间戳
					$("#server_time").val(server_times);
				}
			});
		},
		doInvestNoStart:function(project_money,invest_time){
			/*if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {//检查登录态，如果没登陆，就弹出登录界面
				AA.RapidLogin.popup();
				return;
			}*/
			invest_time = (new Date(invest_time*1000)).Format("yyyy-MM-dd hh:mm:ss");
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
		showSectionCountDown:function(target){
			$('#loanList'+target+' dl').each(function(){
				var stime = $(this).find("#stime").val()||'';
				if(stime){
					stime = parseInt(stime);
				}else{
					return true;
				}
				
				var localTime = parseInt($("#server_time").val());
				var countDownSeconds = stime - localTime;
				if(countDownSeconds<0){
					var pageIndex = eval('$this.pageIndex'+target);
					$this['getSectionList'+target](pageIndex);
				}else{//正常显示倒计时信息
					var timeCountDownObj = getTimes(countDownSeconds*1000);
					var timeCountDownStr = timeCountDownObj[0]+':'+timeCountDownObj[1]+':'+timeCountDownObj[2]
					//$(this).find("#count_down_view").html(timeCountDownStr);
					$(this).find(".invest_btn").html(timeCountDownStr);
				}
			});
		},
		initServiceData:function(){
			$.ajax({
		 		url : '/v2/transaction/summary_data.jso',
		 		type : 'post',
		 		dataType : 'json',
		 		success : function(data) {
		 			var yesTotal_money = Number(data.yesTotal).toFixed(2)+'';
		 			var yesTotal_money_1 = '0';
		 			var point_yesTotal_money = yesTotal_money.lastIndexOf('.');
		 			if(point_yesTotal_money != -1){
		 				yesTotal_money_1 = yesTotal_money.substring(0,point_yesTotal_money);
		 			}
		 			$('#yesTotal_money').animateNumber({
		 				number: yesTotal_money_1 ,
		 				numberStep: function(now, tween) {
		 			    	var target = $(tween.elem);
		 			    	target.prop('number', now).html(fmoneyCN(now,0));
		 			    }
		 			},3000);
		 			
		 			var yesTotalSecLoanNumCount = data.yesTotalSecLoanNumCount;
		 			$('#yesTotalSecLoanNumCount').animateNumber({
		 				number: yesTotalSecLoanNumCount ,
		 				numberStep: function(now, tween) {
		 			    	var target = $(tween.elem);
		 			    	target.prop('number', now).html(parseInt(now));
		 			    }
		 			},3000);
		 			
		 			$this.overDueMoney = data.overDueMoney;
		 			$this.badMoney = data.badMoney;
		 		}
			});
			
			$.ajax({
		 		url : '/v2/transaction/total_transaction_money.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) {  
		 			var acc_retaining_total = result.accRetainingTotal;
		 			
		 			var badAndOverDueCountFun = (function(){
		 				if($this.overDueMoney == null){
		 					setTimeout(badAndOverDueCountFun,100);
			 				return;
			 			}
		 				var allBadMoney = 5413231+parseFloat($this.badMoney);
			 			var allOverDueMoney = 2209973+parseFloat($this.overDueMoney);
			 			
			 			var allBadMoneyRate = Common.Tool.toFixed((allBadMoney*100/acc_retaining_total),2);
			 			var allOverDueMoneyRate = Common.Tool.toFixed((allOverDueMoney*100/acc_retaining_total),2);
			 			
			 			$('#allBadMoneyRate_view').html(Common.Tool.toDecimal(allBadMoneyRate));
			 			$('#allOverDueMoneyRate_view').html(Common.Tool.toDecimal(allOverDueMoneyRate+allBadMoneyRate));
		 			});
		 			
		 			badAndOverDueCountFun();
		 		}
			});
		},
		initLastMonthInvestRanking:function(){
			var server_time = $("#server_time").val()||'';
			if(!!!server_time){
				setTimeout(function(){
					Invest.initLastMonthInvestRanking();
				},500);
				return;
			}
			var date = new Date(server_time*1000);
			var prevMonthDayFirstDay=new Date(date.getFullYear(),date.getMonth()-1,1);
			//var prevMonthDayLastDay=new Date(new Date(date.getFullYear(),date.getMonth(),1).getTime()-1000);
			//var prevMonthDayFirstDayStr = prevMonthDayFirstDay.Format('yyyy-MM-dd hh:mm:ss');
			//var prevMonthDayLastDayStr = prevMonthDayLastDay.Format('yyyy-MM-dd hh:mm:ss');
			
			$('#last_month').html(prevMonthDayFirstDay.getMonth()+1);
			$.ajax({
				url:'/v2/active/find_user_invest_money_by_time.jso', //投资排行
				type:'post',
				dataType:'json',
				data:{pageSize:10,pageIndex:1,dateType:'last',moneyType:0},
				success:function(result){
					if(result.state != 0){
						return;
					}
					var html = '';
					$.each(result.dto,function(i,v){
						var name = v.name;
						var joinTime = v.joinTime;
						var money = v.money;
						var interest = v.interest;
						
						var tempDate = new Date(date.getTime());
						var joinDate = new Date(joinTime*1000);
						var year = 0;
						year = tempDate.getFullYear() - joinDate.getFullYear();
						tempDate.setFullYear(joinDate.getFullYear());
						if(tempDate < joinDate){
							tempDate.setFullYear(joinDate.getFullYear()+1);
							year = year - 1;
						}
						var day = parseInt((tempDate.getTime() - joinDate.getTime())/86400000);
						var joinDateStr = '';
						if(year){
							joinDateStr += year+'年';
						}
						joinDateStr += day+'天';
						
						var i_html = '';
						var bg_class = '';
						var index = i+1;
						if(index == 1){
							i_html = '<i class="AllIcon icon01">1</i>';
						}else if(index == 2){
							i_html = '<i class="AllIcon icon02">2</i>';
						}else if(index == 3){
							i_html = '<i class="AllIcon icon03">3</i>';
						}else{
							i_html = index;
						}
						if(index%2 == 0){
							bg_class = ' class="bg"';
						}
						html += '<tr'+bg_class+'>\
						    		<td align="center">'+i_html+'</td>\
						    		<td align="center">'+name+'</td>\
						    		<td align="center">'+fmoney(money)+'元</td>\
					    			<td align="center">'+fmoney(interest)+'元</td>\
				    				<td align="center">'+joinDateStr+'</td>\
		    					 </tr>';
						
					});
					$('#investRanking_view').empty();
					$('#investRanking_view').html(html);
				}
			});
		},
		initOneKeyInvest:function(){
			$('#onekey_btn').unbind('click').click(function(){
				if (G_ENV_VAR.UID==''||parseInt(G_ENV_VAR.UID)<=0) {
			        AA.RapidLogin.popup();
			        return;
				}
				if (!G_ENV_VAR.IS_ID_BANK_LOAD || !G_ENV_VAR.IS_CHECKED_IDENTIFICATION) {
					$.alert({
						title:'您尚未通过实名认证！',
		                content:'为了确定您的电子合同主体，请先完成实名认证再投资',
		                txtBtn:'立即认证',
		                url:'/2.0/views/account/account_settings.shtml'
		            });
		            return;
				}
				var _html = $('#invest_onekey').html();
				
				$.dialog({
					'id':'invest_onekey_dlg',
					'title':'一键投资',
					'padding':'10px 10px 10px 10px',
					'content':_html,
					'initialize':function () {
						var dialog=this;
						$('.d-dialog #invest_onekey_dlg_left_amout').html($this.leftAmountSum1);
						$.ajax({
							url:'/v2/escrow/get_account_base_info.jso',
							type:'GET' ,
							dataType:'json',
							success:function (rs) {
								if(rs.state == 0){
									$('.d-dialog #invest_onekey_dlg_total_money').html(toDecimal(parseFloat(rs.totalMoney)+parseFloat(rs.rewardMoney)+0.0005));
									
									if(parseFloat(rs.rewardMoney)<=0)
									{
										$('.d-dialog #invest_onekey_dlg_reward').html("无礼金可抵扣");
										$('.d-dialog #invest_onekey_dlg_reward_unit').hide();
									}else{
										/*//var money = $('.d-dialog #invest_onekey_dlg_money').val();
										if(parseFloat(result.data.money)>parseFloat(rs.rewardMoney))
										{
											$('.d-dialog #invest_onekey_dlg_reward').html(rs.data.rewardMoney);
										}else {
											$('.d-dialog #invest_onekey_dlg_reward').html(result.data.money);
										}*/
										$('.d-dialog #invest_onekey_dlg_reward').html(rs.rewardMoney);
										$('.d-dialog #invest_onekey_dlg_reward_unit').show();
									}
								}
							}
						});
						
						$this.initInvestOneKeyDlgCaptcha();
						
						$('.d-dialog #invest_onekey_dlg_btn').unbind('click').click(function(){
							if($this.oneKeyLoad == true){
								return;
							}
							var tradePass = $('.d-dialog #invest_onekey_dlg__tradepass').val();
							var money = $('.d-dialog #invest_onekey_dlg_money').val();
							var captcha = $('.d-dialog #invest_onekey_dlg_captcha').val();
							var seed = $('.d-dialog #invest_onekey_dlg_seed').val();
							
							if(!!!money || isNaN(money)){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>请输入正确金额数');
								return;
							}
							
							if(parseFloat(money)>10000000000){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>请输入正确金额数');
								return;
							}
							
							var totalMoney = Number($('.d-dialog #invest_onekey_dlg_total_money').html());
							//var rewardMoney = Number($('.d-dialog #invest_onekey_dlg_reward').html())||0;
							if(parseFloat(money)>(totalMoney)){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>账户可投余额不足,请及时充值');
								return;
							}
							
							if(parseFloat(money) > Number($this.leftAmountSum1)){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>项目余额不足，请重新输入金额');
								return;
							}
							
							var newMoney=money.toString();
							if(/^([0-9]+\.[0]{1,2})$/.test(money.toString())){
								var pointIndex=newMoney.indexOf("\.");
								money=newMoney.substr(0,pointIndex);
							}
							$('.d-dialog #invest_onekey_dlg_error_view').empty();
							if(tradePass == ''){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>请填写交易密码');
								return;
							}
							
							if(tradePass.length < 6 || tradePass.length > 16){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>交易密码必须为6-16个字符');
								return;
							}
							
							if(captcha == ''){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>请填写验证码');
								return;
							}
							
							if(captcha.length !=4){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>验证码必须为4个字符');
								return;
							}
							
							if($('.d-dialog #invest_onekey_dlg_checkbox').prop('checked') == false){
								$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>勾选协议后才可投资');
								return;
							}
							
							$this.oneKeyLoad = true;
							setTimeout(function(){
								Invest.oneKeyLoad = false;
							},60000);
							$.ajax({
								url:'/v2/invest/one_key_invest.jso',
								type:'post',
								dataType:'json',
								data:{
									sPass:AA.Helper.encrypPw(tradePass),
									lMoney:money,
									captcha:captcha,
									seed:seed
								},
								success:function(result){
									$this.oneKeyLoad = false;
									if(result.state == '0'){
										if(result.data.investMoney == 0){
											dialog.close();
											$.dialog({
												'id':'invest_onekey_fail',
												'title':'投资失败',
												'padding':'10px 10px 10px 10px',
												'content':$('#invest_onekey_fail').html(),
												'initialize':function () {
													var dialog=this;
													if ((G_ENV_VAR.VIP||0) != 0) {
														$('#invest_onekey_fail_vip').hide();
													}
													$('.d-dialog #invest_onekey_fail_go').click(function(){
														$this.pageIndex1 = 1;
														$this.getSectionList1($this.pageIndex1);
														dialog.close();
													});
													$('.d-dialog #invest_onekey_fail_back').click(function(){
														$this.pageIndex1 = 1;
														$this.getSectionList1($this.pageIndex1);
														dialog.close();
													});
												}
											});
										}else{
											dialog.close();
											$.dialog({
												'id':'invest_onekey_suc',
												'title':'投资成功',
												'padding':'10px 10px 10px 10px',
												'content':$('#invest_onekey_suc').html(),
												'initialize':function () {
													var dialog=this;
													$('.d-dialog #invest_onekey_suc_money').html(formatAmount(result.data.investMoney));
													$('.d-dialog #invest_onekey_earn').html(formatAmount(result.data.investEarn));
													$('.d-dialog #invest_onekey_score').html(result.data.scope);
													
													if ((G_ENV_VAR.VIP||0) != 0) {
														$('#invest_onekey_suc_vip').hide();
													}
													$('.d-dialog #invest_onekey_suc_go').click(function(){
														$this.pageIndex1 = 1;
														$this.getSectionList1($this.pageIndex1);
														dialog.close();
													});
													$('.d-dialog #invest_onekey_suc_back').click(function(){
														$this.pageIndex1 = 1;
														$this.getSectionList1($this.pageIndex1);
														dialog.close();
													});
												}
											});
										}
									}else{
										if(result.state == '2010'){
											//$('.d-dialog #invest_onekey_dlg_captcha').val('');
											$this.getInvestOneKeyDlgCaptcha();
											$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>验证码错误');
										}else if(result.state == '2008' || result.state == '2009'){
											//$('.d-dialog #invest_onekey_dlg_captcha').val('');
											$this.getInvestOneKeyDlgCaptcha();
											$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>交易密码错误');
										}else{
											//$('.d-dialog #invest_onekey_dlg_captcha').val('');
											$this.getInvestOneKeyDlgCaptcha();
											$('.d-dialog #invest_onekey_dlg_error_view').html('<i class="err_icon"></i>'+result.msg);
										}
									}
								}
							});
						});
						
						$('.d-dialog #invest_onekey_dlg_tradepass_eye_control').unbind('click').click(function(){
							var src = $(this).attr('src');
							if(src == '/webapp2.0/images/icon/eye_open.png'){
								$(this).attr('src','/webapp2.0/images/icon/eye_close.png');
								$('.d-dialog #invest_onekey_dlg__tradepass').attr('type','password');
							}else{
								$(this).attr('src','/webapp2.0/images/icon/eye_open.png');
								$('.d-dialog #invest_onekey_dlg__tradepass').attr('type','text');
							}
						});
						
						$('.d-dialog #invest_onekey_dlg_auto_fill').unbind('click').click(function(){
							var totalMoney = Number($('.d-dialog #invest_onekey_dlg_total_money').html());
							//var rewardMoney = Number($('.d-dialog #invest_onekey_dlg_reward').html())||0;
							var fillText;
							if(parseFloat($this.leftAmountSum1)>(totalMoney)){
								fillText = (totalMoney)-(totalMoney)%100;
							}else{
								fillText = $this.leftAmountSum1;
							}
							$('.d-dialog #invest_onekey_dlg_money').val(fillText);
						});
					}
				});
				
			});
		},
		initInvestOneKeyDlgCaptcha:function(){
			$('.d-dialog #invest_onekey_dlg_captcha_img').unbind('click').click(function(){
				$this.getInvestOneKeyDlgCaptcha();
			});
			$this.getInvestOneKeyDlgCaptcha();
		},
		getInvestOneKeyDlgCaptcha:function(){
			var seed=new Date().getTime();
			$('.d-dialog #invest_onekey_dlg_captcha_img').attr('src','/v2/login/get_captcha.raw?seed='+seed);
			$('.d-dialog #invest_onekey_dlg_seed').val(seed);
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
		},
		initInvestRetShow:function(){
			investRetShow();
		}
	};
	
	Invest = $this;
	
	$(function(){
		$this.init();
	});
	
	/**
	 * 获得时间段
	 * @returns {String}
	 */
	function getTimeQuantum(){
		return Common.Tool.getTimeQuantum();
	}
	
	/**
	 * 格式化金额-中文
	 * @param s
	 * @param n
	 */
	function fmoneyCN(s,n){
		n = n >= 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//精度
		var l = s.split(".")[0].split(""),
			r = s.split(".")[1];//remind
		t = "";
		var CN_TEN_THOUSAND = "万";
		var CN_HUNDRED_MILLION = "亿";
		var CN_UNIT = "元";
		if(l.length < 5){
			return s + CN_UNIT;
		}
		for(i = 0; i < l.length; i ++ )
		{
			if(i == (l.length - 9)){
				t += '<span class="orange">'+l[i] +'</span>'+ CN_HUNDRED_MILLION + "";
			}else if( i == (l.length - 5)){
				t += '<span class="orange">'+l[i] +'</span>'+ CN_TEN_THOUSAND + "";
			}else {
				t += '<span class="orange">'+l[i]+'</span>';
			}
		}
		return t.split("").join("") + CN_UNIT;
	}
	
	function changeTwoDecimal(x){
		return Math.floor(x * 100);
	}
	
	function formatAmount(str){
		str += '';
		var index = str.lastIndexOf('.');
		if(index != -1){
			return str.substring(0,index+3) ;
		}else{
			str += '.00';
		}
		return str;
	}
	
	function getXRStr(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag){
		var url = getXRStrUrl(id);
		resultStr = getXRStrInnerTitle(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag);
		return '<a href="'+url+'" target="_blank">'+resultStr+'</a>';
	}
	
	function getXRStrUrl(id){
		return '/2.0/detail.shtml?sid='+id;
	}
	
	function getXRLoanTitle(loanType,sn,sort,seletionType){
		var title = XR.Loan.TypeShow(loanType,sn);
		if(seletionType==0){
			title+='之'+XR.Loan.TypeSortShow(loanType,sn,sort);
		}else{
			title+='转让';
		}
		return title;
	}
	
	function getXRLoanTitlePic(loanType,enterId,autoInvest,seletionType,reward,flag,escrowFlag){
		var db_pic = '';//担保图标
		var kz_pic = '';//可转/转 图标
		var sx_pic = '';//手限图标
		var ya_pic='';
		var bei_pic='';
		var jiang_pic='';//奖励图标
		var esw_pic='';
		
		if(enterId != 62167){
			db_pic = '<a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>&nbsp;';
		}else{
			if(loanType!=6&&loanType!=5&&loanType!=16){
				bei_pic='<i class="danbao" title="风险准备金垫付">备</i>&nbsp;';
			}else{
				if(loanType == 6||loanType == 16){
					ya_pic='<i class="danbao" title="">押</i>&nbsp;';
				}
			}
		}
		
		if(seletionType==1){
			kz_pic = '<i class="zhuan" title="此项目为转让项目">转</i>&nbsp;';
		}
		
		if(autoInvest == 0){
			sx_pic = '<i class="shouxian" title="仅限手动投资且不超过1万元">手限</i>&nbsp;';
		}
		
		if(seletionType==0 && flag != 2 && Number(reward) > 0){
			jiang_pic = '<i class="jiang">奖</i>&nbsp;';
		}
		
		if(escrowFlag == 1){
			esw_pic = '<i class="escrow" title="仅限存管账户投资">存管</i>&nbsp;';
		}
		
		var title = '';
		
		title += ya_pic+bei_pic+db_pic+kz_pic+sx_pic+jiang_pic+esw_pic;

		return title;
	}
	
	function getXRStrInnerTitle(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag,escrowFlag){
		var db_pic = '';//担保图标
		var kz_pic = '';//可转/转 图标
		var sx_pic = '';//手限图标
		var ya_pic='';
		var bei_pic='';
		var jiang_pic='';//奖励图标
		var esw_pic='';
		if(enterId != 62167){
			db_pic = '<a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>';
		}else{
			if(type!=6&&type!=5&&type!=16){
				bei_pic='<i class="danbao" title="风险准备金垫付">备</i>';
			}else{
				if(type == 6||type == 16){
					ya_pic='<i class="danbao" title="">押</i>';
				}
			}
		}

		if(seletionType==1){
			kz_pic = '<i class="zhuan" title="此项目为转让项目">转</i>';
		}
		/*else if(conDeadline > 1){
		 kz_pic = '<a href="javascript:void(0)"><i class="kezhuan" title="投资一个月后即可转让">可转</i></a>';
		 }*/

		if(autoInvest == 0){
			sx_pic = '<i class="shouxian" title="仅限手动投资且不超过1万元">手限</i>';
		}

		if(seletionType==0 && flag != 2 && Number(reward) > 0){
			jiang_pic = '<i class="jiang">奖</i>';
		}
		
		if(escrowFlag == 1){
			esw_pic = '<i class="escrow" title="仅限存管账户投资">存管</i>&nbsp;';
		}

		var title = XR.Loan.TypeShow(type,sn);
		if(seletionType==0){
			title+='之'+XR.Loan.TypeSortShow(type,sn,sort);
		}else{
			title+='转让';
		}

		var partnerPic='';
		/*if(type == 8){
			partnerPic = '</a><a href="/about/partner/7" target="_blank"><span class="brandimg"><img src="/2.0/images/pic/15.jpg" width="94" height="30" /></span>';
			db_pic='';
			kz_pic='';
			sx_pic='';
			ya_pic='';
			bei_pic='';
			jiang_pic='';
		}else if(type == 9){
			partnerPic = '</a><a href="/about/partner/6" target="_blank"><span class="brandimg"><img src="/2.0/images/pic/17.jpg" width="90" height="29" /></span>';
			db_pic='';
			kz_pic='';
			sx_pic='';
			ya_pic='';
			bei_pic='';
			jiang_pic='';
		}else if(type==12){
			partnerPic = '</a><a href="javascript:void(0)" target="_blank"><span class="brandimg"><img src="/2.0/images/pic/18.png" width="90" height="29" /></span>';
			db_pic='';
			kz_pic='';
			sx_pic='';
			ya_pic='';
			bei_pic='';
			jiang_pic='';
		}else if(type==13){
			partnerPic = '</a><a href="/about/partner/8" target="_blank"><span class="brandimg"><img src="/2.0/images/pic/fenqix.jpg" width="90" height="29" /></span>';
			db_pic='';
			kz_pic='';
			sx_pic='';
			ya_pic='';
			bei_pic='';
			jiang_pic='';
		}else if(type==15){
			partnerPic = '</a><a  target="_blank"><span class="brandimg"><img src="/2.0/images/pic/pjd.jpg" width="90" height="29" /></span>';
			db_pic='';
			kz_pic='';
			sx_pic='';
			ya_pic='';
			bei_pic='';
			jiang_pic='';
		}*/

		title+=ya_pic+bei_pic+db_pic+kz_pic+sx_pic+jiang_pic+esw_pic+partnerPic;

		return title;
	}
	
	function getTitlePics(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag,escrowFlag){
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
	}
	
	function getRefundType(type){
		if(type == 1){
			return "到期一次性";
		}
		if(type == 2){
			return "等额本息";
		}
		if(type == 3){
			return "等额本金";
		}
		if(type == 4){
			return "按月付息";
		}
		if(type == 5){
			return "到期一次性";
		}
		if(type == 6){
			return "等额本息";
		}
		if(type == 7){
			return "等额本金";
		}
		if(type == 8){
			return "按月付息";
		}
		if(type == 9){
			return "到期一次性";
		}
		if(type == 10){
			return "等额本息";
		}
		if(type == 11){
			return "等额本金";
		}
		if(type == 12){
			return "按月付息";
		}
	}
	
	function getTimes(date3){
		//计算出相差天数
		var days=Math.floor(date3/(24*3600*1000));


		//计算出小时数
		var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000));

		if(days>0){
			hours+=days*24;
		}
		if(hours < 10 ) hours = "0"+hours;
		if(hours < 0) hours = "00";
		//计算相差分钟数
		var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000))
		if(minutes < 10 && minutes >=0) minutes = "0"+minutes;
		if(minutes < 0) minutes = "00";
		//计算相差秒数
		var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000);
		if(seconds < 10 ) seconds = "0"+seconds;
		if(seconds < 0) seconds = "00";
		
		var ret = new Array();
		ret.push(hours);
		ret.push(minutes);
		ret.push(seconds);
		
		return  ret;
	}
	
	function getTimes2(date3){
		var now= new Date(date3*1000);
		var hour = now.getHours() ;
		if(hour < 10) hour = "0"+hour;
		var minute = now.getMinutes();
		if(minute < 10) minute = "0"+minute;
		
		var ret = new Array();
		ret.push(hour);
		ret.push(minute);
		
		return  ret;
	}
	
	/**
	 * 格式化金额
	 * @param s
	 * @param n
	 * @returns {String}
	 */
	function fmoney(s, n){   
		n = n > 0 && n <= 20 ? n : 2;   
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		var l = s.split(".")[0].split("").reverse(),   
		r = s.split(".")[1];   
		t = "";   
		for(i = 0; i < l.length; i ++ )   
		{   
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
		}   
		return t.split("").reverse().join("") + "." + r;   
	}
})();