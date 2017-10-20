$(document).ready(function () {
    gotSwitch();
});
function gotSwitch(){
    var $gotBtn = $(".rewardCon .hasGot .got"),
        $notGotBtn = $(".rewardCon .hasGot .notGot"),
        $gotBox = $(".rewardCon .rewardBox .got"),
        $notGotBox = $(".rewardCon .rewardBox .notGot");

    var gotFunc = function(){
        $gotBtn.addClass("current").removeClass("unread");
        $notGotBtn.removeClass("current");
        $gotBox.fadeIn();
        $notGotBox.hide();
    }
    $gotBtn.on("click",gotFunc);
    var notGotFunc = function(){
        $notGotBtn.addClass("current").removeClass("unread");
        $gotBtn.removeClass("current");
        $notGotBox.fadeIn();
        $gotBox.hide();
    }
    $notGotBtn.on("click",notGotFunc);
}
function dateFormatter(time,fmt) {
    var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var Reward_Helper;
(function(){
    $RewardCard = {
        bankRewardId:"bankCheckReward",
        registerRewardId:"registerReward",
        registerScoreId:"registerScore",
        //type: 0 score 1 inviteReward  2:bankAuthReward
        getInValidTips:function (number,getMethod,type,asMoney,id) {
           var titleName = "投资礼金";
            var moneySymbol = "&yen;";
           var moneyTips;
           var toUse;
            if(type === 0){
                titleName = "积分值";
                moneySymbol = "";
                if(parseInt(number) > 10000) number = number/10000 + "万";
                if(asMoney) moneyTips = '<div class="offsetCon"><em>价值</em><span class="number">'+asMoney+'元</span><em>投资礼金</em></div>';
                toUse = '<div class="statusCon usage"><a href="/invest.shtml" target="_blank" class="status">前往投资></a></div>';
            }else if(type === 1){
                toUse = '<div class="statusCon usage"><a href="/action/reg_invite" target="_blank" class="status">查看详情></a></div>';
            }else{
                toUse = '<div class="statusCon usage"><a href="/2.0/views/account/account_settings.shtml" target="_blank" class="status">去完成></a></div>';
            }
            var titleWithNumber = '<div class="typeCon"><span class="rmb">'+moneySymbol+'</span><span class="number">'+number+'</span><span class="type">'+titleName+'</span></div>';
            var getMethod = ' <div class="acqMethodCon"><em>获得方式 : </em><span class="acqMethod">'+getMethod+'</span></div>';

            var wrapper = $('<div class="reward inValid"></div>');
            if(id) wrapper = $('<div id="'+id+'" class="reward inValid"></div>');
            $(wrapper).append(titleWithNumber);
            if(moneyTips) $(wrapper).append(moneyTips);
            $(wrapper).append(getMethod);
            $(wrapper).append(toUse);

            return wrapper;
        },
        //type: 0 score 1 inviteReward  2:bankAuthReward 3:doraPhoneCall
        getValidTips:function (number,getMethod,type,asMoney,id,expireTime) {
            var titleName = "投资礼金";
            var moneySymbol = "&yen;";
            var moneyTips;
            var toUse;
            var spendMethod;
            if(type === 0){
                titleName = "积分值";
                moneySymbol = "";
                if(parseInt(number) > 10000) number =number/10000 + "万";
                if(asMoney) moneyTips = '<div class="offsetCon"><em>价值</em><span class="number">'+asMoney+'元</span><em>投资礼金</em></div>';
                spendMethod = '<div class="useMethodCon"><em>使用方式 : </em><span class="useMethod">抽奖或兑换礼品</span></div>';
                toUse = '<div class="statusCon usage"><a href="/gift" target="_blank" class="status">兑换&gt;</a></div>';
            }else if(type > 0 && type < 3){
                spendMethod = '<div class="useMethodCon"><em>使用方式 : </em><span class="useMethod">投资全额抵扣</span></div>';
                toUse = '<div class="statusCon usage"><a href="/invest.shtml" target="_blank" class="status">投资&gt;</a></div>';
            }else{
                spendMethod = '<div class="useMethodCon"><em>使用方式 : </em><span class="useMethod">添加好友,拨打免费电话</span></div>';
                toUse = '<div class="statusCon usage"><a href="/2.0/views/call/call.shtml" target="_blank" class="status">使用&gt;</a></div>';
            }
            var titleWithNumber = '<div class="typeCon"><span class="rmb">'+moneySymbol+'</span><span class="number">'+number+'</span><span class="type">'+titleName+'</span></div>';
            var getMethod = ' <div class="acqMethodCon"><em>获得方式 : </em><span class="acqMethod">'+getMethod+'</span></div>';
            var expire;
            if(expireTime) expire = '<div class="deadlineCon"><span>有效期 : </span><span class="deadline">'+expireTime+'</span></div>';
            
            var wrapper = $('<div class="reward valid"></div>');
            if(id) wrapper = $('<div id="'+id+'" class="reward valid"></div>');
            $(wrapper).append(titleWithNumber);
            if(moneyTips) $(wrapper).append(moneyTips);
            $(wrapper).append(getMethod);
            $(wrapper).append(spendMethod);
            if(expire) $(wrapper).append(expire);
            $(wrapper).append(toUse);

            return wrapper;
        }
    }
    $this = {
        isInit:0,
        timeFlag:new Date("2016/12/22 00:00:00"),
        init:function () {
            if(!$this.isInit){
                $this.getRegisterReward($this.checkUserAndInit);
                $this.isInit = 1;
            }
        },
        //old User or New ; result:{data:{}}
        checkUserAndInit:function (result) {
            var info =  $this.getMostElderRegisterReward(result);
            if(info == null || info.ctime*1000 < $this.timeFlag){
                $('#myRewardGot').html("");
                $('#myRewardNotGot').html("");
                $('#empty').show();
                return false;
            }
            $this.getUserRewardScore();
            $this.getBankCheckReward($this.getInvestRecordToCheckRewardUsage);
            $this.getInviteReward();
            $this.getDoraPhoneCallUsage();
            $this.getUsedScore();
            return true;
        },
        getMostElderRegisterReward:function (result) {
            if(result.state == 1009 || result.data.length < 1){
                return null;
            }
            if( result.data.length == 1) return  result.data[0];
            var info = result.data[0];
            $(result).each(function (i,e) {
               if(info.ctime > e.ctime){
                   info = e;
               }
            })
            return info;
        },
        //投资礼金
        getUserReward:function (data,success,error) {
            $.ajax({
                url: '/v2/account/get_reward_info.jso',
                type: 'post',
                data: data,
                dataType: 'json',
                success: success,
                error: error
            });
        },
        getRegisterReward:function (beforeSuccess) {
            $this.getUserReward({type:1},function (result) {
                if (result.state == 0) {
                    var valid = beforeSuccess(result);
                    if(valid){
                        var begin = dateFormatter(new Date(result.data[0].ctime*1000),"yyyy.MM.dd");
                        var end =   dateFormatter(new Date((result.data[0].ctime  + 45 * 86400)*1000),"yyyy.MM.dd");
                        $("#"+$RewardCard.registerRewardId+" .deadlineCon").show();
                        $("#"+$RewardCard.registerRewardId+" .deadline").text(begin + " - " + end);
                        if( (result.data[0].ctime + 45 * 86400) < (new Date().getTime() / 1000) && !$("#"+$RewardCard.registerRewardId).hasClass("used")){
                            $this.asOverdue($("#"+$RewardCard.registerRewardId));
                        }
                    }
                }else{
                    beforeSuccess(result);
                }
            })
        },
        getBankCheckReward:function (callback) {
            $this.getUserReward({type:4},function (result) {
                if (result.state == 0) {
                    if(result.data.length > 0){
                        var begin = dateFormatter(new Date(result.data[0].time*1000),"yyyy.MM.dd");
                        var end =   dateFormatter(new Date((result.data[0].time  + 45 * 86400)*1000),"yyyy.MM.dd");
                        var time = begin + " - " + end;
                        $("#myRewardGot").append($RewardCard.getValidTips(7,"完成银行卡认证",2,null,$RewardCard.bankRewardId,time));
                        if( (result.data[0].time + 45 * 86400) < (new Date().getTime() / 1000) && !$("#"+$RewardCard.bankRewardId).hasClass("used")){
                            $this.asOverdue($("#"+$RewardCard.bankRewardId));
                        }
                    }else{
                        $("#myRewardNotGot").append($RewardCard.getInValidTips(7,"完成银行卡认证",2,null,$RewardCard.bankRewardId));
                    }
                    callback && callback();
                }
            })
        },
        getInviteReward:function () {
            $this.getUserReward({type:7},function (result) {
                if (result.state == 0) {
                    if(result.data.length > 0){
                        var total = 0;
                        $(result.data).each(function (i,e) {
                            total = total + parseFloat(e.money);
                        })
                        if(total < 1000){
                            $("#myRewardGot").append($RewardCard.getValidTips(total.toFixed(2),"奖励根据被推荐人首笔投资额度和推荐人VIP等级而定,最高奖励1000元。",1));
                            $("#myRewardNotGot").append($RewardCard.getInValidTips((1000-total).toFixed(2),"奖励根据被推荐人首笔投资额度和推荐人VIP等级而定,最高奖励1000元。",1));
                        }else{
                            $("#myRewardGot").append($RewardCard.getValidTips(1000,"奖励根据被推荐人首笔投资额度和推荐人VIP等级而定,最高奖励1000元。",1));
                        }
                    }else{
                        $("#myRewardNotGot").append($RewardCard.getInValidTips(1000,"奖励根据被推荐人首笔投资额度和推荐人VIP等级而定,最高奖励1000元。",1));
                    }
                }
            })
        },
        getUserRewardScore:function () {
            var money = {};
            money[0] = 4000;money[1] = 8000;
            money[2] = 20000;money[2] = 40000;money[3] = 100000;
            var message = {};
            message[4000] = ["单笔投资4000元到6月项目可获得6000积分",0,6000];
            message[8000] = ["单笔投资8000元到6月项目可获得1.2万积分",0,12000];
            // message[20000] = ["单笔投资2万元到6月项目可获得3万积分",0,30000];
            message[40000] = ["单笔投资4万元到6月项目可获得6万积分",0,60000];
            message[100000] = ["单笔投资10万元到6月项目可获得15万积分",0,150000];
            var extraTip = "<br/><label>*仅限投资6月项目，非额外奖励</label>";
            $.ajax({
                url: '/v2/member/get_invest_project_ext_list.jso',
                type: 'post',
                data:{money:money,deadline:6,pageSize:100,pageIndex:1,time:3,startTime:0,endTime:new Date().getTime(),i_order:1},
                dataType: 'json',
                success:function (result) {
                    if (result.state == 1) {
                        for(var key in money){
                            $(result.data.rows).each(function (si,se) {
                                var rMoney = parseInt(se.money);
                                if(money[key] == rMoney){
                                    if(!message[money[key]][1]){
                                        var asMoney = message[money[key]][2]/1000*2.5;
                                        if(asMoney.toString().indexOf('.')>-1)asMoney = asMoney.toString().substring(0,asMoney.toString().indexOf('.')+3);
                                        $("#myRewardGot").append($RewardCard.getValidTips(message[money[key]][2],message[money[key]][0]+extraTip,0,asMoney));
                                        message[money[key]][1] = 1;
                                    }
                                }
                            })
                        }
                        for(var key in message){
                            if(!message[key][1]){
                                var asMoney = message[key][2]/1000*2.5;
                                if(asMoney.toString().indexOf('.')>-1) asMoney = asMoney.toString().substring(0,asMoney.toString().indexOf('.')+3);
                                $("#myRewardNotGot").append($RewardCard.getInValidTips(message[key][2],message[key][0]+extraTip,0,asMoney));
                            }
                        }
                    }
                }
            })
        },
        getDoraPhoneCallUsage:function () {
          $.ajax({
              url:"/v2/communication/get_sum_used_talk_time.jso",
              type:'post',
              dataType:'json',
              success:function (result) {
                 if(result){
                     if(result.usedComboTime >= 3600){
                        $this.asUsed($("#doraPhoneCall"));
                     }
                 }
              }
          })
        },
        getInvestRecordToCheckRewardUsage:function () {
            $.ajax({
                url: '/v2/member/get_invest_project_ext_list.jso',
                type: 'post',
                data:{pageSize:1,pageIndex:1,time:3,startTime:0,endTime:new Date().getTime(),i_order:1},
                dataType: 'json',
                success:function (result) {
                    if (result.state == 1) {
                        if(result.data.rows.length > 0){
                            $this.asUsed($('#'+$RewardCard.registerRewardId));
                            $this.asUsed($('#'+$RewardCard.bankRewardId));
                        }
                    }
                }
            })
        },
        getUsedScore:function () {
            $.ajax({
                url: '/v2/member/get_user_score_sum.jso',
                type: 'get',
                data:{streamType:2},
                dataType: 'json',
                success:function (result) {
                    if (result.state == 1) {
                        if(result.data >= 1000){
                            $this.asUsed($('#'+$RewardCard.registerScoreId));
                        }
                    }
                }
            })
        },
        asUsed:function(target){
            if($("#myRewardNotGot").children(target))$("#myRewardGot").append(target);
            $(target).removeClass("inValid");
            $(target).removeClass("valid");
            $(target).removeClass("overdue");
            $(target).children(".statusCon").remove();
            $(target).addClass("used");
        },
        asOverdue:function (target) {
            if($("#myRewardNotGot").children(target))$("#myRewardGot").append(target);
            $(target).removeClass("inValid");
            $(target).removeClass("valid");
            $(target).children(".statusCon").remove();
            $(target).addClass("overdue");
        }
    }
    Reward_Helper = $this;
})();

