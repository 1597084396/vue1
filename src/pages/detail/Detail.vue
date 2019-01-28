<template>
    <div>
        <detail-banner :gallaryImgs="gallaryImgs"></detail-banner>
    </div>
</template>

<script>
import DetailBanner from './components/Banner'
export default {
  name: 'detail',
  components: {
    DetailBanner
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
