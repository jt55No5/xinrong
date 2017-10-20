/**
 * Created by HOOPER on 2017/1/17.
 */
var $XR_Calculator;
(function(){
    $this = {
        money:undefined,
        vip:undefined,
        deadline:undefined,
        yearRate:undefined,
        investRepayType:undefined,
        ajaxCounter:0,
        init:function () {
            this.getUserInfo();
            this.calculateBtnEvent();
            this.investRepayTypeEvent();
            document.onkeydown = this.onKeyDown;
        },
        getUserInfo:function () {
            $.ajax({
                url: '/v2/login/in_session_data.jso',
                type: 'GET',
                dataType: 'json',
                success: function (rs) {
                    if(rs.state == 0){
                        if(rs.vip){
                           var li = $("#vipRankSelect li")[rs.vip];
                            if(li)
                               $(li).find("a").click();
                        }
                    }
                }
            })
        },
        calculateBtnEvent:function () {
            $("#calculatorSubmit").on("click",function () {
              if($this.validate()) {
                  $this.ajaxCounter = 0;
                  var ajaxListener = setInterval(function(){
                      $("#calculatorSubmit").addClass("disabled");
                      if($this.ajaxCounter == 2){
                          window.clearInterval(ajaxListener);
                          $("#calculatorSubmit").removeClass("disabled");
                      }
                  },10);
                  $this.getInvestPlans();
                  $this.getLoanPlans();
              }
            })
        },
        investRepayTypeEvent:function () {
            $('select[name="investRepayType"]').on("change",function () {
                $this.investRepayType = $('select[name="investRepayType"]').val();
                $this.validate();
                $this.getInvestPlans();
            })
        },
        onKeyDown:function (e) {
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                $("#calculatorSubmit").click();
                return false;
            }
            return true;
        },
        validate:function () {
            var result = true;
            if( $("#calculatorSubmit").hasClass("disabled")){
                result = false;
            }
            this.money = $('input[name="investMoney"]').val();
            this.vip = $('#vipRank').attr("data");
            this.deadline = $('input[name="deadline"]').val();
            this.yearRate = $('input[name="yearRate"]').val();
            this.investRepayType = $('select[name="investRepayType"]').val();
            var r =  /^\+?[1-9][0-9]*$/;
            if(r.test(this.money) && this.money >= 100){
                $($('input[name="investMoney"]').siblings(".f-tips")[0]).css("visibility","hidden");
            }else{
                $($('input[name="investMoney"]').siblings(".f-tips")[0]).css("visibility","visible");
                result = false;
            }
            if(this.money  <= 1000000000){
                $($('input[name="investMoney"]').siblings(".f-tips")[0]).show();
                $($('input[name="investMoney"]').siblings(".f-tips")[1]).css("visibility","hidden");
                $($('input[name="investMoney"]').siblings(".f-tips")[1]).hide();
            }else{
                $($('input[name="investMoney"]').siblings(".f-tips")[0]).hide();
                $($('input[name="investMoney"]').siblings(".f-tips")[1]).css("visibility","visible");
                $($('input[name="investMoney"]').siblings(".f-tips")[1]).show();
                result = false;
            }
            if(!this.vip){
                $("#vip-f-tips").css("visibility","visible");
                result = false;
            }else{
                $("#vip-f-tips").css("visibility","hidden");
            }
            if(r.test(this.deadline) && this.deadline >= 1 && this.deadline <= 48){
                $('input[name="deadline"]').siblings(".f-tips").css("visibility","hidden");
            }else{
                $('input[name="deadline"]').siblings(".f-tips").css("visibility","visible");
                result = false;
            }
            if(this.yearRate >= 1 && this.yearRate <= 20){
                $('input[name="yearRate"]').siblings(".f-tips").css("visibility","hidden");
            }else{
                $('input[name="yearRate"]').siblings(".f-tips").css("visibility","visible");
                result = false;
            }
            var yearRateStr = this.yearRate.toString().split(".")[1];
            if(yearRateStr){
                if(yearRateStr.length > 2){
                    $('input[name="yearRate"]').siblings(".f-tips").css("visibility","visible");
                    result = false;
                }
            }
            return result;
        },
        getLoanPlans:function () {
            $.ajax({
                url:"/v2/tools/calc_loan_plan.jso",
                type:'post',
                dataType:'json',
                data:{investMoney:this.money,
                    vip:this.vip,
                    yearRate:this.yearRate,
                    deadline:this.deadline},
                success:function (result) {
                    if(result.state == 0){
                        $("#loanTotalCost").text(result.totalCost);
                        $("#loanInterest").text(result.interest);
                        $("#manageTax").text(result.manageTax);
                        $("#riskReserve").text(result.riskBond);
                        if($this.vip > 0){
                            $("#loanGrowPointBlock").show();
                            $("#loanGrowPoint").text(result.growPoints);
                        }else{
                            $("#loanGrowPointBlock").hide();
                        }
                        $("#loanScore").text(result.score);
                        $("#loanPlan").html("");
                        $(result.plans).each(function (i,e) {
                            if( i % 2 == 0){
                                var tr = '<tr  class="bg"><td>'+e.period+'</td><td>'+e.money+'</td><td>'+e.interest+'</td><td>'+e.moneyWithInterest+'</td></tr>';
                                $("#loanPlan").append(tr);
                            }else{
                                var tr = '<tr><td>'+e.period+'</td><td>'+e.money+'</td><td>'+e.interest+'</td><td>'+e.moneyWithInterest+'</td></tr>';
                                $("#loanPlan").append(tr);
                            }
                        })
                    }
                    if(result.state == 1001){
                        $($('input[name="investMoney"]').siblings(".f-tips")[0]).hide();
                        $($('input[name="investMoney"]').siblings(".f-tips")[1]).css("visibility","visible");
                        $($('input[name="investMoney"]').siblings(".f-tips")[1]).show();
                    }
                    $this.ajaxCounter++;
                }
            })
        },
        getInvestPlans:function () {
            $.ajax({
                url:"/v2/tools/calc_repay_plan.jso",
                type:'post',
                dataType:'json',
                data:{investMoney:this.money,
                    vip:this.vip,
                    yearRate:this.yearRate,
                    investRepayType:this.investRepayType,
                    deadline:this.deadline},
                success:function (result) {
                    if(result.state == 0){
                        $("#totalIncome").text(result.totalIncome);
                        $("#actualIncome").text(result.actualIncome);
                        $("#serviceTax").text(result.totalServiceTax);
                        if($this.vip > 0){
                            $("#investGrowPointBlock").show();
                            $("#investGrowPoint").text(result.growPoints);
                        }else{
                            $("#investGrowPointBlock").hide();
                        }
                        $("#investScore").text(result.score);
                        $("#investPlan").html("");
                        if($this.investRepayType == 2){
                            $(result.plans).each(function (i,e) {
                                if( i  == (result.plans.length - 1)){
                                    var tr = '<tr class="bg"><td>'+e.period+'</td><td>'+e.incomeRetain+'</td><td>'+e.money+'</td><td>'+e.interest+'</td> ' +
                                        '<td>'+e.income+'</td> <td>'+e.serviceTax+'</td></tr>';
                                    $("#investPlan").append(tr);
                                }
                            })
                        }else {
                            $(result.plans).each(function (i,e) {
                                if( i % 2 == 0){
                                    var tr = '<tr class="bg"><td>'+e.period+'</td><td>'+e.incomeRetain+'</td><td>'+e.money+'</td><td>'+e.interest+'</td> ' +
                                        '<td>'+e.income+'</td> <td>'+e.serviceTax+'</td></tr>';
                                    $("#investPlan").append(tr);
                                }else{
                                    var tr = '<tr><td>'+e.period+'</td><td>'+e.incomeRetain+'</td><td>'+e.money+'</td><td>'+e.interest+'</td> ' +
                                        '<td>'+e.income+'</td> <td>'+e.serviceTax+'</td></tr>';
                                    $("#investPlan").append(tr);
                                }
                            })
                        }
                    }
                    if(result.state == 1001){
                        $($('input[name="investMoney"]').siblings(".f-tips")[0]).hide();
                        $($('input[name="investMoney"]').siblings(".f-tips")[1]).css("visibility","visible");
                        $($('input[name="investMoney"]').siblings(".f-tips")[1]).show();
                    }
                    $this.ajaxCounter++;
                }
            })
        }
    }
    $XR_Calculator = $this;
})();