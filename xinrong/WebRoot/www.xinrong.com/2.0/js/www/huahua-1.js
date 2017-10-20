(function(){
	$this = {
		initShareInfo:function(){
				if($this.is_weixin){
						if(typeof wxJsSDK=='object')
						{
							shareData={
								title_friend:"信融花花，品牌全面升级！",
								title_circle:"信融花花，品牌全面升级！信融花花纯信用借款 信用当钱花！",
								desc:"信融花花纯信用借款 信用当钱花！",
								link:"https://www.xinrong.com/2.0/action/xr_huahua/huahua.shtml",
								share_circle_imageUrl:"https://www.xinrong.com/2.0/images/xinronghuahua.jpg",
								share_friend_imageUrl:"https://www.xinrong.com/2.0/images/xinronghuahua.jpg",
							}
							wxJsSDK.configWithShareInfo(shareData);
						}
				}
		},
			
	is_weixin:function (){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	 	} else {
			return false;
		}
	},
}
	$(function(){
		 $this.initShareInfo();    
	 });
})();

