/**
 * VIP成长值
 */



AA.Vip.Growth={
		
	init:function(){
	
		//加载VIP信息
		AA.Vip.Growth.load_vip_info();
		
		AA.Vip.Growth.load_list();
	},
	load_vip_info:function(){
		
		if (!AA.Api.User.isAuth) {//没有登录
			 
			 $('#no_login').show();
			 
		 }else{
			
			 $('.uname').html(G_ENV_VAR.UNAME);
			 
			 if(G_ENV_VAR.VIP!=0){//VIP用户
				 
				 $('#in_vip').show();
				 
				 //获取VIP数据
				 AA.Api.async({
	                    url:'vip/get_vip_info' ,
	                    data:{} ,
	                    success:function (result) {
							 
	                    	if(result.state==1){
	                    		
	                    		//当前VIP成长值
	                    		var cur_grow=result.data.cur_grow;
	                    		
	                    		//下个等级VIP成长值
	                    		var next_grow=result.data.next_grow;
	                    		
	                    		//获取百分比
	                    		var lv=cur_grow/next_grow*100;
	                    		
	                    		var s=Math.round(lv*Math.pow(10,2))/Math.pow(10,2);
	                    		
	                    		s=s+"%";
	                    		
	                    		
	                    		$('#cur_grow').html(AA.Vip.Growth.formatMoney(cur_grow,0,''));
	                    		
	                    		var viplevel=result.data.vip;
	                    		
	                    		if(viplevel>=4){
	                    			$('#next_grow').html(AA.Vip.Growth.formatMoney(next_grow/10000,0,'')+"万点");
	                    		}else{
	                    			$('#next_grow').html(AA.Vip.Growth.formatMoney(next_grow,0,''));
	                    		}
	                    		
	                    		
	                    		$('#VipDataValue').css("width",s);
	                    		
	                    		
	                    		$('#vip_level').html(viplevel);
	                    		
	                    		var cha=(next_grow-cur_grow);
	                    		if(cha > 100){
									var cha_add = cha % 100;
									if(cha_add > 0){
										cha = cha + 100 - cha_add;
									}
								}
	                    		if(cha>=10000){
	                    			
	                    			cha=cha/10000;
	                    			
	                    			cha=Math.round(cha*Math.pow(10,2))/Math.pow(10,2);
		                    		
		                    		$('#grow_cha').html(AA.Vip.Growth.formatMoney(cha,2,'')+"万");
	                    		}else{
	                    			
	                    			$('#grow_cha').html(AA.Vip.Growth.formatMoney(cha,2,''));
	                    		}
	                    		
	                    		
	                    		
	                    		
	                    		$('#next_level').html(result.data.vip+1);
	                    		
	                    		var one=result.data.one;
	                    		
	                    		var two=result.data.two;
	                    		
	                    		$('#one_money').html(AA.Vip.Growth.formatMoney(one,0,''));
	                    		
	                    		$('#two_money').html(AA.Vip.Growth.formatMoney(two,0,''));
	                    	}
	                    	
						} 
	                });
				 
				 
			 }else{//非VIP用户
				
				 $('#out_vip').show();
				 
				 
			 }
			
		 }
		
	},
	load_list:function(){
		$.ajax({
			url:'/v2/vip/get_new_vip_list.jso',
			data:{},
		    type:'post' ,
		    dataType:'json',
	    	success:function (result) {
	    	if(result.state==0){
	    		var d=result.newVipList;
	    			var html='';
            				 for(var i=0;i<d.length;i++){
            					 var row=d[i];
            			 		var type='成功开通 VIP会员';
            			 		if(row.type==1){
            					var type='成功升至 VIP'+row.vip;
            							 }
            					 html+='<li>\
            				 	<span class="date">' + AA.Helper.date(row.time, 'Y-m-d h:m') + '</span>\
            			 		<span class="name">恭喜'+row.name+'</span>\
            			 		<span class="sn">'+type+'</span>\
            				 	</li>';
            		 }
            		 
            		 $(".deals .bd").html('<ul>' + html + '</ul>');
            		 
            		 if (d.length > 8) {
            			 $(".deals .bd").jCarouselLite({auto:3000, speed:1000, vertical:true, visible:8, start:0, scroll:8});
     	         	}
	    	
	    	}else{
	    	
	    	}
	    	}
		});
		 
	},
	
	/*load_list:function(){
		 AA.Api.async({
			 url:'vip/get_new_list' ,
             		data:{} ,
             		success:function (result) {
            	
            			 if(result.state==1){
            				 var d=result.data;
            		 		var html='';
            				 for(var i=0;i<d.length;i++){
            					 var row=d[i];
            			 		var type='成功开通 VIP会员';
            			 		if(row.type==1){
            						 var type='成功升至 VIP'+row.vip;
            							 }
            					 html+='<li>\
            				 	<span class="date">' + AA.Helper.date(row.time, 'Y-m-d h:m') + '</span>\
            			 		<span class="name">恭喜'+row.name+'</span>\
            			 		<span class="sn">'+type+'</span>\
            				 	</li>';
            		 }
            		 
            		 $(".deals .bd").html('<ul>' + html + '</ul>');
            		 
            		 if (d.length > 8) {
            			 $(".deals .bd").jCarouselLite({auto:3000, speed:1000, vertical:true, visible:8, start:0, scroll:8});
     	         	}
            	 }
             }
		 });
		 
		
	},*/
	
	init_btn:function(){
		
		 var _url = AA.Vip.getUrl(location);
		 
		 if (!G_ENV_VAR.IS_CHECKED_EMAIL) {
             $.alert({
                 title:'您的邮箱尚未经过验证！' ,
                 content:'开通VIP会员前请先完成邮箱验证' ,
                 txtBtn:'立即验证' ,
                 url:'/2.0/views/account/account_settings.shtml'
             });
             return;
         } else if (!G_ENV_VAR.IS_CHECKED_MOBILE) {
             $.alert({
                 title:'您的手机号尚未经过认证！' ,
                 content:'开通VIP会员前请先完成手机认证' ,
                 txtBtn:'立即认证' ,
                 url:'/2.0/views/account/account_settings.shtml'
             });
             return;
         } else if (!G_ENV_VAR.HAS_TRADE_PASSWORD) {
             $.alert({
                 title:'您尚未设置交易密码！' ,
                 content:'开通VIP会员前请先设置交易密码' ,
                 txtBtn:'立即设置' ,
                 url:'/2.0/views/account/account_settings.shtml'
             });
             return;
         }
		 
		 var _title ='开通VIP';
		 var _dialog_title ='开通VIP会员';
		 
		 $.dialog({
             title:_title ,
             padding:'36px' ,
             content:$('#wgt-dialog-opened-vip-wrapper').html() ,
             initialize:function () {
                 var _dialog = this,
                     _form = $('#opened-vip-form'),
                     _btn_submit = _form.find('.ui-button'),
                     _referrer = $('#referrer'),
                     _vipfee = parseFloat($('#vipfee').val()),
                     _money,
                     _total_money = parseFloat($('#available-total-money').val()),
                     _cb_year = _form.find('input[name="year"]');

                 $('.wgt-dialog-opened-vip .wgt-dialog-title').html(_dialog_title);

                 _cb_year.click(function () {
                     var _self = $(this),
                         _v = _self.val(),
                         _year = _self.next('em').html(),
                         _speed = _v == 1 ? '1.1' : (_v == 2 ? '1.3' : '1.5');

                     $('#auto-renew-year').html(_year);
                     $('#speed').html(_speed + '倍起');

                     _money = _vipfee * parseFloat(_v);
                     _form.find('.money').html(_money + '.00');
                 });

                 _btn_submit.click(function () {
                	
                	 
                     var _year = _form.find('input[name="year"]:checked').val(),
                         _auto = $('#is_auto').attr('checked') ? _year : 0,
                        
                         _val ='',
                         _lackBanlance = _total_money < (_vipfee * parseFloat(_year)),
                         _data = {
                             lackBanlance:_lackBanlance ,
                             title:_title ,
                             dialogTitle:_dialog_title ,
                             type:1 ,
                             year:_year ,
                             auto:_auto ,
                             money:_money = parseFloat(_vipfee) * parseFloat(_year) + '.00' ,
                             name:_val
                         };
                    
                    
                     _dialog.close();
                     AA.Vip.doPay(_data);
                     return false;
                 });
             }
         });
		
	},
	formatMoney:function(number, places, symbol, thousand, decimal){
		
		 number = number || 0;
	        places = !isNaN(places = Math.abs(places)) ? places : 2;
	        symbol = symbol !== undefined ? symbol : "$";
	        thousand = thousand || ",";
	        decimal = decimal || ".";
	        var negative = number < 0 ? "-" : "",
	            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	            j = (j = i.length) > 3 ? j % 3 : 0;
	        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	}
	
}