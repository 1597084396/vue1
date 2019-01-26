<template>
    <div>
        <div class="title">热销推荐</div>
        <ul>
            <div class="item border-bottom" v-for="(item, index) of list" :key="index">
                <img class="item-img" :src="item.imgUrl" />
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                    <button class="item-button">查看详情</button>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/mixins.styl';

.title
  margin-top: .2rem
  line-height: .8rem
  background: #eee
  text-indent: .2rem

.item
  display: flex
  overflow: hidden
  height: 2.4rem

  .item-img
    width: 2rem
    height: 2rem
    padding: .2rem

  .item-info
    flex: 1
    padding: .1rem
    min-width: 0

    .item-title
      line-height: .54rem
      margin-top: .2rem
      font-size: .32rem
      ellipsis()

    .item-desc
      line-height: .4rem
      color: #616161
      ellipsis()

    .item-button
      line-height: .44rem
      margin-top: .2rem
      background: #ff9300
      padding: 0 .2rem
      border-radius: .06rem
      color: #fff
</style>
