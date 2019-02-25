<template>
<div class="container border-bottom">
  <div class="main" v-for="(item, index) of list" :key="index">
    <div class="left">
      <div class="head-pic" :style="{backgroundImage: 'url(' + item.userHead + ')'}"></div>
    </div>
    <div class="right">
      <div class="user-name">{{item.userName}}</div>
      <div class="desc">{{item.desc}}</div>
      <div class="sudoku">
        <div class="sudoku-wrap" v-for="(img, index) of item.pyqImg" :key="index" :style="{backgroundImage: 'url(' + img + ')'}"  @click="handleBannerClick">
        </div>
      </div>
      <div class="time">{{item.time}}</div>
    </div>
    <fade-animation>
      <common-gallary :imgs="item.pyqImg" v-show="showGallary" @close="handleGallaryClose"></common-gallary>
    </fade-animation>
  </div>
</div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/FadeAnimation'
export default {
  name: 'PyqContainer',
  components: {
    CommonGallary,
    FadeAnimation
  },
  props: {
    list: Array
  },
  data () {
    return {
      showGallary: false
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
.container
  width: 100%
  padding-bottom: 1rem

  .main
    width: 100%
    margin-bottom: 0.6rem
    display: flex
    display: -webkit-flex

    .left
      width: 1.4rem

      .head-pic
        width: 1rem
        height: 1rem
        margin: 0.2rem
        background-color: #eee
        background-size: 100% 100%

    .right
      margin-right: 0.5rem
      flex-grow: 1

      .user-name
        margin-top: 0.3rem
        font-size: 0.32rem

      .desc
        margin-top: 0.16rem
        font-size: 0.32rem

      .sudoku
        width: 100%
        margin-top: 0.16rem
        display: flex
        display: -webkit-flex
        flex-wrap: wrap

        .sudoku-wrap
          width: 32%
          height: 0
          padding-bottom: 32%
          margin: 0 2% 2% 0
          background: #eee
          background-size: cover
          background-position:center

        .sudoku-wrap:nth-child(3n)
          margin-right: 0

      .time
        margin-top: 0.1rem
        font-size: 0.28rem
        color: #666
</style>
