window.onload=function(){
	var table=document.getElementById('table');
	var tbody=table.querySelector('tbody');
	var d=new Date();
	totalNum(d.getFullYear(),d.getMonth());
//		totalNum(2017,6);
	function totalNum(Ye,Mo){
		var n=d.setFullYear(Ye); 								// 设置年份
		var m=d.setMonth(Mo); 								// 设置年份
		var days=totalDay(d.getFullYear(),d.getMonth());        // 计算一个月多少天？
		var daysLast=totalDay(d.getFullYear(),(d.getMonth()-1));// 计算上一个月多少天？
		var weeknum=isweek(d.getFullYear(),d.getMonth());	  	// 1 号是周几？
		var row=Math.ceil((weeknum+days)/7);				  	// 当月日期总共多少行？
		var value=1-weeknum;  									//1号前面的空格都为负值
	//往tbody里添加行列
		var tHtml='';
		for (var i = 0; i < row; i++) {
			tHtml+='<tr>';
				for (var j = 0; j < 7; j++) {
					if (value<1) {	     //判断每月的1号之前和月底之后的写入状态
						tHtml+='<td style="color:darkgrey;">'+(daysLast+value)+'</td>';
					}else if(value>days){
						tHtml+='<td style="color:darkgrey;">'+(value-days)+'</td>'; 
					}else{
						if (value==d.getDate()) {							//判断日期为当前日期的时候，加高亮颜色
							tHtml+='<td style="background-color: pink;">'+value+'</td>';
						} else{
							tHtml+='<td>'+value+'</td>';      				//如果不是则直接写入value值
						}					
					}
					value++;
				}
			tHtml+='</tr>';
		}
		tbody.innerHTML=tHtml;
		
		function totalDay(year,month){          	// 一个月多少天函数封装
			var d1=new Date(year,month+1,1);
			return new Date(d1-1).getDate();
		}
		function isweek(year,month){				//每月1号星期几函数封装
			var d1=new Date(year,month,1);
			return d1.getDay();
		}
	}
	
}
