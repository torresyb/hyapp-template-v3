/**
 * @author yangbin
 * @date 2018/12/11
 * @Description: 常用正则表达式
 */
// 手机号正则
const telReg = /^((\+?86)|(\(\+86\)))?1[3,4,5,6,7,8,9]\d{9}$/
// 验证码正则
const codeReg = /^\d{6}$/
const idReg = function (val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
  var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
  var code = val.substring(17)
  if (p.test(val)) {
    var sum = 0
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (parity[sum % 11].toString() === code.toUpperCase()) {
      return true
    }
  }
  return false
}
export {
  telReg,
  codeReg,
  idReg
}
