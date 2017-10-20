//通用API
CommonAPI={
	InSession:function(data,success,error){
		Common.Global.async({
			url:'/v2/login/in_session_data.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	Login:function(data,success,error){
		Common.Global.async({
			url:'/v2/login/login.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	LoginOut:function(data,success,error){
		Common.Global.async({
			url:'/v2/login/exit_login.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	},
	GetArea:function(data,success,error){
		Common.Global.async({
			url:'/v2/member/get_area.jso' ,
			type:'POST' ,
			data:data ,
			success:success ,
			error:error
		});
	}
};