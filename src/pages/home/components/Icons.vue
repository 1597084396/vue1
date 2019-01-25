<template>
    <div class="icons">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="icon" v-for="item of page" :key="item.id">
            <div class="icon-img-content">
              <img class="icon-img" :src="item.imgUrl">
            </div>
            <p class="icon-desc">{{item.desc}}</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      },
      iconList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
        desc: '热门景点'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png',
        desc: '一日游'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
        desc: '迪士尼'
      }, {
        id: '0004',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/e3/67df61427c8e1302.png',
        desc: '茶馆'
      }, {
        id: '0005',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
        desc: '动植物园'
      }, {
        id: '0006',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
        desc: '故宫'
      }, {
        id: '0007',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png',
        desc: '游乐园'
      }, {
        id: '0008',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/fc/b10a6b2e4f0fe102.png',
        desc: '滑雪'
      }]
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../../../assets/style/varibles.styl';
@import '../../../assets/style/mixins.styl';

.icons >>> .swiper-pagination-bullet-active
  width: .12rem
  height: .12rem
  background : $bgColor

.icons >>> .swiper-container
  height: 0
  padding-bottom: 50%

.icons
  margin-top: .2rem

  .icon
    position: relative
    float: left
    width: 25%
    height: 0
    padding-bottom: 25%
    overflow: hidden

    .icon-img-content
      position: absolute
      top: 0
      left: 0
      right: 0
      box-sizing: border-box
      padding: .16rem
      bottom: .44rem

    .icon-img
      display: block
      margin: 0 auto
      height: 100%

    .icon-desc
      position: absolute
      left: 0
      right: 0
      bottom: .16rem
      height: .44rem
      line-height: .44rem
      text-align: center
      color: $darkTextColor
      overflow: hidden
      white-space: nowrap
      ellipsis()

  .swiper-pagination
    bottom: -0.3rem
    padding-bottom: .3rem
</style>
