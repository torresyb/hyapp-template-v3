import axios from 'axios'
import qs from 'qs'
import configHeaders from './configHeaders'
import {removePending, reqInterceptor, setConfigData, UrlExceptionMonitor} from './utils'
// axios全局配置
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000
// 默认页面切换执行cancel操作，可以再config设置
axios.defaults.routeChangeCancel = true

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~常量设置
let pending = [] // {url: '', cancel: callback} // 防止重复接口请求

// ~~~~~~~~~~~~~~~~~~~~~~~~~~请求拦截,移动端和pc端设置请求头
axios.interceptors.request.use(
  function (config) {
    pending.length>0 && removePending(config, pending) // 存储、删除 pending
    // 存储url和cancel回调
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token
    pending.push({
      url: config.url + '&method=' + config.method + '&' + qs.stringify(config.data),
      cancel: source.cancel,
      routeChangeCancel: config.routeChangeCancel,
    })

    // 基本设置请求头
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    let isApp = window.vm.$tools.getBrowser() === 'iOS' || window.vm.$tools.getBrowser() === 'android'
    if (isApp) {
      // 移动端
      return reqInterceptor(config).then((rst) => rst)
    } else {
      // pc端
      Object.assign(config.headers, configHeaders, {os: window.vm.$tools.getBrowser() === 'iOS' ? 'ios' : 'android'})
      return setConfigData(config)
    }
  },
  (error) => Promise.reject(error)
)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~返回拦截
axios.interceptors.response.use(
  function (rst) {
    removePending(rst.config, pending) // ajax响应后，从pending中移除
    if (rst.data.code === 'success') {
      return Promise.resolve(rst.data.result || {})
    } else if (rst.data.code === 'errorCode.user_007' || rst.data.code === 'errorCode.user_001') {
      // 未登录
      window.vm.$appInvoked('appTokenInvalid', {
        message: rst.data.error.message,
      })
      return Promise.reject(rst.data)
    }
    return Promise.reject(rst.data)
  },
  function (error) {
    if (axios.isCancel(error)) {
      error.selfCancel = true
    }
    if (error.config) {
      error.config && pending.length>0 && removePending(error.config, pending) // ajax响应后，从pending中移除
      UrlExceptionMonitor(error) // 错误接口上报
    }
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

/**
 * 路由切换时，取消前一个页面未执行完的ajax请求
 */
function abortRequest () {
  for(let p in pending) {
    pending[p].routeChangeCancel && pending[p].cancel('取消当前页面所有未执行完请求')
  }
}

export default {
  get: getMethod,
  post: postMethod,
  all: allMethod,
  abortRequest,
}
