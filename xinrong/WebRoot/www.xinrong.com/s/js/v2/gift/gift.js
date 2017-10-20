var loc;
AA.gift={
	start_time:0,
	max_reward:0,
	user_info:null,
	gift_ty:0,
	enable_click:true,
	vip_discount:null,
	jobId:0,
	end_time:0,
	cur_time:0,
	dd:undefined,
	dd2:undefined,
	dd3:undefined,
	dd4: undefined,
	curMoney:0,
	gid:-1,
	xcbMoney:0,
	totalMoney:0,
	is_special:0,
	accountAssetOverview:null,
	init:function(){
		AA.gift.initLogin();
		AA.gift.load_vip_discount();
		AA.gift.init_dialog();
		AA.gift.show_gift_dialog();
		AA.gift.getAccountAssetOverview();	
	},
	//初始化登录状态
	initLogin:function(){
		if (!AA.Api.User.isAuth) {//没有登录
			$('#show_wish_no_wish').hide();
			$('#show_wish').hide();
			$('#show_wish_no_login').show();
		}else{
			$('#show_wish_no_wish').show();
			$('#show_wish').hide();
			$('#show_wish_no_login').hide();
			AA.gift.load_user_info();
			//AA.gift.load_my_wish();

			$('#btn_my_gift').click(function () {
				if (!AA.Api.User.isAuth) {
					AA.RapidLogin.popup();
					return false;
				} else {
					AA.gift.load_my_gift(1);
				}
			});
		}
	},
	getAccountAssetOverview:function(){
		UserAPI.AccountAssetOverview({},function(result){
			AA.gift.accountAssetOverview=Number(result.accountBalance)+
					Number(result.xcbTotalMoney)+
					Number(result.rewardMoney)+
					Number(result.earningMoney)+
					Number(result.moneyWithdraw)+
					Number(result.overdue);
				})
	},
	
	//加载个人心愿
	load_my_wish:function(){
		$.ajax({
			url: '/v2/my_wish.jso',
			type: 'GET',
			success: function (result) {
			},
			error: function (rs) {
				if (rs.status == 200) {
					var json = JSON.parse(rs.responseText);
					var data = json.data;
					if (json.state == 0) {
						//写下心愿
						if (data != undefined && data.length > 0) {
							//alert(data[0].giftName);
							$('#show_wish_no_wish').hide();
							$('#show_wish').show();
							$('#show_wish_no_login').hide();
						} else {
							//没有写下心愿
							$('#show_wish_no_wish').show();
							$('#show_wish').hide();
							$('#show_wish_no_login').hide();
						}
					}
				}
			}
		});
	},
	//加载热门兑换记录
	load_hot_gift:function(pi,sp){
		$('.JphFy').html('');

		if(pi==undefined){
			pi=1;
		}

		if(sp!=undefined){
			$('#specail_title').css("font-weight","bold");
			$('#hot_gift_title').css("font-weight","normal");

		}else{
			$('#specail_title').css("font-weight","normal");
			$('#hot_gift_title').css("font-weight","bold");
		}

		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_list.jso'),
			data:{type:-1,pageSize:8,pageIndex:pi,channelVendor:-1},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var data = result.data;
					if (data != undefined && data.length > 0) {
						var _html = '';
						var length = data.length;

						if (data.length > 32) {
							length = 8;
						}

						for (var i = 0; i < length; i++) {
							if ((i + 1) != 0 && (i + 1) % 4 == 0) {
								_html += '<li class="paddingRight li_hot" id=li_hot_' + i + ' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/l_size/' + data[i].imgSrc + '" height="132" />';
							} else {
								_html += '<li class="li_hot" id=li_hot_' + i + ' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/l_size/' + data[i].imgSrc + '"  height="132" />';
							}

							var gname = data[i].name;
							if(data[i].channelVendor == 3){
								var channelOriPrice = data[i].channelOriPrice | 0;
								price = '市场价：￥'+channelOriPrice+'';
							}else{
								var price = "市场价：￥" + data[i].money + "";
							}

							//特惠处理
							if(data[i].isDiscounted == 1){
								var cover = AA.gift.get_discount_cover(data[i]);
								if(cover) _html += cover;
								_html += "</span>";
								price = "<span class='black'>特惠价：<font class='c30808'>￥" + data[i].money + "</font></span>";
							}else{
								_html += ("<span>Hot</span></span>");
							}

							_html += ' <span class="Fontbg"><h2 style="overflow:hidden;" title=\'' + data[i].name + '\' >' + gname + '</h2>';

							if(data[i].channelVendor == 3){
								_html+= '<p><span class="left">'+price+'</span></p>';
								_html += ' <p class="c999"> <span class="black"><b>渠道价：</b><font class="c30808">￥'+ data[i].money +'</font></span><a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',1);" class="SubVip right" id=btn_hot_' + i + ' >购买</a></p>';
							}else{
								_html += ' <p class="c999"><span class="left">'+price+'</span><a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',1);" class="SubVip right" id=btn_hot_' + i + ' >购买</a></p>';

								var show_socre = data[i].socre;
								if (show_socre > 9999) {
									show_socre = Number(show_socre / 10000.0) + '万';
								}

								if (data[i].id == 408) {
									_html += '<p>仅限VIP兑换<a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ');" class="SubVip pink right" id=btn_special_' + i + ' >兑换</a></p>';
								} else {
									_html += '<p>普通用户：<span class="c30808">' + show_socre + '</span><a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ');" class="SubVip pink right" id=btn_special_' + i + ' >兑换</a></p>';
								}
								_html += AA.gift.count_vip_discount(data[i].socre, i, 'hot');
								_html += '</span></li>';
							}

						}

						$('#ul_hot_gift').html(_html);

						for (var i = 0; i < data.length; i++) {
							AA.gift.add_gift_mouseover('hot', i);
						}

					}
				}
			},
			error:function (rs) {
			}
		});
	},
	//加载
	load_specail_list:function(jid,pi){
		$('.JphFy').html('');

		if(jid!=undefined){
			AA.gift.jobId=jid;
		}

		$('#hot_gift_title').css("font-weight","normal");
		$('#specail_title').css("font-weight","bold");

		var pz=8;

		if(pi==undefined){
			pi=1;
		}

		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_special_list.jso'),
			data:{pageSize:8,pageIndex:pi,jobId:AA.gift.jobId},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var data=result.data;

					if(data!=undefined&&data.length>0){
						var _html='';

						for (var i = 0; i < data.length; i++) {
							if ((i + 1) != 0 && (i + 1) % 4 == 0) {
								_html += '<li class="paddingRight li_hot" id=li_special_' + i + ' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/l_size/' + data[i].imgSrc + '" height="132" /><span>Hot</span></span>';
							} else {
								_html += '<li class="li_hot" id=li_special_' + i + ' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/l_size/' + data[i].imgSrc + '"  height="132" /><span>Hot</span></span>';
							}
							var gname = data[i].name;

							_html += ' <span class="Fontbg"><h2 style="overflow:hidden;" title=\'' + data[i].name + '\' >' + gname + '</h2>';

							//ulrich
							if (data[i].type != 9) {
								if (data[i].type == 10 || data[i].type == 2 || data[i].type == 11 || data[i].type == 12 ) {
									_html += ' <p class="c999"><span class="left">抢购价：￥' + data[i].money + ' </span><a href="javascript:AA.gift.show_confirm_speical_exchange(' + data[i].id + ',1);" class="SubVip right" id=btn_special_' + i + ' >购买</a></p>';
								}else if(data[i].type == 13){
                                    _html += ' <p class="c999"><span class="left">抢购价：￥' + data[i].money + ' </span><a href="javascript:AA.gift.show_confirm_speical_exchange(' + data[i].id + ',1,1);" class="SubVip right" id=btn_special_' + i + ' >购买</a></p>';
								} else {
									_html += ' <p class="c999"><span class="left">抢购价：￥' + data[i].money + ' </span><a href="javascript:AA.gift.show_confirm_speical_exchange(' + data[i].id + ',0);" class="SubVip right" id=btn_special_' + i + ' >兑换</a></p>';
								}
							} else {
								_html += ' <p class="c999"><span class="left">抢购价：￥' + data[i].money + ' </span><a href="javascript:AA.gift.show_special_order_detail(' + data[i].id + ');" class="SubVip right" id=btn_special_' + i + ' >购买</a></p>';
							}

							var show_socre = data[i].socre;
							if (show_socre > 9999) {
								show_socre = Number(show_socre / 10000.0) + '万';
							}
							if (data[i].type == 11 || data[i].type == 12 ) {
								_html += '<p>兑换积分：<font class="c30808">' + show_socre + '分</font></span><a href="javascript:AA.gift.show_confirm_speical_exchange(' + data[i].id + ',0);" class="SubVip pink right" id=btn_special_' + i + ' >兑换</a></p>';
							}else if(data[i].type == 13){
                                _html += '<p> </p>';
							}else{
								_html += '<p>兑换积分：<font class="c30808">' + show_socre + '分</font></p>';
							}
							// _html += '<div>限量<span class="c30808">' + (data[i].limitNum) + '</span>件<span style="float: right;padding-right:9px;">仅剩<font class="c30808">' + (data[i].limitNum - data[i].exchangeNum) + '</font>件</span></div>';
							_html += '<div><span style="float: left;padding-right:9px;">仅剩<font class="c30808">' + (data[i].limitNum - data[i].exchangeNum) + '</font>件</span></div>';
							_html += '</span></li>';
						}

						$('#ul_hot_gift').html(_html);
						for (var i = 0; i < data.length; i++) {
							AA.gift.add_gift_mouseover('special', i);
						}

						if (result.total > 8) {
							var html = '';
							var length = result.total;
							var pz = length % 8 == 0 ? parseInt(length / 8) : parseInt((length / 8) + 1);

							for (var i = 0; i < pz; i++) {
								if (pi - 1 == i) {
									html += '<span>' + (i + 1) + '</span>';
								} else {
									html += '<a href="javascript:AA.gift.load_specail_list(' + jid + ',' + (i + 1) + ')" >' + (i + 1) + '</a>';
								}
							}
							$('.JphFy').html(html);
						}
					}
				}
			}
		});
	},
	//加载最近兑换记录
	load_near_exchange:function(){
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/near_exchange_list.jso'),
			data:{pageSize:15,pageIndex:1,type:0},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var rs=result.data;

					if(rs!=undefined){
						var data=rs.rows;
						var _html='<ul>';

						for(var i=0;i<data.length;i++){
							var money = data[i].money == undefined ? 0 : data[i].money;
							var score = data[i].score;

							var str = '';
							if(money > 0 && score <= 0){
								str = '兑换金额:'+money + '元';
							}else if(score > 0 && money <= 0){
								str = '兑换积分:' + score + '分';
							} else {
								str = '金额/积分:' + money + '元/' + score + '分';
							}

							if ((i + 1) % 5 == 0 && i != 0) {
								_html += '<li class="Liborbot">\
	        								<span class="lifont">\
	        						 		<p>'+AA.Helper.date(data[i].time, 'm-d h:m:s')+'\
	        						 		<span class="MarginLeft">恭喜 '+data[i].userName+'</span></p>\
	        						 		<p>成功兑换 '+data[i].giftName+' </p>\
	        						 		<p >'+'<span style="color:red">'+data[i].num+'个'+'</span>'+' '+'<span class="c999">'+str+'</span>'+'</p></span>\
	        						 		<span class="lipic">\
	        						 		<img src="/s/images/jipinhui/gift/s_size/'+data[i].imgSrc+'" width="76" height="67" /></span>\
	        						 		<div class="clear"></div>\
        						 		</li>';
							} else {
								_html += '<li>\
	        							 	<span class="lifont">\
	        						 		<p>'+AA.Helper.date(data[i].time, 'm-d h:m:s')+'\
	        						 		<span class="MarginLeft">恭喜 '+data[i].userName+'</span></p>\
	        						 		<p>成功兑换 '+data[i].giftName+'</p>\
	        						 		<p >'+'<span style="color:red">'+data[i].num+'个'+'</span>'+' '+'<span class="c999">'+str+'</span>'+'</p></span>\
										<span class="lipic">\
	        						 		<img src="/s/images/jipinhui/gift/s_size/'+data[i].imgSrc+'" width="76" height="67" /></span>\
	        						 		<div class="clear"></div>\
        						 		</li>';
							}
						}

						_html+='</ul>';
						$('#near_exchange_list').html(_html);

						if(data.length>5){
							$("#near_exchange_list").jCarouselLite({auto:5000, speed:3000, vertical:true, visible:5, start:0, scroll:5,start: 0 });
						}
					}
				}
			}
		});
	},
	//加载礼品列表
	load_gift_list:function(pindex,ty,can_money){
		can_money=can_money||0;

		var giftListType = $('#find_gift_list_type').val();
		if(giftListType==1 || giftListType== 2){
			can_money=1;
		}

		if(ty!=undefined){
			AA.gift.gift_ty=ty;
			$('#gift_type_'+ty).css("font-weight","bold");

			for (var i = 0; i <= 12; i++) { //ulrich
				if(i!=ty){
					$('#gift_type_'+i).css("font-weight","normal");
				}
			}
		}
		var pz=12;
		var requestData = {catalog1: AA.gift.gift_ty, pageSize: pz, pageIndex: pindex, isMoneyExchange: can_money}

		if(giftListType == 0){
			$('#use_score_change').css("font-weight","bold").css("color","red");
			$('#use_money_change').css("font-weight","normal");
			$("#gift_exchange_type_score").attr("style","color:#f00;font-weight:bold;font-size:14px;");
			$("#gift_channel_goods").attr("style","color:#570000; font-size:14px;");
			$("#gift_exchange_type_money").attr("style","color:#570000; font-size:14px;");

		}else if(giftListType == 1){
			$('#use_money_change').css("font-weight","bold");
			$('#use_score_change').css("font-weight","normal");
			$("#gift_exchange_type_money").attr("style","color:#f00;font-weight:bold;font-size:14px;");
			$("#gift_channel_goods").attr("style","color:#570000; font-size:14px;");
			$("#gift_exchange_type_score").attr("style","color:#570000; font-size:14px;");
		}else{
			$('#use_money_change').css("font-weight","normal");
			$('#use_score_change').css("font-weight","normal");
			$("#gift_exchange_type_money").attr("style","color:#570000; font-size:14px;");
			$("#gift_channel_goods").attr("style","color:#f00;font-weight:bold;font-size:14px;");
			$("#gift_exchange_type_score").attr("style","color:#570000; font-size:14px;");

			requestData = {catalog1: AA.gift.gift_ty, pageSize: pz, pageIndex: pindex, isMoneyExchange: can_money,channelVendor:3}
		}

		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_list.jso'),
			data: requestData,
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var data=result.data;
					if(data!=undefined&&data.length>0){
						var _html='';
						for(var i=0;i<data.length;i++){
							if((data[i].type == 4) && can_money == 1){
								continue;
							}
							var buyStr = '购买';
							if(can_money == 0){
								buyStr = '兑换';
							}

							if(i!=0&&(i+1)%6==0){
								_html+='<li class="marginli" id=li_gift_'+i+' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/m_size/'+data[i].imgSrc+'" width="141" height="106"  /><span>Hot</span></span>';
							}else{
								_html+='<li id=li_gift_'+i+' style="cursor:pointer"><span class="Fontpic"><img src="/s/images/jipinhui/gift/m_size/'+data[i].imgSrc+'" height="106"  /><span>Hot</span></span>';
							}

							var gname=data[i].name;
							if(gname=="母亲节礼物,原价398,现价361,灵犀山茶油600ml*2礼盒装"){
								_html+=' <span class="Fontbg"><h2 style="overflow:hidden; color: red;" title=\''+data[i].name+'\' >'+gname+'</h2>';
							}else{
								_html+=' <span class="Fontbg"><h2 style="overflow:hidden;" title=\''+data[i].name+'\' >'+gname+'</h2>';
							}


							var price;
							if(giftListType != 2){
								price = "市场价：￥" + data[i].money + "";
							}else{
								var channelOriPrice = data[i].channelOriPrice | 0;
								price = '<span class="left">市场价：￥'+channelOriPrice+'</span>';
							}


							//特惠处理
							if(data[i].isDiscounted == 1){
								price = "<span class='black'>特惠价：<font class='c30808'>￥" + data[i].money + "</font></span>";
							}


							if(giftListType != 2){
								if(data[i].id == 408 || data[i].id == 564 || data[i].id == 398 || data[i].id == 1121){
									_html+='<p class="c999"><span class="left">' + price + '</span></p>';
								} else {
									_html += ' <p class="c999"><span class="left">' + price + '</span> <a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',1);" class="SubVip right" id=btn_gift_' + i + ' >购买</a></p>';
								}

								var show_socre=data[i].socre;

								if(show_socre>9999){
									show_socre=Number(show_socre/10000.0)+'万';
								}

								if(can_money == 0){
									if( data[i].id == 408){
										_html+='<p>仅限VIP兑换<a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',' + can_money + ');" class="SubVip pink right" id=btn_gift_' + i + ' >' + buyStr + '</a></p>';
									} else if (data[i].type == 9) {
										_html += ' <p>普通：'+show_socre+'分<a href="javascript:AA.gift.show_order_detail(' + data[i].id + ');" class="SubVip right" id=btn_gift_' + i + ' >' + buyStr + '</a></p>';
									} else {
										_html += ' <p>普通：'+show_socre+'分 <a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',' + can_money + ');" class="SubVip pink right" id=btn_gift_' + i + ' >' + buyStr + '</a></p>';
									}

									_html += AA.gift.count_vip_discount(data[i].socre, i, 'all');
								}else{
									if (AA.gift.gift_ty==7) {
										_html+='<p><span class="left">积分价：'+show_socre+'分</span></p>';
									} else {
										_html+='<p><span class="left">积分价：'+show_socre+'分</span><a href="/2.0/borrowing.html?c=gift" class="right SubVip01">分期</a></p><p class="clear"></p>';
									}
								}
							}else{
								_html+= '<p>' + price + '</p>';
								_html += ' <p class="c999"> <span class="black"><b>渠道价：</b><font class="c30808">￥'+ data[i].money +'</font></span><a href="javascript:AA.gift.show_confirm_exchange(' + data[i].id + ',' + can_money + ');" class="SubVip right" id=btn_gift_' + i + ' >' + buyStr + '</a></p>';

							}
							_html+='</span></li>';
						}

						$('#ul_gift').html(_html);

						$(".li_gift").hover(function() {
							var id=$(this).attr("id");
							id=id.substr(8);
							$('#btn_gift_'+id).show();
						},function(){
							var id=$(this).attr("id");
							id=id.substr(8);

							$('#btn_gift_'+id).hide();
						});

						for(var i=0;i<data.length;i++){
							AA.gift.add_gift_mouseover('all',i);
						}

						if(result.total>12){
							$('.wgt-pagination').show();
							$('.wgt-pagination').pagination({
								'pageSize':pz ,
								'total':result.total ,
								'pageIndex':pindex ,
								'callback':'AA.gift.load_gift_list'
							});
						}else{
							$('.wgt-pagination').hide();
						}
					}else{
						$('#ul_gift').html('');
					}
							var flag = XR.Global.GetUrlParam("flag") || "a";
					if(flag=="vipChangeInfo"){
										var url=document.location.href;
										if(url.match("flag")){
											url=url.substring(0,url.indexOf("?flag=vip"));
											history.replaceState(null, document.title, url);
										}
								$('#find_gift_list_type').val(0);
								$("#gift_exchange_type_score").attr("style","color:#f00;font-weight:bold;font-size:14px;");
								AA.gift.load_gift_list(1,4);
								$('#gift_type_'+4).css("font-weight","bold");
					}
				}
			} ,
			error:function (rs) {
			}
		});
	},
	//加载个人礼品列表
	load_my_gift:function(pindex){
		var pz=5;
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/my_exchange_list.jso'),
			data:{pageSize:pz,pageIndex:pindex},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				var data=result.data;
				if(result.state==0){
					if(data.rows.length==0){
						$.alert({
							tipCls:'info1' ,
							title:'目前您还没有兑换过礼品!' ,
							content:'',
							txtBtn:'立即兑换',
							txtBtn1:'收件信息',
							init:function (d ,btn,btn1 ) {
								btn.click(function () {
									d.close();
								});

								btn1.click(function () {
									d.close();
									window.location.href='/2.0/views/account/account_settings.shtml';
								});
							}
						});
						return;
					}
					$.dialog({
						title:'我的礼品' ,
						content:$('#wgt-dialog-my-gift-wrapper').html() ,
						initialize:function () {
							AA.gift.my_exchange_list_render(pindex,result);
						}
					});
				}
			} ,
			error:function (rs) {
			}
		});
	},
	my_exchange_list_render:function(pindex,result){
		var pz=5;
		if(result==undefined){
			$.ajax({
				url:AA.Helper.buildUrl('/v2/gift/my_exchange_list.jso'),
				data:{pageSize:pz,pageIndex:pindex},
				type:'GET' ,
				dataType:'json',
				success:function (result) {
					$("#wgt-datagrid_gift").datagridX({
						caption:'我的礼品' ,
						displays: ['兑换时间','礼品','积分/金额','状态'],
						fields:['time','gift','score','state'] ,
						data:result ,
						render:function (rows ,body) {
							var _html='';
							for(var i=0;i<rows.length;i++){
								var show_reward='';

								if(rows[i].type==4){
									show_reward='<a style="color:#0078B6;" class="blue" target="_blank" href="/my/consume">查看</a>';
								}
								var str = '' ;
								var money = rows[i].money;
								if(money > 0){
									str =   money + '元';
								}
								var score = rows[i].score;
								if(score > 0){
									var br = str == '' ? '' : '<br/>';
									str += br + score + '分';
								}

								_html+= '<tr>\
											<td style="width:70px;">'+AA.Helper.date(rows[i].time, 'm-d h:m:s')+'</td>\
											<td>'+rows[i].giftName+' ('+rows[i].num+'个) '+show_reward+'</td>\
											<td style="width:70px;">'+str+'</td>\
											<td style="width:55px;">兑换成功</td>\
										</tr>';
							}

							var d = result.data;
							$('.wgt-pagination').pagination({
								'pageSize':pz ,
								'total':d.total ,
								'pageIndex':pindex ,
								'callback':'AA.gift.my_exchange_list_render'
							});
							body.html(_html);
						},
						error:function () {
						}
					});
				}
			});
		}else{
			$("#wgt-datagrid_gift").datagridX({
				caption:'我的礼品' ,
				displays: ['兑换时间','礼品','积分/金额','状态'],
				fields:['time','gift','score','state'] ,
				data:result ,
				render:function (rows ,body) {
					var _html='';
					for(var i=0;i<rows.length;i++){
						var show_reward='';

						if(rows[i].type==4){
							show_reward='<a style="color:#0078B6;" class="blue" target="_blank" href="/my/consume">查看</a>';
						}

						var str ='';
						var money = rows[i].money;
						if(money > 0){
							str = money + '元';
						}
						var score = rows[i].score;
						if(score > 0){
							var br = str == '' ? '' : '<br/>';
							str += br + score + '分';
						}
						var show_status='';
						//var send=rows[i].isSend；
						var send=rows[i].isSend;
						if(rows[i].isSend==3){
							show_status='退款成功';
						}else{
							show_status='兑换成功';
						}
						
						_html+= '<tr>\
									<td style="width:70px;">'+AA.Helper.date(rows[i].time, 'm-d h:m:s')+'</td>\
									<td>'+rows[i].giftName+' ('+rows[i].num+'个) '+show_reward+'</td>\
									<td style="width:70px;">'+str+'</td>\
									<td style="width:55px;">'+show_status+'</td>\
								</tr>';
					}

					var d = result.data;
					$('.wgt-pagination').pagination({
						'pageSize':pz ,
						'total':d.total ,
						'pageIndex':pindex ,
						'callback':'AA.gift.my_exchange_list_render'
					});

					body.html(_html);
				},
				error:function () {
				}
			});
		}
	},
	load_special_job:function(){
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_special_job.jso'),
			data:{},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				var data=result.data;

				if(data!=null&&data!=undefined){
					AA.gift.jobId=data.id;
					AA.gift.start_time=data.startTime;
					AA.gift.end_time=data.endTime;

					if(AA.gift.cur_time/1000>=AA.gift.start_time){
						$('.TabTime').hide();
					}else{
						$('.TabTime').show();
					}

					$('.Tabfont').html('<i class="ui-tip info"></i> '+data.title+'');
					$('.Tabfont').show();

					AA.gift.countDownTime();

					AA.gift.load_specail_list();

					$('#hot_gift_title').css("font-weight","normal");
					$('#specail_title').css("font-weight","bold");
				}else{
					$('#specail_title').hide();
					$('#specail_title_1').hide();

					//$('#specail_title').css("font-weight","normal");
					$('#hot_gift_title').css("font-weight","bold");

					AA.gift.load_hot_gift();
				}
				// $('#specail_title').hide();
				// $('#specail_title_1').hide();

				//$('#specail_title').css("font-weight","normal");
				//$('#hot_gift_title').css("font-weight","bold");

				// AA.gift.load_hot_gift();
			} ,
			error:function (rs) {
			}
		});
	},
	//倒计时
	countDownTime:function(){
		var sTime=AA.gift.start_time;
		var _nowtime = AA.gift.cur_time;
		if(_nowtime/1000>=sTime){
			$('.TabTime').hide();
			$('.Tabfont').html('<i class="ui-tip info"></i> '+AA.Helper.date(AA.gift.end_time,"Y-m-d h:m:s")+' 结束');
			return;
		}

		var _second = Math.round((sTime*1000 - _nowtime)  / 1000);

		if (_second < 0) {
			if (timer==undefined&&!timer) {
				$('.TabTime').hide();
				$('.Tabfont').html('<i class="ui-tip info"></i> '+AA.Helper.date(AA.gift.end_time,"Y-m-d h:m:s")+' 结束');
				clearTimeout(timer);
			}
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

		if(_day>0){
			$('.TabTime').html('<b>' + _day + '</b> 天 <b>' + _hour + '</b> 时 <b>' + _min + '</b> 分 <b>' + _sec + '</b> 秒');
		}else{
			$('.TabTime').html('<b>'+_hour+'</b> 时 <b>'+_min+'</b> 分 <b>'+_sec+'</b> 秒');
		}

		//AA.gift.cur_time=AA.gift.cur_time+1000;

		timer = setTimeout(AA.gift.countDownTime ,1000);
	},
	exchange_gift:function(id,pass,num,d,score,callBackFunction){
		var time=parseInt((new Date().getTime())/1000);
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/exchange_gift.jso'),
			data:{gid:id,time:time,num:num,pass:AA.Helper.encrypPw(pass),vip:G_ENV_VAR.VIP},
			type:'POST' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					d.close();
					AA.gift.load_user_info(function(){
						AA.gift.load_can_exchange_gifts();
					});

					AA.gift.show_exchange_success(result.data,num);
				}else if(result.state==1003){
					d.close();
					AA.gift.show_no_score(score*num);
				}else if(result.state==1008){
					d.close();
					AA.gift.show_max_score();
				}else if(result.state==1009){
					d.close();
					AA.RapidLogin.popup();
				}else if(result.state==1018){
					d.close();
					AA.gift.show_max_score1(result.msg);
				}else if(result.state==1200){
					if(d.closed == true){
						callBackFunction();
					}
					var _input=$('#ip_trade_pass');
					var _tip=$('#error_tip');
					_tip.addClass('error').html('请输入正确的交易密码');
					_input.focus();
				}else{
				}
			} ,
			error:function (rs) {
			}
		});
	},
	exchange_money_gift:function(id,pass,num,d,money){
		var time=parseInt((new Date().getTime())/1000);
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/exchange_money_gift.jso'),
			data:{gid:id,time:time,num:num,pass:AA.Helper.encrypPw(pass),vip:G_ENV_VAR.VIP},
			type:'POST' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					d.close();
					AA.gift.show_exchange_success(result.data,num);
				}else if(result.state==1030){
					d.close();
					AA.gift.show_no_money(money*num,num);
				}else if(result.state==1009){
					d.close();
					AA.RapidLogin.popup();
				}else if(result.state==1200){
					var _input=$('#ip_trade_pass');
					var _tip=$('#error_tip');
					_tip.addClass('error').html('请输入正确的交易密码');
					_input.focus();
				}else{
				}
			} ,
			error:function (rs) {
			}
		});
	},
	//特价礼品兑换
	exchange_speical_gift:function(id,pass,d,callBackFunction){
		var time=parseInt((new Date().getTime())/1000);
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/exchange_special.jso'),
			data:{sid:id,time:time,pass:AA.Helper.encrypPw(pass)},
			type:'POST' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					d.close();
					AA.gift.load_user_info(function(){
						AA.gift.load_can_exchange_gifts();
					});

					AA.gift.show_exchange_success(result.data,1);
				}else if(result.state==1009){//未登陆
					d.close();
					AA.RapidLogin.popup();
					return false;
				}else if(result.state==1002){//时间不符
					d.close();
					AA.gift.show_no_start_dlg(id);
				}else if(result.state==1008){
					d.close();
					AA.gift.show_max_score();
				}else if(result.state==1018){
					d.close();
					AA.gift.show_max_score();
				}else if(result.state==1006){
					d.close();
					AA.gift.show_special_limit(result.msg);
				}else if(result.state==1001){
					d.close();
					AA.gift.show_no_gift_num(result.msg);
				}else if(result.state==1200){
					if(d.closed){
						callBackFunction();
					}
					var _input=$('#ip_trade_pass');
					var _tip=$('#error_tip');
					_tip.addClass('error').html('请输入正确的交易密码');
					_input.focus();
				}else{
					// d.close();
					if(d.closed){
						callBackFunction();
					}
					var _tip=$('#error_tip');
					_tip.addClass('error').html('系统繁忙，请重试');
				}
			} ,
			error:function (rs) {
			}
		});
	},
	show_exchange_success:function(data,num){
		if(data.id==1121){
			$.alert({
				tipCls:'success1' ,
				title: '<div style="width:330px;line-height: 22px">恭喜您成功兑换 1 件 改名卡!</div>',
				content: '<div style="line-height:30px;color: #333;">您兑换的改名卡将在半小时内发放，请注意查收。</div><div><p class="t-tips red" id="error_tip"><span id="error_msg">注意：改名卡需到APP上使用</span></p></div>',
				txtBtn: '继续兑换',
				txtBtn1: '投资赚取积分',
				init: function (d, btn, btn1) {
					btn.click(function () {
						d.close();
					});
					btn1.click(function () {
						d.close();
					});
				}
			});
		} else if(data.type==4){
			$.alert({
				tipCls:'success1' ,
				title: '<div style="width:330px;line-height: 22px">恭喜您成功兑换 ' + num + '件 ' + data.name + '!</div>',
				content: '<div style="line-height:30px;color: #333;">您兑换的投资礼金将在半小时内发放，请注意查收。</div>',
				txtBtn: '继续兑换',
				txtBtn1: '投资赚取积分',
				init: function (d, btn, btn1) {
					btn.click(function () {
						d.close();
					});
					btn1.click(function () {
						d.close();
					});
				}
			});
		}else{
			if(data.type==5&&data.name.indexOf('充值卡')>-1){
				$.alert({
					tipCls:'success1' ,
					title:'<div style="width:330px;line-height: 22px">恭喜您成功兑换 '+num+'件 '+data.name+'!</div>' ,
					content:'<div style="line-height:30px;color: #333;">您兑换的手机充值业务将在当天之内充值成功，请注意查收信息。</div>',
					txtBtn:'继续兑换',
					txtBtn1:'投资赚取积分',
					init:function (d ,btn,btn1 ) {
						btn.click(function () {
							d.close();
						});

						btn1.click(function () {
							d.close();
							window.location.href='/invest.shtml';
						});
					}
				});

				return;
			}

			if(data.type==6){
				$.alert({
					tipCls:'success1' ,
					title: '<div style="width:330px;line-height: 22px">恭喜您成功兑换 ' + num + '件 ' + data.name + '!</div>',
					content: '<div style="line-height:30px;color: #333;">礼品已经成功发放。</div>',
					txtBtn: '继续兑换',
					txtBtn1: '投资赚取积分',
					init: function (d, btn, btn1) {
						btn.click(function () {
							d.close();
						});

						btn1.click(function () {
							d.close();
							window.location.href = '/invest.shtml';
						});
					}
				});

				return;
			}

			$.alert({
				tipCls:'success1' ,
				height: '300px',
				title:'<div style="width:330px;line-height: 22px">恭喜您成功兑换 '+num+'件 '+data.name+'!</div>' ,
				content:'<div style="line-height:30px;color: #333;padding-top: 10px;">您兑换的实物礼品将在5个工作日内寄出，请注意查收。</div>',
				txtBtn:'继续兑换',
				txtBtn1:'投资赚取积分',
				init:function (d ,btn,btn1) {
					btn.click(function () {
						d.close();
					});

					btn1.click(function () {
						d.close();
						window.location.href='/invest.shtml';
					});
				}
			});
		}
	},
	//显示特价礼品时间未到
	show_no_start_dlg:function(sid){
		AA.gift.get_speical_gift(sid,function(data){
			$.alert({
				tipCls: 'info1',
				padding: '25px 0 0 100px',
				height: '350px',
				title: '<div style="width:330px;line-height: 22px">限时特惠暂未开始抢兑，请稍作等待!</div>',
				content: '<div style="line-height:30px;color: #333;"> <p style="padding-top:20px;"><label class="ui-form-label">开抢时间：</label><font id="lbl_no_start_time">' + AA.Helper.date(data.startTime, 'Y-m-d h:m:s') + '</font></p>\
	         				<p><label class="ui-form-label">限量：</label><font id="lbl_no_start_count" color="red">'+data.limitNum+'</font> 件</p>\
	         		 	 	<p><label class="ui-form-label">所需积分：</label><font id="lbl_no_start_need_score">'+data.socre+'</font> 分</p>\
	         		 	 	<p><label class="ui-form-label">剩余积分：</label><font id="lbl_no_start_user_score">'+user_info.score+'</font> 分</p></div>',
				txtBtn: '等待开始',
				txtBtn1: '赚取积分',
				init: function (d, btn, btn1) {
					btn.click(function () {
						d.close();
					});

					btn1.click(function () {
						window.location.href = '/invest.shtml';
					});
				}
			});
		});
	},
	//积分值不够
	show_no_score:function(score){
		$.alert({
			tipCls:'info1' ,
			title:'<div style="width:330px;line-height: 22px">您的剩余积分不足!</div>' ,
			content:'<div style="line-height:30px;color: #333;">您的积分低于'+score+'分,无法进行兑换,请先<a href="/invest.shtml" style="color:#4bc1e1" target="_blank">投资</a>获取积分。</div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '赚取积分',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = '/invest.shtml';
				});
			}
		});
	},
	show_no_score1:function(score,name){
		$.alert({
			tipCls:'info1' ,
			padding:'30px 0 0 120px',
			height:'340px',
			title:'<div style="width:330px;line-height: 22px">您的剩余积分不足!</div>' ,
			content:'<div style="line-height:30px;color: #333;">\
						<p style="padding-top:0px;"><label class="ui-form-label">兑换礼品：</label><font id="lbl_no_start_time">'+name+'</font></p>\
						<p><label class="ui-form-label">所需积分：</label><font >'+score+'</font> 分</p>\
						<p><label class="ui-form-label">剩余积分：</label><font >'+user_info.score+'</font> 分</p>\
						<p><label class="ui-form-label">您还差 <font color="red">'+(score-user_info.score)+'分</font> 才可兑换，请先<a href="/invest.shtml" style="color:#4bc1e1" target="_blank">投资</a>获取积分。 </p>\
					</div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '赚取积分',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = '/invest.shtml';
				});
			}
		});
	},
	show_no_money:function(money,num){
		$.alert({
			tipCls:'info1' ,
			padding:'30px 0 0 120px',
			height:'310px',
			title:'<div style="width:330px;line-height: 0px">您的账户余额不足!</div>' ,
			content:'<div style="line-height:30px;color: #333;">\
						<p style="padding-top:20px;"><label class="ui-form-label">兑换数量：</label><font id="lbl_no_start_time">'+num+'</font></p>\
						<p><label class="ui-form-label">所需账户余额：</label><font >'+money+'</font> 元</p>\
						<p><label class="ui-form-label">剩余账户余额：</label><font >'+user_info.total_money+'</font> 元</p>\
						<p><label class="ui-form-label">您还差 <font color="red">'+(money-user_info.total_money)+'元</font> 才可兑换，请先充值。 </p>\
					</div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '充值',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = AA.Helper.buildUrl('/my/recharge');
				});
			}
		});
	},
	show_no_gift_num:function(num){
		$.alert({
			tipCls:'info1' ,
			padding:'20px 0 0 100px' ,
			title:'<div style="width:330px;line-height: 22px">此礼品已兑完，敬请期待下期特惠！</div>' ,
			content:'<div style="line-height:30px;color: #333;"> <p><label class="ui-form-label">剩余：<font color="red">0</font> 件</label></p>\
						<p><label class="ui-form-label">限量：'+num+' 件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已兑：'+num+' 件</label></p></div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '赚取积分',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = '/invest.shtml';
				});
			}
		});
	},
	show_special_limit:function(msg){
		$.alert({
			tipCls:'info1' ,
			title:'<div style="width:330px;line-height: 22px">周年庆特惠秒杀苹果系列每人限秒1个！</div>' ,
			content:'<div style="line-height:30px;color: #333;">'+msg+'</div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '赚取积分',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = '/invest.shtml';
				});
			}
		});
	},
	show_max_score:function(){
		$.alert({
			tipCls:'info1' ,
			title:'<div style="width:330px;line-height: 22px">当日礼金兑换已达上限!</div>' ,
			content:'<div style="line-height:30px;color: #333;">您今日已兑换礼金'+max_reward+'元，请您明日再继续兑换。</div>',
			txtBtn:'兑换其他' ,
			txtBtn1:'赚取积分' ,
			init:function (d ,btn ,btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href='/invest.shtml';
				});
			}
		});
	},
	show_max_score1:function(msg){
		$.alert({
			tipCls:'info1' ,
			title:'<div style="width:330px;line-height: 22px">每日兑换礼金上限为500元</div>' ,
			content:'<div style="line-height:30px;color: #333;">'+msg+'</div>',
			txtBtn:'兑换其他' ,
			txtBtn1: '赚取积分',
			init: function (d, btn, btn1) {
				btn.click(function () {
					d.close();
				});

				btn1.click(function () {
					window.location.href = '/invest.shtml';
				});
			}
		});
	},
	show_confirm_exchange:function(id,money_exchange){
		money_exchange=money_exchange||0;

        document.onkeydown = function (event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                //回车执行查询
                $("#buy_comfirm_btn").click();

            }
        }
		if (!AA.Api.User.isAuth) {
			AA.RapidLogin.popup();
			return;
		}
				var url=document.location.href;
				if(url.match("flag")){
					url=url.substring(0,url.indexOf("?flag=vip"));
					history.replaceState(null, document.title, url);
				}

		if(AA.gift.user_info==null||AA.gift.user_info==undefined){

			AA.gift.load_user_info(function(){
				if(money_exchange==0){
					AA.gift.alg_exchange(id);
				}else{
					AA.gift.alg_money_exchange(id);
				}
			});
			return;
		}else{
			if(money_exchange==0){
				AA.gift.alg_exchange(id);
			}else{
				AA.gift.alg_money_exchange(id);
			}
		}
	},
	//确定兑换特价礼品
	show_confirm_speical_exchange: function (sid, money_exchange,cash_only) {
		if (!AA.Api.User.isAuth) {
			AA.RapidLogin.popup();
			return;
		}
		if (AA.gift.accountAssetOverview!=null &&parseFloat(AA.gift.accountAssetOverview) <1000 ) {
			$.alert({
				tipCls:'info1' ,
				title:'<div style="line-height:30px;color: #333;"> <p style="padding-top:0px;padding-left:10px;">您不符合活动参与条件！</p></div>' ,
				content:'',
				txtBtn:'确定' ,
				init:function (d ,btn) {
					btn.click(function () {
						d.close();
					});
				}
			});

			return;
		}
        if (AA.gift.cur_time/1000<AA.gift.start_time) {

            $.alert({
                tipCls:'info1' ,
                title:'<div style="line-height:30px;color: #333;"> <p style="padding-top:0px;padding-left:10px;">活动尚未开始，请耐心等待！</p></div>' ,
                content:'',
                txtBtn:'确定' ,
                init:function (d ,btn) {
                    btn.click(function () {
                        d.close();
                    });
                }
            });

            return;
		}
		if(AA.gift.user_info==null||AA.gift.user_info==undefined){
			AA.gift.load_user_info(function(){
				if (money_exchange == 0) {
					AA.gift.alg_special_exchange(sid);
				} else {
					AA.gift.alg_special_money_exchange(sid,cash_only);
				}
			});
			return;
		}else{
			if (money_exchange == 0) {
				AA.gift.alg_special_exchange(sid);
			} else {
				AA.gift.alg_special_money_exchange(sid,cash_only);
			}
		}
	},
	alg_special_exchange:function(sid){
		AA.gift.get_speical_gift(sid,function(data){
			max_reward=data.maxReward;

			/*if(data.socre>user_info.score){
				AA.gift.show_no_score1(data.socre, data.name);
				return;
			}
*/
			var _nowtime = AA.gift.cur_time;

			if(_nowtime/1000<AA.gift.start_time){
				AA.gift.show_no_start_dlg(sid);
				return;
			}

			if(data.limitNum<=data.exchangeNum){
				AA.gift.show_no_gift_num(data.limitNum);
				return;
			}

			$.alert({
				tipCls: 'info1',
				padding: '25px 0 0 100px',
				height: '350px',
				title: '<div style="width:330px;line-height: 22px">兑换礼品：' + data.name + '</div>',
				content: '<div style="line-height:30px;color: #333;"> <p style="padding-top:10px;"><label class="ui-form-label">剩余：' + (data.limitNum - data.exchangeNum) + ' 件</label></p>\
	         		 	 <p><label class="ui-form-label" >所需积分：</label><font  color="red">'+data.socre+'</font> 分</p>\
	          		 	 <p><label class="ui-form-label">账户名：</label><font>'+G_ENV_VAR.UNAME+'</font> </p>\
	          	 	 	 <p><label class="ui-form-label">剩余积分：</label><font>'+user_info.score+'</font> 分\
	          		 	</p>\
	          		 	 </div>',
				txtBtn: '下一步',
				init: function (d, btn, btn1) {
					btn.click(function () {
						d.close();
						AA.gift.show_trade_pass(data.socre, data.name, sid, 1, 0, data.isPhy);
					});

				}
			});
		});
	},
	alg_exchange:function(id){
		AA.gift.get_gift(id,function(data){
			if(parseInt(data.isVip)>0){
				if(parseInt(G_ENV_VAR.VIP)<parseInt(data.isVip)){
					$.alert({
						tipCls:'info1' ,
						title:'<div style="width:330px;line-height: 22px">此礼品仅限VIP'+data.isVip+'及以上用户兑换！</div>' ,
						content:'<div style="line-height:30px;color: #333;"> <p style="padding-top:0px;padding-left:10px;">此礼品仅限VIP'+data.isVip+'及以上用户兑换！</p></div>',
						txtBtn:'确定' ,
						init:function (d ,btn) {
							btn.click(function () {
								d.close();
							});
						}
					});

					return;
				}
			}

			max_reward=data.maxReward;
			var type=data.type;
			var show_tip="";

			if(type==4 && data.id != 1121){
				show_tip="<label class='ui-tip info'>每日可兑换礼金上限"+data.maxReward+"元</label>";
			}

			var str = vip_discount[G_ENV_VAR.VIP];
			var m=parseInt((data.socre*str)/1000*1000);
			var typeTile='<div style="width:330px;line-height: 22px">兑换礼品：' +data.name+'</div>';
			if(type==4 && data.id != 1121){
				typeTile='<div style="width:330px;line-height: 22px">兑换礼品：' +data.name+'<font  style="  font-weight: normal;font-size: 12px;">'+'(礼金有效期为45天)'+'</font></div>';
			}

			$.alert({
				tipCls: 'info1',
				padding: '25px 0 0 110px',
                height: '350px',
				title: typeTile,
				content: '<div style="line-height:30px;color: #333;"> <p style="padding-top:10px;"><label class="ui-form-label">兑换数量：</label><img id="sub_num" style="vertical-align: middle;cursor:pointer;" src="/s/img/icons/sub.jpg" onclick="AA.gift.change_gift_num(1,' + m + ')" ><input onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\'); AA.gift.change_gift_num(3,' + m + ');}).call(this)"  type="text" style="width:30px;height: 21px;text-align: center;"  maxlength="10" id="input_num" value=1><img id="add_num" src="/s/img/icons/add.jpg" style="-moz-appearance:textfield; vertical-align: middle;cursor:pointer;" onclick="AA.gift.change_gift_num(2,' + m + ')"> 个 ' + show_tip + ' <label style="margin-left:20px;" class="ui-tip" id="num_error_tip" ></label></p>\
                			<p><label class="ui-form-label" >所需积分：</label><font  color="red" id="need_score">'+m+'</font> 分</p>\
                			<p><label class="ui-form-label">账户名：</label><font>'+G_ENV_VAR.UNAME+'</font> </p>\
                			<p><label class="ui-form-label">剩余积分：</label><font>'+user_info.score+'</font> 分\
                			</p>\<p><label  hidden="hidden"   class="ui-form-label ui-tip info" id="still_need_score_lable">您还差<font  color="red" id="still_need_score">0</font>分才可兑换，请先<a href="/invest.shtml" target="_blank"><font color="#4bc1e1">投资</font></a>获取积分</label>\&nbsp</p>\
            			</div>',
				txtBtn: '下一步',
				init: function (d, btn, btn1) {

                    AA.gift.enable_click = true;
                    document.onkeydown = function (event) {
                       if (event.keyCode == "13") {
                           event.preventDefault();
                           //回车执行查询
                           btn.click();
                       }
                   }
                    btn.click(function () {
                        if (!AA.gift.enable_click)
                        	return false;
                            var _input = $('#input_num');
                            var _val = $.trim(_input.val());
                            var _tip = $('#num_error_tip');
                            if (_val == "") {
                                _tip.addClass('error').html('请输入兑换数量');
                                _input.focus();
                                return false;
                            } else {
                                var isnum = _val.match(new RegExp("^[0-9]+$"));
                                if (isnum == null) {
                                    _tip.addClass('error').html('请正确输入兑换数量');
                                    _input.focus();
                                    return false;
                                }
                            }

                            if (m > user_info.score) {
                                d.close();
                                AA.gift.show_no_score1(m, data.name);
                                return;
                            }

                            var need = $('#need_score').html();
                            d.close();
                            AA.gift.show_trade_pass(need, data.name, id, 0, _val, data.isPhy);
					});
				}
			});
		});
	},
	cutNum:function(num){
		if(num == null) return "";
		var str = num+"";
		if(str.indexOf('.') != -1){
			var pointRight = str.substring(str.indexOf('.')+1);
			var pointLeft =  str.substring(0,str.indexOf('.') );
			if(pointRight == "00")
				return pointLeft;
			else{//如果不为00 则保留二位小数
				return str.substring(0, str.indexOf('.') + 3);
			}
		}
		return str + '.00';
	},
	hhzf_change_gift_num:function(type){
		var curNum = $("#step_1_num").val();
		if(type == 0){ //减少数量
			if(curNum <= 1){
				return;
			}
			// if(parseFloat(this.curMoney) > parseFloat($("#step_1_paymoney").html()) ){
            //
			// 	return;
			// }

			$("#step_1_num").val(--curNum);
		}else if(type==3) {
			//修改数量
			if(parseInt(curNum)<1){
                $("#step_1_num").val(1);
			}

        }else if(type==1)
        { //增加数量
			$("#step_1_num").val(++curNum);
		}
		//计算价格
		var curPrice = this.curMoney * $("#step_1_num").val()
		$("#step_1_ordermoney").html(this.cutNum(curPrice));

		var discountScore = $("#step_1_discount_score").val() || 0;
		if (isNaN(discountScore)) {
			discountScore = 0;
		}
		var discountMoney = AA.gift.cutNum(discountScore/400);

		$("#step_1_paymoney").html(this.handlerNum(curPrice - discountMoney));

		if(parseFloat($("#step_1_paymoney").html()) > parseFloat(AA.gift.totalMoney)){
           // var need_money =  parseFloat($("#step_1_paymoney").html())-parseFloat(AA.gift.totalMoney);
			// $("#more_money").html(need_money.toFixed(2));
			// $("#still_need_money_lable").show();



            //$("#step_1_error_info").attr('style','display:block').html('余额不足');
		} else {
            // $("#still_need_money_lable").hide();
            // $("#step_1_error_info").attr('style', 'display:none').html('');

		}

		var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;

		$("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
        AA.gift.inputBlur();
	},
	backOneStep:function(cash_only){
		this.dd2.close();
		AA.gift.dd = $.popup({
			title: '购买',
			padding: '0',
			content: $('#step_1').html(),
			initialize: function () {
                if(cash_only==1){
                    $("#cash_only_step_1").hide();
                    $("#left_num_hide").hide();

                    $("#buy_comfirm_btn").removeAttr('onclick').attr('onclick','AA.gift.stepOne('+cash_only+')');
                    $("#buy_comfirm_btn").removeAttr('onclick').attr('onclick','AA.gift.stepOne('+cash_only+')');
                    $("#backOneStepToStepOne").removeAttr('onclick').attr('onclick','AA.gift.backOneStep('+cash_only+')');
                }
			}
		});
	},
	confirmPay:function(cash_only){
		var use_score = $("#step_2_use_score").html();
		var use_money = $("#step_2_use_money").html();
		var buy_num = $("#step_2_num").html();
		var save_pwd = $("#savePwd").val();

		if(save_pwd == ''){
			$("#step_2_error_info").attr('style','display:block').html('交易密码不能为空');
			return;
		}

		var mobileCaptcha = $('.d-dialog #mobile_captcha').val();
		if($('.d-dialog #mobile_captcha').is(':visible')){
			if(mobileCaptcha == ''){
				$this.showErrorMsg('手机验证码不能为空!');
				return;
			}
		}

		var isPhy = $('#isPhy').val();
		var url = '/v2/gift/exchange_gift_by_blend.jso';
		if ($('#isSpecial').val() == 1) {
			buy_num = 1;
			url = "/v2/gift/exchange_special_by_blend.jso"
		}
		if(cash_only==1){
            buy_num = 1;
            use_score=0;
            url = "/v2/gift/exchange_special_cash_only_limit_one_jid.jso"
		}
		if(isPhy == '1'){
			AA.gift.init_input_address(function(){
				$('#isPhy').val('0');
				//提交到后台
				$.ajax({
					url: url,
					type:'POST' ,
					dataType : 'json',
					data:{gid:AA.gift.gid,num:buy_num,pass:AA.Helper.encrypPw(save_pwd),score:use_score,money:use_money,mobileCaptcha:mobileCaptcha},
					success:function (result) {
						if(result.state == 0){
							AA.gift.dd2.close();
							AA.gift.dd3 = $.popup({
								title:'提示',
								padding:'0',
								content: $('#step_3').html(),
								initialize:function () {
								}
							});
						}else if(result.state == 1200){
							$("#step_2_error_info").attr('style','display:block').html('交易密码不正确');
						}else{
							$("#step_2_error_info").attr('style','display:block').html(result.msg);
						}
					}
				});
			});
		}else{
			//提交到后台
			$.ajax({
				url: url,
				type:'POST' ,
				dataType : 'json',
				data:{gid:AA.gift.gid,num:buy_num,pass:save_pwd,score:use_score,money:use_money,mobileCaptcha:mobileCaptcha},
				success:function (result) {
					if(result.state == 0){
						AA.gift.dd2.close();
						AA.gift.dd3 = $.popup({
							title:'提示',
							padding:'0',
							content: $('#step_3').html(),
							initialize:function () {
							}
						});
					}else if(result.state == 1200){
						$("#step_2_error_info").attr('style','display:block').html('交易密码不正确');
					}else if(result.state==3002){
						AA.gift.dd2.close();
						$("#buy_num").html(buy_num);
						$("#gid").html(AA.gift.gid);
						$('#buytipinfo').html('<i class="icondagth"></i>'+'余额不足，请前往支付');
						$('#buytip').html('通过连连充值认证的金额不能用于购买消费！（需全额支付）');
						this.buy4 = $.popup({
					                title:'提示',
					                padding:'0',
					                content:$('#step_buy').html(),
					                initialize:function () {
					                }
					            });
					}else{
						$("#step_2_error_info").attr('style','display:block').html(result.msg);
					}
				}
			});
		}
	},
	confirmSub:function(){
		this.dd3.close();
	},
	checkPwdIsNull:function(){
		var save_pwd = $("#savePwd").val();
		if(save_pwd == ''){
			$("#step_2_error_info").attr('style','display:block').html('交易密码不能为空');
		}else{
			$("#step_2_error_info").attr('style','display:none').html('');
		}
	},
	clearMsg:function(){
		$("#step_2_error_info").attr('style','display:none').html('');
	},
	autoFill:function(){
		var maxDiscountMoney = $("#step_1_discount_money").html();
		var orderMoney = $("#step_1_ordermoney").html();

		if(parseFloat(maxDiscountMoney) <= parseFloat(orderMoney)){
			$("#step_1_discount_score").val(user_info.score);
			$("#step_1_discount_score_money").val(AA.gift.cutNum(user_info.score/400));
		}else{
			$("#step_1_discount_score").val(orderMoney * 400);
			$("#step_1_discount_score_money").val(orderMoney);
		}

		var curPrice = this.curMoney * $("#step_1_num").val();

		var discountScore = $("#step_1_discount_score").val() || 0;

		if (isNaN(discountScore)) {
			discountScore = 0;
		}
		var discountMoney = AA.gift.cutNum(discountScore/400);

		$("#step_1_paymoney").html(this.handlerNum(curPrice - discountMoney));

		if(parseFloat($("#step_1_paymoney").html()) > parseFloat(AA.gift.totalMoney)){
			//$("#step_1_error_info").attr('style','display:block').html('余额不足');
		} else {
			$("#step_1_error_info").attr('style', 'display:none').html('');
		}

		var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;

		$("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
        AA.gift.inputBlur();
	},
	inputBlur:function(){
		var orderMoney = $("#step_1_ordermoney").html();
		var money = $("#step_1_discount_score_money").val() || 0;

		if (isNaN(money)) {
			$("#step_1_discount_score_money").val(0);
			money = 0;
		}

		var discountMoneyByScore = this.cutNum(user_info.score / 400);
		if(parseFloat(money) > parseFloat(discountMoneyByScore)){
			$("#step_1_discount_score_money").val(discountMoneyByScore);
			$("#step_1_discount_score_money").blur();
			return;
		}

		if(parseFloat(money) > parseFloat(orderMoney)){
			$("#step_1_discount_score_money").val(orderMoney);
			$("#step_1_discount_score_money").blur();
			return;
		}

		$("#step_1_discount_score").val( parseFloat(money) * 400 );

		var curPrice = this.curMoney * $("#step_1_num").val();
		var discountScore = $("#step_1_discount_score").val() || 0;

		if (isNaN(discountScore)) {
			discountScore = 0;
		}

		if(parseFloat(user_info.score) < parseFloat(discountScore)){
			$("#step_1_discount_score").val(user_info.score);
			$("#step_1_discount_score").blur();
			return;
		}

		var discountMoney = AA.gift.cutNum(parseFloat(discountScore)/400);

		if(parseFloat(discountMoney) > parseFloat(orderMoney)){
			$("#step_1_discount_score").val(orderMoney * 400);
			$("#step_1_discount_score").blur();
			return;
		}

		$("#step_1_paymoney").html(this.handlerNum(curPrice - discountMoney));

		var step_1_paymoney = this.handlerNum(curPrice - discountMoney);
		if(parseFloat($("#step_1_paymoney").html()) > parseFloat(AA.gift.totalMoney)){
			//$("#step_1_error_info").attr('style','display:block').html('余额不足');
			if(AA.gift.is_special==1){
				$("#more_money").html((parseFloat($("#step_1_paymoney").html())-parseFloat(AA.gift.totalMoney)).toFixed(2));
				 $("#still_need_money_lable").show();
				  var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;
				 $('#still_need_money_lable').html('您还差'+'<span class="red" >'+includeXcbMoney+'</span>'+'元才可购买，请前往充值！');
                 $("#buy_comfirm_btn").text("充值");
				
			}else{
				$("#more_money").html((parseFloat($("#step_1_paymoney").html())-parseFloat(AA.gift.totalMoney)).toFixed(2));
                 $("#still_need_money_lable").show();
				 var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;
				 $('#still_need_money_lable').html('您还差'+'<span class="red" >'+includeXcbMoney+'</span>'+'元才可购买，请前往支付！（需全额购买）');
                 $("#buy_comfirm_btn").text("支付");
			}
            


		} else {
            $("#buy_comfirm_btn").text("下一步");
            $("#still_need_money_lable").hide();
			$("#step_1_error_info").attr('style', 'display:none').html('');
		}

		var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;

		$("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
	},
	stepOne:function(cash_only){
		var payScore = $("#step_1_discount_score").val() == '' ? 0 : $("#step_1_discount_score").val();
		payScore = parseInt(Math.ceil(payScore));
		var payMoney = $("#step_1_paymoney").html() == '' ? 0 : $("#step_1_paymoney").html();
		var payNum = $("#step_1_num").val();
		var orderMoney = $("#step_1_ordermoney").html() == '' ? 0 : $("#step_1_ordermoney").html();
        var discountsCoreMoney=$("#step_1_discount_score_money").val()==''?0:$("#step_1_discount_score_money").val();

		if($("#step_1_channel_vendor").val() == 3){
			$("#step_2_score_li").hide();
		}else{
			$("#step_2_score_li").show();
		}

		if(parseFloat(payMoney) > parseFloat(AA.gift.totalMoney) && $('#isSpecial').val() != 1){

            //$("#step_1_error_info").attr('style','display:block').html('余额不足');
            $("#buy_num").html(payNum);
            $("#gid").html(AA.gift.gid);
            $("#buy_payMoney").html(payMoney);
            $("#buy_totalMoney").html(parseFloat(AA.gift.totalMoney));
            $("#buy_left_money").html(this.handlerNum(parseFloat(payMoney) -parseFloat(this.totalMoney ) ));
            var count1=this.handlerNum(parseFloat(payMoney) -parseFloat(this.totalMoney ) );
            $('#buytipinfo').html('<i class="icondagth"></i>'+'余额不足，请前往支付');
            $('#buytip').html('您还差'+'<span class="red" >'+count1+'</span>'+'元才可购买，请前往支付！(需全额购买)');
            this.dd.close();

            AA.gift.buySub();

		}else{
			if(parseFloat(payMoney) > parseFloat(AA.gift.totalMoney)){
				window.location.href = AA.Helper.buildUrl('/my/recharge');
			}else{
				$("#step_2_use_score").html(payScore);
            $("#step_2_use_money").html(payMoney);
            $("#step_2_num").html(payNum);
            $("#step_2_ordermoney").html(orderMoney);
            $("#step_2_user_score_money").html(discountsCoreMoney);
            $("#step_2_user_othermoney").html(this.handlerNum(payMoney -  parseFloat($("#step_1_xcb_money").html())));
            $("#step_2_left_score").html(user_info.score - payScore);
            $("#step_2_left_money").html(this.handlerNum(this.totalMoney - payMoney) < 0 ? '余额不足' : this.handlerNum(this.totalMoney - payMoney) + ' 元');
            $("#step_2_xcb_money").html($("#step_1_xcb_money").html());

            this.dd.close();

            this.dd2 = $.popup({
                title:'购买确定',
                padding:'0',
                content: $('#step_2').html(),
                initialize:function () {
                    $this.initUserMobileVoiceCheck();
                }
            });

            if (cash_only==1){
                $("#cash_only_step_2").hide();
                $("#step_2_score_li").hide();
                $("#confirmPay_btn").removeAttr('onclick').attr('onclick','AA.gift.confirmPay('+cash_only+')');
                $("#backOneStepToStepOne").removeAttr('onclick').attr('onclick','AA.gift.backOneStep('+cash_only+')');


            }

			}
            
        }


	},
	initUserMobileVoiceCheck:function(){
		//兑换校验手机语音验证码
		$.ajax({
			url:'/v2/login/in_session_data.jso',
			type: 'GET',
			dataType: 'json',
			success: function (result) {
				if(result.state==0){
					$this.vip = result.vip;
					if($this.vip <= 1){
						$.ajax({
							url:'/v2/member/get_user_mobile_voice_check_status.jso',
							type:'post',
							dataType:'json',
							success:function(result){
								if(result.state == 0 && result.data == 0){
									$('.d-dialog #pic_captcha_view').show();
									$('.d-dialog #mobile_captcha_view').show();
									$this.initCaptche();
									$('.d-dialog #send_voice').unbind("click").bind('click',function(){
										$this.sendMobileCaptcha();
									});
								}else{
									$('.d-dialog #pic_captcha_view').hide();
									$('.d-dialog #mobile_captcha_view').hide();
								}
							}
						});
					}
				}
			}
		});
	},
	initCaptche:function(){
		$('.d-dialog #captcha_pic').unbind('click').click(function(){
			$this.getCaptche();
		});
		$this.getCaptche();
	},
	getCaptche:function(){
		var seed=new Date().getTime();
		$('.d-dialog #captcha_pic').attr('src','/v2/login/get_captcha.raw?seed='+seed);
		$('.d-dialog #seed').val(seed);
	},
	sendMobileCaptcha:function(){
		var captcha=$('.d-dialog #captcha').val();
		var seed = $('.d-dialog #seed').val();
		if(captcha.length!=4){
			$this.showErrorMsg('请正确输入图形验证码');
			return;
		}

		$this.clearErrorMsg();

		$.ajax({
			url:'/v2/login/get_mobile_captcha.jso',
			type:'post',
			dataType:'json',
			data:{
				captcha:captcha,
				seed:seed
			},
			success:function(result){
				if(result.state==0){
					$this.countDownTime=120;
					$this.countDownCaptcha();
					$this.showVoiceTip();
				}else{
					$this.countDownTime=0;
					if(result.state==1001||result.state==1009){
						window.location.href = 'login.html';
					}else if(result.state==2010){
						$this.showErrorMsg('图形验证码输入错误,请点击图形刷新重试');
					}else if(result.state==2019){
						$this.showErrorMsg('等待120秒后再重试');
					}else{
						$this.showErrorMsg('系统繁忙，稍后请重试');
					}
				}
			}
		});
	},
	countDownCaptcha:function(){
		if($this.countDownTime>0){
			$this.countDownTime--;
			$('.d-dialog #send_voice').removeClass("sub03").addClass("sub01").html('(' + $this.countDownTime + 's)重发');
			$('.d-dialog #send_voice').unbind("click");
			setTimeout("$this.countDownCaptcha()", 1000);
		}else{
			$this.countDownTime=120;
			$('.d-dialog #send_voice').removeClass("sub01").addClass("sub03").html('发送验证码');
			$('.d-dialog #send_voice').unbind("click").bind('click',function(){
				$this.sendMobileCaptcha();
			});

			$('.d-dialog #captcha').val('');
			$this.getCaptche();
		}
	},
	showVoiceTip:function(){
		$('.d-dialog #voice_tip_view').show();
		setTimeout(function(){
			$('.d-dialog #voice_tip_view').hide();
		},100000);
	},
	showErrorMsg:function(msg){
		$(".d-dialog #step_2_error_info").html(msg).show();
	},
	clearErrorMsg:function () {
		$(".d-dialog #step_2_error_info").html('').hide();
	},
	handlerNum:function(num){
		return this.cutNum(Math.round(num * 100)/100);
	},
	alg_money_exchange:function(id){
		AA.gift.get_gift(id,function(data){
			AA.gift.totalMoney = AA.gift.handlerNum(parseFloat(user_info.total_money) + parseFloat(AA.gift.xcbMoney));

			if(parseFloat(data.money) > parseFloat(AA.gift.totalMoney)){
				//$("#step_1_error_info").attr('style','display:block').html('余额不足');
			} else {
				$("#step_1_error_info").attr('style', 'display:none').html('');
			}

			$("#step_1_channel_vendor").val(data.channelVendor);

			if(data.channelVendor == 3){
				$(".blendPayByScore").hide();
				$("#step_1_discount_score").val(0);
			}else{
				$(".blendPayByScore").show();
			}

			$('#step1-buy-num').show();
			$('#step1-left-num').hide();

			var discountMoneyByScore = user_info.score / 400;
			$("#step_1_discount_money").html(AA.gift.cutNum(discountMoneyByScore));
			$("#step_1_money").html(AA.gift.totalMoney);
			$("#step_1_username").html(G_ENV_VAR.UNAME)
			$("#step_1_ordermoney").html(AA.gift.cutNum(data.money));
			$("#step_1_score").html(user_info.score);
			$("#step_1_title").html(data.name);
			$("#step_1_paymoney").html(AA.gift.cutNum(data.money));
			AA.gift.curMoney  = data.money;
			AA.gift.gid = data.id;
			$("#step_1_img").attr("src","/s/images/jipinhui/gift/m_size/" +  data.imgSrc);
			var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money)) ;

			$("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
            $("#step_1_real_xcb_money").html(parseFloat(AA.gift.xcbMoney));
            $("#step_1_totalAccount").html(parseFloat(user_info.total_money));
			$("#step_2_money").html(AA.gift.totalMoney);
			$("#step_2_username").html(G_ENV_VAR.UNAME);
			$("#step_2_score").html(user_info.score);
			$("#step_2_title").html(data.name);
			$("#step_2_img").attr("src","/s/images/jipinhui/gift/m_size/" +  data.imgSrc);
            AA.gift.is_special=0;
				if(parseFloat(AA.gift.cutNum(data.money)) > parseFloat(AA.gift.totalMoney)){
				
				$('#still_need_money_lable').show();
				$('#still_need_money_lable').html('您还差'+'<span class="red" >'+includeXcbMoney+'</span>'+'元才可购买，请前往支付！（需全额购买）');
				$('#buy_comfirm_btn').html('支付');
			}
			AA.gift.dd = $.popup({
				title: '购买',
				padding: '0',
				content: $('#step_1').html(),
				initialize: function () {
				}
			});

			$('#isPhy').val(data.isPhy);
			$('#isSpecial').val(0);
			
		});
	},
	//确认交易密码
	show_trade_pass:function(score,name,sid,type,num,isPhy){
		var show_num='';
		if(num>0){
			show_num='<font style="font-weight:normal">(数量:'+num+' 个)';
		}
		$.alert({
			tipCls:'info1' ,
			padding:'25px 0 0 100px' ,
			height:'350px',
			title:'<div style="width:330px;line-height: 22px">兑换礼品：' +name+' '+show_num+'</font></div>',
			content: '<div style="line-height:30px;color: #333;"> <p style="padding-top:10px;"></p>\
						<p class="ui-form-line"><label class="ui-form-label" >所需积分：</label><font  color="red">'+score+'</font> 分</p>\
						<p class="ui-form-line"><label class="ui-form-label" style="letter-spacing: 4px;">账户名：</label><font>'+G_ENV_VAR.UNAME+'</font> </p>\
						<p class="ui-form-line"><label class="ui-form-label">剩余积分：</label><font>'+user_info.score+'</font> 分</p>\
						<p class="ui-form-line"><label class="ui-form-label">交易密码：</label><input type="password" id="ip_trade_pass" style="height:25px;">\
						<a href="/2.0/views/account/back_password.shtml?tab=2" class="blue" target="_blank">忘记交易密码？</a>\
						<div class="ui-tip" id="error_tip" style="margin-left:55px;"></div></p>\
					</div>',
			txtBtn:'兑 换' ,
			init:function (d ,btn ,btn1) {

                document.onkeydown = function (event) {
                    if (event.keyCode == "13") {
                        event.preventDefault();
                        //回车执行查询
                        btn.click();
                    }
                }
				btn.click(function () {
					var _input=$('#ip_trade_pass');
					var _val = $.trim(_input.val());
					var _tip=$('#error_tip');
					if (_val == "") {
						_tip.addClass('error').html('交易密码必须为6-16个字符');
						_input.focus();
						return false;
					} else if (_val.length < 6 || _val.length > 16) {
						_tip.addClass('error').html('交易密码必须为6-16个字符');
						_input.focus();
						return false;
					} else {
						_tip.removeClass('error').html('');
						if(type==1){
							if(isPhy == 1){
								d.close();
								AA.gift.init_input_address(function(){
									AA.gift.exchange_speical_gift(sid,_val,d,function(){
										AA.gift.show_trade_pass(score,name,sid,type,num,0);
									});
								});
							}else{
								AA.gift.exchange_speical_gift(sid,_val,d);
							}
						}else{
							if(isPhy == 1){
								d.close();
								AA.gift.init_input_address(function(){
									AA.gift.exchange_gift(sid,_val,num,d,score,function(){
										AA.gift.show_trade_pass(score,name,sid,type,num,0);
									});
								});
							}else{
								AA.gift.exchange_gift(sid,_val,num,d,score);
							}
						}
					}
				});
			}
		});
	},
	show_trade_money_pass:function(money,name,sid,num){
		var show_num='';
		if(num>0){
			show_num='<font style="font-weight:normal">(数量:'+num+' 个)';
		}

		$.alert({
			tipCls:'info1' ,
			padding:'25px 0 0 100px' ,
			height:'300px',
			title:'<div style="width:330px;line-height: 22px">兑换礼品：' +name+' '+show_num+'</font></div>',
			content: '<div style="line-height:30px;color: #333;"> <p style="padding-top:10px;"></p>\
						<p class="ui-form-line"><label class="ui-form-label" >所需账户余额：</label><font  color="red">'+money+'</font> 元</p>\
						<p class="ui-form-line"><label class="ui-form-label" style="letter-spacing: 4px;">账户名：</label><font>'+G_ENV_VAR.UNAME+'</font> </p>\
						<p class="ui-form-line"><label class="ui-form-label">剩余账户余额：</label><font>'+user_info.total_money+'</font> 元</p>\
						<p class="ui-form-line"><label class="ui-form-label">交易密码：</label><input type="password" id="ip_trade_pass" style="height:25px;">\
						<a href="/2.0/views/account/back_password.shtml?tab=2" class="blue" target="_blank">忘记交易密码？</a>\
						<div class="ui-tip" id="error_tip" style="margin-left:55px;"></div></p>\
					</div>',
			txtBtn:'兑 换' ,
			init:function (d ,btn ,btn1) {
				btn.click(function () {
					var _input=$('#ip_trade_pass');
					var _val = $.trim(_input.val());
					var _tip=$('#error_tip');
					if (_val == "") {
						_tip.addClass('error').html('交易密码必须为6-16个字符');
						_input.focus();
						return false;
					} else if (_val.length < 6 || _val.length > 16) {
						_tip.addClass('error').html('交易密码必须为6-16个字符');
						_input.focus();
						return false;
					} else {
						_tip.removeClass('error').html('');
						AA.gift.exchange_money_gift(sid,_val,num,d,money);
					}
				});
			}
		});
	},
	//加载特价礼品
	get_speical_gift:function(id,rs_fun){
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_speical.jso'),
			data:{sid:id},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var data=result.data;
					rs_fun(data);
				}
			} ,
			error:function (rs) {
			}
		});
	},
	//加载礼品信息
	get_gift:function(id,rs_fun){
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/gift_info.jso'),
			data:{gid:id},
			type: 'GET',
			dataType: 'json',
			success: function (result) {
				if (result.state == 0) {
					var data = result.data;
					rs_fun(data);
				}
			}
		});
	},
	get_combo_gift: function (id, rs_fun) {
		//ulrich
		$.ajax({
			url: AA.Helper.buildUrl('/v2/gift/gift_info.jso?op=combo'),
			data: {gid: id},
			type: 'GET',
			dataType: 'json',
			success: function (result) {
				if (result.state == 0) {
					var data = result.data;
					rs_fun(data);
				}
			}
		})
	},
	//加载个人信息
	load_user_info:function(re_fun){
		$.ajax({
			url:'/v2/xincunbao/get_index_info.jso',
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					//user_info=result.data;
					user_info=result;
					user_info.total_money = result.money;
					$('#my_score').val(result.score);
					$('#my_score_show').html(AA.Helper.commafy(result.score));

					AA.gift.load_can_exchange_gifts();
					if(re_fun!=undefined){
						re_fun();
					}
				}else{
				}
			} ,
			error:function (rs) {
			}
		});

		//获取信存宝余额
		$.ajax({
			url:'/v2/xincunbao/get_xcb_info.jso',
			type:'POST' ,
			dataType : 'json',
			success:function (result) {
				if(result.state == 0){
					AA.gift.xcbMoney = result.money;
				}
			}
		});
	},
	init_input_address:function(callBackFunction){
		$.alert({
			tipCls:'info1' ,
			padding:'25px 0 0 50px' ,
			height:'300px',
			title:'请输入您的收货地址',
			content:$('.wgt-dialog-address').html(),
			txtBtn:'确认' ,
			txtBtn1:'取消' ,
			init:function (d ,btn ,btn1) {
				loc = new Location();
				var _province_options = '<option value="" data-id="">请选择省份</option>';
				$.each(loc.find('0'), function (key, value) {
					_province_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
				});
				$('.d-dialog #province').empty().append(_province_options);

				$('.d-dialog #province').change(function(){
					var _pid = '0,' + $('option:selected', this).attr('data-id');
					var _city_options = '<option value="" data-id="">请选择城市</option>';
					$.each(loc.find(_pid), function (key, value) {
						_city_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
					});
					$('.d-dialog #district').html('').html('<option value="" data-id="">请选择地区</option>');
					$('.d-dialog #city').empty().append(_city_options);
				});

				$('.d-dialog #city').change(function(){
					var _pid = '0,'+$('.d-dialog #province option:selected').attr('data-id')+','+$('option:selected', this).attr('data-id');
					var _district_options = '<option value="" data-id="">请选择地区</option>';
					if(loc.find(_pid)){
						$.each(loc.find(_pid), function (key, value) {
							_district_options += '<option value="' + value + '" data-id="' + key + '">' + value + '</option>';
						});
					}else{
						_district_options += '<option value="' + $('option:selected', this).val() + '" data-id="' + $('option:selected', this).attr('data-id') + '">' + $('option:selected', this).val() + '</option>';
					}

					$('.d-dialog #district').html('').append(_district_options);
				});

				$.ajax({
					url:'/v2/member/get_personal_info.jso',
					type:'post',
					dataType:'json',
					success:function(result){
						if(result.state == 0){
							if(!$.isEmptyObject(result.addr)){
								var addr = result.addr;
								checked_address_option(addr.province,addr.city,addr.districe);
								$('#address').val(addr.address);
								$('#consignee_zip').val(addr.zip);
							}
						}else{
							if(result.state == 1009){
								d.close();
								AA.RapidLogin.popup();
							}
						}
					}
				});

				btn.click(function () {
					if(check_address_input()){
						/*var addr=get_address_detail();
						 d.close();
						 AA.gift.init_confirm_address(addr);*/
						var province = $('.d-dialog #province').val();
						var city = $('.d-dialog #city').val();
						var district = $('.d-dialog #district').val();
						var address = $.trim($('.d-dialog #address').val());
						var zip = $.trim($('.d-dialog #consignee_zip').val());
						$.ajax({
							url:'/v2/member/save_user_active_address.jso',
							type:'post',
							dataType:'json',
							data:{
								province:province,
								city:city,
								district:district,
								address:address,
								zip:zip
							},
							success:function(result){
								if(result.state == 0){
									d.close();
									callBackFunction();
								}else{
									if(result.state == 1009){
										d.close();
										AA.RapidLogin.popup();
									}
								}
							}
						});
					}
				});

				btn1.click(function () {
					d.close();
				});
			}
		});
	},
	init_confirm_address:function(address){
		if(address==null||address==undefined){
			$.ajax({
				url:AA.Helper.buildUrl('/v2/gift/address.jso'),
				data:{},
				type:'GET' ,
				success:function (result) {
				},
				error:function (rs) {
					if(rs.status==200){
						var json=JSON.parse(rs.responseText);
						if(json.state==0){
							var addr=json.province+','+json.city+','+json.area+','+json.address+','+json.zipCode+','+json.consigneeName+','+json.consigneeMobile;

							$.alert({
								tipCls:'info1' ,
								title:'请确认您的收货地址',
								padding:'25px 0 0 70px' ,
								height:'230px',
								content:'<div style="line-height:35px;color: #333;"><p>'+addr+'</p>\
			     	       					<p>备注: <input type="text" style="width: 250px;" id="address_note" placeholder="可填写颜色等要求信息" maxlength="100"><div class="ui-tip" id="note_error_tip" ></div></p>\
			     	                	</div>',
								txtBtn: '确 定',
								txtBtn1: '修 改',
								init: function (d, btn, btn1) {
									btn.click(function () {
										d.close();
									});
								}
							});
						}
					}
				}
			});
		}else{
			$.alert({
				tipCls:'info1' ,
				title:'请确认您的收货地址',
				padding:'25px 0 0 70px' ,
				height:'230px',
				content:'<div style="line-height:35px;color: #333;"><p>'+address+'</p>\
  	            			<p>备注: <input type="text" style="width: 250px;" id="address_note" placeholder="可填写颜色等要求信息" maxlength="100"><div class="ui-tip" id="note_error_tip" ></div></p>\
  	                	</div>',
				txtBtn: '确 定',
				txtBtn1: '修 改',
				init: function (d, btn, btn1) {
					btn.click(function () {
						d.close();
					});

				}
			});
		}
	},
	//加载个人能兑换的礼品
	load_can_exchange_gifts:function(){
		$.ajax({
			url:AA.Helper.buildUrl('/v2/gift/can_exchange_gifts.jso'),
			data:{score: $('#my_score').val()},
			type:'GET' ,
			dataType:'json',
			success:function (result) {
				if(result.state==0){
					var cans=result.canExchangeGifts;
					var nears=result.nearExchangeGifts;

					var html=' <h3>您现可兑换：</h3>';

					if(cans.length==0){
						html+='<li style="color:#666;">目前暂无可兑换礼品</li>'
					}else{
						for(var i=0;i<cans.length;i++){
							html+='<li style="overflow:hidden;text-overflow:ellipsis;width:164px;white-space: nowrap;"><a href="javascript:AA.gift.show_confirm_exchange('+cans[i].id+');" title="'+cans[i].name+'('+cans[i].socre/10000+'万分)">'+cans[i].name+'('+cans[i].socre/10000+'万分)</a></li>';
						}
					}
					var html1=' <h3>您即将可兑换：</h3>';

					if(nears.length==0){
						html1+='<li style="color:#666;">所有礼品均可兑换</li>'
					}else{
						for(var i=0;i<nears.length;i++){
							html1+='<li style="overflow:hidden;text-overflow:ellipsis;width:164px;white-space: nowrap;" ><a href="javascript:AA.gift.show_confirm_exchange('+nears[i].id+');" title="'+nears[i].name+'('+nears[i].socre/10000+'万分)">'+nears[i].name+'('+nears[i].socre/10000+'万分)</a></li>';
						}
					}
					$('#can_gifts').html(html);
					$('#near_gifts').html(html1);
				}
			} ,
			error:function (rs) {
			}
		});
	},
	load_vip_discount:function(){
		var flag = XR.Global.GetUrlParam("flag") || "a";
		if (flag=="vip") {
			AA.gift.show_confirm_exchange(408);

		}else if(flag=="vipYear"){
			AA.gift.show_confirm_exchange(640,1);
			}
		$.ajax({
			url:AA.Helper.buildUrl('/dumy.txt?t='+new Date().getTime()),
			type:'GET',
			success:function(result){
			},
			complete:function(xhr,ts){
				var date = new Date(xhr.getResponseHeader('Date'));
				AA.gift.cur_time=date.getTime();

				if(typeof sysdateTimer != 'undefined' && sysdateTimer){
					clearInterval(sysdateTimer);
				}
				sysdateTimer = setInterval(function(){
					AA.gift.cur_time += 1000;
				},1000);

				$.ajax({
					url:AA.Helper.buildUrl('/v2/gift/vip_discount.jso'),
					data:{},
					type:'GET' ,
					dataType:'json',
					success:function (result) {
						if(result.state==0){
							vip_discount=result.data;

							AA.gift.load_near_exchange();

							AA.gift.load_gift_list(1,0,0);
							AA.gift.load_special_job();
							//$('#specail_title').hide();
							//$('#specail_title_1').hide();

							//$('#specail_title').css("font-weight","normal");
							$('#hot_gift_title').css("font-weight","bold");

							AA.gift.load_hot_gift();
						}
					}

				});
			}
		});
	},
	count_vip_discount:function(score,id,type){
		var v1,v2,v3,v4,v5,v6,v7,v8,v9;

		for(var i in vip_discount){
			var $str = vip_discount[i];
			var m=parseInt((score*$str)/1000*1000);

			switch(i){
				case "1":
					v1=AA.gift.count_show_vip_score(m);
					break;
				case "2":
					v2=AA.gift.count_show_vip_score(m);
					break;
				case "3":
					v3=AA.gift.count_show_vip_score(m);
					break;
				case "4":
					v4=AA.gift.count_show_vip_score(m);
					break;
				case "5":
					v5=AA.gift.count_show_vip_score(m);
					break;
				case "6":
					v6=AA.gift.count_show_vip_score(m);
					break;
				case "7":
					v7=AA.gift.count_show_vip_score(m);
					break;
				case "8":
					v8=AA.gift.count_show_vip_score(m);
					break;
				case "9":
					v9=AA.gift.count_show_vip_score(m);
					break;
			}
		}

		var html='<div>VIP：<span class="FontTit"><a href="javascript:;" data-type='+type+' data-id='+id+' id="show_a_'+type+'_vip_'+id+'" class="c30808">'+v9+'~'+v1+'</a><span id="show_'+type+'_vip_'+id+'"  class="FontHover">\
						<div>VIP用户享受8~9.8折优惠</div>\
						<table width="100%" border="0" cellspacing="0" cellpadding="0" >\
            				<tr class="bg">\
			           			<td id="vp_'+id+'_'+type+'_1">VIP1</td>\
			           			<td id="vp_'+id+'_'+type+'_2">VIP2</td>\
			           			<td id="vp_'+id+'_'+type+'_3">VIP3</td>\
		           			</tr>\
		           			<tr>\
			           			<td id="vps_'+id+'_'+type+'_1">'+v1+'</td>\
			           			<td id="vps_'+id+'_'+type+'_2">'+v2+'</td>\
			           			<td id="vps_'+id+'_'+type+'_3">'+v3+'</td>\
		           			</tr>\
		           			<tr class="bg">\
			           			<td id="vp_'+id+'_'+type+'_4">VIP4</td>\
			           			<td id="vp_'+id+'_'+type+'_5">VIP5</td>\
			           			<td id="vp_'+id+'_'+type+'_6">VIP6</td>\
		           			</tr>\
		           			<tr>\
			           			<td id="vps_'+id+'_'+type+'_4">'+v4+'</td>\
			           			<td id="vps_'+id+'_'+type+'_5">'+v5+'</td>\
			           			<td id="vps_'+id+'_'+type+'_6">'+v6+'</td>\
		           			</tr>\
		           			<tr class="bg">\
			           			<td id="vp_'+id+'_'+type+'_7">VIP7</td>\
			           			<td id="vp_'+id+'_'+type+'_8">VIP8</td>\
			           			<td id="vp_'+id+'_'+type+'_9">VIP9</td>\
		           			</tr>\
		           			<tr>\
			           			<td id="vps_'+id+'_'+type+'_7">'+v7+'</td>\
			           			<td id="vps_'+id+'_'+type+'_8">'+v8+'</td>\
			           			<td id="vps_'+id+'_'+type+'_9">'+v9+'</td>\
		           			</tr>\
	           			</table>\
           			</span></span></div>';
		return html;
	},
	count_show_vip_score:function(score){
		var show_min=score;
		if(score>9999){
			show_min=AA.Helper.toFixed(score/10000)+"万";
		}else{
			show_min=show_min+"分";
		}
		return show_min;
	},
	add_gift_mouseover:function(type,id){
		$('#show_a_'+type+'_vip_'+id+'').mouseover(function(){
			var type=$(this).attr('data-type');
			var id=$(this).attr('data-id');

			if(G_ENV_VAR.VIP!=''){
				switch(G_ENV_VAR.VIP){
					case "1":
						//alert($('#vp_'+id+'_'+type+'_1').html());
						$('#vp_'+id+'_'+type+'_1').css("color","red");
						$('#vps_'+id+'_'+type+'_1').css("color","red");
						break;
					case "2":
						$('#vp_'+id+'_'+type+'_2').css("color","red");
						$('#vps_'+id+'_'+type+'_2').css("color","red");
						break;
					case "3":
						$('#vp_'+id+'_'+type+'_3').css("color","red");
						$('#vps_'+id+'_'+type+'_3').css("color","red");
						break;
					case "4":
						$('#vp_'+id+'_'+type+'_4').css("color","red");
						$('#vps_'+id+'_'+type+'_4').css("color","red");
						break;
					case "5":
						$('#vp_'+id+'_'+type+'_5').css("color","red");
						$('#vps_'+id+'_'+type+'_5').css("color","red");
						break;
					case "6":
						$('#vp_'+id+'_'+type+'_6').css("color","red");
						$('#vps_'+id+'_'+type+'_6').css("color","red");
						break;
					case "7":
						$('#vp_'+id+'_'+type+'_7').css("color","red");
						$('#vps_'+id+'_'+type+'_7').css("color","red");
						break;
					case "8":
						$('#vp_'+id+'_'+type+'_8').css("color","red");
						$('#vps_'+id+'_'+type+'_8').css("color","red");
						break;
					case "9":
						$('#vp_'+id+'_'+type+'_9').css("color","red");
						$('#vps_'+id+'_'+type+'_9').css("color","red");
						break;
				}
			}
		});
	},
	//更改礼品数量
	change_gift_num:function(type,score,can_money){
		can_money=can_money||0;
        var need_score = 0;

		var val=parseInt($('#input_num').val())||0;

        if(can_money==0){
            var cur_score=user_info.score;
        }else{
            var cur_score=user_info.total_money;
        }

		if(type==2){
			val++;

			need_score=score*(val);
            	$('#input_num').val(val);
            	$('#need_score').html(need_score);

			// if(need_score<=cur_score){
			// 	$('#input_num').val(val);
			// 	$('#need_score').html(need_score);
			// }
		}else if(type==1){
			val--;
			need_score=score*val;
			if(val>=1){
				$('#input_num').val(val);
				$('#need_score').html(need_score);
			}
		}else if(type==3){

			if(val<1||isNaN(val)){

                $("#input_num").val("");
			}
            need_score=score*val||0;

            $('#need_score').html(need_score);
		}
		if (cur_score<need_score){
            $('#still_need_score').html(need_score-cur_score);
            //显示提示
            $("#still_need_score_lable").show();

            AA.gift.enable_click = false;
            // $("div .wgt-dialog-buttons").find(".ui-button-orange").hide();

            $("div .wgt-dialog-buttons").find(".ui-button-orange").css(
				{
					"color" : "#FFF",
                    "border-color": "#cccccc",
                    "background": " #cccccc"
				}
			);

        }else {
            $("#still_need_score_lable").hide();
            AA.gift.enable_click = true;
            $("div .wgt-dialog-buttons").find(".ui-button-orange").css(
                {
                    "color" : "#FFF",
                    "border-color": "#f15a00",
                    "background": "#f15a00"
                }
            );
            // $("div .wgt-dialog-buttons").find(".ui-button-orange").show();
            // $("div .wgt-dialog-buttons").find(".ui-button-white").hide();
            // $("div .wgt-dialog-buttons").find(".ui-button-white").css(
            //     {
            //         "border-color": "#f15a00",
            //         "background": "#ff8410",
            //         "background-image": "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ff8410),color-stop(100%, #f16000) )",
            //         " background-image": "-webkit-linear-gradient(#ff8410, #f16000)",
            //         "background-image": "-moz-linear-gradient(#ff8410, #f16000)",
            //         " background-image": "-o-linear-gradient(#ff8410, #f16000)",
            //         " background-image": "linear-gradient(#ff8410, #f16000)",
            //         "color": "#FFF !important",
            //         "display": "inline-block"
            //
            //     }
            // );

        }


	},
	show_order_detail: function (id) {
		//ulrich
		AA.gift.get_combo_gift(id, function (data) {
			$('.goodsList tbody').html("");

			var price;
			var score;
			$.each(data, function (i, e) {
				if (e.type != 9) {
					var tr = $('<tr></tr>');
					var img = '<td><img src="/s/images/jipinhui/gift/m_size/' + e.imgSrc + '"></td>';
					var nameAndAttr = ' <td>' + e.name + ' <p class="tip">颜色规格：' + e.ex_4 + '</p></td>';
					var priceView = '<td>&yen;' + e.money + '</td>';

					$(tr).append(img, nameAndAttr, priceView);
					$('.goodsList tbody').append(tr);
				} else {
					price = e.money;
					score = e.socre;
				}
			})

			//total
			var totalView = '<tr><td colspan="3">套餐价：<span>&yen;' + price + '</span> <p>兑换积分：<span>' + score + '分</span></p></td></tr>';
			$('.goodsList tbody').append(totalView);

			$("#goodssub").html("");
			var subBuyNow = '<a href="javascript:void(0)" class="" onclick="AA.gift.order_detail_buy_sub(' + id + ',0)">立即购买</a>';
			var subScore = '<a href="javascript:void(0)" class="sub02" onclick="AA.gift.order_detail_score_sub(' + id + ',0)">积分兑换</a>';
			$("#goodssub").append(subScore);
			$("#goodssub").append(subBuyNow);

			AA.gift.dd4 = $.popup({
				title: '订单详情',
				padding: '0',
				content: $('#combo_step_1').html(),
				initialize: function () {
				}
			});
		})
	},
	show_special_order_detail: function (id) {
		//ulrich
		AA.gift.get_combo_gift(id, function (data) {
			$('.goodsList tbody').html("");

			AA.gift.get_speical_gift(id, function (parent) {
				//total
				$('#total tbody').html("");
				var totalView = '<tr><td>套餐价：<span>&yen;' + parent.money + '</span> <p>兑换积分：<span>' + parent.socre + '分</span></p></td></tr>';
				$('#total tbody').append(totalView);
			})

			$.each(data, function (i, e) {
				if (e.type != 9) {
					var tr = $('<tr></tr>');
					var img = '<td class="firstItem"><img src="/s/images/jipinhui/gift/m_size/' + e.imgSrc + '"></td>';
					var nameAndAttr = ' <td class="secondItem">' + e.name + ' <p class="tip">颜色规格：' + e.ex_4 + '</p></td>';
					var priceView = '<td class="thirthItem">&yen;' + e.money + '</td>';

					$(tr).append(img);
					$(tr).append(nameAndAttr);
					$(tr).append(priceView);
					$('.goodsList tbody').append(tr);
				}
			})

			$("#goodssub").html("");
			var subBuyNow = '<a href="javascript:void(0)" class="sub01" onclick="AA.gift.order_detail_buy_sub(' + id + ',1)">立即购买</a>';
			var subScore = '<a href="javascript:void(0)" class="sub02" onclick="AA.gift.order_detail_score_sub(' + id + ',1)">积分兑换</a>';
			$("#goodssub").append(subBuyNow);
			$("#goodssub").append(subScore);

			AA.gift.dd4 = $.popup({
				title: '订单详情',
				padding: '0',
				top: '1',
				content: $('#combo_step_1').html(),
				initialize: function () {
				}
			});
		})
	},
	order_detail_buy_sub: function (id, type) {
		this.dd4.close();
		if (type == 1) {
			AA.gift.show_confirm_speical_exchange(id, 1);
		} else {
			AA.gift.show_confirm_exchange(id, 1);
		}
	},
	order_detail_score_sub: function (id, type) {
		this.dd4.close();
		if (type == 1) {
			AA.gift.show_confirm_speical_exchange(id, 0);
		} else {
			AA.gift.show_confirm_exchange(id, 0);
		}
	},
	init_dialog: function () {
		var id = XR.Global.GetUrlParam('jiGiftId');

		
		var numReg = new RegExp("^[0-9]*$");
		if (numReg.test(id)) {
					AA.gift.show_confirm_exchange(id, 1);			
		}
	},
	//只能用现金弹窗
    alg_special_cash_only_exchange: function (id) {
		AA.gift.get_speical_gift(id, function (data) {
			AA.gift.totalMoney = AA.gift.handlerNum(parseFloat(user_info.total_money) + parseFloat(AA.gift.xcbMoney));

			max_reward = data.maxReward;


			var _nowtime = AA.gift.cur_time;

			if (_nowtime / 1000 < AA.gift.start_time) {
				AA.gift.show_no_start_dlg(id);
				return;
			}

			if (data.limitNum <= data.exchangeNum) {
				AA.gift.show_no_gift_num(data.limitNum);
				return;
			}


			$('#step1-buy-num').hide();
			$('#step1-left-num').show();


			var discountMoneyByScore = user_info.score / 400;
			$("#step_1_discount_money").html(AA.gift.cutNum(discountMoneyByScore));
			$("#step_1_money").html(AA.gift.totalMoney);
			$("#step_1_username").html(G_ENV_VAR.UNAME)
			$("#step_1_ordermoney").html(AA.gift.cutNum(data.money));
			$("#step_1_score").html(user_info.score);
			$("#step_1_title").html(data.name);
			$("#step_1_paymoney").html(AA.gift.cutNum(data.money));
			AA.gift.curMoney = data.money;
			AA.gift.gid = data.id;
			$("#step_1_img").attr("src", "/s/images/jipinhui/gift/m_size/" + data.imgSrc);
			var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money));

			$("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
			$("#step_1_real_xcb_money").html(parseFloat(AA.gift.xcbMoney));
            $("#step_1_totalAccount").html(parseFloat(user_info.total_money));

			$("#step_2_money").html(AA.gift.totalMoney);
			$("#step_2_username").html(G_ENV_VAR.UNAME);
			$("#step_2_score").html(user_info.score);
			$("#step_2_title").html(data.name);
			$("#step_2_img").attr("src", "/s/images/jipinhui/gift/m_size/" + data.imgSrc);
			if(parseFloat(AA.gift.cutNum(data.money)) > parseFloat(AA.gift.totalMoney)){
				 
				$('#still_need_money_lable').show();
				$('#still_need_money_lable').html('您还差'+'<span class="red" >'+includeXcbMoney+'</span>'+'元才可购买，请前往充值！');
				$('#buy_comfirm_btn').html('充值');
			}
           AA.gift.is_special=1;
			AA.gift.dd = $.popup({
				title: '购买',
				padding: '0',
				content: $('#cash_obly_step_1').html(),
				initialize: function () {
				}
			});

			$('#isPhy').val(data.isPhy);
			$('#isSpecial').val(1);
			
		});
	},
    alg_special_money_exchange: function (id,cash_only) {
        AA.gift.get_speical_gift(id, function (data) {
            AA.gift.totalMoney = AA.gift.handlerNum(parseFloat(user_info.total_money) + parseFloat(AA.gift.xcbMoney));

            max_reward = data.maxReward;

            /*if (data.socre > user_info.score) {
                AA.gift.show_no_score1(data.socre, data.name);
                return;
            }*/

            var _nowtime = AA.gift.cur_time;

            if (_nowtime / 1000 < AA.gift.start_time) {
                AA.gift.show_no_start_dlg(id);
                return;
            }

            if (data.limitNum <= data.exchangeNum) {
                AA.gift.show_no_gift_num(data.limitNum);
                return;
            }

            /*if (parseFloat(data.money) > parseFloat(AA.gift.totalMoney)) {
                //$("#step_1_error_info").attr('style', 'display:block').html('余额不足');
            } else {
                $("#step_1_error_info").attr('style', 'display:none').html('');
            }*/

            $('#step1-buy-num').hide();
            if (cash_only!=1)
            $('#step1-left-num').show();


            var discountMoneyByScore = user_info.score / 400;
            $("#step_1_discount_money").html(AA.gift.cutNum(discountMoneyByScore));
            $("#step_1_money").html(AA.gift.totalMoney);
            $("#step_1_username").html(G_ENV_VAR.UNAME)
            $("#step_1_ordermoney").html(AA.gift.cutNum(data.money));
            $("#step_1_score").html(user_info.score);
            $("#step_1_title").html(data.name);
            $("#step_1_paymoney").html(AA.gift.cutNum(data.money));
            AA.gift.curMoney = data.money;
            AA.gift.gid = data.id;
            $("#step_1_img").attr("src", "/s/images/jipinhui/gift/m_size/" + data.imgSrc);
            var includeXcbMoney = AA.gift.handlerNum(parseFloat($("#step_1_paymoney").html()) - parseFloat(user_info.total_money));

            $("#step_1_xcb_money").html(includeXcbMoney < 0 ? 0 : includeXcbMoney);
            $("#step_1_real_xcb_money").html(parseFloat(AA.gift.xcbMoney));
            $("#step_1_totalAccount").html(parseFloat(user_info.total_money));

            $("#step_2_money").html(AA.gift.totalMoney);
            $("#step_2_username").html(G_ENV_VAR.UNAME);
            $("#step_2_score").html(user_info.score);
            $("#step_2_title").html(data.name);
            $("#step_2_img").attr("src", "/s/images/jipinhui/gift/m_size/" + data.imgSrc);
            if(parseFloat(AA.gift.cutNum(data.money)) > parseFloat(AA.gift.totalMoney)){

                $('#still_need_money_lable').show();
                $('#still_need_money_lable').html('您还差'+'<span class="red" >'+includeXcbMoney+'</span>'+'元才可购买，请前往充值！');
                $('#buy_comfirm_btn').html('充值');
            }

            AA.gift.is_special=1;
            AA.gift.dd = $.popup({
                title: '购买',
                padding: '0',
                content: $('#step_1').html(),
                initialize: function () {
                    if(cash_only==1){
                        $("#cash_only_step_1").hide();
                        $("#buy_comfirm_btn").removeAttr('onclick').attr('onclick','AA.gift.stepOne('+cash_only+')');
                    }
                }
            });



            $('#isPhy').val(data.isPhy);
            $('#isSpecial').val(1);

        });
    },
    buySub:function () {
        var gid1=AA.gift.gid;
        var num=$('#buy_num').text();
        $('#exchangeForm').attr('action','/v2/gift/exchange_gift_by_pay.raw?gid='+gid1+"&num="+num+"&bankType=XR_baofu_11");
        $('#exchangeForm').submit();

    },
    show_gift_dialog:function(){
        var giftReward =  XR.Global.GetUrlParam('giftReward')|0;
        if( giftReward == 1){
            AA.gift.load_my_gift(1);
        }
    },
    show_giftReward_dialog:function() {
        AA.gift.dd3.close();
        AA.gift.load_my_gift(1);
    },
	get_discount_cover:function (data,ty) {
		//default discount cover
		var title = '精选特惠';
		if(data.channelVendor == 2) title = '京东直采';
    	if(!ty || ty == 0){
		 var cover = "<i class='discountCover'>" +
			 			"<i class='title'>"+title+"</i>" +
			 			"<i class='price'>&yen;"+data.money+"</i>" +
			 			"<i class='oriPrice'>"+data.originalPrice+"</i>" +
			 			"<i class='discount'>"+(data.originalPrice-data.money)+"</i>" +
			 		"</i>";
			return cover;
		}
	}
}
var $this = AA.gift;
/*$(window).load(function() {
	$.dialog({
		title : '通知',
		content : $('#jipinhui_anno').html(),
		initialize : function() {
			//var d = this;
			// $("#confirm").unbind('click').bind('click',function(){
			// 	d.close();
			//});
		}
	});
});*/