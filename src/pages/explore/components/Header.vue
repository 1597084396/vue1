<template>
  <div class="header">
    朋友圈
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
</style>
