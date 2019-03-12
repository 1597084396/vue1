<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'LeftAnimation'
}
</script>

<style lang="stylus" scoped>
.v-enter-active
  animation-name: left-in
  animation-duration: 0.2s
  animation-timing-function: linear

.v-leave-active
  animation-name: left-out
  animation-timing-function: linear
  animation-duration: 0.2s

@keyframes left-in
  0%
    transform: translate3d(-100%, 0, 0)

  50%
    transform: translate3d(-50%, 0, 0)

  100%
    transform: translate3d(0, 0, 0)

@keyframes left-out
  0%
    transform: translate3d(0, 0, 0)

  50%
    transform: translate3d(-50%, 0, 0)

  100%
    transform: translate3d(-100%, 0, 0)
</style>
