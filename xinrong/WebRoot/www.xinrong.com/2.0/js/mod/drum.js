var DRUM;
var wBox;
var tag = 0;
var loginTag = 0;
$(function() {
	$.ajax({
		url : '/v2/login/in_session_data.jso',
		type : 'GET',
		dataType : 'json',
		success : function(result) {
			if (result.state == 0) {
				loginTag = 1;
				if (!G_ENV_VAR.IS_CHECKED_IDENTIFICATION ){
					$.alert({
						title:'<span style="margin-left:3px;">您尚未通过实名认证！</span>',
		                content:'请完成实名认证后再参与击鼓活动',
		                txtBtn:'立即认证',
		                url:'/2.0/views/account/account_settings.shtml'
		            });
				}
			} else {
				AA.RapidLogin.popup();
				return;
			}
		}
	});
	
	

	$("#gu_span").unbind("click").bind("click",function(){
		if (loginTag==0) {
			AA.RapidLogin.popup();
			return;
		}
		if (!G_ENV_VAR.IS_CHECKED_IDENTIFICATION ){
			$.alert({
				title:'<span style="margin-left:3px;">您尚未通过实名认证！</span>',
                content:'请完成实名认证后再参与击鼓活动',
                txtBtn:'立即认证',
                url:'/2.0/views/account/account_settings.shtml'
            });
		}else{
			if (tag>0) {
				return;
				
			}else{
				tag = 1;
				$.ajax({
					url : '/v2/fouryear/save_drum_score.jso',
					type : 'post',
					dataType : 'json',
					success : function(result) {
						if (result.state == 0) {
							var score = result.score;
							var count = result.count;
							if (count >= 0) {
								$("#score").html(score);
								$("#count").html(count);
								wBox = $('#year_box_1').wBox({
									noTitle : true,
									top : 5,
									html : $('#year_box_1').html()
								});
								wBox.showBox();
								$('#wBox #sure_btn_1').click(function() {
									window.location.reload();
								});
							} else {
								wBox = $('#year_box_2').wBox({
									noTitle : true,
									top : 5,
									html : $('#year_box_2').html()
								});
								wBox.showBox();
								$('#wBox #sure_btn_2').click(function() {
									window.location.reload();
								});
							}

						} else if(result.state == 9998){
							wBox = $('#year_box_3').wBox({
								noTitle : true,
								top : 5,
								html : $('#year_box_3').html()
							});
							wBox.showBox();
							$('#wBox #sure_btn_3').click(function() {
								window.location.reload();
							});
						}else if(result.state == 9999){
							wBox = $('#year_box_4').wBox({
								noTitle : true,
								top : 5,
								html : $('#year_box_4').html()
							});
							wBox.showBox();
							$('#wBox #sure_btn_4').click(function() {
								window.location.reload();
							});
						}
						else {
							AA.RapidLogin.popup();
							return;
						}

					}
				});
			}
		}
			
	})

});

function getDrumCount() {
	$.ajax({
		url : '/v2/fouryear/get_drum_count.jso',
		type : 'post',
		dataType : 'json',
		success : function(result) {
			if (result.state == 0) {
				if (VIP > 0) {
					rCount = 5 - result.count;
				} else {
					rCount = 3 - result.count;
				}
			}

		}
	});
}


