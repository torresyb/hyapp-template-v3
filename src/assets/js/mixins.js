let mixin = {
  methods: {
    // ajax 错误处理
    ajaxError (error) {
      if ([
        'errorCode.user_001',
        'errorCode.user_007',
        'WP_MBC_NO_LOGIN_ERROR',
      ].indexOf(error.code) > -1) {
        return false
      } else if (error.error && error.error.message) {
        this.toast(error.error.message)
      } else {
        this.toast('请求失败，请重试')
      }
    },
    // 拼接query成url
    paramsQueryHandle (obj) {
      let urlStr = ''
      for (let i in obj) {
        urlStr += i + '=' + obj[i] + '&'
      }
      return urlStr.slice(0, -1)
    },
    // toast弹框
    toast (msg) {
      this.$appInvoked('appShowToast', {content: msg})
    },
    loading () {
      this.$appInvoked('appShowLoadingDialog')
    },
    // 关闭loading
    closeLoading () {
      this.$appInvoked('appDismissLoadingDialog')
    },
    /**
         * 判断是否是老叛变
         * @param cur 当前版本
         * @param old 老版本
         * @returns {boolean}
         */
    judgeOldVision (cur, old) {
      let c = cur.replace(/.(\d)\.(\d)\.(\d)/g, '$1$2$3')
      let v = old.replace(/.(\d)\.(\d)\.(\d)/g, '$1$2$3')
      return c < v
    },
    /**
         * 按钮返回拦截
         */
    backClickPressHandle () {
      // 安卓拦截返回按键
      this.$appInvoked('appSetNative', {
        shouldNotifyBack: true,
      })
      // 安卓点击返回执行操作
      this.$appGetInvoked('htmlBackPress', () => {
        if (this.backClickHandle && typeof (this.backClickHandle) === 'function') {
          this.backClickHandle()
        }
      })
    },
    /**
         * 埋点
         * @param eventId
         */
    eventFun (eventId) {
      if (eventId) {
        this.$appInvoked('appExecStatistic', { eventId: eventId })
      }
    },
  },
}
export default mixin
