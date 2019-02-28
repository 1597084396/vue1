<template>
  <div class="loading">
    <div class="wrapper">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'load'
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl'
@keyframes dot {
  50% {
    opacity: 0.6
    transform: scale(0.75)
  }
  100% {
    opacity: 1
    transform: scale(1)
  }
}
.loading
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: #333
  opacity: 0.5
  z-index: 9999

  .wrapper
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%);

    .dot
      width: 0.3rem
      height: 0.3rem
      margin-top: 50%
      background-color: $bgColor
      border-radius: 100%
      display: inline-block
      animation: dot 0.8s 0s infinite linear

    .dot:nth-child(2)
      margin: 0 0.36rem
      animation-delay: 0.35s !important
</style>
