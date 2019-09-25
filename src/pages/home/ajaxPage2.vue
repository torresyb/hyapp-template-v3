<template>
  <div id="ajaxPage2">
    <div style="font-size: 14px; padding: 20px;">
      初始化调用退出接口
    </div>
  </div>
</template>
<script>
import {loginOutApi} from '../../api/controller/home/index'
export default {
  name: 'AjaxPage2',
  data () {
    return {}
  },
  mounted () {
    this.loginOut()
  },
  methods: {
    loginOut () {
      loginOutApi().then((rst) => {
        console.log(rst)
      })
    },
  },
}
</script>
