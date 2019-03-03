<template>
  <div class="page">
    <shop-header></shop-header>
    <div class="header"></div>
    <div class="title">
      <div class="shop-pic">
        <span class="shop-type" v-if="showType">品牌</span>
      </div>
      <p class="shop-name">甘传奇鸡排</p>
      <p class="shop-descs">
        <span class="shop-desc">评价4.7</span>
        <span class="shop-desc">月售5372单</span>
        <span class="shop-desc">配送约34分钟</span>
      </p>
      <p class="shop-dis">
        <span class="discounts">满减</span>
        <span class="discount">满25减24，满35减32</span>
        <span class="discount-btn">
          2个优惠
          <span class="iconfont fold-icon">&#xe661;</span>
        </span>
      </p>
    </div>
    <div class="main">
      <div class="nav border-bottom">
        <div class="tag" @click="tab(0)">
          <div class="tag-desc tag-active">点餐</div>
        </div>
        <div class="tag">
          <div class="tag-desc" @click="tab(1)">评价</div>
        </div>
        <div class="tag">
          <div class="tag-desc" @click="tab(2)">商家</div>
        </div>
      </div>
      <div class="plate" v-if="showPlate === 0">
        <div class="menu-nav" ref="menuWrapper">
          <ul>
            <li class="menu-li" :class="{'menu-active': currentIndex === index}" v-for="(item,index) of this.menulist" :key="index" @click="selectMenu(index, $event)">
              <div class="menu-dot" v-if="showDot">10</div>
              {{item.type}}
            </li>
          </ul>
        </div>
        <div class="menu-main" ref="foodWrapper">
          <div>
            <div class="food-hook" v-for="(item,index) of this.menulist" :key="index">
              <div class="menu-title">{{item.type}}</div>
              <ul class="menu-list">
                <li class="menu-li" v-for="(food,index) of item.goods" :key="index">
                  <img
                    class="food-pic"
                    src="http://fuss10.elemecdn.com/4/93/289f874307e074bb7e1e41ecbddaajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/"
                  >
                  <div class="food">
                    <p class="food-title">{{food.title}}</p>
                    <p class="food-desc">{{food.desc}}</p>
                    <p class="food-desc">
                      <span>
                        月售
                        <span>{{food.sale}}</span>份
                      </span>
                      <span class="food-rate">
                        好评率
                        <span>{{food.rate}}</span>%
                      </span>
                    </p>
                    <p class="food-price">
                      <span class="rmb">￥</span>
                      <span class="price">{{food.price}}</span>
                      <span class="qi">起</span>
                    </p>
                    <div class="amount-wrap">
                      <span class="iconfont add-icon">&#xe6d8;</span>
                      <span class="amount" v-if="showMove">2</span>
                      <span class="iconfont move-icon" v-if="showMove">&#xe6d8;</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="car" @click="showCar">
          <div class="car-btn">
            <span class="iconfont car-icon">&#xe6af;</span>
            <div class="car-dot">12</div>
          </div>
          <p class="car-info0">
            <span class="price0">¥65.97</span>
            <span class="price1">¥82.97</span>
          </p>
          <p class="car-info1">另需配送费</p>
          <div class="pay-btn" @click.stop="pay">去结算</div>
          <collapse-transition>
            <slot>
              <div class="car-slide" v-show="showSlide"></div>
            </slot>
          </collapse-transition>
        </div>
      </div>
    </div>
    <div class="plate" v-if="showPlate === 1"></div>
    <div class="plate" v-if="showPlate === 2"></div>
  </div>
</template>

<script>
import ShopHeader from './components/Header'
import collapseTransition from 'common/slide/Slide.js'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'shop',
  components: {
    ShopHeader,
    collapseTransition
  },
  data () {
    return {
      showPlate: 0,
      showType: true,
      showDot: false,
      showSlide: false,
      showMove: false,
      scrollY: 0,
      menulist: [],
      goods: [],
      listHeight: []
    }
  },
  methods: {
    getMenuInfo () {
      axios.get('/api/menu.json').then(this.handleGetDataSucc)
    },
    handleGetDataSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.menulist = data.menulist
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      }
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
        bounce: {
          top: false,
          bottom: false
        }
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3,
        bounce: {
          top: false,
          bottom: false
        }
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-hook')
      let ref = foodList[index]
      this.foodScroll.scrollToElement(ref, 300)
    },
    showCar () {
      this.showSlide = !this.showSlide
    },
    tab (index) {
      this.showPlate = index
    },
    pay () {
      console.log('111')
    }
  },
  created () {
    this.getMenuInfo()
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl'

.page
  height: 100%

  .header
    position: fixed
    top: 0
    width: 100%
    height: 2rem
    background-image: url('../../../public/images/shoptop.png')
    background-size: cover

  .title
    position: relative
    width: 100%
    height: 2.4rem
    margin-top: 2rem
    background-color: #fff
    text-align: center
    z-index: 2

    .shop-pic
      position: absolute
      width: 1.5rem
      height: 1.5rem
      margin: -1rem 0 0 50%
      left: -0.75rem
      background-image: url('https://fuss10.elemecdn.com/c/e3/54696a50a3d068f2b470dd6401b1epng.png?imageMogr/format/webp/thumbnail/150x/')
      background-size: cover
      border-radius: 0.06rem
      z-index: 9

      .shop-type
        position: absolute
        top: 0
        left: 0
        padding: 0.02rem 0.04rem
        background: linear-gradient(90deg, #fff100, #ffe339)
        font-size: 0.12rem

    .shop-name
      padding-top: 0.8rem
      font-size: 0.4rem
      font-weight: 700

    .shop-descs
      margin-top: 0.2rem
      font-size: 0.24rem

      .shop-desc
        padding: 0 0.1rem

    .shop-dis
      width: 80%
      margin: 0.2rem 10% 0
      font-size: 0.24rem
      display: flex

      .discounts
        margin: 0 0.1rem
        background-color: #f33
        color: #fff
        padding: 0.04rem 0.06rem
        border-radius: 0.06rem

      .discount
        line-height: 0.32rem
        margin: 0 0.06rem
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        text-align: left
        flex: 1

      .discount-btn
        line-height: 0.32rem
        font-size: 0.24rem
        color: #666
        float: right

        .fold-icon
          font-size: 0.24rem
          color: #666

  .main
    position: relative
    width: 100%
    height: calc(100% - 1rem)
    overflow: hidden
    z-index: 2

    .nav
      line-height: 0.8rem
      background-color: #fff
      display: flex

      .tag
        flex: 1
        color: #666
        text-align: center
        font-size: 0.32rem

        .tag-active
          color: #000
          font-weight: 700

    .plate
      position: relative
      height: calc(100% - 0.8rem)
      display: flex

      .menu-nav
        width: 1.6rem
        height: calc(100% - 1rem)
        background-color: #f8f8f8
        overflow: hidden

        .menu-li
          position: relative
          padding: 0.36rem 0.1rem
          font-size: 0.24rem
          color: #666

          .menu-dot
            position: absolute
            padding: 0.01rem 0.03rem
            top: 0.04rem
            right: 0.04rem
            color: #fff
            background-image: linear-gradient(-90deg, #ff7416, #ff3c15)
            font-size: 0.24rem
            text-align: center
            border-radius: 0.2rem

        .menu-active
          background-color: #fff
          font-weight: 700

      .menu-main
        width: calc(100% - 2rem)
        height: calc(100% - 1rem)
        padding: 0 0.4rem 0 0.2rem
        min-width: 0
        background-color: #fff
        overflow: hidden

        .menu-title
          padding: 0.1rem 0
          color: #666
          font-size: 0.24rem
          font-weight: 700

        .menu-li
          padding: 0.2rem 0
          display: flex

          .food-pic
            width: 2rem
            height: 2rem

          .food
            position: relative
            margin-left: 0.2rem
            min-width: 0
            flex: 1

            .food-title
              font-weight: 700
              font-size: 0.32rem

            .food-desc
              width: 100%
              padding: 0.1rem 0
              color: #999
              font-size: 0.24rem
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis

              .food-rate
                margin-left: 0.2rem

            .food-price
              position: absolute
              bottom: 0
              color: #f30

              .rem
                font-size: 0.28rem

              .price
                font-size: 0.36rem

              .qi
                font-size: 0.24rem
                margin-left: 0.06rem

            .amount-wrap
              position: absolute
              bottom: 0
              right: 0
              display: flex

              .amount
                line-height: 0.48rem
                margin: 0 0.1rem

              .add-icon
                color: $bgColor
                font-size: 0.48rem

              .move-icon
                color: $bgColor
                font-size: 0.48rem

    .car
      position: fixed
      bottom: 0
      width: 100%
      height: 1rem
      background-color: #555

      .car-btn
        position: absolute
        width: 0.8rem
        height: 0.8rem
        line-height: 0.8rem
        margin: -0.2rem 0 0 0.4rem
        background-color: $bgColor
        text-align: center
        border: 0.1rem solid #444
        border-radius: 50%
        z-index: 9

        .car-icon
          color: #fff
          font-size: 0.4rem

        .car-dot
          position: absolute
          padding: 0.01rem 0.03rem
          line-height: 0.24rem
          top: -0.06rem
          right: -0.06rem
          color: #fff
          background-image: linear-gradient(-90deg, #ff7416, #ff3c15)
          font-size: 0.24rem
          text-align: center
          border-radius: 0.2rem

      .car-info0
        position: absolute
        margin: 0.2rem 0 0 1.7rem

        .price0
          color: #fff
          font-size: 0.36rem

        .price1
          color: #999
          font-size: 0.24rem
          margin-left: 0.2rem

      .car-info1
        position: absolute
        margin: 0.6rem 0 0 1.7rem
        color: #999
        font-size: 0.2rem

      .pay-btn
        width: 30%
        line-height: 1rem
        text-align: center
        color: #fff
        background-color: $bgColor
        font-size: 0.32rem
        float: right

      .car-slide
        position: absolute
        width: 100%
        height: 2rem
        margin-top: -2rem
        background-color: red
        z-index: 8
</style>
