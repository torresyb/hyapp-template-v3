import Vue from 'vue'

import hyapp from 'hyapp-utils'
/* eslint-disable no-empty */
function appUploadException(data) {
  setTimeout(() => {
    try {
      window.vm.$appInvoked('appUploadException', { error: data }, '')
    } catch (error) {}
  })
}

if (process.env.NODE_ENV === 'production') {
  // js异常上报
  hyapp.ErrorCatch.init(data => {
    appUploadException(data)
  })

  // 资源加载错误上报
  hyapp.ErrorResource.init(data => {
    appUploadException(data)
  })

  // 接口异常上报
  hyapp.XhrHook.init(data => {
    appUploadException(data)
  })
  Vue.config.errorHandler = err => {
    appUploadException(err)
  }
}
