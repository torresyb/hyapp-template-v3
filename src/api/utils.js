import qs from 'qs'
let ajaxStartTime = 0
let ajaxCache = {}
/**
 * 设置config 返回值
 * @param config
 * @returns {*}
 */
export function setConfigData (config) {
  if (config.method === 'post' && config.data && config.data.type === 'upload') {
    config.data = config.data.form
  } else if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  return config
}

/**
 * 获取请求头设置
 * @param config
 * @returns {Promise<any>}
 */
export function reqInterceptor (config) {
  return new Promise((resolve) => {
    ajaxStartTime = new Date().getTime()
    if (!ajaxCache.t || (ajaxCache.t && (new Date().getTime() - ajaxCache.t > 2000)) ) {
      return resolve(getAjaxHeader(config))
    } else {
      config.headers = Object.assign({}, config.headers, ajaxCache.ajaxHeader)
      config = setConfigData(config)
      return resolve(config)
    }
  })
}

/**
 * 调用原生的方法获取请求头
 * @param config
 */
function getAjaxHeader(config) {
  window.vm.$appInvoked('appGetAjaxHeader', {}, (rst) => {
    if (!rst.productId) {
      rst.productId = rst.pid
    }
    ajaxCache = {
      t: new Date().getTime(),
      ajaxHeader: rst,
    }
    config.headers = Object.assign({}, config.headers, rst)
    config = setConfigData(config)
    return config
  })
}

/**
 * 删除pending中的对象
 * @param config
 * @param pending
 */
export const removePending = (config, pending) => {
  for (let p in pending) {
    let item = p
    let list = pending[p]
    let _url = config.url + '&method=' + config.method + '&' + qs.stringify(typeof config.data === 'string' ? JSON.parse(config.data) : config.data)
    if (config && (list.url === _url)) {
      // 执行取消操作
      list.cancel('取消接口请求')
      // 从数组中删除记录
      pending.splice(item, 1)
      break
    }
  }
}

/**
 * ajax请求错误上报
 * @param error
 * @constructor
 */
export function UrlExceptionMonitor (error) {
  // 接口异常监控参数
  let exceptionData = {
    errorContent: '', // 错误内容
    errorType: '', // 错误类型 string
    requestUrl: '', // 接口url string
    requestUrlFunction: '', // 接口url - 标识 string
    responseTime: '', // 响应时间 string
  }
  let ajaxEndTime = new Date().getTime()
  exceptionData.errorContent = error.message && qs.stringify(error.message).substring(0, 98)
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    exceptionData.errorType = '10'
  } else {
    exceptionData.errorType = '20'
  }
  let url = error.config.url
  exceptionData.requestUrl = url
  exceptionData.requestUrlFunction = url.substring(url.lastIndexOf('/') + 1, url.length).split('?')[0]
  exceptionData.responseTime = ajaxEndTime - ajaxStartTime
  window.vm.$appInvoked('appUrlExceptionMonitor', exceptionData, '')
}
