type trimDataType = string | undefined | null

export const trimString = (data: trimDataType) => {
  if (typeof data === 'undefined' || data === null) {
    return ''
  } 
  return data.replace(/\s+/g, '')
}

type DateTypes = Date | string | number;
export const formatDate = (date: DateTypes, fmt='yyyy-MM-dd hh:mm:ss') => {
  let _that = new Date(date)

  if (_that.toString() === 'Invalid Date') {
    if (typeof date === "string") {
      // ios 不支持带 ‘-’ 的时间格式，需转换成 ‘/’
      date = date.replace(/-/g, '/')
      _that = new Date(date)
    }
  }

  if (_that.toString() === 'Invalid Date') {
    _that = new Date()
  }

  const o = {
    "M+": _that.getMonth() + 1,                 //月份
    "d+": _that.getDate(),                    //日
    "h+": _that.getHours(),                   //小时
    "m+": _that.getMinutes(),                 //分
    "s+": _that.getSeconds(),                 //秒
    "q+": Math.floor((_that.getMonth() + 3) / 3), //季度
    "S": _that.getMilliseconds()             //毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (_that.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      const _result = o[k as keyof typeof o] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? _result : _result.padStart(2, '0'));
    }
  }
  return fmt;
}; 


/**
 * 正确格式：数字、字母或下划线
 * @param target 
 * @returns 
 */
export const characterWithUnderlineExp = (target: any) => {
  return /^\w+$/.test(target)
}

/**
 * 校验手机号码
 * @param phone 
 * @returns 
 */
export const checkMobile = (phone: string) => /^[1](([3][0-9])|([4][0-1,4-9])|([5][0-3,5-9])|([6][2,5-7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/.test(phone)