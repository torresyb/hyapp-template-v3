import '@babel/polyfill'
import './assets/css/reset.css'
import './assets/css/1px.scss'
import Vue from 'vue'
import './errorLog'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { HyButton, HyCell, ConfirmPlugin } from 'hyapp-ui'
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
Vue.prototype.getReqUuid = function() {
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
  // 添加版本信息  VERSION => 取package.json 'version'字段
  console.log('版本号:', VERSION)
} else {
  require('./plugins/vconsole')
}
