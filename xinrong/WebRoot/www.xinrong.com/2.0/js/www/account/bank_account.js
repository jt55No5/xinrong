
var alreadyCreate='<div class="esw_dialog" style="width: 450px">\
        <div class="tie_font">\
        <h2><i class="icondagth"></i>该身份证或手机号已开通过存管账户，不能再次开通<span id="cardNo"></span></h2>\
    <a href="esw_certification.html" class="sub02">知道了</a></div>\
        </div>\
        <div class="black20"></div>';

var IdBankModify;
$(function(){
    var $this = {
        realname:null,
        box:null,
        identifyNo:null,
        countDownTime:0,
        certInfo:null,
        isOldUser:false,
        init:function(){
            Api_User.ClearMobileCaptcha({sendCaptcheType:"commonMobileCaptcha"},function(info){
                if(info.state==0){ //在页面刷新时 清除原来的手机验证码
                    $this.showModifyView();
                    $this.bindModifyNextEvent();

                    $this.bindCityChooseEvent();
                    $this.fetchBankInfoFromCache();
                    $this.initCaptche();

                }
            });
        },
        bindCityChooseEvent:function(){
            showLocation("山西省");

        },
        fetchCityInfoFromCache:function() {
            //从缓存里面拿选择的开户地址
            $.ajax({
                url : '/v2/member/get_user_cache_data.jso?key=user_addr_area',
                type : 'post',
                dataType : 'json',
                success : function(result) {
                    var area = result.data;
                    if(area != null){
                        $('#city').html(area);
                        var addr=area.split(" ");
                        $("#loc_province").find("option[text='北京市']").attr("selected",true);
                        var allOpts = $("#loc_province option");

                        $this.initBankAddr(addr[0],addr[1],addr[2]);

                        var branchname=$('#batch_name').val();
                        if(branchname.length==0){

                        }
                    }
                }
            });
        },
        clearCityInfoFromCache:function() {
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_addr_area',value:null},
                success : function(data) {
                    if(data.state != 0){
                        // alert('开户城市清除失败');
                    }
                    else
                    {
                        $('#city').html('');
                    }
                }
            });
        },
        fetchBankInfoFromCache:function(){
            //从缓存里面拿银行信息
            $.ajax({
                url : '/v2/member/get_user_cache_data.jso?key=user_choose_bank',
                type : 'post',
                dataType : 'json',
                success : function(result) {
                    if(result.data != null){
                        $('#bank').val(result.data);
                    }
                }
            });
        },
        fetchBankCardNoFromCache:function(){
            $.ajax({
                url : '/v2/member/get_user_cache_data.jso?key=user_choose_bank_no',
                type : 'post',
                dataType : 'json',
                success : function(result) {
                    if(result.data != null){
                        $('#bank_no').val(result.data);

                    }
                }
            });
        },
        fetchBankBatchNameFromCache:function(){
            $.ajax({
                url : '/v2/member/get_user_cache_data.jso?key=user_choose_bank_batch_name',
                type : 'post',
                dataType : 'json',
                success : function(result) {
                    if(result.data != null){
                        $('#batch_name').val(result.data);
                    }
                }
            });
        },

        cacheIdCheckStatusServer:function(){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_id_check_status',value:'true'},
                success : function(data) {
                    if(data.state == 0){
                        $this.cacheIdCheckStatusServerTime();
                    }else{
                        // alert('身份认证状态保存失败');
                    }
                }
            });
        },
        cacheIdCheckStatusServerTime:function(){
            var time = new Date().getTime();
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_id_check_status_time',value:time},
                success : function(data) {
                    if(data.state != 0){
                        // alert('身份认证状态时间保存失败');
                    }
                }
            });
        },
        clearIdCheckStatusCache:function(){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_id_check_status',value:null},
                success : function(data) {
                    if(data.state != 0){
                        // alert('身份认证状态清除失败');
                    }
                }
            });
        },
        cacheRealNameonServer :function (realName) {
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_fill_realname',value:realName},
                success : function(data) {
                    if(data.state != 0){
                        // alert('姓名填写失败');
                        $('#real_name').val("");
                    }
                }
            });
        },
        clearBankBranchCache:function(){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_choose_bank_batch_name',value:null},
                success : function(data) {
                    if(data.state != 0){
                        // alert('支行信息清除失败');
                    }
                    else
                        $('#batch_name').val('');
                }
            });
        },
        cacheIDonServer:function (id) {
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_fill_identifyno',value:id},
                success : function(data) {
                    if(data.state != 0){
                        // alert('身份证信息填写失败');
                        $("#identify_no").val("");
                    }
                }
            });
        },
        cacheUserAddressArea:function (address) {
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_addr_area',value:address},
                success : function(data) {
                    if(data.state != 0){
                        // alert('身份证信息填写失败');
                        // $("#identify_no").val("");
                    }
                }
            });
        },
        cacheBankIDonServer:function(bank_id){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_choose_bank',value:bank_id},
                success : function(data) {
                    if(data.state != 0){
                        // alert('所属银行选择失败');
                    }
                }
            });
        },
        cacheBankNoonServer:function(bank_no){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_choose_bank_no',value:bank_no},
                success : function(data) {
                    if(data.state != 0){
                        // alert('银行卡号缓存失败');
                    }
                }
            });
        },
        cacheBankBatchNameServer:function(batch_name){
            $.ajax({
                url : '/v2/member/user_cache_data.jso',
                type : 'post',
                dataType : 'json',
                data:{key:'user_choose_bank_batch_name',value:batch_name},
                success : function(data) {
                    if(data.state != 0){
                        // alert('支行名称缓存失败');
                    }
                }
            });
        },
        checkBankCard:function(){
            var cardNo=$('#bank_no').val();
            if(cardNo.length>4){
                var card=BANK_CARD.getCardInfo(cardNo,4);
                if(typeof card =='object' && card !=null){
                    $('#bank').html(card.bank);
                    if(cardNo.length!=card.codelen){
                        $this.showErrorMsg('银行卡号应为'+card.codelen+'个数字!');
                    }else{
                        $this.clearErrorMsg();
                    }
                }else{
                    $('#bank').html("未知银行");
                }
                $this.cacheBankNoonServer(cardNo);

                $this.clearBankBranchCache();

                $this.clearCityInfoFromCache();
            }
        },
        checkBankCardOnChange:function(){
            var cardNo=$('#bank_no').val();
            if(cardNo.length>4){
                var card=BANK_CARD.getCardInfo(cardNo,4);
                if(typeof card =='object' && card !=null){

                    if(cardNo.length == card.codelen){
                        $('#bank').val(card.bank);
                        $this.cacheBankNoonServer(cardNo);
                        $this.cacheBankIDonServer(card.bank);
                    }
                }
            }
        },
        showErrorMsg:function(msg){
            $('#error_info').html('<i class="AllIcon iconx"></i>' + msg).show();
        },
        clearErrorMsg:function () {
            $('#error_info').html('').hide();
        },
        checkIdentity:function(){
            var certNo=$.trim($('#validate_cert_no').val());
            var realName=$('#validate_real_name').val();

            if(realName == ''){
                $this.showErrorMsg('真实姓名不能为空');
                return;
            }
            if(certNo == ''){
                $this.showErrorMsg('身份证号不能为空');
                return;
            }

            $this.clearErrorMsg();

            Api_User.Auth.GetIdAuthInfo({},function(result){
                $this.realname = result.realname;
                $this.identifyNo = result.identifyNo;
                if(result.state==0){
                    Api_User.Auth.ValidateIdentityInfo({realName:realName,certNo:certNo},function(result2){
                        if(result2.state==1){
                            $this.cacheIdCheckStatusServer();
                            $this.showModifyView();
                            $this.bindModifyNextEvent();
                        }else{
                            $this.showErrorMsg('输入身份证信息有误,请重新输入');
                        }
                    });
                }else{
                    $this.showErrorMsg('实名认证未通过,请先进行银行卡身份认证');
                }
            });
        },
        showModifyView:function(){
            $this.initIdInfo();
            $this.initCaptche();
            // $this.fetchCityInfoFromCache();
            $this.fetchBankInfoFromCache();
            $this.fetchBankCardNoFromCache();
            //$this.fetchBankBatchNameFromCache();
            $('#check_view').hide();
            $('#modify_view').show();
        },
        initIdInfo:function(){
            if($this.realname && $this.identifyNo){
                $('#real_name').val($this.realname);
                $('#identify_no').attr('placeholder',$this.identifyNo);
                // $('#identify_no').val($this.identifyNo);
            }else{

            }

            Api_User.AccountCertInfo({},function(certInfo) {

                if (certInfo.state == 0) {
                    $this.certInfo=certInfo.data;

                    if(typeof certInfo.data!='undefined' && certInfo.data.name!=null)
                    {
                        $this.isOldUser = true;
                        $('#real_name').val(certInfo.data.name);
                        $("#real_name").prop('disabled', true);
                        $("#real_name").attr("disabled","disabled");
                    }


                    if(typeof certInfo.data!='undefined' && certInfo.data.idNo!=null)
                    {
                        $('#identify_no').val(certInfo.data.idNo);
                        $("#identify_no").prop('disabled', true);
                    }

                    if(typeof certInfo.data!='undefined' && certInfo.data.bankCardNo!=null)
                    {
                        $("#bank_no").val(certInfo.data.bankCardNo);
                        $('#bank_no').attr("type",'');
                        $("#bank_no").prop('disabled', true);
                        $("#bank").val(certInfo.data.bankName);
                        $("#bank").attr("disabled","disabled");
                    }
                    if(certInfo.data.bankBranchName!=null && certInfo.data.bankBranchName!='')
                    {
                        $('#batch_name').val(certInfo.data.bankBranchName);
                        $("#batch_name").prop('disabled', true);
                    }

                    if(typeof certInfo.data!='undefined' && certInfo.data.mobile!=null)
                    {
                        $('#mobile_no').val(certInfo.data.mobile);
                        // $('a#modify_mobile_no').attr('href','user_mobile_update_step1.html?mobile='+certInfo.data.mobile);
                    }

                    if(certInfo.data.city!=null && certInfo.data.province!=null && certInfo.data.zone!=null) {
                        var title =[];
                        $('#loc_province').empty();
                        $('#loc_city').empty();
                        $('#loc_town').empty();
                        title[0]	= '<option value="'+certInfo.data.province+'">'+certInfo.data.province+'</option>';
                        title[1]	= '<option value="'+certInfo.data.city+'">'+certInfo.data.city+'</option>';
                        title[2]	= '<option value="'+certInfo.data.zone+'">'+certInfo.data.zone+'</option>';
                        $('#loc_province').append(title[0]);
                        $('#loc_city').append(title[1]);
                        $('#loc_town').append(title[2]);
                        $('#loc_province').find('option[value="' + certInfo.data.province + '"]').attr('selected', true);
                        $('#loc_city').find('option[value="' + certInfo.data.city + '"]').attr('selected', true);
                        $('#loc_town').find('option[value="' + certInfo.data.zone + '"]').attr('selected', true);
                        $("#loc_province").attr("disabled","disabled");
                        $("#loc_city").attr("disabled","disabled");
                        $("#loc_town").attr("disabled","disabled");

                    }else{
                        $this.fetchCityInfoFromCache();
                    }


                }
            });
            Api_User.GetPersonalInfo({},function(result){
                if(!!result.provinceName&&!!result.cityName&&!!result.districtName){

                }else{

                }

                // if(!!result.subBranchName){
                //     $("#batch_name").val(result.subBranchName);
                //     $("#batch_name").attr("disabled","disabled");
                // }
            });
            $('#mobile_no').attr("disabled","disabled");
            // $('#real_name').attr("disabled","disabled");
            //    $('#identify_no').attr("disabled","disabled");
        },
        initBankAddr:function (province,city,district) {
            var loc = new Location();
            $.each(loc.find('0'),function (key,value) {
                if (value.indexOf(province)>-1){
                    // $("#loc_province").find("option[value="'+key+'"]").attr("selected",true);

                    $.each(loc.find('0,'+key),function (key1,value1) {
                        if (value1.indexOf(city)>-1){

                            $.each(loc.find('0,'+key+','+key1),function (key2,value2) {
                                if (value2.indexOf(district)>-1) {
                                    $('#loc_province').empty();
                                    $('#loc_city').empty();
                                    $('#loc_town').empty();

                                    showLocation(key,key1,key2);

                                    $('#loc_province').find('option[value="' + key + '"]').attr('selected', true);
                                    $('#loc_city').find('option[value="' + key1 + '"]').attr('selected', true);
                                    $('#loc_town').find('option[value="' + key2 + '"]').attr('selected', true);
                                }
                            })

                        }
                    });


                }
            });

        },
        initCaptche:function(){
            $('#captcha_pic').unbind('click').click(function(){
                $this.getCaptche();
            });
            $this.getCaptche();
        },
        getCaptche:function(){
            var seed=new Date().getTime();
            $('#captcha_pic').attr('src','/v2/login/get_captcha.raw?seed='+seed);
            $('#seed').val(seed);
        },
        sendMobileCaptcha:function(type){
            var captcha=$('#captcha').val();
            var seed = $('#seed').val();
            if(captcha.length!=4){
                $this.showErrorMsg('请正确输入图形验证码');
                return;
            }

            $this.clearErrorMsg();

            EscrowApiJx.getEswSmsCaptcha(
                captcha,
                seed,0
                ,function(data){
                    if(data.state == 0){
                        $('#sms_seed').val(data.data);
                        $this.countDownTime=120;
                        $this.countDownCaptcha1();
                        $this.showVoiceTip();
                    }else{
                        $('#sms_seed').val('');
                        $this.showErrorMsg('图形验证码输入错误,请点击图形刷新重试');
                    }
                });
        },
        countDownCaptcha1:function(){
            if($this.countDownTime>0){
                $this.countDownTime--;
                $('#send_voice').removeClass("sub03").addClass("sub01").html('(' + $this.countDownTime + 's)重发');
                $('#send_voice').unbind("click");
                //$('#send_sms').removeClass("sub01").addClass("sub03").html('(' + $this.countDownTime + 's)重发');
                //$('#send_sms').unbind("click");
                setTimeout("IdBankModify.countDownCaptcha1()", 1000);
            }else{
                $this.countDownTime=120;
                $('#send_voice').removeClass("sub01").addClass("sub03").html('发送验证码');
                $('#send_voice').unbind("click").bind('click',function(){
                    $this.sendMobileCaptcha(1);
                });
                //$('#send_sms').removeClass("sub03").addClass("sub01").html('短信验证码');
                /*$('#send_sms').unbind("click").bind('click',function(){
                 $this.sendMobileCaptcha(0);
                 });*/

                $('#captcha').val('');
                $this.getCaptche();
            }
        },
        showVoiceTip:function(){
            $('#voice_tip_view').show();
            setTimeout(function(){
                $('#voice_tip_view').hide();
            },100000);
        },
        changeCaptcha:function () {

            $('#captcha').click();
        },

        bindModifyNextEvent:function(){
            $('#next_but').unbind('click').click(function(){
                if($this.certInfo!=null && $this.certInfo.eswAccountId!=null)
                {
                    $this.showErrorMsg("本账户已经开立存管户，无需重复开立！");
                    return;
                }

                var bank = $('#bank').val();
                var province = $("#loc_province").find("option:selected").text();
                var city =$("#loc_city").find("option:selected").text();
                var town = $("#loc_town").find("option:selected").text();


                var branch_name = $('#batch_name').val();
                var bank_no = $.trim($('#bank_no').val());

                var certNo=$.trim($('#identify_no').val());
                var realName=$('#real_name').val();


                if($this.isOldUser){
                    realName = '';
                }else{
                    if(realName == '' && $this.certInfo!=null && $this.certInfo.name==null){
                        $this.showErrorMsg('真实姓名不能为空');
                        return;
                    }
                }

                if($this.certInfo!=null && $this.certInfo.idNo==null){
                    var idNoVerifyResult = IdCardValid.isIdCard(certNo);
                    if(idNoVerifyResult.status==false)
                    {
                        $this.showErrorMsg(idNoVerifyResult.info);
                        return;
                    }

                }else if($this.certInfo!=null && $this.certInfo.idNo!=null)
                {
                    certNo='';
                }
                if($this.certInfo!=null && $this.certInfo.bankCardNo==null){
                    if(bank_no == ''){
                        $this.showErrorMsg("银行卡号不能为空");
                        return;
                    }
                    if(isNaN(bank_no)){
                        $this.showErrorMsg("银行卡必须为数字");
                        return;
                    }
                    if(bank_no.length>4){
                        var card=BANK_CARD.getCardInfo(bank_no,4);
                        if(typeof card =='object' && card !=null){
                            if(bank_no.length!=card.codelen){
                                $this.showErrorMsg('银行卡号应为'+card.codelen+'个数字!');
                                return;
                            }else if(card.bank!=bank){
                                $this.showErrorMsg("您写的银行卡号与已选的开户银行不匹配");
                                return;
                            }
                            else{
                                $this.clearErrorMsg();
                            }
                        }else{
                            $this.showErrorMsg("您写的银行卡号与已选的开户银行不匹配");
                            return;
                        }
                    }else{
                        $this.showErrorMsg("您写的银行卡号与已选的开户银行不匹配");
                        return;
                    }
                    if(bank == ''){
                        $this.showErrorMsg("所属银行不能为空");
                        return;
                    }

                }else  if($this.certInfo!=null && $this.certInfo.bankCardNo!=null)
                {
                    bank_no='';
                    bank='';
                }


                if(province=='请选择省份'||province==undefined||province==""){
                    $this.showErrorMsg('请选择省份');
                    return;
                }
                if(city=='请选择城市'||city==undefined||city==""){
                    $this.showErrorMsg('请选择城市');
                    return;
                }
                if(town=='请选择地区'||town==undefined||town==""){
                    $this.showErrorMsg('请选择地区');
                    return;
                }


                var bank_addr = province +" "+city+" "+town;



                if(branch_name == ''){
                    $this.showErrorMsg("支行名称不能为空");
                    return;
                }
                // if(branch_name.substr(branch_name.length-2) != '支行'){
                //     $this.showErrorMsg("支行名称请以'支行'结尾");
                //     return;
                // }


                var mobileCaptcha=$('#mobile_captcha').val();
                if(mobileCaptcha.length!=6){
                    $this.showErrorMsg('手机验证码输入错误');
                    return;
                }

                var authCode=$('#sms_seed').val()
                if(authCode=='')
                {
                    $this.showErrorMsg("请先获取短信验证码");
                    return;
                }

                var agreement=$('#agreement')[0].checked;
                if(agreement!=true)
                {
                    $this.showErrorMsg('请勾选同意书才能开户');
                    return;
                }
                $this.clearErrorMsg();

                var quick_auth_bank_type='8';
                $("#bounce").show();
                Esw_account_api.createAccount2(
                    {
                        name:realName,
                        idCardNo:certNo,
                        bandCardNo:bank_no,
                        bankName:bank,
                        batchName:branch_name,
                        city:bank_addr,
                        captcha:mobileCaptcha,
                        authCode:authCode,
                        userType:0
                    },function(result)
                    {
                        $("#bounce").hide();
                        if(result.state == '0'){

                            // $this.createSuccess(result);
                            // $.cookie("createAccountSuccessReturn","1");
                            // Esw_account_api.setEswPassword(0,1,function () {
                            //
                            // });
                            $.ajax({
                                url:'/v2/account/esw_account_password_set.jso',
                                type:'post',
                                dataType:'json',
                                data:{channel:1,isNewEswAccount:1},
                                success:function(result){

                                    if(result.state==0)
                                    {
                                        Esw_account_api.showInNewWindow("c2gojump",Esw_account_api.generateHtml(result.data));
                                    }else {

                                    }
                                }
                            });


                        } else if(result.state == '1009'){
                                AA.RapidLogin.popup();
                            }else {
                                $this.showErrorMsg(result.msg);
                            }

                    }
                );

            });

            //姓名 写入缓存
            $('#real_name').blur(function(event){
                var val = $(this).val();
                if(val != ""){
                    $this.cacheRealNameonServer(val);
                }
            });

            //身份证 写入缓存
            $('#identify_no').blur(function(event){
                var val = $(this).val();
                if(val != ""){
                    $this.cacheIDonServer(val);
                }
            });

            $('#bank_no').blur(function(event){
                // $this.checkBankCard();
                $this.checkBankCardOnChange();
            });

            $('#bank_no').unbind("keyup").bind("keyup",function(event){
                $this.checkBankCardOnChange();
            });

            //支行名称 写入缓存
            $('#batch_name').blur(function(event){
                var val = $(this).val();
                if(val != ""){
                    $this.cacheBankBatchNameServer(val);
                }
            });
            $('#loc_town').change(function(event){
                var loc_province =$("#loc_province :selected").text();
                var loc_city =$("#loc_city :selected").text();
                var loc_town =$("#loc_town :selected").text();
                var addr = loc_province+" "+loc_city+" "+loc_town;
                if (loc_town!=""||loc_town!=undefined||loc_town!="请选择地区"){
                    // $("#batch_name").val(loc_town+"支行");
                }
                if(addr != ""){
                    $this.cacheUserAddressArea(addr);
                }
            });



            /*$('#send_sms').unbind("click").bind('click',function(){
             $this.sendMobileCaptcha(0);
             });*/
            $('#send_voice').unbind("click").bind('click',function(){
                $this.sendMobileCaptcha(1);
            });
        },
        bindIdCheckEvent:function(){
            $('#next_but').unbind('click').click(function(){
                $this.checkIdentity();
            });
        },
        createSuccess:function (result) {
            var wBox= $.dialog({
                'title':'提示',
                'padding':'0px 0px 0px 0px',
                'content':createSuccess,
                'initialize':function () {
                }
            });
            $this.box=wBox;
            Api_User.Auth.GetIdAuthInfo({},function(result){
                if(result.state==0){
                    $('#diaName').html(result.realname);
                    EscrowApiJx.accountInfo(function(eswAccount){
                        if(eswAccount.state==0)
                        {
                            $('#diaEswAccount').html(eswAccount.eswAccountId);
                        }
                        else if(eswAccount.state=='1009') {

                        }
                    })
                }else if(result.state=='1009')
                {
                    // XR.Global.Login();
                }
            })

        },
        alreadyCreate:function () {
            var wBox= $.dialog({
                'title':'提示',
                'padding':'0px 0px 0px 0px',
                'content':alreadyCreate,
                'initialize':function () {
                }
            });
            $this.box=wBox;
        },
        isLogin:function(){
            $.ajax({
                url:'/v2/login/in_session_data.jso',
                type:'GET' ,
                dataType:'json',
                success:function (result) {
                    if(result.state==0){
                        $this.init();
                    }else{
                        AA.RapidLogin.popup();
                    }
                }
            });
        }
    };

    $(function(){
        $this.isLogin();
    });
    IdBankModify = $this;
});
