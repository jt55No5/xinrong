/**
 * 话费充值js
 */
var fare = {
	dd:undefined,//窗口1
	dd2:undefined,//窗口2
	dd3:undefined,//窗口3
	default_money:100,//默认充值100块钱
	user_info:undefined,
	error_info_1:'<i class="icon02"></i><span>您所在地区暂时无法充值，敬请期待！</span>',
	error_info_2:'<i class="icon02"></i><span>系统繁忙</span>',
	error_info_3:'<i class="icon02"></i><span>对不起,您还没有通过实名认证</span>',
	interval:undefined,//窗口3 充值成功的定时器
	charge:function(){
		$.ajax({
			url:'/v2/charge/get_fare_recharge_info.jso',
			type:'POST' ,
			dataType:'json',
			success:function (data) {
				if(data.state == 1009){
					AA.RapidLogin.popup(); 
					return;
				}
				fare.user_info = data;
				$("#step_1_mobile").html(data.mobile);
				$("#step_1_totalmoney").html(data.money);
		        	 
				if(data.status == 0){
					$("#step_1_area").html(data.province + data.operator);
				}else if(data.status == -1){
					$("#step_1_error_info").html(fare.error_info_3);
				}else if(data.status == -2){
					$("#step_1_error_info").html(fare.error_info_1);
				}else {
					$("#step_1_error_info").html(fare.error_info_2);
				}
				fare.default_money = 100;//每次打开 默认余额还原
				if(fare.default_money > data.money){//余额不足
					$("#step_1_error_info").html('<i class="icon02"></i>账户余额不足，请及时<a target="_blank" href="/my/recharge" class="blue">充值</a>');
				}else{
					$("#step_1_error_info").html('');
				}
		        	 
				var isOpen = data.isOpen;
		        	 
				if(isOpen == 1){//送积分活动开启  动态计算积分
					var sendScore = fare.culSendScore();
					if(sendScore > 0){
						$("#step_1_send_score").html('支付成功将赠送<span class="red">'+sendScore+'</span>积分，即时到账');
					}
				}
		        	 
				fare.dd = $.popup({ 
					title:'手机充值',
					padding:'0',
					content:$('#step_1').html(), 
					initialize:function () {
					}
				}); 
			} 
		}); 
	}, 
	toCentHalfUp:function(number){
		return ( 1.00 * parseInt(number*100+0.5) )/100;
    }, 
	commit:function(){
		if(this.user_info.status == 0){
			if(parseFloat(this.default_money) > this.user_info.money){//余额不足
		    	$("#step_1_error_info").html('<i class="icon02"></i>账户余额不足，请及时<a target="_blank" href="/my/recharge" class="blue">充值</a>');
		    	return;
		    }else{
		    	$("#step_1_error_info").html('');
		    }
			
			this.dd.close();
			this.dd = undefined;
			$("#step_2_mobile").html(this.user_info.mobile);
			$("#step_2_money").html(this.default_money);
			//初始化验证码
			this.dd2 = $.popup({
            	title:'支付',
            	padding:'0',
            	content:$('#step_2').html(), 
            	initialize:function () {
            		fare.loadpage();
            	}
            });
		}else{ 
			$("#step_1_error_info").html(this.user_info.errorInfo).attr("style","display:block");
		}
	},
	culSendScore:function(){
		if(this.user_info == undefined )
			return 0;
		var sendScore = parseFloat(this.user_info.vipCoefficient) * parseFloat(this.default_money);
		if(this.user_info.isFirstSend == 1 && parseInt(this.default_money) >= 100){ 
			return sendScore + 1000;
		}
		return this.toCentHalfUp(sendScore);
	},
	culScore:function(){
		if(this.user_info == undefined)
			return;
	    var val = $("#step_1_money option:selected").val();
	    this.default_money = val;
	    
	    if(this.user_info.isOpen != 1)
			return;
	    var sendScore = this.culSendScore();
	    $("#step_1_send_score").html('支付成功将赠送<span class="red">'+sendScore+'</span>积分，即时到账');
	    
	    if(parseFloat(val) > this.user_info.money){//余额不足
	    	$("#step_1_error_info").html('<i class="icon02"></i>账户余额不足，请及时<a target="_blank" href="/my/recharge" class="blue">充值</a>');
	    	return;
	    }else{
	    	$("#step_1_error_info").html('');
	    }
	},
	loadpage:function(){
		$('.d-dialog #img-captcha').unbind('click').click(function(){
			fare.getCaptcha();
		});
		fare.getCaptcha();
		$(document).keyup(function(e) {
			var curKey = e.keyCode;
			if (curKey == 13) {
				fare.submit(); 
			}
		});
	},
	getCaptcha:function(){
		var seed = new Date().getTime();
		$('.d-dialog #img-captcha').attr('src','/v2/login/get_captcha.raw?seed='+seed);
		$('.d-dialog #seed').val(seed);
	},
	submit:function(){
		if($("#fare_commit").html() == "提交中..."){
			return;
		}
		
		var _seed = $("#seed").val();
		var _captcha = $("#captcha").val();
		var _tradePwd = $("#tradePwd").val();
		var _rechargeMoney = this.default_money;
		var _mobilePhone = $("#step_2_mobile").html(); 
		
		$("#fare_commit").html("提交中...");
		
		$.ajax({
			url:'/v2/charge/mobile_fare_recharge.jso',
			type:'POST' ,
	    	dataType:'json',
	    	data:{captcha:_captcha,seed:_seed,tradePwd:AA.Helper.encrypPw(_tradePwd),rechargeMoney:_rechargeMoney},
	    	success:function (data) {
	    		var state = data.state;
	    		if(state == 0){
	    			fare.dd2.close();
	    			fare.dd3 = $.popup({ 
	    				title:'提示',
	    				padding:'0',
	    				content:$('#step_3').html(), 
	    				initialize:function () {
	    				}
	    			}); 
	    			fare.bindStep3Event();//绑定窗口5秒后自动关闭事件
	    			return;
	    		}else if(state == 1007){//交易密码错误
	        		$("#step_2_error_info").html('<i class="icon02"></i>交易密码错误</span>');
	        	}else if(state == 2010){//验证码错误
	        		$("#step_2_error_info").html('<i class="icon02"></i>验证码错误</span>');
	        	}else if(state == 2001){
	        		$("#step_2_error_info").html('<i class="icon02"></i>账户余额不足，请及时<a target="_blank" href="/my/recharge" class="blue">充值</a></span>');
	        	}else if(state == 3001 || state == 4001 || state == 1001 || state == 1003 
	        			|| state == 2000 || state == 4444 || state == 3002 || state == 5001){
	        		$("#step_2_error_info").html('<i class="icon02"></i>'+data.msg+'</span>');
	        	}else if(state == 4002){
	        		$("#step_2_error_info").html('<i class="icon02"></i>本期手机充值额度已满，请您期待下一期</span>');
	        	}else{
	        		$("#step_2_error_info").html('<i class="icon02"></i>系统繁忙，请您稍后再试！</span>');
	        	}
	    		$("#fare_commit").html("确认支付");
	        	fare.getCaptcha();
	    	} 
		});
	},
	bindStep3Event:function(){
		$("#step_3_second").html(5);
		this.interval = window.setInterval(function(){
			fare.intervalEvent();
		},1000); 
	},
	intervalEvent:function(){
		var second = parseInt($("#step_3_second").html());
		second = second - 1;  ;
		$("#step_3_second").html(second);  
		if(second == 0){
			window.clearInterval(this.interval);
			this.dd3.close();
		}
	}
};