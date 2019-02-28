<template>
  <div>
    <div class="item" v-for="(item,index) of list" :key="index">
      <div class="item-title border-bottom">
        <span class="item-title-icon"></span>
        {{item.title}}
        <em v-if="!(item.children)" class="item-price">
          ￥{{item.price}}
        </em>
      </div>
      <div v-if="item.children" class="item-children">
        <detail-list :list="item.children"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
.item-title
  line-height: 0.8rem
  font-size: 0.32rem
  padding: 0 0.2rem

  .item-title-icon
    position: relative
    left: 0.06rem
    top: 0.06rem
    display: inline-block
    width: 0.36rem
    height: 0.36rem
    background: url('http://s.qunarzz.com/piao/image/touch/sight/detail.png')
    margin-right: 0.1rem
    background-size: 0.4rem 3rem

  .item-price
    float: right
    color: #ff9800

.item-children
    padding-left: 0.2rem

.car
  position: fixed
  width: 100%
  height: 1.2rem
  background-color: red
</style>
