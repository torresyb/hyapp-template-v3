/**
 * @author yangbin
 * @date 2018/7/18
 * @Description: 过滤器
 */

/**
 * toFixed优化
 * @param num
 * @param dot
 * @returns {string | *}
 */
function transformNum (num, dot) {
  let pre = 1
  for (let i = 0; i < dot; i++) {
    pre *= 10
  }
  num = (Math.round(num * pre) / pre).toFixed(dot)
  return num
}
/**
 * 钱个数化
 * @param num 价格
 * @param dot 保留小数位
 * @returns {string}
 */
export function formatMoney (num, dot) {
  let money = Number(num) + '' === 'NaN' ? 0 : Number(num)
  money = transformNum(money, dot)
  return money
}

/**
 * 千分位
 * @param num
 * @param dot
 * @returns {*}
 */
export function formatAmount (num, dot) {
  if (num === '') return ''
  let money = Number(num) + '' === 'NaN' ? 0 : Number(num)
  let isQ = false
  if (money >= 1000) {
    isQ = true
    money = money / 1000
  } else {
    isQ = false
  }
  money = transformNum(money, isQ ? 2 : dot)
  // eslint-disable-next-line radix
  return isQ ? (money.indexOf('.00') > -1 ? parseInt(money) : money) + 'k' : money
}

/**
 * w分位
 * @param num
 * @returns {number}
 */
export function formatDisNum (num) {
  // eslint-disable-next-line radix
  let money = parseInt(num) + '' === 'NaN' ? 0 : parseInt(num)
  if (money === 10000) {
    money = '1w'
  } else if (money > 10000 && money < 100000) {
    money = '1w+'
  } else if (money === 100000) {
    money = '10w'
  } else if (money > 100000) {
    money = '10w+'
  }
  return money
}

/**
 * 年月日格式
 * @param input
 * @returns {string}
 */
export function formatDate (input) {
  if (!input) {
    return '***'
  }
  let d = new Date(input)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  return year + '年' + month + '月' + day + '日'
}

/**
 * 还款状态
 * @param val
 * @returns {string}
 */
export function formatStatus (val) {
  let status = ''
  switch (Number(val)) {
    case 110:
      status = '已还清'
      break
    case 106:
      status = '待还款'
      break
    case 120:
      status = '已逾期'
      break
    case 121:
      status = '还款中'
      break
  }
  return status
}
/**
 * 分转元
 * @param num
 * @returns {*}
 */
export function yuanMoney (num) {
  if (num === '') return 0.00
  let money = Number(num) + '' === 'NaN' ? 0 : (Number(num) / 100)
  return transformNum(money, 2)
}

/**
 * 手机号脱敏
 * @param num
 * @returns {any}
 * @constructor
 */
export function PhoneNumHide (num) {
  return num ? num.replace(/(\d{3}).+(\d{4})/g, '$1****$2') : ''
}
/**
 * 格式化日期
 * @param {Date} date
 * @param {String} fmt “YYYY-MM-DD hh:mm:ss.SS”
 */
export function formateDateByFmt (date, fmt) {
  if (!date) {
    return ''
  }
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 获取银行卡后4位
 * @param num
 * @returns {*}
 */
export function bankLast4 (num) {
  if (num) {
    return num.substring(num.length - 4)
  } else {
    return ''
  }
}
