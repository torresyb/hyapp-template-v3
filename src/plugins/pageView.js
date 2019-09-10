import PageView from '@/components/PageView/index'
const plugin = {
  install (Vue) {
    Vue.component('page-view', PageView)
    Vue.directive('focus', {
      inserted (el) {
        el.focus()
      },
    })
  },
}
export default plugin
