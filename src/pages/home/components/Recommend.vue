<template>
    <div>
        <div class="title">热销推荐</div>
        <ul>
            <div class="item border-bottom" v-for="(item, index) of recommendList" :key="index">
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
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg',
        title: '故宫',
        desc: '东城区'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1708/2b/2b3b94de99c0a425a3.img.jpg',
        title: '八达岭长城',
        desc: '延庆县'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1602/68/68aa05adb5315f9990.water.jpg',
        title: '海洋馆',
        desc: '西城区'
      }]
    }
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
