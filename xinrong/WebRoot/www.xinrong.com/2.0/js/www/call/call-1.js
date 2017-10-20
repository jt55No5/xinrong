var Call;
(function(){
	$this = {
		pageSize:10,
		userQueryParam:null,
		search:null,
		friends:{},
		leftSumTime:null,
		ischeckIdentity:null,
		realVip:null,
		init:function(){
			//$this.showWarnInfo();
			$this.initCall();
			$this.initFriendList();
			//$this.initGoodFriendList();
			$this.initRecordList();
			$this.initTradeInfoList();
			$this.bindEvent();
			$this.confirmFriend();
		},
		initCall:function(){
			UserAPI.AccountIndexInfo({},function(result){
				if(result.state==0){
					var vipDeadLine = result.vipDeadLine;   
					var vip = result.vip;
					$this.realVip=result.vip;
					
					if(vipDeadLine == 0 || vip == 0){
						$("#unVip").show();
						$("#vip").hide();
					}else{
						$("#unVip").hide();
						$("#vip").show();
						$("#vipGrade").html('VIP'+vip);
						$("#vipDeadLine").html(getLocalTime(vipDeadLine));
					}
				}else if(result.state == 1009){
		    		AA.RapidLogin.popup();
					return;
		    	}
			});
			
			UserAPI.Call.GetUserInfo({},function(result){
		    	if(result.state==0){
		    		var mobile=result.mobile;
		    		$this.mobile = result.mobile;
		    		//var newMobile="+86"+" "+mobile.substring(0,3)+"-"+mobile.substring(3,7)+"-"+mobile.substring(7,11);
		    		var newMobile="+86"+" "+mobile;
		    		var leftSumTime=result.leftSumTime;
		    		$this.leftSumTime = leftSumTime;
		    		
		    		$("#name").html(result.name);
		    		$("#mobile").html(newMobile);
		    		$("#callLeftSumTime").html(leftSumTime);
		    		
		    		var baseSendTime=result.sendTalkTime;
		    		var leftRewardTime=result.leftRewardTime;
		    		var leftPackTime=result.leftPackTime;
		    		var sum=result.sumTime;
		    		
		    		//$("#leftSumTime").html(leftSumTime);
		    		$("#baseSendTime").html(baseSendTime);
		    		$("#leftRewardTime").html(leftRewardTime);
		    		$("#leftPackTime").html(leftPackTime);
		    		sumTime = result.sumTime;
		    		leftTime = parseInt(sumTime*(leftSumTime/sum)) || 0;
		    		Start();
		    	}else if(result.state == 1009){
		    		AA.RapidLogin.popup();
					return;
		    	}
			});
		},
		initFriendList:function(){
			$this.search = null;
			$this.getFriendList(1);
		},
		getFriendList:function(pageIndex){
			UserAPI.Call.GetFriendList({
				type:0,
				param:$this.search,
				pageIndex:pageIndex,
				pageSize:$this.pageSize
			},function(result){
				$this.showFriendResult(result,'friendList_view','friendList_page','Call.getFriendList',pageIndex);
			});
		},
		initGoodFriendList:function(){
			$this.search = null;
			$this.getGoodFriendList(1);
		},
		getGoodFriendList:function(pageIndex){
			UserAPI.Call.GetFriendList({
				type:1,
				param:$this.search,
				pageIndex:pageIndex,
				pageSize:$this.pageSize
			},function(result){
				$this.showFriendResult(result,'goodFriendList_view','goodFriendList_page','Call.getGoodFriendList',pageIndex);
			});
		},
		showFriendResult:function(result,resultView,pageView,pageCallBack,pageIndex){
			if(result.state==0){
				var data=result.friendList;
		    	var count=result.count;
		    	$('#'+resultView).empty();
		    	if(data.length == 0){
		    		if(resultView == 'friendList_view'){
		    			$('.call-font').show();
		    		}else{
		    			$('#'+resultView).html('<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="10">暂无可免费通话联系人</td></tr>');
		    		}
		    		return;
		    	}else{
		    		if(resultView == 'friendList_view'){
		    			$('.call-font').hide();
		    		}
		    	}
		    	var _html='';
				for (var i in data) {
		    		var d = data[i];
		    		var id = d.id;
					var isAttention=d.isAttention;
					var friendUserId=d.friendUserId;
					var friendMobile=d.friendMobile;
					var friendName=d.friendName;
					var realName=d.realName;
					var ext_2=d.ext_2 || '';
					var isSuccesCall=d.isSuccesCall;
					var name_html='';
					var mobile_call_html='';
					
					$this.friends[id] = d;
					
					if (isAttention==1) {//代表关注
						name_html+= '<td align="center">'+friendName+'<a id="attention_'+i+'" href="javascript:Call.updateAttention('+id+',0,\'attention_'+i+'\')" class="AllIcon icon02" title="取消关注"></a></td>';
					} else {
						name_html+= '<td align="center">'+friendName+'<a id="attention_'+i+'" href="javascript:Call.updateAttention('+id+',1,\'attention_'+i+'\')" class="AllIcon icon01" title="特别关注"></a></td>';
					}
					
					if(isSuccesCall == 2){
						if($this.ischeckIdentity>0){
							mobile_call_html+=' <td align="center"><a href="javascript:Call.addFriend(\''+friendMobile+'\')" id="inside01"><i class="AllIcon Icon12"></i></a><a href="javascript:Call.vipcall('+friendMobile+')" id="inside01"><img src="/2.0/images/call02.png" style="vertical-align: middle;"/></a></td>'
						}else{
							mobile_call_html+=' <td align="center"><a href="javascript:Call.addFriend(\''+friendMobile+'\')" id="inside01"><i class="AllIcon Icon12"></i></a></td>';
						}
					}else{
						mobile_call_html+=' <td align="center"><a href="javascript:Call.call('+friendUserId+',\''+friendMobile+'\',\''+realName+'\','+isSuccesCall+')" id="inside01"><img src="/2.0/images/call02.png" /></a></td>';
					}
					
					_html+=' <tr>'+name_html+' <td align="center">'+realName +'</td><td align="center">'+
					friendMobile+'</td>'+mobile_call_html+' <td align="center"><input id="notes_'+i+'" type="text" class="callinp" value="'+ext_2+'" placeholder="添加备注" onblur="Call.updateNotes('+id+',\'notes_'+i+'\',\''+ext_2+'\')" /></td>';
					_html+='<td align="center"><a href="javascript:Call.deleteFriend(\''+id+'\');"><img src="/2.0/images/call06.png" /></a></td></tr>';
				}
				
				$('#'+resultView).html(_html);
				
				if(count>$this.pageSize){
					$('#'+pageView).show();
					$('#'+pageView).pagination({
                		 'container':'#'+pageView,
                         'pageSize':$this.pageSize ,
                         'total':count ,
                         'pageIndex':pageIndex ,
                         'callback':pageCallBack
					});
				}else{
 					$('#'+pageView).hide();
 				}
		    	
				//$.each(result.friendList,function(i,v){
				//});
			}else{
				if(result.state==1009){
					AA.RapidLogin.popup();
					return;
				}
			}
		},
		initRecordList:function(){
			$this.getRecordList(1);
		},
		getRecordList:function(pageIndex){
			UserAPI.Call.GetRecordList({
				pageIndex:pageIndex,
				pageSize:$this.pageSize
			},function(result){
				if(result.state==0){
					var data=result.recordList;
			    	var count=result.count;
			    	$('#recordList').empty();
			    	if(data.length == 0){
		    			$('#recordList').html('<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="10">暂无通话记录</td></tr>');
		    			return;
			    	}
			    	var _html='';
			    	for ( var i in data) {
			    		var d = data[i];
						var name=d.name;
						var talkTime=d.talkTime;
						var cTime=d.c_Time;
						
						_html+=' <tr> <td align="center">'+name +'</td><td align="center">'+
						talkTime+'</td><td align="center">'+cTime+'</td></tr>';
					}
			    	
			    	$("#recordList").html(_html);
			    	
			    	if(count>$this.pageSize){
						$('#recordListPage').show();
						$('#recordListPage').pagination({
	                		 'container':'#recordListPage',
	                         'pageSize':$this.pageSize ,
	                         'total':count ,
	                         'pageIndex':pageIndex ,
	                         'callback':'Call.getRecordList'
						});
					}else{
						$('#recordListPage').hide();
	 				}
				}
			});
		},
		initTradeInfoList:function(){
			$this.getTradeInfoList(1);
		},
		getTradeInfoList:function(pageIndex){
			UserAPI.Call.GetTradeInfoList({
				pageIndex:pageIndex,
				pageSize:$this.pageSize
			},function(result){
				if(result.state==0){
					var data=result.tradeDto;
			    	var count=result.sumCount;
			    	$('#callTimeList').empty();
			    	if(data.length == 0){
		    			$('#callTimeList').html('<tr><td style="text-align:center; padding:20px 0 0 0;" colspan="5">暂无时长记录</td></tr>');
		    			return;
			    	}
			    	var _html='';
			    	for ( var i in data) {
			    		var d = data[i];
						var tradeMoney=d.tradeMoney||'-';
						var tradeType=d.tradeType;
						var realTradeType=d.realTradeType;
						var tradeTime=d.tradeTime;
						var talkTime=d.talkTime;
						
						_html+='<tr>\
									<td align="center">'+tradeTime +'</td>\
									<td align="center">'+realTradeType +'</td>\
									<td align="center">'+tradeMoney +'</td>\
									<td align="center">'+talkTime +'</td>\
									<td align="center">'+tradeType +'</td>\
								</tr>';
					}
			    	
			    	$("#callTimeList").html(_html);
			    	
			    	if(count>$this.pageSize){
						$('#callTimeListPage').show();
						$('#callTimeListPage').pagination({
	                		 'container':'#callTimeListPage',
	                         'pageSize':$this.pageSize ,
	                         'total':count ,
	                         'pageIndex':pageIndex ,
	                         'callback':'Call.getTradeInfoList'
						});
					}else{
						$('#callTimeListPage').hide();
	 				}
				}
			});
		},
		updateAttention:function(id,flag,eventId){
			UserAPI.Call.UpdateAttention({
				attention:flag,
				id:id
			},function(result){
				if(result.state == 0){
					if(flag == 0){
						$('#'+eventId).removeClass('icon02');	
						$('#'+eventId).addClass('icon01');
						$('#'+eventId).attr('title','特别关注');
						$('#'+eventId).attr('href','javascript:Call.updateAttention('+id+',1,\''+eventId+'\')');
						//$this.initGoodFriendList();
					}else{
						$('#'+eventId).removeClass('icon01');	
						$('#'+eventId).addClass('icon02');
						$('#'+eventId).attr('title','取消关注');
						$('#'+eventId).attr('href','javascript:Call.updateAttention('+id+',0,\''+eventId+'\')');
					}
				}else if(result.state==1009){
					AA.RapidLogin.popup();
					return;
				}
			});
		},
		updateNotes:function(id,eventId,oldNotes){
			var notes = $.trim($('#'+eventId).val());
			if(notes == oldNotes){
				return;
			}
			UserAPI.Call.UpdateNotes({
				notes:notes,
				id:id,
			},function(result){
				if(result.state == 0){
					$('#'+eventId).attr('onblur','Call.updateNotes('+id+',\''+eventId+'\',\''+notes+'\')');
					$this.friends[id].ext_2 = notes;
				}else if(result.state==1009){
					AA.RapidLogin.popup();
					return;
				}
			});
		},
		deleteFriend:function(id){
			var wBox=$("#delete_friend_box").wBox({
				title: "删除好友",
				html: $("#delete_friend_box").html(),
				top:7
			});
			
			wBox.showBox();
			
			var name = '';
			if($this.friends[id].ext_2){
				name = $this.friends[id].ext_2;
			}else if($this.friends[id].realName && $this.friends[id].realName != '-'){
				name = $this.friends[id].realName;
			}else if($this.friends[id].friendName && $this.friends[id].friendName != '-'){
				name = $this.friends[id].friendName;
			}else{
				name = $this.friends[id].friendMobile;
			}
			
			$('#wBox #delete_friend_name').html(name);
			
			$('#wBox #delete_friend_btn').click(function(){
				var friendUserId = $this.friends[id].friendUserId;
				var friendMobile = $this.friends[id].friendMobile;
				UserAPI.Call.DeleteFriend({
					id:id,
					friendUserId:friendUserId,
					friendMobile:friendMobile
				},function(result){
					if(result.state == 0){
						$this.initFriendList();
					}else if(result.state==1009){
						AA.RapidLogin.popup();
						return;
					}
				});
			});
		},
		call:function(friendUserId,friendMobile,friendName,isSuccessCall){
			if($this.leftSumTime == null || $this.leftSumTime == 0){
				$this.showError('您的免费通话时间为0，暂不可使用朵朵来电功能！');
				return;
			}
			if(isSuccessCall == 1){
				//因为创蓝现不支持，所以添加拦截
				if((/^([0][0-9]{9,11})|([4][0][0][0-9]{7})$/.test(friendMobile))){
				$this.showError('暂不能拨打座机！');
				return;
					}
				
				UserAPI.Call.Call({
					friendUserId:friendUserId,
					friendMobile:friendMobile
				},function(result){
					if(result.state == 0){
						$('#call_name').html(friendName);
						$('#call_show').show();
						setTimeout(function(){
							$('#call_show').hide();
						},5000);
					}else{
						if(result.state == 1009){
							AA.RapidLogin.popup();
							return;
						}else{
							if(result.state == 5 || result.state == 4){
								$this.showError('您的免费通话时间为0，暂不可使用朵朵来电功能！');
							}else{
								$this.showError(result.msg);
								var loc;
								if (result.state == 3) {
									loc = '/2.0/views/account/account_settings.shtml';
								}else{
									loc = '/2.0/views/call/call.shtml';
								}
								$('#wBox #wBox_close').click(function(){
									window.location.href=loc;
								});
							}
						}
					}
				});
			}else{
				var wBox=$("#call_friend_box").wBox({
					title: "确定联系人",
					html: $("#call_friend_box").html(),
					top:7
				});
				
				wBox.showBox();
				
				$('#wBox #friend_name_show_2').html(friendName);
				
				$('#wBox #call_btn').click(function(){
					var friendMobile = $.trim($('#wBox #friend_mobile_2').val());
					var errorView = $('#wBox #call_friend_error_view');
					
					errorView.empty().hide();
					if(friendMobile == ''){
						errorView.html('请输入联系人号码').show();
						return;
					}
					
					if(!(/^([1][0-9]{10})|([0][0-9]{9,11})|([4][0][0][0-9]{7})$/.test(friendMobile))){
						errorView.html('号码格式错误').show();
						return;
					}
					
					UserAPI.Call.InviterFirstCall({
						friendUserId:friendUserId,
						inputMobile:friendMobile
					},function(result){
						if(result.state == 0){
							wBox.close();
							$('#call_name').html(friendName);
							$('#call_show').show();
							setTimeout(function(){
								$('#call_show').hide();
								Call.initFriendList();
								//Call.initGoodFriendList();
							},5000);
						}else{
							if(result.state == 1009){
								AA.RapidLogin.popup();
								return;
							}else{
								var msg = result.msg;
								if(result.state == 4|| result.state == 5){
									msg = '您的免费通话时间为0，暂不可使用朵朵来电功能！';
								}
								errorView.html(msg).show();
							}
						}
					});
				});
			}
		},
		showError:function(msg){
			var wBox=$("#error_box").wBox({
				title: "提示",
				html: $("#error_box").html(),
				top:7
			});
			
			wBox.showBox();
			
			$('#wBox #error_show').html(msg);
		},
		showWarnInfo:function(msg){
			var wBox=$("#showWarnInfo").wBox({
				title: "提示",
				html: $("#showWarnInfo").html(),
				top:7
			});
			
			wBox.showBox();
		},
		addFriend:function(friendMobile){
			var wBox=$("#add_friend_confirm_box").wBox({
				title: "加为免费好友",
				html: $("#add_friend_confirm_box").html(),
				top:7
			});
			
			UserAPI.Call.Invite({
				mobile:friendMobile
			},function(result){
				if(result.state == 1){
					wBox.showBox();
					$('#wBox #friend_mobile_show').html(friendMobile);
					$('#wBox #messages').html(result.data);
					
					$('#wBox #copy_btn').zclip({
						path: '/2.0/js/ZeroClipboard.swf',
						copy: function(){
							return $("#wBox #messages").text();
						},
						afterCopy: function(){
							wBox.close();
							
							var wBox2=$("#copy_box").wBox({
								title: "复制成功",
								html: $("#copy_box").html(),
								top:7
							});
							wBox2.showBox();
						}
					});
				}else{
					if(result.state == 1009){
						AA.RapidLogin.popup();
						return;
					}else{
						alert('系统繁忙，请稍后再试！');
					}
				}
			});
		},
		bindEvent:function(){
			$('#tab1').click(function(){
				$this.initFriendList();
			});
			
			/*$('#tab2').click(function(){
				$this.initGoodFriendList();
			});*/
			
			$('#tab3').click(function(){
				$this.initRecordList();
			});
			
			$('#tab4').click(function(){
				$this.initTradeInfoList();
			});
			
			$('#search_btn').click(function(){
				$this.search = $.trim($('#search_param').val());
				if($('#content1').is(':visible')){
					$this.getFriendList(1);
				}else{
					$this.getGoodFriendList(1);
				}
			});
			
			$('#add_friend,#add_friend_btn_2').click(function(){
				var wBox=$("#add_friend_box").wBox({
					title: "添加好友",
					html: $("#add_friend_box").html(),
					top:7
				});
				
				wBox.showBox();
				
				$('#wBox #query_friend_btn').click(function(){
					var error_view = $('#wBox #error_view');
					var friend_mobile = $.trim($('#wBox #friend_mobile').val());
					if(friend_mobile){
						if(friend_mobile == $this.mobile){
							error_view.html('请勿输入自己手机号').show();
							return;
						}
						
						if(/^([+][8][6])|([-])|([ ])/.test(friend_mobile)){
							friend_mobile = friend_mobile.replace(/^([+][8][6])/g,'');
							friend_mobile = friend_mobile.replace(/[-]/g,'');
							friend_mobile = friend_mobile.replace(/[ ]/g,'');
						}
						
						if(!/^([1][0-9]{10})|([0][0-9]{9,11})|([4][0][0][0-9]{7})$/.test(friend_mobile)){
							error_view.html('号码格式错误').show();
							return;
						}
						
						UserAPI.Call.AddMobile({
							inputMobile:friend_mobile
						},function(result){
							if(result.state == 0){
								$('#wBox #add_friend_box_1').hide();
								$('#wBox #add_friend_box_2').show();
								/*
								//信融用户
								$this.firendId = result.userId;
								$('#wBox #friend_name_show').html(result.name);
								$('#wBox #friend_mobile_show').html(result.mobile);
								
								UserAPI.Call.GetNotes({},function(result){
									if(result.state == 1){
										$('#wBox #notes').html(result.data);
									}
								});
								
								$('#wBox #send_note_btn').click(function(){
									var urlIndex = $('#wBox #notes').html().indexOf('https');
									var paramIndex = $('#wBox #notes').html().indexOf('=')+1;
									var context = $('#wBox #notes').html().substring(0,urlIndex);
									var url = $('#wBox #notes').html().substring(urlIndex,paramIndex);
									var param = $('#wBox #notes').html().substring(paramIndex);
									var newUrl = '<a href="'+url+escape(param)+'">'+url+param+'</a>';
									context += newUrl;
									UserAPI.Call.SendNotes({
										friendUserId:$this.firendId
									},function(result){
										if(result.state == 0){
											$('#wBox #send_note_box_1').hide();
											$('#wBox #send_note_box_2').show();
										}
									});
								});
								
								$('#wBox #add_friend_box_1').hide();
								$('#wBox #add_friend_box_2').show();
								*/
							}else if(result.state == 4 || result.state == 5|| result.state == 6){
								//已是好友
								error_view.html('联系人已存在').show();
							}else if(result.state == 2 ){
								//已是好友
								error_view.html('号码格式不正确').show();
							}else if (result.state == 3){
								//本人的号码
								error_view.html(result.msg).show();
							}
							
							else if(false){
								//未注册
								error_view.html('该手机号暂未注册信融').show();
								$('#wBox #query_friend_btn').addClass('callsw').html('立即邀请好友注册');
								
								UserAPI.Call.GetMessage({},function(result){
									if(result.state == 1){
										$('#wBox #messages').html(result.data);
									}
								});
								$('#wBox #query_friend_btn').click(function(){
									$('#wBox #add_friend_box_1').hide();
									$('#wBox #add_friend_box_3').show();
									
									$('#wBox #copy_btn').zclip({
										path: '/2.0/js/ZeroClipboard.swf',
										copy: function(){
											return $("#wBox #messages").text();
										},
										afterCopy: function(){
											wBox.close();
											
											var wBox2=$("#copy_box").wBox({
												title: "复制成功",
												html: $("#copy_box").html(),
												top:7
											});
											wBox2.showBox();
										}
									});
								});
							}else if(result.state==1009){
								AA.RapidLogin.popup();
								return;
							}
						});
					}else{
						error_view.html('请输入手机号码').show();
					}
				});
				
				$('#wBox #add_friend_close_btn').click(function(){
					wBox.close();
					if($('#content1').is(':visible')){
						$this.getFriendList(1);
					}else{
						$this.getGoodFriendList(1);
					}
				});
				
				$('#wBox #friend_mobile').keyup(function(){
					if($('#wBox #friend_mobile').val() == ''){
						$('#wBox #error_view').html('').hide();
					}
				});
				
				$('#wBox #friend_mobile').blur(function(){
					var value = $(this).val();
					if(/^([+][8][6])|([-])|([ ])/.test(value)){
						value = value.replace(/^([+][8][6])/g,'');
						value = value.replace(/[-]/g,'');
						value = value.replace(/[ ]/g,'');
						$(this).val(value);
					}
				});
			});
		},
		confirmFriend:function(){
			if(location.href.indexOf('inviter') != -1){
				//var inviter = Common.Global.GetUrlParam('inviter');
				var url = window.location.href;
				var index = url.lastIndexOf('=');
				var inviter = decodeURIComponent(url.substring(index+1));
				
				if(!(!!inviter)){
					alert('好友推荐链接异常，请重新获取正确链接再试！');
					return;
				}
				
				var wBox=$("#confirm_friend_box").wBox({
					title: "确定好友",
					html: $("#confirm_friend_box").html(),
					top:7
				});
				wBox.showBox();
				
				$('#wBox #confirm_name').html(inviter);
				$('#wBox #confirm_friend').click(function(){
					UserAPI.Call.LinkCreateCommunication({
						inviter:inviter
					},function(result){
						if(result.state == 0){
							wBox.close();
							$this.initFriendList();
							//$this.initGoodFriendList();
						}else{
							if(result.state==1009){
								AA.RapidLogin.popup();
								return;
							}else{
								wBox.close();
								$this.showError(result.msg);
							}
						}
					});
				});
			}
		},
		vipcall:function(callNumber){
			//因为创蓝现不支持，所以添加拦截
				if((/^([0][0-9]{9,11})|([4][0][0][0-9]{7})$/.test(callNumber))){
				$this.showError('暂不能拨打座机！');
				return;
					}
			UserAPI.Call.VipCall({
				inputMobile:callNumber
			},function(result){
				if(result.state == 0){
					$('#call_name').html(callNumber);
					$('#call_show').show();
					setTimeout(function(){
					$('#call_show').hide();
					},5000);
				}else{
					if(result.state == 1009){
						AA.RapidLogin.popup();
						return;
					}else{
						
							$this.showError(result.msg,4000);
						
					}
				}
			});
		},
		isLogin:function(){
			$.ajax({
				url:'/v2/login/in_session_data.jso',
			    type:'GET' ,
			    dataType:'json',
			    success:function (result) {
					if(result.state==0){
						if(result.isAuthMobile == 0){
							$this.showError('您的手机尚未认证，请联系信融财富工作人员进行认证！');
							return;
						}
						$this.ischeckIdentity=result.isAuthIden;
						$this.init();
					}else{
						AA.RapidLogin.popup();
						return;
					}
				}
			});
		}
	};
	
	$(function(){
		$this.isLogin();
	});
	Call = $this;
	
	/**
	 * 时间戳转换成日期(日期小于9的自动补0) 
	 * @param nS 
	 * @returns {String}
	 */
	function getLocalTime(nS) {
		return Common.Tool.FormateDate(nS,'Y-m-d');
	}
})();