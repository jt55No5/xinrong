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
    
		<link rel="stylesheet" href="localcss/userview.css" type="text/css" />
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
         <!--  <ul class="nav nav-sidebar">
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
		      			<h2 class="form-signin-heading">前台用户列表</h2>
		      		</div>
		      	</div>
	      		
	      		<div class="row">
		      		<div class="col-md-2 col-md-offset-1">
		      			 <label for="inputUsername" class="sr-only">用户名</label>
		        		<input type="text" name="username" id="inputUsername" class="form-control" placeholder="请输入用户名" required autofocus>
		        	</div>
		        	
		      		<div class="col-md-2">
		      			<label for="viptype" class="sr-only">VIP等级</label>
		        		<select name="viptype" class="form-control" id="viptype">
		        			<option value="0">请选择VIP等级</option>
		        			<option value="0">无</option>
		        			<option value="1">VIP1</option>
		        			<option value="2">VIP2</option>
		        			<option value="2">VIP3</option>
		        			<option value="2">VIP4</option>
		        			<option value="2">VIP5</option>
		        		</select>
		        	</div>
		        	
		        	<div class="col-md-2">
		      			<label for="sortType" class="sr-only">信用等级</label>
		        		<select name="sortType" class="form-control" id="sortType">
		        			<option value="0">请选择信用等级</option>
		        			<option value="1">优</option>
		        			<option value="2">良</option>
		        			<option value="3">差</option>
		        		</select>
		        	</div>
		        	
		        	<div class=" col-md-1">
		      			<button class=" chc btn btn-lg btn-primary btn-block" type="submit">查询</button>
		        	</div>
		        	
		      	</div>
	      		
	      	</form>
	      	
	      	<div class="row">
	      		
	      		
	      			<table class="table table-striped table-bordered">
	      				<tr>
	      					<th>账户</th>
	      					<th>真实姓名</th>
	      					<th>创建日期</th>
	      					<th>VIP等级</th>	      					
	      					<th>信用等级</th>	      					
	      					<th>操作/查看(超级管理员才修改)</th>
	      				</tr>
	      				<tr>
	      					<td>Liujun123</td>
	      					<td>刘俊</td>
	      					<td>2017-01-01</td>
	      					<td>VIP1</td>
	      					<td>优</td>	      						      				      					
	      					<td><a href="javascript:;">查看</a>&nbsp;<a href="javascript:;">修改</a></td>
	      				</tr>
	      				<tr>
	      					<td>Liujie123</td>
	      					<td>刘杰</td>
	      					<td>2017-01-01</td>
	      					<td>VIP1</td>
	      					<td>优</td>	      						      				      					
	      					<td><a href="javascript:;">查看</a>&nbsp;<a href="javascript:;">修改</a></td>
	      				</tr>
	      			</table>
	      		
	      		
	      	</div>
        	
        	
        </div>
      </div>
    </div>

  </body>
</html>
