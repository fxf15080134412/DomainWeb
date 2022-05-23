/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
 return ['日', '一', '二', '三', '四', '五', '六'][value ] 
}
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (String(time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = Number(time)
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
 * @param {number} num
 * 数据格式化
 * @returns {number}
 */
export function changeTow(num) {
  if(num >= 100000) {
    return parseInt(num / 10000) + 'w+';
  }else {
    return num;
  }
}
/**
 * @param {number} num
 * 排序
 * @returns {number}
 */
export function sortList(list) {
  let arr = [];
  list.map(item => arr.push(item.ds));
  function sortNum(a, b) {
    return b - a; // 从大到小
    // return a - b; //从小到大
  }
  arr.sort(sortNum);
  let arr2 = [];
  arr.forEach((v, i) => {
    list.forEach(res => {
      if (res.ds === v) {
        arr2.push(res);
      }
    });
  });
  list = arr2;
  return list
}

//blob下载文件流
export function downloadBlob(data,name){
  let blob = new Blob([data])
  let a = document.createElement("a");
  a.setAttribute("href", URL.createObjectURL(blob));
  a.setAttribute("download", name);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//下载地址转blob
export function urlBlob(url,name){
  fetch(url).then(res => res.blob()).then(blob => {
    let a = document.createElement("a");
    a.setAttribute("href", URL.createObjectURL(blob));
    a.setAttribute("download", name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).catch(err=>{
    let a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
}

//上传封装请求数据
export function getFileStr(fileList){
  return fileList.map(row=>row.url || row.response.data.url).join(",");
}

//字符串转上传文件显示json
export function getFileArr(fileUrl){
  let urls = fileUrl?fileUrl.split(','):[]
  return urls.map(row=>{
    return {name:row.split('/')[row.split('/').length-1],url:row}
  })
}

//计算年龄
export function jsGetAge(strBirthday){
  if(!strBirthday) return 0
  var returnAge;
  var strBirthdayArr=strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  
  if(nowYear == birthYear){
      returnAge = 0;//同年 则为0岁
  }
  else{
      var ageDiff = nowYear - birthYear ; //年之差
      if(ageDiff > 0){
          if(nowMonth == birthMonth) {
              var dayDiff = nowDay - birthDay;//日之差
              if(dayDiff < 0)
              {
                  returnAge = ageDiff - 1;
              }
              else
              {
                  returnAge = ageDiff ;
              }
          }
          else
          {
              var monthDiff = nowMonth - birthMonth;//月之差
              if(monthDiff < 0)
              {
                  returnAge = ageDiff - 1;
              }
              else
              {
                  returnAge = ageDiff ;
              }
          }
      }
      else
      {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
  }
  return returnAge;//返回周岁年龄
}