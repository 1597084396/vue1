<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'RightAnimation'
}
</script>

<style lang="stylus" scoped>
.v-enter-active{
   animation-name: right-in;
  animation-duration: .2s;
  animation-timing-function:linear;
}
.v-leave-active{
  animation-name: right-out;
  animation-timing-function:linear;
  animation-duration: .2s;
}
@keyframes right-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
