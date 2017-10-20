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
           <%@include file="commons/project.jsp" %>
        </div>
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	
        	<form class="form-signin">
	      	
	      	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">项目修改</h2>
	      			
	      		</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">系列名称</p></div>
	      		<div class="col-md-4">
	      			 <label for="productName" class="sr-only">系列名称</label>
	        		<input type="text" name="productName" id="productName" class="form-control" value="赚钱APP" disable="disable" required autofocus>
	        	</div>
	      	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">融资期限</p></div>
	      		<div class="col-md-4">
	      			<label for="day" class="sr-only">融资期限</label>
	        		<input type="text" name="day" id="day" class="form-control" value="6个月" required>
	        	</div>
	      	</div>
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="form-control-static">融资金额</p></div>
	      		<div class="col-md-4">
	      			<label for="money" class="sr-only">融资金额</label>
	        		<input type="text" name="money" id="money" class="form-control" value="1000" disable="disable" required>
	        	</div>
	      	</div>
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="rpwd form-control-static">预期年化收益率</p></div>
	      		<div class="col-md-4">
	      			<label for="inputRePassword" class="sr-only">预期年化收益率</label>
	        		<input type="text" name="repassword" id="inputRePassword" class="form-control" value="10" disable="disable" required>
	        	</div>
	      	</div>
	      		      		
	      	
	      	<div class="row">
	      		<div class="col-md-1 col-md-offset-3"><p class="rpwd form-control-static">回款方式</p></div>
	      		<div class="col-md-4">
	      			<label for="usertype" class="sr-only">回款方式</label>
	        		<select name="usertype" class="form-control" id="usertype">
	        			<option value="1">等额本息</option>
	        			<option value="2">按月付息</option>
	        		</select>
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
