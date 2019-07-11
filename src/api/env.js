/**
 * @author yangbin
 * @date 2018/8/2
 * @Description: 开发环境配置
 */
import * as configCenter from '@/plugins/configCenter'

export function getUrl (apiName) {
  apiName = trimSlash(apiName, true, true)
  let apiPath = configCenter.get('api.' + apiName)
  let apiPrefix = configCenter.get('api.prefix')
  return joinPath(apiPrefix, apiPath)
}

// 工具方法：去除头尾的斜杠（目前只能去除一层）
function trimSlash (str, needTrimStart, needTrimEnd) {
  str = String(str)
  if (needTrimStart) {
    if (str[0] === '/') str = str.slice(1)
  }
  if (needTrimEnd) {
    if (str.slice(-1) === '/') str = str.slice(0, -1)
  }
  return str
}

// 工具方法：简单合并两个 URL 片断，不支持 `./` 和 `../`
function joinPath (path1, path2) {
  // 去掉末尾的 `/`
  path1 = trimSlash(path1, false, true)
  // 去掉开头的 `/`
  path2 = trimSlash(path2, true)

  return path1 + '/' + path2
}

/**
 * params 拼接
 * @param parmas
 */
export const getParams = params => {
  let str = ''
  for (let i in params) {
    str += i + '=' + params[i] + '&'
  }
  return str.substring(0, str.length - 1)
}
