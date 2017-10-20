
(function(){
	var inviter={
		userName:'',
		isCheckedIdentification:0,
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
						inviter.isCheckedIdentification=result.isCheckedIdentification;
						inviter.initShareContent();

			
					}
				});    
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

			var shareContent =inviter.cont;
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
	inviterGlobal = inviter;
})();








