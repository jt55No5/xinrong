var CreditConfig;

var PAGE_SIZE = 8;//四个tab公用

//第二个列表
var TO_RETURN_BEGIN_TIME = '';
var TO_RETURN_END_TIME = '';
var TO_RETURN_TYPE = 1;
var HAVE_INIT_NEXT_REFUND_FIELD = false;

//第三个列表
var BORROW_RECORD_STATUS = -1;
var BORROW_RECORD_TYPE = -1;
var BORROW_RECORD_BEGIN_TIME = '';
var BORROW_RECORD_END_TIME = '';

//第四个列表
var RETURN_RECORD_BEGIN_TIME = '';
var RETURN_RECORD_END_TIME = '';
var RETURN_RECORD_TYPE = 1;


var loanStatus = ['待审核', '审核通过', '审核拒绝', '已确认', '已放弃', '已发布借款项目', '项目筹款成功', '未还款', '逾期中', '已结清', '提前已结清', '逾期已结清'];//后台状态
var loanStatusShow = ['待审核', '待发布', '审核拒绝', '待发布', '已放弃', '筹款中', '放款中', '未还款', '逾期中', '已结清', '提前已结清', '逾期已结清'];//前台显示的状态，待发布的后期(后台状态为用户已确认)，
//用户不能放弃，此阶段视为正在生成借款项目，紧接着系统就会发布项目
var loanStatusNoteShow = ['等待审核', '待发布', '审核拒绝', '待发布', '已放弃', '筹款中', '筹款中', '未还款', '逾期中', '已结清', '提前已结清', '逾期已结清'];
var returnTypeArr = ['', '到期一次性', '等额本息', '等额本金', '按月付息', '到期一次性', '等额本息', '等额本金', '按月付息'];
var returnPlanStatusArr = ['未还款', '逾期中', '已结清', '提前已结清', '逾期已结清'];
var returnPlanList;
var totalPageNum;
var pageSize = 6;//还款计划

var URL = '';
var USER_NAME;
var USER_VIP = 0;

// 未成功的还款 全局变量
var UNSUCCESS_PAGE_SIZE = 5;

var isAuthorize = null;
var UserFillInfomation;


var rechargeMoney = '';
var UrlTab;
(function () {
    var $this = {
        lineWidth: 14,
        strokeColor: "#ccc",
        strokeBgColor: "#f60",
        canvas: $("#canvas")[0],
        initedRecommendUrl: 0,
		UserHasMoblieVoiceCheck:0,
        init: function () {
            $this.getBlackList();
            $.ajax({
                url: '/v2/login/in_session_data.jso',
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        UrlTab = XR.Global.GetUrlParam('tab');
                        if($("#"+UrlTab)){ $("#"+UrlTab).click()}
                        if(result.vip != 0){
                            $("#vip_lv").text("VIP"+result.vip);
                            $(".lv_box.vip").show();
                            $(".lv_box.nor").hide();
                        }else{
                            $(".lv_box.nor").show();
                        }

                        //$this.checkIdentity(result.isAuthIden);
                        $this.getBaseInfo();
                        $this.getScore();
                        $this.getCreditLimit();
                        // getUnrefundMoneyCount();//待还期数和金额 view已经注释 不需要
                        // getLoanCount();//累计借款笔数和金额 view已经注释 不需要
                        $this.getAuditingCredit();//待审核/筹款中
                        // checkUnsuccessLoan();//未成功的借款 没找到view
                        $this.obtainOverdueList(1);//逾期列表 
                        $this.obtainToReturnList(1);//未还款(未还款)查询
                        $this.obtainBorrowRecordList(1);//借款记录
                        // obtainReturnRecordList(1);//还款记录  
                        //
                        $this.bindRefundBtn();//注册我要还款按钮
                        $this.giftLoan(); //积品汇

                        $this.getUserAuthorize();//是否征信授权 申请是做判断，如果没获取到，就要求用户授信

                        // $this.initUShield();//初始化U盾认证信息
                        // $this.showUShieldCallResult();//U盾认证返回结果提示
                        $this.checkUserInfo();
                    } else {
                        $this.creditInit(false);
                        // AA.RapidLogin.popup();
                        $this.filterDeadlineByVip(result.vip);
                        $this.toLogin();
                        return;
                    }
                }
            });
        },
        filterDeadlineByVip:function (vip)
        {
            // 普通用户借款>=6个月，VIP1用户借款>=2个月，VIP2及以上，不限制
            if(vip==0)
            {
                $('#deadline option:eq(1),#deadline option:eq(2),#deadline option:eq(3),#deadline option:eq(4),#deadline option:eq(5)').remove()

            }
            else if(vip==1)
            {
                $('#deadline option:eq(1)').remove()
            }
            else if(vip>1)
            {
                // $('#deadline option:lt(2)').remove()
            }
        },
        toLogin: function () {
            $('#refund_btn').click(function () {
                AA.RapidLogin.popup();
            })
        },
        bindRefundBtn: function () {
            $.ajax({
                type: 'post',
                url: '/v2/onlineloan/get_user_refund_and_overdue_info.jso',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        if (result.overdueCount == 0 && (result.nextRefundInterest == 0 || result.nextRefundInterest == null)) {
                            $('#refund_btn').click(function () {
                                $.dialog({
                                    title: '我要还款',
                                    content: $('#refund_box').html(),
                                    initialize: function () {
                                        var d = this;
                                        $('#refund_box_ok').click(function () {
                                            d.close();
                                        });
                                    }
                                });
                            });
                        } else {
                        	var isEswRecharge = false;
                        	if(result.eswCountSum == result.returnPlanCount){
                        		isEswRecharge = true;
                        	}
                            $.ajax({
                                type: 'post',
                                url: '/v2/member/get_asset_overview.jso',
                                dataType: 'json',
                                success: function (result2) {
                                    if (result.state == 0) {
                                        var accountBalance = Number(result2.accountBalance) + Number(result2.xcbTotalMoney);
                                        
                                        var backFunction = (function(accountBalance){
                                        	$('#refund_btn').click(function () {
                                        		$.dialog({
                                        			title: '我要还款',
                                        			height: 324,
                                        			width: 548,
                                        			content: $('#refund_box2').html(),
                                        			initialize: function () {
                                        				if (result.overdueCount > 0) { //有逾期
                                        					var allRefundMoney = Number(result.overdueSum);//
                                        					$('#all_refund_money').html(formatDecimals(allRefundMoney));
                                        					$('#overdue_money').html(formatDecimals(result.overdueSum));
                                        					$('#account_money').html(accountBalance);
                                        					if (result.overdueSum > accountBalance) { //逾期待还大于账户余额
                                        						rechargeMoney = formatDecimals(Number(allRefundMoney) - accountBalance);
                                        						$('#overdraft_overdue').html(rechargeMoney);
                                        						$('#overdraft_view_3').show();
                                        						$('#refund_btn_view_recharge').show();
                                        						$('#refund_box_recharge').click(function () {
                                        							if(isEswRecharge){
                                        								window.location.href = '/2.0/views/account/esw_recharge.html';
                                        							}else{
                                        								window.location.href = '/my/recharge?money=' + rechargeMoney;
                                        							}
                                        						});
                                        					} else {
                                        						$('#overdraft_view_1').show();
                                        						$('#refund_btn_view_ok').show();
                                        					}
                                        					$('#overdue_money_view').show();
                                        				} else { //没逾期
                                        					var allRefundMoney = result.allUnRefundInterest; //待还金额
                                        					$('#all_refund_money').html(formatDecimals(allRefundMoney));
                                        					$('#refund_date').html(result.nextRefundDate);
                                        					$('#refund_money').html(formatDecimals(result.nextRefundInterest));
                                        					$('#account_money').html(formatDecimals(accountBalance));
                                        					if (Number(allRefundMoney) > Number(accountBalance)) { //待还金额大于账户余额时
                                        						rechargeMoney = formatDecimals(Number(allRefundMoney) - accountBalance); //待还-账户余额
                                        						$('#overdraft_refund').html(rechargeMoney);
                                        						$('#overdraft_view_2').show();
                                        						$('#refund_btn_view_recharge').show();
                                        						$('#refund_box_recharge').click(function () {
                                        							if(isEswRecharge){
                                        								window.location.href = '/2.0/views/account/esw_recharge.html';
                                        							}else{
                                        								window.location.href = '/my/recharge?money=' + rechargeMoney;
                                        							}
                                        						});
                                        					} else {
                                        						$('#overdraft_view_1').show();
                                        						$('#refund_btn_view_ok').show();
                                        					}
                                        					
                                        					$('#refund_money_view').show();
                                        				}
                                        				if(isEswRecharge){
                                        					$('#xcb_money_tip').hide();
                                        				}
                                        				var d = this;
                                        				$('#refund_box_ok,#refund_box_cancel').click(function () {
                                        					d.close();
                                        				});
                                        			}
                                        		});
                                        	});
                                        });
                                        
                                        if(isEswRecharge){
                                        	$.ajax({
                                                type: 'post',
                                                url: '/v2/member/esw_account_info.jso',
                                                dataType: 'json',
                                                success: function (result3) {
                                                	if(result3.state == 0){
                                                		accountBalance = Number(result3.eswRealAvailMoney);
                                                		backFunction(accountBalance);
                                                	}
                                                }
                                        	});
                                        }else{
                                        	backFunction(accountBalance);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
        },
        loan_apply: function (flag) {
            if (isAuthorize == null) {
                var state = $this.getUserAuthorize();
                if (state == 0)
                    setTimeout(function () {
                        $this.loan_apply();
                    }, 500);
                return;
            } else if (isAuthorize == 0) {
                $this.showAuthorize();
                return;
            }
            //判断 当是申请借款按钮触发时 显示加载气泡
            if (typeof(flag) != "undefined" && flag == 1) {
                $("#load_tip").show();
            }
            $.ajax({
                url: '/v2/onlineloan/get_credit_limit_for_loan_apply.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    $("#load_tip").hide();
                    if (result.state == 0) {
                        if (result.leftCreditLimit < 100) {//可用额度不足
                            if (result.totalCreditLimit > 0) {//总额度大于零，只是可用额度不足
                                $.alert({
                                    title: '您的额度不足',
                                    content: '借款金额最低100元，您的可用额度不足。',
                                    txtBtn: '确定',
                                    init: function (d, btn) {
                                        btn.click(function () {
                                            d.close();
                                        });
                                    }
                                });
                                return;
                            } else {//小于或等于零，门槛根本没达到
                                $.alert({
                                    title: '<font style="color:#666666;">可前往合作伙伴</font><font style="color:#333333;">我来贷</font><font style="color:#666666;">借款</font>',
                                    content: '<div><font style="color:#666666;">注：很抱歉，综合VIP等级与芝麻分等条件，</font></div><div style="padding-left: 24px;"><font style="color:#666666;">您暂不符合信融财富借款的条件</font></div>',
                                    txtBtn: '立即前往',
                                    init: function (d, btn) {
                                        btn.click(function () {
                                            d.close();
                                            window.open('https://m.wolaidai.com/staff/index.html?channel=bd_prm_xrp_00000001');
                                        });
                                    }
                                });
                                $this.sendRejectInfoToAli();//把拒贷信息发给阿里 
                                return;
                            }
                        } else {//可用额度足够
                            if (UserFillInfomation < 1) {
                                $.alert({
                                    title: '您尚未完善个人资料',
                                    content: '<span class="orange">友情提示：</span>完善个人资料后才可以申请借款。',
                                    txtBtn: '立即完善',
                                    url: '/2.0/user_information.shtml?callback=' + URL
                                });
                                return;
                            }

                            $.dialog({
                                title: '申请借款',
                                content: $('#box').html(),
                                initialize: function () {
                                    var d = this;
                                    $("#name").html(USER_NAME);
                                    if (USER_VIP == 0) {
                                        $("#vip_tip").show();
                                    }
                                    $("#leftLimit").html(result.leftCreditLimit + " 元");
                                    $("#deadline").bind('change', function () {
                                        var deadline = $("#deadline").val();
                                        if (deadline == -1) {
                                            $("#rate").html("9 % ~ 13.8%");
                                        } else if (deadline <= 1) {
                                            $("#rate").html('9 %');
                                        } else if (deadline == 2) {
                                            $("#rate").html('10.2 %');
                                        } else if (deadline == 3) {
                                            $("#rate").html('11.1 %');
                                        } else if (deadline == 4) {
                                            $("#rate").html('12 %');
                                        } else if (deadline == 5) {
                                            $("#rate").html('12.6 %');
                                        } else if (deadline >= 6 && deadline < 9) {
                                            $("#rate").html('12.9 %');
                                        } else if (deadline >= 9 && deadline < 12) {
                                            $("#rate").html('13.2 %');
                                        } else if (deadline >= 12 && deadline < 24) {
                                            $("#rate").html('13.5 %');
                                        } else {
                                            $("#rate").html('13.8 %');
                                        }
                                        $this.calculateLoanCost();
                                    });

                                    $("#money").bind('blur', function () {
                                        $this.calculateLoanCost();
                                    });
                                    $("#returnType").bind('change', function () {
                                        $this.calculateLoanCost();
                                    });

                                    $("#nextStepBtn").unbind('click').bind('click', function () {
                                        $this.nextStep(d);
                                    });
                                }
                            });
                        }
                    } else if (result.state == 1002) {
                        $.alert({
                            title: '您的手机号尚未经过认证！',
                            content: '为了保护您的资金安全，请先完成手机认证',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1003) {
                        $.alert({
                            title: '您尚未通过实名认证！',
                            content: '为了确定您的真实身份，请先完成实名认证',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1004) {
                        $.alert({
                            title: '您尚未进行银行卡认证',
                            content: '<span class="orange">友情提示：</span>完成银行卡认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1005) {
                        $.alert({
                            title: '您尚未完善个人资料',
                            content: '<span class="orange">友情提示：</span>完善个人资料后才可以申请借款。',
                            txtBtn: '立即完善',
                            url: '/2.0/user_information.shtml?callback=' + URL
                        });
                        return;
                    } else if (result.state == 1007) {
                        $.alert({
                            title: '您尚未进行芝麻认证',
                            content: '<span class="orange">友情提示：</span>通过芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1008) {
                        $.alert({
                            title: '您的芝麻认证已过期',
                            content: '<span class="orange">友情提示：</span>重新进行芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1010) {
                        $.alert({
                            title: '无法获取您的芝麻分',
                            content: '<span class="orange">友情提示：</span>很遗憾，暂时无法获取到您的芝麻分，过段时间再来申请借款吧！',
                            txtBtn: '关闭',
                            init: function (d, btn) {
                                btn.click(function () {
                                    d.close();
                                });
                            }
                        });
                        return;
                    } else if (result.state == 1011) {
                        $.alert({
                            title: '您的芝麻认证信息不完整',
                            content: '<span class="orange">友情提示：</span>重新进行芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                        return;
                    } else {
                        $.alert({
                            title: '未知异常',
                            content: '<span class="orange">友情提示：</span>系统出现未知异常，如需帮助，请联系客服！',
                            txtBtn: '关闭',
                            init: function (d, btn) {
                                btn.click(function () {
                                    d.close();
                                });
                            }
                        });
                        return;
                    }
                }
            });
        },
        nextStep: function (dd) {
            var money = $("#money").val();
            var deadline = $("#deadline").val();
            var returnType = $("#returnType").val();
            var yongtu = $("#yongtu").val();
            var desc = $("#desc").val();

            //检查字段
            if (!/^[1-9]\d*$/.test(money)) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>借款金额必须为正整数');
                return;
            }
            var leftLimit = toCentHalfUp(parseFloat($("#leftLimit").html()));
            if (money > leftLimit) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>借款金额不能超过可用额度');
                return;
            }

            //是否为100整数倍
            var temp = parseInt(money / 100);
            var temp = temp * 100;
            if (temp != money) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>借款金额必须是100的整数倍');
                return;
            }

            if (money < 100 || money > 200000) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>借款金额必须在100到200000之间');
                return;
            }
            if (deadline == -1) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>请选择借款期限');
                return;
            }
            if (returnType == -1) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>请选择还款方式');
                return;
            }
            if (yongtu == "请选择") {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>请选择资金用途');
                return;
            }
            if (desc == '') {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>请填写用途描述');
                return;
            }
            var descLength = desc.length;
            if (descLength > 100) {
                $("#errorField").show();
                $("#error").html('<i class="AllIcon Icon02"></i>借款用途不能超过100字');
                return;
            }

            dd.close();


            $.dialog({
                title: '确认借款信息',
                content: $('#box01').html(),
                initialize: function () {
                    var d = this;
                    $("#money_confirm").html(money);
                    $("#deadline_confirm").html(deadline);
                    $("#return_type_code_confirm").html(returnType);
                    $("#return_type_confirm").html(returnTypeArr[returnType]);
                    $("#yongtu_confirm").html(yongtu);
                    $("#desc_confirm").html(desc);

                    var rate;
                    if (deadline <= 1)
                        rate = 9;
                    else if (deadline == 2)
                        rate = 10.2;
                    else if (deadline == 3)
                        rate = 11.1;
                    else if (deadline == 4)
                        rate = 12;
                    else if (deadline == 5)
                        rate = 12.6;
                    else if (deadline >= 6 && deadline < 9)
                        rate = 12.9;
                    else if (deadline >= 9 && deadline < 12)
                        rate = 13.2;
                    else if (deadline >= 12 && deadline < 24)
                        rate = 13.5;
                    else
                        rate = 13.8;

                    $.ajax({
                        url: '/v2/tools/calc.jso',
                        data: {
                            firstLoanMoney: money,
                            deadLine: deadline,
                            rate: rate,
                            manageRatePerMonth: 1,
                            refundType: returnType
                        },
                        dataType: 'json',
                        type: 'post',
                        success: function (result) {
                            var interest = toCentHalfUp(result.totalInterest);
                            var manage_fee = toCentHalfUp(result.totalManageMoney);
                            var risk_fund = toCentHalfUp(money * $this.getRiskFundRate(G_ENV_VAR.VIP));
                            var total_fee = toCentHalfUp(interest + manage_fee + risk_fund);
                            var pay_money = toCentHalfUp(toCentHalfUp(money) - manage_fee - risk_fund);

                            $("#loan_cost_confirm").html(total_fee);
                            $("#pay_money_confirm").html(pay_money);
                        }
                    });

                    $this.getCapacha();
					if(USER_VIP<2){
						UserAPI.GetUserMobileVoiceCheckStatus({},function(result){
							if(result.state == 0 && result.data == 0){
								UserHasMoblieVoiceCheck=result.data;
								  $('#btn_send_voice').unbind("click").bind("click", function () {
                                    $this.sendMobileCaptcha(1);
                                     });
							}else if(result.state == 0 && result.data > 0){
								UserHasMoblieVoiceCheck=result.data;
								$('#mobile_captcha_li').hide();
							}
						});
					}else{
						$('#mobile_captcha_li').hide();
					}
					

                    /*$('#btn_send_voice').unbind("click").bind("click", function () {
                        $this.sendMobileCaptcha(1);
                    });*/
                    /*$('#btn_send_sms').unbind("click").bind("click",function(){
                     sendMobileCaptcha(0);
                     });*/
                    $("#submitBtn").unbind('click').bind('click', function () {
                        $this.submit(d);
                    });
                }
            });
        },
        submit: function (d) {
            var money = $("#money_confirm").html();
            var deadline = $("#deadline_confirm").html();
            var returnType = $("#return_type_code_confirm").html();
            var safePass = $("#safe_pass").val();
            var close_auto_invest = $("#close_auto_invest").prop("checked");
            var yongtu = $("#yongtu_confirm").html();
            var desc = $("#desc_confirm").html();
			var mobileCaptcha="";
			if(USER_VIP<2){
				if(UserHasMoblieVoiceCheck==null||UserHasMoblieVoiceCheck==0){
					mobileCaptcha = $("#mobile_captcha").val();

					if ("" == mobileCaptcha) {
						$("#error_confirm").html('<i class="AllIcon Icon02"></i>请填写手机验证码');
						$this.getCapacha();
						return false;
					}

					if ("" != mobileCaptcha) {
						// 验证码必须为4位的字符
						if (6 != mobileCaptcha.length) {
							$("#error_confirm").html('<i class="AllIcon Icon02"></i>请输入6位手机验证码');
							$this.getCapacha();
							return false;
						}
					}
			}
			}
			
           

            if (!close_auto_invest) {
                $("#error_confirm").html('<i class="AllIcon Icon02"></i>申请借款必须关闭自动投资');
                return;
            }

            var shutdown_auto_invest;
            if (close_auto_invest) {
                shutdown_auto_invest = 1;
            } else {
                shutdown_auto_invest = 0;
            }

            if (safePass == '') {
                $("#error_confirm").html('<i class="AllIcon Icon02"></i>请输入交易密码');
            }

            var agreementCheck = $('#agreement_check').prop("checked");
            if (!agreementCheck) {

                $("#error_confirm").html('<i class="AllIcon Icon02"></i>请同意借款协议');
                return;
            }

            $("#submitBtn").unbind('click');
            $("#submitBtn").html('正在提交...');

            $.ajax({
                url: '/v2/onlineloan/loan_apply.jso',
                type: 'post',
                data: {
                    money: money,
                    deadline: deadline,
                    returnType: returnType,
                    yongtu: yongtu,
                    desc: desc,
                    safePass: AA.Helper.encrypPw(safePass),
                    shutdownAutoInvest: shutdown_auto_invest,
                    mobileCaptcha: mobileCaptcha
                },
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        d.close();

                        $.alert({
                            tipCls: 'success1',
                            title: '提交成功',
                            content: '您的借款申请已成功提交，请耐心等待系统审核，<br />审核通过后我们会第一时间通知您',
                            txtBtn: '确定',
                            init: function (dlg, btn) {
                                btn.click(function () {
                                    dlg.close();
                                    //window.location.reload();//刷新页面
                                    window.location.href = URL+"?tab=tab4";
                                });
                            }
                        });
                    } else {
                        $("#error_confirm").html('<i class="AllIcon Icon02"></i>' + result.msg);
                        $("#submitBtn").unbind('click').bind('click', function () {
                            $this.submit(d);
                        });
                        $("#submitBtn").html('提交申请');
                    }
                }
            });
        },
        calculateLoanCost: function () {
            var deadline = $("#deadline").val();
            var money = $("#money").val();
            var returnType = $("#returnType").val();
            if (/^[1-9]\d*$/.test(money) && returnType != -1 && deadline != -1) {
                var rate;
                if (deadline <= 1)
                    rate = 9;
                else if (deadline == 2)
                    rate = 10.2;
                else if (deadline == 3)
                    rate = 11.1;
                else if (deadline == 4)
                    rate = 12;
                else if (deadline == 5)
                    rate = 12.6;
                else if (deadline >= 6 && deadline < 9)
                    rate = 12.9;
                else if (deadline >= 9 && deadline < 12)
                    rate = 13.2;
                else if (deadline >= 12 && deadline < 24)
                    rate = 13.5;
                else
                    rate = 13.8;

                $.ajax({
                    url: '/v2/tools/calc.jso',
                    data: {
                        firstLoanMoney: money,
                        deadLine: deadline,
                        rate: rate,
                        manageRatePerMonth: 1,
                        refundType: returnType
                    },
                    dataType: 'json',
                    type: 'post',
                    success: function (result) {
                        var interest = toCentHalfUp(result.totalInterest);
                        var manage_fee = toCentHalfUp(result.totalManageMoney);
                        var risk_fund = toCentHalfUp(money * $this.getRiskFundRate(G_ENV_VAR.VIP));
                        var total_fee = toCentHalfUp(interest + manage_fee + risk_fund);
                        var pay_money = toCentHalfUp(toCentHalfUp(money) - manage_fee - risk_fund);

                        $("#loanCost").html(total_fee);
                        $("#payMoney").html(pay_money);
                    }
                });
            } else {
                $("#loanCost").html("-");
                $("#payMoney").html('-');
            }


        },
        getRiskFundRate: function (vip) {
            if (vip == 0) {
                return 0.05;
            } else if (vip <= 1) {
                return 0.02;
            } else if (vip <= 2) {
                return 0.01;
            } else {
                return 0;
            }
        },
        getBaseInfo: function () {
            $.ajax({
                url: '/v2/escrow/get_base_info.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        USER_NAME = result.name;
                        USER_VIP = result.vip;
                        $this.checkIdentity(result.isCheckedIdentification);
                        if(result.eswAccountId == null || result.eswAccountId == ''){
                    		$("#loanApplyBtn").attr("href", "javascript:$.alert({" +
                                    "title: '请先开通存管账户，即可借款！'," +
                                    "content: '存管账户提现可实时到账'," +
                                    "txtBtn: '去开户'," +
                                    "url: 'javascript:window.location.href = \"/2.0/views/account/bank_account.html\"'})");
                        }
                        //todo vip 引入
                        // if(result.vip==0){
                        //
                        //     $("#vip").html('成为<a href="/vip" target="_blank" class="blue">VIP会员</a>,借款成本更低、额度更高');
                        // }else{
                        //     $("#vip_l").show();
                        //     $("#vip").html('VIP'+result.vip);
                        // }
                        //recommend url
                        // if (!$this.initedRecommendUrl) {
                        //     var url = "https://www.xinrong.com/2.0/views/account/register4.0.shtml?inviter=" + result.name;
                        //     $("#recommend_url").val(url);
                        //
                        //     var text = 'https://www.xinrong.com/v2/wechat/login.raw?targetUrl=https%3a%2f%2fwww.xinrong.com%2fwebapp2.0%2frecommend.html';
                        //     $("#recommend_qr").html('');
                        //     $("#recommend_qr").qrcode(utf16to8(text));
                        //     $this.initedRecommendUrl = 1;
                        // }


                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                        return;
                    }
                }
            });
        },
        getScore: function () {
            $.ajax({
                url: '/v2/alipaycredit/zhima_score.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        var curTime = new Date().getTime();
                        if (result.score > 0) {
                            $("#isCheckedZhiMa").addClass("finished");
                            $("#isCheckedZhiMa").find("a").attr("href", "javascript:void(0)");
                            if (result.scoreObtainTime != 0 && result.scoreObtainTime > (curTime / 1000) - 86400 * 7) {
                                $("#score").html(result.score);
                                return;
                            }
                        }
                    }
                    $("#score").html('<a href="javascript:CreditConfig.zhimaAuthorizeToCommit()" class="blue">立即查询</a>');//芝麻分获取不到时，显示查询按钮，让用户跳转授权页面进行获取
                }
            });
        },
        getCreditLimit: function () {
            $.ajax({
                url: '/v2/onlineloan/get_credit_limit_for_show.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        // $("#totalCreditLimit").html('<b class="red">'+result.totalCreditLimit+'元</b>');
                        // $("#usedCreditLimit").html(result.usedCreditLimit+'元');
                        // $("#leftCreditLimit").html(result.leftCreditLimit+'元');
                        $this.creditInit(true, true, result.totalCreditLimit, result.leftCreditLimit);
                        $("#isGotCredit").addClass("finished");
                        $("#isGotCredit").find("a").attr("href", "javascript:void(0);");
                        $this.showAD(result.totalCreditLimit);
                    } else {//如果实在拿不到最新的额度，就提示用户，让用户点击，自己去获取最新额度
                        //todo
                        $("#isGotCredit").removeClass("finished");
                        $("#isGotCredit").find("a").attr("href", "javascript:CreditConfig.getCreditLimitAgain();");
                        $this.creditInit(true, false);
                        $("#credit_total").html('<a href="javascript:CreditConfig.getCreditLimitAgain()" class="blue">立即获取</a>');
                    }
                }
            });
        },
        getCreditLimitAgain: function () {
            if (isAuthorize == null) {
                var state = $this.getUserAuthorize();
                if (state == 0)
                    setTimeout(function () {
                        $this.getCreditLimitAgain();
                    }, 500);
                return;
            } else if (isAuthorize == 0) {
                $this.showAuthorize();
                return;
            }
            $.ajax({
                url: '/v2/onlineloan/get_credit_limit_for_loan_apply.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        $this.creditInit(true, true, result.totalCreditLimit, result.leftCreditLimit);
                        $("#isGotCredit").addClass("finished");
                        $("#isGotCredit").find("a").attr("href", "javascript:void(0);");
                        $this.showAD(result.totalCreditLimit);
                    } else if (result.state == 1002) {
                        $.alert({
                            title: '您的手机号尚未经过认证！',
                            content: '为了保护您的资金安全，请先完成手机认证',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1003) {
                        $.alert({
                            title: '您尚未通过实名认证！',
                            content: '为了确定您的真实身份，请先完成实名认证',
                            txtBtn: '立即认证',
                            url: 'javascript:BankQuickAuthWin.show();'
                        });
                        return;
                    } else if (result.state == 1004) {
                        $.alert({
                            title: '您尚未进行银行卡认证',
                            content: '<span class="orange">友情提示：</span>完成银行卡认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1005) {
                        $.alert({
                            title: '您尚未完善个人资料',
                            content: '<span class="orange">友情提示：</span>完善个人资料后才可以申请借款。',
                            txtBtn: '立即完善',
                            url: '/2.0/user_information.shtml?callback=' + URL
                        });
                        return;
                    } else if (result.state == 1007) {
                        $.alert({
                            title: '您尚未进行芝麻认证',
                            content: '<span class="orange">友情提示：</span>通过芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1008) {
                        $.alert({
                            title: '您的芝麻认证已过期',
                            content: '<span class="orange">友情提示：</span>重新进行芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                        return;
                    } else if (result.state == 1010) {
                        $.alert({
                            title: '无法获取您的芝麻分',
                            content: '<span class="orange">友情提示：</span>很遗憾，暂时无法获取到您的芝麻分，过段时间再来申请借款吧！',
                            txtBtn: '关闭',
                            init: function (d, btn) {
                                btn.click(function () {
                                    d.close();
                                });
                            }
                        });
                        return;
                    } else if (result.state == 1011) {
                        $.alert({
                            title: '您的芝麻认证信息不完整',
                            content: '<span class="orange">友情提示：</span>重新进行芝麻认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/zhima_authorize.shtml?state=' + URL
                        });
                        return;
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                        return;
                    } else {
                        $.alert({
                            title: '未知异常',
                            content: '<span class="orange">友情提示：</span>系统出现未知异常，如需帮助，请联系客服！',
                            txtBtn: '关闭',
                            init: function (d, btn) {
                                btn.click(function () {
                                    d.close();
                                });
                            }
                        });
                        return;
                    }
                }
            });
        },
        getAuditingCredit: function () {
            $.ajax({
                url: '/v2/onlineloan/query_un_success_loan.jso',
                data: {pageSize: 0, pageIndex: 1},
                dataType: 'json',
                type: 'post',
                success: function (result) {
                    if (result.state == 0) {

                        var raiseTotal = result.raiseTotal;
                        var publishTotal = result.publishTotal;
                        var approveTotal = result.approveTotal;
                        var raiseMoney = toCentHalfUp(result.raiseMoney);
                        var publishMoney = toCentHalfUp(result.publishMoney);
                        var approveMoney = toCentHalfUp(result.approveMoney);
                        // var daishenhe_choukuanzhong = toCentHalfUp(raiseMoney+publishMoney+approveMoney);

                        //汇总信息
                        var summaryInfo = '';
                        var count = 0;
                        if (raiseTotal > 0) {
                            summaryInfo += '<li><span class="red">' + raiseMoney + '</span>元借款放款中</li>';
                            count++;
                        }
                        if (publishTotal > 0) {
                            summaryInfo += '<li><span class="red">' + publishMoney + '</span>元借款待发布</li>';
                            count++;
                        }
                        if (approveTotal > 0) {
                            summaryInfo += '<li><span class="red">' + approveMoney + '</span>元借款待审核</li>';
                            count++;
                        }
                        $("#audit_view").html(summaryInfo);
                        // $("#credit_verify").html(parseFloat(toCentHalfUp(result.approveMoney)).toLocaleString());
                        if (count > 1) {
                            $("#audit_view").attr("style", "position: relative;width: 4000px;height: 40px;");
                            imgScroll.rolling({
                                name: 'auditingCredit',
                                width: '180px',
                                height: '20px',
                                direction: 'left',
                                speed: 40,
                                addcss: true
                            });
                        }
                    }
                }
            });
        },
        obtainToReturnList: function (pageIndex) {
            $.ajax({
                url: '/v2/onlineloan/query_refunding.jso',
                data: {
                    pageSize: PAGE_SIZE,
                    pageIndex: pageIndex,
                    type: TO_RETURN_TYPE,
                    beginTimeStr: TO_RETURN_BEGIN_TIME,
                    endTimeStr: TO_RETURN_END_TIME
                },
                dataType: 'json',
                type: 'post',
                success: function (result) {

                    if (result.state == 0) {
                        var rows = result.refundingDto;
                        var total = result.totalCount;
                        var moneyInterst = result.moneyInterst;
                        var money = result.money;
                        var interest = result.interst;
                        var beginTime = result.beginTime;
                        var endTime = result.endTime;

                        var _html = '';
                        for (var i = 0; i < rows.length; i++) {
                            var loanManagementId = rows[i].id;//测试用
                            _html += '<tr><td align="center">' + rows[i].refundDate + '</td>' +
                                '<td align="center" class="red">' + rows[i].alsoAmount + '元</td>' +
                                '<td align="center" class="red">' + rows[i].refundMoney + '</td>' +
                                '<td align="center">' + rows[i].projectName + '</td>' +
                                '<td align="center">' + rows[i].ctime + '</td>' +
                                '<td align="center">' + rows[i].money + '</td>' +
                                '<td align="center">' + rows[i].deadline + '</td>' +
                                '<td align="center"><a href="javascript:CreditConfig.showDetail(' + loanManagementId + ')" class="detail" id="inside04"></a></td></tr>';

                        }
                        if (_html == '') {
                            $("#return_table_page").hide();
                            $("#return_List").hide();
                            $("#no_record_tips_return").show();
                            $("#returnTermCount").html(0);
                            $("#returnSum").html("0.00");
                            $("#returnTotalMoney").html("0.00");
                            $("#returnTotalInterest").html("0.00");
                        } else {
                            $("#return_table_page").show();
                            $("#return_List").show();
                            $("#no_record_tips_return").hide();
                            $("#return_List").html(_html);//把整个列表内容放到html页面对应的位置
                            $("#returnTermCount").html(total);
                            $("#returnSum").html(moneyInterst);
                            $("#returnTotalMoney").html(money);
                            $("#returnTotalInterest").html(interest);
                            //下一次还款日 + 应还金额
                            var pageNum = Math.ceil(total / PAGE_SIZE);//总页数
                            if (pageNum > 0) {
                                $this.showReturnPage(pageIndex, pageNum);
                            }

                            //下次还款日/下次还款总额
                            if (TO_RETURN_TYPE == 1 && !HAVE_INIT_NEXT_REFUND_FIELD) {
                                HAVE_INIT_NEXT_REFUND_FIELD = true;
                                if (beginTime != 0) {
                                    var beginTimeStr = formateDate(beginTime, 'Y-m-d');
                                    $("#return_next_money").html(moneyInterst);
                                    $("#return_next_date").html(beginTimeStr);
                                } else {

                                }
                            }
                   
                            //切换到借款tab
                            if(!$("#"+UrlTab)[0]){
                                var tab = $("#tab3");
                                if (tab) tab.click();
                            }
                        }
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    } else {
                        console.log(result.state + " " + result.msg);
                    }
                }
            });
        },
        obtainBorrowRecordList: function (pageIndex) {
            $.ajax({
                url: '/v2/onlineloan/query_borrow_and_apply_record.jso',
                data: {
                    pageSize: PAGE_SIZE,
                    pageIndex: pageIndex,
                    status: BORROW_RECORD_STATUS,
                    type: BORROW_RECORD_TYPE,
                    beginTimeStr: BORROW_RECORD_BEGIN_TIME,
                    endTimeStr: BORROW_RECORD_END_TIME
                },
                dataType: 'json',
                type: 'post',
                success: function (result) {

                    if (result.state == 0) {
                        var rows = result.borrowdRecordDto;
                        var total = result.totalCount;
                        var sumMoney = result.sumMoney;
                        var totalCost = result.totalCost;
                        var succeedTotal = result.returnTotalCount;
                        var succeedSumMoney = result.returnSumMoney;
                        var succeedTotalCost = result.returnTotalCost;

                        var _html = '';
                        for (var i = 0; i < rows.length; i++) {
                            var loanManagementId = rows[i].id;
                            var projectName = rows[i].projectName;
                            var money = rows[i].borrowMoney != null ? rows[i].borrowMoney : rows[i].applyMoney;
                            var rate = rows[i].rate != null ? rows[i].rate : rows[i].applyRate;
                            var costs = rows[i].borrowCosts != null ? rows[i].borrowCosts : rows[i].applyCosts;

                            var status_emphasis = rows[i].IStatus == 8 ? 'class="emphasis"' : "";

                            var detail = rows[i].IStatus >6 ? '<a class="detail" href="javascript:CreditConfig.showDetail(' + loanManagementId + ')" ></a>' : "/";

                            _html += '<tr><td align="center">' + rows[i].borrowDay + '</td>' +
                                '<td align="center" class="emphasis">' + rows[i].payTime + '</td>' +
                                '<td align="center">' + money + '</td>' +
                                '<td align="center" class="emphasis">' + rows[i].returningMoney + '</td>' +
                                '<td align="center">' + rows[i].deadline + '</td>' +
                                '<td align="center">' + rate + '</td>' +
                                '<td align="center">' + costs + '</td>' +
                                '<td align="center" ' + status_emphasis + '>' + loanStatusShow[rows[i].IStatus] + '</td>' +
                                '<td align="center">'+ detail + '</td></tr>';
                        }
                        if (_html == '') {
                            $("#borrow_table_page").hide();
                            $("#borrow_list").hide();
                            $("#no_record_tips_borrow").show();
                            $("#borrowTermCount").html(total);
                            $("#borrowSum").html(sumMoney);
                            $("#borrowCost").html(totalCost);
                        } else {
                            _html = _html.replace(/null/g, "/");
                            $("#borrow_table_page").show();
                            $("#borrow_list").show();
                            $("#no_record_tips_borrow").hide();
                            $("#borrow_list").empty();
                            $("#borrow_list").html(_html);//把整个列表内容放到html页面对应的位置
                            $("#borrowTermCount").html(total);
                            $("#borrowSum").html(sumMoney);
                            $("#borrowCost").html(totalCost);

                            var pageNum = Math.ceil(total / PAGE_SIZE);//总页数
                            if (pageNum > 0) {
                                $this.showBorrowPage(pageIndex, pageNum);
                            }
                        }
                        // if (BORROW_RECORD_STATUS == -1) {
                        $("#succeedBorrowTermCount").html(succeedTotal);
                        $("#succeedBorrowSum").html(succeedSumMoney);
                        $("#succeedBorrowCost").html(succeedTotalCost);
                        //     $("#info_return_2_success").show();
                        // } else {
                        //     $("#info_return_2_success").hide();
                        // }
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    } else {
                        console.log(result.state + " " + result.msg);
                    }
                }
            });


        },
        obtainOverdueList: function (pageIndex) {
            $.ajax({
                url: '/v2/onlineloan/query_over_due.jso',
                data: {pageSize: PAGE_SIZE, pageIndex: pageIndex},
                dataType: 'json',
                type: 'post',
                success: function (result) {
                    if (result.state == 0) {
                        var rows = result.overDueDTO;
                        var total = result.totalCount;
                        var moneyInterst = Number(result.money) - Number(result.interst);
                        var money = result.money;
                        var interest = result.interst;
                        //var penaltyInterest = result.penaltyInterest;

                        //如果没有逾期中的记录，则隐藏掉第一个tab,然后return
                        if (total == 0) {
                            return;
                        }

                        var _html = '';
                        for (var i = 0; i < rows.length; i++) {
                            var loanManagementId = rows[i].id;//测试用
                            var refundInterst = rows[i].refundInterst - rows[i].penaltyInterest;//应还本息=原来应还本息-罚息金额
                            _html += '<tr><td align="center">' + rows[i].refundDate + '</td>' +
                                '<td align="center" class="emphasis">' + rows[i].overDueMoney + '元</td>' +
                                '<td align="center">' + rows[i].refundInterst + '元</td>' +
                                '<td align="center">' + rows[i].overDueDay + '</td>' +
                                '<td align="center">' + rows[i].penaltyInterest + '元</td>' +
                                '<td align="center">' + rows[i].returnedMoney + '元</td>' +
                                '<td align="center">' + rows[i].borrowDate + '</td>' +
                                '<td align="center">' + rows[i].borrowMoney + '元</td>' +
                                '<td align="center"><a class="detail" href="javascript:CreditConfig.showDetail(' + loanManagementId + ')"></a></td></tr>';//<a href="" class="blue" id="inside04">借款详情</a>
                        }

                        $("#overdue_List").html(_html);//把整个列表内容放到html页面对应的位置
                        $("#overdueTermCount").html(total);
                        $("#overdueListSum").html(moneyInterst.toFixed(2));
                        //$("#overdueMoney").html(money);
                        //$("#overdueInterest").html(interest);
                        //$("#penaltyInterest").html(penaltyInterest);

                        var pageNum = Math.ceil(total / PAGE_SIZE);//总页数
                        $this.showOverduePage(pageIndex, pageNum);

                        var tab = $("#tab2");
                        tab.show();
                        if (tab) tab.click();
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    } else {
                        console.log(result.state + " " + result.msg);
                    }
                }
            });
        },
        //借款详情弹框
        showDetail: function (loanManagementId) {
            $.dialog({
                title: '借款详情',
                content: $('#refund_plan_dlg').html(),
                initialize: function () {
                    $this.getLoanInfo(loanManagementId);
                }
            });
        },
        getLoanInfo: function (loanManagementId) {
            $.ajax({
                url: '/v2/onlineloan/online_loan_detail.jso',
                data: {loanManagementId: loanManagementId},
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        var loanManangement = result.loanManangement;
                        returnPlanList = result.returnPlanList;//还款计划列表
                        var sid = result.sid;

                        var amount;
                        var deadline;
                        var returnType;
                        var rate;

                        if (loanManangement.status == 0 || loanManangement.status == 2) {
                            amount = loanManangement.appliedAmount;
                            deadline = loanManangement.appliedDeadline;
                            returnType = loanManangement.appliedReturnType;
                            rate = loanManangement.appliedRate;
                        } else {
                            amount = loanManangement.approvalAmount;
                            deadline = loanManangement.approvalDeadline;
                            returnType = loanManangement.approvalReturnType;
                            rate = loanManangement.approvalRate;
                        }
                        $("#money1").html(amount);
                        $("#deadline1").html(deadline);
                        $("#returnType1").html(returnTypeArr[returnType]);
                        $("#rate1").html(rate);
                        if (sid) {
                            $("#sectionLoanDetail").attr('href', '/2.0/detail.shtml?sid=' + sid);
                        }

                        var manageFee = toCentHalfUp(amount * result.manageRate * 0.01);
                        $("#manageFee1").html(manageFee);

                        var riskFund = toCentHalfUp(result.riskFund);
                        $("#riskFund1").html(riskFund);

                        if (loanManangement.status < 7) {//系统还没生成该笔借款准确的利息，就计算一个理论值
                            $.ajax({
                                url: '/v2/tools/calc.jso',
                                data: {
                                    firstLoanMoney: amount,
                                    deadLine: deadline,
                                    rate: rate,
                                    manageRatePerMonth: 1,
                                    refundType: returnType
                                },
                                dataType: 'json',
                                type: 'post',
                                success: function (result) {
                                    $("#totalInterest1").html(toCentHalfUp(result.totalInterest));
                                    var totalCost = toCentHalfUp(toCentHalfUp(manageFee) + toCentHalfUp(riskFund) + toCentHalfUp(result.totalInterest));
                                    $("#totalCost").html(totalCost);
                                }
                            });
                        } else {//系统已经生成准确的利息
                            $("#totalInterest1").html(loanManangement.totalInterest);
                            var totalCost = toCentHalfUp(toCentHalfUp(manageFee) + toCentHalfUp(riskFund) + toCentHalfUp(loanManangement.totalInterest));
                            $("#totalCost").html(totalCost);
                        }

                        $("#loan_type_1").html(formateDate(loanManangement.ctime, "Y-m-d"));

                        if (loanManangement.status >= 7) {
                            $("#returnedField").show();
                            $("#toReturnField").show();
                            var totalTerms = loanManangement.totalTerms;
                            var returnedTerms = loanManangement.returnedTerms;
                            var toReturnTerms = totalTerms - returnedTerms;
                            var totalMoneyInterest = toCentHalfUp(loanManangement.approvalAmount) + toCentHalfUp(loanManangement.totalInterest);
                            var returnedMoneyInterest = toCentHalfUp(loanManangement.returnedMoney) + toCentHalfUp(loanManangement.returnedInterest);
                            var toReturnMoneyInterest = totalMoneyInterest - returnedMoneyInterest;
                            $("#returned_money").html(toCentHalfUp(returnedMoneyInterest));
                            $("#returned_num").html(returnedTerms);
                            $("#to_return_money").html(toCentHalfUp(toReturnMoneyInterest));
                            $("#to_return_num").html(toReturnTerms);
                        }

                        //借款进程示意图
                        var ctime = formateDate(loanManangement.ctime, 'Y-m-d h:m:s');
                        var projectPublishTime = formateDate(loanManangement.projectPublishTime, 'Y-m-d h:m:s');
                        var loanTime = formateDate(loanManangement.loanTime, 'Y-m-d h:m:s');
                        $("#apply_time").html(ctime);
                        $("#project_publish_time").html(projectPublishTime);
                        $("#loan_time").html(loanTime);
                        var toReturnTerms = loanManangement.totalTerms - loanManangement.returnedTerms;
                        var toReturnSum = toCentHalfUp(toCentHalfUp(loanManangement.approvalAmount) + toCentHalfUp(loanManangement.totalInterest)
                            - toCentHalfUp(loanManangement.returnedMoney) - toCentHalfUp(loanManangement.returnedInterest));
                        if (loanManangement.status == 7) {//分类讨论
                            //获取逾期期数和逾期金额
                            var overdueTerms = 0;
                            var overdueSum = 0;
                            for (var i = 0; i < returnPlanList.length; i++) {
                                if (returnPlanList[i].note == "逾期中") {
                                    overdueTerms++;
                                    overdueSum += toCentHalfUp(returnPlanList[i].moneyInterest - returnPlanList[i].returnedMoneyInterest);
                                }
                            }
                            if (overdueTerms > 0) {//存在逾期的还款计划，意味着该笔借款也为逾期
                                $("#overduePic").show();
                                $("#overdueTerms").html(overdueTerms);
                                $("#overdueSum").html(overdueSum);
                            } else {//未还款
                                $("#returningPic").show();
                                $("#toReturnTerms1").html(toReturnTerms);
                                $("#toReturnSum1").html(toReturnSum);
                            }

                        } else if (loanManangement.status == 8) {
                            $("#overduePic").show();
                            $("#overdueTerms").html(toReturnTerms);
                            $("#overdueSum").html(toReturnSum);
                        } else if (loanManangement.status > 8 && loanManangement.status < 12) {
                            $("#returnedPic").show();
                            $("#rtime").html(formateDate(loanManangement.rtime, 'Y-m-d h:m:s'));
                        }

                        totalPageNum = Math.ceil(returnPlanList.length / pageSize);//得到总页数
                        if (totalPageNum > 0) {
                            CreditConfig.showReturnPlan(1);//展示第一页
                        } else {
                            $("#tips").html("( 借款到账后才会生成还款计划 )");
                        }
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    }

                }
            });
        },
        showReturnPlan: function (pageIndex) {
            if (pageIndex < 1 || pageIndex > totalPageNum) {
                return;
            }
            var len = returnPlanList.length;
            var beginIndex = pageSize * (pageIndex - 1);
            var endIndex = beginIndex + pageSize - 1;
            if (endIndex > len - 1) {
                endIndex = len - 1;
            }
            var _html = '';
            for (var j = beginIndex; j <= endIndex; j++) {
                var period = returnPlanList[j].period;
                var dtime = formateDate(returnPlanList[j].dtime, 'Y-m-d');
                var money = returnPlanList[j].money;
                var interest = returnPlanList[j].interest;
                var moneyInterest = returnPlanList[j].moneyInterest;
                var returnedMoney = returnPlanList[j].returnedMoney;
                var returnedInterest = returnPlanList[j].returnedInterest;
                var returnedMoneyInterest = returnPlanList[j].returnedMoneyInterest;
                var leftMoneyInterest = toCentHalfUp(toCentHalfUp(moneyInterest) - toCentHalfUp(returnedMoneyInterest));
                //var status = returnPlanStatusArr[returnPlanList[j].status];
                var status = returnPlanList[j].note;
                var noteForShow = "";
                if (status == "逾期中") {
                    noteForShow = leftMoneyInterest + "元逾期未还";
                }

                _html += '<tr><td align="center">' + period + '</td><td align="center">' + dtime + '</td><td align="center">' + money + ' 元</td><td align="center">' + interest +
                    ' 元</td><td align="center">' + moneyInterest + ' 元</td><td align="center">' + status + '</td></tr>';
            }

            $("#rd_tbody").html(_html);

            var preIndex = pageIndex - 1;
            var nextIndex = pageIndex + 1;
            var pageBtnHtml = '<a href="javascript:CreditConfig.showReturnPlan(' + preIndex + ')">上一页</a>';
            for (var i = 1; i <= totalPageNum; i++) {
                if (i == pageIndex) {
                    pageBtnHtml += '<span>' + i + '</span>';
                } else {
                    pageBtnHtml += '<a href="javascript:CreditConfig.showReturnPlan(' + i + ')">' + i + '</a>';
                }
            }
            pageBtnHtml += '<a href="javascript:CreditConfig.showReturnPlan(' + nextIndex + ')">下一页</a>';

            $("#pageBtn").html(pageBtnHtml);

        },
        showAuthorize: function () {
            $.dialog({
                title: '征信授权',
                //height:324,
                //width:548,
                padding: '0px 0px',
                content: $('#authorize_box').html(),
                initialize: function () {
                    var d = this;
                    $('#authorize_box_ok').click(function () {
                        d.close();
                        $.dialog({
                            title: '征信和信息使用授权书',
                            //height:324,
                            //width:548,
                            padding: '0px 0px',
                            content: $('#authorize_box2').html(),
                            initialize: function () {
                                var d = this;
                                $('#authorize_box2_ok').click(function () {
                                    $.ajax({
                                        url: '/v2/onlineloan/save_user_authorize.jso',
                                        type: 'post',
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result.state == 0) {
                                                d.close();
                                                window.location.reload();
                                            } else if (result.state == 1009) {
                                                d.close();
                                                AA.RapidLogin.popup();
                                            }
                                        }
                                    });
                                });
                                $('#authorize_box2_cancel').click(function () {
                                    d.close();
                                });
                            }
                        });
                    });
                    $('#authorize_box_cancel').click(function () {
                        d.close();
                    });
                }
            });
        },
        zhimaAuthorizeToCommit: function () {
            UserAPI.AccountIndexInfo({}, function (result) {
                if (result.state == 0) {
                    var isCheckedIdentification = result.isCheckedIdentification;
                    if (isCheckedIdentification == 0) {
                        $.alert({
                            title: '您尚未通过实名认证！',
                            content: '为了确定您的真实身份，请先完成实名认证',
                            txtBtn: '立即认证',
                            url: 'javascript:BankQuickAuthWin.show()'
                        });
                        return;
                    } else {
                        window.location = "/2.0/zhima_authorize.shtml?state=/2.0/views/huahua/huahua.html";
                    }
                } else if (result.state == 1009) {
                    AA.RapidLogin.popup();
                }
            });
        },
        getUserAuthorize: function () {
            var state;
            $.ajax({
                url: '/v2/onlineloan/get_user_authorize.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        isAuthorize = result.isAuthorize;
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    }
                    state = result.state;
                }
            });
            return state;
        },
        checkIdentity: function (status) {
            if (status == 0) {
                $("#isCheckedIdentification").removeClass("finished");
                $("#isCheckedIdentification").find("a").attr("href", "javascript:BankQuickAuthWin.show()");

                $("#loanApplyBtn").attr("href", "javascript:$.alert({" +
                    "title: '您尚未通过实名认证！'," +
                    "content: '为了确定您的真实身份，请先完成实名认证'," +
                    "txtBtn: '立即认证'," +
                    "url: 'javascript:BankQuickAuthWin.show()'})");
            } else {
                $("#isCheckedIdentification").addClass("finished");
                $("#isCheckedIdentification").find("a").attr("href", "javascript:void(0)");

                $("#loanApplyBtn").attr("href", "javascript:CreditConfig.loan_apply(1);");
            }
        },
        checkUserInfo: function () {
            $.ajax({
                url: '/v2/onlineloan/get_user_credit_basic_info.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        UserFillInfomation = result.data;
                        if (result.data == 0) {
                            $("#isFilledInfo").removeClass("finished");
                        } else {
                            $("#isFilledInfo").addClass("finished");
                            $("#isFilledInfo").find("a").attr("href", "javascript:void(0)");
                        }
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    } else {
                        $("#isFilledInfo").removeClass("finished");
                    }
                }
            });
        },
        checkUserInfoAgain: function () {
            $.ajax({
                url: '/v2/onlineloan/get_user_credit_basic_info.jso',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    if (result.state == 0) {
                        UserFillInfomation = result.data;
                        if (result.data == 1) {
                            $("#isFilledInfo").addClass("finished");
                            $("#isFilledInfo").find("a").attr("href", "javascript:void(0)");
                        } else {
                            $("#isFilledInfo").removeClass("finished");
                            $("#isFilledInfo").children("a").attr("href", "/2.0/user_information.shtml?callback=/2.0/views/huahua/huahua.html");
                            window.location.href = "/2.0/user_information.shtml?callback=/2.0/views/huahua/huahua.html";
                        }
                    } else if (result.state == 1002) {
                        $.alert({
                            title: '您的手机号尚未经过认证！',
                            content: '为了保护您的资金安全，请先完成手机认证',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1003) {
                        $.alert({
                            title: '您尚未通过实名认证！',
                            content: '为了确定您的真实身份，请先完成实名认证',
                            txtBtn: '立即认证',
                            url: 'javascript:BankQuickAuthWin.show();'
                        });
                        return;
                    } else if (result.state == 1004) {
                        $.alert({
                            title: '您尚未进行银行卡认证',
                            content: '<span class="orange">友情提示：</span>完成银行卡认证后才可以申请借款。',
                            txtBtn: '立即认证',
                            url: '/2.0/views/account/account_settings.shtml'
                        });
                        return;
                    } else if (result.state == 1009) {
                        AA.RapidLogin.popup();
                    } else {
                        return;
                    }
                }
            });
        },
        giftLoan: function () {
            var c = XR.Global.GetUrlParam('c');
            if (c == 'gift') {
                $.alert({
                    title: '借款成功即可前往积品汇，点击"购买"！',
                    content: '',
                    txtBtn: '开始借款',
                    init: function (d, btn) {
                        btn.click(function () {
                            d.close();
                            CreditConfig.loan_apply();
                        });
                    }
                });
            }
        },
        // initUShield: function () {
        //     $.ajax({
        //         url: '/v2/onlineloan/get_u_shield_info.jso',
        //         type: 'post',
        //         dataType: 'json',
        //         success: function (result) {
        //             if (result.state == 0) {
        //                 if (result.data == 1) {
        //                     $('#uShield_view').html('<font class="blue">认证成功</font>');
        //                 } else {
        //                     $('#uShield_view').html('<a class="blue" href="javascript:CreditConfig.checkUShield();">立即认证</a>');
        //                 }
        //             }
        //         }
        //     });
        // },
        // checkUShield: function () {
        //     $.ajax({
        //         url: '/v2/onlineloan/get_u_shield_param.jso',
        //         type: 'post',
        //         dataType: 'json',
        //         success: function (result) {
        //             if (result.state == 0) {
        //                 var appKey = result.data.appKey;
        //                 var timestamp = result.data.timestamp;
        //                 var returnUrl = result.data.returnUrl;
        //                 var notifyUrl = result.data.notifyUrl;
        //                 var orderNo = result.data.orderNo;
        //                 var name = result.data.name;
        //                 var certNo = result.data.certNo;
        //                 var certType = result.data.certType;
        //                 var sign = result.data.sign;
        //                 var serviceUrl = result.data.serviceUrl;
        //
        //                 $('#uShieldFrom #appKey').val(appKey);
        //                 $('#uShieldFrom #timestamp').val(timestamp);
        //                 $('#uShieldFrom #returnUrl').val(returnUrl);
        //                 $('#uShieldFrom #notifyUrl').val(notifyUrl);
        //                 $('#uShieldFrom #orderNo').val(orderNo);
        //                 $('#uShieldFrom #name').val(name);
        //                 $('#uShieldFrom #certNo').val(certNo);
        //                 $('#uShieldFrom #certType').val(certType);
        //                 $('#uShieldFrom #sign').val(sign);
        //
        //                 $('#uShieldFrom').attr('action', serviceUrl);
        //                 $('#uShieldFrom').submit();
        //             }
        //         }
        //     });
        // },
        // showUShieldCallResult: function () {
        //     var uShieldShow = XR.Global.GetUrlParam('uShieldShow');
        //     if (uShieldShow == 1) {
        //         $('#uShield_show').show();
        //     }
        //     var uShieldState = XR.Global.GetUrlParam('uShieldState');
        //     if (uShieldState == 1) {
        //         $.alert({
        //             title: '银行U盾认证成功！',
        //             padding: '45px 0 0 155px',
        //             height: '210px',
        //             content: '',
        //             txtBtn: '确定',
        //             init: function (d, btn) {
        //                 btn.click(function () {
        //                     d.close();
        //                 });
        //             }
        //         });
        //     } else if (uShieldState == 2) {
        //         $.alert({
        //             title: '银行U盾认证失败！',
        //             padding: '45px 0 0 155px',
        //             height: '210px',
        //             content: '',
        //             txtBtn: '确定',
        //             init: function (d, btn) {
        //                 btn.click(function () {
        //                     d.close();
        //                 });
        //             }
        //         });
        //     }
        // },
        creditInit: function (login, checkedCredit, creditTotal, creditRemain, creditVerify) {
            var ctx = $this.canvas.getContext("2d"),
                width = ctx.canvas.width,
                height = ctx.canvas.height,
                xPos = ctx.canvas.width / 2,
                yPos = ctx.canvas.height / 2,
                r = ctx.canvas.width / 2 - $this.lineWidth / 2,
                rate = null;
            if (login && checkedCredit) {
                $("#credit_total").html(parseFloat(creditTotal).toLocaleString());
                $("#credit_remain").html(parseFloat(creditRemain).toLocaleString());
                //todo loaning
                $("#credit_verify").html(parseFloat(creditVerify).toLocaleString());
                rate = creditTotal > 0 ? (creditTotal - creditRemain) / creditTotal : 1;
            } else {
                $("#credit_total").html("--");
                $("#credit_remain").html("--");
                $("#credit_verify").parent().css("display", "none");
                rate = 1;
            }
            // if(login){
            //     $("#recommend_link").show();
            //     $("#get_recommend_link").hide();
            // }else{
            //     $("#recommend_link").hide();
            //     $("#get_recommend_link").show();
            // }
            var step = 0,
                gap = 0.01,
                intervalGap = 20;
            ctx.lineWidth = $this.lineWidth;
            ctx.strokeStyle = $this.strokeColor;
            var timer = setInterval(function () {
                ctx.clearRect(0, 0, width, height);
                if (step < rate) {
                    ctx.beginPath();
                    ctx.arc(xPos, yPos, r, 0, Math.PI * 2 * step);
                    ctx.stroke();
                    step += gap;
                } else if (step >= rate && step <= 1) {
                    ctx.beginPath();
                    ctx.strokeStyle = $this.strokeColor;
                    ctx.arc(xPos, yPos, r, 0, Math.PI * 2 * rate);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = $this.strokeBgColor;
                    ctx.arc(xPos, yPos, r, Math.PI * 2 * rate, Math.PI * 2 * step);
                    ctx.stroke();
                    step += gap;
                } else {
                    clearInterval(timer);
                    ctx.beginPath();
                    ctx.strokeStyle = $this.strokeColor;
                    ctx.arc(xPos, yPos, r, 0, Math.PI * 2 * rate);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.strokeStyle = $this.strokeBgColor;
                    ctx.arc(xPos, yPos, r, Math.PI * 2 * rate, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
                }
            }, intervalGap);
        },
        getBlackList: function () {
            $.ajax({
                url: '/v2/onlineloan/get_overdue_blacklist.jso',
                type: 'post',
                dataType: 'json',
                data: {
                    userQuery: '',
                    pageIndex: 1,
                    pageSize: 50
                },
                success: function (result) {
                    if (result.state == 0) {
                        $('#result_view').empty();
                        $.each(result.list, function (i, v) {
                            var $tr = '<li>' +
                                '<span>' + v.realName + '</span> ' +
                                '<span>身份证号' + v.certificateNumber + '</span> ' +
                                '<span>逾期' + v.overdueMoney + '元</span>' +
                                '</li>';
                            $('#result_view').append($tr);
                        });
                        imgScroll.rolling({
                            name: 'namelist',
                            width: '380px',
                            height: '40px',
                            direction: 'left',
                            speed: 40,
                            addcss: true
                        });
                    }
                }
            });
        },
        showReturnPage: function (pageIndex, pageNum) {
            var previous = pageIndex - 1;
            var next = pageIndex + 1;

            var previousField;
            if (previous >= 1 && previous <= pageNum) {
                previousField = '<a href="javascript:CreditConfig.obtainToReturnList(' + previous + ')">上一页</a>';
            } else {
                previousField = '<a href="javascript:void(0)">上一页</a>';
            }

            var _html = previousField;

            if (pageNum <= 7) {
                for (var i = 1; i <= pageNum; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainToReturnList(' + i + ')">' + i + '</a>';
                    }

                }
            } else {//总页数大于7时
                var marginLeft = pageIndex - 1;
                var marginRight = pageNum - pageIndex;
                var startIndex;
                var endIndex;
                if (marginLeft < 3) {
                    startIndex = 1;
                } else if (marginRight < 3) {
                    startIndex = pageNum - 6;
                } else {
                    startIndex = pageIndex - 3;
                }

                if (startIndex == 2) {
                    _html += '<a href="javascript:CreditConfig.obtainToReturnList(1)">1</a>';
                    _html += '...';
                }

                if (startIndex > 2) {
                    _html += '<a href="javascript:CreditConfig.obtainToReturnList(1)">1</a>';
                    _html += '<a href="javascript:CreditConfig.obtainToReturnList(2)">2</a>';
                    _html += '...';
                }

                for (var i = startIndex; i < startIndex + 7; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainToReturnList(' + i + ')">' + i + '</a>';
                    }
                }

                endIndex = startIndex + 6;
                if (endIndex < pageNum) {
                    _html += '...';
                }
            }

            var nextField;
            if (next >= 1 && next <= pageNum) {
                nextField = '<a href="javascript:CreditConfig.obtainToReturnList(' + next + ')">下一页</a>';
            } else {
                nextField = '<a href="javascript:void(0)">下一页</a>';
            }
            _html += nextField;
            $("#return_table_page").html(_html);
        },
        showBorrowPage: function (pageIndex, pageNum) {
            var previous = pageIndex - 1;
            var next = pageIndex + 1;

            var previousField;
            if (previous >= 1 && previous <= pageNum) {
                previousField = '<a href="javascript:CreditConfig.obtainBorrowRecordList(' + previous + ')">上一页</a>';
            } else {
                previousField = '<a href="javascript:void(0)">上一页</a>';
            }

            var _html = previousField;

            if (pageNum <= 7) {
                for (var i = 1; i <= pageNum; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainBorrowRecordList(' + i + ')">' + i + '</a>';
                    }

                }
            } else {//总页数大于7时
                var marginLeft = pageIndex - 1;
                var marginRight = pageNum - pageIndex;
                var startIndex;
                var endIndex;
                if (marginLeft < 3) {
                    startIndex = 1;
                } else if (marginRight < 3) {
                    startIndex = pageNum - 6;
                } else {
                    startIndex = pageIndex - 3;
                }

                if (startIndex == 2) {
                    _html += '<a href="javascript:CreditConfig.obtainBorrowRecordList(1)">1</a>';
                    _html += '...';
                }

                if (startIndex > 2) {
                    _html += '<a href="javascript:CreditConfig.obtainBorrowRecordList(1)">1</a>';
                    _html += '<a href="javascript:CreditConfig.obtainBorrowRecordList(2)">2</a>';
                    _html += '...';
                }

                for (var i = startIndex; i < startIndex + 7; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainBorrowRecordList(' + i + ')">' + i + '</a>';
                    }
                }

                endIndex = startIndex + 6;
                if (endIndex < pageNum) {
                    _html += '...';
                }
            }

            var nextField;
            if (next >= 1 && next <= pageNum) {
                nextField = '<a href="javascript:CreditConfig.obtainBorrowRecordList(' + next + ')">下一页</a>';
            } else {
                nextField = '<a href="javascript:void(0)">下一页</a>';
            }
            _html += nextField;
            $("#borrow_table_page").html(_html);
        },
        showOverduePage: function (pageIndex, pageNum) {
            var previous = pageIndex - 1;
            var next = pageIndex + 1;

            var previousField;
            if (previous >= 1 && previous <= pageNum) {
                previousField = '<a href="javascript:CreditConfig.obtainOverdueList(' + previous + ')">上一页</a>';
            } else {
                previousField = '<a href="javascript:void(0)">上一页</a>';
            }

            var _html = previousField;

            if (pageNum <= 7) {
                for (var i = 1; i <= pageNum; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainOverdueList(' + i + ')">' + i + '</a>';
                    }

                }
            } else {//总页数大于7时
                var marginLeft = pageIndex - 1;
                var marginRight = pageNum - pageIndex;
                var startIndex;
                var endIndex;
                if (marginLeft < 3) {
                    startIndex = 1;
                } else if (marginRight < 3) {
                    startIndex = pageNum - 6;
                } else {
                    startIndex = pageIndex - 3;
                }

                if (startIndex == 2) {
                    _html += '<a href="javascript:CreditConfig.obtainOverdueList(1)">1</a>';
                    _html += '...';
                }

                if (startIndex > 2) {
                    _html += '<a href="javascript:CreditConfig.obtainOverdueList(1)">1</a>';
                    _html += '<a href="javascript:CreditConfig.obtainOverdueList(2)">2</a>';
                    _html += '...';
                }

                for (var i = startIndex; i < startIndex + 7; i++) {
                    if (i == pageIndex) {
                        _html += '<span>' + i + '</span>';
                    } else {
                        _html += '<a href="javascript:CreditConfig.obtainOverdueList(' + i + ')">' + i + '</a>';
                    }
                }

                endIndex = startIndex + 6;
                if (endIndex < pageNum) {
                    _html += '...';
                }
            }

            var nextField;
            if (next >= 1 && next <= pageNum) {
                nextField = '<a href="javascript:CreditConfig.obtainOverdueList(' + next + ')">下一页</a>';
            } else {
                nextField = '<a href="javascript:void(0)">下一页</a>';
            }
            _html += nextField;
            $("#overdue_table_page").html(_html);
        },
        toReturnDoSearch: function (type) {
            if (type || type == 0) {
                TO_RETURN_TYPE = type;
            } else {
                TO_RETURN_TYPE = $("#returnDateType").find(".current").attr("value");
            }
            TO_RETURN_BEGIN_TIME = $("#toReturnBeginTime").val();
            TO_RETURN_END_TIME = $("#toReturnEndTime").val();
            $this.obtainToReturnList(1);
        },
        borrowRecordDoSearch: function (type) {
            BORROW_RECORD_STATUS = $("#borrowStatus").attr("data");
            BORROW_RECORD_BEGIN_TIME = $("#borrowRecordBeginTime").val();
            BORROW_RECORD_END_TIME = $("#borrowRecordEndTime").val();
            if (type || type == 0) {
                BORROW_RECORD_TYPE = type;
            } else {
                BORROW_RECORD_TYPE = $("#borrowRecordType").find(".current").attr("value");
            }
            $this.obtainBorrowRecordList(1);
        },
        sendMobileCaptcha: function (type) {

            var captcha = $('#captcha').val();

            if ("" == captcha) {

                $("#error_confirm").html('<i class="AllIcon Icon02"></i>请填写图形验证码');
                $this.getCapacha();
                return false;
            }

            if ("" != captcha) {
                // 验证码必须为4位的字符
                if (4 != captcha.length) {
                    $("#error_confirm").html('<i class="AllIcon Icon02"></i>请输入4位图形验证码');
                    $this.getCapacha();
                    return false;
                }

                if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(captcha)) {
                    $("#error_confirm").html('<i class="AllIcon Icon02"></i>图形验证码格式不对');
                    $this.getCapacha();
                    return false;
                }

            }

            //发送验证码
            $.ajax({
                url: '/v2/onlineloan/send_mobile_captcha.jso',
                type: 'post',
                dataType: 'json',
                data: {type: type, seed: seed, captcha: captcha},
                success: function (rs) {
                    if (rs.state == 1) {
                        $('#btn_send_voice').unbind("click");
                        //$('#btn_send_voice').removeClass("accsub01");
                        //$('#btn_send_voice').addClass("accsub02");
                        //$('#btn_send_sms').unbind("click");
                        //$('#btn_send_sms').removeClass("accsub01");
                        //$('#btn_send_sms').addClass("accsub02");
                        msgTime = 120;
                        $this.countDwonCaptcha();
                        $this.showVoiceTip();
                    } else {
                        if (rs.state == 2010) {
                            $("#error_confirm").html('<i class="AllIcon Icon02"></i>图形验证码输入不正确');
                        } else if (rs.state == 2019) {

                            $("#error_confirm").html('<i class="AllIcon Icon02"></i>等待120秒后再重试');
                        }
                        $this.getCapacha();
                    }
                }
            });

        },
        countDwonCaptcha: function () {
            if (msgTime > 0) {
                msgTime--;
                $('#btn_send_voice').html('(' + msgTime + 's)重发');
                $('#btn_send_voice').css('background', '#d7d7d7');
                //$('#btn_send_sms').html('' + msgTime + '秒后重发');
                setTimeout("CreditConfig.countDwonCaptcha()", 1000);
            } else {
                msgTime = 120;
                //$('#btn_send_voice').removeClass("accsub02");
                //$('#btn_send_voice').addClass("accsub01");
                $('#btn_send_voice').css('background', '#7dbfee');
                $('#btn_send_voice').html('发送验证码');

                $('#btn_send_voice').unbind("click").bind("click", function () {
                    $this.sendMobileCaptcha(1);
                });
                //$('#btn_send_sms').removeClass("accsub02");
                //$('#btn_send_sms').addClass("accsub01");
                //$('#btn_send_sms').html('短信验证码');
                /*$('#btn_send_sms').unbind("click").bind("click",function(){
                 sendMobileCaptcha(0);
                 });*/
            }
        },
        showAD: function (totalCreditLimit){
            if(Number(totalCreditLimit) == 0){
                $('#ad_box .carousel').css('display','block');
            }
        },
        showVoiceTip: function () {
            $('#voice_tip_view').show();
            setTimeout(function () {
                $('#voice_tip_view').hide();
            }, 100000);
        },
        getCapacha: function () {
            seed = new Date().getTime();
            $('#captcha_img').html('<img onclick="CreditConfig.getCapacha();" src="/v2/login/get_captcha.raw?seed=' + seed + '"   width="100" height="28" />');
        }
    };
    CreditConfig = $this;

    function toCentHalfUp(number) {
        return (1.00 * parseInt(number * 100 + 0.5)) / 100;
    }

    function formatDecimals(num) {
        return XR.Tool.formatDecimals(XR.Tool.toCent(num, 2) + '');
    }

    function formateDate(timestamp, format) {

        var _date, _year, _month, _day, _hour, _minute, _second;
        _date = new Date(timestamp * 1000);//时间戳要乘1000
        _year = _date.getFullYear();
        _month = (_date.getMonth() + 1 < 10) ? ('0' + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
        _day = (_date.getDate() < 10) ? ('0' + _date.getDate()) : (_date.getDate());
        _hour = (_date.getHours() < 10) ? ('0' + _date.getHours()) : (_date.getHours());
        _minute = (_date.getMinutes() < 10) ? ('0' + _date.getMinutes()) : (_date.getMinutes());
        _second = (_date.getSeconds() < 10) ? ('0' + _date.getSeconds()) : (_date.getSeconds());
        if (format == 'Y-m-d h:m:s') {
            return (_year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second);
        } else if (format == 'Y-m-d') {
            return (_year + '-' + _month + '-' + _day);
        } else if (format == 'm-d') {
            return (_month + '-' + _day);
        } else if (format == 'm-d h:m:s') {
            return (_month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second);
        } else if (format == 'm-d h:m') {
            return (_month + '-' + _day + ' ' + _hour + ':' + _minute);
        } else if (format == 'h:m:s') {
            return ( _hour + ':' + _minute + ':' + _second);
        } else if (format == 'Y-m-d h:m') {
            return (_year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute);
        } else if (format == 'h:m') {
            return ( _hour + ':' + _minute);
        }
        else {
            return 0;
        }
    }

    function utf16to8(str) { //转码
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    //全局 只需要一个
    BankQuickAuthWin = {
        defaults: {
            "real_name": '',
            "cert_no": '',
            "branch_name": '',
            "bank_no": '',
            "callback": undefined
        },
        options: undefined,
        isModify: false,
        box: null,
        realName: null,
        identifyNo: null,
        init: function (data) {
            BankQuickAuthWin.options = $.extend({}, BankQuickAuthWin.defaults, data);

            var options = BankQuickAuthWin.options;
            //初始化值
            /* $('#real_name').val(options.real_name);
             $('#cert_no').val(options.cert_no);
             $('#branch_name').val(options.branch_name);
             $('#bank_no').val(options.bank_no); */

            if (options.real_name != '') {

                BankQuickAuthWin.isModify = true;
                $('#dd_real_name').html('<b id="real_name">' + options.real_name + '</b>');
                $('#dd_cert_no').html('<span class="paddingleft" id="cert_no">' + options.cert_no + '</span>');
            }

            //初始化地址信息
            showLocation();
        },
        show: function (data) {
            /* var wBox = $("#wbox_quick_auth_box").wBox({
             title: "银行卡身份认证",
             html: bankQuickAuthHtml
             });

             wBox.showBox();	 */

            var wBox = $.dialog({

                'title': '银行卡身份认证',
                'padding': '0px 0px 0px 30px',
                'content': bankQuickAuthHtml,
                'height': '380px',
                'initialize': function () {

                    BankQuickAuthWin.init(data);
                }
            });

            BankQuickAuthWin.box = wBox;
        },
        check: function () {
            if ($('#step_one_next1').html() == '处理中…') {
                return;
            }
            var real_name = '';
            var cert_no = '';
            var bank_name = $("#bank_name :selected").text();
            var loc_province = $("#loc_province :selected").text();
            var loc_city = $("#loc_city :selected").text();
            var loc_town = $("#loc_town :selected").text();

            var loc_province_val = $("#province").val();
            var loc_city_val = $("#city").val();
            var loc_town_val = $("#town").val();

            var branch_name = $("#branch_name").val();
            var bank_no = $.trim($("#bank_no").val());

            if (!BankQuickAuthWin.isModify) {
                real_name = $("#real_name").val();
                cert_no = $.trim($("#cert_no").val());

                if (real_name == '') {
                    BankQuickAuthWin.showErrMsg('真实姓名不能为空');
                    return;
                }
                if (cert_no == '') {
                    BankQuickAuthWin.showErrMsg('身份证号不能为空');
                    return;
                }
                if (cert_no.length != 18) {
                    BankQuickAuthWin.showErrMsg('身份证号必须为18位');
                    return;
                }
                var Validator = new IDValidator(GB2260);
                //if(!/(\d{18}$)|(\d{17}(\d|X|x)$)/.test(cert_no)){
                if (!Validator.isValid(cert_no)) {
                    BankQuickAuthWin.showErrMsg('身份证输入不合法');
                    return;
                }
            }

            if (bank_name == '请选择银行') {
                BankQuickAuthWin.showErrMsg('请选择银行');
                return;
            }
            if (branch_name == '') {
                BankQuickAuthWin.showErrMsg('支行名称不能为空');
                return;
            }
            if (bank_no == '') {
                BankQuickAuthWin.showErrMsg('银行卡号不能为空');
                return;
            }
            if (isNaN(bank_no)) {
                BankQuickAuthWin.showErrMsg('银行卡号只能为数字');
                return;
            }

            if ((loc_province == '请选择省份' && loc_city == '请选择城市' && loc_town == '请选择地区' )
                && (loc_province_val != '' && loc_city_val != '' && loc_town_val != '')) {
                loc_province = loc_province_val;
                loc_city = loc_city_val;
                loc_town = loc_town_val;
            } else {
                if (loc_province == '请选择省份') {
                    BankQuickAuthWin.showErrMsg('请选择省份');
                    return;
                }
                if (loc_city == '请选择城市') {
                    BankQuickAuthWin.showErrMsg('请选择城市');
                    return;
                }
                if (loc_town == '请选择地区') {
                    BankQuickAuthWin.showErrMsg('请选择地区');
                    return;
                }
            }

            BankQuickAuthWin.hideErrMsg();

            BankQuickAuthWin.auth(real_name, cert_no, bank_name, loc_province, loc_city, loc_town, branch_name, bank_no);
        },
        auth: function (real_name, cert_no, bank_name, loc_province, loc_city, loc_town, branch_name, bank_no) {
            var city = loc_province + ' ' + loc_city + ' ' + loc_town;
            var quick_auth_bank_type = '8';

            $('#step_one_next1').removeClass('sub02').addClass('sub01');
            $('#step_one_next1').html('处理中…');
            UserAPI.Auth.QuickAuth({
                    realname: real_name,
                    identifyNo: cert_no,
                    bankName: bank_name,
                    city: city,
                    batchName: branch_name,
                    bankNo: bank_no,
                    type: quick_auth_bank_type
                },
                function (result) {
                    if (result.state == 0) {
                        if (result.data > 0) {
                            $('#step_one_next1').removeClass('sub01').addClass('sub02');
                            $('#step_one_next1').html('下一步');
                            BankQuickAuthWin.box.close();
                            window.location = "/2.0/zhima_authorize.shtml?state=/2.0/borrowing.html";
                        } else {
                            BankQuickAuthWin.realName = real_name;
                            BankQuickAuthWin.identifyNo = cert_no;

                            UserAPI.Auth.GetIdCardAndBankCheckNumber({}, function (result2) {
                                if (result2.state == 0) {
                                    var identificationLeftNumber = result2.data.identificationLeftNumber;
                                    if (identificationLeftNumber == null) {
                                        identificationLeftNumber = 3;
                                    }
                                    if (identificationLeftNumber <= 0) {
                                        $('#step_one_next1').removeClass('sub01').addClass('sub02');
                                        $('#step_one_next1').html('下一步');
                                        //window.location.href = 'id_bank_fee_auth.html';
                                        //BankQuickAuthWin.box.close();
                                        BankQuickAuthWin.feeAuthWin();
                                    } else {
                                        $('#step_one_next1').removeClass('sub02').addClass('sub01');
                                        $('#step_one_next1').html('处理中…');
                                        BankQuickAuthWin.idAuth(real_name, cert_no);
                                    }
                                }
                            });
                        }
                    } else {
                        $('#step_one_next1').removeClass('sub01').addClass('sub02');
                        $('#step_one_next1').html('下一步');
                        if (result.state == 1001) {
                            BankQuickAuthWin.showErrMsg('身份证已存在');
                            return;
                        } else if (result.state == 2100) {
                            BankQuickAuthWin.authFailWin();
                            return;
                        }
                    }
                }
            );
        },
        idAuth: function (realName, identifyNo) {
            if (!(realName && identifyNo)) {
                if (BankQuickAuthWin.realName == null || BankQuickAuthWin.identifyNo == null) {
                    return;
                }
                if (BankQuickAuthWin.realName == '' || BankQuickAuthWin.identifyNo == '') {
                    return;
                } else {
                    realName = BankQuickAuthWin.realName;
                    identifyNo = BankQuickAuthWin.identifyNo;
                }
            }

            UserAPI.Auth.idAuth({name: realName, certNo: identifyNo}, function (data) {
                $('#step_one_next1').removeClass('sub01').addClass('sub02');
                $('#step_one_next1').html('下一步');
                if (data.state == 0 || data.state == 2002 || data.state == 2000) {
                    BankQuickAuthWin.box.close();
                    BankQuickAuthWin.authFailWin();
                } else {
                    if (data.state == 2001) {
                        BankQuickAuthWin.showErrMsg('身份证格式不正确');
                    } else if (data.state == 2003 || data.state == 2000 || data.state == '-9999') {
                        BankQuickAuthWin.showErrMsg(data.msg);
                    } else if (data.state == 2100) {
                        BankQuickAuthWin.showErrMsg('真实姓名与身份证号不匹配。您还有' + data.msg + '次机会，超过3次认证每次收取5元手续费。');
                    } else if (data.state == 2101) {
                        BankQuickAuthWin.idAuthFailWin(true);
                    } else {
                        BankQuickAuthWin.showErrMsg('系统繁忙,稍后请重试');
                    }
                }
            });
        },
        showErrMsg: function (msg) {
            $("#error_info").html('<i class="AllIcon iconx"></i>' + msg).show();
        },
        hideErrMsg: function () {
            $("#error_info").html('').hide();
        },
        authSuccessWin: function () {
            /* var wBox = $("#wbox_quick_auth_box").wBox({
             title: "银行卡身份认证",
             html: quickAuthSuccessWin
             }); */

            var wBox = $.dialog({
                'title': '银行卡身份认证',
                'padding': '0px 0px 0px 0px',
                'content': quickAuthSuccessWin,
                'initialize': function () {

                    if (!BankQuickAuthWin.isModify) {
                        $('#quick_auth_success_reward').html('7');
                        $('#quick_auth_success_reward_desc').html('（实名认证3元+银行卡认证4元）');
                    } else {
                        $('#quick_auth_success_reward').html('4');
                        $('#quick_auth_success_reward_desc').html('（银行卡认证4元）');
                    }
                }
            });
            BankQuickAuthWin.box = wBox;
        },
        authFailWin: function () {
            /* var wBox = $("#wbox_quick_auth_box").wBox({
             title: "银行卡身份认证",
             html: quickAuthFailWin
             }); */

            var wBox = $.dialog({
                'title': '银行卡身份认证',
                'padding': '0px 0px 0px 0px',
                'content': quickAuthFailWin,
                'initialize': function () {
                }
            });

            BankQuickAuthWin.box = wBox;
        },
        idAuthFailWin: function (flag) {
            UserAPI.AccountBaseInfo({}, function (result) {
                if (result.state == 0) {
                    var totalMoney = result.totalMoney;

                    var wBox = $.dialog({
                        'title': '银行卡身份认证',
                        width: '370px',
                        'padding': '0px 0px 0px 0px',
                        'content': idAuthFailWin,
                        'initialize': function () {
                            if (flag) {
                                $('#idAuthFailWin_fee_view').html('5');
                            } else {
                                $('#idAuthFailWin_fee_view').html('0');
                            }
                            $('#idAuthFailWin_username_view').html(G_ENV_VAR.UNAME);
                            $('#idAuthFailWin_totalMoney_view').html(totalMoney);
                            $('#idAuthFailWin_btn_1').unbind('click').click(function () {
                                BankQuickAuthWin.box2.close();
                                BankQuickAuthWin.box.close();
                                BankQuickAuthWin.show();
                            });
                        }
                    });
                    BankQuickAuthWin.box2 = wBox;
                }
            });
        },
        feeAuthWin: function () {
            UserAPI.AccountBaseInfo({}, function (result) {
                if (result.state == 0) {
                    var totalMoney = result.totalMoney;
                    var rewardMoney = result.rewardMoney;

                    var wBox;
                    if (Number(totalMoney) >= 5) {//提示付费认证
                        wBox = $.dialog({
                            'title': '银行卡身份认证',
                            'padding': '0px 0px 0px 0px',
                            'content': feeAuth1Win,
                            'initialize': function () {
                                $('#feeAuth1Win_username_view').html(G_ENV_VAR.UNAME);
                                $('#feeAuth1Win_totalMoney_view').html(totalMoney);
                                $('#feeAuth1Win_btn_1').unbind('click').click(function () {
                                    $('#step_one_next1').removeClass('sub02').addClass('sub01');
                                    $('#step_one_next1').html('处理中…');
                                    BankQuickAuthWin.idAuth();
                                    BankQuickAuthWin.box2.close();
                                });
                                $('#feeAuth1Win_btn_2').unbind('click').click(function () {
                                    BankQuickAuthWin.box2.close();
                                });
                            }
                        });
                    } else {//提示充值
                        wBox = $.dialog({
                            'title': '银行卡身份认证',
                            'padding': '0px 0px 0px 0px',
                            'content': feeAuth2Win,
                            'initialize': function () {
                                $('#feeAuth2Win_username_view').html(G_ENV_VAR.UNAME);
                                $('#feeAuth2Win_totalMoney_view').html(totalMoney);
                                $('#feeAuth2Win_rewardMoney_view').html(rewardMoney);
                            }
                        });
                    }
                    BankQuickAuthWin.box2 = wBox;
                }
            });
        }
    };
})();

//轮播初始化
(function(){
  var $this = {
    carousels : $("#carousel_list>li"),
    selector : $("#carousel_sel"),
    carLen : $("#carousel_list>li").length,
    selectors : null,
    init : function(){
            $this.initSelectors();
            $this.autoSwitch();
            $this.selectorSwitch();
            $this.clickSwitch();
    },
    //根据轮播图数量添加选择圆点
    initSelectors : function(){
                      $this.selector.empty();
                      for(var i=0,length=$this.carousels.length;i<length;i++){
                        $this.selector.append("<li></li>");
                      };
                      $this.selectors = $this.selector.find("li");
                      $this.selectors.eq(0).addClass("active");
    },
    //轮播切换
    interval : 5000,
    autoTimer : null,
    activeIndex : 0,
    switching : function(){
                  $this.carousels.eq($this.activeIndex).addClass("active").siblings().removeClass("active"); 
                  $this.selectors.eq($this.activeIndex).addClass("active").siblings().removeClass("active");  
    },
    //自动切换
    autoSwitch : function(){
                  var length = $this.carousels.length;
                  $this.autoTimer = setInterval(function(){
                    if($this.activeIndex == length-1){
                      $this.activeIndex = 0;
                    }else{
                      $this.activeIndex++;
                    };
                    $this.switching();            
                  },$this.interval);
    },
    //圆点切换
    selectorSwitch : function(){
                      var bindEnter = function(index){
                        return function(){
                          clearInterval($this.autoTimer);
                          $this.activeIndex = index;
                          $this.switching();
                        }
                      };
                      for(var i=0,length=$this.selectors.length;i<length;i++){
                        $this.selectors.eq(i).on("mouseenter",bindEnter(i));
                        $this.selectors.eq(i).on("mouseout",function(){$this.autoSwitch();});
                      };
    },
    clickSwitch : function(){
                    var len = $this.carLen;

                    $("#arrow_left").on("click",function(){
                        clearInterval($this.autoTimer);
                        if($this.activeIndex>0){
                            $this.activeIndex--;
                            $this.switching();
                        }else{
                            $this.activeIndex = len - 1;
                            $this.switching();
                        }
                        $this.autoSwitch();
                    });

                    $("#arrow_right").on("click",function(){
                        clearInterval($this.autoTimer);
                        if($this.activeIndex<len-1){
                            $this.activeIndex++;
                            $this.switching();
                        }else{
                            $this.activeIndex = 0;
                            $this.switching();
                        }
                        $this.autoSwitch();
                    });
    }
  };
  $this.init();
})();

//tabs
(function(){
  var $this = {
    init : function(){
            $this.bindEvent($(".tabs_sel>li"),$(".tabs_contents>li"));
    },
    bindEvent : function(tabs_sel,tabs_contents){
                  var clickEvent = function(index){
                    return function(){
                      tabs_sel.eq(index).addClass("current").siblings().removeClass("current");
                      tabs_contents.eq(index).addClass("current").siblings().removeClass("current");
                    }
                  };
                  for(var i=0,length=tabs_sel.length;i<length;i++){
                    tabs_sel.eq(i).on("click",clickEvent(i));
                  }
    }
  };
  $this.init();
})();