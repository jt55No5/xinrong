var PAGE_SIZE=6;

var STATUS=-1;
var TYPE=-1;
var BEGIN_TIME=-1;
var END_TIME=-1;

var statusArr = ['未投资','已投资'];

$(function(){
	$.ajax({
		url:'/v2/login/in_session_data.jso',
	    type:'GET' ,
	    dataType:'json',
	    success:function (result) {
			if(result.state==0){
				getBaseInfo();
				getInviteReward();
				getInviteCount();
				doSearch();
			}else{
				AA.RapidLogin.popup();
				return;
			}
		}
	});
	
});


function getBaseInfo(){
	$.ajax({
		url : '/v2/xincunbao/get_index_info.jso', 
		type : 'post',
		dataType : 'json',
		success : function(result) {
			if(result.vip==0){
				$("#vip").html('<p style="padding: 15px 10px 0 0;"><i class="AllIcon iconI"></i>  <a href="/2.0/vip.html" target="blank">成为VIP会员，享受本金收益保障！ </a></p>');
			}else{
				$("#vip").html('<i class="AllIcon icon01"></i>您是尊贵的VIP'+result.vip+'会员！</p>有效期至：'+XR.Tool.FormateDate(result.vipDeadLine,'Y-m-d')+' <a target="_blank" href="/2.0/vip.html" class="blue">详情</a>');
			}
			getReportInfo(result.name);
			
		}
	});    
}  


function getReportInfo(userName){
$.ajax({
 		url : '/v2/transaction/total_transaction_money.jso',         
 		type : 'post', 
 		dataType : 'json', 
 		success : function(data) {  
 			var acc_all_total = data.accAllTotal;
 			var acc_all_retain_total=parseFloat(data.accEarnBackTotal)+parseFloat(data.accEarnTotal);

			initShareUrl(userName,acc_all_retain_total);//初始化分享url
		}
		})
	}

function initShareUrl(userName,totalProfit){

	var firstDate = new Date();
	firstDate.setFullYear(2012);
	firstDate.setMonth(11);
	firstDate.setDate(27);
	firstDate.setHours(0);
	firstDate.setMinutes(0);
	firstDate.setSeconds(0);
	firstDate.setMilliseconds(0);
	
	var nowDate = new Date();
	var tempDate = new Date(firstDate.getTime());
	tempDate.setFullYear(nowDate.getFullYear());
	
	var year;
	year = nowDate.getFullYear() - 2012;
	if(tempDate > nowDate){
		tempDate.setFullYear(nowDate.getFullYear()-1);
		year = year - 1;
	}
	
	var day = parseInt((nowDate.getTime() - tempDate.getTime())/86400000);
	var hours = nowDate.getHours();
	var minutes = nowDate.getMinutes();
	var seconds = nowDate.getSeconds();
		

	userName = encodeURI(userName);
	var profitOverTB=parseInt(totalProfit/100000000);
	var profitOverTM=parseInt((totalProfit-parseInt(totalProfit/100000000)*100000000)/10000);
	var profitStr;
	if(profitOverTB>0)
		profitStr=profitOverTB+'亿'+profitOverTM+'万';
	else
		profitStr=profitOverTM+'万';
	var shareContent ='#信融财富#已运营'+year+'年'+day+'天，为投资人赚取'+profitStr+'元收益。我在这里投资赚收益，邀您一起加入，让财富稳健增长。新用户注册认证还送20元投资礼金哦！ https://www.xinrong.com/2.0/views/account/register3.0.shtml?inviter='+userName;
	//var shareContent = '#信融财富#广东互联网金融协会副会长单位，预期年化收益率可达16.8%，第三方担保、风险准备金多重保障，新用户注册认证即送20元投资礼金！ https://www.xinrong.com/2.0/views/account/register3.0.shtml?inviter='+userName;
	$("#shareContent").text(shareContent);

	var text = 'https://www.xinrong.com/v2/wechat/login.raw?targetUrl=https%3a%2f%2fwww.xinrong.com%2fwebapp2.0%2frecommend.html';
	$("#div_div").html('');
	$("#div_div").qrcode(utf16to8(text));
	
	$('#inside').zclip({
		path: 'js/ZeroClipboard.swf',
		copy: function(){
			return $("#shareContent").text();
		},
		afterCopy: function(){
			
			$.dialog({
				title : '复制成功',
				content : $('#box').html(),
				initialize : function() {
					var d = this;
					$("#confirm").unbind('click').bind('click',function(){
						d.close();
					});
				}
			});
		}
	});
}



//借款列表
function timeChange(){
	var type=$("#type").val();
	if(type==5){//用户指定时间
		//显示开始-结束时间控件
		$("#timeInputField").show();
	}else{
		//隐藏开始-结束时间控件
		$("#timeInputField").hide();
		//查询列表
		doSearch();
	}
}
function doSearch(){
	STATUS=$("#status").val();
	TYPE=$("#type").val();
	beginTimeStr=$("#beginTime").val();
	endTimeStr=$("#endTime").val();
	if(beginTimeStr==""){
		BEGIN_TIME=-1;
	}else{
		BEGIN_TIME= Date.parse(new Date(beginTimeStr+" 00:00:00"))/1000;
	}
	if(endTimeStr==""){
		END_TIME=-1;
	}else{
		END_TIME= Date.parse(new Date(endTimeStr+" 00:00:00"))/1000+86400;
	}
	obtainList(1);
}
function obtainList(pageIndex){
	
	$.ajax({
		url:'/v2/register/invite_list.jso',
		data:{pageSize:PAGE_SIZE, pageIndex:pageIndex,status:STATUS, type:TYPE, beginTime:BEGIN_TIME, endTime:END_TIME},
		dataType:'json',
		type:'post',
		success:function(result){
			
			if(result.state==0){
				var rows = result.rows;
				var total = result.total;
				
				var _html='';
				
				for(var i=0;i<rows.length;i++){
					
					var firstInvestTime = rows[i].firstInvestTime;
					if(firstInvestTime==null||firstInvestTime==0){
						firstInvestTime='未投资';
					}else{
						firstInvestTime = XR.Tool.FormateDate(firstInvestTime,'Y-m-d h:m:s');
					}
					
					_html+='<tr><td align="center">'+rows[i].name+'</td>'+
					    '<td align="center">'+XR.Tool.FormateDate(rows[i].registerTime,'Y-m-d h:m:s')+'</td>'+
					    '<td align="center">'+firstInvestTime+'</td>'+
					    '<td align="center">'+rows[i].mobile+'</td>'+
					    '<td align="center">'+statusArr[rows[i].investStatus]+'</td></tr>';
		
				}
				if(_html==''){
					$("#noRecordTip").show();
				}else{
					$("#noRecordTip").hide();
				}
				$("#list").html(_html);//把整个列表内容放到html页面对应的位置
				
				var pageNum = Math.ceil(total/PAGE_SIZE);//总页数
				
				showBtn(pageIndex,pageNum,'obtainList','btn');
				
				
				
			}else{
				alert(result.state+" "+result.msg);
			}
		}
	});
}


function showBtn(pageIndex,pageNum,functionName,btnId){
	if(pageNum==0){
		$('#'+btnId).html('');
		return;
	}
	
	var previous=pageIndex-1;
	var next=pageIndex+1;

	var previousField;
	if(previous>=1 && previous<=pageNum){
		previousField='<a href="javascript:'+functionName+'('+previous+')">上一页</a>';
	}else{
		previousField='<a href="javascript:void(0)">上一页</a>';
	}
	
	var _html=previousField;
	
	if(pageNum<=7){
		for(var i=1;i<=pageNum;i++){
			if(i==pageIndex){
				_html+='<span>'+i+'</span>';
			}else{
				_html+='<a href="javascript:'+functionName+'('+i+')">'+i+'</a>';
			}
			
		}
	}else{//总页数大于7时
		var marginLeft = pageIndex-1;
		var marginRight = pageNum-pageIndex;
		var startIndex;
		var endIndex;
		if(marginLeft<3){
			startIndex=1;
		}else if(marginRight<3){
			startIndex=pageNum-6;
		}else{
			startIndex=pageIndex-3;
		}
		
		if(startIndex==2){
			_html+='<a href="javascript:'+functionName+'(1)">1</a>';
			_html+='...';
		}
		
		if(startIndex>2){
			_html+='<a href="javascript:'+functionName+'(1)">1</a>';
			_html+='<a href="javascript:'+functionName+'(2)">2</a>';
			_html+='...';
		}
		
		for(var i=startIndex;i<startIndex+7;i++){
			if(i==pageIndex){
				_html+='<span>'+i+'</span>';
			}else{
				_html+='<a href="javascript:'+functionName+'('+i+')">'+i+'</a>';
			}
		}
		
		endIndex=startIndex+6;
		if(endIndex<pageNum){
			_html+='...';
		}
	}
	
	var nextField;
	if(next>=1 && next<=pageNum){
		nextField='<a href="javascript:'+functionName+'('+next+')">下一页</a>';
	}else{
		nextField='<a href="javascript:void(0)">下一页</a>';
	}
	_html+=nextField;
	$('#'+btnId).html(_html);
}
function getInviteReward(){
	$.ajax({
		url : '/v2/register/invite_reward.jso', 
		type : 'post',
		dataType : 'json',
		success : function(result) {
			var firstInvestReward = result.firstInvestReward==null ? 0 : result.firstInvestReward;
			var vipOpenReward = result.vipOpenReward==null ? 0 : result.vipOpenReward;
			var vipUpgradeReward = result.vipUpgradeReward==null ? 0 : result.vipUpgradeReward;
			var totalReward = XR.Tool.toCentHalfUp(XR.Tool.toCentHalfUp(firstInvestReward)+XR.Tool.toCentHalfUp(vipOpenReward)+XR.Tool.toCentHalfUp(vipUpgradeReward));
			$("#firstInvestReward").html(XR.Tool.toCentHalfUp(firstInvestReward));
			$("#vipOpenReward").html(XR.Tool.toCentHalfUp(vipOpenReward));
			$("#vipUpgradeReward").html(XR.Tool.toCentHalfUp(vipUpgradeReward));
			$("#totalReward").html(XR.Tool.toCentHalfUp(totalReward));
		}
	});  
}

function getInviteCount(){
	$.ajax({
		url : '/v2/register/invite_count.jso', 
		type : 'post',
		dataType : 'json',
		success : function(result) {

			$("#investCount").html(result.investCount);
			$("#notInvestCount").html(result.notInvestCount);
			$("#totalCount").html(result.investCount+result.notInvestCount);
		}
	});  
}

function utf16to8(str) { //转码 
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}
