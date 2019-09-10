const HomeIndex = () => import(/* webpackChunkName:'homeIndex' */ '@/pages/home/index')
export default [{
  path: '/index',
  name: 'index-page',
  component: HomeIndex,
}]
