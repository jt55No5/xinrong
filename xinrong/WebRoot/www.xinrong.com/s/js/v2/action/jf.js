
Lottery={

		lotteryBox:null ,// 获取lotteryBox对象
        index:0 ,// 当前亮区位置
        prevIndex:0 ,// 前一位置
        lastIndex:16 ,// 末尾索引
        endIndex:0 ,// 决定在哪一格变慢
        time:null ,// 定时器
        speed:250 ,// 初始速度
        cycle:0 ,// 转动圈数
        endCycle:0 ,// 计算圈数
        flag:false ,// 结束转动标志
        quick:0 ,// 加速
        quickIndex:5 ,// 加速
        arr:null ,// 初始化数组
        addressInfo:null ,// 收货地址
        prize:null ,// 奖品
        score:0 ,// 积分
        isValid:false ,

		init:function(data){

			var lottery = Lottery,
            _integral = parseFloat($('#integral').html()),
            _min_integral = 1000;
			lottery.addressInfo = data;
			$('#btn-lottery').click(function () {

				$('#btn-lottery').removeClass('JFSub');
				$('#btn-lottery').addClass('JFSub02');

				$('#btn-lottery').attr('disabled',true);

				    if (!AA.Api.User.isAuth) {
	                    AA.RapidLogin.popup();
	                    return false;
	                }else if (_integral < _min_integral) {
	                    $.alert({
	                        padding:'45px 0 0 55px' ,
	                        title:'您的积分不足！' ,
	                        content:'您的积分低于' + _min_integral + '分，无法进行抽奖，请先投资获得积分再抽奖。' ,
	                        txtBtn:'立即投资' ,
	                        url:'/invest.shtml' ,
	                        txtBtn1:'立即充值' ,
	                        url1:'my/recharge'
	                    });
	                    return false;
	                } else {

	                	AA.Api.Action.draw({activeId:actionId} ,function (result) {

	                		if (result.state == 0) {

	                			_prize= result.data;

                                _score = parseFloat($('#integral').html());

	                            lottery.prize = {
	                                id:_prize.order ,
	                                name:_prize.name ,
	                                type:_prize.isPhysical
	                            };

	                            // lottery.score = _d.user.score;
	                            $('#integral').html(_score - _min_integral);
	                            $('.LeftPrize').addClass('LeftPrize01');
								Lottery.refreshScore();
	                            lottery.startLottery();
	                		}else{
	                			 if (result.state == 1009) {
	                                 AA.RapidLogin.popup();
	                             }else if(result.state==-2){
			                         $.alert({
			                             padding:'45px 0 0 55px' ,
			                             title:'您尚未完成实名认证！' ,
			                             content:'友情提示：完成实名认证才能抽奖！' ,
			                             txtBtn:'立即认证' ,
			                             url:'/2.0/views/account/account_settings.shtml',
			                         });
			                     }
								  else {
	                                 $.alert({
	                                     title:AA.Helper.buildError(result.state) ,
	                                     txtBtn:'关 闭' ,
	                                     url:'action/jf' ,
	                                     refresh:true
	                                 });
	                             }
	                			 $('#btn-lottery').removeClass('JFSub02');
	     						$('#btn-lottery').addClass('JFSub');

	     						$('#btn-lottery').attr('disabled',false);
	                		}

	                	});


	                	/* lottery.prize = {
	                                id:3 ,
	                                name:'iphone 5' ,
	                                type:1
	                            };

	                	 lottery.startLottery();*/
	                }
					Lottery.refreshScore();
			});

			 $('#my-prizes').click(function () {


	                if (!AA.Api.User.isAuth) {
	                    AA.RapidLogin.popup();
	                    $('#btn-lottery').removeClass('JFSub02');
						$('#btn-lottery').addClass('JFSub');

						$('#btn-lottery').attr('disabled',false);
	                    return false;
	                } else {


	                    $.dialog({
	                        title:'我的奖品' ,
	                        content:$('#wgt-dialog-my-prizes-wrapper').html() ,
	                        initialize:function () {
	                            var _address_panel = $('#my-address');

	                            Lottery.load(1);

	                            _address_panel.find('.ui-button').click(function () {
	                                var _address = $.trim($('#address').val()),
	                                    _tip = _address_panel.find('.ui-tip');
	                                //_address_panel.find('.ui-loading').show();
	                                AA.Api.Action.myAddress({address:_address} ,function (result) {
	                                    //_address_panel.find('.ui-loading').hide();
	                                    if (result.state == 1) {
	                                        _tip.html('保存成功').removeClass('error').addClass('success').show();
	                                    } else {
	                                        _tip.html('保存失败').removeClass('success').addClass('error').show();
	                                    }
	                                    _tip.fadeOut(2000);
	                                });
	                            });
	                        }
	                    });
	                }
	            });


			 $('#my-address').click(function () {
	                if (!AA.Api.User.isAuth) {
	                    AA.RapidLogin.popup();
	                    return false;
	                } else {
	                    $('.lottery .fill').css({'background-image':'none'});
	                    $('.fill-form p.ui-tip').html('请确认收货地址，您抽中的礼品将在中奖后30个工作日内发放。');
	                    Lottery.setAddressInfo(lottery ,null ,1);
	                }
	            });




		},
		startLottery:function(){

			var lottery = Lottery,
            _prizeId = parseInt(lottery.prize.id),
            _endIndex = _prizeId - 7;//停止前7格开始减速


	        clearInterval(lottery.time);
	        _endIndex = _endIndex < 0 ? _prizeId + 7 : (_endIndex == 0 ? 1 : _endIndex);

	        lottery.cycle = 0;
	        lottery.flag = false;
	        lottery.endIndex = _endIndex;
	        lottery.endCycle = AA.Helper.getRandom(3 ,6);//4-7圈
	        lottery.time = setInterval(lottery.start ,lottery.speed);
		},
		 start:function () {



			 	$('#p_tab1').addClass('cur');

			 	$('#p_tab2').addClass('cur');

			 	$('#p_tab3').addClass('cur');

				var lottery = Lottery;

				if(lottery.prevIndex!=0){
					$('#p_'+lottery.prevIndex).removeClass('cur');
				}

				$('#p_'+lottery.index).addClass('cur');

				//获取中奖对象
				var cur_value=$("[v='"+lottery.prize.id+"']")

				 //跑马灯变速
	            if (lottery.flag == false) {
	                //走N格开始加速
	                if (lottery.quick == lottery.quickIndex) {
	                    clearInterval(lottery.time);
	                    lottery.speed = 30;
	                    lottery.time = setInterval(lottery.start ,lottery.speed);
	                }
	                //跑N圈减速
	                if (lottery.cycle == lottery.endCycle + 1 && lottery.index == parseInt(lottery.endIndex)) {

	                    clearInterval(lottery.time);
	                    lottery.speed = 180;
	                    lottery.flag = true;       //触发结束
	                    lottery.time = setInterval(lottery.start ,lottery.speed);
	                }
	            }


				//跑完一圈，重置
				if(lottery.index>16){
					lottery.index=0;
					lottery.prevIndex=0;
					 lottery.cycle++;
					$('.pz').removeClass('cur');
				}


				//抽奖结束
				if (lottery.flag == true && 'p_'+lottery.index == cur_value.attr('id')){
					 lottery.quick = 0;
		             clearInterval(lottery.time);

		             $('#btn-lottery').removeClass('JFSub02');
						$('#btn-lottery').addClass('JFSub');

						$('#btn-lottery').attr('disabled',false);

		             //抽奖结果
		             lottery.prize_name = (lottery.prize.type == 0 ? '' : '一台') + lottery.prize.name;

		             if (lottery.prize.type == 0) {
		                    setTimeout((function () {
		                        $.alert({
		                            lock:false ,
		                            tipCls:'success1' ,
		                            title:'恭喜您抽中' + lottery.prize_name + '！' ,
		                            content:'您抽中的'+ lottery.prize_name + '将在半小时内发放，请注意查收。' ,
		                            txtBtn:'继续抽奖' ,
		                            url:'action/jf' ,
		                            txtBtn1:'分享我的好运' ,
		                            init:function (dialog ,btn ,btn1) {
		                                btn1.click(function () {
		                                    Lottery.share();
		                                });
		                            }
		                        });
		                        //更新积分
		                        // $('#integral').html(lottery.score);
		                        $('#btn-lottery').attr('disabled' ,false).removeClass('disabled');
		                    }) ,500);
		                } else {
		                    setTimeout((function () {
		                        Lottery.setAddressInfo(lottery ,lottery.prize ,2);
		                        //更新积分
		                        // $('#integral').html(lottery.score);
		                        //$('#btn-lottery').attr('disabled' ,false).removeClass('disabled');
		                    }) ,500);
		                }
				}

				lottery.prevIndex=lottery.index;
				lottery.index++;
				lottery.quick++;
		 },
	        /**
	         * 分享我的好运
	         */
	        share:function () {
	            var prize = Lottery.prize,
	                prize_name = (prize.type == 1 ? '' : '一台') + prize.name,
	                share_text = '#信融财富#我发现了一个不错的投资理财平台，投资所得积分还可用来抽奖，奖品有iPhone、iPad4还有微软Surface等，我刚刚抽中了' + prize_name + '呢，你也一起来投资换积分抽奖吧！';

	            $("#dialog-title").val("分享我的好运");
	            $("#cont").val(share_text);
	            $('#share-form').submit();
	        }
		 ,
	        success:function (_tip) {
	            _tip.hide();
	            Lottery.isValid = true;
	            return true;
	        } ,
	        warning:function (_tip ,msg) {
	            _tip.addClass('error').removeClass('success').show().html(msg);
	            Lottery.isValid = false;
	            return false;
	        }
		 ,
		 /**
         * 收货地址
         */
        setAddressInfo:function (lottery ,prize ,type) {
            $.dialog({
                title:'收货地址' ,
                content:$('#wgt-dialog-address-wrapper').html() ,
                initialize:function () {
                    var _dialog = this, _province, _city, _district, _address;

                    AA.Address.init(lottery.addressInfo);
                    if (prize) {

                        $('.happy').html('恭喜您抽中' + prize.name + '！');
                    } else {
                        $('.fill-form .happy').hide();
                    }
                    $('#address').val(lottery.addressInfo.address);

                    //1.填写地址
                    $('.btn-next').click(function () {
                        var _tip = $('.btn-next').nextAll('.ui-tip'),
                            _warning = Lottery.warning,
                            _success = Lottery.success;

                        _province = $('#province option:selected').text();
                        _city = $('#city option:selected').text();
                        _district = $('#district option:selected').text();
                        _address = $.trim($('#address').val());

                        if (_province == '请选择省份') {
                            return _warning(_tip ,'请选择省份');
                        } else if (_city == '请选择城市') {
                            return _warning(_tip ,'请选择城市');
                        } else if (_district == '请选择地区') {
                            return _warning(_tip ,'请选择地区');
                        } else if (_address == '') {
                            return _warning(_tip ,'请填写详细收货地址');
                        } else {
                            _success(_tip);

                            if (Lottery.isValid) {
                                $('.wgt-dialog-address').removeClass('fill').addClass('confirm');

                                $('.address-info').html(
                                    _province + '省，' +
                                        _city + '市，' +
                                        _district + '，' +
                                        _address
                                );
                            }
                        }

                        return false;
                    });

                    //2.确认地址
                    $('.confirm-form .ui-button-white').click(function () {
                        $('.wgt-dialog-address').removeClass('confirm').addClass('fill');
                    });

                    //3.提交地址
                    $('.btn-submit').click(function () {
                        $('#is-refresh-page').val('0');

                        AA.Api.Action.myAddress({
                            province:_province ,
                            city:_city ,
                            district:_district ,
                            address:_address
                        } ,function (result) {
                            _dialog.close();
                            if (result.state == 1) {
                                if (type == 1) {
                                    $.alert({
                                        tipCls:'success1' ,
                                        title:'修改成功！' ,
                                        content:'您的收货地址已提交成功，现在可以继续抽奖了。' ,
                                        txtBtn:'继续抽奖' ,
                                        url:'action/jf' ,
                                        refresh:true
                                    });
                                } else {
                                    $.alert({
                                        tipCls:'success1' ,
                                        title:'提交成功！' ,
                                        content:'您的收货地址已提交成功，现在可以继续抽奖了。' ,
                                        txtBtn:'继续抽奖' ,
                                        url:'action/jf' ,
                                        txtBtn1:'分享我的好运' ,
                                        init:function (dialog ,btn ,btn1) {
                                            btn1.click(function () {
                                                Lottery.share();
                                            });
                                        } ,
                                        refresh:true
                                    });
                                }
                            }
                        });

                        return false;
                    });
                } ,
                beforeunload:function () {
                    if ($('#is-refresh-page').val() == '1') {
                        location.reload(true);
                    }
                }
            });
        },
        /**
         * 加载我的奖品
         * @param pageIndex
         */
        load:function (pageIndex) {

            AA.Api.Action.myPrize({action_id:actionId ,page:pageIndex} ,function (result) {
                var _page_size = 5;

                $(".wgt-datagrid").datagrid({
                    'caption':'奖品' ,
                    'displays':['抽奖时间','奖品','状态'] ,
                    'fields':['date','name','status'] ,
                    "data":result ,
                    "render":function (rows ,body) {
                        var _body_html = '';
                        $.each(rows ,function (index ,row) {
                            var _is_send = row.is_send == 0,
                                _tdCls = _is_send ? '' : 'disabled',
                                _status = _is_send ? '未发放' : '已发放';

                            _body_html +=
                                '<tr>\
                                   <td class="first">' + AA.Helper.date(row.c_time ,'Y-m-d h:m:s') + '</td>\
                                   <td class="name">' + row.name + (row.code == 'reward_money' ? '<a href="' + AA.Helper.buildUrl('my/consume') + '" target="_blank">查看</a>' : '') + '</td>\
                                   <td class="' + _tdCls + ' last">' + _status + '</td>\
                                </tr>';
                        });

                        body.html(_body_html);

                        if (result.data.total > _page_size) {

                            $('#wpt').pagination({
                                'pageSize':_page_size ,
                                'total':result.data.total ,
                                'pageIndex':pageIndex ,
                                'callback':'Lottery.load' ,
                                'showPageNum':false
                            });
                        } else {
                            $('#wpt').hide();
                        }
                    }
                });
            });
        },
		refreshScore:function()
		{
			UserAPI.AccountIndexInfo({},function(result){
				if(result.state==0)
				{
					Lottery.score=result.score;
					$('#integral').html(result.score);
				}
				else
				{
					$this.showDialogRedirect("警告","获取账户信息失败");
				}
			});
		}
}
