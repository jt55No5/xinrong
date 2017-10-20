/**
 * @author    : aNd1coder
 * @overview  : VIP会员
 * @update    : $Id: vip.js 1694 2013-01-18 12:08:31Z and1coder $
 */

(function (AA) {
	AA.Vip = {
		isValid:false ,
        getUrl:function (local ,cache) {
        	var _href = local.href,
                _hash = local.hash,
                _search = local.search,
                _url,
                _cache = cache || false;

            _url = _href.replace(_hash ,'').replace(_search ,'').replace('#' ,'');

            if (!_cache) {
                _url += '?_=' + (+new Date) + '#';
            }

            return _url;
        } ,
        init:function () {
        	var _url = AA.Vip.getUrl(location), _hash = location.hash;

            $('#btn-invite').click(function () {
                if (!AA.Api.User.isAuth) {
                    AA.RapidLogin.popup(_url + 'invite');
                } else {
                    AA.Vip.invite();
                }
            });
           
            $('#btn-relay,#cont').click(function () {
                if (!AA.Api.User.isAuth) {
                    AA.RapidLogin.popup(_url + 'invite');
                    return false;
                }
                $('#cont').css({'color':'#333'}).removeAttr('readonly');
            });

            $('#btn-opened').click(function () {
            	location.href="/2.0/action/zt_vip/vip_zt.shtml";
//                if (!AA.Api.User.isAuth) {
//                    AA.RapidLogin.popup(_url + 'opened');
//                } else if (!G_ENV_VAR.IS_CHECKED_EMAIL) {
//                    $.alert({
//                        title:'您的邮箱尚未经过验证！' ,
//                        content:'开通VIP会员前请先完成邮箱验证' ,
//                        txtBtn:'立即验证' ,
//                        url:'/2.0/views/account/account_settings.shtml'
//                    });
//                }else if (!G_ENV_VAR.HAS_TRADE_PASSWORD) {
//                    $.alert({
//                        title:'您尚未设置交易密码！' ,
//                        content:'开通VIP会员前请先设置交易密码' ,
//                        txtBtn:'立即设置' ,
//                        url:'/2.0/views/account/account_settings.shtml'
//                    });
//                } else if ($('#dotype').val() == '3') {
//                    AA.Api.Vip.upgrade({} ,function (result) {
//                        var _count = $('#invitecount').val();
//                        if (result.state == 1) {
//                            $.alert({
//                                padding:'45px 0 0 55px' ,
//                                tipCls:'success1' ,
//                                title:'您邀请的VIP达到' + _count + '人以上，恭喜您免费升级为VIP会员！' ,
//                                content:'您现在可以邀请更多VIP会员，赢取投资礼金。' ,
//                                txtBtn:'立即投资' ,
//                                url:'invest' ,
//                                txtBtn1:'邀请好友' ,
//                                url1:_url + 'invite' ,
//                                refresh:true
//                            });
//                        }
//                    });
//                } else {
//                	//get_user_auto_vip
//                	$.ajax({
//                		url:AA.Helper.buildUrl('vip/get_user_auto_vip'),
//          				data:{},
//          				type:'POST' ,
//          		    	dataType:'json',
//          		    	success:function (result) {
//          		        	if(result.state==1){
//          		        		AA.Vip.opened();
//          		        		
//          		        		if(result.auto==1){
//          		        			$('#is_auto').attr('checked',true);
//          		        			$('#state').html('续费已开启');
//          		        		}else{
//          		        			$('#is_auto').attr('checked',false);
//          		        			$('#state').html('续费已关闭');
//          		        		}
//      		        		}
//          		    	}
//                	});
//            	}
            });

            if (_hash == '#invite') {
                $('#btn-invite').trigger('click');
                location.hash = '';
            } else if (_hash == '#opened') {
//                $('#btn-opened').trigger('click');
                location.hash = '';
            } else if (_hash == '#relay') {
                AA.Vip.invite(1,'推荐好友');
                location.hash = '';
            }
			else if (_hash == '#bonus') {
                AA.Vip.invite(1,'邀请好友抽奖');
                location.hash = '';
            }
        } ,
        doPay:function (d) {
            $.dialog({
                title:d.title ,
                content:$('#wgt-dialog-vip-pay-wrapper').html() ,
                initialize:function () {
                    var _dialog = this,
                        _form = $('#vip-pay-form'),
                        _title = _form.find('.pay-confirm-form .wgt-dialog-title'),
                        _input = $('#safepass'),
                        _btn_submit = _form.find('.ui-button'),
                        _url = AA.Vip.getUrl(location);

                    _form.find('.money').html(d.money);
                    _title.html(d.dialogTitle);
                    if (!d.lackBanlance) {
                        _title.css({'padding-left':'80px'});
                    }
                    _form.find('.ui-button').val('确 定');

                    AA.doPay({
                        lackBalance:d.lackBanlance ,
                        callback:function (_val) {
                        	$.ajax({
                        		url:'/v2/vip/become_vip.jso',
                        		data:{password:AA.Helper.encrypPw(_val),isAuto:d.auto,type:d.type},
                        	    type:'post' ,
                        	    dataType:'json',
                        	    success:function(result){
                        	    	if (result.state == 0) {
                        	    		_dialog.close();
                        	    		$('#wgt-dialog-actions').css({'margin-left':'40px'});
                        	    		if (d.type == 1) {
                                            $.alert({
                                                tipCls:'success1' ,
                                                title:'恭喜您成功开通VIP会员！' ,
                                                content:'您现在可以尊享本金收益保障、费用折扣等多项特权。' ,
                                                txtBtn:'立即投资' ,
                                                url:'/invest.shtml' ,
                                                refresh:true
                                            });
                                        } else {
                                            $.alert({
                                                tipCls:'success1' ,
                                                title:'恭喜您VIP会员续费成功！' ,
                                                content:'您可以继续尊享本金收益保障、费用折扣等多项特权。' ,
                                                txtBtn:'立即投资' ,
                                                url:'/invest.shtml' ,
                                                refresh:true
                                            });
                                        }
                        	    	}else{
                        	    		if(result.state == 1009){
                        	    			_dialog.close();
                                            AA.RapidLogin.popup();
                        	    		}else if(result.state==1002){
                        	    			AA.Helper.enabled(_btn_submit);
                                            _btn_submit.next('.ui-loading').hide();
                                            AA.Vip.warning(_input.next('.ui-tip') ,'交易密码错误');
                                            _input.val("");
                        	    		}else if(result.state==1001){
                        	    			AA.Helper.enabled(_btn_submit);
                                            _btn_submit.next('.ui-loading').hide();
                                            AA.Vip.warning(_input.next('.ui-tip') ,'购买/续费失败');
                                            _input.val("");
                        	    		}else{
                        	    			AA.Helper.enabled(_btn_submit);
                                            _btn_submit.next('.ui-loading').hide();
                                            AA.Vip.warning(_input.next('.ui-tip') ,'系统繁忙');
                                            _input.val("");
                        	    		}
                        	    	}
                        	    }
                        	});
                        }
                    });
                }
            });
        } ,
        /**
         * 开通Vip
         */
        opened:function () {
        	var _type = $('#dotype').val(),
                _title = _type == '1' ? '开通VIP' : (_type == '2' ? '续费VIP' : '升级VIP'),
                _dialog_title = _type == '1' ? '开通VIP会员' : (_type == '2' ? 'VIP会员续费' : '免费开通VIP会员');

            $.dialog({
                title:_title ,
                padding:'36px' ,
                content:$('#wgt-dialog-opened-vip-wrapper').html() ,
                initialize:function () {
                    var _dialog = this,
                        _form = $('#opened-vip-form'),
                        _btn_submit = _form.find('#sub'),
                        _save=_form.find('#save');
                        _referrer = $('#referrer'),
                        _vipfee = parseFloat($('#vipfee').val()),
                        _money=0,
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
                    
                    _save.click(function(){
                    	
                    	_auto = $('#is_auto').attr('checked') ? 1 : 0;
                    			
                    	$.ajax({
                    		
                    		url:AA.Helper.buildUrl('vip/save_auto_vip'),
	           				 data:{auto:_auto},
	           				 type:'POST' ,
	           		         dataType:'json',
	           		         success:function (result) {
	           		        	 if(result.state==1){
	           		        		 
	           		        		 $.alert({
	            						 tipCls:'success1' ,
	            			             title:'VIP续费设置已保存!' ,
	            			             content:'',
	            			             txtBtn:'确定',
	            			             
	            			             init:function (d ,btn ) {
	            			            	 btn.click(function () {
	            			            		 d.close();
	            			            		 $.ajax({
	            			                 		
	            			                 		url:AA.Helper.buildUrl('vip/get_user_auto_vip'),
	            			           				 data:{},
	            			           				 type:'POST' ,
	            			           		         dataType:'json',
	            			           		         success:function (result) {
	            			           		        	 
	            			           		        	 if(result.state==1){
	            			           		        		 
	            			           		        		
	            			           		        		
	            			           		        		if(result.auto==1){
	            			           		        			
	            			           		        			$('#is_auto').attr('checked',true);
	            			           		        			$('#state').html('续费已开启');
	            			           		        		}else{
	            			           		        			
	            			           		        			$('#is_auto').attr('checked',false);
	            			           		        			$('#state').html('续费已关闭');
	            			           		        		}
	            			           		        		
	            			           		        	 }
	            			           		         }
	            			                 		
	            			                 	});
	            		                	 });
	            			            	 
	            			             }
	            						 
	            					 });
	           		        		 
	           		        		return ;
	           		        	 }else if(result.state==1009){
	           		        		 
	           		        		 AA.RapidLogin.popup();
	           		        		return ;
	           		        	 }
	           		        	 
	           		        	 
	           		         }
                    	});
                    	
                    });

                    _btn_submit.click(function () {
                        var _year = _form.find('input[name="year"]:checked').val(),
                            _auto = $('#is_auto').attr('checked') ? _year : 0,
                            _tip = _referrer.next('em'),
                            _val = $.trim(_referrer.val()),
                            _lackBanlance = _total_money < (_vipfee * parseFloat(_year)),
                            _data = {
                                lackBanlance:_lackBanlance ,
                                title:_title ,
                                dialogTitle:_dialog_title ,
                                type:_type ,
                                year:_year ,
                                auto:_auto ,
                                money:_money = parseFloat(_vipfee) * parseFloat(_year) + '.00' ,
                                name:_val
                            };

                        if (_val != '') {
                            AA.Helper.disabled(_btn_submit);
                            _btn_submit.next('.ui-loading').show();
                            AA.Api.User.checkReferrer({
                                name:_val
                            } ,function (result) {
                                AA.Helper.enabled(_btn_submit);
                                _btn_submit.next('.ui-loading').hide();
                                if (result.state == 1) {
                                    _dialog.close();
                                    AA.Vip.doPay(_data);
                                } else if (result.state == -2) {
                                    AA.Vip.warning(_tip ,'该用户不存在');
                                } else {
                                    if (result.error == 3019) {
                                        AA.Vip.warning(_tip ,AA.Helper.buildError(result.error));
                                    }

                                    if (result.error == 1009) {
                                        _dialog.close();
                                        AA.RapidLogin.popup();
                                    }
                                }
                            });
                        } else {
                            _dialog.close();
                            AA.Vip.doPay(_data);
                        }
                        return false;
                    });
                }
            });
        } ,
        /**
         * 邀请
         */
        invite:function (index,t) {
            $.dialog({
                title: ((typeof t)=='undefined'?'推荐好友':t) ,
                padding:'36px' ,
                content:$('#wgt-dialog-invite-wrapper').html() ,
                initialize:function () {
                    var _dialog = this,
                        clip = null,
                        _url = '/action/reg_invite';

                    $('.wgt-tab').tab({event:'click'});

                    $('.wgt-dialog-invite .wgt-dialog-title').html($('#dialog-title').val());
                    if ($('#clip_button').length == 1) {
                        ZeroClipboard.setMoviePath(AA.Helper.buildUrl('/s/vendor/ZeroClipboard/ZeroClipboard10.swf'));
                        clip = new ZeroClipboard.Client();
                        clip.setHandCursor(true);
                        clip.addEventListener('mouseOver' ,function (client) {
                            var _cont = $('.invite-content').html().replace(/<\/?[^>]*>/g ,'');
                            clip.setText(_cont);
                        });

                        clip.addEventListener('complete' ,function (client ,text) {
                            _dialog.close();

                            $.alert({
                                padding:'45px 0 0 55px',
                                tipCls:'success1' ,
                                title:'已复制到剪切板，请粘贴发送给您的好友！' ,
                                content:$('#dialog-content').val() ,
                                txtBtn:'确 定' ,
                                url:_url
                            });
                        });

                        clip.glue('clip_button' ,'clip_container');

                        if (index > 0) {
                            $('.invite-content').html($('#cont').val());
                            $('.wgt-tab-trigger .item').eq(index).trigger('click');
                        }
                    }
                }
            });
        } ,
        /**
         * 验证成功提示
         * @param _tip        提示元素(jquery对象)
         * @return {Boolean}
         */
        success:function (_tip) {
            _tip.removeClass('error').html('');
            AA.Vip.isValid = true;
            return true;
        } ,
        /**
         * 验证失败提示
         * @param _tip        提示元素(jquery对象)
         * @param error       提示信息
         * @return {Boolean}
         */
        warning:function (_tip ,msg) {
            _tip.addClass('error').removeClass('success').show().html(msg);
            AA.Vip.isValid = false;
            return false;
        }
    }
})(AA);

AA.Vip.init();
