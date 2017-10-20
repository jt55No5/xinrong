/**
 * @author    : aNd1coder
 * @overview  : AA基础类库
 * @update    : $Id: AA.base.js 2264 2013-05-23 10:16:54Z and1coder $
 */

/**
 * AA全局对象
 * @type {*}
 */
var AA = AA || {};

/**
 * 文本信息
 * @type {Object}
 */
AA.Lang = {
    //{Product} - 产品相关
    'PRODUCT_NAME':'信<i class="g-dian">·</i>无忧贷' ,// 产品名称
    
    //{Server Error Code}
    Error:{
        '-1':'查询失败' ,
        '-2':'暂无数据' ,
        '1000':'非法输入，请重试' ,
        '1005':'系统错误，请重试' ,
        '1008':'系统错误，请重试' ,
        '1009':'登录已超时，请<a href="javascript:;" class="blue">重新登录</a>' ,
        '1101':'系统错误，请重试' ,
        '1020':'此次提交已过期，请重新尝试<a href="/2.0/views/account/back_password.shtml">找回密码</a>' ,
        '1139':'系统错误，请重试' ,
        '1140':'系统错误，请重试' ,
        '1147':'您已提交过申请，请勿重复提交' ,
        '2000':'验证码错误' ,
        '2001':'两次输入密码不一致' ,
        '2002':'用户名已被注册' ,
        '2003':'邮箱已被注册' ,
        '2005':'账户名或密码错误' ,
        '2006':'账户未激活' ,
        '2007':'账户存在异常' ,
        '2008':'交易密码错误' ,
        '2009':'交易密码未设置' ,
        '2010':'提现失败' ,
        '2011':'手机号码不合法!' ,
        '2012':'该手机号码已被占用' ,
        '2013':'发送手机验证码失败' ,
        '2014':'手机验证码错误' ,
        '2015':'身份证号码不合法' ,
        '2016':'真实姓名不合法' ,
        '2017':'该用户已认证过身份证' ,
        '2018':'该身份证号码已被占用' ,
        '2019':'银行名称不合法' ,
        '2020':'开户行省份不合法' ,
        '2021':'开户行城市不合法' ,
        '2022':'开户行地区不合法' ,
        '2023':'开户行支行名称不合法' ,
        '2024':'银行卡号格式不正确' ,
        '2025':'只有通过实名认证后才能进行银行卡认证' ,
        '2026':'银行卡号已被认证' ,
        '2027':'添加银行卡认证记录失败' ,
        '2028':'生成银行卡认证打款流水号失败' ,
        '2029':'更新银行卡认证打款流水号失败' ,
        '2030':'银行卡认证记录不存在' ,
        '2031':'银行卡认证记录状态不是打款成功' ,
        '2032':'银行卡认证打款金额输入错误' ,
        '2033':'更新银行卡认证记录失败' ,
        '2034':'身份证认证失败' ,
        '2035':'添加身份证认证记录失败' ,
        '2036':'邮箱不合法' ,
        '2037':'发送邮件失败' ,
        '2038':'登录密码错误' ,
        '2039':'新登录密码不合法' ,
        '2040':'新登录密码不能与旧登录密码相同' ,
        '2041':'登录密码不能与交易密码相同' ,
        '2042':'新交易密码不合法' ,
        '2043':'新交易密码不能与旧交易密码相同' ,
        '2044':'注册账户名包含敏感字符' ,
        '2045':'设置交易密码必须通过邮箱认证' ,
        '2046':'设置交易密码必须通过手机认证' ,
        '2047':'您的账户余额不足' ,
        '2048':'此用户名不存在' ,
        '2049':'发送邮件失败' ,
        '2050':'发送短信失败' ,
        '2051':'消息接收过于频繁' ,
        '2052':'账户名与邮箱不匹配' ,
        '2053':'用户邮箱未通过认证' ,
        '2054':'账户名与手机号码不匹配' ,
        '2055':'用户手机未通过认证' ,
        '2056':'发送消息失败' ,
        '2057':'未满18周岁不能通过实名认证' ,
        '2058':'设置交易密码必须通过实名认证' ,
        '2059':'用户名必须跟前登录用户名一致' ,
        '2060':'身份证认证失败次数过多' ,
        '2061':'扣费失败,请重新认证' ,
        '2065':'扣费失败,请重新认证' ,
        '2070':'每日自动投资上限不能高于' ,
        '2071':'每日自动投资上限不能低于' ,
        '2073':'该用户不存在' ,
        '2074':'实名认证服务异常，请稍后重试' ,
        '2075':'每日投资上限不能高于10W',
        //VIP
        '3019':'不能邀请自己' ,
        //活动
        '4001':'活动不存在' ,
        '4002':'活动状态为非进行中' ,
        '4003':'活动还没有开始' ,
        '4004':'此活动已结束，敬请期待下一轮！' ,
        '4005':'您今日的抽奖次数已达上限，明天再来试试吧。' ,
        '4006':'积分不足,无法参加此活动' ,
        '4007':'用户扣除活动积分失败' ,
        '4008':'默认奖品已发完,未中奖' ,
        '4009':'无默认奖品,未中奖' ,
        '4010':'用户未中奖' ,
        '4011':'发送奖品失败'
        	
    }
};

/**
 * 辅助方法
 * @type {Object}
 */
AA.Helper = {
    /**
     * 和PHP一样的时间戳格式化函数
     * @ref    http://ht19820316.blog.163.com/blog/static/339552332012423454937/
     * @param  {int}    timestamp 要格式化的时间戳
     * @param  {string} format    格式
     * @return {string}           格式化的时间字符串
     */
    date:function (timestamp ,format) {
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
    } ,
    /**
     * 时间转换成时间戳
     * @param date
     * @return {String}
     */
    timespan:function (date) {
        var new_str = date.replace(/:/g ,'-');
        new_str = new_str.replace(/ /g ,'-');
        var arr = new_str.split('-');

        var datum = new Date(Date.UTC(arr[0] ,arr[1] - 1 ,arr[2] ,arr[3] - 8 ,arr[4] ,arr[5]));
        return datum.getTime() / 1000;
    } ,
    /**
     * 倒计时
     * @return {Boolean}
     */
    countDown:function () {
        var _nowtime = new Date().getTime(),
            _second = Math.round(lefttime - (_nowtime - begintime) / 1000);

        if (_second < 0) {
            if (timer) {
                clearTimeout(timer);
            }
            $(".countdown,.wgt-datagrid .ico2").hide();
            $('body').addClass('activity-end');
            $('#btn-lottery').addClass('disabled');
            return false;
        }

        var _day = _second / (24 * 60 * 60)
        var _day = Math.floor(_day); 				//相差的总天数
        _second = _second - _day * 24 * 60 * 60; 	//抛去相差天数后的秒数
        var _hour = (_second / (60 * 60));
        var _hour = Math.floor(_hour); 			    //相差的小时数
        var _second = _second - _hour * 60 * 60;  	//抛去相差小时后的秒数
        var _min = _second / 60;
        var _min = Math.floor(_min); 				//相差的分钟数
        var _second = _second - _min * 60; 			//抛去相差分钟后的秒数
        var _sec = _second;
        _day = (_day + "").length == 1 ? "0" + _day : _day;
        _hour = (_hour + "").length == 1 ? "0" + _hour : _hour;
        _min = (_min + "").length == 1 ? "0" + _min : _min;
        _sec = (_sec + "").length == 1 ? "0" + _sec : _sec;

        $(".countdown span").html(_day + "天 " + _hour + ":" + _min + ":" + _sec);

        timer = setTimeout(AA.Helper.countDown ,1000);
    } ,
    /**
     * 构建url
     * @param url       页面连接
     * @param domain    域名(默认www)
     * @return {String} 拼接后的连接
     */
    buildUrl:function (url ,domain) {
        var domain = domain || G_ENV_VAR.WWW;
        return domain + url;
    } ,
    /**
     * 构建ajax请求
     * @param action
     * @return {*}
     */
    ajaxAction:function (action) {
        return AA.Helper.buildUrl('ajax/' + action);
    } ,
    /**
     * 根据错误代码构建错误信息
     * @param errorCode     错误代码
     */
    buildError:function (errorCode) {
        return AA.Lang.Error[errorCode + ''];
    } ,
    /**
     * 根据邮箱地址构建邮箱服务器网址
     * @param email
     * @return {String}
     */
    buildEmailUrl:function (email) {
        var url = '',
            emails = {
                'qq.com':'http://mail.qq.com/' ,
                'vip.qq.com':'http://mail.qq.com/' ,
                'gmail.com':'http://mail.google.com/' ,
                'sina.com':'http://mail.sina.com.cn/' ,
                '163.com':'http://mail.163.com/' ,
                '126.com':'http://mail.126.com/' ,
                'yeah.net':'http://www.yeah.net/' ,
                'sohu.com':'http://mail.sohu.com/' ,
                'tom.com':'http://mail.tom.com/' ,
                'sogou.com':'http://mail.sogou.com/' ,
                '139.com':'http://mail.10086.cn/' ,
                'hotmail.com':'http://www.hotmail.com/' ,
                'live.com':'http://login.live.com/' ,
                'live.cn':'http://login.live.cn/' ,
                'live.com.cn':'http://login.live.com.cn' ,
                '189.com':'http://webmail16.189.cn/webmail/' ,
                'yahoo.com.cn':'http://mail.cn.yahoo.com/' ,
                'yahoo.cn':'http://mail.cn.yahoo.com/' ,
                'eyou.com':'http://www.eyou.com/' ,
                '21cn.com':'http://mail.21cn.com/' ,
                '188.com':'http://www.188.com/' ,
                'foxmail.coom':'http://www.foxmail.com/' ,
                'outlook.com':'http://www.outlook.com/'
            },
            domain = email.split('@')[1];

        $.each(emails ,function (k ,v) {
            if (k == domain) {
                url = v;
            }
        });

        url = url == '' ? 'http://mail.' + domain : url;

        return url;
    } ,
    /**
     * 获取中英文字符串长度
     * @param s
     * @return {Number}
     */
    getLength:function (s) {
        return s.replace(/[^\x00-\xff]/g ,"aa").length;
    } ,
    /**
     * 银行卡格式化
     * @param bankCard
     * @return {String|XML}
     */
    formatBankCard:function (bankCard) {
        return bankCard.replace(/\s/g ,'').replace(/(\d{4})(?=\d)/g ,"$1 ")
    } ,
    /**
     * 格式化小数
     * @param input      输入
     * @param len        保留小数位数
     * @return {String}
     */
    formatDecimals:function (input ,len) {
        if (input != '' && input != '0') {
            //小数点处理
            var len = len || 2,
                _index = input.indexOf('.'),
                _decimals = input.split('.')[1],
                _len;

            _decimals = _decimals || '';
            _len = _decimals.length;
            input = _len > len ? input.substring(0 ,_index + len + 1) : input;
        }
        return parseFloat(input);
    } ,
    /**
     * 保留2位小数 (小于1分进位)
     * @param number            数字
     * @param fractionDigits    小数位
     */
    toFixed:function (number ,fractionDigits) {
        var _fractionDigits = fractionDigits || 2;
        with (Math) {
            return ceil(number * pow(10 ,_fractionDigits)) / pow(10 ,_fractionDigits);
        }
    } ,
    toCent:function (number) {
    	return (1.00*parseInt(number*100+0.00001))/100;
    } ,
    toCentHalfUp:function(number){
    	return (1.00*parseInt(number*100+0.5))/100;
    },
    /**
     * 取区间段随机数
     * @param from   最小数
     * @param to     最大数
     */
    getRandom:function (from ,to) {
        return Math.round(Math.random() * (to - from) + from);
    } ,
    /**
     * 禁用按钮
     * @param btn
     */
    disabled:function (btn ,type) {
        var _type = type || 'orange';
        $(btn).attr('disabled' ,true).removeClass('ui-button-' + _type).addClass('ui-button-disabled');
        return $(btn);
    } ,
    /**
     * 激活按钮
     * @param btn
     */
    enabled:function (btn ,type) {
        var _type = type || 'orange';
        $(btn).attr('disabled' ,false).removeClass('ui-button-disabled').addClass('ui-button-' + _type);
        return $(btn);
    } ,
    /**
     * 检测密码强度
     * @ref     http://www.oschina.net/code/snippet_188148_6955
     * @param   input         输入
     * @return  {Number}     评分
     */
    checkStrength:function (input ,el) {
        var score = 0,
            _el = el || 'strength',
            _strength = document.getElementById(_el);

        if (input.length >= 6) {
            if (/[a-zA-Z]+/.test(input) && /[0-9]+/.test(input) && /\W+\D+/.test(input)) {
                score = 3;
            } else if (/[a-zA-Z]+/.test(input) || /[0-9]+/.test(input) || /\W+\D+/.test(input)) {
                if (/[a-zA-Z]+/.test(input) && /[0-9]+/.test(input)) {
                    score = 2;
                } else if (/\[a-zA-Z]+/.test(input) && /\W+\D+/.test(input)) {
                    score = 2;
                } else if (/[0-9]+/.test(input) && /\W+\D+/.test(input)) {
                    score = 2;
                } else {
                    score = 1;
                }
            }
        } else {
            score = 0;
        }

        switch (score) {
            case 1:
                _strength.className = 's1';
                break;
            case 2:
                _strength.className = 's2';
                break;
            case 3:
                _strength.className = 's3';
                break;
            default:
                _strength.className = '';
        }
    },
    filterScript:function(str){
    	//<script.*?>.*?</script>
    	
    	var reg="<script.*?>.*?</script>";
    	
    	return str.replace(reg ,'');
    	
    },
    //格式化千分位
    commafy:function(num){
    	
    	   if((num+"")==""){
    	      return"";
    	   }
    	   if(isNaN(num)){
    	      return"";
    	   }
    	   num = num+"";
    	   if(/^.*\..*$/.test(num)){
    	      var pointIndex =num.lastIndexOf(".");
    	      var intPart = num.substring(0,pointIndex);
    	      var pointPart =num.substring(pointIndex+1,num.length);
    	      intPart = intPart +"";
    	       var re =/(-?\d+)(\d{3})/
    	       while(re.test(intPart)){
    	          intPart =intPart.replace(re,"$1,$2")
    	       }
    	      num = intPart+"."+pointPart;
    	   }else{
    	      num = num +"";
    	       var re =/(-?\d+)(\d{3})/
    	       while(re.test(num)){
    	          num =num.replace(re,"$1,$2")
    	       }
    	   }
    	    return num;
    },
    countLeftDeadline:function(b_time,o_ptime){
    	
    	var p_time=new Date(o_ptime*1000);
    	
    	p_time.setHours(0);
    	
    	p_time.setMinutes(0);
    	
    	p_time.setSeconds(0);
    	
    	p_time.setMilliseconds(0);

    	//b_time=b_time+86400000;
    	
		var cur_time=new Date(b_time);
		
		cur_time.setHours(0);
    	
		cur_time.setMinutes(0);
    	
		cur_time.setSeconds(0);
    	
		cur_time.setMilliseconds(0);

		var months=((p_time.getYear() - cur_time.getYear())*12+(p_time.getMonth()- cur_time.getMonth()))+1;
		var d=0;
		
		for(; months >= 0; months--){
			var tmp_time=new Date(cur_time.getTime());
			var tmpDay = tmp_time.getDate();
			tmp_time.setMonth(tmp_time.getMonth()+months);
			
			if (tmpDay ==  tmp_time.getDate()){
				tmp_time.setDate(tmp_time.getDate()-1);
			}
				
			d = parseInt((p_time.getTime()-tmp_time.getTime())/86400000);;
			if (d < 0) {
				continue;
			}else{
				break;
			}
			
			
		}
		
		return new Array(months,d);
    	
    },
    subInvestSn:function(sn){
    	

		if(sn.length>=18){

			var pre=sn.substr(3,6);
			var last=sn.substr(sn.length-3);
			sn=pre+'..'+last;
		}else{
			
			var pre=sn.substr(0,6);
			var last=sn.substr(sn.length-3);
			sn=pre+'..'+last;
		}
		
		return sn;
    },
    RSA_PUB_KEY_NUM : '10001',
	RSA_PUB_MODULE : 'bafdbbf02c2da5125a921e59d4f5b3cdfb96172b8f75f2736b843ad78fb6d9cabc0fb64147c7b5a531f713123ff6dc33dc904f700a25c932e9a1d0bfdf5d3b609d6456c82922a54c75a085b0f117c7e1031acc33683895bf84b921acdd7df0f776694c3ef38d4cc27cd30feb4d90268179f5b1a789234f96cc14c70a2627f1a1',
	encrypPw : function(pw) {
		RSA.setMaxDigits(131);
	    var key = new RSA.RSAKeyPair(// public,private,module
	    		AA.Helper.RSA_PUB_KEY_NUM, "",AA.Helper.RSA_PUB_MODULE
	    );
		return RSA.encrypt(key, pw);
	},
    getTradeTypeStr:function(roleType, tradeType){
		if(roleType==1){
			switch(tradeType){
			case 1: return '充值';

			case 2: return '提现';

			case 3: return '购买vip';

			case 4: return '提现驳回';

			case 5: return '礼金抵扣';

			case 6: return '银行卡认证';

			case 7: return '提现手续费';
			
			case 8: return '实名认证';
			
			case 9: return '投资服务费';
			
			case 10:return '积分补偿金';
			
			case 11:return '话费充值/退款';
			
			case 20:return '转让结算金额';
			
			case 21:return '转让结算利息';
			
			case 22:return '转让服务费';
			
			default:return '其他';
			
			}
		}else if(roleType==2){
			switch(tradeType){
			
			case 1: return '投资';

			case 2: return '回款本金';

			case 3: return '礼金赠送';

			case 4: return '礼金回收';

			case 5: return '礼金抵扣';

			case 6: return '信存宝存入';

			case 7: return '信存宝转出';
			
			case 23:return '回款利息';
			
			case 24:return '投资服务费';
			
			default:return '其他';
			}
		}else if(roleType==3){
			switch(tradeType){
			
			case 1: return '信用借款';

			case 2: return '信用还款';
			
			case 3: return '正常融资服务费';
			
			case 4: return '逾期融资服务费';
			
			default:return '其他';
			}
		}else if(roleType==4){
			switch(tradeType){
			
			case 1: return '正常融资服务费';

			case 2: return '逾期融资服务费';
			
			case 3: return '逾期罚息';
			
			case 4: return 'VIP会员费费';
			
			case 5: return '垫付金支出';
			
			case 6: return '垫付金收入';
			
			case 7: return '还款差额';
			
			case 8: return '其他';
			
			case 9: return '提现手续费';
			
			case 10: return '认证打款额';
			
			case 11: return '银行卡认证认证手续费';
			
			case 12: return '投资服务费';
			
			case 13: return '开通VIP返现';
			
			case 14: return '邀请好友开通VIP';
			
			case 15: return '奖励';
			
			case 16: return '生日礼金';
			
			case 17: return 'VIP升级奖金';
			
			case 18: return '实名认证手续费';
			
			case 19: return '银行卡认证打款失败';
			
			case 20: return '投资基金回收';
			
			default:return '其他';
			}
		}else if(roleType==5){
			switch(tradeType){
			
			case 1: return '担保费';
			
			default:return '其他';
			}
		}else{
			return '其他';
		}
	}
};

/**
 * 简易模版
 * @type {Object}
 * @ref  http://ejohn.org/blog/javascript-micro-templating/
 *       http://rocwang.me/js-template/
 */
AA.Tpl = {
    cache:{} ,
    render:function (tpl ,data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(tpl) ?
            AA.Tpl.cache[tpl] = AA.Tpl.cache[tpl] ||
                AA.Tpl.render(document.getElementById(tpl).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj" ,
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    tpl
                        .replace(/[\r\t\n]/g ," ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g ,"$1\r")
                        .replace(/\t=(.*?)%>/g ,"',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    }
}

/**
 * 验证
 * @type {Object}
 * @ref http://hi.baidu.com/wangdawei2010/item/78921908ccd52b30f3eafcb1
 */
AA.Validator = {
    /**
     * 验证邮箱地址
     * @param input         输入
     * @return {Boolean}    验证结果
     */
    checkEmail:function (input) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(input);
    } ,
    /**
     * 验证手机号码
     * @param input         输入
     * @return {Boolean}    验证结果
     */
    checkMobile:function (input) {
        return /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])[0-9]{8}$/.test(input);
    } ,
    /**
     * 身份证验证
     * @param input
     * @return {*}
     */
    checkIDCard:function (input) {
        var idNum = input,
            errors = new Array(
                "验证通过" ,
                "身份证号码位数不对" ,
                "身份证含有非法字符" ,
                "身份证号码校验错误" ,
                "身份证地区非法"
            ),
            re, //身份号码位数及格式检验
            len = idNum.length,
            idcard_array = new Array();

        //身份证位数检验
        if (len != 15 && len != 18) {
            return errors[1];
        } else if (len == 15) {
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
        } else {
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/);
        }
        var area = { 11:"北京" ,12:"天津" ,13:"河北" ,14:"山西" ,
            15:"内蒙古" ,21:"辽宁" ,22:"吉林" ,23:"黑龙江" ,31:"上海" ,
            32:"江苏" ,33:"浙江" ,34:"安徽" ,35:"福建" ,36:"江西" ,
            37:"山东" ,41:"河南" ,42:"湖北" ,43:"湖南" ,44:"广东" ,
            45:"广西" ,46:"海南" ,50:"重庆" ,51:"四川" ,52:"贵州" ,
            53:"云南" ,54:"西藏" ,61:"陕西" ,62:"甘肃" ,63:"青海" ,
            64:"宁夏" ,65:"新疆" ,71:"台湾" ,81:"香港" ,82:"澳门" ,
            91:"国外"
        }

        idcard_array = idNum.split("");
        //地区检验
        if (area[parseInt(idNum.substr(0 ,2))] == null) {
            return errors[4];
        }
        //出生日期正确性检验
        var a = idNum.match(re);
        if (a != null) {
            /*if (len == 15) {
                var DD = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var flag = DD.getYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[5];
            }
            else if (len == 18) {
                var DD = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var flag = DD.getFullYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[5];
            }
            if (!flag) {
                //return false;
                return "身份证出生日期不对！";
            }*/
            //检验校验位
            if (len == 18) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y ,1); //判断校验位
                //检测ID的校验位
                if (M == idcard_array[17]) {
                    return "1";
                }
                else {
                    //return false;
                    return errors[3];
                }
            }
        } else {
            //return false;
            return errors[2];
        }
        return true;
    } ,

    /**
     * 银行卡验证
     * Luhm校验规则：16位银行卡号（19位通用）:
     * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
     * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
     * 3.将加法和加上校验位能被 10 整除。
     * @reference           http://blog.diyzu.com/2011/10/js.html
     * @param input         输入
     * @param error         错误信息
     * @return {Boolean}    验证结果('1':验证通过)
     */
    checkBankCard:function (input) {
        /*var regExp = /^\d+$/;
         if (!regExp.test(input)) {
         return "银行卡号只能为数字！";
         } else {
         var lastNum = input.substr(input.length - 1 ,1),
         firstNum = input.substr(0 ,input.length - 1),
         array = firstNum.split(""),
         luhmSum = 0;

         for (var i = array.length - 1, j = 0; i >= 0; i--, j++) {
         var k = parseInt(array[i]);
         if (j % 2 == 0) {
         k = k * 2;
         if (k > 10)
         k = 1 + k % 10;
         else if (k == 10)
         k = 1;
         }
         luhmSum += k;
         }
         var luhmNum = (parseInt(luhmSum) % 10 == 0) ? 0 : parseInt(10 - parseInt(luhmSum) % 10);
         if (lastNum != String(luhmNum)) {
         return "请输入正确的银行卡号！";
         } else {
         return '1';
         }
         }*/
        var regex = /^\d{12,19}$/;///^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/;
        return regex.test(input.replace(/\s/g ,''));
    }
}

/**
 * AA通用api
 * @type {Object}
 */
AA.Api = {
    /**
     * 异步请求通用接口
     * @param data  自定义数据
     */
    async:function (d) {
        var _url = d.url || G_ENV_VAR.WWW,
            _type = d.type || 'POST',
            _data = d.data || '',
            _cache = d.cache || false,
            _dataType = d.dataType || 'json',
            _success = d.success,
            _error = d.error;
        var _timeout = d.timeout || 30000;

        $.ajax({
            url:AA.Helper.buildUrl(_url) ,
            type:_type ,
            data:_data ,
            cache:_cache ,
            dataType:_dataType ,
            timeout:_timeout,
            success:function (result) {
                _success && _success(result);
            } ,
            error:function (XMLHttpRequest, textStatus, errorThrown) {
            	
                _error && _error();
            }
        });
    } ,
    /**
     * 获取区域信息
     * @param data
     * @param success
     * @param error
     * @constructor
     */
    areaInfo:function (data ,success ,error) {
        AA.Api.async({
            url:'my/api_area' ,
            type:'GET' ,
            data:data ,
            success:success ,
            error:error
        });
    } ,
    
    bank_branch:function (data ,success ,error) {
        AA.Api.async({
            url:'my/api_bank_branch' ,
            type:'GET' ,
            data:data ,
            success:success ,
            error:error
        });
    } ,
    /**
     * 用户
     */
    User:{
        /**
         * 统计类型
         */
        StatType:{
            ACCOUNT_HOME:1 ,//账户首页
            INVEST_MANAGE:2//投资管理
        } ,
        /**
         * 收支类型
         */
        ConsumeType:{
            ALL:1 ,
            IN:2 ,
            OUT:3
        } ,
        /**
         * 是否已通过登录验证(UID为空则未登录)
         */
        'isAuth':!!G_ENV_VAR.UID ,
        /**
         * 验证码
         * @param success
         * @param error
         */
        captcha:function (data ,success ,error) {
            AA.Api.async({
            	url:'/v2/login/get_captcha.raw' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 账户登录
         * @param form      登录表单(id|jquery对象)
         * @param success
         * @param error
         */
        login:function (form ,success ,error) {
            var _form = $(form);
            var data = {};
            data.username = _form.find('[name="username"]').val();
            data.password = AA.Helper.encrypPw(_form.find('[name="password"]').val());
            data.captcha = _form.find('[name="captcha"]').val();
            data.seed = _form.find('[name="seed"]').val();
            $.ajax({
                url:_form.attr('action') ,
                type:_form.attr('method') ,
                data:data ,
                dataType:'json' ,
                success:function (result) {
                    success && success(result);
                } ,
                error:function () {
                    error && error();
                }
            });
        } ,
        /**
         * 信息检查
         * @param data
         * @param success
         * @param error
         */
        checkInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_check' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获取账户信息
         * @param data
         * @param success
         * @param error
         */
        getAccountInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'turn/api_account' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 检查邀请人
         * @param data
         * @param success
         * @param error
         */
        checkReferrer:function (data ,success ,error) {
            AA.Api.async({
                url:'user/api_user' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 账户注册
         * @param form
         * @param success
         * @param error
         */
        register:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_doreg' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 修改登录密码
         * @param form
         * @param success
         * @param error
         */
        changeLoginPwd:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_modify_loginpassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 设置/修改交易密码
         * @param form
         * @param success
         * @param error
         */
        changeSafePwd:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_modify_safepassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 验证用户名
         * @param form
         * @param success
         * @param error
         */
        verifyUserName:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_verify_username' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 找回登录账户
         * @param form
         * @param success
         * @param error
         */
        findAccount:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_find_username' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 找回登录密码
         * @param form
         * @param success
         * @param error
         */
        findLoginPwd:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_find_loginpassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 找回交易密码
         * @param form
         * @param success
         * @param error
         */
        findSafePwd:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_find_safepassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 重设登录密码
         * @param form
         * @param success
         * @param error
         */
        resetLoginPwd:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_reset_loginpassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 重设交易密码
         * @param form
         * @param success
         * @param error
         */
        resetSafePwd:function (data ,success ,error) {
            AA.Api.async({
                url:'account/api_reset_safepassword' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 验证手机验证码
         * @param form
         * @param success
         * @param error
         */
        verifyLoginMobileCode:function (data ,success ,error) {
            AA.Api.async({
                url:'account/reset_loginpass' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 验证手机验证码
         * @param form
         * @param success
         * @param error
         */
        verifySafeMobileCode:function (data ,success ,error) {
            AA.Api.async({
                url:'account/verify_safe_mobile_code' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获取用户余额
         * @param data
         * @param success
         * @param error
         */
        balanceInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_available_money' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 用户账户信息
         * @param data
         * @param success
         * @param error
         */
        accountInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_accountinfo' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 用户已投资记录
         * @param data
         * @param success
         * @param error
         */
        loansInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_user' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 用户已投资记录
         * @param data
         * @param success
         * @param error
         */
        loansInfo2:function (data ,success ,error) {
            AA.Api.async({
                url:'/v2/member/get_invest_project_ext_list.jso' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        refundInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_user_refund' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        refundPlanInfo:function(data ,success ,error){
        	 AA.Api.async({
                 url:'/v2/refund/user_under_refund_plan.jso' ,
                 data:data ,
                 success:success ,
                 error:error
             });
        },
        /**
         * 用户信息统计
         * @param data
         * @param success
         * @param error
         */
        statInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'stat/api_loan' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 用户收支信息
         * @param data
         * @param success
         * @param error
         */
        consumeInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'stat/api_trade' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 自动投资
         * @param data
         * @param success
         * @param error
         */
        autoInvest:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_modify_autoinvest' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * VIP会员
     */
    Vip:{
        /**
         * 操作类型
         */
        actionType:{
            OPENED:1 ,//开通
            RENEW:2  //续费
        } ,
        /**
         * 开通/续费
         * @param data
         * @param success
         * @param error
         */
        doAction:function (data ,success ,error) {
            AA.Api.async({
                url:'user/api_vip' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 免费升级
         * @param data
         * @param success
         * @param error
         */
        upgrade:function (data ,success ,error) {
            AA.Api.async({
                url:'user/api_fvip' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获赠名单
         * @param data
         * @param success
         * @param error
         */
        getRewards:function (data ,success ,error) {
            AA.Api.async({
                url:'user/api_rewards' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 借款
     */
    Loan:{
        /**
         * 数据类型
         */
        Type:{
            'RAPID_INVESTS':1 ,//快速投资
            'RECENT_DEALS':2 ,//最近投资回款
            'INVESTS':3 //投资理财
        } ,
        /**
         * 借款标状态
         */
        status:['全部','收益中','逾期中','正常回款','提前回款','逾期回款','投资礼金'] ,
        /**
         * 回款方式
         */
        refundType:['','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息'],
        /**
         * 获取投资产品列表
         * @param data
         * @param success
         * @param error
         */
        query:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_common' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        
        query_list:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/query_invest_list' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获取投资产品信息
         * @param data
         * @param success
         * @param error
         */
        getInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_info' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 收益详情
         * @param data
         * @param success
         * @param error
         */
        getIncomeInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_trade' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 收益详情
         * @param data
         * @param success
         * @param error
         */
        getIncomeInfo2:function (data ,success ,error) {
            AA.Api.async({
                url:'/v2/member/get_income_info.jso' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获取合同标所属的图片凭证信息
         * @param data
         * @param success
         * @param error
         */
        getImages:function (data ,success ,error) {
            AA.Api.async({
                url:'loan/api_image' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 投资
     */
    Invest:{
        /**
         * 投资账户信息展示
         * @param data
         * @param success
         * @param error
         */
        getInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'turn/api_info' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获取投资确认详细信息
         */
        getInvestFrist:function (data ,success ,error) {
            AA.Api.async({
                url:'/turn/api_frist_info' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 投资
         * @param data
         * @param success
         * @param error
         */
        doAction:function (data ,success ,error) {
            AA.Api.async({
                url:'/turn/api_invest' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 提现
     */
    Deposit:{
        /**
         * 提现
         * @param data
         * @param success
         * @param error
         */
        doAction:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_deposit' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 认证
     */
    Auth:{
        /**
         * 邮箱验证
         */
        Email:{
            checkInfo:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_email_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            }
        } ,
        /**
         * 手机认证
         */
        Mobile:{
            /**
             * 检查手机号并发送验证码
             * @param data
             * @param success
             * @param error
             */
            checkInfo:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_mobile_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            } ,
            /**
             * 验证手机验证码
             * @param data
             * @param success
             * @param error
             */
            validate:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_do_mobile_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            }
        } ,
        /**
         * 实名认证
         */
        Identity:{
            /**
             * 检查身份证有效性
             * @param data
             * @param success
             * @param error
             */
            checkInfo:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_id_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            } ,
            /**
             * 实名认证手续费
             * @param data
             * @param success
             * @param error
             */
            charge:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_id_check_fee' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            }
        } ,
        /**
         * 银行卡
         */
        BankCard:{
            /**
             * 银行卡认证
             * @param data
             * @param success
             * @param error
             */
            checkInfo:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_bankcard_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            } ,
            /**
             * 银行卡认证手续费
             * @param data
             * @param success
             * @param error
             */
            charge:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_bankcard_check_fee' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            } ,
            /**
             * 验证金额
             * @param data
             * @param success
             * @param error
             */
            checkMoney:function (data ,success ,error) {
                AA.Api.async({
                    url:'my/api_do_bankcard_check' ,
                    data:data ,
                    success:success ,
                    error:error
                });
            }
        }
    } ,
    /**
     * 消息
     */
    Msg:{
        /**
         * 获取消息列表
         */
        getInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_msg_list' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 查看
         */
        read:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_msg' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 标为已读
         */
        doRead:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_msg_setread' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 删除
         */
        doDelete:function (data ,success ,error) {
            AA.Api.async({
                url:'my/api_msg_setdel' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 融资
     */
    Financing:{
        /**
         * 融资申请
         * @param data
         * @param success
         * @param error
         */
        applyFor:function (data ,success ,error) {
            AA.Api.async({
                url:'user/api_apply' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 活动
     */
    Action:{
        /**
         * 积分抽奖
         * @param data
         * @param success
         * @param error
         */
        draw:function (data ,success ,error) {
            AA.Api.async({
                url:'action/api_lucky_draw' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 我的奖品
         * @param data
         * @param success
         * @param error
         */
        myPrize:function (data ,success ,error) {
            AA.Api.async({
                url:'action/api_my_prize_list' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 我的收货地址
         * @param data
         * @param success
         * @param error
         */
        myAddress:function (data ,success ,error) {
            AA.Api.async({
                url:'action/api_modify_address' ,
                data:data ,
                success:success ,
                error:error
            });
        } ,
        /**
         * 获奖名单
         * @param data
         * @param success
         * @param error
         */
        prizeInfo:function (data ,success ,error) {
            AA.Api.async({
                url:'action/api_prize_list' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
           
        } ,
        bigprize:function(data ,success ,error){
        	 AA.Api.async({
                 url:'action/api_big_prize_list' ,
                 type:'GET' ,
                 data:data ,
                 success:success ,
                 error:error
             });
        },
        /**
         * 推荐奖励
         * @param data
         * @param success
         * @param error
         */
        inviteReward:function (data ,success ,error) {
            AA.Api.async({
                url:'action/api_invest_list' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    } ,
    /**
     * 论坛
     */
    Forum:{
        /**
         * 获取论坛热帖
         * @param data
         * @param success
         * @param error
         */
        getPosts:function (data ,success ,error) {
            AA.Api.async({
                url:'index/api_forum_thread' ,
                type:'GET' ,
                data:data ,
                success:success ,
                error:error
            });
        }
    }
};

/**
 * AA视图初始化
 * @type {Object}
 */
AA.View = {
    /**
     * 通用吊顶
     */
    TopNav:{
        /**
         * 初始化
         */
        'init':function () {
            var _hash = location.hash, _url;
            //论坛登录
            if (!AA.Api.User.isAuth && _hash == '#frombbs') {
                location.hash = '';
                _url = document.referrer;
                AA.RapidLogin.popup(_url);
            }

            //下拉菜单
            $('.menu-hd,.menu-bd').hover(function () {
                $(this).parent('li').addClass('hover');
            } ,function () {
                $(this).parent('li').removeClass('hover');
            });
            
            AA.View.ShowApp();
        }
    },
    
    ShowApp:function(){
    	
    	
    	var url = location.search; //获取url中"?"符后的字串
		 var theRequest = new Object();
		   if (url.indexOf("?") != -1) {
		      var str = url.substr(1);
		      strs = str.split("&");
		      for(var i = 0; i < strs.length; i ++) {
		         theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
		      }
		   }
    	   
    	   
    	  if(theRequest['t']!=undefined&&theRequest['t']!=null){
    		  
    		  if(theRequest['t']=='showapp'){
    			  
    			  show_App();
    		  }
    	  }
    	
    }

};

function toDecimal(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return;  
    }  
    f = Math.round(x*100)/100;  
    var s = new String(f);  
    var rs = s.indexOf('.');  
    if (rs < 0) {  
        rs = s.length;  
        s += '.';  
    }  
    while (s.length <= rs + 2) {  
        s += '0';  
    }  
    return s.toString();  
 
}





function getajaxHttp() { 

    var xmlHttp; 

     try { 

         // Firefox, Opera 8.0+, Safari 

         xmlHttp = new XMLHttpRequest(); 

        } catch (e) { 

             // Internet Explorer 
             try { 
                 xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 

             } catch (e) { 

             try { 

                 xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 


             } catch (e) { 

                 alert("您的浏览器不支持AJAX！"); 
                 return false; 
             } 
         } 
     } 

     return xmlHttp; 
 } 


 /** 
  * 发送ajax请求 
  * url--url 
  * methodtype(post/get)
  * con (true(异步)|false(同步)) 
  * parameter(参数) 
 * functionName(回调方法名，不需要引号,这里只有成功的时候才调用) 
  * (注意：这方法有二个参数，一个就是xmlhttp,一个就是要处理的对象) 
  * obj需要到回调方法中处理的对象 
  */ 
 function ajaxrequest(url,methodtype,con,parameter,functionName,obj){ 

     var xmlhttp=getajaxHttp(); 
     xmlhttp.onreadystatechange=function(){ 
         if(xmlhttp.readyState==4){ 
             //HTTP响应已经完全接收才调用 
             functionName(xmlhttp,obj); 
        } 
     }; 

    xmlhttp.open(methodtype,url,con); 

    xmlhttp.send(parameter); 

}
 
function getUrlParam(name)
{
 
 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

 var r = window.location.search.substr(1).match(reg);  //匹配目标参数
 
 if (r!=null) return decodeURIComponent(r[2]); return null; //返回参数值
 
}

