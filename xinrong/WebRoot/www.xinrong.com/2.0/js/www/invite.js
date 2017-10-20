

(function(){
	var inviter={
		userName:'',
		totalProfit:0,
		shareContent:'',
		cont:'#信融财富#我发现了一个不错的投融资服务平台，投资所得积分还可用来抽奖，奖品有iPhone6s、1888元礼金，888元礼金等，你也一起来投资换积分抽奖吧！',
		
		init:function()
		{
			$.ajax({
					url:'/v2/login/in_session_data.jso',
					type:'GET' ,
					dataType:'json',
					success:function (result) {
						if(result.state==0){
							inviter.getBaseInfo();
							
						}else{
							AA.RapidLogin.popup();
							return;
						}
					}
				});
		},
		getBaseInfo:function()
		{
			$.ajax({
					url : '/v2/xincunbao/get_index_info.jso', 
					type : 'post',
					dataType : 'json',
					success : function(result) {
						inviter.userName=result.name;
						inviter.getReportInfo();
			
					}
				});    
		},
		getReportInfo:function(){

			$.ajax({
			 		url : '/v2/transaction/total_transaction_money.jso',         
			 		type : 'post', 
			 		dataType : 'json', 
			 		success : function(data) {  
			 			var acc_all_total = data.accAllTotal;
			 			var acc_all_retain_total=parseFloat(data.accEarnBackTotal)+parseFloat(data.accEarnTotal);
						inviter.totalProfit=acc_all_retain_total;
						inviter.initShareContent();//初始化分享url
					}
			})
		},
		base_url:function()
		{
			var _urlstr = window.location.href;
				if (_urlstr.indexOf("?") > -1) {
					_urlstr = _urlstr.substring(0, _urlstr.lastIndexOf("?"));
				}
				_urlstr = _urlstr.substring(0, _urlstr.lastIndexOf("/"));
				_urlstr = _urlstr.substring(0, _urlstr.lastIndexOf("/"));
			return encodeURIComponent( _urlstr+"/action/reg_invite");
		},

		initShareContent:function()
		{

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
		
			var noEncodeUserName=inviter.userName;
			var encodedUserName = encodeURI(inviter.userName);
			var profitOverTB=parseInt(inviter.totalProfit/100000000);
			var profitOverTM=parseInt((inviter.totalProfit-parseInt(inviter.totalProfit/100000000)*100000000)/10000);
			var profitStr;
			if(profitOverTB>0)
				profitStr=profitOverTB+'亿'+profitOverTM+'万';
			else
				profitStr=profitOverTM+'万';
			var shareContent ='#信融财富#已运营'+year+'年'+day+'天，为投资人赚取'+profitStr+'元收益。我在这里投资赚收益，邀您一起加入，让财富稳健增长。新用户注册认证还送20元投资礼金哦！ https://www.xinrong.com/2.0/views/account/register4.0.shtml?inviter='+encodedUserName;
			//var shareContent = '#信融财富#广东互联网金融协会副会长单位，预期年化收益率可达16.8%，第三方担保、风险准备金多重保障，新用户注册认证即送20元投资礼金！ https://www.xinrong.com/2.0/views/account/register3.0.shtml?inviter='+userName;
			$("#cont").text(inviter.cont);
			$("#share_cont").text(shareContent);

			$("#invite-content").text(shareContent);
		$("#invite-content-weibo").text(shareContent);
			$("#share_sina_weibo").attr('href',
		"http://service.weibo.com/share/share.php?url="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));

			$("#share_tencent_weibo").attr('href',
		"http://share.v.t.qq.com/index.php?c=share&a=index&url="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));

			$("#share_tencent_qqzone").attr('href',
		"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));

			$("#share_renren").attr('href',
		"http://widget.renren.com/dialog/share?resourceUrl="+inviter.base_url()+"&srcUrl="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));


			$("#share_tencent_friend").attr('href',
		"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));

			$("#share_douban").attr('href',
		"http://shuo.douban.com/!service/share?href="+inviter.base_url()+"&name="+encodeURIComponent(shareContent));
			$("#share_sohu").attr('href',
		"http://t.sohu.com/third/post.jsp?url="+inviter.base_url()+"&title="+encodeURIComponent(shareContent));

			$("#share_netease").attr('href',
		"http://t.163.com/article/user/checkLogin.do?info="+encodeURIComponent(shareContent));
		}
	}
	inviter.init();
	
})();




