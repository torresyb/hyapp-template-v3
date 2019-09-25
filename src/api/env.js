/**
 * @author yangbin
 * @date 2018/8/2
 * @Description: 开发环境配置
 */

let env = {
  // dev: 'http://172.16.0.141:10014/gateway',
  dev: 'http://yapi.2345intra.com/mock/44/gateway',
  build: '/gateway',
}

/**
 * url 配置
 * @param url
 */
export const getUrl = (url) => process.env.NODE_ENV === 'develop' ? (env.dev + url) : (env.build + url)

/**
 * params 拼接
 * @param parmas
 */
export const getParams = (params) => {
  let str = ''
  for (let i in params) {
    str += i + '=' + params[i] + '&'
  }
  return str.substring(0, str.length - 1)
}

