
export const formatNumber = (a) => {
  return a >= 10 ? a : '0' + a
}

export const dateFormat = (oDate, fmt) => {
  let o = {
    'M+': oDate.getMonth() + 1, // 月份
    'd+': oDate.getDate(), // 日
    'h+': oDate.getHours(), // 小时
    'm+': oDate.getMinutes(), // 分
    's+': oDate.getSeconds(), // 秒
    'q+': Math.floor((oDate.getMonth() + 3) / 3), // 季度
    'S': oDate.getMilliseconds(), // 毫秒
    'W': oDate.getDay() // 星期
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const dateReduce = (num) => {
  return new Date().getTime() - 3600 * 24 * 1000 * num
}
