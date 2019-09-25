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
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
}).$mount('#app')
if (process.env.NODE_ENV === 'production') {
  // 添加版本信息  VERSION => 取package.json 'version'字段
  // eslint-disable-next-line no-undef
  console.log('版本号:', VERSION)
} else {
  // require('./plugins/vconsole')
}
