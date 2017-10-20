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
        	<%@include file="commons/credit.jsp" %>
        </div>
        
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        	<form class="form-horizontal">
        		<div class="row">
		      		<div class="col-md-4 col-md-offset-4">
		      			<h2 class="form-signin-heading">项目打款</h2>
		      		</div>
		      	</div>
		      	
		      	<div class="form-group">
				    <label for="itemId" class="col-md-3 control-label">项目ID</label>
				    <div class="col-md-4">
				      <input name="itemId" type="text" class="form-control" id="itemId" placeholder="请输入项目ID">
				    </div>
				  </div>
				  
				<div class="form-group">
				    <label for="username" class="col-md-3 control-label">收款人</label>
				    <div class="col-md-4">
				      <input name="username" type="text" class="form-control" id="username" value="张三" disabled="disabled">
				    </div>
				  </div>
				  
		      	<div class="form-group">
				    <label for="hopeMoney" class="col-md-3 control-label">预期融资金额(￥)</label>
				    <div class="col-md-4">
				      <input name="hopeMoney" type="text" class="form-control" id="hopeMoney" value="3000.00" disabled="disabled">
				    </div>
				  </div>
				  
				<div class="form-group">
				    <label for="actualMoney" class="col-md-3 control-label">实际融资金额(￥)</label>
				    <div class="col-md-4">
				      <input name="actualMoney" type="text" class="form-control" id="actualMoney" placeholder="请输入实际转款金额">
				    </div>
				  </div>
        		
        		<div class="form-group">
				    <label for="commission" class="col-md-3 control-label">佣金(￥)</label>
				    <div class="col-md-4">
				      <input name="commission" type="text" class="form-control" id="commission" value="50.00" disabled="disabled">
				    </div>
				  </div>
				  
				<div class="form-group">
				    <label for="transfer" class="col-md-3 control-label">实际转款金额(￥)</label>
				    <div class="col-md-4">
				      <input name="transfer" type="text" class="form-control" id="transfer" value="2950.00" disabled="disabled">
				    </div>
				  </div>
        		
        		<div class="col-md-3 col-md-offset-3">
        			<button class="btn btn-lg btn-primary btn-block" type="submit">提交</button>
        		</div>
        		
        	</form>
        </div>
        
      </div>
    </div>

  </body>
</html>
