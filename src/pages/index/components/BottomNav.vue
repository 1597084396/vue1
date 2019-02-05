<template>
  <ul class="bottomnav">
    <router-link :to="{name:'home'}" tag="li" class="navli" exact>
      <span class="iconfont nav-icon">&#xe6b8;</span>
      <p>首页</p>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li" class="navli border-left bofer-right">
      <span class="iconfont nav-icon">&#xe67e;</span>
      <p>发现</p>
    </router-link>
    <router-link :to="{name:'zone'}" tag="li" class="navli">
      <span class="iconfont nav-icon">&#xe78b;</span>
      <p>个人中心</p>
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
  height: 50px
  position: fixed
  bottom: 0
  display: inline-flex

  .navli
    padding: 0.2rem 0
    color: #666
    background-color: #eee
    flex: 1
    text-align: center

    &.active
      color: $bgColor

    .nav-icon
      font-size: 0.36rem
</style>
