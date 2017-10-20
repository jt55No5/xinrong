$(function(){
	$("#sub").click(function(){
		location.href='managerIndex.jsp';
	})
	
	$("#type").change(function(){
		var a=$("#type").val();
		if(a==0){
			$("#all").show();
			$("#user").hide();
			$("#item").hide();
		}else if(a==1){
			$("#all").hide();
			$("#user").show();
			$("#item").hide();
		}else if(a==2){
			$("#all").hide();
			$("#user").hide();
			$("#item").show();
		}
	})
})
