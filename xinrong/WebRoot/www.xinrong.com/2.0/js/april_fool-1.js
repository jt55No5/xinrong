(function(){
  var $this = {
    init : function(){
      $this.creatPopup();
      $this.load_near_exchange();
      $this.load_vip_discount();
    },
    creatPopup : function(){
      var numFix = function(n,rate){
          var fin = Math.ceil(n*10000*rate/100);
          return fin/100+"万";
      };
      var creatFunc = function(orig){
        var pop = "<div class='popup'><h6>VIP用户享受8~9.8折优惠</h6><table><thead><tr><td>VIP1</td><td>VIP2</td><td>VIP3</td></tr></head>"+
                  "<tbody><tr><td>"+numFix(orig,0.98)+"</td><td>"+numFix(orig,0.98)+"</td><td>"+numFix(orig,0.95)+"</td></tr>"+
                          "<tr><td>VIP4</td><td>VIP5</td><td>VIP6</td></tr>"+
                      "<tr><td>"+numFix(orig,0.92)+"</td><td>"+numFix(orig,0.90)+"</td><td>"+numFix(orig,0.88)+"</td></tr>"+
                          "<tr><td>VIP7</td><td>VIP8</td><td>VIP9</td></tr>"+
                      "<tr><td>"+numFix(orig,0.85)+"</td><td>"+numFix(orig,0.82)+"</td><td>"+numFix(orig,0.80)+"</td></tr></body>";
        return pop;
      };
      var s = $(".module_box .module .item_box .item .item_more .price .vip_info");
      s.each(function(){
        $(this).on("mouseover",function(e){
          var orig = parseFloat($(e.currentTarget).parent().find("li").eq(1).find("b").text());
          $(this).append(creatFunc(orig));
        });

        $(this).on("mouseleave",function(){
          $(this).find(".popup").remove();
        });
      });
    },
    load_near_exchange: function(){
        $.ajax({
            url:AA.Helper.buildUrl('/v2/gift/near_exchange_list.jso'),
            data:{pageSize:15,pageIndex:1,type:0},
            type:'GET' ,
            dataType:'json',
            success:function (result) {
                if(result.state==0){
                    var rs=result.data;
                    $("#scroll_info").html("");
                    if(rs!=undefined){
                        var data=rs.rows;
                        var _html='<ul class="scroll_info" >';

                        for(var i=0;i<data.length;i++){
                            _html +='<li><span>'+data[i].userName+'</span><b>成功兑换 '+data[i].giftName+'</b><span>'+AA.Helper.date(data[i].time, 'm-d h:m:s')+'</span></li>';
                        }
                        _html+='</ul>';

                        $('#scroll_info').html(_html);

                        if(data.length>2){
                            $("#scroll_info").jCarouselLite({auto:5000, speed:1000,visible:2, start:0, scroll:2,start: 0 });
                        }
                    }
                }
            }
        });
     },
      load_vip_discount:function () {
          $.ajax({
              url:AA.Helper.buildUrl('/dumy.txt?t='+new Date().getTime()),
              type:'GET',
              success:function(result){
              },
              complete:function(xhr,ts){
                  var date = new Date(xhr.getResponseHeader('Date'));
                  AA.gift.cur_time=date.getTime();

                  if(typeof sysdateTimer != 'undefined' && sysdateTimer){
                      clearInterval(sysdateTimer);
                  }
                  sysdateTimer = setInterval(function(){
                      AA.gift.cur_time += 1000;
                  },1000);

                  $.ajax({
                      url:AA.Helper.buildUrl('/v2/gift/vip_discount.jso'),
                      data:{},
                      type:'GET' ,
                      dataType:'json',
                      success:function (result) {
                          if(result.state==0){
                             vip_discount=result.data;
                          }
                      }
                  });
              }
          });
      }
    };
   $this.init();
})();

function check_address_input(){
    var _tip=$('#address_error_tip');

    var _province = $('#province option:selected').text();
    var _city = $('#city option:selected').text();
    var _district = $('#district option:selected').text();
    var _address = $.trim($('#address').val());
    //var _consignee_mobile= $.trim($('#consignee_mobile').val());
    //var _consignee_name= $.trim($('#consignee_name').val());
    var _consignee_zip=$.trim($('#consignee_zip').val());

    if (_province == '请选择省份') {
        _tip.addClass('error').html('请选择省份');
        return false;
    } else if (_city == '请选择城市') {
        _tip.addClass('error').html('请选择城市');
        return false;
    } else if (_district == '请选择地区') {
        _tip.addClass('error').html('请选择地区');
        return false;
    } else if (_address == '') {
        _tip.addClass('error').html('请填写详细收货地址');
        return false;
    }/*else if(_consignee_name==''){
     _tip.addClass('error').html('收货人姓名');
     return false;
     } else if(_consignee_mobile==''){
     _tip.addClass('error').html('请填写联系电话');
     return false;
     }*/else if(_consignee_zip==''){
        _tip.addClass('error').html('请输入邮编');
        return false;
    }else if(!/^([\d]{6})$/.test(_consignee_zip)){
        _tip.addClass('error').html('邮编格式错误');
        return false;
    }
    _tip.removeClass('error');
    return true;
}

function get_address_detail(){
    var _province = $('#province option:selected').text();
    var _city = $('#city option:selected').text();
    var _district = $('#district option:selected').text();
    var _address = $.trim($('#address').val());
    //var _consignee_mobile= $.trim($('#consignee_mobile').val());
    //var _consignee_name= $.trim($('#consignee_name').val());
    var _consignee_zip=$.trim($('#consignee_zip').val());

    var addr=_province+','+_city+','+_district+','+_address+','+_consignee_zip+','+_consignee_name+','+_consignee_mobile;

    return addr;
}

function checked_address_option(province,city,district){
    if($('#province [value="'+province+'"]').length == 0){
        return;
    }
    $('#province').val(province);
    $('#province').change();
    if($('#city [value="'+city+'"]').length == 0){
        return;
    }
    $('#city').val(city);
    $('#city').change();
    if($('#district [value="'+district+'"]').length == 0){
        return;
    }
    $('#district').val(district);
}