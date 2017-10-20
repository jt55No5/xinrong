UserAPI={
	BaseInfo:function(data, success, error) {
		AA.Api.async({
			url:'/v2/member/get_base_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	AccountBaseInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_account_base_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户基本信息
	AccountIndexInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/xincunbao/get_index_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户信存宝信息
	AccountXcbInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/xincunbao/get_xcb_info.jso#'+new Date().getTime() ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户资产信息
	AccountAssetOverview:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_asset_overview.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户投资收益信息
	AccountInvestIncomeStatistics:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_invest_income_statistics.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户回款、待收记录查询
	AccountUpcomingRefundList:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_upcoming_refund_list.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//项目回款计划
	RefundPlanInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/refund/user_under_refund_plan.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//获取账户认证信息
	AuthInfo:function(data,success,error){
		AA.Api.async({
			url:'/my/api_accountinfo' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户投资管理信息查询
	AccountInvestManagementInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_invest_management.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户投资项目列表查询
	AccountInvestLoanList:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_invest_project_ext_list.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//收益详情查询
	GetIncomeInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_income_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//转让详情信息查询
	TransferLoanDetail:function(data,success,error){
		AA.Api.async({
			url:'/v2/transfer/transfer_loan_detail.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//转让确认信息查询
	TransferScore:function(data,success,error){
		AA.Api.async({
			url:'/v2/transfer/transfer_score.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//账户信息获取
	GetPersonalInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/get_personal_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//转让申请
	CreditorTransfer:function(data,success,error){
		AA.Api.async({
			url:'/v2/transfer/creditor_transfer.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//收支记录查询
	IncomeAndExpenseExtInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/income_and_expense_ext.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//充值记录查询
	RechargeMoneyExtInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/recharge_money_ext.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//提现记录查询
	WithdrawMoneyExtInfo:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/withdraw_money_ext.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改登录密码
	ModifyLoginPassword:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_pwd.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改交易密码
	ModifySafePassword:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_safe_pwd.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//找回用户名
	FindUserName:function(data,success,error){
		AA.Api.async({
			url:'/v2/member/user_find_username.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//发送手机验证码
	GetMobileCaptcha:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/get_mobile_captcha.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//通用发送手机验证码（包括语音验证码）
	SendMobileCaptcha:function(data,success,error){
		AA.Api.async({
			url:'/v2/authenticate/send_modify_bank_sms.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//验证手机验证码
	CheckMobileCaptcha:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/check_mobile_captcha.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	
	//认证邮箱
	AuthEmail:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/verify_email_step1.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改手机第一步
	ModifyPhoneStep1:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_phone_step1.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改手机第二步
	ModifyPhoneStep2:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_phone_step2.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改手机第三步
	ModifyPhoneStep3:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_phone_step3.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	//修改手机第四步
	ModifyPhoneStep4:function(data,success,error){
		AA.Api.async({
			url:'/v2/login/modify_phone_step4.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	SaveActiveAddress:function(data,success,error){
		Common.Global.async({
			url:'/v2/member/save_user_active_address.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	GetEmergency:function (data,success,error) {
		AA.Api.async({
			url:'/v2/member/get_emergency_contact.jso' ,
			type:'GET' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	SaveOrUpdateEmergency:function (data,success,error) {
		Common.Global.async({
			url:'/v2/member/save_emergency_contact.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	BaseInfoWithEswJx : function(data, success, error) {
        XR.Global.async({
            url : '/v2/escrow/get_base_info.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });
    },
    AssetOverviewWithEswJx: function(data, success, error) {
        XR.Global.async({
            url : '/v2/escrow/get_asset_overview.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });
    },
    InvestInfoWithEswJx: function(data, success, error) {
        XR.Global.async({
            url : '/v2/escrow/get_invest_management.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });
    },
    BaseAccountInfoWithEswJx : function(data, success, error) {
        XR.Global.async({
            url : '/v2/escrow/get_account_base_info.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });

    },
    GetEswWasteBookInfo : function(data, success, error) {
        XR.Global.async({
            url : '/v2/member/esw_get_waste_book_info.jso',
            type : 'POST',
            data : data,
            success : success,
            error : error
        });
    },
    getIncomeAndExpense:function(data,callback)
    {
        $.ajax({
          url : '/v2/member/esw_income_and_expense.jso',
          type : 'post',
          data:data,
          dataType : 'json',
          success : function(result) {
              callback(result);
          }
         })
    },
	GetUserMobileVoiceCheckStatus:function(data,callback)
    {
        $.ajax({
          url : '/v2/member/get_user_mobile_voice_check_status.jso',
          type : 'post',
          data:data,
          dataType : 'json',
          success : function(result) {
              callback(result);
          }
         })
    },
	Auth:{
		//快速认证
		QuickAuth:function(data,success,error){
			AA.Api.async({
				url:'/v2/account/bank_info_fill.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		//实名认证
		idAuth:function(data,success,error){
			AA.Api.async({
				url:'/v2/authenticate/identity_auth.jso' ,
				type:'POST' ,
				data:data ,
				timeout:65000,
				success:success ,
				error:error
			});
		},
		//获取实名认证信息（带*）
		getIdAuthInfo:function(data,success,error){
			AA.Api.async({
				url:'/v2/account/get_bank_and_idcard_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		ValidateIdentityInfo:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/validate_identity_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		GetIdCardAndBankCheckNumber:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/get_id_card_and_bank_check_number.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
	},
	//自动投资
	AutoInvest:{
		Info:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/get_auto_invest.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		Set:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/set_auto_invest.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		//关闭自动投资
		CloseAutoInvest:function(data,success,error){
			AA.Api.async({
				url:'/v2/invest/edit_auto_invest.jso?status=0' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
	},
	Register:{
		Mobile_Captcha:function(data,success,error){
			AA.Api.async({
				url:'/v2/register/register_tel_captcha.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		
		Pre:function(data,success,error){
			AA.Api.async({
				url:'/v2/register/register_step_one.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		Submit:function(data,success,error){
			AA.Api.async({
				url:'/v2/register/register_step_two.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
			
	},
	Deposit:{
		CalculateFee:function(data,success,error){
			AA.Api.async({
				url:'/v2/withdraw/calculate_fee.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		Withdraw:function(data,success,error){
			AA.Api.async({
				url:'/v2/withdraw/user_withdraw.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		BankInfo:function(data,success,error){
			AA.Api.async({
				url:'/v2/withdraw/user_withdraw_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
	},
	BankCard:{
		
		BankInfo:function(data,success,error){
			AA.Api.async({
				url:'/v2/charge/get_bank_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}	
	},
	Note:{
		GetNoteList:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/get_user_notes.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		GetNoteById:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/get_user_note_by_id.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		SetNoteIsRead:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/set_user_note_is_read.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		SetNoteIsDel:function(data,success,error){
			AA.Api.async({
				url:'/v2/member/set_user_note_is_del.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
	},
	GetRewardInfo:function(data,success,error){
		Common.Global.async({
			url:'/v2/account/get_reward_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	GetUserRewardBack:function(data,success,error){
		Common.Global.async({
			url:'/v2/member/get_user_reward_back.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	ApplyForRewardBack:function(data,success,error){
		Common.Global.async({
			url:'/v2/member/apply_for_reward_back.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	Call:{
		GetUserInfo:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/get_user_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		GetFriendList:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/get_friend_info_by_user_id.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		GetRecordList:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/get_record_by_user_id.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		UpdateAttention:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/update_attention.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		UpdateNotes:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/update_notes.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		AddMobile:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/add_mobile.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		Call:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/call.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		InviterFirstCall:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/inviter_first_call.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		Invite:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/invite.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		LinkCreateCommunication:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/link_create_communication.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		CheckMobile:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/check_mobile.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		ClickCreateCommunication:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/click_create_communication.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		DeleteFriend:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/delete_friend_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		GetTradeInfoList:function(data,success,error){
			Common.Global.async({
				url:'/v2/communication/communication_trade_info.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		},
		VipCall:function(data,success,error){
			XR.Global.async({
				url:'/v2/communication/vip_call.jso' ,
				type:'POST' ,
				data:data ,
				success:success ,
				error:error
			});
		}
	},
	UpdateEmergency:function(data,success,error){
		Common.Global.async({
			url:'/v2/communication/update_emergency_info.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	}
	
};