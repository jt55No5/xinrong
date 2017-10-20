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
        	
        	<form class="form-signin">
	      		<div class="row">
		      		<div class="col-md-4 col-md-offset-4">
		      			<h2 class="form-signin-heading">项目系列查询</h2>
		      		</div>
		      	</div>
	      		
	      		<div class="row">
		      		<div class="col-md-2 col-md-offset-1">
		      			 <label for="inputProname" class="sr-only">系列名称</label>
		        		<input type="text" name="proname" id="inputProname" class="form-control" placeholder="请输入系列名" required autofocus>
		        	</div>
		        	
		      		<div class="col-md-2">
		      			<label for="usertype" class="sr-only">项目类型</label>
		        		<select name="usertype" class="form-control" id="usertype">
		        			<option value="0">请选择项目类型</option>
		        			<option value="1">信存宝®</option>
		        			<option value="2">信·项目</option>
		        		</select>
		        	</div>
		        	
		        	<div class="col-md-2">
		      			<label for="sortType" class="sr-only">回款方式</label>
		        		<select name="sortType" class="form-control" id="sortType">
		        			<option value="0">请选择回款方式</option>
		        			<option value="1">等额本息 </option>
		        			<option value="2">等额本金</option>
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
	      					<th>项目名</th>
	      					<th>融资期限</th>
	      					<th>融资金额</th>
	      					<th>预期年化收益率</th>
	      					<th>回款方式</th>
	      					<th>操作</th>
	      				</tr>
	      				<tr>
	      					<td>融信</td>
	      					<td>4个月</td>
	      					<td>50000</td>
	      					<td>8.6%</td>
	      					<td>足额本息</td>
	      					<td><a href="ChangeProduct.html">修改</a>&nbsp;<a href="javascript:;">删除</a></td>
	      				</tr>
	      				
	      			</table>
	      		
	      		
	      	</div>
        	
        	
        </div>
      </div>
    </div>

  </body>
</html>
