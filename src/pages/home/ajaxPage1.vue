<template>
  <div id="ajaxPage1">
    <div style="padding: 20px;">
      <hy-button :style-switch="true"
                 :button-size="{width: '200px', height: '45px'}"
                 @click.native="getDataPost">
        重复发送ajax请求post
      </hy-button>
      <p style="margin-top: 20px;">
        <hy-button :style-switch="true"
                   :button-size="{width: '200px', height: '45px'}"
                   @click.native="getDataGet">
          重复发送ajax请求get
        </hy-button>
      </p>
      <p style="margin-top: 20px;">
        <hy-button :style-switch="true"
                   :button-size="{width: '200px', height: '45px'}"
                   @click.native="getDataTime">
          ajax请求带时间戳
        </hy-button>
      </p>
      <p style="margin-top: 20px;">
        <hy-button :style-switch="true"
                   :button-size="{width: '200px', height: '45px'}"
                   @click.native="getDataAny">
          当前页面发送多个请求
        </hy-button>
      </p>
      <p style="margin-top: 20px;">
        <hy-button :style-switch="true"
                   :button-size="{width: '200px', height: '45px'}"
                   @click.native="goPage">
          跳转页面
        </hy-button>
      </p>
      <input ref="input"
             class="el-upload__input"
             type="file"
             @change="handleChange">
    </div>
  </div>
</template>
<script>
import {loginDataApi, getDataApi, uploadApi} from '../../api/controller/home/index'
export default {
  name: 'AjaxPage1',
  data () {
    return {}
  },
  methods: {
    getDataPost () {
      loginDataApi({name: 'torres', pwd: '1212', t: ''}).then((rst) => {
        console.log(rst)
      }).catch((error) => {
        error.selfCancel || alert(error.message)
      })
    },
    getDataGet () {
      getDataApi({name: 'torres', pwd: '1212', t: ''}, {routeChangeCancel: false}).then((rst) => {
        console.log(rst)
      })
    },
    getDataTime () {
      loginDataApi({name: 'torres', pwd: '1212', t: new Date().getTime()}).then((rst) => {
        console.log(rst)
      })
    },
    getDataAny () {
      this.getDataGet()
      loginDataApi({name: 'torres', pwd: '1212', t: ''}).then(() => {
        this.getDataTime()
      })
    },
    goPage () {
      this.$router.push('/ajaxPage2')
    },
    handleChange (ev) {
      const files = ev.target.files
      this.uploadFiles(files[0])
    },
    uploadFiles (file) {
      console.log(file)
      let fd = new FormData()
      fd.append('file', file)
      fd.append('id',1)//其他参数
      uploadApi(fd).then((rst) => {
        console.log(rst)
      })
    },
  },
}
</script>
