var Common=Common||{};
(function(Common){

Common.Loan={
	RefundType:['','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息'],
	Status:['全部','收益中','逾期中','正常回款','提前回款','逾期回款','投资礼金'] ,
	/**
	 * 
	 */
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
    }
};

Common.Tool={
	RSA_PUB_KEY_NUM : '10001',
	RSA_PUB_MODULE : 'bafdbbf02c2da5125a921e59d4f5b3cdfb96172b8f75f2736b843ad78fb6d9cabc0fb64147c7b5a531f713123ff6dc33dc904f700a25c932e9a1d0bfdf5d3b609d6456c82922a54c75a085b0f117c7e1031acc33683895bf84b921acdd7df0f776694c3ef38d4cc27cd30feb4d90268179f5b1a789234f96cc14c70a2627f1a1',
	FormateDate:function(timestamp ,format){
		
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
        } else if(format == 'h:m'){
        	return ( _hour + ':' + _minute);
        }
        else {
            return 0;
        }
	},
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
        	input = new String(input);
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
    /**
     * 向上取
     */
    toCent:function (number) {
    	return (1.00*parseInt(number*100+0.00001))/100;
    } ,
    /**
     * 四舍五入
     */
    toCentHalfUp:function(number){
    	return (1.00*parseInt(number*100+0.5))/100;
    },
    /**
     * 格式化千分位
     */
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
    toDecimal:function(x) {
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
        return s;  
     
    },
    CountDownTime:function(begin_time,now_time){
    	
    	var  _second = Math.round(begin_time - now_time);
    	
    	 if (_second < 0) {
    		 
    		 return new Array();
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
         
         var rs=new Array(4);
         
         rs[0]=_day;
         
         rs[1]=_hour;
         
         rs[2]=_min;
         
         rs[3]=_sec;
         
         
         return rs;
    },
    /**
     * 获取中英文字符串长度
     * @param s
     * @return {Number}
     */
    getLength:function (s) {
        return s.replace(/[^\x00-\xff]/g ,"aa").length;
    },
    checkBankCard:function(input){
    	
    	var regex = /^\d{12,19}$/;
        return regex.test(input.replace(/\s/g ,''));
    },
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
    },
    formatBankCard:function (bankCard) {//格式化银行卡
        return bankCard.replace(/\s/g ,'').replace(/(\d{4})(?=\d)/g ,"$1 ")
    },
    urlEncode:function(str){
    	 var ret=""; 
    	   var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%"; 
    	   for(var i=0;i<str.length;i++){ 
    	   var chr = str.charAt(i); 
    	     var c=str2asc(chr); 
    	     if(parseInt("0x"+c) > 0x7f){ 
    	       ret+="%"+c.slice(0,2)+"%"+c.slice(-2); 
    	     }else{ 
    	       if(chr==" ") 
    	         ret+="+"; 
    	       else if(strSpecial.indexOf(chr)!=-1) 
    	         ret+="%"+c.toString(16); 
    	       else 
    	         ret+=chr; 
    	     } 
    	   } 
    	   return ret;
    },
    urlDecode:function(str){
    	
    	var ret="";
    	for(var i=0;i<str.length;i++){
    	var chr = str.charAt(i);
    	if(chr == "+"){
    	ret+=" ";
    	}else if(chr=="%"){
    	var asc = str.substring(i+1,i+3);
    	if(parseInt("0x"+asc)>0x7f){
    	ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
    	i+=5;
    	}else{
    	ret+=asc2str(parseInt("0x"+asc));
    	i+=2;
    	}
    	}else{
    	ret+= chr;
    	}
    	}
    	return ret;
    	
    },
    getTimeQuantum:function(){
    	var helloStr=""; 
    	var now = new Date();
    	var hour = now.getHours();
    	if(hour < 6){helloStr = "凌晨好";} 
    	else if (hour < 9){helloStr = "早上好";} 
    	else if (hour < 12){helloStr = "上午好";} 
    	else if (hour < 14){helloStr = "中午好";} 
    	else if (hour < 17){helloStr = "下午好";} 
    	else if (hour < 19){helloStr = "傍晚好";} 
    	else if (hour < 22){helloStr = "晚上好";} 
    	else {helloStr = "夜里好";}  
    	return helloStr;
    },
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
    },
	encrypPw : function(pw) {
		RSA.setMaxDigits(131);
	    var key = new RSA.RSAKeyPair(// public,private,module
	    		Common.Tool.RSA_PUB_KEY_NUM, "",Common.Tool.RSA_PUB_MODULE
	    );
		return RSA.encrypt(key, pw);
	},
    /**
     * 根据邮箱地址构建邮箱服务器网址
     * @param email
     * @return {String}
     */
    buildEmailUrl:function (email) {
        var url = '';
        var emails = {
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
        };
        var domain = email.split('@')[1];

        $.each(emails ,function (k ,v) {
            if (k == domain) {
                url = v;
            }
        });

        url = url == '' ? 'http://mail.' + domain : url;

        return url;
    }
};

Common.Global={
	/**
     * 异步请求通用接口
     * @param data  自定义数据
     */
    async:function (d) {
        var _url = d.url || 'www.xinrong.com',
            _type = d.type || 'POST',
            _data = d.data || '',
            _cache = d.cache || false,
            _dataType = d.dataType || 'json',
            _success = d.success,
            _error = d.error;

        $.ajax({
            url:_url ,
            type:_type ,
            data:_data ,
            cache:_cache ,
            dataType:_dataType ,
            success:function (result) {
                _success && _success(result);
            } ,
            error:function () {
                _error && _error();
            }
        });
    },
	/**
	 * 获取URL参数值
	 */
	GetUrlParam:function (name)
	{
	
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	
		if (r!=null) return decodeURIComponent(r[2]); return null; //返回参数值
	
	},
	GetCookie:function(name){
		

		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
		if(arr=document.cookie.match(reg))
	 
			return decodeURIComponent(arr[2]); 
		else 
			return null; 

	},
	/**
	 * 获取服务器时间
	 */
	GetServerTime:function(callback){
		
		$.ajax({
			 url:'/dumy.txt?t='+new Date().getTime(),
			 type:'GET',
			 success:function(result){
			 },
			 complete:function(xhr,ts){
				 var date=new Date(xhr.getResponseHeader('Date')); 
			 	 var server_times=date.getTime()/1000;//当前的时间戳
			 	 callback(server_times);
			 }	   
		});    
		
	},
	IsWeinNav:function(){
		var ua = navigator.userAgent.toLowerCase();
		
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	 	} else {
	 		return false;
		}
	}
};
})(Common);