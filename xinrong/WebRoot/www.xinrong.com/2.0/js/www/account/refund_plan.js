var RefundPlan = {
	unitLoans:null,
	unitLenght:0,
	sn:'',
	result:null,
	backNum:0,
	planNum:0,
	curPage:1,
	lastPage:1,
	html:'',
	initData:function(rs,s,refund_type,loan_type){
		if($('#refund_plan_dlg').html() == ''){
			$('#refund_plan_dlg').html(RefundPlan.html);
		}
		RefundPlan.result=rs;
		unitLoans=rs.unitLoans;
		sn=s;
		unitLoansKeys = new Array();
		var i=0;
		for(var key in unitLoans){
			var unit=unitLoans[key];
			i++;
			unitLoansKeys.push(key);
		}
		unitLoansKeys.sort(function(a,b){
			if(a>b){
				return 1;
			}else if(a==b){
				return 0;
			}else{
				return -1;
			}
		});
		RefundPlan.backNum=rs.refundedCount;
		RefundPlan.refundedCount=rs.allCount;
		$('#rd_back_num').html(RefundPlan.backNum);
		$('#rd_plan_num').html(RefundPlan.refundedCount-RefundPlan.backNum);
		
		unitLenght=i;
		RefundPlan.lastPage=unitLenght%6==0?unitLenght/6:parseInt(unitLenght/6)+1;
		
		if(RefundPlan.lastPage==1){
			$('#rd_next').hide();
			$('#rd_pre').hide();
		}else{
			$('#rd_next').show();
			$('#rd_pre').show();
		}
		
		var show_name='信<i class="g-dian">·</i>无忧贷';
		if(loan_type==2){
    		show_name='信<i class="g-dian" >·</i>优企贷';
    	}else if(loan_type==3){
    		show_name='信<i class="g-dian">·</i>赎楼贷';
    	}else if(loan_type==4||loan_type==7||loan_type==11){
    		show_name='信<i class="g-dian">·</i>消费贷';
    	}else if(loan_type==5){
    		show_name='信<i class="g-dian">·</i>精选贷';
      	}else if(loan_type==6){
      		show_name='信<i class="g-dian">·</i>质抵贷';
      	}else if(loan_type==8){
      		show_name='品<i class="g-dian">·</i>融360';
      	}else if(loan_type==9){
      		show_name='品<i class="g-dian">·</i>吉屋网';
      	}else if(loan_type==10){
      		show_name='信<i class="g-dian">·</i>优资贷';
      	}else if(loan_type==12){
      		show_name='品<i class="g-dian">·</i>保理贷';
      	}else if(loan_type==13){
      		show_name='品<i class="g-dian">·</i>分期X';
      	}else if(loan_type==14){
      		show_name='信<i class="g-dian">·</i>消费JS';
      	}else if(loan_type==15){
      		show_name='品<i class="g-dian">·</i>票据贷';
      	}else if(loan_type==16){
			show_name='信<i class="g-dian">·</i>车贷';
		}else if(loan_type==17){
			show_name='品<i class="g-dian">·</i>明特';
		}
		
		$('#loan_type').html(show_name);
		$('#refund_type').html(Common.Loan.RefundType[refund_type]);
		RefundPlan.showDlg();
	},
	showDlg:function(){
		$('#rd_sn').html(sn);
		$('#rd_total_money').html(toCentHalfUp(RefundPlan.result.money,2));
		$('#rd_total_interest').html(toCentHalfUp(RefundPlan.result.totalInterest,2));
		$('#rd_total_manage').html(toCentHalfUp(RefundPlan.result.totalInvestManage,2));
		$('#rd_total_real_interest').html(toCentHalfUp(RefundPlan.result.totalInterest-RefundPlan.result.totalInvestManage,2));
		var backRefundMoney=RefundPlan.result.backRefundMoney;
		if(RefundPlan.result.backRefundMoney==null){
    		backRefundMoney=0.00;
    	}
		$('#rd_refund_money').html(Common.Tool.toFixed(backRefundMoney));
		$('#rd_plan_money').html(Common.Tool.toFixed(RefundPlan.result.planRefundMoney));
		
		RefundPlan.curPage = 1;
		RefundPlan.loadTableData(RefundPlan.curPage);
		RefundPlan.html = $('#refund_plan_dlg').html();
		$('#refund_plan_dlg').empty();
		var wBox=$("#refund_plan_dlg").wBox({
			title: "回款计划",
			html: RefundPlan.html
		});
		
		wBox.showBox();
	},
	nextPage:function(){
		RefundPlan.curPage+=1;
		RefundPlan.loadTableData(RefundPlan.curPage);
	},
	prePage:function(){
		RefundPlan.curPage-=1;
		RefundPlan.loadTableData(RefundPlan.curPage);
	},
	loadTableData:function(pre){
		if(pre<1){
			pre=1;
		}
		
		if(pre>RefundPlan.lastPage){
			RefundPlan.curPage=RefundPlan.lastPage;
			return;
		}
		var start=(pre-1)*6;
		var end=pre*6-1;
		
		if(unitLenght<end){
			end=unitLenght;
			
		}
		var i=0;
		var html='';
		for(var key in unitLoansKeys){
			//var unit=unitLoans[unitLoansKeys[key]];
			if(i<start){
				i++;
				continue;
			}
			if(i>end){
				break;
			}
			
			var unit=unitLoans[unitLoansKeys[key]];
			if((unit.planTime*1000)<(new Date().getTime())){
				html+='<tr style="background-color: #F3F3F3;">';
			}else{
				
				html+='<tr>';
			}
			
			html+='<td>'+(i+1)+'</td>';
			html+='<td>'+Common.Tool.FormateDate(unit.planTime,'Y-m-d h:m:s')+'</td>';
			html+='<td>'+toCentHalfUp(unit.money)+' 元</td>';
			html+='<td>'+toCentHalfUp(unit.interest)+' 元</td>';
			html+='<td>'+toCentHalfUp(Number(unit.interest)+Number(unit.money))+' 元</td>';
			html+='<td>'+toCentHalfUp(unit.investManage)+' 元</td>';
			html+='<td>'+toCentHalfUp(Number(unit.money)+Number(unit.interest)-Number(unit.investManage))+' 元</td>';
			html+='</tr>';
			i++;
		}
		
		$('#rd_tbody').html(html);
	}
}
function toCentHalfUp(num){
	return Common.Tool.toCentHalfUp(num).toFixed(2);
}