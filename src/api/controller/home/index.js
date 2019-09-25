/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 首页接口
 */

import http from '../../http'
import {getUrl, getParams} from '../../env'

// 登录接口url
const loginUrl = getUrl('/login')
const loginOutUrl = getUrl('/loginout')
const uploadUrl = getUrl('/upload')

/**
 * 登录接口
 * @params query
 * @config axios 配置项
 * @url '/login'
 * @returns {*}
 */
export function getDataApi (params = {}, config = {}) {
  let q = getParams(params)
  return http.get(loginUrl + '?' + q, config)
}

export function loginOutApi (params = {}, config = {}) {
  let q = getParams(params)
  return http.get(loginOutUrl + '?' + q, config)
}

/**
 * 登录接口 post请求
 * @returns {*}
 */
export function loginDataApi (params = {}, config = {}) {
  return http.post(loginUrl, params, config)
}

export function uploadApi (params = {}, config = {}) {
  console.log('uploadApi:', params)
  return http.post(uploadUrl, params, config)
}
