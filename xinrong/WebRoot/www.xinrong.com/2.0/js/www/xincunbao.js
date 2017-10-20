var Xincunbao;
var echarts;
(function(){
	var $this = {
		isLoading:0,
		pageSize:10,
		init:function(){
			$this.initXcbInfo();
			$this.initAccoutInfo();
			$this.bindXcbInAndXcbOutEvent();
			$this.initXcbTradeInfo();
			$this.initXcbInvestRecord();
			$this.initXcbIncome();
		},
		initXcbInfo:function(){
			$.ajax({
				url:'/v2/xincunbao/get_xcb_info.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (data) {
					if(data.state==0){
						var tenThousandIncome = data.tenThousandIncome == "" ? "0.00" : data.tenThousandIncome;
						var rate = data.rate == "" ? "0.00" : data.rate;
						if (rate=="0.00") {
							$this.xcbLoadRateFun = (function(){
								var spanText=$("#perCalculating .dots").html()||'';
								var len = spanText.length;
								if(len<3){
									spanText += '.';
								}else{
									spanText = '.';
								}
								$("#perCalculating .dots").html(spanText);
								setTimeout(function(){
									Xincunbao.xcbLoadRateFun();
								},1000);
							});
							$this.xcbLoadRateFun();
							
						}else{
							$("#perCalculating").hide();
							$('#lastDayPer').html(rate+"%");
						}
                        $('#perTenThousandEarnings').html(tenThousandIncome);
						var money = data.money;
						var todayIncome = data.todayIncome == '0'?'0.00':data.todayIncome;
						var sumIncome = data.sumIncome;
						var isRedeem = data.isRedeem;
						var isReply = data.isReply;
						var availableMoneyLeft = data.availableMoneyLeft;
						var unconfirmRechargeMoney = data.unconfirmRechargeMoney;
						var unconfirmHotMoney = data.unconfirmHotMoney;
						var unconfirmMoney = parseFloat(""+unconfirmRechargeMoney) + parseFloat(""+unconfirmHotMoney);
						unconfirmMoney = AA.Helper.commafy(AA.Helper.toCent(unconfirmMoney));//取两位小数
						var confirmRechargeMoney = data.confirmRechargeMoney;
						var confirmHotMoney = data.confirmHotMoney;
						var confirmMoney = parseFloat(""+confirmRechargeMoney) + parseFloat(""+confirmHotMoney);
						var cm=confirmMoney;
						confirmMoney = AA.Helper.commafy(AA.Helper.toCent(confirmMoney));//取两位小数

						var conversionProgress;
						if(confirmMoney!=0){
							conversionProgress = parseFloat(""+confirmHotMoney)/parseFloat(""+cm);
						}else{
							conversionProgress = 0;
						}
						
						var confirmProgress;
						if(confirmMoney!=0){
							confirmProgress = parseFloat(""+cm)/parseFloat(""+money);
						}else{
							confirmProgress = 0;
						}

						if(availableMoneyLeft > 1000000){
							availableMoneyLeft = ">100万";
						}
						
						$("#xcbTotal").html(money);
						$('#outBalance').html(money);
						$("#accuEarnings").html(sumIncome);
						$("#lastDayEarnings").html(todayIncome);
						
						$("#depositTotal").html(money);
						$("#depositNotConfirm").html(unconfirmMoney);
						$("#depositConfirmed").html(confirmMoney);
						
						$("#notProgressed").html(AA.Helper.commafy(AA.Helper.toCent(parseFloat(""+confirmRechargeMoney))));
						$("#progressed").html(AA.Helper.commafy(AA.Helper.toCent(parseFloat(""+confirmHotMoney))));
						
						$("#progressedPer").text(Math.floor(conversionProgress*100)+"%");
						new CircleInit(confirmProgress);	
						new WaveInit(conversionProgress);
					}
				}
			});
		},
		initAccoutInfo:function(){
			var $subMenuItem = $(".queryMenu .querySelect .record .recordSub>li");
			var $recordBtn = $(".queryMenu .querySelect .record");
			var $subMenu = $(".queryMenu .querySelect .record .recordSub");
			var $subBtn = $(".queryMenu .querySelect .record .subBtn");
			var slideSpeed = 100;
			
			$subBtn.unbind().on("click",function(){
				if($subMenu.css("display")!="none"){
					$subMenu.slideUp(slideSpeed);
				}else{
					$subMenu.slideDown(slideSpeed);
				}
			});
			
			$subMenuItem.unbind().click(function(){
				$recordBtn.find(".title").text($(this).text());
				$(this).addClass("current").siblings().removeClass("current");
				$subMenu.slideUp(slideSpeed);
				
				var type = $(this).attr('type_value');
				$recordBtn.attr('type_value',type);
				$this.initXcbTradeInfo();
			});
			
			
			$.ajax({
				url:'/v2/xincunbao/get_index_info.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
					if(result.state==0){
						var money = result.money;
						 $('#inBalance').html(money);
						 $('#inInputMoney').val(money);
					}
				}
			});
		},
		bindXcbInAndXcbOutEvent:function(){
			$("#inBtn").unbind("click").bind("click",function(){
				var _money = $("#inInputMoney").val();
		        var _pass = $("#inInputPw").val();
		        var _money_error_view = $("#inMoneyError");
		        var _pass_error_view = $("#inPwError");
		        
		        var checkStatus = true;
		        if(!$this.checkMoneyInput(_money,_money_error_view)){
		        	checkStatus = false;
		        }
		        if(!$this.checkPassInput(_pass,_pass_error_view)){
		        	checkStatus = false;
		        }
		        if(!checkStatus){
		        	return;
		        }
		    	
		        if(!$("#inAgreementCheck").is(':checked')){
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
		        
		        _money_error_view.empty();
		        _pass_error_view.empty();
		        $("#inInputPw").val('');
		        if($this.isLoading == 1){
					return;
				}
		        $this.isLoading = 1;
		        $.ajax({
					url:'/v2/xincunbao/buy_apply.jso',
				    type:'POST' ,
				    dataType:'json',
				    data:{money:_money,pass:AA.Helper.encrypPw(_pass)},
				    success:function (result) {
				    	$this.isLoading = 0;
						if(result.state==0){
							$("#inInputMoney").val('');
					        $("#inInputPw").val('');
					        //信存宝存入成功后弹窗
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
					        $this.initXcbInfo();
							$this.initAccoutInfo();
						}else if(result.state == 1009){
							AA.RapidLogin.popup();
							return;
						} else {
		      			  	$this.showTip($("#inMoneyError"),result.msg);
		          	  	}
					}
				});
			});
			
			$("#outBtn").unbind("click").bind("click",function(){
				var _money = $("#outInputMoney").val();
		        var _pass = $("#outInputPw").val();
		        var _money_error_view = $("#outMoneyError");
		        var _pass_error_view = $("#outPwError");
		        
		        var checkStatus = true;
		        if(!$this.checkMoneyInput(_money,_money_error_view)){
		        	checkStatus = false;
		        }
		        if(!$this.checkPassInput(_pass,_pass_error_view)){
		        	checkStatus = false;
		        }
		        if(!checkStatus){
		        	return;
		        }
		        
		        _money_error_view.empty();
		        _pass_error_view.empty();
		        $("#outInputPw").val('');
		        if($this.isLoading == 1){
					return;
				}
		        $this.isLoading = 1;
		        
		        $.ajax({
					url:'/v2/xincunbao/redeem_apply.jso',
				    type:'POST' ,
				    dataType:'json',
				    data:{money:_money,pass:AA.Helper.encrypPw(_pass)},
				    success:function (result) {
				    	$this.isLoading = 0;
						if(result.state==0){
							$("#outInputMoney").val('');
					        $("#outInputPw").val('');
					        $("#outMoneyError").html('<i class="AllIcon icon02"></i>您在信存宝成功转出: '+_money+'元');
					        $this.initXcbInfo();
							$this.initAccoutInfo();
						}else if(result.state == 1009){
							AA.RapidLogin.popup();
							return;
						} else {
		      			  	$this.showTip($("#inMoneyError"),result.msg);
		          	  	}
					}
				});
			});
		},
		checkMoneyInput:function(money,tip,p){
			if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0(\.[0-9]{1,2})?)$/.test(money)){
				$this.showTip(tip,"金额格式不对");
				return false;
			}else{
				$this.showTip(tip,"");
				return true;
			}
		},
		checkPassInput:function(pass,tip,p){
			if(pass.length==0){
				$this.showTip(tip,'交易密码不能为空');
				return false;
			}else{
				$this.showTip(tip,"");
				return true;
			}
		},
		showTip:function(tip,content){
			if(content == ""){
				$(tip).html(content);
			}else{
				$(tip).html('<i class="AllIcon icon01"></i>'+content);
			}
		},
		initXcbTradeInfo:function(){
			$this.getXcbTradeInfo(1);
		},
		getXcbTradeInfo:function(pageIndex){
			var $recordBtn = $(".queryMenu .querySelect .record");
			var type = $recordBtn.attr('type_value');
			$.ajax({
				url:'/v2/xincunbao/find_xcb_income_and_expense_ext.jso',
			    type:'POST' ,
			    dataType:'json',
			    data:{limit:pageIndex*$this.pageSize,type:type},
			    success:function (result) {
					if(result.state == 0){
						var html = '';
						var rows = result.rows;
						if(rows.length == 0){
							$('#no_data_1').show();
						}else{
							$('#no_data_1').hide();
						}
						for(var i=(pageIndex-1)*$this.pageSize;i<rows.length;i++){
							var v = rows[i];
							var XCB_TYPE=['存入','转出','收益'];
							var TYPE_STATUS=['+','-','+'];
							
							var time= v.c_time;
							var status = v.status;
							var money = v.money;
							var type = v.type;
							var xcbMoney=v.xcbMoney;
							var tradeMoney=TYPE_STATUS[type]+money;
							var rowClass = '';
							if(i % 2 == 0){
								rowClass = 'background-color: rgb(249, 252, 250); display: table-row;';
							}else{
								rowClass = 'background-color: rgb(255, 255, 255); display: table-row;';
							}
							html += '<tr style="'+rowClass+'">\
										<td>'+time+'</td>\
										<td>'+XCB_TYPE[type]+'</td>\
										<td>'+tradeMoney+'</td>\
										<td>'+xcbMoney+'</td>\
									 </tr>';
						}
						$('#recordTable tbody').html(html);
						
						if(result.total>$this.pageSize){
							$('#recordPageSwitcher').show();
							$('#recordPageSwitcher').pagination({
			            		 'container':'#recordPageSwitcher',
			                     'pageSize':$this.pageSize ,
			                     'total':result.total ,
			                     'pageIndex':pageIndex ,
			                     'callback':'Xincunbao.getXcbTradeInfo',
			                     'disabledCls':'c-font'
							});
						}else{
							$('#recordPageSwitcher').hide();
						}
					}else if(result.state == 1009){
						AA.RapidLogin.popup();
					}
				}
			});
		},
		initXcbInvestRecord:function(){
			$this.getXcbInvestRecord(1);
		},
		getXcbInvestRecord:function(pageIndex){
			$.ajax({
				url:'/v2/xincunbao/get_user_invest_record.jso',
			    type:'POST' ,
			    dataType:'json',
			    data:{curpage:pageIndex,pagesize:$this.pageSize},
			    success:function (result) {
					if(result.state == 1){
						var rows = result.data.rows;
						if(rows.length == 0){
							$('#no_data_2').show();
						}else{
							$('#no_data_2').hide();
						}
						var html = '';
						$.each(rows,function(i,v){
							
							var href='';
							var loan_type=XR.Loan.TypeShow(v.loanType,v.conSn);
							
							if(v.loanType == 4){
								href='<a href="/2.0/detail.shtml?sid='+v.sid+'" target="_blank">'+loan_type+'</a>';
							}else{
								if(v.rand!=null&&v.rand!=undefined){
									href='<a href="/2.0/detail.shtml?sid='+v.sid+'" target="_blank">'+loan_type+'</a>';
								}else{
									href='<a href="/2.0/detail.shtml?sid='+v.sid+'" target="_blank">'+loan_type+'</a>';
								}
							}
							
							var date=XR.Tool.FormateDate(v.itime,'Y-m-d');

							var time=XR.Tool.FormateDate(v.itime,'h:m:s');
							
							var rowClass = '';
							if(i % 2 == 0){
								rowClass = 'background-color: rgb(249, 252, 250); display: table-row;';
							}else{
								rowClass = 'background-color: rgb(255, 255, 255); display: table-row;';
							}
							
							html += '<tr style="'+rowClass+'">\
										<td>'+href+'</td>\
										<td>'+v.deadLine+' 个月</td>\
										<td>'+v.ptime+'</td>\
										<td>'+v.profitingMoney+' 元</td>\
										<td>'+v.profitingInterest+' 元</td>\
									 </tr>';
							
						});
						$('#movementTable tbody').html(html);
						
						if(result.data.total>$this.pageSize){
							$('#movementPageSwitcher').show();
							$('#movementPageSwitcher').pagination({
			            		 'container':'#movementPageSwitcher',
			                     'pageSize':$this.pageSize ,
			                     'total':result.data.total ,
			                     'pageIndex':pageIndex ,
			                     'callback':'Xincunbao.getXcbInvestRecord',
			                     'disabledCls':'c-font'
							});
						}else{
							$('#movementPageSwitcher').hide();
						}
					}else if(result.state == 1009){
						AA.RapidLogin.popup();
					}
				}
			});
		},
		initXcbIncome:function(){
			$.ajax({
				url : '/v2/xincunbao/get_daily_income.jso',   
				type : 'post',
				dataType : 'json',
				data:{limit:30,'sDate':'','eDate':''},
				success : function(result) {
					if(result.state == 0){
						var list = result.dataList;
						var head = new Array();
		 				var data = new Array();
		 				var max = 6;
		 				var incomeSumDay7 = 0;
		 				if(list.length < 7){
		 					max = list.length-1;
		 				}
						for(var i = max;i>=0;i--){
							var obj = list[i];
							var time = obj.time;
							var income = obj.income;
							
							var time2 = new Date(time*1000).Format('MM-dd');
							head.push(time2);
							data.push(income);
							incomeSumDay7 += parseFloat(income);
						}
						
						$this.XcbIncomeHead7 = head;
						$this.XcbIncomeDate7 = data;
						
						var head2 = new Array();
		 				var data2 = new Array();
		 				var max2 = 29;
		 				var incomeSumDay30 = 0;
		 				if(list.length < 30){
		 					max2 = list.length-1;
		 				}
		 				for(var i = max2;i>=0;i--){
							var obj = list[i];
							var time = obj.time;
							var income = obj.income;
							
							var time2 = new Date(time*1000).Format('MM-dd');
							head2.push(time2);
							data2.push(income);
							incomeSumDay30 += parseFloat(income);
						}
						$this.XcbIncomeHead30 = head2;
						$this.XcbIncomeDate30 = data2;
						
						$('#lastWeekEarnigs').html(AA.Helper.toFixed(incomeSumDay7));
						$('#lastMonthEarnigs').html(AA.Helper.toFixed(incomeSumDay30));
						if(list.length > 0){
							$this.initEcharts();
						}
					}else if(result.state == 1009){
						AA.RapidLogin.popup();
					}
				}
			});
			
			$('#detailMonth').unbind().change(function(){
				var target = $(this).val();
				$this.initXcbIncomeView(target);
			});
		},
		initEcharts:function(){
			require.config({
				paths: {
					echarts: '/2.0/js/vendor/echarts/build/dist'
				}
			});
			
			require(
				[
					'echarts',
					'echarts/chart/line',
				],
				function(ec){
					echarts = ec;
					$this.initXcbIncomeView(7);
				}
			);
		},
		initXcbIncomeView:function(target){
			var chart = echarts.init(document.getElementById('detailChart'));
			var head;
			var data;
			if(target == 7){
				head = $this.XcbIncomeHead7;
				data = $this.XcbIncomeDate7;
			}else if(target == 30){
				head = $this.XcbIncomeHead30;
				data = $this.XcbIncomeDate30;
			}else if(target == 210){
				head = $this.XcbIncomeHead210;
				data = $this.XcbIncomeDate210;
			}
		
			var option = {
				title : {
					text: '过去7日年化收益率（%）',
					textStyle:{
						fontSize: 10,
						color: '#C4C4C4'
					},
					show:false
				},
				tooltip:{
					show: true,
					trigger: "axis",
					padding: 10,
					formatter: "当日收益(元)：{c0}",
					axisPointer:{
						type:"none",
						lineStyle:{
							opacity: 0
						}
					}
				},
				xAxis:{
					type: "category",
					name: "日期",
					nameGap: 10,
					boundaryGap: false,
					splitLine:{
						show:true
					},
					nameTextStyle:{
						color:"#a19d9c",
						fontSize: 13
					},
					axisLine:{
						lineStyle:{
							color:"#a19d9c"
						}
					},
					axisLabel:{
						show:true,
						margin: 12,
						textStyle:{
							color:"#a19d9c",
							fontSize:13
						}
					},
					axisTick:{
						show:false
					},
					data : head
				},
				yAxis:{
					type: "value",
					name: "收益(元)",
					scale: "true",
					//max: 10,		//y轴最大值
					//min: 8,			//y轴最小值
					interval: 1,	//y轴数值间隔
					splitLine:{
						show:true
					},
					nameTextStyle:{
						color:"#a19d9c",
						fontSize: 13
					},
					axisLine:{
						lineStyle:{
							color:"#58b4e3",
							width:2
						}
					},
					axisLabel:{
						show:true,
						margin: 12,
						textStyle:{
							color:"#a19d9c",
							fontSize:13
						}
					},
					axisTick:{
						show:false
					},
					splitArea:{
						show:true,
						areaStyle:{
							color:["#f9fcfa","#fff"]
						}
					}
				},
				series:[
					{
						name:'收益(元)',
						type:'line',
						symbol: "circle",
						data:data,
						itemStyle:{
							normal:{
								color:"#56c9f4",
							},
							emphasis:{
								color:"#ff6e1e",
								borderColor:"#fed076",
								borderWidth:4,
								borderType:"solid"
							}
						},
						symbolSize:[4,4]
					}
				]
			};
			chart.setOption(option);
		},
		noLoginInit:function(){
			new CircleInit(0);	
			new WaveInit(0);
			//$this.initEcharts();
			$(".querySelect>li").eq(3).trigger("click");		//未登录状态下默认显示常见问题
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
						$this.noLoginInit();
						AA.RapidLogin.popup();
						return;
					}
				}
			});
		}
	};
	
	$(function(){
		$this.isLogin();
	});
	
	Xincunbao = $this;

})();

//存入转出
(function(){
	//存入转出切换
	var $inBtn = $(".transform .transBtn .in"),
		$outBtn = $(".transform .transBtn .out"),
		$inBox = $(".transform .transBox .inBox"),
		$outBox = $(".transform .transBox .outBox");

	$inBtn.on("click",function(){
		if(!$inBtn.hasClass("current")){
			$inBtn.addClass("current");
			$outBtn.removeClass("current");
			$inBox.show();
			$outBox.hide();
		}
	});
	$outBtn.on("click",function(){
		if(!$outBtn.hasClass("current")){
			$outBtn.addClass("current");
			$inBtn.removeClass("current");
			$outBox.show();
			$inBox.hide();
		}
	});
})();
//转化解释内容显示切换
(function(){
	var $moreBtn = $(".earningsDetail .transProgress .more"),
		$moreDetail = $(".earningsDetail .transProgress .more .moreDetail");

	$moreBtn.on("click",function(){
		if($moreDetail.css("display")!="none"){
			$moreDetail.css("display","none");
		}else{
			$moreDetail.css("display","block");
		}
	});

})();
//底部查询菜单
(function(){
	var $recordBtn = $(".queryMenu .querySelect .record"),
		$movementBtn = $(".queryMenu .querySelect .movement"),
		$introduceBtn = $(".queryMenu .querySelect .introduce"),
		$questionsBtn = $(".queryMenu .querySelect .questions"),
		$subMenu = $(".queryMenu .querySelect .record .recordSub"),
		$record = $(".queryMenu>.record"),
		$movement = $(".queryMenu>.movement"),
		$introduce = $(".queryMenu>.introduce"),
		$questions = $(".queryMenu>.questions"),
		allBtns = [$recordBtn,$movementBtn,$introduceBtn,$questionsBtn],
		allMenus = [$record,$movement,$introduce,$questions],
		//子菜单滑动速度
		slideSpeed = 100;

	var bindClick = function($btn,$show){
		$btn.on("click",function(){
			if(!$btn.hasClass("current")){
				$btn.addClass("current").siblings().removeClass("current");
				for(var i=0,length=allMenus.length;i<length;i++){
					allMenus[i].hide();
				}
				$show.show();
				$subMenu.slideUp(slideSpeed);
			}
		})
	}
	for(var i=0,length=allBtns.length;i<length;i++){
		bindClick(allBtns[i],allMenus[i]);
	}
	//存转记录子菜单
	var $subBtn = $(".queryMenu .querySelect .record .subBtn"),
		$subMenu = $(".queryMenu .querySelect .record .recordSub"),
		$subMenuItem = $(".queryMenu .querySelect .record .recordSub>li"),
		$recordTable = $("#recordTable"),
		$movementTable = $("#movementTable"),
		$tableRows = $("#recordTable tbody tr");
	//存转记录页数切换
	var	rowsPerPage = 10,
		$recordPageSwitcher = $("#recordPageSwitcher"),
		$recordPages = $("#recordPageSwitcher .pages"),
		recordPageInit = "";
})();
//资金确认情况动画
function CircleInit(maxPer){
	var canvasGrey = $("#totalCanvasGrey")[0],
		contextGrey = canvasGrey.getContext("2d");
	contextGrey.strokeStyle = "#ddd";
	contextGrey.lineWidth = 15;
	contextGrey.beginPath();
	contextGrey.arc(canvasGrey.width/2,canvasGrey.height/2,canvasGrey.width/2-7.5,0,2*Math.PI);
	contextGrey.stroke();
	contextGrey.closePath();
	//
	var canvas = $("#totalCanvas")[0],
		r = canvas.width/2-7.5;
		context = canvas.getContext("2d"),
		step = 0,
		maxPer = maxPer>0&&maxPer<=1?maxPer:0;
	context.strokeStyle = "#96d2eb";
	context.lineWidth = 15;
	context.beginPath();
	var timer = setInterval(function(){
		if(step<=maxPer){
			context.clearRect(0,0,canvas.width,canvas.height);
			context.beginPath();
			context.strokeStyle = "#96d2eb";
			context.arc(canvas.width/2,canvas.height/2,r,0,step*2*Math.PI);
			context.stroke();
			step = step + 0.01;
		}else{
			context.beginPath();
			context.arc(canvas.width/2,canvas.height/2,r,0,step*2*Math.PI);
			context.stroke();
			clearInterval(timer);
			return;
		}
	},35);
};
var initWaving;
//转化进度动画
function WaveInit(curPer){
	this.curPer = curPer>0&&curPer<=1?curPer:0;

	var canvas = $("#waveCanvas")[0],
		width = canvas.width,
		height = canvas.height,
		curHeight = height * (1-this.curPer),
		context = canvas.getContext("2d"),
		waveingSpeed = 60,
		step = 0,
		angle = 0,
		down = false,
		up = true,
		angle = 0,
		deepWave = "#96d2eb",
		lightWave = "#beecff";

	
	var waving = function(waveColor,beginX,endX,curveX,curveY){
					context.fillStyle = waveColor;
					context.beginPath();
					context.moveTo(beginX,curHeight);
					context.bezierCurveTo(curveX,curveY,curveX,curveY,endX,curHeight);
					context.lineTo(width,height);
					context.lineTo(0,height);
					context.fill();
					context.closePath();
				};
	//this.initWaving = setInterval(function(){
	if(initWaving){
		clearInterval(initWaving);
	}
	initWaving = setInterval(function(){
						context.clearRect(0,0,width,height);
						waving(lightWave,width,0,width-30,curHeight-Math.sin(angle*Math.PI/180)*16);
						waving(deepWave,0,width,30,curHeight-Math.cos(angle*Math.PI/180)*16);
						if(up){
							angle=angle+3
						}else if(down){
							angle = angle-3;
						}
						if(angle>=120){
							up = false;
							down = true;
							angle=120;
						}else if(angle<=0){
							up = true;
							down = false;
							angle = 0;
						}
					},waveingSpeed);
	
}