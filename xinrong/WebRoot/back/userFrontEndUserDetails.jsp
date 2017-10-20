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
        
      		<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">前台用户详细信息</h2>
	      		</div>
	      	</div>
	      	<div class="row">
		      	<div  class="col-md-8 col-md-offset-1">
		      		<h4>前台用户信息</h4>
		      		<table class="table table-striped table-bordered">
		      			<tr><td>账户</td><td>Liujun123</td></tr>
		      			<tr><td>密码(超级管理员才能看)</td><td>123456</td></tr>
		      			<tr><td>创建日期</td><td>2017-01-01</td></tr>
		      			<tr><td>VIP等级</td><td>VIP1</td></tr>
		      			<tr><td>修改时间</td><td>2017-01-02</td></tr>
		      			<tr><td>真实姓名</td><td>刘俊</td></tr>
		      			<tr><td>身份证号</td><td>421023199910081234</td></tr>
		      			<tr><td>手机号</td><td>13812345678</td></tr>
		      			<tr><td>信用等级</td><td>优</td></tr>
		      			<tr><td>账户余额(元)</td><td>100</td></tr>
		      			<tr><td>资产总额(元)</td><td>200</td></tr>
		      			<tr><td>信存宝总额(元)</td><td>300</td></tr>
		      		</table>
		      	</div>
	      	</div>
        	<div class="row">
	      		
	      		<h4>用户投资记录</h4>
	      			<table class="table table-striped table-bordered">
	      				<tr>
	      					<th>交易流水号</th>
	      					<th>交易日期</th>
	      					<th>类型</th>
	      					<th>投资项目名称</th>	      					
	      					<th>交易金额</th>	      					      					
	      				</tr>
	      				<tr>
	      					<td>111111</td>	      					
	      					<td>2017-01-01</td>
	      					<td>aaa</td>      					
	      					<td><a href="点击跳转到项目详细信息页">好项目</a></td>      				
	      					<td>3000</td>
	      				</tr>
	      					<tr>
	      					<td>111111</td>	      					
	      					<td>2017-01-01</td>
	      					<td>aaa</td>      					
	      					<td><a href="点击跳转到项目详细信息页">好项目</a></td> 	      				
	      					<td>3000</td>
	      				</tr>
	      			</table>
	      			      		
	      	</div>
	      	
        	   <div class="row">
	      		
	      		<h4>充值提现记录</h4>
	      			<table class="table table-striped table-bordered">
	      				<tr>
	      					<th>类型(充值、提现、借款)</th>
	      					<th>交易日期</th>	      						      					
	      					<th>交易金额</th>	      					      					
	      				</tr>
	      				<tr>
	      					<td>充值</td>	      					
	      					<td>2017-01-01</td>
      					  <td>3000</td>
	      				</tr>
	      					<tr>
	      						<td>充值</td>	      					
	      					  <td>2017-01-01</td>
      					    <td>3000</td>
	      				</tr>
	      			</table>
	      		
	      		
	      	</div>
        </div>
      </div>
    </div>

  </body>
</html>
