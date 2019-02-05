<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <div class="item" v-for="(item, index) of list" :key="index">
      <div class="item-wrapper">
        <img class="item-img" :src="item.imgUrl" />
      </div>
      <div class="item-info">
        <p class="item-title">{{item.title}}</p>
        <p class="item-desc">{{item.desc}}</p>
      </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/mixins.styl';

.title
  line-height: .8rem
  background: #eee
  text-indent: .2rem

.item-wrapper
  height: 0
  padding-bottom: calc((137/375)*100%)
  overflow: hidden

  .item-img
    width: 100%

.item-info
  flex: 1
  padding: .1rem .2rem .2rem
  min-width: 0

  .item-title
    line-height: .5rem
    font-size: .28rem
    ellipsis()

  .item-desc
    line-height: .4rem
    font-size: .24rem
    color: #616161
    ellipsis()
</style>
