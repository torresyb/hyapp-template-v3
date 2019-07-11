import '@babel/polyfill'
import './assets/css/reset.css'
import './assets/css/1px.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import {HyButton, HyCell, ConfirmPlugin} from 'hyapp-ui'
import hyapp from 'hyapp-utils'
import Mixins from './assets/js/mixins'
import utils from './plugins/utils'
import PageViewPlugin from './plugins/pageView'

// 工具类方法
Vue.component('HyButton', HyButton)
Vue.component('HyCell', HyCell)
Vue.use(hyapp.Tools)
Vue.use(ConfirmPlugin)
Vue.mixin(Mixins)
Vue.use(PageViewPlugin)
Vue.use(utils)
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// reqUuid
Vue.prototype.getReqUuid = function () {
  let token = window.localStorage.getItem('token')
  let uuid = (token ? token.slice(2, 10) : '') + 'abcdefghopsijklmz'.slice(parseInt(Math.random() * 12), parseInt(Math.random() * 12) + 5) + new Date().getTime() + ''
  return uuid
}

Vue.config.productionTip = false

// 开户状态
Vue.prototype.originAuthStatus = [{ page: 'IDENTITY_FACE', type: [109], status: [], title: '身份认证' }, { page: 'IDENTITY_OCR', type: [101, 102, 103], status: [], title: '身份认证' }, { page: 'BASEINFO', type: [105, 108], status: [], title: '基本信息' }, { page: 'CONTACTS', type: [106], status: [], title: '紧急联系人' }, { page: 'OPERATOR', type: [111], status: [], title: '运营商认证' }]

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  // 全局错误统计
  window.onerror = function (msg, url, line, col, error) {
    // 没有URL不上报！上报也不知道错误
    if (msg !== 'Script error.' && !url) {
      return true
    }
    // 采用异步的方式
    // 我遇到过在window.onunload进行ajax的堵塞上报O
    // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
    // 我猜测这里window.onerror的执行流在关闭前是必然执行的
    // 而离开文章之后的上报对于业务来说是可丢失的
    // 所以我把这里的执行流放到异步事件去执行
    // 脚本的异常数降低了10倍
    setTimeout(function () {
      var data = {}
      // 不一定所有浏览器都支持col参数
      col = col || (window.event && window.event.errorCharacter) || 0
      data.url = window.location.href
      data.line = line
      data.col = col
      data.errMessage = msg || error.message
      data.msg = ''
      if (error && error !== null && error.stack && error.stack !== null) {
        // 如果浏览器有堆栈信息
        // 直接使用
        data.msg = error.stack.toString()
      }
      // console
      // 把data上报到后台！
      // console.log(data)
      // 部分安卓手机app启动时候初始化时候会报错
      if (data.msg.indexOf('WebViewJavascriptBridge') !== -1) {
        return true
      }
      console.log('错误收集 --- > ' + JSON.stringify(data))
      window.vm.$appInvoked('appUploadException', { error: data }, '')
    }, 0)
    return true
  }

  // 添加版本信息  VERSION => 取package.json 'version'字段
  console.log('版本号:', VERSION)
} else {
  require('./plugins/vconsole')
}
