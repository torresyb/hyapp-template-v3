import Vue from 'vue'
import VueRouter from 'vue-router'
// 个人中心
import HomeIndex from './home'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    ...HomeIndex,
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
