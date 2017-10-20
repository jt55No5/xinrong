<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Dashboard Template for Bootstrap</title>
    
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <link href="dashboard.css" rel="stylesheet">
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
    
		<link rel="stylesheet" href="localcss/useradd.css" />
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">信融财富后台管理系统</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <%@ include file="commons/topMenu.jsp"  %>
          <ul class="nav navbar-nav navbar-right">
          	<li><a href="#">注销</a></li>
          </ul>
          <!--<form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>-->
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <!-- <ul class="nav nav-sidebar">
            <li><a href="userForegroundUserList.jsp">前台用户列表</a></li>
            <li><a href="userFrontEndUserDetails.jsp">前台用户详细信息</a></li>
            <li><a href="useradd.jsp">添加后台用户</a></li>
            <li><a href="userBackgroundUserInfo.jsp">后台用户信息</a></li>
            <li><a href="userEditBackUser.jsp">编辑后台用户</a></li>
          </ul> -->
          <%@ include file="commons/user.jsp" %>
        </div>
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	
        	<form class="form-signin">
	      	
	      	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">编辑后台用户</h2>
	      			
	      		</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">账号</p></div>
	      		<div class="col-md-4">
	      			 <label for="inputAccountNumber" class="sr-only">账号</label>
	        		<input type="text" name="accountNumber" id="inputAccountNumber" class="form-control" value="hdl123" disabled="disabled" required autofocus>
	        	</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">原密码</p></div>
	      		<div class="col-md-4">
	      			<label for="inputOldPassword" class="sr-only">原密码</label>
	        		<input type="oldpassword" name="password" id="inputOldPassword" class="form-control" placeholder="请输入原密码" required>
	        	</div>
	      	</div>
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">新密码</p></div>
	      		<div class="col-md-4">
	      			<label for="inputNewPassword" class="sr-only">新密码</label>
	        		<input type="onewpassword" name="password" id="inputNewPassword" class="form-control" placeholder="请输入新密码" required>
	        	</div>
	      	</div>
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="rpwd form-control-static">确认密码</p></div>
	      		<div class="col-md-4">
	      			<label for="inputRePassword" class="sr-only">确认密码</label>
	        		<input type="password" name="repassword" id="inputRePassword" class="form-control" placeholder="请再次输入新密码" required>
	        	</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">姓名</p></div>
	      		<div class="col-md-4">
	      			 <label for="inputUsername" class="sr-only">姓名</label>
	        		<input type="text" name="username" id="inputUsername" class="form-control" value="刘杰" disabled="disabled" required autofocus>
	        	</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">工号</p></div>
	      		<div class="col-md-4">
	      			 <label for="inputJobNo" class="sr-only">工号</label>
	        		<input type="text" name="jobNo" id="inputJobNo" class="form-control" value="324234242" disabled="disabled" required autofocus>
	        	</div>
	      	</div>
	      	
    	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
	        	</div>
	      	</div>
	      </form>
        	
        	
        </div>
      </div>
    </div>

  </body>
</html>
