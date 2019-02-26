<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img class="gallary-img" :src="item">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommmonGallary',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    },
    page: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        activeSlide: this.page,
        observeParents: true,
        observer: true
      }
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container >>> .swiper-container
  overflow: inherit

.container
  display: flex
  flex-direction: column
  justify-content: center
  z-index: 9999
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  background: #000
  display: flex
  align-items:Center;

  .wrapper
    width: 100%

    .gallary-img
      width: 100%

    .swiper-pagination
      color: #fff
      bottom: -1rem
</style>
