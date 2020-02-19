

export default {
  //排序
  sorter(key) {
    return (rowa, rowb) => sortFun(rowa[key], rowb[key])
  },
  //日期转换
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }

}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

function sortFun(a, b) {
  let type = Object.prototype.toString.call(a);
  let bolValue
  switch(type){
    case '[object Date]':
        bolValue  = new Date(a).getTime() - new Date(b).getTime();
        break;
    case '[object String]':
        bolValue = a.localeCompare(b, 'zh');
        break;
    default:
        bolValue = a-b;
  }
  return bolValue
}