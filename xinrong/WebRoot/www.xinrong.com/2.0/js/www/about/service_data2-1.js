var ServiceData;
var echarts;
(function(){
	var $this = {
		yearArray:['2013','2014','2015','2016','2017'],
		overDueMoney:null,
		init:function(){
			$this.initServiceData();
			$this.initEcharts();
			$this.bindEvent();
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
				seconds = nowDate.getSeconds()<10?'0'+nowDate.getSeconds():nowDate.getSeconds();
				
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
		 		success : function(result) {  
		 			var acc_all_total = result.accAllTotal;
		 			$this.acc_all_total = result.accAllTotal;
		 			var acc_all_retain_total = parseFloat(result.accEarnBackTotal)+parseFloat(result.accEarnTotal);
		 			// var money = fmoney(acc_all_total,2);
					//var money = fmoneyCN(acc_all_total,0);
		 			//$('#all_money').html(money);
		 			
					//var income = fmoneyCN(acc_all_retain_total,0);
		 			//$('#income_money').html(income);
		 			var income = fmoney(acc_all_retain_total,2);
		 			
		 			var acc_retaining_total = result.accRetainingTotal;
					//var retaining = fmoneyCN(acc_retaining_total,0);
		 			//$("#all_retaining").html(retaining);
		 			
		 			$this.load1_1 = (function(){
		 				$('#all_money').animateNumber({
		 					number: acc_all_total ,
		 					numberStep: function(now, tween) {
		 						var target = $(tween.elem);
		 						target.prop('number', now).html(fmoneyCN(now,0));
		 					}
		 				},3000);
		 				
		 				$('#income_money').animateNumber({
		 					number: acc_all_retain_total ,
		 					numberStep: function(now, tween) {
		 						var target = $(tween.elem);
		 						target.prop('number', now).html(fmoneyCN(now,0));
		 					}
		 				},3000);
		 				
		 				$('#all_retaining').animateNumber({
		 					number: acc_retaining_total ,
		 					numberStep: function(now, tween) {
		 						var target = $(tween.elem);
		 						target.prop('number', now).html(fmoneyCN(now,0));
		 					}
		 				},3000);
		 			});
		 			$this.load1_1();
		 			
		 			var badAndOverDueCountFun = (function(){
		 				if($this.overDueMoney == null){
		 					setTimeout(badAndOverDueCountFun,100);
			 				return;
			 			}
		 				var allBadMoney = 5413231+parseFloat($this.badMoney);
			 			var allOverDueMoney = 2209973+parseFloat($this.overDueMoney);
			 			
			 			var allBadMoneyRate = Common.Tool.toFixed((allBadMoney*100/acc_retaining_total),2);
			 			var allOverDueMoneyRate = Common.Tool.toFixed((allOverDueMoney*100/acc_retaining_total),2);
			 			
			 			var overdueCount = 380 + $this.overdueCount + $this.badCount;
			 			var overdue_product_rate = Common.Tool.toFixed((overdueCount*100/$this.allLoanCount),2);
			 			
			 			$('#total_bad_money').html(commafy(toDecimal(allBadMoney)));
			 			$('#total_overdue_money').html(commafy(toDecimal(allOverDueMoney+allBadMoney)));
			 			$('#overdue_product').html(overdueCount);
			 			
			 			$('#overdue_rate_box').attr({'data-percent':toDecimal(allOverDueMoneyRate+allBadMoneyRate),'data-text':toDecimal(allOverDueMoneyRate+allBadMoneyRate)+'%'}).circliful();
			 			$('#bad_money_rate_box').attr({'data-percent':toDecimal(allBadMoneyRate),'data-text':toDecimal(allBadMoneyRate)+'%'}).circliful();
			 			$('#overdue_amount_box').attr({'data-percent':toDecimal(overdue_product_rate),'data-text':toDecimal(overdue_product_rate)+'%'}).circliful();
		 			});
		 			
		 			badAndOverDueCountFun();
		 			
		 		}
			});
			
			$.ajax({
		 		url : '/v2/member/get_risk_reserve.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			$this.load1_3 = (function(){
		 				$('#risk_money').animateNumber({
		 					number: result.riskReserve ,
		 					numberStep: function(now, tween) {
		 						var target = $(tween.elem);
		 						target.prop('number', now).html(fmoneyCN(now,0));
		 					}
		 				},3000);
		 			});
		 			
		 			$this.load1_3();
		 		}
		 	});
		 	
			$.ajax({
		 		url : '/v2/transaction/show_static_data.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			if(result.state == 0){
		 				var list = result.productTypeList;
		 				var head = new Array();
		 				var data = new Array();
		 				$.each(list,function(i,v){
		 					var name = v.name;
		 					var value = parseInt(v.countAndMoney);
		 					if(name == 'danbao'){
		 						head.push('机构担保项目');
	 							data.push({value:value, name:'机构担保项目'});
		 					}else if(name == 'pinpai'){
		 						head.push('品牌合作项目');
		 						data.push({value:value, name:'品牌合作项目'});
		 					}else if(name == 'zhidi'){
		 						head.push('质押、抵押项目');
		 						data.push({value:value, name:'质押、抵押项目'});
		 					}else if(name == 'xinyong'){
		 						head.push('信用消费项目');
		 						data.push({value:value, name:'信用消费项目'});
		 					}
		 				});
		 				$this.productTypeHead = head;
		 				$this.productTypeData = data;
		 				
		 				var list2 = result.projectCountListByDeadline;
		 				var head2 = new Array();
		 				var data2 = new Array();
		 				$.each(list2,function(i,v){
		 					var name = v.name;
		 					var value = parseInt(v.countAndMoney);
		 					if(name == '1To3'){
		 						head2.push('1-3个月');
	 							data2.push({value:value, name:'1-3个月'});
		 					}else if(name == '4To6'){
		 						head2.push('4-6个月');
		 						data2.push({value:value, name:'4-6个月'});
		 					}else if(name == '7To9'){
		 						head2.push('7-9个月');
		 						data2.push({value:value, name:'7-9个月'});
		 					}else if(name == '10To12'){
		 						head2.push('10-12个月');
		 						data2.push({value:value, name:'10-12个月'});
		 					}else if(name == '13To15'){
		 						head2.push('13-15个月');
		 						data2.push({value:value, name:'13-15个月'});
		 					}else if(name == '16To18'){
		 						head2.push('16-18个月');
		 						data2.push({value:value, name:'16-18个月'});
		 					}else if(name == 'sup18'){
		 						head2.push('18个月以上');
		 						data2.push({value:value, name:'18个月以上'});
		 					}
		 				});
		 				$this.productDateHead = head2;
		 				$this.productDateData = data2;
		 				
		 				var list3 = result.projectMoneyListByDeadLine;
		 				var head3 = new Array();
		 				var data3 = new Array();
		 				$.each(list3,function(i,v){
		 					var name = v.name;
		 					var value = Common.Tool.toFixed(v.countAndMoney,2);
		 					if(name == '1To3'){
		 						head3.push('1-3个月');
	 							data3.push({value:value, name:'1-3个月'});
		 					}else if(name == '4To6'){
		 						head3.push('4-6个月');
		 						data3.push({value:value, name:'4-6个月'});
		 					}else if(name == '7To9'){
		 						head3.push('7-9个月');
		 						data3.push({value:value, name:'7-9个月'});
		 					}else if(name == '10To12'){
		 						head3.push('10-12个月');
		 						data3.push({value:value, name:'10-12个月'});
		 					}else if(name == '13To15'){
		 						head3.push('13-15个月');
		 						data3.push({value:value, name:'13-15个月'});
		 					}else if(name == '16To18'){
		 						head3.push('16-18个月');
		 						data3.push({value:value, name:'16-18个月'});
		 					}else if(name == 'sup18'){
		 						head3.push('18个月以上');
		 						data3.push({value:value, name:'18个月以上'});
		 					}
		 				});
		 				$this.productMoneyHead = head3;
		 				$this.productMoneyData = data3;
		 				
		 				var list4 = result.areaInvestMoneyList;
		 				$this.areaInvestMoneyData = new Array();
		 				$.each(list4,function(i,v){
		 					var name = $.trim(v.name);
		 					var money = Common.Tool.toFixed(v.countAndMoney,2);
		 					if(name == '' || name == '其它'){
		 						return true;
		 					}
		 					$this.areaInvestMoneyData.push({
		 						name: name,
		 						value: money
		 					});
		 				});
		 				
		 				$this.areaInvestMoneyData.sort(function(a,b){
		 					return a.value<b.value?1:-1
		 				});
		 				
		 				$this.areaInvestMoneyDataMax = parseInt($this.areaInvestMoneyData[0].value);
		 				
		 				var max = 10;
		 				if($this.areaInvestMoneyData.length < 11){
		 					max = $this.areaInvestMoneyData.length - 1;
		 				}
		 				for(var i=0;i<max;i++){
		 					var v = $this.areaInvestMoneyData[i];
		 					var $li = '<li><b>'+(i+1)+'</b><b>'+v.name+'</b><span>'+commafy(parseInt(v.value))+'</span></li>';
		 					$('#area_invest_list').append($li);
		 				}
		 				
		 				var list5 = result.areaInvestPeppleList;
		 				$this.areaInvestPeopleData = new Array();
		 				$.each(list5,function(i,v){
		 					var name = $.trim(v.name);
		 					var count = parseInt(v.countAndMoney);
		 					if(name == '' || name == '其它'){
		 						return true;
		 					}
		 					$this.areaInvestPeopleData.push({
		 						name: name,
		 						value: count
		 					});
		 				});
		 				
		 				$this.areaInvestPeopleData.sort(function(a,b){
		 					return a.value<b.value?1:-1
		 				});
		 				
		 				$this.areaInvestPeopleDataMax = parseInt($this.areaInvestPeopleData[0].value);
		 				
		 				var max2 = 10;
		 				if($this.areaInvestPeopleData.length < 11){
		 					max2 = $this.areaInvestPeopleData.length - 1;
		 				}
		 				for(var i=0;i<max2;i++){
		 					var v = $this.areaInvestPeopleData[i];
		 					var $li = '<li><b>'+(i+1)+'</b><b>'+v.name+'</b><span>'+v.value+'</span></li>';
		 					$('#area_user_list').append($li);
		 				}
		 				
		 				var list6 = result.tradeMoneyCountList;
		 				var head6 = new Array();
		 				var data6 = new Array();
		 				$.each(list6,function(i,v){
		 					var name = v.name;
		 					var count = parseInt(v.countAndMoney);
		 					if(name == '100To999'){
		 						head6.push('100-999元');
		 						data6.push({value:count, name:'100-999元'});
		 					}else if(name == '1000To4999'){
		 						head6.push('1000-4999元');
		 						data6.push({value:count, name:'1000-4999元'});
		 					}else if(name == '5000To9999'){
		 						head6.push('5000-9999元');
		 						data6.push({value:count, name:'5000-9999元'});
		 					}else if(name == '10000To49999'){
		 						head6.push('10000-49999元');
		 						data6.push({value:count, name:'10000-49999元'});
		 					}else if(name == '50000To99999'){
		 						head6.push('50000-99999元');
		 						data6.push({value:count, name:'50000-99999元'});
		 					}else if(name == 'sup100000'){
		 						head6.push('100000以上');
		 						data6.push({value:count, name:'100000以上'});
		 					}
		 				});
		 				$this.userInvestMoneyHead = head6;
		 				$this.userInvestMoneyData = data6;
		 				
		 				var list7 = result.ageCountList;
		 				var head7 = new Array();
		 				var data7 = new Array();
		 				$.each(list7,function(i,v){
		 					var name = v.name;
		 					var count = parseInt(v.countAndMoney);
		 					if(name == '0To19'){
		 						head7.push('0-19岁');
		 						data7.push({value:count, name:'0-19岁'});
		 					}else if(name == '20To29'){
		 						head7.push('20-29岁');
		 						data7.push({value:count, name:'20-29岁'});
		 					}else if(name == '30To39'){
		 						head7.push('30-39岁');
		 						data7.push({value:count, name:'30-39岁'});
		 					}else if(name == '40To49'){
		 						head7.push('40-49岁');
		 						data7.push({value:count, name:'40-49岁'});
		 					}else if(name == '50To59'){
		 						head7.push('50-59岁');
		 						data7.push({value:count, name:'50-59岁'});
		 					}else if(name == 'sup60'){
		 						head7.push('60岁以上');
		 						data7.push({value:count, name:'60岁以上'});
		 					}
		 				});
		 				$this.userAgeHead = head7;
		 				$this.userAgeData = data7;
		 				
		 				var list8 = result.sexCountList;
		 				var head8 = new Array();
		 				var data8 = new Array();
		 				
		 				$.each(list8,function(i,v){
		 					var name = v.name;
		 					var count = parseInt(v.countAndMoney);
		 					if(name == '0'){
		 						head8.push('女');
		 						data8.push({value:count, name:'女'});
		 					}else if(name == '1'){
		 						head8.push('男');
		 						data8.push({value:count, name:'男'});
		 					}
		 				});
		 				
		 				$this.userSexHead = head8;
		 				$this.userSexData = data8;
		 				
		 				var list9 = result.vipLevelUserCountList;
						list9.sort(function(a,b){
							return a.name > b.name ? 1:-1
						});
		 				var head9 = new Array();
		 				var data9 = new Array();
		 				
		 				var v4_6 = 0;
		 				var v7_9 = 0;
		 				var vipMax = 0;
		 				$.each(list9,function(i,v){
		 					var name = parseInt(v.name);
		 					var count = parseInt(v.countAndMoney);
		 					var value;
		 					if(name == 0){
		 						head9.push('普通用户');
		 						data9.push(count);
		 					}else if(name < 4){
		 						head9.push('VIP'+name);
		 						value = count;
		 					}else if(name >3 && name <7){
		 						v4_6 += count;
		 						if(name == 6){
		 							head9.push('VIP4-6');
		 							value = v4_6;
		 						}
		 					}else if(name >6){
		 						v7_9 += count;
		 						if(name == 9){
		 							head9.push('VIP7-9');
		 							value = v7_9;
		 						}
		 					}
		 					if(value){
		 						data9.push(value);
		 					}
		 					if(value > vipMax){
		 						vipMax = value;
		 					}
		 				});
		 				vipMax = parseInt(vipMax * 1.3);
		 				$this.vipMax = vipMax;
		 				
		 				$this.vipLevelUserCountHead = head9;
		 				$this.vipLevelUserCountData = data9;
		 				
		 				$this.dataSuccess = ($this.dataSuccess||0) + 1;
		 			}
		 		}
		 	});
		 	
			$.each($this.yearArray,function(index,value){
				$.ajax({
			 		url : '/v2/transaction/find_project_summary.jso?year='+value,
			 		type : 'post', 
			 		dataType : 'json', 
			 		success : function(result) { 
			 			if(result.state == 0){
			 				var list = result.projectSummaryList;
			 				var head = new Array();
			 				var data = new Array();
			 				var head2 = new Array();
			 				var data2 = new Array();
			 				var allMoney = 0;
			 				$.each(list,function(i,v){
			 					var money = parseInt(v.money);
			 					var rate = Common.Tool.toFixed(v.rate,2);
			 					allMoney += money;
			 					if(v.month == 1){
			 						head.push('1月份');
		 							data.push(money);
		 							head2.push('1月份');
		 							data2.push(rate);
			 					}else if(v.month == 2){
			 						head.push('2月份');
		 							data.push(money);
		 							head2.push('2月份');
		 							data2.push(rate);
			 					}else if(v.month == 3){
			 						head.push('3月份');
		 							data.push(money);
		 							head2.push('3月份');
		 							data2.push(rate);
			 					}else if(v.month == 4){
			 						head.push('4月份');
		 							data.push(money);
		 							head2.push('4月份');
		 							data2.push(rate);
			 					}else if(v.month == 5){
			 						head.push('5月份');
		 							data.push(money);
		 							head2.push('5月份');
		 							data2.push(rate);
			 					}else if(v.month == 6){
			 						head.push('6月份');
		 							data.push(money);
		 							head2.push('6月份');
		 							data2.push(rate);
			 					}else if(v.month == 7){
			 						head.push('7月份');
		 							data.push(money);
		 							head2.push('7月份');
		 							data2.push(rate);
			 					}else if(v.month == 8){
			 						head.push('8月份');
		 							data.push(money);
		 							head2.push('8月份');
		 							data2.push(rate);
			 					}else if(v.month == 9){
			 						head.push('9月份');
		 							data.push(money);
		 							head2.push('9月份');
		 							data2.push(rate);
			 					}else if(v.month == 10){
			 						head.push('10月份');
		 							data.push(money);
		 							head2.push('10月份');
		 							data2.push(rate);
			 					}else if(v.month == 11){
			 						head.push('11月份');
		 							data.push(money);
		 							head2.push('11月份');
		 							data2.push(rate);
			 					}else if(v.month == 12){
			 						head.push('12月份');
		 							data.push(money);
		 							head2.push('12月份');
		 							data2.push(rate);
			 					}
			 					eval('$this.productSaleHead'+value+'=head');
			 					eval('$this.productSaleData'+value+'=data');
			 					eval('$this.productRateHead'+value+'=head2');
			 					eval('$this.productRateData'+value+'=data2');
			 					eval('$this.productRateAvg'+value+'=result.avgYearRate');
			 				});
			 				eval('$this.productSaleAllMoney'+value+'=allMoney');
			 				$this.dataSuccess = ($this.dataSuccess||0) + 1;
			 			}
			 		}
			 	});
			});
			
			$.ajax({
		 		url : '/v2/xincunbao/newly_month_xcb_product_info.jso?limit=90',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			if(result.state == 0){
		 				var list = result.list;
		 				var head = new Array();
		 				var data = new Array();
		 				var max = 6;
		 				if(list.length < 7){
		 					max = list.length-1;
		 				}
		 				for(var ix=max;ix>=0;ix--){
		 					var rate = parseFloat(list[ix].rate);
		 					var date = new Date(parseInt(list[ix].ctime) * 1000 - 86400000).Format('MM-dd');
		 					head.push(date);
 							data.push(rate);
		 				}
		 				$this.xcbRateHead7 = head;
		 				$this.xcbRateData7 = data;
		 				
		 				
		 				var head2 = new Array();
		 				var data2 = new Array();
		 				var max2 = 89;
		 				if(list.length < 90){
		 					max2 = list.length-1;
		 				}
		 				for(var ix=max2;ix>=0;ix--){
		 					var rate = parseFloat(list[ix].rate);
		 					var date = new Date(parseInt(list[ix].ctime) * 1000 - 86400000).Format('MM-dd');
		 					head2.push(date);
 							data2.push(rate);
		 				}
		 				$this.xcbRateHead90 = head2;
		 				$this.xcbRateData90 = data2;
		 				
		 				$this.dataSuccess = ($this.dataSuccess||0) + 1;
		 			}
		 		}
		 	});
		 	
			$.ajax({
		 		url : '/v2/transaction/summary_data.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			if(result.state == 0){
						//var refundTotal = fmoneyCN(result.refundTotal,0);
						var refundBasic = fmoneyCN(result.refundBasic);
						var refundInterest = fmoneyCN(result.refundInterest);
						var yesTotal = fmoneyCN(result.yesTotal);
						var incoming = fmoneyCN(result.incoming,0);
		 				
		 				//$('#refund_capital').html(refundTotal);
		 				$('#refund_capital').html(refundBasic);
		 				$('#refund_profit').html(refundInterest);
		 				$('#yesterday_deal').html(yesTotal);
		 				$('#incoming').html(incoming);
		 				
		 				var regUserCount = result.regUserCount;
		 				
		 				
		 				var allLoanCount = result.allLoanCount;
		 				$this.allLoanCount = result.allLoanCount;
		 				
		 				
		 				var increasePeople = result.increasePeople;
		 				$('#new_users').html(increasePeople);
		 				
		 				$this.load1_2 = (function(){
		 					$('#all_user').animateNumber({
				 				number: regUserCount ,
				 				numberStep: function(now, tween) {
				 			    	var target = $(tween.elem);
				 			    	target.prop('number', now).html(parseInt(now));
				 			    }
				 			},3000);
		 					
		 					$('#all_trade').animateNumber({
				 				number: allLoanCount ,
				 				numberStep: function(now, tween) {
				 			    	var target = $(tween.elem);
				 			    	target.prop('number', now).html(parseInt(now));
				 			    }
				 			},3000);
		 				});
		 				
		 				$this.load1_2();
		 				
		 				var approvalMoney = result.approvalMoney;
		 				var waitOverDueMoney = result.waitOverDueMoney;
		 				var waitOverDueCount = result.waitOverDueCount;
		 				var waitOverDueRate = result.waitOverDueRate;
		 				var waitOverDueCountRate = result.waitOverDueCountRate;
		 				var overDueMoney = result.overDueMoney;
		 				var overDueCount = result.overDueCount;
		 				var overDueRate = result.overDueRate;
		 				var overDueCountRate = result.overDueCountRate;
		 				var badMoney = result.badMoney;
		 				$this.badMoney = result.badMoney;
		 				var badCount = result.badCount;
		 				$this.badCount = result.badCount;
		 				var badRate = result.badRate;
		 				var badCountRate = result.badCountRate;	
		 				var overDuePeople = result.overDuePeople;
		 				
		 				overDueMoney = Number(result.overDueMoney) + Number(result.badMoney);
		 				$this.overDueMoney = result.overDueMoney;
		 				overDueCount = Number(result.overDueCount) + Number(result.badCount);
		 				$this.overdueCount = result.overDueCount;
		 				overDueRate = Number(result.overDueRate) + Number(result.badRate);
		 				overDueCountRate = Number(result.overDueCountRate) + Number(result.badCountRate);
		 				

		 				var badMoneyStr = Number(badMoney);
		 				var allBadMoney = Number(result.overDueMoney) + Number(result.badMoney)+5413231+2209973;
						//var allBadMoneyStr = Number(overDueMoney) + Number(badMoney);
						var allBadMoneyStr = Number(overDueMoney);
		 				allBadMoney = toDecimal(allBadMoney);
		 				
		 				$('#daichang_money').html(fmoney(allBadMoney));
		 				$('#history_overdue_money').html(fmoney(allBadMoney));
		 				var allBadCount = overDueCount;
		 				$('#daichang_amount').html(allBadCount);
		 				
	 					var rate = Number(result.badRate) + Number(result.overDueRate);
	 					$('#history_overdue_rate').html(Common.Tool.toDecimal(rate));
	 					
	 					$this.load7_1 = (function(){
//	 						$('#badMoney_huahua').html(badMoney);
//				 			$('#badRate_huahua').html(badRate);
//				 			$('#overDueMoney_huahua').html(overDueMoney);
//				 			$('#overDueMoneyRate_huahua').html(overDueRate);
//			 				$('#overDuePeople_huahua').html(overDuePeople);
			 				
	 						$('#badMoney_huahua').animateNumber({
			 					number: badMoneyStr ,
			 					numberStep: function(now, tween) {
			 						var target = $(tween.elem);
			 						target.prop('number', now).html(Common.Tool.toDecimal(now));
			 					}
			 				},3000);
	 						
	 						$('#badRate_huahua').animateNumber({
			 					number: badRate ,
			 					numberStep: function(now, tween) {
			 						var target = $(tween.elem);
			 						target.prop('number', now).html(Common.Tool.toDecimal(now));
			 					}
			 				},3000);
	 						
	 						$('#overDueMoney_huahua').animateNumber({
			 					number: allBadMoneyStr ,
			 					numberStep: function(now, tween) {
			 						var target = $(tween.elem);
			 						target.prop('number', now).html(Common.Tool.toDecimal(now));
			 					}
			 				},3000);
	 						
	 						$('#overDueMoneyRate_huahua').animateNumber({
			 					number: overDueRate ,
			 					numberStep: function(now, tween) {
			 						var target = $(tween.elem);
			 						target.prop('number', now).html(Common.Tool.toDecimal(now));
			 					}
			 				},3000);
	 						
	 						$('#overDuePeople_huahua').animateNumber({
			 					number: overDuePeople ,
			 					numberStep: function(now, tween) {
			 						var target = $(tween.elem);
			 						target.prop('number', now).html(parseInt(now));
			 					}
			 				},3000);
	 					});
	 					
	 					var head5 = new Array();
		 				var head5_2 = new Array();
		 				var data5 = new Array();
		 				head5.push('181天以上');
		 				head5.push('91-180天');
		 				head5_2.push('金额分级逾期率');
		 				head5_2.push('项目分级逾期率');
		 				data5.push({
		                	name: '金额分级逾期率',
		                	type: 'bar',
		                	barCategoryGap:60,
		                	itemStyle: {
			                	normal: {
			                		label : {
			                			show : true,
			                			formatter:"{c}%"
			                		}
			                	}
		                	},
		                	data: [badRate,Common.Tool.toFixed(result.overDueRate,2)]
		                });
		 				data5.push({
		 					name: '项目分级逾期率',
		 					type: 'bar',
		 					barCategoryGap:60,
		 					itemStyle: {
		 						normal: {
		 							label : {
		 								show : true,
		 								formatter:"{c}%"
		 							}
		 						}
		 					},
		 					data: [badCountRate,Common.Tool.toFixed(result.overDueCountRate,2)]
		 				});
		 				
		 				$this.badRateHead = head5;
		 				$this.badRateHead_2 = head5_2;
		 				$this.badRateData = data5;
		 				
		 				var userAvgInvestMoney = result.userAvgInvestMoney;
		 				$('#per_capita_invest_money').html(userAvgInvestMoney);
		 				
		 				var countAvgInvestMoney = result.countAvgInvestMoney;
		 				$('#per_portion_invest_money').html(countAvgInvestMoney);
		 				
		 				var userAvgOnlineLoanMoney = result.userAvgOnlineLoanMoney;
		 				$('#per_capita_borrow_money').html(userAvgOnlineLoanMoney);
		 				
		 				var countAvgOnlineLoanMoney = result.countAvgOnlineLoanMoney;
		 				$('#per_portion_borrow_money').html(countAvgOnlineLoanMoney);
		 				
		 				var investUserCount = result.investUserCount;
		 				$('#investor_amount').html(investUserCount);
		 				
		 				var onlineLoanUserCount = result.onlineLoanUserCount;
		 				$('#borrower_amount').html(onlineLoanUserCount);
		 				
		 				var top1InInvestMoneyRate = result.top1InInvestMoneyRate;
		 				var leftTop1InInvestMoneyRate = 100 - Number(top1InInvestMoneyRate);
		 				var head = new Array();
		 				var data = new Array();
		 				
		 				head.push('最大单户投资金额占比');
		 				head.push('其它用户投资金额占比');
		 				data.push({value:top1InInvestMoneyRate,name:'最大单户投资金额占比'});
		 				data.push({value:leftTop1InInvestMoneyRate,name:'其它用户投资金额占比'});
		 				
		 				$this.top1InInvestMoneyRateHead = head;
		 				$this.top1InInvestMoneyRateData = data;
		 				
		 				var top10InInvestMoneyRate = result.top10InInvestMoneyRate;
		 				var leftTop10InInvestMoneyRate = 100 - Number(top10InInvestMoneyRate);
		 				var head2 = new Array();
		 				var data2 = new Array();
		 				
		 				head2.push('最大10户投资金额占比');
		 				head2.push('其它用户投资金额占比');
		 				data2.push({value:top10InInvestMoneyRate,name:'最大10户投资金额占比'});
		 				data2.push({value:leftTop10InInvestMoneyRate,name:'其它用户投资金额占比'});
		 				
		 				$this.top10InInvestMoneyRateHead = head2;
		 				$this.top10InInvestMoneyRateData = data2;
		 				
		 				
		 			}
		 		}
		 	});
		 	
			$.ajax({
		 		url : '/v2/xincunbao/xcb_product_info.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			if(result.state == 0){
		 				var tenThousandIncome = result.tenThousandIncome;
		 				var availableMoneyLeft = Common.Tool.toFixed(result.availableMoneyLeft,2);
		 				
		 				if(availableMoneyLeft > 1000000){
		 					availableMoneyLeft = '100万';
		 				}
		 				
		 				$('#available_money').html(availableMoneyLeft);
		 				$('#per_tenthousand_profit').html(tenThousandIncome);
		 				
		 			}
		 		}
		 	});
		 	
			$.ajax({
		 		url : '/v2/transaction/xcb_create_income.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
		 		success : function(result) { 
		 			if(result.state == 1){
		 				var xcbAllIncome = commafy(result.data);
		 				$('#xcb_all_profit').html(xcbAllIncome);
		 			}
		 		}
		 	});
		},
		initEcharts:function(){
			if(!($this.dataSuccess >= 7)){
				setTimeout(function(){
					ServiceData.initEcharts();
				},100);
				return;
			}
			require.config({
			    paths: {
			        echarts: '/2.0/js/vendor/echarts/build/dist'
			    }
			});
			require(
				[
					'echarts',
					'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
					'echarts/chart/pie',
					'echarts/chart/line',
					'echarts/chart/map'
				],
				function (ec) {
					echarts = ec;
					
	 				$this.reloadAreaInvestMoney();
	 				$this.loadAreaInvestMoney = true;
					$this.loadAreaInvestPeople = false;
//					
//	 				$this.reloadUserInvestMoney();
				}
			);
		},
		reloadMonthMoney:function(year){
			var allMoney = eval('$this.productSaleAllMoney'+year);
			$('#saleAllMoney_view').html(allMoney);
			
			var chart = echarts.init(document.getElementById('product_month_money_box'));
			var head = eval('$this.productSaleHead'+year);
			var data = eval('$this.productSaleData'+year);
			var option = {
				title:{
					text:'项目成交量',
					x:'center',
					show:false
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 万"
	    		},
	    		grid:{
	    			x:60,
	    			y:10,
	    			x2:60,
	    			y2:35
	    		},
				xAxis : [
	        		{
	            		type : 'category',
	            		boundaryGap : false,
	            		data : head
	        		}
	    		],
	    		yAxis : [
	        		{
	            		type : 'value',
	            		axisLabel : {
	                		formatter: '{value} 万'
	            		}
	        		}
	    		],
				series:[
					{
						name:'项目成交量',
						type:'line',
						data:data,
						markLine : {
	                		data : [
	                    		{type : 'average', name: '平均值'}
	                		]
	            		}
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadMonthRate:function(year){
			var avgRate = eval('$this.productRateAvg'+year);
			$('#avg_year_rate').html(avgRate+'%');
			var chart = echarts.init(document.getElementById('product_month_rate_box'));
			var head = eval('$this.productRateHead'+year);
			var data = eval('$this.productRateData'+year);
			var option = {
				title:{
					text:'年化收益走势',
					x:'center',
					show:false
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} %"
	    		},
	    		grid:{
	    			x:60,
	    			y:10,
	    			x2:60,
	    			y2:35
	    		},
				xAxis : [
	        		{
	            		type : 'category',
	            		boundaryGap : false,
	            		data : head
	        		}
	    		],
	    		yAxis : [
	        		{
	            		type : 'value',
	            		axisLabel : {
	                		formatter: '{value} %'
	            		}
	        		}
	    		],
				series:[
					{
						name:'年化收益走势',
						type:'line',
						data:data,
						markLine : {
	                		data : [
	                    		{type : 'average', name: '平均值'}
	                		]
	            		}
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadXcbRate:function(day){
			var chart = echarts.init(document.getElementById('xcb_rate_box'));
			var head = eval('$this.xcbRateHead'+day);
			var data = eval('$this.xcbRateData'+day);
			var option = {
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} %"
	    		},
	    		grid:{
	    			x:60,
	    			y:10,
	    			x2:60,
	    			y2:35
	    		},
				xAxis : [
	        		{
	            		type : 'category',
	            		boundaryGap : false,
	            		data : head
	        		}
	    		],
	    		yAxis : [
	        		{
	            		type : 'value',
	            		axisLabel : {
	                		formatter: '{value} %'
	            		},
	            		min:6,
	            		max:10
	        		}
	    		],
				series:[
					{
						name:'近'+day+'天年化收益率',
						type:'line',
						data:data,
						markLine : {
	                		data : [
	                    		{type : 'average', name: '平均值'}
	                		]
	            		}
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadAreaInvestMoney:function(){
			var chart = echarts.init(document.getElementById('area_invest_box'));
			var data = $this.areaInvestMoneyData;
			var option = {
				title:{
					text:'投资金额',
					x:'center'
				},
				tooltip : {
	        		trigger: 'item'
	    		},
	    		dataRange: {
	        		min: 0,
	        		max: $this.areaInvestMoneyDataMax,
	        		x: 'left',
	        		y: 'bottom',
	        		text:['高','低'],           // 文本，默认为数值文本
	        		calculable : true
	    		},
				series:[
					{
						name:'投资金额',
						type: 'map',
						mapType: 'china',
						roam: false,
						itemStyle:{
	                		normal:{label:{show:true}},
	                		emphasis:{label:{show:true}}
	            		},
						data:data
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadAreaInvestPeople:function(){
			var chart = echarts.init(document.getElementById('area_user_box'));
			var data = $this.areaInvestPeopleData;
			var option = {
				title:{
					text:'投资人数',
					x:'center'
				},
				tooltip : {
	        		trigger: 'item'
	    		},
	    		dataRange: {
	        		min: 0,
	        		max: $this.areaInvestPeopleDataMax,
	        		x: 'left',
	        		y: 'bottom',
	        		text:['高','低'],           // 文本，默认为数值文本
	        		calculable : true
	    		},
				series:[
					{
						name:'投资人数',
						type: 'map',
						mapType: 'china',
						roam: false,
						itemStyle:{
	                		normal:{label:{show:true}},
	                		emphasis:{label:{show:true}}
	            		},
						data:data
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadUserAgeSex:function(){
			var chart = echarts.init(document.getElementById('investor_featrue_box'));
			var head = $this.userAgeHead;
			var data = $this.userAgeData;
			var head2 = $this.userSexHead;
			var data2 = $this.userSexData;
			var head3 = new Array();
			$.merge(head3,head);
			$.merge(head3,head2);
			var option = {
				color: [
		        	'#54A2E5','#F37370','#EE9A13','#66CC99','#DEBC35','#00D0E9','#D7595A','#61b1fe'
			    ],
				//backgroundColor:'#f5f5f5',
				title:{
					text:'用户年龄/性别分布',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,134,14,134],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 人({d}%)",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'110',
					y:'310',
					orient:'vertical',
					selectedMode:false,
					data:head3
				},
				series:[
					{
						name:'用户年龄分布',
						type:'pie',
						radius : ['45%', '60%'],
						center: ['50%', '40%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:data
					},
					{
						name:'用户性别分布',
						type:'pie',
						radius : ['20%', '35%'],
						center: ['50%', '40%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:data2
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		reloadUserInvestMoney:function(){
			var chart = echarts.init(document.getElementById('userInvestMoney_box'));
			var head = $this.userInvestMoneyHead;
			var data = $this.userInvestMoneyData;
			var option = {
				backgroundColor:'#f5f5f5',
				title:{
					text:'用户成交金额分布',
					x:'center',
					y:13,
					backgroundColor:'#e7e7e7',
					padding:[12,134,14,134],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 笔({d}%)",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'270',
					y:'80',
					orient:'vertical',
					selectedMode:false,
					data:head
				},
				series:[
					{
						name:'用户成交金额分布',
						type:'pie',
						radius : ['45%', '65%'],
						center: ['35%', '55%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:data
					}
				]
			};
			//window.onresize = chart.resize;
			chart.setOption(option, true);
		},
		load1:function(){
			$this.load1_1();
			$this.load1_2();
			$this.load1_3();
		},
		load2:function(){
			var chart1 = echarts.init(document.getElementById('product_type_box')); 
			var option1 = {
				color: [
			        '#66CC99','#F37370','#EE9A13','#54A2E5'
			    ],
				backgroundColor:'#f5f5f5',
				title:{
					text:'项目种类分布',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,82,14,82],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 笔 ({d}%) ",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'center',
					y:'340',
					orient:'vertical',
					selectedMode:false,
					data:$this.productTypeHead
				},
				series:[
					{
						name:'项目类型分布',
						type:'pie',
						radius : ['50%', '70%'],
						center: ['50%', '43%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.productTypeData
					}
				]
			};

			chart1.setOption(option1); 
			
			var chart2 = echarts.init(document.getElementById('product_date_box')); 
			var option2 = {
				color: [
			        '#54A2E5','#F37370','#EE9A13','#66CC99','#DEBC35','#00D0E9','#D7595A'
			    ],
				backgroundColor:'#f5f5f5',
				title:{
					text:'项目期限分布',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,82,14,82],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 笔 ({d}%)",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'40',
					y:'340',
					orient:'vertical',
					selectedMode:false,
					data:$this.productDateHead
				},
				series:[
					{
						name:'项目期限分布',
						type:'pie',
						radius : ['50%', '70%'],
						center: ['50%', '43%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.productDateData
					}
				]
			};

			chart2.setOption(option2);
			
			var chart3 = echarts.init(document.getElementById('product_money_box')); 
			var option3 = {
				color: [
			        '#54A2E5','#F37370','#EE9A13','#66CC99','#DEBC35','#00D0E9','#D7595A'
			    ],
				backgroundColor:'#f5f5f5',
				title:{
					text:'项目金额分布',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,82,14,82],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 元({d}%)",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'40',
					y:'340',
					orient:'vertical',
					selectedMode:false,
					data:$this.productMoneyHead
				},
				series:[
					{
						name:'项目比例分布',
						type:'pie',
						radius : ['50%', '70%'],
						center: ['50%', '43%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.productMoneyData
					}
				]
			};

			chart3.setOption(option3);
			
			var chart4 = echarts.init(document.getElementById('product_deal_money_box')); 
			var option4 = {
				color: [
			        '#54A2E5','#F37370','#EE9A13','#66CC99','#DEBC35','#00D0E9','#D7595A'
			    ],
				backgroundColor:'#f5f5f5',
				title:{
					text:'用户成交金额分布',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,82,14,82],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {c} 笔({d}%)",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'20',
					y:'340',
					orient:'vertical',
					selectedMode:false,
					data:$this.userInvestMoneyHead
				},
				series:[
					{
						name:'用户成交金额分布',
						type:'pie',
						radius : ['50%', '70%'],
						center: ['50%', '43%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.userInvestMoneyData
					}
				]
			};

			chart4.setOption(option4);
			
		},
		load3:function(){
			$this.reloadMonthMoney('2017');
			$this.loadMonthMoney = true;
			$this.loadMonthRate = false;
			$this.loadXcbRate = false;
		},
		load4:function(){
			var chart10 = echarts.init(document.getElementById('user_data_chart')); 
			var option10 = {
				color: [
			        '#56A0E2'
			    ],
				grid:{
					x:80,
					y:30,
					x2:80,
					y2:60,
					borderWidth: 0
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "人数： {c} 人"
	    		},
				xAxis: [
			        {
			        	type: 'category',
			        	data: $this.vipLevelUserCountHead,
		            	splitLine:{
		            		show:false
		            	},
		            	axisTick:{
		            		show:false
		            	},
		            	axisLine:{
		            		show:true,
		            		lineStyle:{
		            			color: '#EEEEEE',
		            			width:2
		            		}
		            	}
			        }
			    ],
			    yAxis: [
		            {
		            	type: 'value',
		            	show: false,
		            	axisLabel : {
	                		formatter: '{value} 人'
	            		},
	            		splitLine:{
		            		show:false
		            	},
		            	min:0,
		            	max:$this.vipMax
		            }
		        ],
		        series: [
					{
					    name:'VIP人数',
					    type:'bar',
					    barCategoryGap:90,
					    data:$this.vipLevelUserCountData
					}
		        ]
			};
			chart10.setOption(option10);
		},
		load5:function(){
			var chart4 = echarts.init(document.getElementById('biggest_invest_rate_box')); 
			var option4 = {
				//backgroundColor:'#f5f5f5',
				title:{
					text:'最大单户投资金额占比',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,134,14,134],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				color: [
			        '#53A2E4','#F37370'
			    ],
			    tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {d}%",
	        		enterable:true
				},
				legend:{
					show:true,
					x:'center',
					y:'310',
					orient:'vertical',
					selectedMode:false,
					data:$this.top1InInvestMoneyRateHead
				},
				series:[
					{
						name:'投资金额占比',
						type:'pie',
						radius : ['0%', '60%'],
						center: ['50%', '40%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : false,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.top1InInvestMoneyRateData
					}
				]
			};

			chart4.setOption(option4);
			
			var chart5 = echarts.init(document.getElementById('top10_invest_rate_box')); 
			var option5 = {
				//backgroundColor:'#f5f5f5',
				title:{
					text:'最大十户投资金额占比',
					x:'center',
					y:13,
					//backgroundColor:'#e7e7e7',
					padding:[12,134,14,134],
					textStyle:{
						fontFamily:'微软雅黑',
					    fontSize: 16,
					    fontWeight: 'normal'
					}
				},
				tooltip : {
	        		trigger: 'item',
	        		formatter: "{b} : {d}%",
	        		enterable:true
				},
				color: [
			        '#66CC9A','#FEC434'
			    ],
				legend:{
					show:true,
					x:'center',
					y:'310',
					orient:'vertical',
					selectedMode:false,
					data:$this.top10InInvestMoneyRateHead
				},
				series:[
					{
						name:'投资金额占比',
						type:'pie',
						radius : ['0%', '60%'],
						center: ['50%', '40%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : false,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '15',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
						data:$this.top10InInvestMoneyRateData
					}
				]
			};

			chart5.setOption(option5);
			
			$this.reloadUserAgeSex();
		},
		load7:function(){
			$this.load7_1();
		},
		load8:function(){
			var chart9 = echarts.init(document.getElementById('overdue_rate_sort_box')); 
			var option9 = {
				color: [
			        '#569FE3','#FF6600'
			    ],
				grid:{
					x:80,
					y:30,
					x2:30,
					y2:60,
					borderWidth: 0
				},
				legend:{
					show:true,
					x:'80',
					y:'400',
					orient:'horizontal',
					selectedMode:false,
					data:$this.badRateHead_2
				},
				xAxis: [
					{
					    type: 'value',
					    show: false
					}
			    ],
			    yAxis: [
		            {
		            	type: 'category',
		            	data: $this.badRateHead,
		            	axisTick:{
		            		show:false
		            	},
		            	axisLine:{
		            		show:false
		            	},
		            	splitLine:{
		            		show:false
		            	}
		            }
		        ],
		        series: $this.badRateData
			};
			chart9.setOption(option9);
		},
		bindEvent:function(){
			$('#tab1').click(function(){
				if(!$this.loadMonthMoney){
					$this.loadMonthMoney = true;
					setTimeout(function(){
						ServiceData.reloadMonthMoney('2017');
					},500);
				}
			});
			
			$('#tab2').click(function(){
				if(!$this.loadMonthRate){
					$this.loadMonthRate = true;
					setTimeout(function(){
						ServiceData.reloadMonthRate('2017');
					},500);
				}
			});
			
			$('#tab3').click(function(){
				if(!$this.loadXcbRate){
					$this.loadXcbRate = true;
					setTimeout(function(){
						ServiceData.reloadXcbRate('7');
					},500);
				}
			});
			
			$('#tab4').click(function(){
				if(!$this.loadAreaInvestMoney){
					$this.loadAreaInvestMoney = true;
					setTimeout(function(){
						ServiceData.reloadAreaInvestMoney();
					},500);
				}
			});
			
			$('#tab5').click(function(){
				if(!$this.loadAreaInvestPeople){
					$this.loadAreaInvestPeople = true;
					setTimeout(function(){
						ServiceData.reloadAreaInvestPeople();
					},500);
				}
			});
			
		}
	};
	$(function(){
		$this.init();
	});
	ServiceData = $this;
	
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
	
	function commafy(num){
		return Common.Tool.commafy(Common.Tool.toFixed(num,2));
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
		var CN_TEN_THOUSAND = "<span class='unit'>万</span>";
		var CN_HUNDRED_MILLION = "<span class='unit'>亿</span>";
		var CN_UNIT = "<span class='unit'>元</span>";
		if(l.length < 5){
			return s+ CN_UNIT;
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
		if (n == 0){
			return t.split("").join("") + CN_UNIT ;
		}else{
			return t.split("").join("") + "." + r + CN_UNIT ;
		}
	}
})();
//页面初始化
(function(){
	var init = {
		curIndex : 0,
		maxIndex : $(".sections .section").length-1,
		headerHeight : parseFloat($(".hmenu_nav").css("height")),
		msie : function(){
			var UA =  navigator.userAgent;
			if(/msie/i.test(UA)){
			    return true;
			}else{
				return false;
			}
		},
		sectionHeight : function(){
			var sectionHeight = parseFloat($(window).height())-init.headerHeight;
			$(".sections .section").css("height",sectionHeight);
			$(".sections").css("opacity",1);
		},
		//initSectionBg
		sectionBg : function(){
			var sections = $("#sections .section");
			sections.each(function(index){
				if(index>0&&index%2!=0){
					$(this).css("background-color","#fff");
				}else if(index>0&&index%2==0){
					$(this).css("background-color","#e9f5ff");
				}
			});
		},
		//滚轮滑动翻页
		onTimeout : false,
		scrollingTimer : "",
		scrolling : function(){
			$(document).on("mousewheel DOMMouseScroll", function (e) {
	
				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
		                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
	
			    if (delta > 0) {
			        // 向上滚
			        if(init.onTimeout){
			        	clearTimeout(init.scrollingTimer);										        	
			        }
			        init.onTimeout = true;
			        init.scrollingTimer = setTimeout(function(){
			       		if(init.curIndex>0){
				        	init.curIndex--;
				        }else{
				        	return;
				        }
				        if(!init.msie()){
					    	$("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*init.curIndex);
					    }else{
					    	$("#sections .section-1").stop(true,false).animate({"margin-top":-parseFloat($("#sections .section").css("height"))*init.curIndex},400);
					    }
					    init.sectionIn();
					    $("#section-select li").eq(init.curIndex).addClass("current").siblings().removeClass("current");
				        init.onTimeout = false;
		        	},200); 
			    } else if (delta < 0) {
			        // 向下滚
			        if(init.onTimeout){
			        	clearTimeout(init.scrollingTimer);
			        	
			        }
			        init.onTimeout = true;
			        init.scrollingTimer = setTimeout(function(){
			       		if(init.curIndex<init.maxIndex){
				        	init.curIndex++;
				        }else{
				        	return;
				        }
				        if(!init.msie()){
					    	$("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*init.curIndex);
					    }else{
					    	$("#sections .section-1").stop(true,false).animate({"margin-top":-parseFloat($("#sections .section").css("height"))*init.curIndex},400);
					    }
					    init.sectionIn();
					    $("#section-select li").eq(init.curIndex).addClass("current").siblings().removeClass("current");
				        init.onTimeout = false;
		        	},200); 
			    }			    
			});
		},
		//点击右侧按钮翻页
		bindSelecting : function(){
			for(var i=0,j=$("#sections .section").length;i<j;i++){
				$("#section-select").append("<li></li>");
			};
			var $selects = $("#section-select>li");
			$selects.eq(0).addClass("current");
			var selecting = function(index){
				return function(){
					if(!init.msie()){
					    $("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*index);
					   }else{
					    $("#sections .section-1").animate({"margin-top":-parseFloat($("#sections .section").css("height"))*index},400);
					}
					init.curIndex = index;
					init.sectionIn();
					$selects.eq(init.curIndex).addClass("current").siblings().removeClass("current");
				}
			};
			
			for(var i=0,length=$selects.length;i<length;i++){
				$selects.eq(i).on("click",selecting(i));
			}
		},
		//按上下键翻页
		bindKeyEvent : function(){
			$(document).keydown(function(event){
				if(event.keyCode==38){
					if(init.curIndex>0){
				       	init.curIndex--;
				    }else{
				        return;
				        }
				    if(!init.msie()){
				    	$("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*init.curIndex);
				    }else{
				    	$("#sections .section-1").stop(true,false).animate({"margin-top":-parseFloat($("#sections .section").css("height"))*init.curIndex},400);
				    }
				    init.sectionIn();
				    $("#section-select li").eq(init.curIndex).addClass("current").siblings().removeClass("current");
				}
				if(event.keyCode==40){
					if(init.curIndex<init.maxIndex){
				       	init.curIndex++;
				    }else{
				        return;
				        }
				    if(!init.msie()){
				    	$("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*init.curIndex);
				    }else{
				    	$("#sections .section-1").stop(true,false).animate({"margin-top":-parseFloat($("#sections .section").css("height"))*init.curIndex},400);
				    }
				    init.sectionIn();
				    $("#section-select li").eq(init.curIndex).addClass("current").siblings().removeClass("current");			        
				}
			});
		},
		//当前页面出现动画
		sectionIn : function(){
			if (!init.msie()){
				$("#sections .section").eq(init.curIndex).find(".title").addClass("title_animating");
				$("#sections .section").eq(init.curIndex).siblings().find(".title").removeClass("title_animating");
				$("#sections .section").eq(init.curIndex).find(".section_detail").addClass("detail_animating");
				$("#sections .section").eq(init.curIndex).siblings().find(".section_detail").removeClass("detail_animating");
			}else{
				$("#sections .section").eq(init.curIndex).find(".title").css("margin-top","-160px").stop(true,false).animate({"margin-top":0},1400);
				$("#sections .section").eq(init.curIndex).find(".section_detail").css("margin-top","100%").stop(true,false).animate({"margin-top":0},1400);
			}
			if(ServiceData['load'+(init.curIndex+1)]){
				ServiceData['load'+(init.curIndex+1)]();
			}
		},
		//表格添加背景
		drawOddTr : function(){
			var drawing = function(trs){
				for(var i=0,length=trs.length;i<length;i++){
					if(i%2!=0){
						trs.eq(i).addClass("bg");
					}
				}
			};
			drawing($("#content8_table tbody tr"));
			drawing($("#content9_table tbody tr"));
			drawing($("#content10_table tbody tr"));
			drawing($("#content11_table tbody tr"));
		}, 
		initial : function(){
			init.sectionHeight();
			init.sectionBg();
			init.scrolling();
			init.bindSelecting();
			init.bindKeyEvent();
			init.drawOddTr();
		},
		reSize : function(){
			init.sectionHeight();
			init.scrolling();
			$("#sections .section-1").css("margin-top",-parseFloat($("#sections .section").css("height"))*init.curIndex);
		}
	};

	init.initial();
	$(window).resize(function(){init.reSize();});

	//init tabs
	var initTabs = {
		bindContent : function($tabs,$tabsContents){
			var binding = function(index){
				return function(){	
					$tabs.eq(index).addClass("current").siblings().removeClass("current");
					$tabsContents.eq(index).addClass("current").siblings().removeClass("current");	
				}
			};
			for(var i=0,length=$tabs.length;i<length;i++){
				$tabs.eq(i).on("click",binding(i));
			}
		},
		initial : function(){
			initTabs.bindContent($("#tabsholder_1 .tabs>li"),$("#tabsholder_1 .contents .tabscontent"));
			initTabs.bindContent($("#tabsholder_2 .tabs>li"),$("#tabsholder_2 .contents .tabscontent"));
			initTabs.bindContent($("#tabsholder_3 .tabs>li"),$("#tabsholder_3 .contents .tabscontent"));
			initTabs.bindContent($("#tabsholder_4 .tabs>li"),$("#tabsholder_4 .contents .tabscontent"));
		}
	};
	initTabs.initial();
	
	$(function(){
		$(".select").each(function(){
			var s=$(this);
			var z=parseInt(s.css("z-index"));
			var dt=$(this).children("dt");
			var dd=$(this).children("dd");
			var _show=function(){dd.slideDown(200);dt.addClass("cur");s.css("z-index",z+1);};   //展开效果
			var _hide=function(){dd.slideUp(200);dt.removeClass("cur");s.css("z-index",z);};    //关闭效果
			dt.click(function(){dd.is(":hidden")?_show():_hide();});
			dd.find("a").click(function(){
				dt.html($(this).html());
				_hide();
				var data = $(this).attr('data');
				var item = $(this).attr('item');
				if(item == 'money'){
					ServiceData.reloadMonthMoney(data);
				}else if(item == 'rate'){
					ServiceData.reloadMonthRate(data);
				}else if(item == 'xcb'){
					ServiceData.reloadXcbRate(data);
				}
				
			});//选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
			$("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
		});
	});
})();
