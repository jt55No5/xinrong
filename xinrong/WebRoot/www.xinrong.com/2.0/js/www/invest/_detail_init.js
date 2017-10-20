/**
 * 
 */


function init(){
	
	//初始化网站导航栏
	XR.Global.InitNav(2);
	
	
	DETAIL_BS.InitData.Title();
	
	DETAIL_BS.InitData.InvestRecord();//初始化投资记录
	
	DETAIL_BS.InitData.GetRecentInvestAndRefundList();//初始化最近投资/最近回款列表（滚动）
	
	DETAIL_BS.InitData.initDoubleScoreTitleShow();
}