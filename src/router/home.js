const HomeIndex = () => import(/* webpackChunkName:'homeIndex' */ '@/pages/home/index')
const AjaxPage1 = () => import(/* webpackChunkName:'ajaxPage1' */ '@/pages/home/ajaxPage1')
const AjaxPage2 = () => import(/* webpackChunkName:'ajaxPage2' */ '@/pages/home/ajaxPage2')
export default [{
  path: '/index',
  name: 'IndexPage',
  component: HomeIndex,
}, {
  path: '/ajaxPage1',
  name: 'AjaxPage1',
  component: AjaxPage1,
}, {
  path: '/ajaxPage2',
  name: 'AjaxPage2',
  component: AjaxPage2,
}]
