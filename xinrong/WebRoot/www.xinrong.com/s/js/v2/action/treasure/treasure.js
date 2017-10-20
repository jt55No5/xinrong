/**
 *  @title 寻宝记
 *  @author wqy
 */
var throughCss = '<img src="/s/images/action/treasure/treasure/zhang.png" />';//闯关成功的样式图
var failCss = '<img src="/s/images/action/treasure/treasure/zhang2.png" />';//闯关失败的样式图    
var openingBox=false; //是否正在打开宝箱
$(function(){ 
	$(".xiangziall").unbind("click").bind("click",function(){
		AA.RapidLogin.popup();
	}) ;
	$("#getMyReward").unbind().bind('click',function(){
		getTreasureReward();	
	})
	if (!AA.Api.User.isAuth) {//检查登录态，如果没登陆，就弹出登录界面
		AA.RapidLogin.popup();
		return; 
	}
	initData(); 
	initBillboard(1);
	//绑定9个宝箱的点击事件
	$(".xiangziall").unbind("click").bind("click",function(){
		if (openingBox==false) {
			var level = $(this).find("a").attr("level"); //宝箱的等级
			var throughImg =  $(this).find(".zhangpic").html();   //如果有通过的图片 表示不触发事件
			if(throughImg.length > 0){
				return; 
			} 
			getQuestion(level);   
			openingBox=true;
		}
		
	});
	
	 
})

/**
 * 初始化是否已经答题过
 */
function initData(){ 

	 $.ajax({
	 		url : '/v2/treasure/get_data.jso',        
	 		type : 'post', 
	 		dataType : 'json', 
	 		success : function(data) {
	 		if(data.state==0){ 
	 			var num = data.num;
	 			var num2 = data.num2;
	 			if (data.isEnd==2||data.isEnd==3)  //未参与
	 				num2=num2-1;
	 			if (data.isFit==-1) {
	 				 var _html = 
		 				'<div class="dialogmain" >' +
		 				'<div class="closea"></div>' +
	 					'<div class="dialogfirst">' +
	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont"><span class="red">投资满200元即可开启寻宝之旅哦~</span></span></h2>'+
	 				    '</div>'+
		 				'</div>';  
 				getDivOne(_html); 
 				return;
	 			}
	 			if(num > 0){
	 				for(var i = 1 ; i <= num ; i++){
	 				   $("#level_"+i).html(throughCss);
	 				}  
	 			}  
	 			if(num2 > 0){
	 				$("#level_"+(num+1)).html(failCss); 
	 			} 
	 			
	 			 
	 		}else if (data.state==1010) {
	 			var _html = 
		 				'<div class="dialogmain" >' +
		 				'<div class="closea"></div>' +
	 					'<div class="dialogfirst">' +
	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont"><span class="red">活动已经结束了哦~</span></span></h2>'+
	 				    '</div>'+
		 				'</div>';  
 				getDivOne(_html); 
	 		}  
	 	}
	 		 
	 });    
}

/**
 * 初始化排行榜
 * @param _currpage 当前页
 */
function initBillboard(_currpage){ 
	var _pagesize = 7;        
	 $.ajax({
	 		url : '/v2/treasure/init_user_questions.jso',        
	 		type : 'post', 
	 		data:{currpage:_currpage,pagesize:_pagesize}, 
	 		dataType : 'json', 
	 		success : function(data) {  
	 			var sumPage = 3;
	 			var d = data.data;
	 			var _html = '';
	 			for(var i in data.data){
	 				var index = parseInt(i)+1 + ( (_currpage - 1) * _pagesize );
	 				var username = data.data[i].username;
	 				var count = data.data[i].count; 
	 				if(i%2==0){ //偶数
	 					_html += '<tr class="bg">'
	 					    +'<td align="center">'+index+'</td>'
	 					    +'<td align="center">'+username+'</td>'
	 					    +'<td align="center">'+count+'关</td>'
	 					 + '</tr>';  
	 				}else{//基数
	 					_html += '<tr>'
	 					    +'<td align="center">'+index+'</td>' 
	 					    +'<td align="center">'+username+'</td>'
	 					    +'<td align="center" >'+count+'关</td>' 
	 					 + '</tr>';  
	 				}
	 				if (_currpage==3&&i==5)
					break;  
	 			}
	 			$("#billTb").html(""); 
	 			$("#billTb").append(_html);
	 			if(d.length > 0){
	 				var ddd = "";
		 			//动态生成分页列表
	 				if( _currpage == 1 ){ 
		 			    var pageHtml = '<a href="javascript:void(0)" class="c61200e">上一页</a>';
	 				}else{
	 					var pageHtml = '<a href="javascript:void(0)" class="c61200e" onclick="initBillboard('+(parseInt(_currpage)-1)+')">上一页</a>'; 
	 				}
		 			
		 			
		 			if(sumPage > 9){//大于9页的不显示
		 				sumPage = 9;  
		 				ddd="...";  
		 			}
		 			
	 				for(var i = 1 ; i <= sumPage; i++){
	 					if(i == _currpage){
	 						pageHtml += '<a href="javascript:void(0)">'+i+'</a>'; 
	 					}else{
	 					    pageHtml+='<a href="javascript:void(0)" class="c61200e" onclick="initBillboard('+i+')">'+i+'</a>';      
	 					}
	 				}  
	 				pageHtml+=ddd; 
	 				
	 				if(_currpage == sumPage || _currpage == 9 ){ 
	 					pageHtml+='<a href="javascript:void(0)" class="c61200e" >下一页</a>';   
	 				}else{
	 					pageHtml+='<a href="javascript:void(0)" class="c61200e" onclick="initBillboard('+(parseInt(_currpage)+1)+')">下一页</a>';  
	 				}
	 				
		 			$("#page").html(""); //清空 
		 			$("#page").html(pageHtml); //附加      
	 			} 
	 			
	 		}      
	 });    
}

function bindCheckOption(){  
	
	
}
var timer;
/**
 * 获得服务器问题
 */
function getQuestion(level){ 
	
	if (!AA.Api.User.isAuth) {
        AA.RapidLogin.popup();
    } else {
    	
    	if (!G_ENV_VAR.IS_CHECKED_MOBILE) {
            $.alert({
                title:'您的手机号尚未经过认证！',
                content:'为了保护您的资金安全，请先完成手机认证后再投资',
                txtBtn:'立即认证',
                url:'my/authinfo#mobile'
            });
            return false;
        } else if (!G_ENV_VAR.IS_CHECKED_IDENTIFICATION) {
            $.alert({
                title:'您尚未通过实名认证！',
                content:'为了确定您的电子合同主体，请先完成实名认证再投资',
                txtBtn:'立即认证',
                url:'my/authinfo#identity'
            });
            return false;
        } 
    }
	
	
    $.ajax({
 		url : '/v2/treasure/get_question.jso',       
 		type : 'post', 
 		data:{level:level},  
 		dataType : 'json', 
 		success : function(data) {
 			openingBox=false; 
 			 if(data.state == 0 ){
 				var content = data.question.content; //问题题干
 				var question_id = data.question.id; //id
 				var treasure_id = data.question.treasureId; //宝箱id 
 				var options = data.options;
 				var second = data.second;
 				var isMul = 0;//默认为单选
 				//选项拼接
 				var _html = '<div class="dialogmain"><div class="closea"></div><div class="popdialog"><h2>离回答题目还剩<span class="red" id="second">'+second+'</span>秒</h2>'
 					+'<h3 >'+content+'</h3>'
 					+'<ul>';
 				var _index =  options.length;
 				if(level < 6){//单选加载题目 
	 				for(var i in options){
	 					var index = parseInt(i) + 1; 
	 					var option_content = options[i].content; 
	 					var option_id = options[i].id;  
	 					_html +='<li><input id="Radio'+index+'" type="radio" class="RadioClass" name="group1" >'
	 					+'<label id="Label'+index+'" for="Radio'+index+'" class="RadioLabelClass" >'  
	 					+option_content+'</label>'+'<input type="hidden"  value="'+option_id+'"/>'+'</li>';            
	 				} 
 				}else{//多选
 					isMul = 1;
 					for(var i in options){
	 					var index = parseInt(i) + 1; 
	 					var option_content = options[i].content; 
	 					var option_id = options[i].id;  
	 					_html +='<li><input id="Radio'+index+'" type="checkbox" class="CheckBoxClass" name="group1" >'
	 					+'<label id="Label'+index+'" for="Radio'+index+'" class="CheckBoxLabelClass" >'  
	 					+option_content+'</label>'+'<input type="hidden"  value="'+option_id+'" />'+'</li>';               
	 				} 
 				}
 				_html += '</ul><div class="popsub"><a href="javascript:void(0)" class="treasub01" id="summitAnswer">提交</a></div>' 
 					+'<input type="hidden" id="checkedValue" /></div></div>';           
 				var dd = getDivOne(_html);   
 				var arr = new Array(); //多选时 装答案的数组
 				for(var i= 1; i <= _index ; i++){  
 					if(level < 6){ //单选
	 					$("#Label"+i).click(function(){         
	 						var val = $(this).next().val();   //选择复制给隐藏文本框 
	 						$("#checkedValue").val(val);  
	 						var temp =$(this).prev();
	 						temp.attr("checked","checked");
	 						if(temp.is(":checked")){ 
	 							$(".RadioSelected:not(:checked)").removeClass("RadioSelected");
	 							$(this).addClass("RadioSelected");
	 						}  
	 						 
	 					});   
 					}else{
 					 $("#Label"+i).click(function(){ 
	 						var val = $(this).next().val();  //选择复制给隐藏文本框 
	 						var temp =$(this).prev();
	 						var ch_val = $("#checkedValue").val();
	 						if(ch_val.indexOf(val) != -1){
	 						  temp.removeAttr("checked");   
	 						}else{
	 						  temp.attr("checked","checked");  
	 						} 
	 						if(temp.is(":checked")){  
	 							$(this).addClass("RadioSelected");  
	 							arr.push(val); 
	 						}else{
	 							$(this).removeClass("RadioSelected");  
	 							removeArr(arr,val)
	 						}
	 						var result = "";
	 						var arr_temp = unique(arr);
	 						for(var i in arr_temp){
	 							result+=arr_temp[i]+",";  
	 						}
	 						if(result.length > 0){
	 							result = result.substring(0,result.length-1); 
	 						}
	 						$("#checkedValue").val(result);         
 					 });     
 					}
 				} 
 				
 				
 				//30秒后超时发送请求给后台  
 				if(timer){
 					clearInterval(timer);  
 				} 
 				timer = window.setInterval(function(){ 
 					run(treasure_id,dd); 
 				}, 1000);        
 				
 				//绑定提交事件 
 				$("#summitAnswer").unbind("click").bind("click",function(){    
 					var checkedValue = $("#checkedValue").val();
 					if(checkedValue.length == 0){
 						alert("请选择选项!"); 
 						return;
 					}
 					dd.close();   
 					getIsAnswer(question_id,treasure_id,checkedValue,isMul);     
 				 	
 				});   
 			 }else if(data.state == "3002"){ //不能越级挑战宝箱
 				 var _html = 
 				'<div class="dialogmain" >' +
 				'<div class="closea"></div>' +
 					'<div class="dialogfirst">' +
 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">请不要越级挑战宝箱~</span></span></h2>'+
 				    '</div>'+
 				'</div>';  
 				getDivOne(_html);  
 			 }else if(data.state == "3001"){
 				var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">您今天已闯关!</span><br /></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 				getDivOne(_html);    
 			 }else if(data.state == '1001'){
 				var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">加载题目失败</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 				getDivOne(_html);
 			 }else if(data.state == '3004'){
 				var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">此宝箱已经开启</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 		    getDivOne(_html);       
 			 }else if(data.state == '3003'){  
 				var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">答题时间已到</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 		    getDivOne(_html);  
 			 }else if(data.state == '1009'){    
 	 				AA.RapidLogin.popup();
 			 }else if(data.state == '3033'){
 			 	var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">不符合参加条件</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 		    getDivOne(_html);  
 	 		}else if(data.state == '4001'){
 			 	var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">今日活动已结束</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 		    getDivOne(_html);  
 			 }else if (data.state == '1010') {
 			 	var _html = 
 	 				'<div class="dialogmain" >' +
 	 				'<div class="closea"></div>' +
 	 					'<div class="dialogfirst">' +
 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">活动已经结束了哦</span></span></h2>'+
 	 				    '</div>'+
 	 				'</div>';  
 	 		    getDivOne(_html);  
 			 }
 		}      
    });   
}

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
} 

function removeArr(arr,val){
	var index = -1;
	for (var i = 0; i < arr.length; i++) {  
        if (arr[i] == val){
        	index =  i;  
        	break;
        } 
    }  
	arr.splice(index, 1);   
}

/**
 * 绑定30秒后失效
 */
function run(_level,_dd){
	var s = document.getElementById("second");
	if(s.innerHTML == 0){
	  //发送请求到后台 告诉此题目已经超时
	  isTimeout(_level);
	  _dd.close();  //关闭以前的窗口     
	  return false;  
	}
	s.innerHTML = s.innerHTML * 1 - 1;   
}

/**
 * 题目层的div
 */
function getDivOne(_html){
	var dd = $.popup1({
        title:'' ,
        width:'341',
        padding:'0',
        content:_html,   
        init:function (d) {  
     	  
        }
	}); 
	$('.d-dialog').css('background','none');
    $('.d-dialog').css('border','none') 
	//绑定关闭事件 
	$(".closea").bind("click",function(){
		dd.close();   
	});
	$(".treasub03").bind("click",function(){
		dd.close();
	});   
	//去掉IE 360浏览器不兼容的层样式
	$(".d-content").addClass("backcolor");
	$(".d-nw,.d-n,.d-ne,.d-sw,.d-s,.d-se,.d-w,.d-c,.d-e").addClass("backcolor2");
	return dd;   
}
/**
 * 提交问题
 */
function getIsAnswer(question_id,treasure_id,option_id,_isMul){ 
	clearInterval(timer);//提交答案  结束倒计时
	 $.ajax({
	 		url : '/v2/treasure/get_is_answer.jso',        
	 		type : 'post', 
	 		data:{questionId:question_id,optionIds:option_id,treasureId:treasure_id,isMul:_isMul},      
	 		dataType : 'json', 
	 		success : function(data) {
	 			
	 			var isAnswer = data.isAnswer;  
	 			if(isAnswer == 0){
	 				$("#level_"+treasure_id).html(failCss);    
	 				var _html = 
	 	 				'<div class="dialogmain" >' +
	 	 				'<div class="closea"></div>' +
	 	 					'<div class="dialogfirst">' +
	 	 				    '<h2 class="shibai"><span class="picfont pic01"><img src="/s/images/action/treasure/treasure/09.png" /></span><span class="picfont">很抱歉，<span class="red">您闯关失败!</span><br /></span></h2>'+
	 	 				    '</div>'+
	 	 				'</div>';  
	 	 			getDivOne(_html);
	 			}else if(isAnswer == 1){
	 				var reward = data.reward;
	 				var _html  = "";
	 				//通过图标显示
	 				$("#level_"+treasure_id).html(throughCss);     
	 				if(treasure_id == 5){  
	 				  _html = '<div class="dialogmain" >'
	 					 +'<div class="closea"></div>'
	 					+'<div class="dialogseven dialogfirst">'
	 					+'<h2>恭喜您成功<span class="red">闯过第'+getResult(treasure_id)+'关</span>，获得'+reward+'！</h2>' 
	 					+'<h2>勇士，接下来的挑战会更难，每道题目都有<span class="red">一个或一个以上的正确答案</span>，选多或者选少都视为错误，您敢挑战吗？</h2>'
	 				   +' </div>'
	 				    +'<div class="popsub"><a href="javascript:void(0)" class="treasub01">继续闯关</a><a href="javascript:void(0)" class="treasub02">领奖退出</a></div>'
	 				  '</div>' ;  
 					}else if(treasure_id == 9){
 						endAnswer(treasure_id);  
 						 var _html = '<div class="dialogmain" >'
                  		   +'<div class="closea"></div>'
                  		   +'<div class="dialogfirst dialoghl">'
                  		   +'<h2>恭喜您通关成功！您获得<span class="red">'+reward+'</span>，</br>将在下一个工作日内发放给您！</h2>' 
                  		   +'</div>'
                  		   +'<div class="popsub"><a href="javascript:void(0)" class="treasub03" id="comfirm">确定</a></div>' 
                  		   +'</div>';
                  	    var ddd=getDivOne(_html);  
	                  	$("#comfirm").unbind("click").bind("click",function(){
               			  ddd.close();
               		    });  
 					}else if(treasure_id <5 && treasure_id >0){
 						_html = 
	 					'<div ><div class="dialogmain"  > <div class="closea"></div><div class="dialogfirst">'
	 				    +'<h2>恭喜您成功<span class="red">闯过第'+getResult(treasure_id)+'关</span>，获得'+reward+'！</h2> </div>'
	 				    +'<div class="popsub"><a href="javascript:void(0)" class="treasub01">继续闯关</a><a href="javascript:void(0)" class="treasub02">领奖退出</a></div></div> </div> ';
 					}else{  
	 				  _html = 
	 					'<div ><div class="dialogmain"  > <div class="closea"></div><div class="dialogfirst">'
	 				    +'<h2>恭喜您成功<span class="red">闯过第'+getResult(treasure_id)+'关</span>，<br/>获得'+reward+'！</h2> </div>'
	 				    +'<div class="popsub"><a href="javascript:void(0)" class="treasub01">继续闯关</a><a href="javascript:void(0)" class="treasub02">领奖退出</a></div></div> </div> ';
	 			    }
	 	 			var dd = getDivOne(_html);     
	 	 		    //绑定继续闯关事件 
	 				$(".treasub01").unbind("click").bind("click",function(){     
	 					dd.close();
	 					if(treasure_id < 9){
	 					    getQuestion(parseInt(treasure_id)+1);   //继续闯关  下一道题目
	 					}  
	 				});  
	 				// 绑定领奖退出事件  
                    $(".treasub02").unbind("click").bind("click",function(){      
                    	endAnswer(treasure_id);  
                    	if(treasure_id < 5){ //积分
                    		var _html = '<div class="dialogmain" >'
                    			+'<div class="closea"></div>'
                    			+'<div class="dialogfirst">'
                    			+'<h2>恭喜获得<span class="red">'+reward+'</span>，</br>将在下一个工作日发放给您！</h2>'
                    			+'</div>'
                    			+'<div class="popsub"><a href="javascript:void(0)" class="treasub03" id="comfirm">确定</a></div>' 
                    			+'</div>'; 
                    		var ddd = getDivOne(_html);     
                    		$("#comfirm").unbind("click").bind("click",function(){
                    			ddd.close();
                    		});
                    	}else{//礼金  
                    	   var _html = '<div class="dialogmain" >'
                    		   +'<div class="closea"></div>'
                    		   +'<div class="dialogfirst dialoghl">'
                    		   +'<h2>恭喜获得<span class="red">'+reward+'</span>，将在下一个工作日发放给您！</h2>'
                    		   +'</div>'
                    		   +'<div class="popsub"><a href="javascript:void(0)" class="treasub03" id="comfirm">确定</a></div>' 
                    		   +'</div>';
                    	   var ddd = getDivOne(_html);  
                    	   $("#comfirm").unbind("click").bind("click",function(){
                   			  ddd.close();
                   		   });  
                    	}
	 					dd.close();         
	 				});
	 			}else if(data.state == 1009){
	 				var _html = 
		 				'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   '<h3>很抱歉，<span class="red">回答时间已过!<br />'+
		 			'</span></h3>'+ 
		 			    '</div>'+  
		 			'</div>';
		 			getDivOne(_html);         
	 			}else if (data.state == 1010) {
	 				var _html = 
		 				'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   '<h3>很抱歉，<span class="red">题目已失效，请刷新页面后重新获取'+
		 			'</span></h3>'+ 
		 			    '</div>'+  
		 			'</div>';
		 			getDivOne(_html); 
	 			}else{
	 				var _html = 
		 				'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   '<h3>很抱歉，<span class="red">系统繁忙，请重试'+
		 			'</span></h3>'+ 
		 			    '</div>'+  
		 			'</div>';
		 			getDivOne(_html);          
	 			}
	 		}      
	 });        
}

/**
 * 结束活动
 */
function endAnswer(_level){
	 $.ajax({
	 		url : '/v2/treasure/get_reward.jso',        
	 		type : 'post', 
	 		data:{level:_level},   
	 		dataType : 'json', 
	 		success : function(data) {
	 			if(_level==9){

	 			} else {
	 			var _html = 
		 			'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 			'<div class="dialogfirst chenggong">'+
		 			'<img src="/s/images/action/treasure/treasure/10.png" width="115" height="71" />'+
		 			'<h3>恭喜<span class="red">您闯关成功啦~<br /> '+ 
		 			'</span></h3>'+ 
		 			'</div>'+
		 			'</div>';
	 	 			getDivOne(_html);   
	 			}
	 			
	 		}      
	 });        
}

/**
 * 回答超时
 * @param _level
 */
function isTimeout(_level){
	 $.ajax({
	 		url : '/v2/treasure/get_is_timeout.jso',        
	 		type : 'post', 
	 		data:{level:_level},   
	 		dataType : 'json', 
	 		success : function(data) {  
	 			clearInterval(timer);
	 			if(data.state==0){
		 			var _html = 
		 				'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   '<h3>很抱歉，<span class="red">回答时间已过!<br />'+
		 			'</span></h3>'+ 
		 			    '</div>'+  
		 			'</div>';
		 			getDivOne(_html);     
	 			}else {
	 				var _html = 
		 				'<div class="dialogmain" >'+
		 			'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   '<h3>很抱歉，<span class="red">系统繁忙，请重试'+
		 			'</span></h3>'+ 
		 			    '</div>'+  
		 			'</div>';
		 			getDivOne(_html);   
	 			} 
	 		}      
	 });        
}
/**
 * 获取奖励
 */
function getTreasureReward(){
	 $.ajax({
	 		url : '/v2/treasure/get_user_treasure_reward.jso',        
	 		type : 'post', 
	 		dataType : 'json', 
	 		success : function(data) {  
	 			if (data.state==0) {
	 				var score=new Array();
	 				score[1]="无";
	 				score[2]="无";
	 				score[3]="无";

	 				for (var i = 0; data.treasureReward.length > i; i++) {

	 					if (data.treasureReward[i].isRightNum ==data.treasureReward[i].count) {
	 						if (data.treasureReward[i].cTime=="2017-02-27") {
	 							score[1]=getRewardByCount(data.treasureReward[i].count);	
	 						}else if (data.treasureReward[i].cTime=="2017-02-28") {
	 							score[2]=getRewardByCount(data.treasureReward[i].count);	
	 						}else if (data.treasureReward[i].cTime=="2017-03-01") {
	 							score[3]=getRewardByCount(data.treasureReward[i].count);	
	 						}
	 						
	 					}
	 				}
	 				var _html = 
						'<div class="dialogmain">'
						+'<div class="closea"></div>'
						+'<div class="popdialog dialog_table">'
						+'<table width="100%" border="0" cellspacing="0" cellpadding="0">'
						+'<thead>'
						  +'<tr>'
						    +'<th align="center">日期</th>'
						    +'<th align="center">奖品</th>'
						  +'</tr>'
						  +'</thead>'
						  +'<tbody>'
						  +'<tr>'
						    +'<td align="center">2017/2/27</td>'
						    +'<td align="center">'+score[1]+'</td>'
						  +'</tr>'
						  +'<tr>'
						    +'<td align="center">2017/2/28</td>'
						    +'<td align="center">'+score[2]+'</td>'
						  +'</tr>'
						  +'<tr>'
						    +'<td align="center">2017/3/01</td>'
						    +'<td align="center">'+score[3]+'</td>'
						  +'</tr>'
						  +'</tbody>'
						+'</table>'
						+'</div>'
						+'</div>';

						getDivOne(_html);  
					}else if (data.state=='1009') {
						AA.RapidLogin.popup();
					}else {
						var _html = 
		 				'<div class="dialogmain" >'+
		 				'<div class="closea"></div>'+
		 				'<div class="dialogfirst chenggong">'+
		 			    '<img src="/s/images/action/treasure/treasure/09.png" />'+ 
		 			   	'<h3>很抱歉，<span class="red">系统繁忙，请重试'+
		 				'</span></h3>'+ 
		 			    '</div>'+  
		 				'</div>';
							wBox.close();
			 				getDivOne(_html);   	
					}

	 		}      
	 });        
}
/**
 * 根据答题数 获取奖励
 * @param _level
 */
function getRewardByCount(count){
	switch(count){
		case 1:
		return 1000+"积分";break;
		case 2:
		return 2000+"积分";break;
		case 3:
		return 3000+"积分";break;
		case 4:
		return 4000+"积分";break;
		case 5:
		return 5000+"积分";break;
		case 6:
		return 5000+"积分+"+10+"礼金";break;
		case 7:
		return 5000+"积分+"+30+"礼金";break;
		case 8:
		return 5000+"积分+"+50+"礼金";break;
		case 9:
		return 10000+"积分+"+100+"礼金";break;



	}
}

function getResult(num){
	if(num == 1){
		return "一";
	}else if(num ==2){
		return "二";
	}else if(num ==3){
		return "三";
	}else if(num ==4){
		return "四";
	}else if(num ==5){
		return "五";
	}else if(num ==6){
		return "六";
	}else if(num ==7){
		return "七";
	}else if(num ==8){
		return "八";
	}else if(num ==9){
		return "九";
	}
	return ""; 
}

















