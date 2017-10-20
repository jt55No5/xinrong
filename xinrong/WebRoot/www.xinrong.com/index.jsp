<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="width: 100%;min-width: 1100px">
<head>
	
<link type="text/css" rel="stylesheet" href="localcss/indexcss.css" />	

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=1100"/> 
<meta name="format-detection" content="telephone=no" />
<title>信融财富-上市公司战略投资，P2P网贷专业互联网投资理财平台</title>
<meta name="Description" content="信融财富官网是一个在线融资理财,P2P网络借贷，投资理财平台。在线投资理财者可通过信融财富获得投资理财服务,该服务以坚守投资理财者利益为出发点,为互联网投资理财者提供p2p网络理财融资环境.">
<meta name="Keywords" content="网贷,p2p理财,p2p网贷,网贷平台,p2p网络借贷,理财,投资,投资网,理财网,投资理财,网络投资,网上理财,安全理财,在线理财,信融财富官网">
<meta property="qc:admins" content="367124461076016276763757" />
<meta name="sogou_site_verification" content="I4VH314X14"/>
<link href="2.0/css/basic.css" tppabs="https://www.xinrong.com/2.0/css/basic.css" rel="stylesheet" type="text/css" />
<link href="2.0/css/banner.css" tppabs="https://www.xi nrong.com/2.0/css/banner.css" rel="stylesheet" type="text/css" />
<link href="2.0/css/index_new.css" tppabs="https://www.xinrong.com/2.0/css/index_new.css" rel="stylesheet" type="text/css" />
<link href="2.0/css/dialog.css" tppabs="https://www.xinrong.com/2.0/css/dialog.css" rel="stylesheet" type="text/css" />
<link href="2.0/css/global.css" tppabs="https://www.xinrong.com/2.0/css/global.css" rel="stylesheet" type="text/css" />
<link href="2.0/css/invest-window.css" tppabs="https://www.xinrong.com/2.0/css/invest-window.css" rel="stylesheet" type="text/css" />
<!--<script>if(top.location!=self.location){top.location.replace(self.location);}</script>
<script>if('https:' != location.protocol){location = location.href.replace('http:','https:');}</script>-->
<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true);</script><![endif]-->
<!-- <script type="text/javascript" src="/2.0/js/jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="2.0/js/jquery-1.4.2.js" tppabs="https://www.xinrong.com/2.0/js/jquery-1.4.2.js"></script> -->
<script type="text/javascript" src="2.0/js/jquery-1.10.2.js" tppabs="https://www.xinrong.com/2.0/js/jquery-1.10.2.js"></script>
<script type="text/javascript">
var G_ENV_VAR = {
	WWW:'',
	STATIC:'',
	BBS:'',
	UID:'',
	UNAME:'',
	MSG_NUM:'',
	VIP: '0',
	IS_CHECKED_EMAIL:'false',
	IS_CHECKED_MOBILE: 'false',
	HAS_TRADE_PASSWORD: 'false',
	IS_CHECKED_IDENTIFICATION: 'false',
	IS_CHECKED_BANKCARD: 'false'
};
</script>
<script type="text/javascript" src="2.0/js/tytabs.jquery.new.js" tppabs="https://www.xinrong.com/2.0/js/tytabs.jquery.new.js"></script>
<script type="text/javascript" src="2.0/js/jquery.SuperSlide.js" tppabs="https://www.xinrong.com/2.0/js/jquery.SuperSlide.js"></script>
<script type="text/javascript" src="2.0/js/jquery.featureCarousel.js" tppabs="https://www.xinrong.com/2.0/js/jquery.featureCarousel.js"></script>
<script type="text/javascript" src="2.0/js/vendor/animateNumber/jquery.animateNumber.js" tppabs="https://www.xinrong.com/2.0/js/vendor/animateNumber/jquery.animateNumber.js"></script>
<script type="text/javascript" src="2.0/js/vendor/echarts/build/dist/echarts.js" tppabs="https://www.xinrong.com/2.0/js/vendor/echarts/build/dist/echarts.js"></script>
<script type="text/javascript" src="s/vendor/artDialog/jquery.artDialog.js" tppabs="https://www.xinrong.com/s/vendor/artDialog/jquery.artDialog.js"></script>
<script type="text/javascript" src="s/vendor/artDialog/dialog_ex.js" tppabs="https://www.xinrong.com/s/vendor/artDialog/dialog_ex.js"></script>
<script type="text/javascript" src="2.0/js/h-proanimate.js" tppabs="https://www.xinrong.com/2.0/js/h-proanimate.js"></script>
<script type="text/javascript" src="2.0/js/date.js" tppabs="https://www.xinrong.com/2.0/js/date.js"></script>
<script type="text/javascript" src="s/js/AA.base-min.js" tppabs="https://www.xinrong.com/s/js/AA.base-min.js"></script>
<script type="text/javascript" src="2.0/js/XR.base.js" tppabs="https://www.xinrong.com/2.0/js/XR.base.js"></script>
<script type="text/javascript" src="2.0/js/mod/login.js" tppabs="https://www.xinrong.com/2.0/js/mod/login.js"></script>
<script type="text/javascript" src="2.0/js/mod/do_invest.js" tppabs="https://www.xinrong.com/2.0/js/mod/do_invest.js"></script>
<script type="text/javascript" src="2.0/js/mod/fare_recharge.js" tppabs="https://www.xinrong.com/2.0/js/mod/fare_recharge.js"></script>
<script type="text/javascript" src="webapp2.0/js/api/escrow.jx.js" tppabs="https://www.xinrong.com/webapp2.0/js/api/escrow.jx.js"></script>
</head>
<body>
<!--header-->
<script type="text/javascript">
$(function(){
    // 固定导航
	$(document).scroll(function(){
		t=$(document).scrollTop();
		if(t>=0){
			$("#hmenu_nav").removeClass("h_por").css("top","78px;");
			}
		if(t>78){
			$("#hmenu_nav").addClass("h_por").css("top","0px;");
			}
		});
});
</script>
<div class="hmenu_nav">
  <div class="main PositionR">
    <div class="logo left PositionR"><a href="index.htm" tppabs="https://www.xinrong.com/index"><img src="2.0/images/logo.gif" tppabs="https://www.xinrong.com/2.0/images/logo.gif" /></a><a href="2.0/views/about/shareholder.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/shareholder.shtml" class="logo_font">上市公司系</a></div>
    <div class="right top_my"><a href="2.0/views/account/account_index.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/account_index.shtml" class="f-my" id="nav_my">我的账户</a> <a id="top_exit" href="javascript:AA.RapidLogin.loginout();" class="f_exit" style="display:none;">退出</a> <span class="h-login-reg h-login" style="display: none;"><i></i><a href="2.0/login2.0.html" tppabs="https://www.xinrong.com/2.0/login2.0.html" class="flogin">登录</a><a href="2.0/views/account/register4.0.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/register4.0.shtml" class="freg">注册</a></span></div>
    <div class="clear"></div>
  </div>
  <div class="h_nav" id="hmenu_nav">
    <div class="main PositionR">
      <ul>
        <li><a href="index.htm" tppabs="https://www.xinrong.com/index.shtml" id="nav_index">首页</a></li>
        <li><a href="invest.shtml.htm" tppabs="https://www.xinrong.com/invest.shtml" id="nav_invest">投资<i class="arrow"></i></a>
        <ul>
        <li><a href="2.0/calculator.html#finvest" tppabs="https://www.xinrong.com/2.0/calculator.html" target="_blank">投资计算器</a></li>
        </ul>
        </li>
        <li><a href="2.0/action/xr_huahua/huahua.shtml.htm" tppabs="https://www.xinrong.com/2.0/action/xr_huahua/huahua.shtml" id="nav_huahua">信融花花<i class="arrow"></i><b class="hh_icon"><img src="2.0/images/hh_icon.png" tppabs="https://www.xinrong.com/2.0/images/hh_icon.png" /></b></a>
          <ul>
          	<li><a href="2.0/action/xr_huahua/huahua.shtml.htm" tppabs="https://www.xinrong.com/2.0/action/xr_huahua/huahua.shtml" target="_blank">我要借款</a></li>
            <li><a href="2.0/calculator.html" tppabs="https://www.xinrong.com/2.0/calculator.html" target="_blank">借款计算器</a></li>
          </ul>
        </li>
        <li><a href="2.0/views/about/invest_help.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/invest_help.shtml" id="nav_invest_help">新手指引<i class="arrow"></i></a>
          <ul>
          	<li><a href="2.0/views/about/invest_help.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/invest_help.shtml" target="_blank">投资帮助</a></li>
          	<li><a href="2.0/views/about/risk.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/risk.shtml" target="_blank">风险控制</a></li>
            <li><a href="2.0/views/about/laws_regulations.shtml.htm#navLaws" tppabs="https://www.xinrong.com/2.0/views/about/laws_regulations.shtml#navLaws" target="_blank">法律法规</a></li>
          </ul>
        </li>
        <li><a href="2.0/views/about/about.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/about.shtml" id="nav_about">信息披露<i class="arrow"></i></a>
          <ul>
            <li><a href="2.0/views/about/about.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/about.shtml" id="nav_about_index">公司简介</a></li>
            <li><a href="2.0/views/about/team.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/team.shtml">团队介绍</a></li>
            <li><a href="2.0/views/about/service_data.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/service_data.shtml">运营数据</a></li>
            <li><a href="2.0/views/about/partner.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/partner.shtml">合作机构</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav_r"><a href="2.0/vip.html" tppabs="https://www.xinrong.com/2.0/vip.html" id="nav_vip">VIP特权</a></div>
    </div>
  </div>
</div>
<!--nav-->
<style type="text/css">
.fengxian_dialog{ width:469px; height:315px; background:#ffffff; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px;}
.fengxian_dialog h1{ height:50px; line-height:50px; background:#ececec; color:#2c2c2c; font-size:18px; font-weight:normal; padding:0 10px; border-top-left-radius:5px; border-top-right-radius:5px; position:relative;}
.fengxian_dialog h1 .close{ position:absolute; right:10px; top:0px; font-family:"宋体"; font-size:30px; color:#aeaeae; font-weight:normal; text-decoration:none;}
.fengxian_dialog .fx_font{ padding:20px 30px; font-size:18px; line-height:30px;}
.fengxian_dialog .fx_sub{ text-align:center; line-height:36px;}
.fengxian_dialog .fx_sub .sub02{ font-size:18px; width:166px; height:45px; line-height:45px;}
.fengxian_dialog .fx_sub p a{ color:#a1a1a1; font-size:15px;}
</style>
<script type="text/javascript" src="2.0/js/wbox.js" tppabs="https://www.xinrong.com/2.0/js/wbox.js"></script>
<link rel="stylesheet" href="2.0/css/dialog-wbox.css" tppabs="https://www.xinrong.com/2.0/css/dialog-wbox.css">
<!--风险测评-->
<div id="fxpc_dialog" style="display: none;">
  <div class="fengxian_dialog">
    <h1>温馨提示<a href="javascript:void(0)" class="close" id="close">×</a></h1>
    <div class="fx_font"> 尊敬的用户，为了帮助您更好的了解自己的风险承受能力，请您花30秒的时间完成10道风险测试题。 网贷非存款，投资需谨慎，是否立即进行风险测评？ </div>
    <div class="fx_sub"><a href="javascript:void(0)" class="sub02" id="goToAnswer">立即测评</a>
      <p><a href="javascript:void(0)" id="afterAnswer">稍后再说</a></p>
    </div>
  </div>
</div>
<script>
	
	(function() {
	
	var channel=location.href;

	var index=channel.lastIndexOf("/");
	
	var index1=channel.lastIndexOf(".");

	if(index>0){
		channel=channel.substring(index+1,index1);

		if(channel==".com/"||channel==".com"){
			$('#nav_index').parent().attr("class","cur");
		}else if(channel=="xincunbao"){
			$('#nav_my').addClass("cur");
		}else if(channel=="invest_help"||channel=="risk"||channel=="security"){
			$('#nav_invest_help').parent().attr("class","cur");			
		}else if(channel=="help"||channel=="guide1"||channel=="guide2"||channel=="guide3"||channel=="guide4"){
			$('#nav_invest_help').parent().attr("class","cur");
			$('#nav_help').attr("class","cur");		
		}else if(channel=="xr_call"){
			$('#nav_duoduo').parent().attr("class","cur");
		}else if(channel=="vip"){
			$('#nav_vip').attr("class","cur");
		}else{
			$('#nav_'+channel).parent().attr("class","cur");	
		}
		
	}
})();

$(document).ready(function(){
	$(".h-login-reg a").mouseenter(function(){
		if($(this).is(".flogin"))
			{
				$(".h-login-reg").addClass("h-login");
				$(".h-login-reg").removeClass("h-reg");
			}
			else{
				$(".h-login-reg").addClass("h-reg");
				$(".h-login-reg").removeClass("h-login");
				}
		});
	var isAnswered=sessionStorage.getItem('afterAnswer')||null;
	if (location.href.indexOf('goAnswer=true') < 0) {
		if (isAnswered =='null') {
			$.ajax({
				url:'v2/login/in_session_data.jso'/*tpa=https://www.xinrong.com/v2/login/in_session_data.jso*/,
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
					if(result.state==0){
						if (document.cookie.substring(document.cookie.indexOf("isAnswer=")+9,document.cookie.indexOf("isAnswer=")+10) =="N") {
							showFXPCdialog();
							
							if (location.href.indexOf("account_settings.shtml")>-1) {
								$('#wBox #goToAnswer').unbind('click').bind('click',function(){
						        	$('#tp2').click();
						        })
							}
						}
					}
				}
			});
		}
	}
	

	function showFXPCdialog(){
		wBox = $('#fxpc_dialog').wBox({
                noTitle:true,
                top:5,
                html: $('#fxpc_dialog').html()
            });
        wBox.showBox(); 
        $('#wBox #afterAnswer').bind('click',function(){
        	sessionStorage.setItem('afterAnswer',true);
        	wBox.close();
        });
        $('#wBox #goToAnswer').unbind('click').bind('click',function(){
        	location.href="2.0/views/account/account_settings.shtml-goAnswer=true.htm"/*tpa=https://www.xinrong.com/2.0/views/account/account_settings.shtml?goAnswer=true*/;
        });
        $('#wBox #close').unbind('click').bind('click',function(){
        	sessionStorage.setItem('afterAnswer',true);
        	wBox.close();
        })

	}
});

</script> 

<!--header end-->
<!--banner-->
<div class="focus" id="focus">
  <div class="login_box">
    <div class="login login_one">
      <p>历史年化收益率</p>
      <h2>6%~13.8%</h2>
      <h3><span>100元</span> 起投，符合条件可转让</h3>
      <p class="f-tips">注册认证即<span class="orange">送20元</span></p>
      <a href="2.0/views/account/register4.0.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/register4.0.shtml" class="sub02">立即注册</a>
      <p class="t-r">已有账号? <a href="javascript:void(0)" class="blue" id="h-login">立即登录</a></p>
      <p class="t-tel">服务热线：400-777-9888</p>
    </div>
    <!--1 end-->
    <div class="login login_two" style="display:none;">
      <h1><span>登录</span> | <a href="2.0/views/account/register4.0.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/register4.0.shtml" target="_blank">注册</a></h1>
      <input id="index_username" name="index_username" type="text" class="h-input" placeholder="账户名 / Email / 手机号" />
	  <input type="text" style="display:none;" />
      <input id="index_password" name="index_password" type="password" class="h-input" placeholder="密码" />
      <input id="index_captcha" name="index_captcha" type="text" class="h-input inp_w" style="display:none;" placeholder="验证码" /> <span id="index_captcha_img_view" class="p_img" style="display:none;"><img id="index_captcha_img" src="" width="116" height="38" /></span>
      <input id="index_captcha_seed" name="index_captcha_seed" type="hidden"  value=""/>
      <p id="index_error" class="error"></p>
      <a id="index_login_btn" href="javascript:void(0)" class="sub02">登录</a>
      <p class="t-f"><a href="2.0/views/account/back_password.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/back_password.shtml" class="blue left">忘记账号 / 密码?</a> <a href="javascript:AA.RapidLogin.qqClick();" class="right"><img src="2.0/images/Connect_logo_7.png" tppabs="https://www.xinrong.com/2.0/images/Connect_logo_7.png" /></a></p>
    </div>
    <!--2 end-->
    <!--<div class="login login-three" style="display:none;">
      <h3>欢迎使用信融财富</h3>
      <div class="t_font">
        <p>您当前的账户为：<span class="orange"><b id="index_username_show">--</b></span></p>
        <p>祝您投资愉快！</p>
      </div>
      <input name="" onclick="javascript:location.href='/2.0/views/account/account_index.shtml'" type="button" class="sub02" value="我的账户" />
      <input id="index_vip_btn" name="index_vip_btn" onclick="javascript:location.href='/vip'" type="button" class="sub03" style="display:none;" value="申请VIP" />
    </div>-->
    <!--3 end-->
    <div class="login login-name" style="display:none;">
      <h3>您好 , 欢迎使用信融财富!</h3>
      <div class="t_font">
        <!--<p id="index_no_vip_btn">您是普通用户  <a href="/vip" class="f-color">立即开通VIP</a></p>
        <p id="index_vip_btn" class="f-color" style="display:none;">您是尊贵的VIP<font id="index_vip_show">--</font>会员</p>-->
        <p>当前账户：<b id="index_username_show">--</b> <span id="index_no_vip_btn"><a href="2.0/vip.html" tppabs="https://www.xinrong.com/2.0/vip.html" class="f-color">开通VIP</a></span></p>
      </div>
      <div class="f-sdata">累计收益(元)<p class="orange" id="earn_all">--</p></div>
      <input onclick="javascript:location.href='2.0/views/account/account_index.shtml.htm'/*tpa=https://www.xinrong.com/2.0/views/account/account_index.shtml*/" type="button" class="sub02" value="我的账户" />
    </div>

  </div>
  <!--login end-->
  <!--横幅大图片------------------------------------>
  <div id="focus_m" class="focus_m">
    <ul>
      <li class="li_148"><a href="javascript:;" tppabs="https://www.xinrong.com/2.0/action/xr_esw/esw_zt.shtml" hidefocus="true" target="_blank"></a></li>
    </ul>
  </div>
  <!--横幅大图片 结束------------------------------------>
  
</div>
<!--banner end-->
<div class="h-announcement">
	<div class="main PositionR" id="h_announcement"><span class="t-m"><img src="2.0/images/icon_03.png" tppabs="https://www.xinrong.com/2.0/images/icon_03.png" /></span>
		<ul></ul>
    	<a href="2.0/views/about/xr_announcement.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/xr_announcement.shtml" class="more" target="_blank">更多></a>
	</div>
</div>
<div class="h_s_data">
  <div class="main">
    <ul>
      <li><font id="year">--</font><span class="f_size">年</span><font id="day">--</font><span class="f_size">天</span><font id="hours">--</font><span class="f_size">时</span><font id="minutes">--</font><span class="f_size">分</span><font id="seconds">--</font><span class="f_size">秒</span>
        <h2>已运营时间</h2>
      </li>
      <li><label id="income_money_1">00<span class="f_size">亿</span>00<span class="f_size">万</span>00<span class="f_size">元</span></label>
        <h2>为投资人赚取的收益</h2>
      </li>
      <li><label id="yesTotal_money_1">00<span class="f_size">亿</span>00<span class="f_size">万</span>00<span class="f_size">元</span></label>
        <h2>昨日成交</h2>
      </li>
      <li><label id="all_money_1">00<span class="f_size">亿</span>00<span class="f_size">万</span>00<span class="f_size">元</span></label>
        <h2>累计交易金额</h2>
      </li>
    </ul>
    <div class="clear"></div>
    <p class="more"><i class="AllIcon"></i><a href="2.0/views/about/service_data.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/service_data.shtml" target="_blank">查看更多统计数据></a></p>
  </div>
</div>
<!--数据 end-->
<div class="h_product">
  <h1 class="main h_title"><span>我们的产品
    <p>PRODUCTS</p>
    </span></h1>
    <div class="black15"></div>
  <div class="h_pro_xcb main">
    <div class="xcb_left left"> <span class="l_pic">
      <h2>信存宝<span>®</span></h2>
      <p>1分起投<br />
        随存随转</p>
      </span> </div>
    <div class="xcb_right right">
      <h2>当日存入，D+2收益到账</h2>
      <div id="xcb_data" class="xcb_data left">
        <h3>过去7日年化收益率（%）</h3>
        <span class="data_box" id="xcbDataView" style="width: 377px; height: 164px;"></span> </div>
      <div id="zhineng" class="xcb_font right">
        <h3>智能复投工具，账户余额不再站岗！</h3>
        <p><i class="AllIcon icon01"></i>按日计息 <i class="AllIcon icon02"></i>收益复投 <i class="AllIcon icon03"></i>免费存转</p>
        <span class="xcb_sub"><a id="index_xcb_cr" href="javascript:void(0)" class="sub02">立即存入</a></span> </div>
    </div>
    <div class="clear"></div>
  </div>
  <!--信存宝 end-->
  <div class="black25"></div>
  <div class="black25"></div>
  <div class="h_prolist main">
     <div class="h_p_left left PositionR"><span class="double" style="display:none;"><a href="2.0/action/xr_double/xr_depository.shtml.htm" tppabs="https://www.xinrong.com/2.0/action/xr_double/xr_depository.shtml" target="_blank" style="display: inline-block;"><img src="2.0/images/double01.png" tppabs="https://www.xinrong.com/2.0/images/double01.png" /></a></span> <span class="l_pic">
      <h2>信·项目</h2>
      <p>产品丰富<br />
        风控严谨<br />
        信息透明</p>
      </span>
      <div id="countDownView" class="p_time" style="display: none;"><i class="AllIcon"></i><span><b id="ksqt" class="c-f">00:00</b>开始抢投<br />
        <b id="countDown_hours" class="c-f">00</b>时<b id="countDown_minutes" class="c-f">00</b>分<b id="countDown_seconds" class="c-f">00</b>秒</span>
      	<input type="hidden" value="" id="server_time">
      </div>
    </div>
    <div id="tabsholder" class="h_p_right left">
      <ul class="tabs">
        <li id="tab1">品牌专区<i>|</i></li>
        <li id="tab2">信·优企贷等<i>|</i></li>
        <li id="tab3">消费贷</li>
        <a href="invest.shtml.htm" tppabs="https://www.xinrong.com/invest.shtml" class="more" target="_blank">更多项目></a>
      </ul>
      <div class="contents">
        <div id="content1" class="tabscontent">
            <div id="botton_scroll_1">
	            <div id="loanList1">
	            	<dl onclick="window.open('2.0/detail.shtml.htm')" style="overflow: hidden; float: left; width: 277px; height: 355px;">
	            		<dt>									
	            			<span class="p_day">1<span>月</span></span>
	            			<h2>9<span>%</span><span class="f-raise">+<b>1.20%</b></span></h2><p>预期年化收益率</p>
	            		</dt>								
	            		<dd>									
	            			<p>剩余可投：<span class="orange">3,000.00元</span></p>
	            			<p>品·明特-170920系列之0451</p>
	            			<p class="p_pic"><a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>&nbsp;<i class="jiang">奖</i>&nbsp;</p>
	            			<span class="t-f">100元起投<p>等额本息</p></span>
	            			<a href="javascript:void(0)" methodhref="do_invest_step_one(480608,'1<span>月</span>','品·明特-170920系列之0451',0,1,'DJ','9','0.10','0')" class="sub02 invest_btn">立即投资</a></dd>
	            	</dl>
	            	<dl onclick="window.open('2.0/detail.shtml.htm')" style="overflow: hidden; float: left; width: 277px; height: 355px;">								<dt>									<span class="p_day">1<span>月</span></span>									<h2>9<span>%</span><span class="f-raise">+<b>1.20%</b></span></h2><p>预期年化收益率</p>								</dt>								<dd>									<p>剩余可投：<span class="orange">1,500.00元</span></p>									<p>品·明特-170920系列之0452</p>									<p class="p_pic"><a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>&nbsp;<i class="jiang">奖</i>&nbsp;</p>									<span class="t-f">100元起投<p>等额本息</p></span>									<a href="javascript:void(0)" methodhref="do_invest_step_one(480609,'1<span>月</span>','品·明特-170920系列之0452',0,1,'DJ','9','0.10','0')" class="sub02 invest_btn">立即投资</a>								</dd>							 </dl>
	            	<dl onclick="window.open('2.0/detail.shtml.htm')" style="overflow: hidden; float: left; width: 277px; height: 355px;">								<dt>									<span class="p_day">1<span>月</span></span>									<h2>9<span>%</span><span class="f-raise">+<b>1.20%</b></span></h2><p>预期年化收益率</p>								</dt>								<dd>									<p>剩余可投：<span class="orange">2,000.00元</span></p>									<p>品·明特-170920系列之0453</p>									<p class="p_pic"><a href="/about/partner/2" target="_blank"><i class="danbao" title="第三方公司本息担保">担保</i></a>&nbsp;<i class="jiang">奖</i>&nbsp;</p>									<span class="t-f">100元起投<p>等额本息</p></span>									<a href="javascript:void(0)" methodhref="do_invest_step_one(480610,'1<span>月</span>','品·明特-170920系列之0453',0,1,'DJ','9','0.10','0')" class="sub02 invest_btn">立即投资</a>								</dd>							 </dl>
	            </div>
			</div>
	        <div class="clear"></div>
        </div>
        <div id="content2" class="tabscontent">
        	<div id="botton_scroll_2">
	        	<div id="loanList2">
		        </div>
		        <a href="javascript:void(0)" class="px_prev px_prev_2"><img src="2.0/images/hp-left.png" tppabs="https://www.xinrong.com/2.0/images/hp-left.png" width="40" /></a> <a href="javascript:void(0)" class="px_next px_next_2"><img src="2.0/images/hp-right.png" tppabs="https://www.xinrong.com/2.0/images/hp-right.png" width="40" /></a>
	        </div>
	        <div class="clear"></div>
        </div>
        <div id="content3" class="tabscontent">
        	<div id="botton_scroll_3">
        		<div id="loanList3">
	        	</div>
	        	<a href="javascript:void(0)" class="px_prev px_prev_3"><img src="2.0/images/hp-left.png" tppabs="https://www.xinrong.com/2.0/images/hp-left.png" width="40" /></a> <a href="javascript:void(0)" class="px_next px_next_3"><img src="2.0/images/hp-right.png" tppabs="https://www.xinrong.com/2.0/images/hp-right.png" width="40" /></a>
	        </div>
	        <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
  <p class="t-msg">项目预期收益测算依据和方式见销售文件，测算收益和年化收益不等于实际收益</p>
</div>
<!--产品 end-->

<div class="h_voice">
<div class="main">
<div class="h_partner main">
<h1 class="h_title"><span>合作机构</span><p>排名不分先后</p></h1>
<ul>
<li><img src="2.0/images/about/partner/rong360.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/rong360.jpg" height="40" /></li>
<li class="wp"><img src="2.0/images/about/partner/huazhen.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/huazhen.jpg" height="40" /></li>
<li><img src="2.0/images/about/partner/fengchelicai.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/fengchelicai.jpg" height="40" /></li>
<li><img src="2.0/images/about/partner/fenqix.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/fenqix.jpg" height="40" /></li>
<li><img src="2.0/images/about/partner/touzhijia.png" tppabs="https://www.xinrong.com/2.0/images/about/partner/touzhijia.png" height="40" /></li>
<li class="wp"><img src="2.0/images/about/partner/zhima01.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/zhima01.jpg" height="40" /></li>
<li><img src="2.0/images/about/partner/lsign.png" tppabs="https://www.xinrong.com/2.0/images/about/partner/lsign.png" height="40" /></li>
<li><img src="2.0/images/about/partner/ebaoquan.png" tppabs="https://www.xinrong.com/2.0/images/about/partner/ebaoquan.png" height="40" /></li>
<li><img src="2.0/images/about/partner/lianjian.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/lianjian.jpg" height="40" /></li>
<li class="wp"><img src="2.0/images/about/partner/tongdun.png" tppabs="https://www.xinrong.com/2.0/images/about/partner/tongdun.png" height="40" /></li>
<li><img src="2.0/images/about/partner/tenpay.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/tenpay.jpg" height="40" /></li>
<li><img src="2.0/images/about/partner/huawei.jpg" tppabs="https://www.xinrong.com/2.0/images/about/partner/huawei.jpg" height="40" /></li>
</ul>
<div class="black20"></div>
</div>
<!--合作机构 end-->
<!--footer-->
<div class="footer_box">
<div class="footer_fnav">
<div class="main">
<div class="footer_about left">
<ul>
<li><h2><a href="2.0/views/about/about.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/about.shtml" target="_blank">关于我们</a></h2><p><a href="2.0/views/about/team.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/team.shtml" target="_blank">团队介绍</a></p><p><a href="2.0/views/about/xr_history.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/xr_history.shtml" target="_blank">发展历程</a></p><p><a href="2.0/views/about/xr_credit.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/xr_credit.shtml" target="_blank">资质荣誉</a></p><p><a href="2.0/views/about/partner.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/partner.shtml" target="_blank">合作机构</a></p></li>
<li><h2><a href="2.0/views/about/help.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/help.shtml" target="_blank">帮助中心</a></h2><p><a href="2.0/views/about/guide/guide1.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/guide/guide1.shtml" target="_blank">新手指引</a></p><p><a href="2.0/views/about/help.shtml-tab=tab1.htm" tppabs="https://www.xinrong.com/2.0/views/about/help.shtml?tab=tab1" target="_blank">问题答疑</a></p><p><a href="2.0/views/about/help.shtml-tab=tab10.htm" tppabs="https://www.xinrong.com/2.0/views/about/help.shtml?tab=tab10" target="_blank">投资攻略</a></p><p><a href="javascript:if(confirm('http://bbs.xinrong.com/forum-49-1.html  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://bbs.xinrong.com/forum-49-1.html'" tppabs="http://bbs.xinrong.com/forum-49-1.html" target="_blank">意见反馈</a></p></li>
<li><h2><a href="2.0/views/about/about.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/about.shtml" target="_blank">信息中心</a></h2><p><a href="2.0/views/about/xr_announcement.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/xr_announcement.shtml" target="_blank">平台公告</a></p><p><a href="2.0/views/about/media_report.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/media_report.shtml" target="_blank">媒体报道</a></p><p><a href="2.0/views/about/activitysum.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/about/activitysum.shtml" target="_blank">信融点滴</a></p><p><a href="javascript:if(confirm('http://bbs.xinrong.com/forum.php  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://bbs.xinrong.com/forum.php'" tppabs="http://bbs.xinrong.com/forum.php" target="_blank">社 区</a></p></li>
<li><h2>产品体系</h2><p><a href="2.0/vip.html" tppabs="https://www.xinrong.com/2.0/vip.html" target="_blank">VIP特权</a></p><p><a href="action/jf.htm" tppabs="https://www.xinrong.com/action/jf" target="_blank">抽奖</a></p></li>
</ul>
</div>
<div class="footer_contact left">
<h2>网贷有风险    投资需谨慎</h2>
<h3><span ><i class="AllIcon"></i>400-777-9888</span></h3>
<p>周一至周五9:00 - 18:30</p>
<p class="gray">官方QQ群：167877489</p>
<div class="con_pic">
<ul>
<li class="fb01"><a href="javascript:void(0)"><i class="AllIcon icon01"></i></a>
<ul class="weix_box"><b></b><li><img src="s/img/w02.jpg" tppabs="https://www.xinrong.com/s/img/w02.jpg" width="100"><h4>关注服务号</h4></li><li><img src="s/img/w05.jpg" tppabs="https://www.xinrong.com/s/img/w05.jpg" width="100"><h4>关注订阅号</h4></li><li><img src="s/img/w06.jpg" tppabs="https://www.xinrong.com/s/img/w06.jpg" width="100"><h4>微信客服-小薇</h4></ul>
</li>
<li class="fb02"><a href="javascript:if(confirm('http://crm2.qq.com/page/portalpage/wpa.php?uin=4007779888&f=1&ty=1&aty=0&a=&from=5  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://crm2.qq.com/page/portalpage/wpa.php?uin=4007779888&f=1&ty=1&aty=0&a=&from=5'" tppabs="http://crm2.qq.com/page/portalpage/wpa.php?uin=4007779888&f=1&ty=1&aty=0&a=&from=5" title="在线咨询" target="_blank"><i class="AllIcon icon02"></i></a>
<ul class="weix_box qq_box">
<li><b></b><img src="2.0/images/qq.png" tppabs="https://www.xinrong.com/2.0/images/qq.png" width="120"><h4>QQ号：4007779888</h4></li>
</ul></li>
<li class="fb03"><a href="javascript:if(confirm('http://weibo.com/u/2719695463?profile_ftype=1&is_all=1  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://weibo.com/u/2719695463?profile_ftype=1&is_all=1#_0'" tppabs="http://weibo.com/u/2719695463?profile_ftype=1&is_all=1#_0" target="_blank" title="微博"><i class="AllIcon icon03"></i></a></li>
</ul>
</div>
</div>
<div class="footer_app right">
  <img src="s/img/w07.jpg" tppabs="https://www.xinrong.com/s/img/w07.jpg" width="122" class="bimg" /><h2>下载手机客户端<i class="AllIcon icon01"></i> <i class="AllIcon icon02"></i></h2> </div>
<div class="black10"></div>
</div>
</div><!--end-->
<div class="clear"></div>
<div class="footer_pic">
<ul>
<li><a target="_blank" href="javascript:if(confirm('http://szcert.ebs.org.cn/33a832e2-fa27-42e2-b593-f8eca324fd86  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://szcert.ebs.org.cn/33a832e2-fa27-42e2-b593-f8eca324fd86'" tppabs="http://szcert.ebs.org.cn/33a832e2-fa27-42e2-b593-f8eca324fd86" title="深圳市市场监督管理局企业主体身份公示"><i class="icon01"></i></a></li>
<li><a target="_blank" href="javascript:if(confirm('https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf%2Fsplash.fdf&sap=&dn=www.xinrong.com&zoneoff=&lang=zh_CN  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf%2Fsplash.fdf&sap=&dn=www.xinrong.com&zoneoff=&lang=zh_CN'" tppabs="https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf%2Fsplash.fdf&sap=&dn=www.xinrong.com&zoneoff=&lang=zh_CN" title="信融财富是中国首批引入VeriSign 256位SSL加密的融资理财平台。您的隐私及个人资料安全已受最高级别的保护。"><i class="icon03"></i></a></li>
<li><a target="_blank" href="javascript:if(confirm('http://www.itrust.org.cn/home/index/rz_certifi/wm/RZ2017082401  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.itrust.org.cn/home/index/rz_certifi/wm/RZ2017082401'" tppabs="http://www.itrust.org.cn/home/index/rz_certifi/wm/RZ2017082401" title="中国信用企业"><i class="icon02"></i></a></li>
<li><a target="_blank" href="javascript:if(confirm('https://search.szfw.org/cert/l/CX20140805008628008716  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://search.szfw.org/cert/l/CX20140805008628008716'" tppabs="https://search.szfw.org/cert/l/CX20140805008628008716" title="诚信网站"><i class="icon04"></i></a></li>
<li><a title="腾讯云安全认证"><i class="icon05"></i></a></li>
<li><a target="_blank" href="javascript:if(confirm('http://v.pinpaibao.com.cn/authenticate/cert/?site=www.xinrong.com&at=business  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://v.pinpaibao.com.cn/authenticate/cert/?site=www.xinrong.com&at=business'" tppabs="http://v.pinpaibao.com.cn/authenticate/cert/?site=www.xinrong.com&at=business" title="安全联盟认证网站"><i class="icon06"></i></a></li>
</ul>
</div>
<div class="clear"></div>
<div class="footerlink main">
<dl>
	<dt>友情链接:</dt>
		<dd>
			<span id="moretoggle">更多&gt;</span>
			<ul class="linklist">
        		<li><a href="javascript:if(confirm('http://www.gifa.com.cn/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.gifa.com.cn/'" tppabs="http://www.gifa.com.cn/" target="_blank" rel="nofollow">广东互联网金融协会</a> <a href="javascript:if(confirm('http://www.szifa.org.cn/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.szifa.org.cn/'" tppabs="http://www.szifa.org.cn/" target="_blank">深圳互金协会</a> <a href="javascript:if(confirm('https://www.tenpay.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://www.tenpay.com/'" tppabs="https://www.tenpay.com/" target="_blank" rel="nofollow">财付通</a> <a href="javascript:if(confirm('http://www.szhuazhen.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.szhuazhen.com/'" tppabs="http://www.szhuazhen.com/" target="_blank">华圳担保</a> <a href="javascript:if(confirm('http://www.wdzj.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.wdzj.com/'" tppabs="http://www.wdzj.com/" target="_blank">网贷之家</a> <a href="javascript:if(confirm('http://www.rong360.com/licai/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.rong360.com/licai/'" tppabs="http://www.rong360.com/licai/" target="_blank">融360理财</a> <a href="javascript:if(confirm('http://www.touzhijia.cn/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.touzhijia.cn/'" tppabs="http://www.touzhijia.cn/" target="_blank">投之家</a> <a href="javascript:if(confirm('http://www.xinrongcaifu.com/baoxian.html  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.xinrongcaifu.com/baoxian.html'" tppabs="http://www.xinrongcaifu.com/baoxian.html" target="_blank">保险购买</a> <a href="javascript:if(confirm('https://www.fengchelicai.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://www.fengchelicai.com/'" tppabs="https://www.fengchelicai.com/" target="_blank">风车理财</a> <a href="javascript:if(confirm('http://www.jpm.cn/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.jpm.cn/'" tppabs="http://www.jpm.cn/" target="_blank">金评媒</a> <a href="javascript:if(confirm('http://www.xeenho.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.xeenho.com/'" tppabs="http://www.xeenho.com/" target="_blank">星火钱包</a> <a href="javascript:if(confirm('https://www.fenqix.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://www.fenqix.com/'" tppabs="https://www.fenqix.com/" target="_blank">分期X</a> <a href="wen/index.htm" tppabs="https://www.xinrong.com/wen/" target="_blank">信融资讯</a> <a href="2.0/action/xr_huahua/huahua.shtml.htm" tppabs="https://www.xinrong.com/2.0/action/xr_huahua/huahua.shtml" target="_blank">信融花花</a></li>
        		<li style="" id="morehide"><a href="zixun/licaizixun/index.htm" tppabs="http://www.xinrong.com/zixun/licaizixun/" target="_blank">理财资讯</a> <a href="zixun/P2Pzixun/index.htm" tppabs="http://www.xinrong.com/zixun/P2Pzixun/" target="_blank">P2P网贷</a> <a href="zixun/rongzizixun/index.htm" tppabs="http://www.xinrong.com/zixun/rongzizixun/" target="_blank">如何融资</a> <a href="zixun/index.htm" tppabs="http://www.xinrong.com/zixun/" target="_blank">理财资讯</a> <a href="tags.html" tppabs="http://www.xinrong.com/tags.html" target="_blank">标签列表</a> <a href="javascript:if(confirm('http://home.sz.fang.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://home.sz.fang.com/'" tppabs="http://home.sz.fang.com/" target="_blank">深圳装修</a> <a href="javascript:if(confirm('http://www.kameng.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.kameng.com/'" tppabs="http://www.kameng.com/" target="_blank">信用卡卡盟</a> <a href="zixun/index.htm" tppabs="http://www.xinrong.com/zixun/" target="_blank">网贷资讯</a> <a href="zixun/index-1.htm" tppabs="http://www.xinrong.com/zixun/index.htm" target="_blank">网贷新闻</a> <a href="javascript:if(confirm('http://www.xinrongcaifu.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.xinrongcaifu.com/'" tppabs="http://www.xinrongcaifu.com/" target="_blank">信融财富综合</a> <a href="javascript:if(confirm('http://www.01caijing.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.01caijing.com/'" tppabs="http://www.01caijing.com/" target="_blank">零壹财经</a> <a href="javascript:if(confirm('http://www.cnbzol.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.cnbzol.com/'" tppabs="http://www.cnbzol.com/" target="_blank">巴中在线</a> <a href="javascript:if(confirm('http://www.jfz.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.jfz.com/'" tppabs="http://www.jfz.com/" target="_blank">金斧子财富</a>
                <p><a href="javascript:if(confirm('http://www.pcben.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.pcben.com/'" tppabs="http://www.pcben.com/" target="_blank">理财小知识</a> <a href="javascript:if(confirm('http://www.dncjw.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.dncjw.com/'" tppabs="http://www.dncjw.com/" target="_blank">股票入门</a> <a href="javascript:if(confirm('http://www.trustores.cn/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.trustores.cn/'" tppabs="http://www.trustores.cn/" target="_blank">资管产品</a> <a href="javascript:if(confirm('https://money.gucheng.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='https://money.gucheng.com/'" tppabs="https://money.gucheng.com/" target="_blank">股城理财</a> <a href="javascript:if(confirm('http://www.tayouqian.com/  \n\n���ļ��޷��� Teleport Ultra ����, ��Ϊ ����һ�����·���ⲿ������Ϊ�����ʼ��ַ�ĵ�ַ��  \n\n�����ڷ������ϴ���?'))window.location='http://www.tayouqian.com/'" tppabs="http://www.tayouqian.com/" target="_blank">他有钱</a> </p></li>
        	</ul>
        </dd>
        <div class="clear"></div>
	</dl>
</div>
<div class="footer_font main"><p> <a href="about/privacy.htm" tppabs="https://www.xinrong.com/about/privacy" target="_blank">隐私保护申明</a> 　|　 <a href="about/agreement.htm" tppabs="https://www.xinrong.com/about/agreement" target="_blank">服务协议</a>　 |　 粤ICP备12020226号</p>Copyright Xinrong.com All Rights Reserved   信融财富投资管理有限公司</div>
</div>
<!--footer end-->

<!-- tool_box -->

<!-- tool_box end -->

<div  id="sidebar-login-box" style="display: none; ">
<div class="wgt-dialog wgt-dialog-login" >
    <fieldset class="ui-form">
        <form id="rapid-login-form" method="post" action="https://www.xinrong.com/v2/login/login.jso">
            <h3 class="wgt-dialog-title">信融财富用户登录</h3>
            <div class="ui-form-line">
                <label for="username" class="ui-form-label">账　号：</label>
                <input type="text" name="username" id="rapid-userName" class="ui-form-input" maxlength="50" tabindex="1" placeholder="账户名 / Email / 手机号"/>
                <a href="2.0/views/account/register4.0.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/register4.0.shtml" class="blue" target="_blank">注册账号</a>
            </div>
            <div class="ui-form-line">
                <label for="password" class="ui-form-label">密　码：</label>
                <input type="password" name="password" id="rapid-userPw" class="ui-form-input" maxlength="16" tabindex="2" placeholder="登录密码"/>
                <a href="2.0/views/account/back_password.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/back_password.shtml" class="blue" target="_blank">忘记账号/密码？</a>
            </div>
            <div class="ui-form-line ui-form-captcha" id="captcha_view" style="display:none">
                <label for="rapid-captcha" class="ui-form-label">验证码：</label>
                <input type="text" id="rapid-captcha" name="captcha" class="ui-form-input" autocomplete="off" maxlength="4" tabindex="3" placeholder="验证码"/>
                <span id="rapid-captcha-placeholder" class="captcha-placeholder"><img src="" width='101' height='31' id='img-captcha' title='看不清楚？换一个' /></span>
                <input type="hidden" id="rapid-seed" name="seed" value=""/>
            </div>
            <div class="ui-form-line ui-form-action">
                <input  type="submit" class="ui-button ui-button-orange" style="width: 234px;height: 36px;line-height: 36px;" tabindex="4" value="登 录" />
                
                <em class="ui-tip"></em>
                <img src="2.0/images/Connect_logo_7.png" tppabs="https://www.xinrong.com/2.0/images/Connect_logo_7.png" onclick=" AA.RapidLogin.qqClick();" style="cursor:pointer; margin-left:8px;"></img>
            </div>
            <style>
            .login-succ{ margin:auto; width:290px; height:210px; position:fixed; left:0; right:0px; top:0px; bottom:0px; z-index:999; filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#CC000000', endColorstr='#CC000000'); border-radius:8px; text-align:center;}
            :root .login-succ{ filter:none; background-color:rgba(0,0,0,0.5);}
            .login-succ h1{ font-size:24px; color:#fff; padding-top:60px; font-weight:normal; position:relative;}
            .login-succ img{ vertical-align:middle;padding:0px 10px 0 0;}
            .login-succ span{ vertical-align:middle; padding: 26px 0 0 0;  display: inline-block;}
            </style>
            <div id="login_suc_dialog" style="display: none;">
            <div class="login-succ">
            <h1><img src="2.0/images/c-login1.gif" tppabs="https://www.xinrong.com/2.0/images/c-login1.gif" width="68" height="93" /><span><i class="icondagou"></i>登录成功</span></h1>
            </div>
            </div>
        </form>
    </fieldset>
</div> 

</div>
<script type="text/javascript" src="2.0/js/rsa.js" tppabs="https://www.xinrong.com/2.0/js/rsa.js"></script>
<script type="text/javascript" src="webapp2.0/js/wbox.js" tppabs="https://www.xinrong.com/webapp2.0/js/wbox.js"></script>
<link rel="stylesheet" href="2.0/css/dialog-wbox.css" tppabs="https://www.xinrong.com/2.0/css/dialog-wbox.css">
<style>
.dialogmain{ text-align: left;  filter: progid : DXImageTransform.Microsoft.Gradient ( GradientType
 =  0, StartColorStr = '#99727272', EndColorStr = '#99727272' ); filter: none\0; }
.dialogmain .mainbox{ border: 1px solid #0078b5; background:#fff;}
.dialogmain .mainbox h1{ height: 30px; line-height: 30px; padding: 0 28px 0 10px; color: #fff; background: #74b4e2; background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #74b4e2), color-stop(100%, #3d8fca) ); background-image: -webkit-linear-gradient(#74b4e2, #3d8fca); background-image: -moz-linear-gradient(#74b4e2, #3d8fca); background-image: -o-linear-gradient(#74b4e2, #3d8fca); background-image: linear-gradient(#74b4e2, #3d8fca); position:relative;}
.dialogmain .mainbox h1 .d-close { padding: 0; position:absolute; top: 4px; right: 4px; width: 21px; height: 21px; line-height: 21px; font-size: 25px; _font-size: 20px; color: #fff; text-align: center; font-family: Helvetica, STHeiti; _font-family: Tahoma, '\u9ed1\u4f53', 'Book Antiqua', Palatino;text-decoration: none; display:block;outline: none;}
.dialogmain .dialoglogin{ padding: 30px 0 0 55px;}
.dialogmain .dialoglogin h2{ font-size: 14px; color:#000; text-align:center; padding-right:55px;}
.dialogmain .dialoglogin dl{ clear:both; width:100%; height: 31px; line-height: 31px; margin-top: 12px; position: relative;}
.dialogmain .dialoglogin dt label { display: inline-block; text-align: right; color: #333;}
.dialogmain .dialoglogin dt .ui-form-input{ width: 227px; height: 26px; line-height: 26px; padding: 1px 3px; border: 1px solid #b6c4cd; -webkit-border-radius: 2px 2px 2px 2px; -moz-border-radius: 2px 2px 2px 2px; -ms-border-radius: 2px 2px 2px 2px; -o-border-radius: 2px 2px 2px 2px; border-radius: 2px 2px 2px 2px; -webkit-transition-duration: 0.2s; -moz-transition-duration: 0.2s;-o-transition-duration: 0.2s; transition-duration: 0.2s; -webkit-transition-timing-function: ease-in; -moz-transition-timing-function: ease-in; -o-transition-timing-function: ease-in; transition-timing-function: ease-in;}
.dialogmain .dialoglogin dt .text01{ width:115px;}
.dialogmain .dialoglogin dt a.blue { margin-left: 5px;}
.dialogmain .dialoglogin dt .pic{ vertical-align:top; padding-left:5px; display:inline-block;}
.dialogmain .loginsub{ margin-top: 20px; padding-left: 52px; height: 48px; line-height: 28px; position:relative;}
.dialogmain .loginsub .sub02{ border:0px; width:98px; height:28px; font-size: 14px;}
.dialogmain .loginsub .ui-tip{ position: absolute; left: 177px; top: 0px; color: #dc3e00; font-style: normal;}
.dialogmain .loginsub .ui-tip .icon01{ width:14px; height:17px; background-position:-492px -85px; display:inline-block; vertical-align:middle; margin-right:4px;}

.dialogmain .dialogbao{ padding: 30px 0 0 0px;}
.dialogmain .dialogbao h2{ font-size: 16px; color:#000; text-align:center;}
.dialogmain .dialogbao dl{ clear:both; width:100%; height: 29px; line-height: 29px; margin-top: 10px; font-size:13px;}
.dialogmain .dialogbao dt{ width:123px; text-align:right; float:left;}
.dialogmain .dialogbao dd{ width:283px; float:left;}
.dialogmain .dialogbao dd .ui-form-input{ width: 157px; height: 26px; line-height: 26px; padding: 1px 3px; border: 1px solid #c0c1c2; border-color:#404040 #c0c1c2 #c0c1c2 #404040; -webkit-border-radius: 2px 2px 2px 2px; -moz-border-radius: 2px 2px 2px 2px; -ms-border-radius: 2px 2px 2px 2px; -o-border-radius: 2px 2px 2px 2px; border-radius: 2px 2px 2px 2px; -webkit-transition-duration: 0.2s; -moz-transition-duration: 0.2s;-o-transition-duration: 0.2s; transition-duration: 0.2s; -webkit-transition-timing-function: ease-in; -moz-transition-timing-function: ease-in; -o-transition-timing-function: ease-in; transition-timing-function: ease-in;}
.dialogmain .dialogbao dd.gray{ font-size:12px; height:18px; line-height:18px;}
.dialogmain .dialogbao dd .sub02{ border:0px; width:140px; height:35px; font-size: 14px; cursor:pointer;}
.dialogmain .dialogbao dd .ui-tip{ position: absolute; left: 0px; top: -5px; color: #dc3e00; font-style: normal; font-size:12px; padding-left:0px;}
.dialogmain .dialogbao dd .ui-tip .icon01{ width:14px; height:17px; background-position:-492px -85px; display:inline-block; vertical-align:middle; margin-right:4px;}

.dialogmain .dialogbao dd .ui-tip01{ position: absolute; left: 0px; top: -12px; font-style: normal; font-size:12px; color:#999;}
.dialogmain .dialogbao dd .ui-tip01 .icon01{ width:14px; height:17px; background-position:-430px -85px; display:inline-block; vertical-align:middle; margin-right:4px;}

</style>
<div id='xcb_window' style='display:none'>
			<div class="dialogmain" style="width:440px;"  >
			<div class="mainbox">
			<h1>存入信存宝<a href="javascript:void(0)" class="d-close">×</a></h1>
			<div class="dialogbao">
			<h2 style="display:none;">账户余额存入信存宝</h2>
            
			<dl style="display:none;">
			<dt>账户名：</dt>
			<dd id='index_xcb_name'></dd>
			<div class="clear"></div>
			</dl>
			<dl>
			<dt>账户余额：</dt>
			<dd><b class="red" id='index_account_money'></b>元 <a href="my/recharge.htm" tppabs="https://www.xinrong.com/my/recharge" class="blue" style="margin-left:30px;">充值></a></dd>
			<div class="clear"></div>
			</dl>
			<dl>
			<dt>信存宝剩余额度：</dt>
			<dd><b class="red" id='index_xcb_money'></b>元</dd>
			<div class="clear"></div>
			</dl>
			<dl>
			<dt>存入金额：</dt>
			<dd><input type="text" name="userName" class="ui-form-input" maxlength="50" tabindex="1" id="xcb_cr_money"><span style="position: relative;margin-left: -18px;">元</span></dd>
			<div class="clear"></div>
			</dl>
			<dl>
			<dt>交易密码：</dt>
			<dd><input type="password" name="password" class="ui-form-input" maxlength="50" tabindex="1" id='xcb_cr_password'> <a href="2.0/views/account/back_password.shtml.htm" tppabs="https://www.xinrong.com/2.0/views/account/back_password.shtml" target="_blank" class="blue">忘记交易密码？</a></dd>
			<div class="clear"></div>
			</dl>
			<dl>
			<dt>&nbsp;</dt>
			<dd class="gray"><input name="" type="checkbox" value="" id='readme' checked='checked'/> 我已阅读并接受<a href="about/xcb_xieyi.htm" tppabs="https://www.xinrong.com/about/xcb_xieyi" target="_blank" class="blue">《信存宝服务用户协议》</a></dd>
			</dl>
			<dl>
			<dt>&nbsp;</dt>
			<dd class="PositionR" >
            <p class="black15"></p>
			    <p><em class="ui-tip"><i class="AllIcon " id='icls' ></i><span class='red' id='errorInfo'></span></em>
			    <em class="ui-tip01" id='crLogo' style='display:none'><img src="2.0/images/load.gif" tppabs="https://www.xinrong.com/2.0/images/load.gif" width="28" height="28" /></em>
			    <em class="ui-tip01" style='display:none'  id='crSuccess'><i class="AllIcon icon01"></i>成功存入</em> </p>
                <input name="" type="button" class="sub02" value="确定" id="xcb_cr" />
			</dd>
			<dd class="PositionR" style="display:none"><input name="" type="button" class="sub02" value="确定" /></dd>
			<dd class="PositionR" style="display:none"><input name="" type="button" class="sub02" value="确定"  /><em class="ui-tip01"><img src="2.0/images/load.gif" tppabs="https://www.xinrong.com/2.0/images/load.gif" width="28" height="28" /></em></dd>
			</dl>
			<div class="clear"></div>
			<div class="black25"></div>
			<div class="black15"></div>
			</div>
			</div>
			</div>
</div>
<style type="text/css">
.xcb_cr_suc{display: none;}
.dialogmain{ text-align: left;  filter: progid : DXImageTransform.Microsoft.Gradient ( GradientType
 =  0, StartColorStr = '#99727272', EndColorStr = '#99727272' ); filter: none\0; }
.dialogmain .mainbox{ border: 1px solid #0078b5; background:#fff;font-size: 14px;}
.dialogmain .mainbox h1{ height: 30px;font-size: 14px; line-height: 30px; padding: 0 28px 0 10px; color: #fff; background: #74b4e2; background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #74b4e2), color-stop(100%, #3d8fca) ); background-image: -webkit-linear-gradient(#74b4e2, #3d8fca); background-image: -moz-linear-gradient(#74b4e2, #3d8fca); background-image: -o-linear-gradient(#74b4e2, #3d8fca); background-image: linear-gradient(#74b4e2, #3d8fca); position:relative;}
.dialogmain .mainbox h1 .suc-close { padding: 0; position:absolute; top: 4px; right: 4px; width: 21px; height: 21px; line-height: 21px; font-size: 25px; _font-size: 20px; color: #fff; text-align: center; font-family: Helvetica, STHeiti; _font-family: Tahoma, '\u9ed1\u4f53', 'Book Antiqua', Palatino;text-decoration: none; display:block;outline: none;}
.dialogmain .mainbox .suc_tips{padding: 50px 30px 60px 0; text-align: center;}
.dialogmain .mainbox .suc_tips .tips_1{line-height: 30px; font-size:16px; text-align:left; padding-left:90px;}
.dialogmain .mainbox .suc_tips .tips_1>span{vertical-align: middle;}
.dialogmain .mainbox .suc_tips .tips_1>span>span{padding: 0 5px;color: #f00;}
.dialogmain .mainbox .suc_tips .tips_1 i{display: inline-block;width: 30px;height: 30px;margin-right: 10px;background: url("2.0/images/bicon01.png"/*tpa=https://www.xinrong.com/2.0/images/bicon01.png*/) no-repeat;background-size: contain;vertical-align: middle;}
.dialogmain .mainbox .suc_tips .tips_2{padding:10px 0 0 131px;color: #999;font-size: 12px;line-height: 20px; text-align:left; display:block;}
.dialogmain .mainbox .btn_con{padding-bottom: 50px;text-align: center;}
.dialogmain .mainbox .btn_con .xcb_cr_suc_btn{display: inline-block;width: 140px;height: 35px;margin: 0 auto;background-color: #f60;color: #fff;font-size: 14px;text-decoration: none;line-height: 35px;text-align: center}
</style>
<div id="xcb_cr_suc" class="xcb_cr_suc">
  <div class="dialogmain" style="width:440px;" >
    <div class="mainbox">
	  	<h1>提示<a href="javascript:void(0)" class="suc-close">×</a></h1>
      <div class="suc_tips">
        <div class="tips_1"><i></i><span>您在信存宝成功存入 :<span id="xcb_cr_suc_money">--</span>元</span></div>
        <span class="tips_2">新充值未投资过的资金存入信存宝需进行转化。转化过程中，转出并提现将收取额外0.5％手续费，按转化进度减免，100%后将仅收原提现费；转化一般需15日左右。</span>
      </div>
      <div class="btn_con"><a href="javascript:void(0)"; class="xcb_cr_suc_btn suc-close">关闭</a></div>
    </div>
  </div>
</div>
<div id="dlg_do_invest_step_one" style="display: none;">
<div class="dialogmain" style="width: 494px;background: none;" >
<div class="mainbox" style="border: none;">

<div class="dialogline">
<h2 style="padding-bottom:15px;margin-top:-10px;" id="show_vip_tip"><span class="red" ><b>提示：vip会员持有1个月后即可转让</b></span></h2>
<h2><font id="do_invest_dlg_title"></font><span id='do_invest_dlg_title_icons'></span></h2>
<ul>
<li>预期年化收益率：<span id="do_invest_dlg_rate"></span></li>
<li class="w01">融资期限：<span id="do_invest_dlg_deadline"></span></li>
<li>项目余额：<b class="red" id="do_invest_dlg_section_amount"></b> 元</li>
<li id="get_reward_li" style="display:none;">额外奖励：<span class="f-raise red" id="get_reward">X%</span></li>
<li class="w01">可用余额(含礼金)：<b><font id="do_invest_dlg_total_money" class="red"></font></b> 元<a href="my/recharge.htm" tppabs="https://www.xinrong.com/my/recharge" class="blue" style="margin-left:6px" id="invest_recharge1"> 充值</a></li>
<div class="clear"></div>
</ul>
<dl>
	<dd>输入投资金额：<input id="do_invest_dlg_invest_money" name="" type="text" class="text01" tabindex="100" placeholder="100元起投，需100元整数倍" /> <a href="javascript:auto_fill()" id="btn_auto_fill"
		class="blue">自动填写</a>
		<!-- modify sundy zhou 2016-5-12 -->

	</dd>
	<div class="clear"></div>
</dl>
<dl>
<dd>自动抵扣礼金：<font id="do_invest_dlg_reward">0</font><span id='do_invest_dlg_reward_unit'>元</span></dd>
<input id="do_invest_dlg_reward_total"  type="hidden" />
<div class="clear"></div>
</dl>
<!-- <dl>
<dd>预期收益：<span id="do_invest_dlg_total_interest"></dd>
<div class="clear"></div>
</dl> -->
<p class="font01" style="display: none;"><i class="AllIcon iconI" id = "allicon_iconI"></i><font id="do_invest_dlg_invest_tip"></font></p>

<dl class="do_sub">
	<dd>
	<p class="red" style="display: none;" id="invest_so_error_tip">
	<i class="AllIcon icon01">
	</i>
	<font id="invest_so_error_msg" >请输入正确金额数</font>
	</p>
	<p class="gray" style="display: none;" id="transfer_tip">
	<i class="AllIcon iconI"></i><font >等额本息转让项目需一次性投完</font>
	</p>
	<a tabindex="101" id="do_invest_dlg_sub_next" href="javascript:void(0)" class="sub03">下一步</a></dd>
	<div class="clear"></div>
</dl>

<div>
<input type="hidden" id="hl_section" value="0">
<input type="hidden" id="hl_auto" value="1">
</div>
<div class="black25"></div>
<div class="black15"></div>
</div>
</div>
</div>
</div>

<div id="wgt-dialog-invest-two-wrapper" style="display: none;">
	<div class="dialogmain" style="width:494px;background: none;">
		<div class="mainbox" style="border: none;">
			<div class="dialogline">
			<h2 style="padding-bottom:15px;margin-top:-10px;" id="show_vip_tip"><span class="red" ><b>提示：vip会员持有1个月后即可转让</b></span></h2>
				<h2><font id="do_invest_two_title"></font> <span id='do_invest_dlg_title_icons'> </span></h2>
				<ul>
				<li>预期年化收益率：<span id="do_invest_dlg_rate"></span></li>
				<li>融资期限：<span id="do_invest_two_deadline"></span></li>
				<li>投资金额：<b class="red" id="do_invest_two_money"></b> 元</li>
                <li id="get_reward_li" style="display:none;">额外奖励：<span class="f-raise red" id="get_reward">X%</span></li>
				<div class="clear"></div>
				</ul>
				<dl>
				<dd>已抵扣礼金：<span id="do_invest_two_reward"></span> <span id='do_invest_two_reward_unit'>元</span></dd>
				<div class="clear"></div>
				</dl>
				<dl>
				<dd>预期收益：<font class="red" id="do_invest_dlg_total_interest">...</font> 元 <span class="gray font02" style="color:#999;">(含<a href="help/faq/2.htm#1" tppabs="https://www.xinrong.com/help/faq/2#1" target="_blank" title="投资服务费在回款时扣除，按投资收益的0%-10%收取，具体比例由投资时VIP等级决定" class="blue">投资服务费</a><font id="do_invest_manage_fee">...</font>元)</span></dd>
				<div class="clear"></div>
				</dl>
				<dl class="tradepass">
				<dt>交易密码：</dt>
				<dd>
					<input id="do_invest_two_tradepass" name="" tabindex="102" type="password" class="text01" />
					<span class="d_eye  d_eye_close">
						<img id="do_invest_two_tradepass_eyeclose" src="2.0/images/eye_close.png" tppabs="https://www.xinrong.com/2.0/images/eye_close.png" height="27"  />
					</span>
				  	<input id="do_invest_two_tradepass_plain" name="" tabindex="102" type="text" class="text01" style="display:none"/>
					<span class="d_eye d_eye_open" style="display:none">
						<img id="do_invest_two_tradepass_eyeopen"  src="2.0/images/eye_open.png" tppabs="https://www.xinrong.com/2.0/images/eye_open.png" height="27" />
					</span>
				   	<a href="2.0/views/account/back_password.shtml-tab=2.htm" tppabs="https://www.xinrong.com/2.0/views/account/back_password.shtml?tab=2" class="blue">忘记交易密码？</a>
					<p class="red" style="display: none;"><i class="AllIcon icon01"></i>交易密码必须为6-16个字符</p>
				</dd>
				<div class="clear"></div>
				</dl>
				<div class="clear"></div>
				<dl>
				<dt>验证码：</dt>
				<dd><input id="do_invest_two_cap_input" tabindex="103" name="" type="text" class="text01" /><input type="hidden" id="do_invest_two_seed" value="0" /> <span class="pic" id="do_invest_two_cap"><img id="img-captcha" src="" width="90" height="28" title="看不清楚？换一个" ></span><p class="red" id="do_invest_two_error_tip" style="display: none;"><i class="AllIcon icon01"></i><font id="do_invest_two_error_msg"></font></p></dd>
				<div class="clear"></div>
				</dl>
				<div class="clear"></div>
				<dl class="do_sub">
				<dt>&nbsp;</dt>
				<dd class="PositionR"><a  id="do_invest_two_sub" href="javascript:void(0)" tabindex="104" class="sub03">确认投资</a><em class="ui-tip01" style="display: none;"><img src="2.0/images/load.gif" tppabs="https://www.xinrong.com/2.0/images/load.gif" width="28" height="28" /></em></dd>
				<div class="clear"></div>
				</dl>
				<div class="black25"></div>
				<div class="black15"></div>
			</div>
		</div>
	</div>
</div>

<style>
.phonebox{ padding:20px;}
.phonebox dl{ padding:15px 0 0 0; width:100%; clear:both; line-height:24px;}
.phonebox dt{ width:101px; text-align:right; font-size:14px; float:left;}
.phonebox dd{ width:344px; float:left;}
.phonebox dd .text01{ width:109px; height:24px; line-height:24px; border:1px solid #7f7f7f; padding:0 8px; margin:0px;}
.phonebox dd .cb6b6b6{ color:#b6b6b6;}
.phonebox dd .icon01{ width:14px; height:14px; background:url("2.0/images/tip-s5a01e083c6.png"/*tpa=https://www.xinrong.com/2.0/images/tip-s5a01e083c6.png*/) -1px -169px no-repeat; display:inline-block; vertical-align:middle; margin:0 4px 4px 0;}
.phonebox dd .icon02{ width:14px; height:14px; background:url("2.0/images/tip-s5a01e083c6.png"/*tpa=https://www.xinrong.com/2.0/images/tip-s5a01e083c6.png*/) -1px -195px no-repeat; display:inline-block; vertical-align:middle; margin:0 4px 4px 0;}
.phonebox dd img{ vertical-align:middle;}
.phonebox dd .sub01{ width: 95px; height: 24px; line-height: 24px; text-align: center; background: #ff6600; border:1px solid #ff6600; color: #fff; display: inline-block; border-radius: 2px; text-decoration: none; font-size:14px;}
.phonebox dd .sub02{ width: 95px; height: 24px; line-height: 24px; text-align: center; background: #fff; border:1px solid #307bb0; color: #307bb0; display: inline-block; border-radius: 2px; text-decoration: none; font-size:14px; margin-left:20px;}
.phonebox .paddintbottom{ padding-bottom:30px;}
.phonebox .fontsize{ font-size:14px;}
.phonebox dd .tipfont{ display:inline-block; padding-left:10px;}

.phonebox .phonesuccessful{ display:block; text-align:center; font-size:20px; min-height:120px; line-height:120px;}
.phonebox .phonesuccessful .icon03{ width:35px; height:35px; background:url("2.0/images/tip-s5a01e083c6.png"/*tpa=https://www.xinrong.com/2.0/images/tip-s5a01e083c6.png*/) 0px -39px no-repeat; display:inline-block; vertical-align:middle; margin:0 6px 3px 0;}
.phonebox .succfont{ display:block; text-align:right; padding:0 20px; font-size:14px; color:#b6b6b6;}
.area{margin-left: 30px;color:#0078B6;font-weight: bold}
</style>
<div id='step_1' style='display:none'>
	<div class="phonebox">
	<dl>
	<dt>手机号码：</dt>
	<dd><span id='step_1_mobile'></span>
	    <span id='step_1_area' class='area'></span></dd>
	<div class="clear"></div>
	</dl>
	<dl>
	<dt>充值金额：</dt>
	<dd>
	<select id='step_1_money' class="text01" onchange="fare.culScore()">
		<!--<option value="10">10元</option>
		<option value="20">20元</option>-->
		<option value="30">30元</option>
		<option value="50">50元</option>
		<option value="100" selected="selected">100元</option>
		<option value="200">200元</option>
		<option value="300">300元</option>
		<option value="500">500元</option>
	</select> 
	<span  id='step_1_send_score'></span></dd>
	<div class="clear"></div>
	</dl>
	<dl>
	<dt>账户余额：</dt>
	<dd><span class="red" id='step_1_totalmoney'></span> 元</dd>
	<div class="clear"></div>
	</dl>
	<dl>
	<dt>&nbsp;</dt>
	<dd class="red" id='step_1_error_info'></dd>
	<div class="clear"></div>
	</dl>
	<dl class="paddintbottom">
	<dt>&nbsp;</dt>
	<dd><a href="javascript:void(0)" class="sub01" onclick='fare.commit()'>确认充值</a><a href="2.0/vip.html" tppabs="https://www.xinrong.com/2.0/vip.html" target="_blank" class="sub02" >查看详情></a></dd>
	<div class="clear"></div>
	</dl>
	</div>
</div>
<div id='step_2' style='display:none'>
	<div class="phonebox">
	<dl>
	<dt>手机号码：</dt>
	<dd class="fontsize" id='step_2_mobile'></dd>
	<div class="clear"></div>
	</dl>
	<dl>
	<dt>充值金额：</dt>
	<dd class="fontsize" ><span id='step_2_money'></span>元</dd>
	<div class="clear"></div>
	</dl>
	<dl>
	<dt>交易密码：</dt>
	<dd><input id='tradePwd' type="password" class="text01" placeholder="" /> <a target="_blank" href="2.0/views/account/back_password.shtml-tab=2.htm" tppabs="https://www.xinrong.com/2.0/views/account/back_password.shtml?tab=2" class="blue">忘记交易密码？</a></dd>
	<div class="clear"></div>
	</dl>
	<dl class="paddintbottom">
	<dt>验证码：</dt>
	<dd><input id="captcha" type="text" class="text01" placeholder="" /> <span id='captcha-placeholder'><img src="" width="91" height="27" id="img-captcha" title="看不清楚？换一个"></span><input id='seed' type="hidden" value="" /></dd>
	<div class="clear"></div>
	</dl>
	<dl class="paddintbottom">
	<dt>&nbsp;</dt>
	<dd><a href="javascript:void(0)" class="sub01" onclick='fare.submit()' id='fare_commit'>确认支付</a><span class="red tipfont" id='step_2_error_info'></dd>
	<div class="clear"></div>
	</dl>
	</div>
</div>
<div id='step_3' style='display:none'>
	<div class="phonebox">
	<span class="phonesuccessful"><i class="icon03"></i>恭喜您，已充值成功！</span>
	<span class="succfont">页面<span class="red" id='step_3_second'>5</span>秒后自动关闭</span>
	</div>
</div>
<style>
.ftel{ cursor: pointer; }

.d-dialog{ border: 1px solid #0078b5; background:#fff;}
.d-dialog h1{ height: 30px; line-height: 30px; padding: 0 28px 0 10px; color: #fff; background: #74b4e2; background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #74b4e2), color-stop(100%, #3d8fca) ); background-image: -webkit-linear-gradient(#74b4e2, #3d8fca); background-image: -moz-linear-gradient(#74b4e2, #3d8fca); background-image: -o-linear-gradient(#74b4e2, #3d8fca); background-image: linear-gradient(#74b4e2, #3d8fca); position:relative; font-size:14px;}
.d-dialog h1 .d-close { padding: 0; position:absolute; top: 4px; right: 4px; width: 21px; height: 21px; line-height: 21px; font-size: 25px; _font-size: 20px; color: #fff; text-align: center; font-family: Helvetica, STHeiti; _font-family: Tahoma, '\u9ed1\u4f53', 'Book Antiqua', Palatino;text-decoration: none; display:block;outline: none;}

.d-dialog .call_font{ padding:50px 40px 20px 40px; line-height:24px; font-size:16px;width:350px}
.d-dialog .call_sub{ padding:20px 0 0 0; text-align:center;}
.d-dialog .call_sub .sub01{ width:156px; height:45px; line-height:43px; text-align:center; background:#15a32c; font-size:20px;}
.d-dialog .call_sub .sub02{ width:156px; height:45px; line-height:43px; text-align:center; background:#c8c8c8; font-size:20px;}
.d-dialog .c_font{ text-align:center; padding-left:0px; padding-right: 0px;}
.index_dialog{ width:800px; background:#fff; border-radius:26px; position:relative;}
.index_dialog p img{ width:100%;}
.index_dialog ul{ padding:17px 0; border-bottom:1px solid #b3b3b3;}
.index_dialog ul li{ width:50%; float:left; text-align:center; line-height:80px; font-size:38px;}
.index_dialog ul li a{ display:block; color:#999;text-decoration:none}
.index_dialog h3{ text-align:center; color:#444; line-height:100px; font-weight:normal;}
.index_dialog h3 a{ display:block; color:#444; line-height:100px; font-size:40px;text-decoration:none}
.index_dialog .close{ position:absolute; top:-30px; right:-30px;}
</style>
<div id="free_tel_box" style="display:none;">
<div class="call_font" id="call_info_tip">
点击通话，<font  >致电给信融财富</font>，
稍后您将接到回拨电话，此次通话对您<span class="blue">完全免费</span>，请放心接听！
</div>
<div class="call_sub"><a id="free_tel_btn" href="javascript:void(0)" class="sub01">通话</a></div>
<div class="black20"></div>
</div>
<div id="free_tel_msg_box" style="display:none;">
<div class="call_font c_font" id="msg_view">
</div>
<div class="call_sub"><a id="free_tel_msg_btn" href="javascript:void(0)" class="sub01">确定</a></div>
<div class="black20"></div>
</div>
<script>
$(function(){
	//免费咨询电话
	$('.ftel,#right_free_call_btn').click(function(){
		$.dialog({
			id:'tel',
			content:$('#free_tel_box').html(),
			initialize:function(){
				var _dialog = this;
				$('.d-dialog #free_tel_btn').click(function(){
					$.ajax({
						url:'v2/communication/free_consulation.jso'/*tpa=https://www.xinrong.com/v2/communication/free_consulation.jso*/,
						type:'post',
						dataType:'json',
						success:function(result){
							if(result.state == 0){
								$('.d-dialog #free_tel_btn').removeClass().addClass('sub02').html('请接听');
								$('.d-dialog #free_tel_btn').unbind('click').click(function(){
									_dialog.close();
								});
							}else if(result.state == 1009){
								_dialog.close();
								AA.RapidLogin.popup();
							}else if(result.state == 300){
								$('#call_info_tip').html("当日400免费呼入次数已超出限制，请自行联系客服4007779888");
								$('#free_tel_btn').html("关闭");
								$('#free_tel_btn').click(function(){
											_dialog.close();
										});
							}else{
								_dialog.close();
								$.dialog({
									id:'tel_msg',
									content:$('#free_tel_msg_box').html(), 
									initialize:function(){
										var _dialog = this;
										$('.d-dialog #msg_view').html(result.msg);
										$('.d-dialog #free_tel_msg_btn').click(function(){
											_dialog.close();
										});
									}
								});
							}
						}
					});
				});
			}
		});
	});
});
</script>
<div id="show_tip_dialog" style="display:none;">
<div class="index_dialog">
<span style=" position: absolute; font-size: 40px;float: right; width: 100%; text-align: center;"><span id=count_to_close>5</span>s后关闭</span>
<a href="javascript:wBox.close()" class="close"><img src="2.0/images/pc_app_closeBanner.png" tppabs="https://www.xinrong.com/2.0/images/pc_app_closeBanner.png" width="100" /></a>
<p><img src="2.0/images/i_01.png" tppabs="https://www.xinrong.com/2.0/images/i_01.png" /></p>
<ul>
<li><a href="webapp2.0/index.htm" tppabs="https://www.xinrong.com/webapp2.0"><img src="2.0/images/73.png" tppabs="https://www.xinrong.com/2.0/images/73.png" width="120" /><p>触屏版</p></a></li>
<li><a href="javascript:void(0)" id="app_download_url"><img src="2.0/images/74.png" tppabs="https://www.xinrong.com/2.0/images/74.png" width="120" /><p>APP下载</p></a></li>
<div class="clear"></div>
</ul>
<h3><a href="javascript:wBox.close()">浏览网页版 ></a></h3>
</div>
</div>
<!--QQ-->
<div id="qq_box" style="display:none;">
<div class="qq_diabox">
<img src="2.0/images/qq.png" tppabs="https://www.xinrong.com/2.0/images/qq.png" width="258" />
<p>QQ号：4007779888</p>
</div>
</div>


<!--广告图弹层-->
<!--<div class="indexd-mask" style="display: none;"></div>
<div class="index-diabox" style="display: none;"><a href="/2.0/action/conference/conference.shtml" target="_blank"><img src="/2.0/images/h-08.png" width="666" height="412" /></a><a id="ad_close" href="javascript:void(0)" class="close"><img src="/2.0/images/t-jclose.png" /></a></div>-->

<script type="text/javascript" src="2.0/js/channel.js" tppabs="https://www.xinrong.com/2.0/js/channel.js"></script>
<script>

    if(document.location.hash=='#frombbs'){
        var urlFrombbs = document.referrer;
        window.location.href = "2.0/login2.0.html"/*tpa=https://www.xinrong.com/2.0/login2.0.html*/+"#frombbs"+urlFrombbs;
    }
var _hmt = _hmt || [];

var agent=navigator.userAgent;

if(agent.indexOf('android')==-1&&agent.indexOf('Android')==-1){
	var hm = document.createElement("script");
	hm.src = "../hm.baidu.com/hm.js-a5ef11ea1e672f6b504ec7fe5a92cf30"/*tpa=https://hm.baidu.com/hm.js?a5ef11ea1e672f6b504ec7fe5a92cf30*/;
	 var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
}

var browser={
    versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
if(browser.versions.mobile&&sessionStorage.getItem("isShow")==null){
	showDialog();
  var times=5;
  var t;
  function count_down(){
    times--;
    $('#wBox #count_to_close').html(times);

    if (times==0) {
      wBox.close();
      window.clearInterval(t);
      return;
    }
  }
  t=window.setInterval('count_down()','1000');
	if(browser.versions.ios)
		$("#wBox #app_download_url").attr("href","https://itunes.apple.com/cn/app/id805485193?mt=8");
	if(browser.versions.android)
		$("#wBox #app_download_url").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.xinrong");
}

function showDialog(){
	wBox = $('#show_tip_dialog').wBox({
		noTitle:true,
		top:5,
		html: $('#show_tip_dialog').html()
	});
	wBox.showBox();
	sessionStorage.setItem("isShow",true);
}
</script>
<script type="text/javascript" src="2.0/js/banner.js" tppabs="https://www.xinrong.com/2.0/js/banner.js"></script>
<link href="webapp2.0/css/wbox.css" tppabs="https://www.xinrong.com/webapp2.0/css/wbox.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="webapp2.0/js/wbox.js" tppabs="https://www.xinrong.com/webapp2.0/js/wbox.js"></script>
<script type="text/javascript" src="2.0/js/www/index_new.js" tppabs="https://www.xinrong.com/2.0/js/www/index_new.js"></script>
<script type="text/javascript">
jQuery(".xrvideo").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,startFun:function(i){jQuery(".xrvideo .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});}});

$(document).ready(function(){
	$("#tabsholder").tytabs({
		tabinit:"1",
		fadespeed:"fast"
	});
	$("#tabsholder01").tytabs({
		tabinit:"4",
		fadespeed:"fast"
	});

	$("#monthlypic").monthlypic({});

	$("#moretoggle").click(function(){
		$("#morehide").toggle();
	});

	$(".h-login-reg a").mouseenter(function(){
		if($(this).is(".flogin"))
			{
				$(".h-login-reg").addClass("h-login");
				$(".h-login-reg").removeClass("h-reg");
			}
			else{
				$(".h-login-reg").addClass("h-reg");
				$(".h-login-reg").removeClass("h-login");
				}
		});
		

	//qq二维码
	$('#qq_tip_pic').click(function(){
		$.dialog({
			id:'tel',
			width:'400px',
			content:$('#qq_box').html(),

		});
	});

});
</script>
<style>
.eswd_open{ width:559px; background:#fff;}
.eswd_open .f-detail{ display:block; font-size:17px; color:#0cb0d9; position:absolute; bottom:40px; left:43%;}
.eswd_open ul{ width:100%; height:63px;}
.eswd_open ul li{ width:50%; float:left;}
.eswd_open ul li a{ line-height:63px; font-size:22px; text-align:center; color:#0d2bb4; text-decoration:none; display:block;}
.eswd_open ul li a.f-close{ border-right:1px solid #c2c2c3; color:#919191;}
</style>
<div id="eswd_open_dialog" style="display: none;">
<div class="eswd_open">
  <p class="PositionR"><img src="2.0/images/esw12.png" tppabs="https://www.xinrong.com/2.0/images/esw12.png" width="559" height="335"><a href="2.0/action/xr_esw/esw_zt.shtml.htm" tppabs="https://www.xinrong.com/2.0/action/xr_esw/esw_zt.shtml" class="f-detail">了解详情&gt;</a></p>
  <ul>
    <li><a href="javascript:void(0)" class="f-close wBox_close">取消</a></li>
    <li><a href="2.0/views/account/bank_account.html" tppabs="https://www.xinrong.com/2.0/views/account/bank_account.html">去开户</a></li>
  </ul>
  <div class="clear"></div>
</div>
</div>
<script>
var	EswDialog;
(function(){
	var $this = {
		checkEswCreateStatus:function(escrowFlag,callBack){
			if(escrowFlag == 1){
				$.ajax({
					url:'v2/escrow/get_base_info.jso'/*tpa=https://www.xinrong.com/v2/escrow/get_base_info.jso*/,
					type:'post',
					dataType:'json',
					success:function (result) {
						if(result.state  == '0'){
							if(result.eswAccountId == null || result.eswAccountId == ''){
								$this.showEswCreateTip();
							}else{
								if(typeof callBack == 'function'){
									callBack();
								}
							}
						}
					}
				});
			}else{
				if(typeof callBack == 'function'){
					callBack();
				}
			}
		},
		showEswCreateTip:function(){
			var wBox = $('#eswd_open_dialog').wBox({
	            noTitle: true,
	            top: 5,
	            html: $('#eswd_open_dialog').html()
	        });
			wBox.showBox();
		}
	};
	EswDialog = $this;
})();
</script>

</body>
</html>