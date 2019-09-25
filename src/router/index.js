import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../api/http'
// 个人中心
import HomeIndex from './home'
Vue.use(VueRouter)
const router =  new VueRouter({
  routes: [
    ...HomeIndex,
    {
      path: '/',
      redirect: '/index',
    },
  ],
})
/**
 * 路由切换时取消上个页面接口请求
 */
router.beforeEach((to, from, next) => {
  http.abortRequest()
  next()
})

export default router
