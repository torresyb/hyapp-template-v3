/**
 * 打包文件加日期，如dist20190202
 * @returns {string}
 */
const getDate = function () {
  let time = new Date()
  let y = time.getFullYear() + ''
  let m = time.getMonth() + 1 + ''
  let d = time.getDate() + ''
  let h = time.getHours() + ''
  let i = time.getMinutes() + ''
  let s = time.getSeconds() + ''
  return y.substring(2)+(m<10?0+m:m)+(d<10?0+d:d)+(h<10?0+h:h)+(i<10?0+i:i)+(s<10?0+s:s);
}
/**
 * 当前运行项目如 hjk、jyj
 * @returns {string | undefined | string}
 */
const APP_NAME = process.env.APP_NAME || 'hjk'
/**
 * api前缀
 * @type {{cjk: string, hjk: string, jyj: string}}
 */
const ApiObj = {
  cjk: '/api/qlcenter',
  hjk: '/api/hjkcenter',
  jyj: '/api/jyjcenter'
}
const ApiPrefix = ApiObj[APP_NAME]

module.exports = {
  getDate,
  APP_NAME,
  ApiPrefix
}



