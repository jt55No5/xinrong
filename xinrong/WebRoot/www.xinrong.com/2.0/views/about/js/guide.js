// JavaScript Document

$(document).ready(function () {

	//点击标题事件
	$(".tabs-nav li a").bind("click", function () {
		var _index = $(".tabs-nav li a").index(this);
		$(".tabs-nav li a").removeClass("ui-state-active-a"); //移除当前链接的选中样式
		$(".tabs-nav li a:eq(" + _index + ")").addClass("ui-state-active-a");//给下一个链接加选中样式
		$(".tab-img").hide(); //隐藏所有div 
		$(".tab-img:eq(" + (_index) + ")").show();//显示当前div

		$(".tab-img:eq(" + (_index) + ") img").hide();//div中所有的图片
		$(".tab-img:eq(" + (_index) + ") img:eq(0)").show(); //显示div中的第一张图片 

		//绑定图片事件
		$(".tab-img img").unbind("click");
		$(".tab-img:eq(" + (_index) + ") img").bind("click", function () {

			var thisDivCount = $("img", this.parentNode.parentNode).length;

			if (thisDivCount > 1) {
			/*多张处理方式*/
			var img_index = $("img", this.parentNode.parentNode).index(this);
			if ((thisDivCount - 1) > img_index) {
				$("img", this.parentNode.parentNode).hide();
				$("img:eq(" + (img_index + 1) + ")", this.parentNode.parentNode).show();
				}
			else {
				/*最后一张处理方式*/
				TabImg();
				}
			}
			else {
			/*只有一张处理方式*/
				TabImg();
				}
			});

		});
	//初始化第一张 
	$(".tabs-nav li a:eq(0)").click();
	
});
function TabImg() {
		var navcount = $(".tabs-nav li a").length;
		for (var i = 0; i < navcount; i++) {
			if ($(".tabs-nav li a:eq(" + i + ")").hasClass("ui-state-active-a")) {
				if ((navcount - 1) > i) {
					$(".tabs-nav li a:eq(" + (i + 1) + ")").click();
					break;
					}

				}
			}
		}

		

