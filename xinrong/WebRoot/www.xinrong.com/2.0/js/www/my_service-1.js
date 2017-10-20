$(function(){

	$.ajax({
		url:'/v2/login/in_session_data.jso',
	    type:'GET' ,
	    dataType:'json',
	    success:function (result) {
			if(result.state==0){
				initSummary();
				luckeyList(1);
				ScoreList(1);
				userGrowInfo();


			}else{
				AA.RapidLogin.popup();
				return;
			}
		}
	});

});

function getCookie(objName) {// 获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for ( var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName)
			return decodeURIComponent(temp[1]);
	}
}

function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString() + ";path=/";
}
var PAGE_SIZE=10;
var LuckStatus=['未发放','已发放'];
var StreamType=['','+','-'];
var Type=['','投资收入','抽奖支出','抽奖收入','兑换支出'];
var ActiveType=['','投资获积分','抽奖耗积分','抽奖获积分','兑换耗积分'];
var GrowType=['','投资成长值','活动成长值','信存宝成长值','','借款成长值'];
var vip;
var name;
var isOpenVip;
function initSummary(){
	$.ajax({
			url:'/v2/member/get_user_reward_sunmary.jso',
		    type:'GET' ,
		    dataType:'json',
		    success:function(result){
		    	if(result.state==0){
		    	$("#investGrowReward").html(result.investGrowReward);
		    	$("#springReward").html(result.springReward);
		    	$("#birthReward").html(result.birthReward);
		    	$("#midAutoReward").html(result.midAutoReward);
		    	$("#womanReward").html(result.womanScore);
		    	$("#name").html(result.name);
		    	$("#vip").html(result.vip);
		    	$("#confGrow").html(result.confGrow);
		    	$("#nowGrow").html(result.nowGrow);
		    	$("#needGrow").html(result.confGrow-result.nowGrow);
		    	$("#activeReward").html(result.activeReward);
		    	$("#activeRewardCount").html(result.activeRewardCount);
		    	$("#activeScore").html(result.activeScore);
		    	$("#activeScoreCount").html(result.activeScoreCount);
		    	$("#activeCount").html(result.activeCount);
		    	$("#monthActiveCount").html(result.monthActiveCount);
		    	$("#nowScore").html(result.nowScore);
		    	$("#activeScore1").html(result.userScore);
		    	$("#nowScoreCount").html(result.activeScoreCount);
		    	$("#activeScore1Count").html(result.activeScoreCount);
		    	$("#newVip").html(result.vip+1);
		    	vip=result.vip;
		    	name=result.name;
		    	isOpenVip=result.isOpenVip;

		    	$("#activeReward2").html(result.activeReward);
		    	$("#activeRewardCount2").html(result.activeRewardCount);
		    	$("#activeScore2").html(result.activeScore);
		    	$("#activeScoreCount2").html(result.activeScoreCount);
		    	$("#activeCount2").html(result.activeCount);
		    	$("#monthActiveCount2").html(result.monthActiveCount);

		    	$("#nowScore3").html(result.nowScore)
		    	$("#useScore3").html(result.userScore);

		    	if(isOpenVip>0){


		    		if (vip>0) {
		    			$("#vipExpired").hide();
		    			$("#usernologin").hide();
			    		$("#userNormalProgress").hide();
			    		$("#VipProgress").show();
			    		$("#vipOpenGrow").html("续费");
			  			var rate=toDecimal(result.nowGrow/result.confGrow);
			  			$('#progress_length').attr("style","width:"+rate*100+"%");
					} else {
						$("#usernologin").hide();
						$("#expriedVipName").html(name);
						$("#vipExpired").show();

					}


		    	}else{


		    		$("#vipExpired").hide();
		    		$("#usernologin").hide();
		    		$("#VipProgress").hide();
		    		$("#userNormalProgress").show();
		    		$("#noVipName").html(name);
		    		$("#vipOpenGrow").html("开通vip");

		    	}

		    	growList(1);

		    	}else{
		    		//alert(result.state+" "+result.msg);
		    	}
		    }});
}


function luckeyList(pageIndex){
	$.ajax({
			url:'/v2/member/find_active_record.jso',
			data:{pageIndex:pageIndex,pageSize:PAGE_SIZE},
		    type:'post' ,
		    dataType:'json',
		    success:function(result){
		    	if(result.state==0){
		    	var data=result.activeList;
		    	var total=result.activeCount;
		    	var _html='';
		    	var tabCls = '';
		    	for ( var i in data) {
		    		var d = data[i];
		    		var isPhysical=d.isPhysical;
					var name=d.name;
					var time=d.transTime;
					var status=d.stastus;
					if(parseInt(i) % 2 != 0){
						tabCls = 'class="bg"';
					}else{
						tabCls = '';
					}
					var name_html='';
					//
					if (isPhysical==0) {
						name_html+='<td>'+name+'</td>';
					} else {
						var subName=name.length;
						if (subName>10) {
							var subNewName=name.substring(0, 10)+'....';
							name_html+='<td '+'title="'+name+'">'+subNewName+'</td>';
						} else {
							name_html+='<td>'+name+'</td>';
						}
					}



					_html+=' <tr '+tabCls+'><td align="center">'+time +'</td>'+
					name_html+'<td align="center">'+LuckStatus[status]+'</td></tr>';
				}
		    	if(_html==''){
					_html='<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="10">暂无抽奖记录</td></tr>';
				}
		    	$("#luckeyList").html(_html);//把整个列表内容放到html页面对应的位置
		    	var pageNum = Math.ceil(total/PAGE_SIZE);//总页数
		    	if(pageNum>0){
		    	showLuckeyList(pageIndex,pageNum);//根据总页数和当前页码生成分页按钮布局
		    	}else{

		    	}
		    	}else{
		    		//alert(result.state+" "+result.msg);
		    	}
		    }});
}

function showLuckeyList(pageIndex,pageNum){
	var previous=pageIndex-1;
	var next=pageIndex+1;

	var previousField;
	if(previous>=1 && previous<=pageNum){
		previousField='<a href="javascript:luckeyList('+previous+')">上一页</a>';
	}else{
		previousField='<a href="javascript:void(0)">上一页</a>';
	}

	var _html=previousField;


	var nextField;
	if(next>=1 && next<=pageNum){
		nextField='<a href="javascript:luckeyList('+next+')">下一页</a>';
	}else{
		nextField='<a href="javascript:void(0)">下一页</a>';
	}
	_html+=nextField;
	$("#luckeyListPage").html(_html);
}


function ScoreList(pageIndex){
	$.ajax({
			url:'/v2/member/find_user_score.jso',
			data:{pageIndex:pageIndex,pageSize:PAGE_SIZE},
		    type:'post' ,
		    dataType:'json',
		    success:function(result){
		    	if(result.state==0){
		    	var data=result.userScoreList;
		    	var total=result.scoreCount;
		    	var _html='';
		    	var tabCls = '';
		    	for ( var i in data) {
		    		var d = data[i];
		    		//<td align="center">2012-10-03 11:54:13 </td>
	                 // <td align="center">210000255566213182</td>
	                 // <td align="center">投资收入</td>
	                 // <td align="right">+1000 分</td>
	                  //<td align="left">活动获积分</td>
					var sn=d.sn;
					var time=d.time;
					var streamType=d.streamType;
					var score=d.score;
					var type=d.type;
					var transType='';
					var other='';
					if(type<=4){
						transType=Type[type];
						other=ActiveType[type];
					}else if(type==39){
						transType="借款奖励";
						other="借款赠送积分";
					}
					else if(type==46){
						transType="其它";
						other="购买保险赠送";
					}else if(type==126){
						transType="其它";
						other="vip特权项";
					}
					else if(type==32){
						transType="小游戏";
						other="游戏积分预授权";
					}else if(type==33){
						transType="小游戏";
						other="游戏积分结算";
					}else if (type == 64) {
						transType="答题获得";
						other="答题获得";
					}
					else{
						transType="其它";
						other="其它"
					}
					if(parseInt(i) % 2 != 0){
						tabCls = 'class="bg"';
					}else{
						tabCls = '';
					}

					_html+=' <tr '+tabCls+'><td >'+time +
					'</td><td align="center">'+transType+
					'</td><td align="center">'+StreamType[streamType]+score+"分"+
					'</td><td align="left">'+other+'</td></tr>';
				}
		    	if(_html==''){
					_html='<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="10">暂无积分记录</td></tr>';
				}
		    	$("#scoreList").html(_html);//把整个列表内容放到html页面对应的位置
		    	var pageNum = Math.ceil(total/PAGE_SIZE);//总页数
		    	if (pageNum>0) {
		    		showScoreList(pageIndex,pageNum);//根据总页数和当前页码生成分页按钮布局
				} else {

				}


		    	}else{
		    		//alert(result.state+" "+result.msg);
		    	}
		    }});
}
function showScoreList(pageIndex,pageNum){
	var previous=pageIndex-1;
	var next=pageIndex+1;

	var previousField;
	if(previous>=1 && previous<=pageNum){
		previousField='<a href="javascript:ScoreList('+previous+')">上一页</a>';
	}else{
		previousField='<a href="javascript:void(0)">上一页</a>';
	}

	var _html=previousField;



	var nextField;
	if(next>=1 && next<=pageNum){
		nextField='<a href="javascript:ScoreList('+next+')">下一页</a>';
	}else{
		nextField='<a href="javascript:void(0)">下一页</a>';
	}
	_html+=nextField;
	$("#scoreListPage").html(_html);
}



function showGrowList(pageIndex,pageNum){
	var previous=pageIndex-1;
	var next=pageIndex+1;

	var previousField;
	if(previous>=1 && previous<=pageNum){
		previousField='<a href="javascript:growList('+previous+')">上一页</a>';
	}else{
		previousField='<a href="javascript:void(0)">上一页</a>';
	}

	var _html=previousField;


	var nextField;
	if(next>=1 && next<=pageNum){
		nextField='<a href="javascript:growList('+next+')">下一页</a>';
	}else{
		nextField='<a href="javascript:void(0)">下一页</a>';
	}
	_html+=nextField;
	$("#growListPage").html(_html);
}


function computeGrow(){
	var investMoney =$("#investMoney").val();
	if (investMoney>=0&&investMoney.indexOf(".")<0) {
		var vipGrade=$("#vipGrade").val();

		$.ajax({
			url:'/v2/member/compute_grow.jso',
			data:{investMoney:investMoney,vipGrade:vipGrade},
			dataType:'json',
			type:'post',
			success:function(result){
				if(result.state==0)
					{
						var data=result.data;
					    $("#computeGrow").html(data+"点");//把整个列表内容放到html页面对应的位置
					    $("#inputNotice").html('');
					    $("#vipGrade").val();
					}else
						{if (result.state==1009) {
							AA.RapidLogin.popup();
							return;
						} else {
							$("#inputNotice").html(result.msg);
						}

						//alert(result.state+" "+result.msg);
						//
						}
			}

		});

	}else{
		$("#inputNotice").html("投资金额请输入正整数");
		$("#computeGrow").html("_点");
	}
}

var userIsAutoRenew='';
function userGrowInfo(){
	$.ajax({
		url:'/v2/vip/user_growth_info.jso',
		data:{},
	    type:'post' ,
	    dataType:'json',
	    success:function(result){
	    	if(result.state==0){
	    		userIsAutoRenew=result. autoVip;


	    	}else{
	    		//alert(result.state+" "+result.msg);
	    	}
	    }});
}



vip_html = '';
var first_div = undefined;
var isAuto='';
function openVipGrow(){
	location.href="/2.0/action/zt_vip/vip_zt.shtml";
//	var _html = $("#openVip").html();
//	if(_html != ''){
//		vip_html=$("#openVip").html();
//	}
//	var newtitle='';
//	var newSmallTitle='';
//	if (isOpenVip>0) {
//		newtitle='续费VIP';
//		newSmallTitle='VIP会员续费';
//	} else {
//		newtitle='开通VIP';
//		newSmallTitle='开通VIP会员';
//	}
//
//
//	first_div = $.popup({
//        title:newtitle,
//        padding:'36px',
//        content:vip_html,
//        initialize:function () {
//        }
//     });
//	//如果有设置自动续费填充到复选框userIsAutoRenew
//	if (userIsAutoRenew==1) {
//		$("#is_auto").prop('checked',true);
//		$("#state").html("自动续费已开启");
//	} else {
//		$("#is_auto").prop('checked',false);
//		$("#state").html("自动续费已关闭");
//	}
//	$("#smallTitle").html(newSmallTitle);
//
//	$('#openVip').html('');
}
var leftMoney;
var investReward;
var safepass;
function openOrGoon(){
	$.ajax({
		url:'/v2/member/get_asset_overview.jso',
		data:{},
	    type:'post' ,
	    dataType:'json',
	    success:function(result){
	    	leftMoney=result.accountBalance;
	    	investReward=result.rewardMoney;
	    	if(result.state==0){
	    		if (leftMoney>=150) {
	    			if ($("#is_auto").prop('checked')) {
	    				isAuto=1;
	    			} else {
	    				isAuto=0;
	    			}
	    			first_div.close();
	    			openReNew(name,leftMoney,investReward);


				} else {
					first_div.close();
					openNoMoney(name,leftMoney,investReward);
				}

	    	}else{
	    		//alert(result.state+" "+result.msg);
	    	}
	    }});
}

var nomoney_html='';
function openNoMoney(name,leftMoney,investReward){
	var _html = $("#nomoney").html();
	if(_html != ''){
		nomoney_html=$("#nomoney").html();
	}
	var newtitle='';
	if (isOpenVip>0) {
		newtitle='续费VIP';
	} else {
		newtitle='开通VIP';
	}

	$.popup({
        title:newtitle,
        padding:'0px',
        content:nomoney_html,
        initialize:function () {

        }

     });
	$("#userName").html(name);
	$("#leftMoney").html(leftMoney);
	$("#investReward").html(investReward);
	var realMoney=150-leftMoney;
	$("#real_money").html(realMoney);
	$('#nomoey').html('');
}


var userReMoney_html = '';
var dd2 = undefined;
var vipType='';
function openReNew(name,leftMoney,investReward){
	var _html = $("#userReMoney").html();
   if(_html != ''){
		userReMoney_html=$("#userReMoney").html();
	}
	var newtitle='';
	var newSecondTitle='';
	if (isOpenVip>0) {
		newtitle='续费VIP';
		newSecondTitle='VIP会员续费';
		vipType=2;
	} else {
		newtitle='开通VIP';
		newSecondTitle='开通VIP会员';
		vipType=1;
	}


	dd2= $.popup({
        title:newtitle,
        padding:'15px',
        content:userReMoney_html,
        initialize:function () {

        }

     });
	$("#secondTitle").html(newSecondTitle);
	$("#name").html(name);
	$("#moneyLeft").html(leftMoney);
	$('#userReMoney').html('');
}

function vipAutoRenewStep1(){
	if ($("#is_auto").prop('checked')) {
		isAuto=1;


	} else {
		isAuto=0;


	}
	//first_div.close();
	vipAutoRenewStep2(isAuto);

}

function vipAutoRenewStep2(isAuto){
	$.ajax({
		url:'/v2/vip/auto_vip_renew.jso',
		data:{isAuto:isAuto},
	    type:'post' ,
	    dataType:'json',
	    success:function(result){
	    	if(result.state==1){
	    		vipAutoRenewStep3();
	    		userGrowInfo();

	    	}else{
	    		//alert(result.state+" "+result.msg);
	    	}
	    }});
}

var import_html = '';
var setRenew='';
function vipAutoRenewStep3(){
	var _html = $("#setVipRenewSuccess").html();
	if(_html != ''){
		import_html=$("#setVipRenewSuccess").html();
	}
	setRenew=$.popup({
		title:"提示",
        padding:'0px',
        content:import_html,
        initialize:function () {
        	$('#close1').click(function(){
        		setRenew.close();
        		first_div .close();
        		openVipGrow();

        	});
        }

     });
	$('#setVipRenewSuccess').html('');

}
function vipRenew(){
	safepass=$("#safepass").val();
	vipRenew1(isAuto,safepass,vipType);
}

function vipRenew1(isAuto,safepass,vipType){
	$.ajax({
		url:'/v2/vip/become_vip.jso',
		data:{password:AA.Helper.encrypPw(safepass),isAuto:isAuto,type:vipType},
	    type:'post' ,
	    dataType:'json',
	    success:function(result){
	    	if(result.state==0){
	    	dd2.close();
	    	var _html = becomeVipSuccess();
	    	$.popup({
	    		title:"提示",
	            padding:'0px',
	            content:_html,
	            initialize:function () {

	            },
	            beforeunload:function(){
	            	//alert(1);
	            }
	         });

	    	}else if(result.state==1002){
				$('#become_vip_error_tip').html("交易密码错误").show();
			}else if(result.state==1001){
				$('#become_vip_error_tip').html("购买/续费失败").show();
			}else{
				$('#become_vip_error_tip').html("系统繁忙").show();
			}
	    }});
}


function becomeVipSuccess(){


	if (isOpenVip>0) {
		title='续费';
	} else {
		title='开通';
	}
	var html='<div class="dialog_sucfont dialog_vip">';
	html+='<dl>';
	html+='<dt><i class="icondagou"></i></dt>';
	html+='<dd><h3>恭喜您VIP会员'+title+'成功！</h3>您可以继续尊享本金收益保障、费用折扣等多项特权。</dd>';
	html+='<div class="clear"></div>';
	html+='</dl>';
	html+='<div class="dialogsub" ><a href="/invest.shtml" class="ui-button ui-button-orange" >立即投资</a></div>';
	html+='</div>';

	return html;
}





function growList(pageIndex){
	$.ajax({
			url:'/v2/member/find_user_daily_record.jso',
			data:{pageIndex:pageIndex,pageSize:PAGE_SIZE},
		    type:'post' ,
		    dataType:'json',
		    success:function(result){
		    	if(result.state==0){
		    	var data=result.dtoList;
		    	var todayGrowSum=result.todayGrow;
		    	var total=result.count;
		    	var userVip=vip;
		    	if (userVip>0) {
		    		$("#userNoGrow").hide();
		    		$("#vipTodayGrow").show();
		    		$("#vipGift").hide();
		    	} else {
		    		$("#vipTodayGrow").hide();
		    		$("#userNoGrow").show();
		    	}
		    	$("#todayGrowSum").html(todayGrowSum);
		    	var _html='';
		    	var tabCls = '';
		    	for ( var i in data) {
		    		/*<th width="140">交易时间</th>
	                  <th width="240">流水号</th>
	                  <th>类型</th>
	                  <th align="right">成长值</th>
	                  <th align="left">备注</th>*/
		    		var d = data[i];
					var sn=d.sn;
					var time=d.time;
					var type=d.type;
					var grow=d.grow+"点";
					var status=d.stastus;
					if(parseInt(i) % 2 != 0){
						tabCls = 'class="bg"';
					}else{
						tabCls = '';
					}
					var pointInd=time.lastIndexOf(".");
					var newTime=time.substring(0,pointInd);
					_html+=' <tr '+tabCls+'><td align="center">'+newTime +'</td><td align="center">'+
					sn+'</td><td align="center">'+"成长值"
					+'</td><td align="center">'+
					grow+'</td><td align="center">'+GrowType[type]+'</td></tr>';
				}
		    	if(_html==''){
					_html='<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="10">暂无成长值记录</td></tr>';
				}
		    	$("#growList").html(_html);//把整个列表内容放到html页面对应的位置
		    	var pageNum = Math.ceil(total/PAGE_SIZE);//总页数
		    	if(pageNum>0){
		    		showGrowList(pageIndex,pageNum);//根据总页数和当前页码生成分页按钮布局
		    	}

		    	}else{
		    		//alert(result.state+" "+result.msg);
		    	}
		    }});
}
