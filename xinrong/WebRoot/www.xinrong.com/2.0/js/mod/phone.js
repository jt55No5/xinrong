$(function(){
	$("#index_phone").unbind("click").bind("click",function(){
		show_App();
	})
	
	$("#index_weixin").unbind("click").bind("click",function(){
		show_weixin(); 
	})
	
	$("#index_android").unbind("click").bind("click",function(){
		show_App(); 
	})
	
    $("#index_iso").unbind("click").bind("click",function(){
    	show_App();  
	})
	
	$("#midia_weixin").unbind("click").bind("click",function(){
		show_weixin();  
	})
	
	
})

var dd=null,dd1=null,dd2=null;

	function show_weixin(){
		
		if(dd!=null&&dd!=undefined){
			dd.visible();
			return;
		}
		
		var drd= $.popup1({
           title:'' ,
           width:'341',
           padding:'0',
           content:'<div class="weixingbox" >\
               <div class="boxbg"><h1>信融财富微信公众平台</h1>\
               <div class="BoxClose"><a href="javascript:close_weixin();"><img src="/s/img/close.jpg" /></a></div>\
               <div class="boxpic"><img src="/s/img/w02.jpg" /><div class="boxfont"><span style="color:#0078b6;">服务号：</span>扫描或在微信添加公众号<br/>搜索<span>信融财富</span>关注</div>\</div>\
               <div class="boxpic"><img src="/s/img/w05.jpg" width="232" /><div class="boxfont"><span style="color:#0078b6;">订阅号：</span>扫描或在微信添加公众号搜<br/>索<span>信融财富投融资平台</span>关注</div>\</div>\
               </div>\
               </div>',
          
           init:function (d ) {
        	   
           }
			 
		 });

		 dd=drd;
	}

	function close_weixin(){
		
		dd.hidden();
	}
	
	
function show_App(){
		
		if(dd1!=null&&dd1!=undefined){
			dd1.visible();
			return;
		}
		
		var drd= $.popup1({
           title:'' ,
           width:'682',
           padding:'0',
           content:'<div class="weixingbox appbox">\
               <div class="boxbg"><h2><img src="/s/img/App.jpg" /><span>iPhone</span>版客户端</h2>\
               <div class="BoxClose" style="display: none"><a href="javascript:close_App();"><img src="/s/img/close.jpg" /></a></div>\
               <div class="boxpic"><img src="/s/img/w03.jpg" /></div>\
               <div class="boxfont boxApp">扫描或在AppStore搜索"<span>信融财富</span>"下载</div>\
               </div>\
			   <div class="boxbg"><h2><img src="/s/img/android.jpg" /><span>Android</span>版客户端</h2>\
               <div class="BoxClose"><a href="javascript:close_App();"><img src="/s/img/close.jpg" /></a></div>\
               <div class="boxpic"><img src="/s/img/w04.jpg" /></div>\
               <div class="boxfont boxApp" style="text-align: left;padding-left: 35px;">扫描或<a href="https://www.xinrong.com/s/apk/Xinrong_V2.10_16.10.13.apk" style="color: #0078b6;text-decoration: underline;">本地下载</a>。<br/>在豌豆荚等应用市场搜索“<span>信融财富</span>”下载。</div>\
               </div>\
               </div>',
          
           init:function (d ) {
        	   
           }
			 
		 });

		 dd1=drd;
	}


	function close_App(){
		
		dd1.hidden();
	}
	
	
function show_video(){
	
	alert('dddddd');
	if(dd2!=null&&dd2!=undefined){
		dd2.visible();
		return;
	}
	
	var drd= $.popup1({
        title:'' ,
        width:'682',
        padding:'0',
        content:'',
       
        init:function (d ) {
     	   
        }
			 
	});

	 dd2=drd;
}


function close_video(){
	
	dd2.hidden();
}
