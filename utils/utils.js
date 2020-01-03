//获取当前时间戳
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;

//获取当前时间
var n = timestamp * 1000;
var date = new Date(n);
//年
var Y = date.getFullYear();
//月
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

export function year () {
  return Y;
}
export function month () {
  return M;
}
export function date () {
  return D;
}
export function week (Y, M, D) {
  var dateString = Y + '-' + M + '-' + D;
  //console.log(dateString);
  var day = new Date(dateString).getDay();
  //console.log(day);
  switch (day){
    case 0:
        return "星期日";
    case 1:
        return "星期一";
    case 2:
        return "星期二";
    case 3:
        return "星期三";
    case 4:
        return "星期四";
    case 5:
        return "星期五";
    case 6:
        return "星期六";
  }
}

export function number(){
	let a=123;
	return a;
}

//获取前一天时间
var beforeDate=new Array(6);
var beforeDate_year=new Array(6);
var beforeDate_month=new Array(6);
var beforeDate_date=new Array(6);
for(var i = 0; i < 6; i++) {
  beforeDate[i] = timestamp * 1000 - 24*60*60*1000*(i+1);
  var b_date = new Date(beforeDate[i]);
  //年
  beforeDate_year[i] = b_date.getFullYear();
  //月
  beforeDate_month[i] = (b_date.getMonth() + 1 < 10 ? '0' + (b_date.getMonth() + 1) : b_date.getMonth() + 1);
  //日
  beforeDate_date[i] = b_date.getDate() < 10 ? '0' + b_date.getDate() : b_date.getDate();
}
export {
  beforeDate_year,
  beforeDate_month,
  beforeDate_date,
}

