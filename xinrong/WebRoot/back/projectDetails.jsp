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
          <%@include file="commons/project.jsp" %>
         
        </div>
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">项目信息</h2>
	      		</div>
	      	</div>
        	<div class="row">
        		<div class="col-md-10 col-md-offset-1">
	        		<table class="table table-striped table-bordered">
	        			<tr><td>项目名称</td><td>品·明特</td></tr>
	        			<tr><td>预期年化收益率</td><td>7%</td></tr>
	        			<tr><td>融资期限</td><td>2017-03-01</td></tr>
	        			<tr><td>创建时间</td><td>2017-01-01</td></tr>
	        			<tr><td>融资金额</td><td>50000.00</td></tr>
	        			<tr><td>项目进程</td><td>融资中</td></tr>
	        			<tr><td>回款方式</td><td>等额本息</td></tr>
	        			<tr><td>剩余可投</td><td>6666.00</td></tr>
	        		</table>
        		</div>
        	</div>
	      	
	      	<div class="row">
	      		<div class="col-md-4 col-md-offset-4">
	      			<h2 class="form-signin-heading">融资人信息</h2>
	      		</div>
	      	</div>
			<div class="row">
				<div class="col-md-10 col-md-offset-1">
					<table class="table table-striped table-bordered">
						<tr><td>融资方账号</td><td>17666666666</td></tr>
						<tr><td>融资方姓名</td><td>张三</td></tr>
						<tr><td>资金用途</td><td>购车</td></tr>
						<tr><td>证件号</td><td>110226198501272116</td></tr>
						<tr><td>性别</td><td>男</td></tr>
						<tr><td>年龄</td><td>26</td></tr>
						<tr><td>行业</td><td>程序员</td></tr>
						<tr><td>学历</td><td>本科</td></tr>
						<tr><td>年收入范围</td><td>20万~30万</td></tr>
						<tr><td>操作</td><td><a href="#">审核</a></td></tr>
					</table>
				</div>
			</div>        	
        </div>
      </div>
    </div>

  </body>
</html>
