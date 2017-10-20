
(function(){
  $this = {
    slidingTime : 500,
    init : function(){
      $this.investSel();
    },
    investSel : function(){
      var $all = $("#investAll"),
          $cus = $("#investCus"),
          $box = $("#customMoneyBox");

      $all.bind("click",function(){$box.slideUp($this.slidingTime)});
      $cus.bind("click",function(){$box.slideDown($this.slidingTime)});

      $box.hide();
    }
  };
  $this.init();
})();
var isStartBtnClick = false;

function load_data() {
    AA.Api.async({
        url : '/v2/member/get_auto_invest.jso',
        type : 'GET',
        success : function(result) {

            if (result.state == 0) {

                if (AA.Helper.toFixed(result.data.keepMoney)<=0){
                    $('#investAll').click();
                }else {
                    $('#investCus').click();
                }

                $('#startBtn').html("保存设置");
                $('#closeBtn').removeClass("invalid");

                if (result.data.status == 1) {
                    $('#startBtn').unbind('click').bind('click',function(){
                        isStartBtnClick = false;
                        startAutoInvest(1,function () {
                                $("#error").html("保存成功");
                                setTimeout(function () {
                                    $("#error").html("");
                                },2000);
                        });





                    });
                    $('#closeBtn').unbind('click').bind('click',function(){
                        // $("#error").html("");
                        startAutoInvest();

                    });




                    $('#rate').val(parseFloat(result.data.rate).toFixed(2));
                    $('#customMoney').val(AA.Helper.toFixed(result.data.keepMoney));
                    $('#invest_money').val(AA.Helper.toFixed(result.data.investMoney));

                    var rt_arr = result.data.refundType.split(',');
                    initRefundType(rt_arr);

                    var lt_arr = result.data.loanType.split(',');
                    initLoanType(lt_arr);

                    var ds = result.data.deadline;
                    var ds_arr = ds.split(',');
                    initDeadLineData(ds_arr);

                    $('#status').val(result.data.status);

                    if (result.rank > 0) {
                        $('#rank').html(result.rank);
                    }
                    $("#agreementCheck").attr("disabled","disabled");
                } else {
                    $('#closeBtn').addClass("invalid");
                    $('#startBtn').html("启动自动投资");
                    $('#startBtn').unbind('click').bind('click',function(){
                        //参数为1表示启动
                        startAutoInvest(1);

                    });




                    if(result.data.rate==null||result.data.rate==undefined){
                        $('#rate').val("16.8%");
                    }else{
                        $('#rate').val(parseFloat(result.data.rate).toFixed(2));
                    }
                    $('#customMoney').val(AA.Helper.toFixed(result.data.keepMoney));

                    $('#invest_money').val(AA.Helper.toFixed(result.data.investMoney));

                    var rt_arr = result.data.refundType.split(',');
                    initRefundType(rt_arr);

                    var lt_arr = result.data.loanType.split(',');
                    initLoanType(lt_arr);

                    var ds = result.data.deadline;
                    var ds_arr = ds.split(',');
                    initDeadLineData(ds_arr);

                    $('#status').val(result.data.status);
                    $('#rank').html('—');
                    $("#agreementCheck").removeAttr("disabled");
                }
            } else {
                if(result.state==-1){

                    $('#status').val(0);
                    $('#rate').val("16.8");
                    $('#customMoney').val(0);
                    $('#invest_money').val(0);
                    initDeadLineData(null);
                    initRefundType([1,4,2]);
                    initLoanType([1,2,3]);
                    $('#rank').html('—');
                    $('#startBtn').unbind('click').bind('click',function(){
                                            // $("#error").html("");
                                             startAutoInvest(1);

                                        });
                }else if (result.state == 1009) {
                    // AA.RapidLogin.popup();
                }
            }
        }
    });

    AA.Api.async({
        url: '/v2/xincunbao/get_index_info.jso',
        type: 'GET',
        success: function (result) {

            if(result.money>=0){
                $("#availMoney").html(result.money);
            }
        }
    });


}



function initDeadLineData(ds) {
    if(ds==null){
        initDeadlineOption($('#deadline_begin'), 1);
        initDeadlineOption($('#deadline_end'), 60);
        return;
    }

    if (ds.length > 1) {
        initDeadlineOption($('#deadline_begin'), ds[0]);
        initDeadlineOption($('#deadline_end'), ds[ds.length - 1]);
    } else {
        initDeadlineOption($('#deadline_begin'), ds[0]);
        initDeadlineOption($('#deadline_end'), ds[0]);
    }
}

function initDeadlineOption(select, selected) {
    for ( var i = 0; i <= 60; i++) {
        if((i>24 && i<36)||(i>36 && i<48)||(i>48 && i<60))
        {
        }
        else
        {
            if (i == selected) {
                $(select).append('<option value=' + i + ' selected="selected">' +i+ '个月</option>');
            } else {
                $(select).append('<option value=' + i + '>' + i + '个月</option>');
            }
        }
    }
}

function initRefundType(ts) {
    for ( var i = 0; i < ts.length; i++) {
        $('#rt_' + ts[i]).attr('checked', 'checked');
    }
}
function initLoanType(lt) {
    for ( var i = 0; i < lt.length; i++) {
        $('#lt_' + lt[i]).attr('checked', 'checked');
    }
}




function startAutoInvest(ty,callback) {
    //1 启动自动投资
    // var type=ty||0;

    var isCheck = ty==1?check():true;

    if (ty==1){
        var status = 1;
    }else{
        status = 0;
    }

    if (isCheck) {
        var ds = '';
        var rt = '';
        var lt = '';
        var cus = 0;


        $("input[name='returnType']").each(function() {
            if ($(this).is(":checked") == true) {
                rt += $(this).val() + ",";
            }
        });
        if (rt.length > 1) {
            rt = rt.substr(0, rt.length - 1);
        }

        $("input[name='projectType']").each(function() {
            if ($(this).is(":checked") == true) {
                lt += $(this).val() + ",";
            }
        });
        if (lt.length > 1) {
            lt = lt.substr(0, lt.length - 1);
        }

        var b_ds = parseInt($('#deadline_begin').val());
        var e_ds = parseInt($('#deadline_end').val());

        if(b_ds>e_ds){
            var temp = b_ds;
            b_ds = e_ds;
            e_ds = temp;
        }

        for ( var i = parseInt(b_ds); i <= parseInt(e_ds); i++) {
            ds += i + ",";
        }

        if (ds.length > 1) {
            ds = ds.substr(0, ds.length - 1);
        }




        if($("#investAllRadio").is(':checked')){
            cus = 0;
        }else {
           cus = $('#customMoney').val();
        }
        $invest_money = $('#invest_money').val();
        if ($invest_money==''||$invest_money=='undefined'){
            $invest_money=0;
        }

        conf({
            deadline : ds,
            remind : 0,
            keep : cus,
            investMoney : $invest_money,
            status : status,
            rate : $('#rate').val(),
            refundType : rt,
            loanType : lt
        }, function(result) {
            if (result.state == 0) {

                // var isStart = isStartBtnClick;
                isStartBtnClick=true;
                   load_data();
                  if (isStartBtnClick){

                      if(callback!=null && callback !='undefined'){
                          callback();
                      }
                      isStartBtnClick=false;
                  }

            }else if(result.state==1009){

                history.pushState({state:1}, "Tab 3", "?tab=3");
                AA.RapidLogin.popup(document.referrer+'?tab=3');
                return;
            }

        });
    }
}


function conf(d, s) {
    AA.Api.async({
        url : '/v2/member/set_auto_invest.jso',
        type : 'POST',
        data : d,
        success : s
    });
}

function check() {
    var rt = '';
    var lt = '';

    $("input[name='projectType']").each(function() {
        if ($(this).is(":checked") == true) {
            lt += $(this).val() + ",";
        }
    });

    if (lt == '') {
        $("#error").html("请选择项目类型");
        return false;
    }



    $("input[name='returnType']").each(function() {
        if ($(this).is(":checked") == true) {
            rt += $(this).val() + ",";
        }
    });

    $("#error").empty();
    if (rt == '') {
        $("#error").html("请选择回款方式");
        return false;
    }



    if ($('#rate').val() == '' || Number($('#rate').val()) < 0) {
        $("#error").html("请填写年化率");
        return false;
    }


    if ($('#keep_money').val()=='') {
        $("#error").html("保留余额填写不正确");
        return false;
    }

    if (!$('#agreementCheck').is(':checked')){
        $("#error").html("请阅读并勾选《信融财富平台自动投资授权协议》");
        return false;
    }

    if($("#invest_money").val()%100!=0&&$("#invest_money").val()>0){
        $("#error").html("单笔投资金额必须为100的整数倍，如1100。");
        return false;
    }

    if (parseInt($("#deadline_begin").val())==0&&parseInt($("#deadline_end").val())==0){
        $("#error").html("投资期限选择有误");
        return false;
    }

    return true;
}




