//popup init
var PopupConfig;
var normalView='<li id="12"><a href="javascript:PopupConfig.showPopup(0)"><img src="images/vip/invest_1.png"><span>自动投资</span></a></li>'+
                    '<li id="13"><a href="javascript:PopupConfig.showPopup(8)"><img src="images/vip/invest_9.png"><span>日投资上限</span></a></li>'+
                    '<li id="14"><a href="javascript:PopupConfig.showPopup(11)"><img src="images/vip/service_2.png"><span>日提现上限</span></a></li>'+
                    '<li id="15"><a href="javascript:PopupConfig.showPopup(13)"><img src="images/vip/service_4.png"><span>小积分抽大奖</span></a></li>'+
                    '<li id="16"><a href="javascript:PopupConfig.showPopup(12)"><img src="images/vip/service_3.png"><span>充话费得积分</span></a></li>'+
                    '<li id="17"><a href="javascript:PopupConfig.showPopup(15)"><img src="images/vip/service_6.png"><span>推荐奖励</span></a></li>'+
                    '<li id="18"><a href="javascript:PopupConfig.showPopup(7)"><img src="images/vip/invest_8.png"><span>投资服务费</span></a></li>'+
                    '<li id="19"><a href="javascript:PopupConfig.showPopup(18)"><img src="images/vip/borrow_2.png"><span>提现费</span></a></li>'+
                    '<li id="20"><a href="javascript:PopupConfig.showPopup(19)"><img src="images/vip/borrow_3.png"><span>风险准备金</span></a></li>';
 var vipView='<li id="1"><a href="javascript:PopupConfig.showPopup(1)"><img src="images/vip/invest_2.png"><span>个人投资月报</span></a></li>'+
                    '<li id="3"><a href="javascript:PopupConfig.showPopup(4)"><img src="images/vip/invest_5.png"><span>债权转让</span></a></li>'+
                    '<li id="4"><a href="javascript:PopupConfig.showPopup(5)"><img src="images/vip/invest_6.png"><span>生日礼金</span></a></li>'+
                    '<li id="5"><a href="javascript:PopupConfig.showPopup(2)"><img src="images/vip/invest_3.png"><span>成长值</span></a></li>'+
                    '<li id="6"><a href="javascript:PopupConfig.showPopup(6)"><img src="images/vip/invest_7.png"><span>节日礼金</span></a></li>'+
                    '<li id="7"><a href="javascript:PopupConfig.showPopup(9)"><img src="images/vip/invest_10.png"><span>投资赠积分</span></a></li>'+
                    '<li id="8"><a href="javascript:PopupConfig.showPopup(10)"><img src="images/vip/service_1.png"><span>朵朵来电</span></a></li>'+
                    '<li id="9"><a href="javascript:PopupConfig.showPopup(14)"><img src="images/vip/service_5.png"><span>积品汇折扣</span></a></li>'+
                    '<li id="10"><a href="javascript:PopupConfig.showPopup(16)"><img src="images/vip/service_7.png"><span>被推荐人升级购/VIP奖</span></a></li>';  
var extRightView= '<li id="2"><a href="javascript:PopupConfig.showPopup(3)"><img src="images/vip/invest_4.png"><span>升级奖励</span></a></li>';                                
(function(){
  var $this = {
    box : $("#privilege_box"),
    list : $("#privilege_list"),
    popupWin : $("#popup_window"),
    fadingTime : 300,
    popups : $("#popup_ul li"),
    pageCount : 6,
    timer : null,
    aniTime : 2000,
    interval : 6000,
    init : function(){
      $this.initVipInfo();
      $this.getAnswerInfo();
      $this.bindClick();
    },
    showPopup : function(index){
      $this.popups.eq(index).show();
      $this.popupWin.fadeIn($this.fadingTime);
    },
    scrolling : function(){
      var ele = "",
          len = $this.list.find("li").eq(0).width();

      var scrollFunc = function(){
        $this.list.animate({"margin-left":-len*$this.pageCount},$this.aniTime,"linear",function(){
          for(var k=0;k<$this.pageCount;k++){
            ele = ele +  "<li>" + $this.list.find("li").eq(k).html() + "</li>";
          }
          for(var k=0;k<$this.pageCount;k++){
            $this.list.find("li").eq(0).remove();
          }
          $this.list.css("margin-left",0);
          $this.list.append(ele);
          ele = "";
        });
      };
      $this.timer = setInterval(function(){scrollFunc()},$this.interval);
      
      $this.box.on("mouseover",function(){clearInterval($this.timer);});
      $this.box.on("mouseleave",function(){
        //scrollFunc();
        $this.timer = setInterval(function(){scrollFunc()},$this.interval);
      });

      $("#popup_close").on("click",function(){
        $this.popupWin.fadeOut($this.fadingTime);
        $this.popups.hide();
      });
    },
    initVipInfo:function(){
      $.ajax({
        url : '/v2/xincunbao/get_index_info.jso', 
        type : 'post',
        dataType : 'json',
        success : function(result) {
          if (result.state == 0) {
             $('#login_box').hide();
          if (result.vip == 0) {
            $('#normal_box').show();
            $('#privilege_box').hide();
            //normalView少于2页时重复添加
            var regex = new RegExp('</li>','g');
            var result = normalView.match(regex);
            var count = !result ? 0 : result.length;
            if(count<$this.pageCount*2){
              var t = Math.ceil($this.pageCount*2/count);
              for(var k=0;k<t;k++){
                normalView += normalView;
              }
            };
            //
            $('#privilege_list').append(normalView);
            $this.box.show();
            $this.scrolling();
              return;
          }
          if (result.vip >1) {
            $('#privilege_list').append((vipView+extRightView+normalView));
          }else if (result.vip ==1) {
            $('#privilege_list').append((vipView+normalView));
          }
          $this.box.show();
          $this.scrolling();
          var vipDeadLine = new Date(result.vipDeadLine * 1000);
          $.ajax({
            url : '/vip/get_vip_info', 
            type : 'post',
            dataType : 'json',
            success : function(result) { 
              if(result.state == 1){
                if (result.data.vip > 0 && result.data.vip !=9) {
                  var cur_grow = result.data.cur_grow;
                  var next_grow = result.data.next_grow;
                  var one = result.data.one;
                  var two = result.data.two;
                  
                  var growProgress;
                  if(cur_grow > 0){
                    growProgress = Math.floor(parseFloat(""+cur_grow)/next_grow*100);
                  }else{
                    growProgress = 0;
                  }
                  var cha=(next_grow-cur_grow);
                  //var upLevelGrow = AA.Helper.toCent((next_grow - cur_grow)/10000);
                  if(cha > 100){
                    var cha_add = cha % 100;  
                    if(cha_add > 0){
                      cha = cha + 100 - cha_add;
                    }
                  }
                  var upLevelGrow = $this.growthChange(cha);
                  // var curGrow = $this.growthChange(cur_grow);
                  // var nextGrow = $this.growthChange(next_grow);
                  // $('#cur_points').html(XR.Tool.formatDecimals(curGrow)+'万');
                  // $('#need_all_points').html(XR.Tool.formatDecimals(nextGrow)+'万');
                  // $('#next_grade').html(vip+1);
                  // $("#progress_bar").css("width",growProgress+"%");
                  // $('#need_rest_points').html(XR.Tool.formatDecimals(upLevelGrow)+'万');
                  // $('#vip_level').html(vip);
                  // $('#deadline').html(vipDeadLine.Format('yyyy-MM-dd'));
             //登录后为VIP用户 
                  
                   $("#vip_box").show();
                   $("#vip_current").html("VIP"+result.data.vip);
                   $("#vip_upgrade_point").html(upLevelGrow+"万点");
                   $("#vip_next").html("VIP"+(parseInt(result.data.vip)+1));
                   $("#vip_deadline").html(vipDeadLine.Format('yyyy-MM-dd'));
                }else {
                  $('#vip_box').hide();
                  $('#vip_box9').show();
                  $("#vip_deadline9").html(vipDeadLine.Format('yyyy-MM-dd'));
                }
                
              }else{
                if(result.state == -1 && result.error == 1009){
                  
                }
              }
            }
          })
          }
        }
      })
    },
    growthChange :function(cha){
      if(cha>=10000){
        var upLevelGrow1 = (cha/10000);
        upLevelGrow=Math.round(upLevelGrow1*Math.pow(10,2))/Math.pow(10,2);
      }else{
        upLevelGrow = AA.Helper.toCent(cha/10000);
      }
      return upLevelGrow;
    },
    getAnswerInfo:function (){
      $.ajax({
        url : '/v2/member/get_vip_level_question_info.jso', 
        type : 'post',
        dataType : 'json',
        success : function(result) {
            if (result.state==1) {
              $('#example').hide();
              $('#question').show();
              $this.bindClick(); 
            }
          }
       })
    },
    bindClick:function(){
      $('#ques_submit').bind('click',function(){
        isContinue=true;
          var answer1=$('#answer1').val().trim();
          var answer2=$('#answer2').val().trim();
          var answer3=$('#answer3').val().trim();
          var input=$('.question span input');
          $.each(input ,function(){
            if (this.value==""||this.value==null||isNaN(this.value)) {
              $('#errMsg').html("您提交的答案格式有误");
              $('#errMsg').show();
              isContinue=false;
              return;
            }
          })
          if (isContinue==false) return;
          var answers=answer1+","+answer2+","+answer3;
          $('#errMsg').hide();
          $this.commitAnswer(answers);

      });
    },
    commitAnswer:function(answers){
      $.ajax({
        url : '/v2/member/commit_user_vip_question_info.jso', 
        type : 'post',
        dataType : 'json',
        data:{answer:answers},
        success : function(result) {
          if (result.state == 0) {
            $('#pop_right').show();
          }else if (result.state == 1) {
            $('#pop_wrong').show();
          }else if (result.state== 1011) {
            $('#errMsg').html("您已经回答过了");
            $('#errMsg').show();
          }else {
            $('#errMsg').html("不符合参与条件");
            $('#errMsg').show();
          }
         
        }
      })
    }
  };
  PopupConfig = $this;
   PopupConfig.init();
})();