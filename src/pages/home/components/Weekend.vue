<template>
    <div>
        <div class="title">热销推荐</div>
        <ul>
            <div class="item" v-for="(item, index) of recommendList" :key="index">
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
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
        title: '京城周末撒欢',
        desc: '在帝都过周末，不仅仅是城中游！'
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

.item-wrapper
  height: 0
  padding-bottom: calc((137/375)*100%)
  overflow: hidden

  .item-img
    width: 100%

.item-info
  flex: 1
  padding: .1rem .4rem .2rem
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
