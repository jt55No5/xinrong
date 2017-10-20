var XR=XR||{};


(function(XR){
	
XR.Loan={
		
		RefundType:['','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息','到期一次性','等额本息','等额本金','按月付息'],
		LoanType:['','信·无忧贷','信·优企贷','信·赎楼贷','信·消费贷','信·精选贷','信·质抵贷','信·消费贷','品·融360','品·吉屋网','信·优资贷','信·消费贷','品·保理贷','品·分期X','信·消费JS','品·票据贷','信·车贷','品·明特'],
			//根据不同项目类型，输出显示项目类型和编号
			TypeShow:function(loanType,conSn){
				
				 var loanTypeStr="";
				
				try {
					
					 if(loanType == 1){
							loanTypeStr = "信·无忧贷-"+conSn.substring(3,9)+parseInt(conSn.substring(10))+"系列";
					 }else if(loanType == 2){
							loanTypeStr = "信·优企贷-"+conSn.substring(3,9)+parseInt(conSn.substring(10))+"系列";
					 }else if(loanType == 3){
							loanTypeStr = "信·赎楼贷-"+conSn.substring(3,9)+conSn.substring(13)+"系列";
					 }else if(loanType == 4||loanType == 7||loanType == 11){
						 	
							var type_name=conSn.substring(1,3);
							loanTypeStr = "信·消费"+type_name+"-"+conSn.substring(3,9)+"系列"; 
					 }else if(loanType == 5){
							loanTypeStr = "信·精选贷-"+conSn.substring(3,9)+parseInt(conSn.substring(10))+"系列";   
					 }else if(loanType == 6){
							loanTypeStr = "信·质抵贷-"+conSn.substring(3,9)+parseInt(conSn.substring(10))+"系列";   
					 }else if(loanType==8){
						 	loanTypeStr = "品·融360-"+conSn.substring(3,9)+"系列";
					 }else if(loanType==9){
						 	loanTypeStr = "品·吉屋网-"+conSn.substring(3,9)+"系列";
					 }else if(loanType==10){
						    loanTypeStr = "信·优资贷-"+conSn.substring(3,9)+parseInt(conSn.substring(10))+"系列";
					 }else if(loanType==12){
						    loanTypeStr = "品·保理贷-"+conSn.substring(3,9)+"系列";
					 }else if(loanType==13){
						    loanTypeStr = "品·分期X-"+conSn.substring(3,9)+"系列";
					 }else if(loanType==14){
						   loanTypeStr = "信·消费JS-"+conSn.substring(3,9)+"系列";   
					 }else if(loanType==15){
						   loanTypeStr = "品·票据贷-"+conSn.substring(3,9)+"系列";   
					 }else if(loanType==16){
						 	var type_name=conSn.substring(1,3);
							loanTypeStr = "信·车贷"+type_name+"-"+conSn.substring(3,9)+"系列";    
					 }else if(loanType==17){
						 loanTypeStr = "品·明特-"+conSn.substring(3,9)+"系列";
					 }
					 
				} catch (e) {
					
				}
				 
				 return loanTypeStr;
			},
			/**
			 * 获取不同项目序列号
			 */
			TypeSortShow:function(loanType,conSn,sort){
				if(loanType == 4||loanType == 7||loanType == 11||loanType == 8||loanType == 9||loanType == 12||loanType==13||loanType == 15||loanType == 16||loanType == 17){
					return conSn.substr(10,4);
				}else{
					return sort;
				}
			},
			RefundShow:function(refundType){
				
				return XR.Loan.RefundType[refundType];
				
			},
			
			
			/**
			 * 判断是否显示担保图标
			 * enter_name:担保公司名称
			 */
			ShowDanbaoOrnot:function(enter_name){
				
				if(enter_name=="无担保"){
					return false;
				}else{
					
					return true;
				}
			},
			/**
			 * 判断是否显示可转图标
			 * deadline:月份
			 * type:是否是转让标:0:非,1:是
			 */
			ShowCanTransferOrnot:function(deadline,type){
				
				if(type==0 && deadline>1){
					return true;
				}else{
					return false;
				}
			},
			/**
			 * 根据担保公司id获得担保公司名称和详细介绍链接地址
			 */
			GetEnterNameAndUrl:function(enterId){
				
				var arr = new Array();
				switch(enterId){
				
				case 55:    arr[0]="深圳市华圳融资担保有限公司";
						    arr[1]="https://www.xinrong.com/2.0/views/about/partner/huazhen.html";
						    break;
				case 8925:  arr[0]="贵州银源融资担保有限公司";
						    arr[1]="https://www.xinrong.com/about/partner/3";
						    break;
				case 19478: arr[0]="深圳市分期乐网络科技有限公司";
						    arr[1]="https://www.xinrong.com/about/partner/4";
						    break;
				case 102092:arr[0]="深圳市恒胜金融信息咨询管理有限公司";
							arr[1]="https://www.xinrong.com/about/partner/5";
							break;
				case 119186:arr[0]="北京融世纪信息技术有限公司";
							arr[1]="https://www.xinrong.com/2.0/views/about/partner/rong360.html";
							break;
				case 273243:arr[0]="深圳市五一贷金融服务有限公司";
							arr[1]="https://www.xinrong.com/2.0/views/about/partner/fenqix.html";
							break;
				case 342485:arr[0]="陕西普汇中金融资担保有限公司";
							arr[1]="https://www.xinrong.com/2.0/views/about/partner/chinlink.html";
							break;
				case 560677:arr[0]="深圳市国邦兴业投资担保有限公司";
							arr[1]="https://www.xinrong.com/about/partner/9";
							break;
				case 737924:arr[0]="明特商业保理有限公司";
							arr[1]="https://www.xinrong.com/2.0/views/about/partner/mingte.html";
							break;
				case 26050:arr[0]="深圳市普惠融商业服务有限公司";
							break;
				default:	arr[0]="无担保";
							arr[1]="javascript:void(0)";
							break;
				}
				
				return arr;
			},
			
			
			GetEnterName:function(enterId){
				var name ='';
				switch(enterId){
				
				case 55:    name="华圳担保";
						    break;
				case 8925:  name="银源担保";
						    break;
				case 19478: name="分期乐商城";
						    break;
				case 102092:name="恒胜金融";
							break;
				case 119186:name="融360";
							break;
				case 273243:name="五一贷金融";
							break;
				case 342485:name="陕西普汇中金融资担保";
							break;
				case 560677:name="国邦担保";
							break;
				case 737924:name="明特商业保理有限公司";
							break;
				case 26050:name="深圳市普惠融商业服务有限公司";
							break;
				default:	name="无担保";
							break;
				}
				
				return name;
			},
			/**
			 * 投资人权益保障
			 */
			GetSafeguardHtml:function(loanType,enterId){
				var _html='';
				if(loanType==1||loanType==2||loanType==3){
				if(enterId==62167){
						_html = '<h3><i class="iconbg">1</i>重措施：风险准备金垫付</h3>'+
					      '如融资方到期未还款，将启动风险准备金垫付，然后再向融资方追索。'+
					      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'
					}else{
					_html = '<h3><i class="iconbg">1</i>重措施：第三方公司垫付</h3>'+
					      '如融资方到期未还款，第三方公司将按协议约定代为垫付本金和收益，然后再向融资方追索。'+
					      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富联合第三方公司对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'+
					      '<h3><i class="iconbg">3</i>重措施：反担保措施将担保风险降低</h3>'+
					      '第三方公司为了降低自身的担保风险，要求债务人提供足额的反担保措施，在确保了第三方公司自身的安全，同时也提升了债权人的保障性。';
					      }
				}else if(loanType==4||loanType==11){
					if(enterId&&enterId==62167){
						_html = '<h3><i class="iconbg">1</i>重措施：风险准备金垫付</h3>'+
					      '如融资方到期未还款，将启动风险准备金垫付，然后再向融资方追索。如发生第三方违约或风险准备金不足,可能造成投资人本金/利息损失。'+
					      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'
					}else{
						_html = '<h3><i class="iconbg">1</i>重措施：第三方公司回购担保</h3>'+
					      '如债权出让人到期未回购，第三方公司将按协议约定代出让人回购，然后再向出让人追索。'+
					      '<h3><i class="iconbg">2</i>重措施：债权本身具备担保</h3>'+
					      '债权本身已由第三方公司进行担保，即投资人实际获得了双重担保。'+
					      '<h3><i class="iconbg">3</i>重措施：反担保房产锁定将担保风险降低</h3>'+
					      '第三方公司为了降低自身的担保风险，要求债务人提供的反担保措施，在确保了公司自身的安全，同时也提升了债权人的保障性。';	
					}
					
				}else if(loanType==7){
					_html = '<h3><i class="iconbg">1</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'+
					      '<h3><i class="iconbg">2</i>重措施：第三方公司回购担保</h3>'+
					      '如债权出让人到期未回购，第三方公司将按协议约定代出让人回购，然后再向出让人追索。'+
					      '<h3><i class="iconbg">3</i>重措施：债权本身具备担保</h3>'+
					      '债权本身已由第三方公司和公司实际控制人进行担保，即投资人实际获得了双重担保。';
				}else if(loanType==5||loanType==6||loanType==16){
					_html = '<h3><i class="iconbg">1</i>重措施：债务人资产质/抵押</h3>'+
					      '融资方提供资产做质/抵押担保。'+
					      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'+
					      '<h3><i class="iconbg">3</i>重措施：质/抵押处理合同条款</h3>'+
					      '合同规定质/抵押条款，在融资方项目逾期等情况下快速处理资产。';
				}else if(loanType==8||loanType==9||loanType==10){
					_html = '<h3><i class="iconbg">1</i>重措施：风险准备金垫付</h3>'+
				      '如融资方到期未还款，将启动风险准备金垫付，然后再向融资方追索。如发生第三方违约或风险准备金不足,可能造成投资人本金/利息损失。'+
				      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
				      '信融财富对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'
					
				}else{
					_html = '<h3><i class="iconbg">1</i>重措施：第三方公司垫付</h3>'+
					      '如融资方到期未还款，第三方公司将按协议约定代为垫付本金和收益，然后再向融资方追索。'+
					      '<h3><i class="iconbg">2</i>重措施：极其严格的风控审查</h3>'+
					      '信融财富联合第三方公司对融资方资质和偿还能力进行严格的审查，融资方须达到或超过平台的准入标准。'+
					      '<h3><i class="iconbg">3</i>重措施：反担保措施将担保风险降低</h3>'+
					      '第三方公司为了降低自身的担保风险，要求债务人提供足额的反担保措施，在确保了第三方公司自身的安全，同时也提升了债权人的保障性。';
				}
				
				return _html;
			}
},
	
XR.Tool={
			
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
	    	input = input+'';
	        if (input != '' && input != '0') {
	            //小数点处理
	            var len = len || 2,
	                _index = input.indexOf('.'),
	                _decimals = input.split('.')[1],
	                _len;

	            _decimals = _decimals || '';
	            _len = _decimals.length;
	            input = _len > len ? input.substring(0 ,_index + len + 1) : input;
	            if(_len < len){
	            	if(_len == 0){
	            		input += '.';
	            	}
	            	for(var i = 0;i < len-_len;i++){
	            		input += '0';
	            	}
	            }
	        }
	        return input;
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
		XssFilter:function(str)
		{

				str= str.replace(/<(script|link|style|iframe)(.|\n)*>s*/ig,""); 
				str= str.replace(/<[a-z][^>]*s*on[a-z]+s*=[^>]+/ig,function($0,$1){ 
							return $0.replace(/s*on[a-z]+s*=s*("[^"]+"|'[^']+'|[^s]+)s*/ig,""); 
						}); 

				
			return str;
		},
		XssEncode:function(str)
		{
			var i=0;
			var result="";
			for(i=0; i<str.length; i++) {
				var chCode=str.charCodeAt(i) ;
				var ch=str.charAt(i) 
				if (chCode >= 256
						|| (((ch > '`') && (ch < '{')) || ((ch > '@') && (ch < '[')))
						|| (((ch == ' ') || ((ch > '/') && (ch < ':'))) || (((ch == '.') || (ch == ',')) || ((ch == '-') || (ch == '_')||(ch== '&')||(ch== '#')||(ch== ';'))))) {
					result=result+str.charAt(i);
				} else {
					result=result+("&#" +chCode + ";");
				}
			}
			return result;
			
		},
			
},


XR.Global={
		
	InitNav:function(index){
		
		$('.mainNav li a').removeClass("cur");
		
		var lis=$('.mainNav li');
		
		for(var i=0;i<lis.length;i++){
			
			if(i==index){
				
				$(lis[i]).find("a").addClass("cur");
			}
		}
	},
	
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
    GetCookie: function (name) {


        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return decodeURIComponent(arr[2]);
        else
            return null;

    },
    SetCookie: function (name, value, days) {
        var Days = days;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires="
            + exp.toGMTString() + ";path=/";
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
	/**
	 * 点击流
	 */
	PageRank:function(token,callback)	{
		$.ajax({
		 		url : '/v2/system/tag_page_rank.jso',         
		 		type : 'post', 
		 		dataType : 'json', 
				data: {token:token,referrer:document.referrer,url:location.href},
		 		complete : function(data) {  
		 				if(typeof callback =='function') callback();
					}
				})
	},
	getTradeTypeStr: function (roleType, tradeType) {
        if (roleType == 1) {
            switch (tradeType) {
                case 1:
                    return '充值';

                case 2:
                    return '提现';

                case 3:
                    return '购买vip';

                case 4:
                    return '提现驳回';

                case 5:
                    return '礼金抵扣';

                case 6:
                    return '银行卡认证';

                case 7:
                    return '提现手续费';

                case 8:
                    return '实名认证';

                case 9:
                    return '投资服务费';

                case 10:
                    return '积分补偿金';

                case 11:
                    return '话费充值/退款';

                case 20:
                    return '转让结算金额';

                case 21:
                    return '转让结算利息';

                case 22:
                    return '转让服务费';

                case 39:
                    return '礼金退还';

                default:
                    return '其他';

            }
        } else if (roleType == 2) {
            switch (tradeType) {

                case 1:
                    return '投资';

                case 2:
                    return '回款本金';

                case 3:
                    return '礼金赠送';

                case 4:
                    return '礼金回收';

                case 5:
                    return '礼金抵扣';

                case 6:
                    return '信存宝存入';

                case 7:
                    return '信存宝转出';

                case 23:
                    return '回款利息';

                case 24:
                    return '投资服务费';

                default:
                    return '其他';
            }
        } else if (roleType == 3) {
            switch (tradeType) {

                case 1:
                    return '信用借款';

                case 2:
                    return '信用还款';

                case 3:
                    return '正常融资服务费';

                case 4:
                    return '逾期融资服务费';

                default:
                    return '其他';
            }
        } else if (roleType == 4) {
            switch (tradeType) {

                case 1:
                    return '正常融资服务费';

                case 2:
                    return '逾期融资服务费';

                case 3:
                    return '逾期罚息';

                case 4:
                    return 'VIP会员费费';

                case 5:
                    return '垫付金支出';

                case 6:
                    return '垫付金收入';

                case 7:
                    return '还款差额';

                case 8:
                    return '其他';

                case 9:
                    return '提现手续费';

                case 10:
                    return '认证打款额';

                case 11:
                    return '银行卡认证认证手续费';

                case 12:
                    return '投资服务费';

                case 13:
                    return '开通VIP返现';

                case 14:
                    return '邀请好友开通VIP';

                case 15:
                    return '奖励';

                case 16:
                    return '生日礼金';

                case 17:
                    return 'VIP升级奖金';

                case 18:
                    return '实名认证手续费';

                case 19:
                    return '银行卡认证打款失败';

                case 20:
                    return '投资基金回收';

                default:
                    return '其他';
            }
        } else if (roleType == 5) {
            switch (tradeType) {

                case 1:
                    return '担保费';

                default:
                    return '其他';
            }
        } else {
            return '其他';
        }
    },

		
}
	
	
	
})(XR);
