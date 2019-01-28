<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" src="https://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg">
      <div class="banner-info">
        <div class="banner-title">故宫</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe72c;</span>
          39
        </div>
      </div>
    </div>
    <common-gallary :imgs="imgs" v-show="showGallary" @close="handleGallaryClose"></common-gallary>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
export default {
  name: 'DetailBanner',
  components: {
    CommonGallary
  },
  props: {
    gallaryImgs: Array
  },
  data () {
    return {
      showGallary: false,
      imgs: ['https://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg', 'https://img1.qunarzz.com/sight/p0/1602/68/68aa05adb5315f9990.water.jpg']
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  position: relative
  overflow: hidden
  height: 0
  padding-bottom: 55%

  .banner-img
    width: 100%

  .banner-info
    display: flex
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: 0.72rem
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))

    .banner-title
      flex: 1
      font-size: 0.36rem
      padding: 0 0.2rem

    .banner-number
      height: 0.32rem
      line-height: 0.32rem
      margin: 0.1rem 0.16rem
      padding: 0.08rem 0.2rem
      border-radius: 0.2rem
      background: rgba(0, 0, 0, 0.5)
      font-size: 0.24rem

      .banner-icon
        font-size: 0.24rem
</style>
