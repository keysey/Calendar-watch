window.onload=function(){
//封装函数获取元素
	function $(i){
		return document.getElementById(i);
	}
	var tbody=$('table').querySelector('tbody');
//当前日期的当前月份和年份   用于在此基础上改变时间设置时间
	var d=new Date();
	var nowYear=d.getFullYear();
	var nowMon=d.getMonth();
//初始化显示为当前电脑日历
	totalNum(d.getFullYear(),d.getMonth());			
	nowDay(d.getFullYear(),d.getMonth());
	fntime();
	nowWeek();
	setInterval(fntime,1000);
	setInterval(nowWeek,1000);
	setInterval(function(){
		
	},1000)
//显示时分秒	
	function fntime(){
		var myTime=new Date();    //获取当前的时间
		var hours= myTime.getHours();
		var mins=myTime.getMinutes();
		var seconds=myTime.getSeconds();
		var str=Totime(hours)+':'+Totime(mins)+':'+Totime(seconds);
		$('time').innerHTML = str;
	}
//如果时分秒为单数<10,则加0
	function Totime(n){
		if (n<10) {
			return '0'+n;
		} else{
			return ''+n;
		}
	}
//封装函数  年月
	function nowDay(i,m){
		var changeYear=i;
		var changeMon=m;
		var iYear=i+'年'+(m+1)+'月'		
		$('setMonth').innerHTML=iYear;
	}
//封装函数年月日 星期几
	function nowWeek(){
		var myTime=new Date();
		var year=myTime.getFullYear();
		var month= myTime.getMonth();	
		var dates= myTime.getDate();
		var day= myTime.getDay();
		var str=year+'年'+(month+1)+'月'+dates+'日,'+iweek(day);
		$('dated').innerHTML = str;		
	}
	function iweek(v){
		return ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][v]
	}	
//封装一个月日历显示	
	function totalNum(Ye,Mo){
		var myTime=new Date();
		var n=d.setFullYear(Ye); 								// 设置年份
		var m=d.setMonth(Mo); 								// 设置年份
		var days=totalDay(d.getFullYear(),d.getMonth());        // 计算一个月多少天？
		var daysLast=totalDay(d.getFullYear(),(d.getMonth()-1));// 计算上一个月多少天？
		var weeknum=isweek(d.getFullYear(),d.getMonth());	  	// 1 号是周几？
		var row=Math.ceil((weeknum+days)/7);				  	// 当月日期总共多少行？
		var value=1-weeknum;  	//1号前面的空格都为负值
//往tbody里添加行列 
		var tHtml='';
		for (var i = 0; i < row; i++) {       //row 自动判断每月有多少行显示日期
			tHtml+='<tr>';
				for (var j = 0; j < 7; j++) {    // 每排显示一周7天
					if (value<1) {	     //判断每月的1号之前和月底之后的写入状态
						tHtml+='<td style="color:darkgrey;text-align: center;">'+(daysLast+value)+'</td>';
					}else if(value>days){
						tHtml+='<td style="color:darkgrey;text-align: center;">'+(value-days)+'</td>'; 
					}else{
						if (value==d.getDate()&&d.getFullYear()==nowYear&&d.getMonth()==nowMon) {	//判断日期为当前年份的当前月份的日期的时候，加高亮颜色并数字居中
							tHtml+='<td style="background-color: pink;text-align: center;">'+value+'</td>';
						} else{
							tHtml+='<td style="text-align: center;">'+value+'</td>';      				//如果不是则直接写入value值
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
//上一个月点击事件
	$('btn1').onclick=function(){
		var clickMo1= d.getMonth()-1;	//当前月份减一
		d.setMonth(clickMo1);			//把月份设置为当前月份减一
		var changeMo=d.getMonth();//获取改变后的月份
//调用函数
		totalNum(d.getFullYear(),changeMo);
		nowDay(d.getFullYear(),changeMo);
	}
//下一月点击事件
	$('btn2').onclick=function(){
		var clickMo2= d.getMonth()+1;
		d.setMonth(clickMo2);
		var changeMo2=d.getMonth()
		totalNum(d.getFullYear(),changeMo2);
		nowDay(d.getFullYear(),changeMo2);
	}
//设置年月的JS ：写入年份和月份
//点击设置按钮弹出设置框
	$('btn3').onclick=function(){
		$('settime').style.display='block';
	}
//设置框初始化
	$('setyear').value=d.getFullYear();
	$('setmouth').value=d.getMonth()+1;
	$('yearlist').style.display='block';
	fn1(1970,2030,$('yearlist'));
	fn1(1,12,$('monthlist'));
	function fn1(start,end,obj){
		var num='';
		for (var i = start; i <=end; i++) {
			num+='<div class="yearstyle">'+i+'</div>';
		}
		obj.innerHTML=num;
	}
	var aDiv = $('yearlist').getElementsByTagName('div');
	var bDiv = $('monthlist').getElementsByTagName('div');
	//点击年的方框,年的选择框弹出
	$('setyear').onclick=function(){
		$('yearlist').style.display='block';
		$('monthlist').style.display='none';
	}
	//点击月的方框,月的选择框弹出
	$('setmouth').onclick=function(){
		$('yearlist').style.display='none';
		$('monthlist').style.display='block';				
	}
	//点击任一年份,选择的年份写入到年框里
	for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].onclick=function(){
			for (var i = 0; i < aDiv.length; i++) {
				aDiv[i].style.backgroundColor='';
			}
			$('setyear').value=this.innerHTML
			this.style.backgroundColor='pink';
		}				
	}
	//点击任一月份,选择的月份写入到月框里
	for (var i = 0; i < bDiv.length; i++) {
		bDiv[i].onclick=function(){
			for (var i = 0; i < bDiv.length; i++) {
				bDiv[i].style.backgroundColor='';
			}
			$('setmouth').value=this.innerHTML
			this.style.backgroundColor='green';
		}				
	}
	//点击确定按钮实现日历跳转
	$('sure').onclick=function(){
		nowDay($('setyear').value,($('setmouth').value)-1);
		$('settime').style.display='none';
		totalNum($('setyear').value,($('setmouth').value)-1)
	}
}
