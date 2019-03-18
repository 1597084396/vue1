<template>
  <div>
    <span v-for="(item,index) of list" :key="index" v-html="item">{{item}}</span>
    <span class="star-label" v-if="label">{{word}}</span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    rate: Number,
    label: {
      type: Boolean,
      default () {
        return false
      }
    }
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
    },
    word () {
      let word
      switch (this.rate) {
        case 1 :
          word = '吐槽'
          break
        case 2 :
          word = '较差'
          break
        case 3 :
          word = '一般'
          break
        case 4 :
          word = '满意'
          break
        case 5 :
          word = '超赞'
          break
      }
      return word
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

  .star-label
    color: gold
    font-size: 0.24rem !important
    margin-left: 0.1rem
</style>
