<template>
    <div class="icons">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="icon" v-for="item of page" :key="item.id">
            <div class="icon-img-content">
              <router-link :to="{name:item.link}" tag="img" class="icon-img" :src="item.imgUrl"></router-link>
            </div>
            <p class="icon-desc">{{item.desc}}</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" v-if="showPagination"></div>
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
      }
    }
  },
  props: {
    list: Array
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    },
    showPagination: function () {
      if (this.list.length > 8) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl';
@import '~style/mixins.styl';

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
