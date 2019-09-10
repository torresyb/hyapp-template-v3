<template>
  <div :class="['hyapp-page', type, {isIOS: $tools.getBrowser() === 'iOS'}]">
    <header class="hyapp-header">
      <div v-if="$tools.getBrowser() === 'iOS'"
           class="ios-header"></div>
      <div class="hyapp-bar">
        <div class="hy-back"
             @click="backHandle"></div>
        <h1 class="title">
          {{ title }}
        </h1>
        <div v-if="rightTxt !== ''"
             class="header-right"
             @click="rightHandle">
          {{ rightTxt }}
        </div>
      </div>
    </header>
    <div class="hyapp-content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    type: { // className
      type: String,
      default: '',
    },
    rightTxt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    isBackPage: { // 是否返回上一页
      type: Boolean,
      default: true,
    },
  },
  methods: {
    backHandle () {
      if (this.isBackPage) {
        this.$router.back()
      } else {
        this.$emit('backClick')
      }
    },
    rightHandle () {
      this.$emit('rightClick')
    },
  },
}
</script>
<style lang="scss" scoped>
  .hyapp-page {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    &.bg-fff{
      background-color: #ffffff;
    }
    .hyapp-header{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
    }
    .ios-header{
      width: 100%;
      height: 20px;
      background-color: #ffffff;
    }
    /*header样式*/
    .hyapp-bar{
      z-index: 5;
      position: relative;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: #FFFFFF;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    h1.title{
      font-size: 36px;
      font-weight: 500;
      color: #333;
      font-weight: bold;
    }
    .hy-back{
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100px;
      height: 100%;
      &:after{
        content: '';
        background: url("../../assets/images/nav_btn_back_default.png") 0 0 no-repeat;
        width: 21px;
        height: 38px;
        background-size: cover;
        position: absolute;
        left: 36px;
        top: 28px;
      }
    }
    .hyapp-content{
      position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    &.isIOS .hyapp-content{
      top:64px;
    }
    .header-right{
      position: absolute;
      right: 0;
      top: 0;
      padding-right: 36px;
      font-size: 26px;
      color: $color-link;
    }
  }
  // iphoneX、iphoneXs
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .hyapp-page.isIOS .ios-header{
      height: 44px;
    }
    .hyapp-page.isIOS .hyapp-content{
      top: 88px;
    }
  }
  // iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .hyapp-page.isIOS .ios-header{
      height: 44px;
    }
    .hyapp-page.isIOS .hyapp-content{
      top: 88px;
    }
  }
  // iphone XR
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .hyapp-page.isIOS .ios-header{
      height: 44px;
    }
    .hyapp-page.isIOS .hyapp-content{
      top: 88px;
    }
  }
</style>
