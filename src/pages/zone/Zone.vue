<template>
<div>
  <div class="header">
    <router-link :to="{name:'explore'}" class="iconfont icon-camera">&#xe664;</router-link>
    <div class="head-pic"></div>
    <div class="info-content">
      <div class="info-name">Name</div>
      <div class="info-desc">Your Desc</div>
    </div>
    <div class="icon-content">
      <span class="iconfont icon-info" @click="showCode">&#xe6b0;</span>
      <span class="iconfont icon-info">&#xe6a3;</span>
    </div>
  </div>
  <qr-code :is-show="isShow" @close="close">
    <div slot="header">我的名片</div>
    <div class="dialog_main" slot="main">
        <qriously value="Hello World!" :size="200" />
    </div>
  </qr-code>
  <ul class="zoneul">
    <router-link :to="{name:'explore'}" tag="li" class="zoneli border-bottom">
      <span class="iconfont icon-title">&#xe64c;</span>
      <p class="zone-title">收藏</p>
      <span class="iconfont icon-enter">&#xe6a3;</span>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li" class="zoneli border-bottom">
      <span class="iconfont icon-title">&#xe734;</span>
      <p class="zone-title">相册</p>
      <span class="iconfont icon-enter">&#xe6a3;</span>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li" class="zoneli border-bottom">
      <span class="iconfont icon-title">&#xe673;</span>
      <p class="zone-title">钱包</p>
      <span class="iconfont icon-enter">&#xe6a3;</span>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li" class="zoneli border-bottom">
      <span class="iconfont icon-title">&#xe68a;</span>
      <p class="zone-title">设置</p>
      <span class="iconfont icon-enter">&#xe6a3;</span>
    </router-link>
  </ul>
</div>
</template>

<script>
import QrCode from 'common/dialog/Dialog'

export default {
  name: 'zone',
  components: {
    QrCode
  },
  data () {
    return {
      info: '',
      isShow: false
    }
  },
  methods: {
    showCode () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang='stylus' scoped>
.header
  position: relative
  height: 3.6rem
  padding: 0 0.4rem 0 0.5rem
  display: flex

  .icon-camera
    position: absolute
    top: 0.2rem
    right: 0.4rem
    font-size: 0.48rem
    color: #333

  .head-pic
    width: 1.6rem
    height: 1.6rem
    margin-top: 1.2rem
    border-radius: 0.2rem
    background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549551460135&di=27a2d12641fdbc07845169240cef9c93&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F585747cfd354024.jpg')
    background-size: 100% 100%

  .info-content
    flex: 1
    margin: 1.2rem 0 0 0.4rem

    .info-name
      font-size: 0.48rem
      margin-top: 0.2rem

    .info-desc
      margin-top: 0.2rem

  .icon-content
      margin-top: 2.2rem

      .icon-info
        padding-left: 0.3rem
        font-size: 0.36rem

.dialog_main
  text-align: center

.zoneul
  border-top: 0.25rem solid #eee

  .zoneli
    line-height: 1rem
    padding: 0 0.4rem
    font-size: 0.32rem
    display: flex

    .zone-title
      padding-left: 0.32rem
      flex: 1

    .icon-title
      font-size: 0.4rem
      color: #00bcd4

    .icon-enter
      float: right
      color: #666
</style>
