var Index;
(function(){
	var $this = {
		loadLoanListCout:0,
		init:function(){
			$this.initLoginView();
			$this.bindEvent();
			$this.initServiceData();
			$this.initAnnouncement();
			$this.loadXcbData();
			$this.initLoanInfo();
			$this.initLoanShowOrder();
			$this.initServerTime();
			$this.initMediaReport();
			$this.initDoubleScoreTitleShow();
			$this.initAdView();
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

			    			$('#index_username_show').html(G_ENV_VAR.UNAME);

			    			if(G_ENV_VAR.VIP==0){
			    				$('#index_no_vip_btn').show();
			    				$('#index_vip_btn').hide();
			    			}else{
			    				$('#index_no_vip_btn').hide();
			    				$('#index_vip_btn').show();
			    			}

			    			$('.login_one').hide();
				    		$('.login-name').show();
				    		$('#top_exit').show();
							$('#index_vip_show').html(G_ENV_VAR.VIP);
							
							$this.initAccoutIncome();
			    		}
			    		
			    	}else if(result.state == 1009){
			    		$('.h-login-reg').show();
			    	}
			    }
			});
		},
		initAccoutIncome:function(){
			$.ajax({
        		url:'/v2/xincunbao/get_xcb_info.jso',
	    	    type:'POST' ,
	    	    dataType:'json',
	    	    success:function (result1) {
	    	    	var xcb_total_income = result1.sumIncome;
	    	    	
	    	    	$.ajax({
		        		url:'/v2/member/get_invest_income_statistics.jso',
			    	    type:'POST' ,
			    	    dataType:'json',
			    	    success:function (result) {
			    	    	var earn_all = Number(result.receivedRetain)+
			        				   Number(xcb_total_income)+
			        				   //Number(result.profitingRetain)+
			        				   Number(result.deductedReward);
			        	
			        		$('#earn_all').html(fmoney(earn_all));
			        	}
		        	});
	        	}
        	});
			
			
		},
		initCaptcha:function(){
			$('#index_captcha_img').unbind('click').click(function(){
				$this.getCaptcha();
			});
			$this.getCaptcha();
		},
		getCaptcha:function(){
			var _ph = $('#index_captcha_img');
			var _seed = $('#index_captcha_seed');
	        var seed = new Date().getTime();
	        _ph.attr('src','/v2/login/get_captcha.raw?seed='+seed);
	        _seed.val(seed);
		},
		bindEvent:function(){
			$("#h-login").unbind('click').click(function(){
				$(".login_two").show();
				$(".login_one").hide();
				
            	$.ajax({
		    		url:'/v2/login/get_login_fail_times.jso',
		    	    type:'GET' ,
		    	    dataType:'json',
		    	    success:function (result) {
		    	    	if(result.state==0){
		    	    		Index.failLoginTimes=result.loginTimes;
		    	    		if(Index.failLoginTimes>=3){
		    	    			$('#index_captcha').show();
								$('#index_captcha_img_view').show();
								$this.initCaptcha();
		    	    		}
		    	    	}
		        	}
            	});
            	
			});
			
			$('#index_login_btn').unbind('click').click(function(){
				$('#index_error').empty();
				var username = $.trim($('#index_username').val());
				if(username == ''){
					$('#index_error').html('<i class="AllIcon icon01"></i>请填写账号');
					return;
				}
				var password = $.trim($('#index_password').val());
				var password_len = AA.Helper.getLength(password);
				if(password == ''){
					$('#index_error').html('<i class="AllIcon icon01"></i>请填写密码');
					return;
				}
				if(password_len < 6 || password_len > 16){
					$('#index_error').html('<i class="AllIcon icon01"></i>登录密码必须为6-16个字符');
					return;
				}
				var captcha = $.trim($('#index_captcha').val());
				var captcha_len = AA.Helper.getLength(captcha);
				if($('#index_captcha').is(':visible')){
					if(captcha == ''){
						$('#index_error').html('<i class="AllIcon icon01"></i>请填写验证码');
						return;
					}
					if(captcha_len != 4){
						$('#index_error').html('<i class="AllIcon icon01"></i>验证码必须为4个字符');
						return;
					}
				}
				var captcha_seed = $('#index_captcha_seed').val();
				$.ajax({
            		url:'/v2/login/login.jso',
            		type:'post',
            		dataType:'json',
            		data:{
            			username:username,
            			password:AA.Helper.encrypPw(password),
            			captcha:captcha,
            			seed:captcha_seed
            		},
            		success:function(result){
            			if (result.state == 0) {
            				sessionStorage.setItem('afterAnswer',null);
            				$(".d-close").click();
	                        AA.RapidLogin.showDialog(); //登录成功  提示弹窗
	                        $("#wBox_overlay").hide();
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
                        	if(result.state != 2010){
                        		Index.failLoginTimes=msg.substring(msg.indexOf("登录失败次数：")+7);
                        		var time=Index.failLoginTimes;
                        	}
							if(parseInt(time)>=3){
								$('#index_captcha').show();
								$('#index_captcha_img_view').show();
								$this.initCaptcha();
							}
                            if(result.state==2010){
                            	$('#index_error').html('<i class="AllIcon icon01"></i>验证码错误');
                            	$('#index_captcha').val('');
                            	$this.initCaptcha();
        					}else if(result.state==9998||result.state==9999){
        						$('#index_error').html('<i class="AllIcon icon01"></i>账户名或密码错误');
        						$('#index_captcha').val('');
        						$this.initCaptcha();
        					}else{
        						$('#index_error').html('<i class="AllIcon icon01"></i>账户名或密码错误');
        						$('#index_captcha').val('');
        						$this.initCaptcha();
        					}
                        }
            		}
            	});
			});
			
			$('#index_xcb_cr').unbind('click').click(function(){
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
			        					$("#crSuccess").attr("style","display:block");
			        	        		$("#xcb_cr_money").val("");
			        	    			$("#xcb_cr_password").val("");
			        	    			
			        	    			$this.initDialogAccoutMoney();
			    			        	$this.initXcbMoneyLeft();
													//信存宝存入成功后弹窗
													dd.close();
													$("#xcb_cr_suc_money").html(_money);
													var xcbSucWindow = $.popup1({title:'' ,
																											width:'341',
																											padding:'0',
																											content:$("#xcb_cr_suc").html()
																										});
													$(".suc-close").bind("click",function(){
														xcbSucWindow.close();
													});
													//信存宝存入成功后弹窗 
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
			
			$('#tab1').click(function(){
				$this.showCoutDown('1');
				$this.initLoanListScroll('1');
			});
			
			$('#tab2').click(function(){
				$this.showCoutDown('2');
				$this.initLoanListScroll('2');
			});
			
			$('#tab3').click(function(){
				$this.showCoutDown('3');
				$this.initLoanListScroll('3');
			});

			$(".login_two")[0].onkeydown = function(e){
				var theEvent = e || window.event;
				var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
				if(code ==13) {
					$('#index_login_btn').click();
				}
			}
		},
		initLoanListScroll:function(target){
			if($("#botton_scroll_"+target).is(':visible')){
				if($("#botton_scroll_"+target).find('div dl:eq(0)').attr('style')||'' != ''){
					return;
				}
				$('.px_next_'+target).unbind();
				$('.px_prev_'+target).unbind();
				$("#botton_scroll_"+target).jCarouselLite({
					btnNext: ".px_next_"+target,
					btnPrev: ".px_prev_"+target
				});
			}else{
				setTimeout(function(){
					Index.initLoanListScroll(target);
				},50);
			}
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
		initServiceData:function(){
			var safeTimeFunciton = (function(){
				var firstDate = new Date();
				firstDate.setFullYear(2012);
				firstDate.setMonth(11);
				firstDate.setDate(27);
				firstDate.setHours(0);
				firstDate.setMinutes(0);
				firstDate.setSeconds(0);
				firstDate.setMilliseconds(0);

				var nowDate = new Date();
				var tempDate = new Date(firstDate.getTime());
				tempDate.setFullYear(nowDate.getFullYear());

				var year;
				year = nowDate.getFullYear() - 2012;
				if(tempDate > nowDate){
					tempDate.setFullYear(nowDate.getFullYear()-1);
					year = year - 1;
				}

				var day = parseInt((nowDate.getTime() - tempDate.getTime())/86400000);
				var hours = nowDate.getHours();
				var minutes = nowDate.getMinutes();
				var seconds = nowDate.getSeconds();

				$('#year').html(year);
				$('#day').html(day);
				$('#hours').html(hours);
				$('#minutes').html(minutes);
				$('#seconds').html(seconds);
			});
			safeTimeFunciton();
			setInterval(safeTimeFunciton,1000);
			
			
			$.ajax({
		 		url : '/v2/transaction/total_transaction_money.jso',
		 		type : 'post',
		 		dataType : 'json',
		 		success : function(data) {
		 			var acc_all_total = data.accAllTotal;
		 			var acc_all_retain_total=parseFloat(data.accEarnBackTotal)+parseFloat(data.accEarnTotal);

		 			//var money = fmoneyCN(acc_all_total,2);
		 			var money = Number(acc_all_total).toFixed(2)+'';
		 			var pointIndex2 = money.lastIndexOf('.') ;
		 			var acc_all_total_1 = "0";
		 			var acc_all_total_2 = ".00";
		 			if(pointIndex2 != -1){
		 				acc_all_total_1 = money.substring(0,pointIndex2);
		 				acc_all_total_2 = money.substring(pointIndex2);
		 			}
		 			//$("#all_money_1").html(acc_all_total_1);
		 			// setTimeout(function(){
		 			// 	$("#all_money_2").html(acc_all_total_2);
		 			// },3000);
		 			$('#all_money_1').animateNumber({
		 				number: acc_all_total_1 ,
		 				numberStep: function(now, tween) {
		 			    	var target = $(tween.elem);
		 			    	target.prop('number', now).html(fmoneyCN(now,0));
		 			    }
		 			},3000);

		 			//var income = fmoneyCN(acc_all_retain_total,2);
		 			var income = Number(acc_all_retain_total).toFixed(2)+'';
		 			var pointIndex = income.lastIndexOf('.') ;
		 			var income_money_1 = "0";
		 			var income_money_2 = ".00";
		 			if(pointIndex != -1){
		 				income_money_1 = income.substring(0,pointIndex);
		 				income_money_2 = income.substring(pointIndex);
		 			}

		 			//$("#income_money_1").html(income_money_1);
		 			// setTimeout(function(){
		 			// 	$("#income_money_2").html(income_money_2);
		 			// },3000);
		 			$('#income_money_1').animateNumber({
		 				number: income_money_1 ,
		 				numberStep: function(now, tween) {
		 			    	var target = $(tween.elem);
		 			    	target.prop('number', now).html(fmoneyCN(now,0));
		 			    }
		 			},3000);


		 			/*var acc_retaining_total=data.accRetainingTotal;

		 			var retaining = fmoneyCN(acc_retaining_total,2);
		 			var retaining_1 = "0";
		 			var retaining_2 = ".00";
		 			var point_retaining = retaining.lastIndexOf('.') ;

		 			if(point_retaining!=-1){
		 				retaining_1=retaining.substring(0,point_retaining);
		 				retaining_2 = retaining.substring(point_retaining);
		 			}

		 			$("#all_retaining").html(retaining_1);
		 			$("#all_retaining_1").html(retaining_2);  */

		 			var yesTotal_money = Number(data.accYesTotal).toFixed(2)+'';
		 			var yesTotal_money_1 = '0';
		 			var yesTotal_money_2 = '.00';
		 			var point_yesTotal_money = yesTotal_money.lastIndexOf('.');
		 			if(point_yesTotal_money != -1){
		 				yesTotal_money_1 = yesTotal_money.substring(0,point_yesTotal_money);
		 				yesTotal_money_2 = yesTotal_money.substring(point_yesTotal_money);
		 			}
		 			//$('#all_retaining').html(yesTotal_money_1);
		 			// setTimeout(function(){
		 			// 	$('#all_retaining_1').html(yesTotal_money_2);
		 			// },3000);
		 			$('#yesTotal_money_1').animateNumber({
		 				number: yesTotal_money_1 ,
		 				numberStep: function(now, tween) {
		 			    	var target = $(tween.elem);
		 			    	target.prop('number', now).html(fmoneyCN(now,0));
		 			    }
		 			},3000);
		 		}
			});
		},
		initAnnouncement:function(){
			//初始化公告
			$.ajax({
				url:'/v2/report/announcement.jso',
				type:'post',
				data:{pageSize:5,pageIndex:1,type:1},
				dataType:'json',
				success:function(result){
					if( result.state == 0 ){
						if(result.data){
							$.each(result.data,function(i,v){
								var id = v.id;
								var time = v.ctime.substring(0,10);
								var title = decodeURIComponent(v.title);
								var html = '<li>\
											<a href="/2.0/views/about/xr_announcement.shtml?announcementId='+id+'" target="_blank">【平台公告】'+title+'</a>\
											<span class="f-time">'+time+'</span>\
										</li>';
	
								$('#h_announcement ul').append(html);
							});
	
							Index.myar = setInterval('Index.AutoScroll("#h_announcement")', 8000);
							$("#h_announcement").hover(function() { clearInterval(Index.myar); }, function() { Index.myar = setInterval('Index.AutoScroll("#h_announcement")', 3000) }); //当鼠标放上去的时候，滚动停止，鼠标离开的时候滚动开始
						}
					}
				}
			});
		},
		AutoScroll:function(obj){
			$(obj).find("ul:first").animate({
					marginTop: "-39px"
        		},
        		1000,
        		function() {
        			$(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
        		}
			);
		},
		loadXcbData:function(){
			$.ajax({
				url : '/v2/xincunbao/newly_month_xcb_product_info.jso?limit=7',
				type : 'post',
				dataType : 'json',
				success : function(result) {
					if(result.state == 0){
						var list = result.list;
						var head = new Array();
						var data = new Array();
						var xcbMax = 0;
						var xcbMin = 0;
						var max = 6;
						if(list.length < 7){
							max = list.length-1;
						}
						for(var ix=max;ix>=0;ix--){
							var rate = parseFloat(list[ix].rate);
							var date = new Date(parseInt(list[ix].ctime) * 1000 - 86400000).Format('dd');
							head.push(date);
							data.push(rate);
							if(rate > xcbMax){
								xcbMax = parseInt(rate) + 1;
								if(xcbMin == 0){
									xcbMin = parseInt(rate) - 3;
								}
							}else if(rate < xcbMin){
								xcbMin = xcbMin - 1;
							}
						}
						$this.xcbRateHead7 = head;
						$this.xcbRateData7 = data;
						$this.xcbMax = xcbMax;
						$this.xcbMin = xcbMin;

						$this.showXcb7DayDateView();
					}
				}
			});
		},
		showXcb7DayDateView:function(){
			require.config({
				paths: {
					echarts: '/2.0/js/vendor/echarts/build/dist'
				}
			});
			
			require(
				[
					'echarts',
					'echarts/chart/line',
					'echarts/chart/bar'
				],
				function(ec){
					echarts = ec;
					var chart = echarts.init(document.getElementById('xcbDataView'));
					var head = $this.xcbRateHead7;
					var data = $this.xcbRateData7;
	
					var option = {
						title : {
							text: '过去7日年化收益率（%）',
							textStyle:{
								fontSize: 10,
								color: '#C4C4C4'
							},
							show:false
						},
						tooltip : {
							trigger: 'item',
							formatter: "{b} : {c} %",
							position:[295,0]
						},
						grid:{
							x:34,
							y:5,
							x2:10,
							y2:20
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : head,
								axisLine:{
									show:false
								},
								axisTick:{
									show:false
								},
								splitLine:{
									lineStyle:{
										color:'#EEEEEE'
									}
								},
								axisLabel:{
									textStyle:{
										color:'#ccc'
									}
								}
							}
						],
						yAxis : [
							{
								type : 'value',
								boundaryGap:true,
								axisLabel : {
									formatter: '{value} %'
								},
								axisLine:{
									lineStyle:{
										color: '#ccc',
										width: 1,
										type: 'solid'
									}
								},
								axisLabel:{
									textStyle:{
										color:'#ccc'
									}
								},
								min:$this.xcbMin,
								max:$this.xcbMax
							}
						],
						series:[
							{
								name:'近7天年化收益率',
								type:'line',
								data:data,
								itemStyle:{
									normal:{
										color:'#f60',
										areaStyle:{
											type: 'default',
											color:''
										}
									}
								},
								symbolSize:[1.2,1.2]
								/*,
								 markLine : {
								 data : [
								 {type : 'average', name: '平均值'}
								 ]
								 }*/
							}
						]
					};
					chart.setOption(option);
				}
			);
		},
		initLoanInfo:function(){
			$this.loadLoanListCout = 0;
			/**
			 * 信·优企贷/无忧贷（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_big_section_list.jso',
				data:{pageSize:6,pageIndex:1},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.showLoanList(result,'2');
				}
			});
			
			/**
			 * 品牌专区（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_brand_section_list.jso',
				data:{pageSize:6,pageIndex:1},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.showLoanList(result,'1');
				}
			});
			
			/**
			 * 信·消费贷（推荐项目）
			 */
			$.ajax({
				url:'/v2/project/obtain_small_section_list.jso',
				data:{pageSize:6,pageIndex:1},
				dataType:'json',
				type:'post',
				success:function(result){
					$this.loadLoanListCout += 1;
					$this.showLoanList(result,'3');
				}
			});
			
		},
		initLoanShowOrder:function(){
			if(Index.loadLoanListCout < 3){
				setTimeout(function(){
					Index.initLoanShowOrder();
				},500);
				return;
			}
			if(Index['loanListBeginCount1'] == 0){
				if(Index['loanListBeginCount2'] == 0){
					if(Index['loanListBeginCount3'] != 0){
						$('#tab3').click();
					}
				}else{
					$('#tab2').click();
				}
			}
			$this.showCoutDown('1');
		},
		showLoanList:function(result,target){
			if(result.state != 0){
				return;
			}
			var targetView = $("#loanList"+target);
			
			var html = '';
			
			var dataList = result.rows;
			
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
				var escrowFlag = obj.escrowFlag;
				
				//var project_name = getXRStr(loanType,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag);//项目名称
				var pics = encodeURIComponent(getTitlePics(loanType,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag,escrowFlag));
				var loanTitle = getXRLoanTitle(loanType,sn,sort,seletionType);
				var loanTitlePic = getXRLoanTitlePic(loanType,enterId,autoInvest,seletionType,reward,flag,escrowFlag);
				
				deadlineStr = deadlineStr.replace("个月","<span>月</span>")
                .replace("天","<span>天</span>");  
				//添加1-xx
				var computeLength=1;
				var newDeadlineStr=deadlineStr;
				if(newDeadlineStr.indexOf("月")>-1){
					for(i=0;i<deadlineStr.length;i++){
					if(!/^[0-9]+[0-9]*]*$/.test(deadlineStr[i]))
					{computeLength=i;
					break;}
					}
				if(obj.deadlineStr.substring(0,computeLength)>=2){
					newDeadlineStr="1~"+deadlineStr;	
					}else{
						newDeadlineStr=deadlineStr;
					}
				}
				
				var btn = '';
				
				if(flag == 0){
					btn = '<a href="javascript:void(0)" methodHref="Index.doInvestNoStart('+formatAmount(amount)+','+obj.stime+');" class="sub03 invest_btn">未开始</a>';
				}else if(flag == 1){
					
					var call_str="do_invest_step_one("+id+",'"+deadlineStr+"','"+loanTitle+"',"+seletionType+","+autoInvest+",'"+pics+"','"+rate+"','"+reward+"','"+escrowFlag+"')";
					btn = '<a href="javascript:void(0)" methodHref="'+call_str+'" class="sub02 invest_btn">立即投资</a>';
					$this['loanListBeginCount'+target] += 1;
				}else if(flag == 2){
					btn = '<a href="javascript:void(0)" class="sub01 invest_btn">已投满</a>';
				}
				
				if(reward>0 && seletionType==0 && flag!=2){
					html += '<dl onclick="window.open(\'/2.0/detail.shtml?sid='+id+'\')">\
								<dt>\
									<span class="p_day">'+newDeadlineStr+'</span>\
									<h2>'+rate+'<span>%</span><span class="f-raise">+<b>'+(reward*12/conDeadline).toFixed(2)+'%</b></span></h2><p>预期年化收益率</p>\
								</dt>\
								<dd>\
									<p>剩余可投：<span class="orange">'+fmoney(formatAmount(XR.Tool.toCent(Number(amount)-Number(raisedAmount))))+'元</span></p>\
									<p>'+loanTitle+'</p>\
									<p class="p_pic">'+loanTitlePic+'</p>\
									<span class="t-f">100元起投<p>'+getRefundType(refundType)+'</p></span>\
									'+btn+'\
								</dd>\
							 </dl>';
				}else{
					html += '<dl onclick="window.open(\'/2.0/detail.shtml?sid='+id+'\')">\
								<dt>\
									<span class="p_day">'+newDeadlineStr+'</span>\
									<h2>'+rate+'<span>%</h2><p>预期年化收益率</p>\
								</dt>\
								<dd>\
									<p>剩余可投：<span class="orange">'+fmoney(formatAmount(XR.Tool.toCent(Number(amount)-Number(raisedAmount))))+'元</span></p>\
									<p>'+loanTitle+'</p>\
									<p class="p_pic">'+loanTitlePic+'</p>\
									<span class="t-f">100元起投<p>'+getRefundType(refundType)+'</p></span>\
									'+btn+'\
								</dd>\
							 </dl>';
				}
				
				if(i == 0){
					$this['countDownSecond'+target] = obj.countDownSecond;//倒计时时间戳
					$this['times'+target] = obj.stime;
				}
			});
			var left = targetView.css('left');
			targetView.empty();
			targetView.append(html);
			
			//if(target == '1'){
			if($("#botton_scroll_"+target).is(':visible')){
				$("#botton_scroll_"+target).removeAttr('style');
				targetView.removeAttr('style');
				$this.initLoanListScroll(target);
				if(left != 'auto'){
					targetView.css('left',left);
				}
			}
			//}
			
			$('#loanList'+target).find('.invest_btn').unbind('click').click(function(event){
				 event.stopPropagation();
				 var methodHref = $(this).attr('methodHref');
				 if(methodHref){
					 eval(''+methodHref);
				 }
			});
		},
		showInvestDialog:function(){
			
		},
		showCoutDown:function(target){
			if($this['countDownSecond'+target] > 0){//启动时间大于0  启动倒计时
				if($this['timer']){
					window.clearInterval($this['timer']);
				}
				$this['timer'] = setInterval(function(){
					Index.countDown($this['times'+target]);
				},1000);
				$('#countDownView').show();
			}else{ //小于等于0
				if($this['timer']){
					window.clearInterval($this['timer']);
				}
				$('#countDownView').hide();
			}
		},
		countDown:function(times){
			var server_times =  $("#server_time").val();
			if(times - server_times >= 0){
				var timeData = getTimes( (times - server_times) * 1000 );
				var timeData2 = getTimes2(times);
				$("#countDown_hours").html(timeData[0]);
				$("#countDown_minutes").html(timeData[1]);
				$("#countDown_seconds").html(timeData[2]);
				$("#ksqt").html(timeData2[0]+':'+timeData2[1]);
			} else if(times - server_times >=-2) {
				$("#countDown_hours").html('00');
				$("#countDown_minutes").html('00');
				$("#countDown_seconds").html('00');
				$("#ksqt").html('00:00');
				
				$('#countDownView').hide();
				$this.initLoanInfo();
			}
		},
		initServerTime:function(){
			$this.getServerTime();
			setInterval("Index.getServerTime()",10000);//每10秒去服务器拿时间 校验本地时间
			setInterval("Index.increateSeconds()",1000);  // 每1秒加1秒时间 用于项目倒计时
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
		initMediaReport:function(){
			$.ajax({
				url: '/v2/report/media_report.jso',
				type: 'GET',
				data: {pageSize:6, pageIndex: 1,type:0},
				dataType: 'json',
				success: function (result) {
					if(result.state == 0){
						$('#mediaReportPreviewList').empty();
						var mediaHome = '/2.0/views/about/media_report.shtml';
						$.each(result.data,function (i,v) {
							var author = '['+v.author+']';
							var title = v.title
							if(title.length > 16){
								title = title.substring(0,16) + "...";
							}
							//var date = v.ctime.substring(0,10);
							var date = new Date(v.ctimeLong).Format('yyyy-MM-dd');
							
							var html = '<dl>\
											<dt><i>●</i><a href="'+mediaHome+'?di='+v.id+'" target="_blank">'+author+title+'</a></dt>\
											<dd>'+date+'</dd>\
										</dl>';
							
							$('#mediaReportPreviewList').append(html);
						});
					}
				}
			});
		},
		initDoubleScoreTitleShow:function(){
			$.ajax({
				 url:'/v2/active/get_conf_double_score_or_not.jso',
				 type:'post',
				 dataType:'json',
				 success:function(result){
				 	if(result.state == 1 && result.data == true){
				 		$('.double').show();
				 	}
				 }
			});
		},
		initAdView:function(){
			var ad_today = getCookie("ad_today")||'no';
			if(ad_today == 'yes'){
				return;
			}
			var firstDate = new Date();
			firstDate.setHours(0);
			firstDate.setMinutes(0);
			firstDate.setSeconds(0);
			firstDate.setMilliseconds(0);
			
			firstDate.setTime(firstDate.getTime()+86400000);
			document.cookie = "ad_today=yes;expires=" + firstDate.toGMTString() + ";path=/";
			
			//$('.indexd-mask').show();
			//$('.index-diabox').show();
			
			$('#ad_close').unbind().click(function(){
				$('.indexd-mask').hide();
				$('.index-diabox').hide();
			});
			
			$this.adTimer = setTimeout(function(){
				$('.indexd-mask').hide();
				$('.index-diabox').hide();
			},6000);
			
			$('.index-diabox').mouseover(function(){
				if($this.adTimer){
					clearTimeout($this.adTimer);
				}
			});
		}
	};
	
	Index = $this;
	
	$(function(){
		$this.init();
	});
	
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
		var CN_TEN_THOUSAND = "<span class='f_size'>万</span>";
		var CN_HUNDRED_MILLION = "<span class='f_size'>亿</span>";
		var CN_UNIT = "<span class='f_size'>元</span>";
		if(l.length < 5){
			return s + CN_UNIT;
		}
		for(i = 0; i < l.length; i ++ )
		{
			if(i == (l.length - 9)){
				t += l[i] + CN_HUNDRED_MILLION + "";
			}else if( i == (l.length - 5)){
				t += l[i] + CN_TEN_THOUSAND + "";
			}else {
				t += l[i];
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
		var esw_pic = '';
		
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
		
		if(escrowFlag==1){
			esw_pic = '<i class="escrow" title="仅限存管账户投资">存管</i>&nbsp;';
		}
		
		var title = '';
		
		title += ya_pic+bei_pic+db_pic+kz_pic+sx_pic+jiang_pic+esw_pic;

		return title;
	}
	
	function getXRStrInnerTitle(type,sn,sort,enterId,conDeadline,autoInvest,seletionType,id,randNum,reward,flag){
		var db_pic = '';//担保图标
		var kz_pic = '';//可转/转 图标
		var sx_pic = '';//手限图标
		var ya_pic='';
		var bei_pic='';
		var jiang_pic='';//奖励图标
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

		title+=ya_pic+bei_pic+db_pic+kz_pic+sx_pic+jiang_pic+partnerPic;

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