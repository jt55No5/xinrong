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

    <title>Signin Template for Bootstrap</title>

    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <link href="signin.css" rel="stylesheet">
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
    
   	<link href="localcss/index.css" rel="stylesheet" type="text/css" />
   	<script type="text/javascript" src="localjs/jquery-1.8.3.min.js" ></script>
   	<script type="text/javascript" src="localjs/index.js" ></script>
    
  </head>

  <body>

    <div class="container">
    	
	      <form class="form-signin">
	      	
	      	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">信融财富后台管理系统</h2>
	      			 <label for="inputUsername" class="sr-only">用户名</label>
	        		<input type="text" id="inputUsername" class="form-control" placeholder="请输入用户名" required autofocus>
	        		<label for="inputPassword" class="sr-only">密码</label>
	        		<input type="password" id="inputPassword" class="form-control" placeholder="请输入密码" required>
	        		<div class="checkbox">
			          <label>
			            <input type="checkbox" value="remember-me">记住密码
			          </label>
			        </div>
			        <button id="sub" class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
	      		</div>
	      	</div>
	        
	      </form>

    </div> <!-- /container -->


    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>