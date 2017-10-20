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
	<script type="text/javascript" src="localjs/jquery-1.8.3.min.js" ></script>
	<script type="text/javascript" src="localjs/index.js" ></script>
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
        	<%@include file="commons/collect.jsp" %>
        </div>
        
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	<form>
        		<div class="row">
		      		<div class="col-md-4 col-md-offset-4">
		      			<h2 class="form-signin-heading">资金统计</h2>
		      		</div>
		      	</div>
		      	
		      	<div class="row">
		      		<div class="col-md-2 col-md-offset-2">
		      			 <label for="type" class="sr-only">类型</label>
		      			 <select name="type" id="type" class="form-control">
		      			 	<option value="0">汇总统计</option>
		      			 	<option value="1">账户资金统计</option>
		      			 	<option value="2">项目资金统计</option>
		      			 </select>
		        	</div>
		        	<div class="col-md-2">
		      			 <label for="beginDate" class="sr-only">起始日期</label>
		        		<input type="text" name="beginDate" id="beginDate" class="form-control" placeholder="起始日期" required autofocus>
		        	</div>
		        	<div class="col-md-2">
		      			 <label for="endDate" class="sr-only">结束日期</label>
		        		<input type="text" name="endDate" id="endDate" class="form-control" placeholder="结束日期" required autofocus>
		        	</div>
		        	<div class=" col-md-1">
		      			<button class=" chc btn btn-lg btn-primary btn-block" type="submit">查询</button>
		        	</div>
		      	</div>
        		
        	</form>
        	
        	<div class="row">
	      		
	      		
	      			<table id="all" class="table table-striped table-bordered">
	      				<tr>
	      					<th>收到存款</th>
	      					<th>转出借款</th>
	      					<th>收回借款</th>
	      					<th>收到投资款</th>
	      					<th>转出融资款</th>
	      					<th>支付用户收入</th>
	      					<th>收到项目返款</th>
	      					<th>收到担保赔付款</th>
	      				</tr>
	      				<tr>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      				</tr>
	      			</table>
	      			
	      			<table id="user" class="table table-striped table-bordered" style="display: none;">
	      				<tr>
	      					<th>用户名</th>
	      					<th>收到存款</th>
	      					<th>转出借款</th>
	      					<th>收回借款</th>
	      					<th>收到投资款</th>
	      					<th>支付用户收入</th>
	      				</tr>
	      				<tr>
	      					<td>总计</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      				</tr>
	      				<tr>
	      					<td>zhangsan</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      				</tr>
	      			</table>
	      		
	      			<table id="item" class="table table-striped table-bordered" style="display: none;">
	      				<tr>
	      					<th>项目名称</th>
	      					<th>转出融资款</th>
	      					<th>收到项目返款</th>
	      					<th>担保公司名称</th>
	      					<th>收到担保赔付款</th>
	      				</tr>
	      				<tr>
	      					<td>总计</td>
	      					<td>1000.00</td>
	      					<td>1000.00</td>
	      					<td>明担保有限公司</td>
	      					<td>0.00</td>
	      				</tr>
	      				<tr>
	      					<td>信融资</td>
	      					<td>1000.00</td>
	      					<td>1000.00</td>
	      					<td>明担保有限公司</td>
	      					<td>0.00</td>
	      				</tr>
	      			</table>
	      	</div>
        	
        </div>
        
      </div>
    </div>

  </body>
</html>

