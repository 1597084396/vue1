<template>
  <div>
    <span class="star" v-for="(item,index) of list" :key="index" v-html="item">{{item}}</span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    rate: Number
  },
  computed: {
    list () {
      let star = []
      for (let i = 0; i < Math.floor(this.rate); i++) {
        star.push('<span class="iconfont star-full">&#xe66d;</span>')
      }
      if (this.rate - Math.floor(this.rate) === 0.5) {
        star.push('<span class="iconfont star-half">&#xe645;</span>')
      }
      while (star.length < 5) {
        star.push('<span class="iconfont star-empty">&#xe66d;</span>')
      }
      return star
    }
  }
}
</script>

<style lang='stylus'>
  .star-full, .star-half
    color: gold
    font-size: 0.24rem !important

  .star-empty
    color: #eee
    font-size: 0.24rem !important
</style>
