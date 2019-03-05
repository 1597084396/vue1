<template>
  <div>
    <router-link tag="div" to="/" class="header-pre" v-show="showPre">
      <div class="iconfont header-pre-back">&#xe679;</div>
    </router-link>
    <div class="header-fixed" v-show="!showPre" :style="opacityStyle">
      <router-link tag="div" to="/" class="header-next">
        <div class="iconfont header-fixed-back">&#xe679;</div>
      </router-link>
      <div class="search-wrap">
        <span class="iconfont search-icon">&#xe65c;</span>
        <input type="text" class="search">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopHeader',
  data () {
    return {
      showPre: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (top > 0) {
        let opacity = top / 50
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = {
          opacity
        }
        this.showPre = false
      } else {
        this.showPre = true
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/varibles.styl'

.header-pre
  position: fixed
  left: 0.2rem
  top: 0.1rem
  width: 0.8rem
  line-height: 0.8rem
  border-radius: 0.4rem
  text-align: center
  background: rgba(0, 0, 0, 0.5)
  z-index: 5

  .header-pre-back
    color: #fff
    font-size: 0.4rem

.header-fixed
  position: fixed
  width: 100%
  top: 0
  height: 1rem
  line-height: 1rem
  background: #fff
  font-size: 0.32rem
  display: flex
  z-index: 5

  .header-next
    width: 0.8rem
    height: 0.8rem
    margin-left: 0.2rem
    text-align: center

    .header-fixed-back
      font-size: 0.4rem
      color: #000

  .search-wrap
    height: 0.72rem
    line-height: 0.72rem
    margin: 0.14rem 0.5rem 0.14rem 0.2rem
    background-color: #eee
    border-radius: 0.4rem
    display: flex
    flex: 1

    .search-icon
      margin-left: 0.5rem
      font-size: 0.36rem
      color: #666

    .search
      height: 0.72rem
      margin: 0 0.4rem 0 0.2rem
      background-color: #eee
      border: 0
      flex: 1
</style>
