function getYMDHMS() {
  //按照json格式返回年月日时分秒
  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month * 1 < 10 ? `0${month}` : month;

  let week = date.getDay();
  week = week * 1 < 10 ? `0${week}` : week;

  let day = date.getDate()
  day = day * 1 < 10 ? `0${day}` : day;


  let hour = date.getHours()
  hour = hour * 1 < 10 ? `0${hour}` : hour;

  let minute = date.getMinutes()
  minute = minute * 1 < 10 ? `0${minute}` : minute;

  let second = date.getSeconds()
  second = second * 1 < 10 ? `0${second}` : second;

  return {
    year,
    month,
    day,
    week,
    hour,
    minute,
    second
  }
}


function calculatePercent(start,end,middle){
  //传入开始时间，结束时间和中间时间，自动计算出中间时间占用的百分比
  start = start.toString().replace(/-/g, '/');
  end = end.toString().replace(/-/g, '/');
  middle = middle.toString().replace(/-/g, '/');
  //开始计算之前需要判断传进来的时间格式是否都是对的

  if (checkDate(start) == false){
    console.error("start参数格式错误，请参考 yyyy/mm/dd hh:mm:ss")
    return false
  } else if (checkDate(end) == false){
    console.error("end参数格式错误，请参考 yyyy/mm/dd hh:mm:ss")
    return false
  } else if (checkDate(middle) == false) {
    console.error("middle参数格式错误，请参考 yyyy/mm/dd hh:mm:ss")
    return false
  }

  //开始将各个时间转换成可计算的时间戳,得到白分比
  
  let timestampStart = Date.parse(start)
  let timestampEnd = Date.parse(end)
  let timestampMiddle = Date.parse(middle)
  return parseInt(Math.abs(timestampStart - timestampMiddle) / Math.abs(timestampStart - timestampEnd) * 100)
}

function checkDate(str) {
  var reg = /^(\d+)\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = str.match(reg);
  if (r == null) return false;
  r[2] = r[2] - 1;
  var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
  if (d.getFullYear() != r[1]) return false;
  if (d.getMonth() != r[2]) return false;
  if (d.getDate() != r[3]) return false;
  if (d.getHours() != r[4]) return false;
  if (d.getMinutes() != r[5]) return false;
  if (d.getSeconds() != r[6]) return false;
  return true;
}


export {
  checkDate,
  calculatePercent,
  getYMDHMS
}