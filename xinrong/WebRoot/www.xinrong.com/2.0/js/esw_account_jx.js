var Esw_account_api=Esw_account_api||{};
    Esw_account_api={
        generateHtml:function( formFieldsString)
        {
            var fields=JSON.parse(formFieldsString);
            html=("<html>");
            html+="<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=\"UTF-8\""
            html+="\" pageEncoding=\"UTF-8"
            html+="\" />";
            html+="<title>loading</title>";
            html+="<style type=\"text/css\">";
            html+="body{margin:200px auto;font-family: \"\u5B8B\u4F53\", Arial;font-size: 12px;color: #369;text-align: center;}";
            html+="#1{height:auto; width:78px; margin:0 auto;}";
            html+="#2{height:auto; width:153px; margin:0 auto;}";
            html+="img{vertical-align: bottom;}";
            html+="</style>";
            html+="</head>";
            html+="<body>";
            html+="<div id=\"3\">\u4EA4\u6613\u5904\u7406\u4E2D...</div>";
            html+=Esw_account_api.generateForm(formFieldsString);
            html+="</body>";
            html+="</html>";
            return html;
        },
        generateForm:function(formFieldsString)
        {
            var fields=JSON.parse(formFieldsString);

            html="<form name=\"forwardForm\" action=\""
            html+=fields.action
            html+="\" "
            html+=" accept-charset=\"UTF-8\""
            html+=" method=\"POST\">"
            for(var key in fields)
            {
                var value=fields[key];
                if(typeof value !='undefined' && value.length>0 && key!='action')
                {
                    html+="<input type=\"hidden\" name=\""+key+"\" id=\""+key+"\" value=\'"+value+"\'/>";
                }
            }

            html+="<input type=\"submit\" />";
            html+="</form>";
            html+="<SCRIPT LANGUAGE=\"Javascript\">";
            if (typeof debugging =='undefined'||debugging == 0)
                html+="document.forwardForm.submit();";
            html+="</SCRIPT>";
            return html;
        },
    BaseInfo : function(data, success, error) {
        XR.Global.async({
            url : '/v2/member/get_base_info.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });
    },
    showInNewWindow:function(name,html)
    {
        // redirector=window.open("","EscrowRedirector","");
        document.write(html);
    },
    accountInfo:function(callback)
    {
        $.ajax({
            url : '/v2/member/esw_account_info.jso',
            type : 'post',
            data:{mask:0},
            dataType : 'json',
            success : function(result) {
                callback(result);
            }
        })
    },
    getAutoCreditInvestAuthRequest:function(channel,failback)
    {
        $.ajax({
            url : '/v2/member/esw_auto_credit_invest_auth.jso',
            type : 'post',
            data:{channel:channel},
            dataType : 'json',
            success : function(result) {
                if(result.state==0)
                {
                    history.pushState(null,null,location.href);
                    Esw_account_api.showInNewWindow("c2gojump",Esw_account_api.generateHtml(result.data));
                }
                else {
                    failback(result)
                }
            }
        })
    },
    bankInfo:function (callback) {
        $.ajax({
                url:'/v2/account/get_esw_bank_card_info.jso',
                type:'post',
                data:{channel:000002},
                dataType:'json',
                success:function(result) {
                    callback(result);
                }
            }
        )
    }
    ,
    personalInfo:function (callback) {

            $.ajax({
                url : '/v2/member/get_personal_info.jso',
                type : 'post',
                dataType : 'json',
                success : function(result) {
                    callback(result);
                }
            })
        
    },
    authAutoBidInvest:function(callback){

        //000002  网页
        Esw_account_api.getAutoBidAuthRequest('000001',callback);
    },
        getAutoBidAuthRequest:function(channel,failback)
        {
            $.ajax({
                url : '/v2/member/esw_auto_bid_auth.jso',
                type : 'post',
                data:{channel:channel},
                dataType : 'json',
                success : function(result) {
                    if(result.state==0)
                    {
                        history.pushState(null,null,location.href);
                        Esw_account_api.showInNewWindow("c2gojump",Esw_account_api.generateHtml(result.data));
                    }
                    else {
                        failback(result)
                    }
                }
            })
        },
    setEswPassword:function(debugging,channel,failback)
    {
        $.ajax({
            url:'/v2/account/esw_account_password_set.jso',
            type:'post',
            dataType:'json',
            data:{channel:channel},
            success:function(result){
                if(result.state==0)
                {
                    history.pushState(null,null,location.href);
                    Esw_account_api.showInNewWindow("c2gojump",Esw_account_api.generateHtml(result.data));
                }else {
                    // failback(result);
                }
            }
        });
    },
    autoCreditInvestAuth:function(callback){

        //000002  网页
        Esw_account_api.getAutoCreditInvestAuthRequest('000001',function(result){
            // ViewDialog.closeLoadding();
            callback(result);

        });
    },
    createAccount2:function(data,callback)
    {
            $.ajax({
                url : '/v2/escrowex/create_account.jso',
                type : 'post',
                data:data,
                dataType : 'json',
                success : function(result) {
                    callback(result);
                }
            })
    },
    resetEswAccountPassword:function(channel,failback)
    {
        $.ajax({
            url : '/v2/account/esw_account_password_reset_direct.jso',
            // url : '/v2/account/esw_account_password_reset_direct.jso',
            type : 'post',
            data:{channel:channel},
            dataType : 'json',
            success : function(result) {
                if(result.state==0)
                {
                    history.pushState(null,null,location.href);
                    Esw_account_api.showInNewWindow("c2gojump",Esw_account_api.generateHtml(result.data));
                }
                else {
                    // failback(result)
                }
            }
        })
    }
}