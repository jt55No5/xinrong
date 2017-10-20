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
        	<%@include file="commons/collect.jsp" %>
        </div>
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	<form>
        		<div class="row">
		      		<div class="col-md-4 col-md-offset-4">
		      			<h2 class="form-signin-heading">业务统计</h2>
		      		</div>
		      	</div>
		      	
		      	<div class="row">
		        	<div class="col-md-2 col-md-offset-2">
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
	      		
	      		
	      			<table class="table table-striped table-bordered">
	      				<tr>
	      					<th>系列</th>
	      					<!--点击链接跳转到项目列表页-->
	      					<th><a href="#">项目申请</a></th>
	      					<th><a href="#">审核通过</a></th>
	      					<th><a href="#">项目到期</a></th>
	      					<th><a href="#">项目逾期</a></th>
	      					<!--点击链接跳转到项目列表页-->
	      					
	      					<th>项目逾期金额</th>
	      					<th>担保赔付</th>
	      					<th>佣金收入</th>
	      					<th>利息收入</th>
	      					<th>总收益</th>
	      				</tr>
	      					
	      				<tr>
	      					<!--点击链接跳转到项目列表页-->
	      					<td><a href="#">信系列</a></td>
	      					<!--点击链接跳转到项目列表页-->
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1000</td>
	      					<td>1000</td>
	      					<td>20.00</td>
	      					<td>10.00</td>
	      					<td>30.00</td>
	      				</tr>
	      					
	      				<tr>
	      					<!--点击链接跳转到项目列表页-->
	      					<td><a href="#">消费贷</a></td>
	      					<!--点击链接跳转到项目列表页-->
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1</td>
	      					<td>1000</td>
	      					<td>1000</td>
	      					<td>20.00</td>
	      					<td>10.00</td>
	      					<td>30.00</td>
	      				</tr>
	      				
	      				<tr>
	      					<td>总计</td>
	      					<td>2</td>
	      					<td>2</td>
	      					<td>2</td>
	      					<td>2</td>
	      					<td>2000</td>
	      					<td>2000</td>
	      					<td>40.00</td>
	      					<td>20.00</td>
	      					<td>60.00</td>
	      				</tr>
	      			</table>
	      		
	      		
	      	</div>
	      	
	      	
        </div>
        
      </div>
    </div>

  </body>
</html>
