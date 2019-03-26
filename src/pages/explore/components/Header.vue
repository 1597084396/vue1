<template>
  <div class="header">
    <router-link to="/" tag="span" class="iconfont icon-nav">&#xe679;</router-link>
    <span>朋友圈</span>
    <router-link :to="{name:'zone'}" tag="span" class="iconfont icon-nav">&#xe78b;</router-link>
  </div>
</template>

<script>
export default {
  name: 'PyqHeader'
}
</script>

<style lang="stylus" scoped>
@import '~style/varibles.styl';

.header
  position: relative
  overflow: hidden
  height: $headerHeight
  line-height: $headerHeight
  text-align center
  color: #fff
  background: $bgColor
  font-size: .32rem
  display: flex
  justify-content: space-between

  .icon-nav
    padding: 0 0.3rem
</style>
