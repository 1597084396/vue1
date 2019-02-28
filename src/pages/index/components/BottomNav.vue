<template>
  <ul class="bottomnav">
    <router-link :to="{name:'home'}" tag="li" class="navli" exact>
      <span class="iconfont nav-icon">&#xe6b8;</span>
      <p class="nav-title">首页</p>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li" class="navli">
      <span class="iconfont nav-icon">&#xe67e;</span>
      <p class="nav-title">朋友圈</p>
    </router-link>
    <router-link :to="{name:'zone'}" tag="li" class="navli">
      <span class="iconfont nav-icon">&#xe78b;</span>
      <p class="nav-title">个人中心</p>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl'

.bottomnav
  width: 100%
  height: 1rem
  position: fixed
  bottom: 0
  display: inline-flex
  z-index: 99

  .navli
    position: relative
    padding: 0.1rem 0
    color: #666
    background-color: #eee
    flex: 1
    text-align: center

    &.active
      color: $bgColor

    .nav-icon
      font-size: 0.36rem

    .nav-title
      position: absolute
      left: 0
      right: 0
      margin-top: 0.1rem
      text-align: center
</style>
