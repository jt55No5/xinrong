var Blacklist;
(function(){
	var $this = {
		pageSize:10,
		init:function(){
			$this.initBlacklist();
			$this.bindEvent();
		},
		bindEvent:function(){
			$('#query').click(function(){
				var userQuery = $('#userQuery').val();
				$('#error_view').html('');
				if(userQuery==''){
					$('#error_view').html('请输入查询内容');
					return;
				}
				if(/[\u4e00-\u9fa5·]/.test(userQuery)){
					if(!(/^([\u4e00-\u9fa5·]{2,7})$/.test(userQuery))){
						$('#error_view').html('姓名格式不正确');
						return;
					}
				}else{
					if(!(/^(\d{15}|\d{18}|^\d{17}(\d|X|x))$/.test(userQuery))){
						$('#error_view').html('身份证号格式不正确');
						return;
					}
				}
				$this.getBlacklist(1);
			});
		},
		initBlacklist:function(){
			$this.getBlacklist(1);
		},
		getBlacklist:function(pageIndex){
			var userQuery = $('#userQuery').val();
			$.ajax({
				url:'/v2/onlineloan/get_overdue_blacklist.jso',
				type:'post',
				dataType:'json',
				data:{
					userQuery:userQuery,
					pageIndex:pageIndex,
					pageSize:$this.pageSize
				},
				success:function(result){
					if(result.state == 0){
						$('#result_view').empty();
						if(result.list.length == 0){
							$('#result_view').append('<tr><td align="center" colspan="9">暂无相关逾期记录</td></tr>');
							$('#list_view').hide();
							$('#no_list_view').show();
							return;
						}else{
							$('#list_view').show();
							$('#no_list_view').hide();
						}
						$.each(result.list,function(i,v){
							var $tr = '<tr>'+
										'<td align="center">'+v.realName+'</td>'+
										'<td align="center">￥'+v.approvalAmount+'</td>'+
										'<td align="center">'+AA.Helper.date(v.loanTime,'Y-m-d')+'</td>'+
										'<td align="center">￥'+v.overdueMoney+'</td>'+
										'<td align="center">'+(v.sex==1?"男":"女")+'</td>'+
										'<td align="center">'+get_native_place_from_idcard(v.certificateNumber)+'</td>'+
										'<td align="center">'+v.certificateNumber+'</td>'+
										'<td align="center">'+v.mobile+'</td>'+
										'<td align="center">'+v.email+'</td>'+
									  '</tr>';
							$('#result_view').append($tr);
						});
						if(result.count>$this.pageSize){
							$('.pagefont').show();
							$('.pagefont').pagination({
								'container':'.pagefont',
								'pageSize':$this.pageSize,
								'total':result.count ,
								'pageIndex':pageIndex ,
								'callback':'Blacklist.getBlacklist'
							});
						}else{
	     					$('.pagefont').hide();
	     				}
						var page = $('.pagefont').html();
						page = page.replace('上一页','<img src="images/y04.png">');
						page = page.replace('下一页','<img src="images/y03.png"></a>');
						page = page.replace('prev','arrowleft');
						page = page.replace('next','arrowright');
						$('.pagefont').html(page);
					}
				}
			});
		}
	};
	Blacklist = $this;
	$(function(){
		$this.init();
	});
})();