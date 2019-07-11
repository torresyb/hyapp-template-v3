let mixin = {
  methods: {
    // 页面行为数据
    pageBehaviorCellectionhandle (pageName, status) {
      this.$appInvoked('appCollectPageBehavior', {
        pageName: pageName,
        inOutType: status
      })
    },
    // 控件数据
    viewBehaviorCellectionhandle (pageName, viewId, viewType, actionType, text) {
      this.$appInvoked('appCollectViewBehavior', {
        pageName: pageName,
        viewId: viewId,
        viewType: viewType,
        actionType: actionType,
        content: text
      })
    }
  }
}
export default mixin
