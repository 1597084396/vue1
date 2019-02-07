<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe679;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe65c;</span>
      <input type="text" class="search" placeholder="输入城市/景点/游玩/主题" v-model.trim="info" @keyup.enter="search">
    </div>
    <search-dig :is-show="isShow" @close="close">
      <div slot="header">提示</div>
      <div class="dialog_main" slot="main">
          这里是内容插入到子组件的slot的name为main里面，可以在父组件中添加class定义样式，事件类型等各种操作
      </div>
    </search-dig>
    <router-link to="/city">
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe661;</span>
      </div>
    </router-link>
   </div>
</template>

<script>
import searchDig from 'common/dialog/Dialog'
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  components: {
    searchDig
  },
  data () {
    return {
      info: '',
      isShow: false
    }
  },
  methods: {
    search () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  },
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/varibles.styl';

.header
  display: flex
  line-height: $headerHeight
  background: $bgColor
  color: #fff

  .header-left
    width: 0.64rem
    float: left

    .back-icon
      text-align: center
      font-size: 0.4rem

  .header-input
    flex: 1
    background: #fff
    border-radius: 0.1rem
    height: 0.64rem
    line-height: 0.64rem
    margin-left: 0.2rem
    margin-top: 0.12rem
    padding-left: 0.2rem
    color: #ccc

    .search
      margin: -0.1rem 0.2rem 0
      line-height: 0.64rem

  .header-right
    min-width: 1.04rem
    padding: 0 0.1rem
    float: right
    text-align: center
    color: #fff

    .arrow-icon
      margin-left: -0.04rem
      font-size: 0.24rem
</style>
