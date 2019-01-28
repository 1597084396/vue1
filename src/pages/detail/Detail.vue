<template>
    <div>
        <detail-banner :gallaryImgs="gallaryImgs"></detail-banner>
        <detail-header></detail-header>
        <div class="content"></div>
    </div>
</template>

<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
export default {
  name: 'detail',
  components: {
    DetailBanner,
    DetailHeader
  },
  data () {
    return {
      gallaryImgs: [],
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  height: 20rem
</style>
