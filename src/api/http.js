import axios from 'axios'
import qs from 'qs'
import * as configCenter from '@/plugins/configCenter'
import configHeaders from './configHeaders'
// axios全局配置
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000

/**
 * 设置config 返回值
 * @param config
 * @returns {*}
 */
function setConfigData (config) {
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
function reqInterceptor (config) {
  return new Promise((resolve) => {
    window.vm.$appInvoked('appGetAjaxHeader', {}, (rst) => {
      if (!rst.productId) {
        rst.productId = rst.pid
      }
      config.headers = Object.assign({}, config.headers, rst)
      config = setConfigData(config)
      return resolve(config)
    })
  })
}

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    if (config.isNoSetHeader) {
      // 不用获取请求头信息
      return config
    }
    let isApp = window.vm.$tools.getBrowser() === 'iOS' || window.vm.$tools.getBrowser() === 'android'
    // 基本设置请求头
    if (config.type === 'upload') {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded'
    }
    if (isApp) {
      // 移动端
      return reqInterceptor(config).then((rst) => rst)
    } else {
      // pc端
      config.headers = configHeaders
      return setConfigData(config)
    }
  },
  (error) => Promise.reject(error)
)
let timestamp1 = Date.parse(new Date())
// 接口异常监控参数
let exceptionData = {
  errorContent: '', // 错误内容
  errorType: '', // 错误类型 string
  requestUrl: '', // 接口url string
  requestUrlFunction: '', // 接口url - 标识 string
  responseTime: '', // 响应时间 string
}

// 返回拦截
axios.interceptors.response.use(
  function (rst) {
    if (rst.data.code === 'success') {
      return Promise.resolve(rst.data.result || {})
    } else if (rst.data.code === configCenter.get('errorCode.user_007') || rst.data.code === configCenter.get('errorCode.user_001')) {
      // 未登录
      window.vm.$appInvoked('appTokenInvalid', {
        message: rst.data.error.message,
      })
      return Promise.reject(rst.data)
    }
    return Promise.reject(rst.data)
  },
  function (error) {
    let timestamp2 = Date.parse(new Date())
    exceptionData.errorContent = error.message && JSON.stringify(error.message).substring(0, 98)
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      exceptionData.errorType = '10'
    } else {
      exceptionData.errorType = '20'
    }
    let url = error.config.url
    exceptionData.requestUrl = url
    exceptionData.requestUrlFunction = url.substring(url.lastIndexOf('/') + 1, url.length).split('?')[0]
    exceptionData.responseTime = timestamp2 - timestamp1
    window.vm.$appInvoked('appUrlExceptionMonitor', exceptionData, '')
    return Promise.reject(error)
  }
)

/**
 * get请求
 * @param url
 * @param config
 * @returns {Promise<any>}
 */
function getMethod (url, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then((rst) => resolve(rst.body || rst))
      .catch((error) => reject(error))
  })
}

/**
 * post 请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise<any>}
 */
function postMethod (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((rst) => resolve(rst.body || rst))
      .catch((error) => reject(error))
  })
}

/**
 * all
 * @param arr
 * @returns {Promise<any>}
 */
function allMethod (arr) {
  return new Promise((resolve, reject) => {
    axios
      .all(arr)
      .then((...rsts) => resolve(rsts))
      .catch((error) => reject(error))
  })
}

export default {
  get: getMethod,
  post: postMethod,
  all: allMethod,
}
