
function initData(){
	if (!AA.Api.User.isAuth) {//检查登录态，如果没登陆，就弹出登录界面
		AA.RapidLogin.popup();
		return;
	}
	//投资记录的加载
	load_near_refund_list(1);   
	  
	//信融账户的部分数据
	indexInfo();
	
	//基本信息
	info();
	
	//收益
	income(10);
	
	//获取资产总额
	initAssetOverview();
	
	//交易记录
	tradeRecord(10); 
	
	//信存宝存入
	xcb_cr();
	
	//信存宝转出
	xcb_zc();  
	
    //收益和交易记录展开更多 
	moreIncome();       
	
	//绑定存入转出的失焦事件
	bindCrZcBlur(); 
	
	//芝麻信用
	zhimaScore();
} 

/**
 * 绑定存入转出的失焦事件
 */
function bindCrZcBlur(){ 
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

/**
 * 收益和交易记录展开更多
 */
function moreIncome(){
	//收益展开更多
	
	$("#more1").unbind("click").bind("click",function(){
		income(1000);
		$(this).attr("style","display:none");  
	}).attr("style","display:block");
	
	//交易记录展开更多
	$("#more2").unbind("click").bind("click",function(){  
		tradeRecord(1000); 
		$(this).attr("style","display:none");   
	}).attr("style","display:block");      
}

/**
 * 信存宝存入
 */
function xcb_cr(){
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
          
    	//申购
    	$.ajax({
    		url : '/v2/xincunbao/buy_apply.jso',
    		type : 'post',
    		data:{money:_money,pass:AA.Helper.encrypPw(_pass)},  
    		dataType : 'json', 
    		success : function(data) {
    			if(data.state == 0){
    				$.alert({
    					tipCls:'success1' ,
    					title:'您在信存宝成功存入：<span style="color:red">'+_money +"</span>&nbsp;元", 
    					content:'', 
    					txtBtn:'关闭',
    					init:function (d ,btn,btn1 ) {
    						btn.click(function () {
    							d.close();
    							setTimeout("initData()",1000);  //初始化数据 
    						});
    					}  
    				}); 
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
} 
/**
 * 信存宝转出
 */
function xcb_zc(){
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
        						setTimeout("initData()",1000);  //初始化数据
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
        						setTimeout("initData()",1000);  //初始化数据 
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
}

function indexInfo(){
	$.ajax({
		url : '/v2/xincunbao/get_index_info.jso', 
		type : 'post',
		dataType : 'json',
		success : function(data) {
			var money = data.money;
			var rewardMoney = data.rewardMoney;
			var score = data.score;
			var deadline = data.deadline;
			var isCheckedBankCard = data.isCheckedBankCard;
			var isCheckedEmail = data.isCheckedEmail;
			var isCheckedIdentification = data.isCheckedIdentification;
			var isCheckedMobile = data.isCheckedMobile;
			var name = data.name;
			var vipDeadLine = data.vipDeadLine;   
			var vip = data.vip;
			
			$("#money_").html(money);
			$("#crMoney").val(money);
			$("#rewardMoney").html(rewardMoney);
			if(rewardMoney > 0){
				$("#deadline").html("（有效期剩余 "+deadline+"天)");
			}
			$("#score").html(score);    
			$("#leftTitle").html(getTimeQuantum()+name);    
			if(vipDeadLine == 0 || vip == 0){  
				$("#unVip").attr("style","display:block;");
				$("#vip").attr("style","display:none;");  
			}else{
				$("#vipGrade").html(vip);
				$("#vipDeadLine").html(getLocalTime(vipDeadLine));   
			} 
			if(isCheckedBankCard == 1)
				$("#isCheckedBankCard").attr("class","ybank AllIcon");
			if(isCheckedEmail == 1)
				$("#isCheckedEmail").attr("class","ymail AllIcon");
			if(isCheckedIdentification == 1)
				$("#isCheckedIdentification").attr("class","yID AllIcon");
			if(isCheckedMobile == 1)
				$("#isCheckedMobile").attr("class","ytel AllIcon");          
		}
	});    
}  

function info(){
	$.ajax({
		url : '/v2/xincunbao/get_xcb_info.jso?_'+new Date().getTime(), 
		type : 'post',
		dataType : 'json',
		success : function(data) {
			var tenThousandIncome = data.tenThousandIncome == "" ? "0.00" : data.tenThousandIncome;     
			var rate = data.rate == "" ? "0.00" : data.rate;
			var money = data.money;
			var todayIncome = data.todayIncome; 
			var sumIncome = data.sumIncome;    
			var isRedeem = data.isRedeem;
			var isReply = data.isReply;
			var availableMoneyLeft = data.availableMoneyLeft;  
			var unconfirmRechargeMoney = data.unconfirmRechargeMoney;
			var unconfirmHotMoney = data.unconfirmHotMoney;
			var unconfirmMoney = parseFloat(""+unconfirmRechargeMoney) + parseFloat(""+unconfirmHotMoney);
			unconfirmMoney = toFixed(unconfirmMoney,2);//取两位小数
			var confirmRechargeMoney = data.confirmRechargeMoney;
			var confirmHotMoney = data.confirmHotMoney;
			var confirmMoney = parseFloat(""+confirmRechargeMoney) + parseFloat(""+confirmHotMoney);
			confirmMoney = toFixed(confirmMoney,2);//取两位小数
			var conversionProgress;
			if(confirmMoney!=0){
				conversionProgress = Math.floor(parseFloat(""+confirmHotMoney)/confirmMoney*100);
			}else{
				conversionProgress = 0;
			}
			
			
			if(availableMoneyLeft > 1000000){
				availableMoneyLeft = ">100万"; 
			}
			
			$("#xcbMoney").html(money);  
			$("#rate").html(rate); 
			$("#todayIncome").html(todayIncome); 
			$("#tenThousandIncome").html(tenThousandIncome);   
			$("#syed").html(availableMoneyLeft); 
			$("#unconfirm_money").html(unconfirmMoney);
			$("#confirm_money").html(confirmMoney);
			$("#conversion_progress").html(conversionProgress+'%');
			
			if(isRedeem > 0){ //已经取出过 不需要阅读协议
				$("#readme").attr("checked","true");
			}
            if(isReply > 0){ //已经存入过 不需要阅读协议
            	$("#readme2").attr("checked","true");  
			}  
            
        	initIncomeStatistics(data.sumIncome);
		}
	});
}  

/**
 * 收益 
 * @param limit 显示条数
 */
function income(limit){
	$.ajax({
		url : '/v2/xincunbao/get_daily_income.jso?limit='+limit,   
		type : 'post',
		dataType : 'json',
		success : function(data) {
			$("#shouyiTB").html("");
			for(var d in data){
				var time = data[d].time;
				var income = data[d].income; 
				var tr = $("<tr><td width='92'>"+getLocalTime(time)+"</td><td width='92'>"+income+"元</td></tr>");  
				$("#shouyiTB").append(tr);  
			}    
		}  
	});   
} 

/**
 * 交易记录
 * @param limit 显示条数
 */
function tradeRecord(limit){
	$.ajax({
		url : '/v2/xincunbao/get_buy_redeem_info.jso?limit='+limit,     
		type : 'post',
		dataType : 'json',
		success : function(data) {
			$("#jiaoyijiluTB").html("");
			for(var d in data){
				var money = data[d].money+"元";
				var type = data[d].type == 0 ? "存入" : "转出";  
				var tradeTime = data[d].tradeTime; 
				var status = data[d].status;  
				var time = getLocalTimeStamp(tradeTime);  
 				if(status == 0){
					type = "<span style='color:red'>"+type + "(未完成)</span>";    
					money = "<span style='color:red'>"+money + "</span>";   
					time = "<span style='color:red'>"+time + "</span>"; 
				}
				var tr = $("<tr><td width='100' >"+type+"</td><td width='200'>"+money+"</td><td>"+time+"</td></tr>");    
				$("#jiaoyijiluTB").append(tr);      
			}         
		}   
	});     
}

/**
 * 时间戳转换成日期(日期小于9的自动补0) 
 * @param nS 
 * @returns {String}
 */
function getLocalTime(nS) {      
	var d = new Date(parseInt(nS) * 1000);   
	var year = d.getFullYear() < 10 ? "0"+d.getFullYear() : d.getFullYear();
	var month = d.getMonth()+1 < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);  
	var day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();  
	return  year+"-"+month+"-"+day;       
}

function getLocalTimeStamp(nS) {     
	var d = new Date(parseInt(nS) * 1000);   
	var year = d.getFullYear() < 10 ? "0"+d.getFullYear() : d.getFullYear();
	var month = d.getMonth()+1 < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);  
	var day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();  
	var hour = d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
	var minute = d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
	var second = d.getSeconds() < 10 ? "0"+d.getSeconds() : d.getSeconds();       
	return  year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;              
}

function initAssetOverview(){
	AA.Api.async({
		url:'/v2/member/get_asset_overview.jso' ,
		type:'GET' ,
		data:'' ,
		success:function(result){
			var all=Number(result.accountBalance)+Number(result.xcbTotalMoney)+Number(result.rewardMoney)+Number(result.earning)+Number(result.moneyWithdraw)+Number(result.overdue);
     	
			$('#all').html(AA.Helper.commafy(AA.Helper.toCent(all)));
			$('#t_money').html(AA.Helper.commafy(AA.Helper.toCent(result.accountBalance)));
			$('#xcb_money').html(result.xcbTotalMoney);
			$('#all_reward').html(AA.Helper.commafy(AA.Helper.toCent(result.rewardMoney)));
			$('#earn').html(AA.Helper.commafy(AA.Helper.toCent(result.earning)));
			$('#withdraw').html(AA.Helper.commafy(AA.Helper.toCent(result.moneyWithdraw)));
			$('#overdue').html(AA.Helper.commafy(AA.Helper.toCent(result.overdue)));
		}
	});
}

function initIncomeStatistics(xcb_total_income){
	AA.Api.async({
		url:'/v2/member/get_invest_income_statistics.jso' ,
		type:'GET' ,
		data:'' ,
		success:function(result){
			$('#earn_recharge_recharge').html(AA.Helper.commafy(AA.Helper.toCent(result.recharge)));
			$('#earn_recharge_ct').html(result.rechargeNum);
	 
    	 
			$('#earn_withdraw_withdraw').html(AA.Helper.commafy(AA.Helper.toCent(result.withdraw)));
			$('#earn_withdraw_ct').html(result.withdrawNum);
			$('#earn_withdraw_fee').html(AA.Helper.commafy(AA.Helper.toCent(result.withdrawFee)));
     	
     	
			$('#earn_invest_invest').html(AA.Helper.commafy(AA.Helper.toCent(result.invest)));
			$('#earn_invest_ct').html(result.investNum);
			$('#earn_invest_ag').html(AA.Helper.commafy(AA.Helper.toCent(result.investAvg)));
     	
			var earn_all=Number(result.receivedRetain)+Number(xcb_total_income)+Number(result.profitingRetain)+Number(result.deductedReward);
    	
			$('#earn_all').html(AA.Helper.commafy(AA.Helper.toCent(earn_all)));
    	
			$('#earn_back').html(AA.Helper.commafy(AA.Helper.toCent(result.receivedRetain)));
    	
			$('#earn_earn').html(AA.Helper.commafy(AA.Helper.toCent(result.profitingRetain)));
    	
			$('#xcb_total_income').html(xcb_total_income);
    	
			$('#reward_use').html(AA.Helper.commafy(AA.Helper.toCent(result.deductedReward)));
		}
	});
}

/**
 * 获得时间段
 * @returns {String}
 */
function getTimeQuantum(){
	var helloStr=""; 
	var now = new Date();
	var hour = now.getHours() 
	if(hour < 6){helloStr = "凌晨好，"} 
	else if (hour < 9){helloStr = "早上好，"} 
	else if (hour < 12){helloStr = "上午好，"} 
	else if (hour < 14){helloStr = "中午好，"} 
	else if (hour < 17){helloStr = "下午好，"} 
	else if (hour < 19){helloStr = "傍晚好，"} 
	else if (hour < 22){helloStr = "晚上好，"} 
	else {helloStr = "夜里好，"}  
	return helloStr ;
}

function close_yuecunru(){
    $("#tool01").next().hide(); 
}
function close_zhuanchu(){
    $("#tool02").next().hide(); 
}
function close_shouyi(){
    $("#tool03").next().hide(); 
}
function close_tradelist(){
    $("#tool04").next().hide(); 
}
function close_knowmore(){
    $("#tool05").next().hide(); 
}
function toFixed(number ,fractionDigits) {
    var _fractionDigits = fractionDigits || 2;
    with (Math) {
        return floor(number * pow(10 ,_fractionDigits)) / pow(10 ,_fractionDigits);
    }
} 

function zhimaScore(){
	$.ajax({
		url:'/v2/alipaycredit/zhima_score.jso',
		dataType:'json',
		type:'post',
		success:function(result){
			var _html='';
			/*if(result.state==0 && result.score>0){
			
				var nowTime = new Date().getTime()/1000;
				if(nowTime - result.scoreObtainTime > 5184000){//距离当前时间大于两个月，分数过期了，提醒用户
					_html = '<span style="font-size:18px;">我的芝麻分：<span class="blue" style="text-decoration:underline;">'+result.score+'</span> 分</span><span class="gray">（来源芝麻信用）</span><p><a href="javascript:alicreditAuthorize()" class="blue" style="text-decoration:underline;">授权并更新</a></p>';
				}else{
					var exceedingRate = result.exceedingRate;
					exceedingRate = parseInt(exceedingRate);
					if(exceedingRate<50){
						exceedingRate=50;
					}
					
					_html = '<span style="font-size:18px;">我的芝麻分：<span class="blue" style="text-decoration:underline;">'+result.score+'</span> 分</span><span class="gray">（来源芝麻信用）</span><p class="gray" style="display:none">您已超过平台 <span class="red">'+exceedingRate+'%</span> 的用户</p>';
				}
				
			}else{
				_html = '<div style="position: relative;"><span style="font-size:18px;">我的芝麻分：<a href="javascript:alicreditAuthorize()" class="blue" style="text-decoration:underline;">0</a> 分</span><span class="gray">（来源芝麻信用）</span><div id="bubble" style="position: absolute;left: 50px;top: -54px; background: url(/s/images/my/01.png) no-repeat; width: 79px; height: 62px; text-align: center; font-size:12px; padding-top:5px;">0分？</br>点击刷新</div></div>';
			}*/
			
			_html = '<span style="font-size:18px;">我的芝麻分： </span><a href="javascript:alicreditAuthorize()" class="blue" style="text-decoration:underline;font-size: 14px;">点击查询</a>';
			
			$("#zhimaScore").html(_html);
		}
	});
}

function alicreditAuthorize(){
	$.ajax({
		url:'/v2/member/identity_and_mobile_check.jso',
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.state==0){
				if(result.mobileCheck==0){
	            	$.alert({
	            		title:'您尚未进行手机认证！' ,
		             	content:'请先完成手机认证' ,
		             	txtBtn:'手机认证' ,
		             	url:'/2.0/views/account/account_settings.shtml'
	            	});
	            	return;
				}
				
				if(result.identityCheck==0){
					$.alert({
						title:'您尚未进行实名认证！' ,
						content:'请先完成实名认证' ,
						txtBtn:'实名认证' ,
						url:'/2.0/views/account/account_settings.shtml'
					});
					return;
				}
				
				//window.location.href="https://openauth.alipay.com/oauth2/authorize.htm?client_id=2014060300006281";
				window.location.href = '/v2/alipaycredit/zhima_authorize.jso?view=web&state=https://www.xinrong.com/2.0/ali_callback.html';
			}
		}
	});
}