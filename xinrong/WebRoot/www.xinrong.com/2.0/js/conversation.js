(function(){
  var $this = {
    init : function(){
      $this.carouselInit();
    },
    carouselInit : function(){
      var mList = $("#member_list");
      mList.append("<li>"+mList.find("li").eq(0).html()+"</li>");

      var list = $("#member_list>li"),
          len = list.length,
          index = 0,
          interval = 6000;

      var boxW = $("#member_box").width();
      mList.css("width",boxW*len);
      list.css("width",boxW);
      
      //自动轮播
      /*
      var arr = $("#member_box .arr");

      var arrColor = function(){
        if(index==0){
          arr.eq(0).removeClass("c").siblings().addClass("c");
        }else if(index>=len-1){
          arr.eq(1).removeClass("c").siblings().addClass("c");
        }else{
          arr.each(function(){$(this).addClass("c");});
        }
      };
      */
      //切换
      var switching = function(){
        mList.css("margin-left",-index*boxW);
      };
      var jumpTo = function(mLeft){
        setTimeout(function(){
          mList.addClass("notrans").css({"margin-left":mLeft*boxW});
          setTimeout(function(){
            mList.removeClass("notrans");
          },40);
        },600);
      };
      var jumpTo1 = function(mLeft){
        mList.addClass("notrans").css({"margin-left":mLeft*boxW});
        setTimeout(function(){
          mList.removeClass("notrans");
        },40);
      };
      //自动轮播
      var timer = undefined;
      var startInterval = function(){
        timer = setInterval(function(){
          if(index==len-2){
            index++;
            switching();
            index = 0;
            jumpTo(0);
          }else if(index<len-2){
            index++;
            switching();
          };
        },interval);
      };
      startInterval();
      //点击箭头
      $("#arr_left").on("click",function(){
        clearInterval(timer);
          if(index<=0){
            jumpTo1(-len+1);
            setTimeout(function(){
              index = len-2;
            switching();
            },100);
          }else{
            index--;
            switching();
          }
          startInterval();
      });
      $("#arr_right").on("click",function(){
        clearInterval(timer);
          if(index>=len-1){
            jumpTo1(0);
            setTimeout(function(){
              index = 1;
              switching();
            },100);
          }else{
            index++;
            switching();
          }
          startInterval();
      });
    }
  }
  $this.init();
})();