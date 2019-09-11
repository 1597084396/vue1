<template>
  <div class="page">
    <shop-load v-show="showLoading"></shop-load>
    <shop-header></shop-header>
    <!-- 店铺信息 -->
    <div class="shop-header" :style="{backgroundImage: 'url(' + shop.headpic + ')'}"></div>
    <div class="title">
      <div class="shop-pic" :style="{backgroundImage: 'url(' + shop.pic + ')'}">
        <span class="shop-type" v-if="shop.type">{{shop.type}}</span>
      </div>
      <p class="shop-name">{{shop.name}}</p>
      <p class="shop-descs">
        <span class="shop-desc">评价{{shop.rate}}</span>
        <span class="shop-desc">月售{{shop.sale}}单</span>
        <span class="shop-desc">配送约{{shop.time}}分钟</span>
      </p>
      <p class="shop-dis">
        <span class="discounts">满减</span>
        <span class="discount">
          <span v-for="(item,index) of shop.discount" :key="index">
            满{{item.split('-')[0]}}减{{item.split('-')[1]}}
            <span v-if="shop.discount[index+1]">,</span>
          </span>
        </span>
        <span class="discount-btn" v-if="shop.discount">
          {{shop.discount.length}}个优惠
          <span class="iconfont fold-icon">&#xe661;</span>
        </span>
      </p>
    </div>
    <!-- 切页 -->
    <div class="main">
      <div class="nav border-bottom">
        <div class="tag" @click="tab(0)">
          <div class="tag-desc" :class="{'tag-active': showPlate === 0}">点餐</div>
          <div class="line" v-if="showPlate === 0"></div>
        </div>
        <div class="tag" @click="tab(1)">
          <div class="tag-desc" :class="{'tag-active': showPlate === 1}">评价</div>
          <div class="line" v-if="showPlate === 1"></div>
        </div>
        <div class="tag" @click="tab(2)">
          <div class="tag-desc" :class="{'tag-active': showPlate === 2}">商家</div>
          <div class="line" v-if="showPlate === 2"></div>
        </div>
      </div>
      <!-- 点餐页 -->
      <left-animation>
        <div class="plate plate0" v-if="showPlate === 0">
          <div class="menu-nav" ref="menuWrapper">
            <!-- 菜单分类侧栏 -->
            <ul>
              <li
                class="menu-li"
                :class="{'menu-active': currentIndex === index}"
                v-for="(item,index) of menuList"
                :key="index"
                @click="selectMenu(index, $event)"
              >
                <div class="menu-dot" v-if="showDot">10</div>
                {{item.type}}
              </li>
            </ul>
          </div>
          <div class="menu-main" ref="foodWrapper">
            <div>
              <div class="food-hook" v-for="(item,index) of menuList" :key="index">
                <div class="menu-title">{{item.type}}</div>
                <!-- 菜单内容主栏 -->
                <ul class="menu-list">
                  <li class="menu-li" v-for="(food,index) of item.goods" :key="index">
                    <img class="food-pic" :src="food.pic">
                    <div class="food">
                      <p class="food-title">{{food.title}}</p>
                      <p class="food-desc">{{food.desc}}</p>
                      <p class="food-desc">
                        <span>
                          月售<span>{{food.sale}}</span>份
                        </span>
                        <span class="food-rate">
                          好评率<span>{{food.rate}}</span>%
                        </span>
                      </p>
                      <p class="food-price">
                        <span class="rmb">￥</span>
                        <span class="price">{{food.price}}</span>
                        <span class="qi" v-if="food.price.length > 1">起</span>
                      </p>
                      <div class="amount-wrap">
                        <span
                          class="iconfont move-icon"
                          v-if="food.num > 0"
                          @click="move(food)"
                        >&#xe73d;</span>
                        <span class="amount" v-if="food.num > 0">{{food.num}}</span>
                        <span class="iconfont add-icon" @click="add(food,$event)">&#xe6d8;</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 购物车底栏 -->
          <div class="cart" @click="showcart">
            <div class="cart-btn" :class="{'cart-full': addList.length}">
              <span class="iconfont cart-icon">&#xe6b9;</span>
              <div class="cart-dot" v-if="cartNum > 0">{{cartNum}}</div>
            </div>
            <p class="cart-info0">
              <span class="price0" v-if="addList.length === 0">未选购商品</span>
              <span class="price1" v-if="addList.length > 0">¥{{realCost}}</span>
              <span class="price2" v-if="addList.length > 0">¥{{priCost}}</span>
            </p>
            <p class="cart-info1">另需配送费</p>
            <button
              class="pay-btn"
              @click.stop="pay"
              :class="{'enPay': priCost > shop.min}"
              :disabled="priCost < shop.min"
            >
            <span class="pay0" v-if="addList.length === 0">起送价¥{{shop.min}}</span>
            <p class="pay0" v-if="addList.length > 0 && priCost < shop.min">
              还差¥{{(shop.min - priCost).toFixed(2)}}起送
            </p>
            <span class="pay1" v-if="priCost >= shop.min">去结算</span>
            </button>
          </div>
          <!-- 购物车内容 -->
          <transition name="fold">
            <div class="cart-slide" v-show="showSlide">
              <p class="slide-title">
                已选商品
                <span class="silde-clear" @click="clear">
                  <span class="iconfont">&#xe6a6;</span>清空
                </span>
              </p>
              <ul>
                <li
                  class="slide-li border-bottom"
                  v-for="(item,index) of this.addList"
                  :key="index"
                >
                  <span>{{item.title}}</span>
                  <span class="slide-price-wrap">
                    ￥<span class="slide-price">{{item.price * item.num}}</span>
                  </span>
                  <div class="slide-amount-wrap">
                    <span
                      class="iconfont slide-move-icon"
                      v-if="item.num > 0"
                      @click="move(item)"
                    >&#xe73d;</span>
                    <span class="slide-amount" v-if="item.num > 0">{{item.num}}</span>
                    <span class="iconfont slide-add-icon" @click="add(item,$event)">&#xe6d8;</span>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
          <div class="mask" v-show="showSlide" @click.stop="showcart"></div>
          <!-- 添加动画 -->
          <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
              <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                  <div class="inner">1</div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </left-animation>
      <!-- 评论页 -->
      <left-animation>
        <div class="plate plate1" v-if="showPlate === 1">
          <div class="evaluate-head">
            <div class="evaluate-head-left">
              <div class="evaluate-head-wrap">
                <div class="evaluate-head-main">
                  <div class="evaluate-rate0">{{shop.rate}}</div>
                  <div class="evaluate-desc">
                    <p class="evaluate-desc0">商家评分</p>
                    <p class="evaluate-star">
                      <star :rate="shop.rate"></star>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="evaluate-head-right">
              <div class="evaluate-class">
                <p class="evaluate-desc1">味道</p>
                <p class="evaluate-rate1">{{shop.rate1}}</p>
              </div>
              <div class="evaluate-class">
                <p class="evaluate-desc1">包装</p>
                <p class="evaluate-rate1">{{shop.rate2}}</p>
              </div>
              <div class="evaluate-class">
                <p class="evaluate-desc1">配送</p>
                <p class="evaluate-rate1">{{shop.rate3}}</p>
              </div>
            </div>
          </div>
          <div class="evaluate-main border-bottom">
            <ul class="evaluate-tag-wrap">
              <li
                class="evaluate-tag"
                :class="{'tag-pos':(item.type===0||1) && !item.select,
                        'tag-neg':(item.type===2) && !item.select,
                        'tag-pos-active':(item.type===0||1) && item.select,
                        'tag-neg-active':(item.type===2) && item.select}"
                v-for="(item,index) of shop.tag"
                :key="index"
                @click="selectType(item.type, index)"
              >
                {{item.desc}}
              </li>
            </ul>
            <p class="evaluate-show border-bottom" @click="ifShowEva">
              <span class="iconfont evaluate-icon" :class="showEva?'enEva':'disEva'">&#xe656;</span>只看有内容的评价
            </p>
            <!-- 评论列表 -->
            <ul class="evaluate-list">
              <li class="evaluate-li border-bottom" v-for="(item,index) of selectList" :key="index" v-show="showEva || item.desc">
                <div class="list-left">
                  <div class="list-pic" :style="{backgroundImage: 'url(' + item.pic + ')'}"></div>
                </div>
                <div class="list-right">
                  <p class="list-info">
                    <span class="list-name">{{item.name}}</span>
                    <span class="list-date">{{item.date}}</span>
                  </p>
                  <p class="list-star">
                    <star :rate="item.rate" :label="true"></star>
                  </p>
                  <p class="list-desc">{{item.desc}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </left-animation>
      <!-- 商家页 -->
      <right-animation>
        <div class="plate" v-if="showPlate === 2">
          <div class="brand-main">
            <img class="brand-pic" :src="shop.headpic">
            <p class="brand-name">{{shop.name}}</p>
            <p class="brand-desc">{{shop.desc}}</p>
          </div>
        </div>
      </right-animation>
    </div>
  </div>
</template>

<script>
import ShopLoad from './components/Load'
import ShopHeader from './components/Header'
import Star from './components/Star'
import BScroll from 'better-scroll'
import LeftAnimation from 'common/translation/LeftAnimation'
import RightAnimation from 'common/translation/RightAnimation'
import axios from 'axios'
export default {
  name: 'shop',
  components: {
    ShopLoad,
    ShopHeader,
    Star,
    LeftAnimation,
    RightAnimation
  },
  data () {
    return {
      showPlate: 0,
      showLoading: true,
      showDot: false,
      showSlide: false,
      showEva: true,
      scrollY: 0,
      type: 0,
      shop: {},
      menuList: [],
      goods: [],
      listHeight: [],
      addList: [],
      evaList: [],
      balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
      dropBalls: []
    }
  },
  methods: {
    getMenuInfo () {
      axios.get('https://www.wzbus.xyz/set/api/menu.json').then(this.handleGetDataSucc)
    },
    handleGetDataSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.shop = data
        this.menuList = data.menuList
        this.evaList = data.evaluteList
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
        this.showLoading = false
      }
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
        preventDefault: false,
        bounce: {
          top: false,
          bottom: false
        }
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        preventDefault: false,
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
    showcart () {
      if (this.addList.length) {
        this.showSlide = !this.showSlide
      }
    },
    compare (x, y, i) {
      if (x >= parseInt(y[i].split('-')[0])) {
        if (y[i + 1]) {
          return this.compare(x, y, ++i)
        } else {
          return y[i].split('-')[1]
        }
      } else {
        if (i === 0) {
          return 0
        } else {
          return y[i - 1].split('-')[1]
        }
      }
    },
    tab (index) {
      this.showPlate = index
      if (index === 0) {
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      }
    },
    pay () {
      alert('敬请期待')
    },
    add (food, e) {
      let foodIndex = this.addList.findIndex(item => item.id === food.id)
      if (foodIndex === -1) {
        food.num += 1
        this.addList.push(food)
      } else {
        this.addList[foodIndex].num++
      }
      this.drop(e.target)
    },
    move (food) {
      let foodIndex = this.addList.findIndex(item => item.id === food.id)
      this.addList[foodIndex].num--
      if (this.addList[foodIndex].num === 0) {
        this.addList.splice(foodIndex, 1)
      }
      if (this.addList.length === 0) {
        this.showSlide = false
      }
    },
    clear () {
      for (let i = 0; i < this.addList.length; i++) {
        this.addList[i].num = 0
      }
      this.addList = []
      this.showSlide = false
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName('inner')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping (el, done) {
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName('inner')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    ifShowEva () {
      this.showEva = !this.showEva
    },
    selectType (type, index) {
      let arr = this.shop.tag
      for (let i = 0; i < arr.length; i++) {
        this.shop.tag[i].select = false
      }
      arr[index].select = true
      this.type = type
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
    },
    cartNum () {
      let cartNum = 0
      for (let i = 0; i < this.addList.length; i++) {
        cartNum += this.addList[i].num
      }
      return cartNum
    },
    Cost () {
      let cost = 0
      for (let i = 0; i < this.addList.length; i++) {
        cost += this.addList[i].num * this.addList[i].price
      }
      return cost.toFixed(2)
    },
    priCost () {
      let cost = 0
      for (let i = 0; i < this.addList.length; i++) {
        cost += this.addList[i].num * this.addList[i].price
      }
      return cost.toFixed(2)
    },
    disCost () {
      let cost = this.compare(this.priCost, this.shop.discount, 0)
      return cost
    },
    realCost () {
      let cost = this.priCost - this.disCost
      return cost.toFixed(2)
    },
    selectList () {
      let list
      switch (this.type) {
        case 0 :
          list = this.evaList
          break
        case 1 :
          list = this.evaList.filter(n => n.type === 1)
          break
        case 2 :
          list = this.evaList.filter(n => n.type === 2)
          break
        default : list = this.evaList
      }
      return list
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl'

@keyframes show
  from
    transform: translateY(100%)

  to
    transform: translateY(0%)

@keyframes hide
  from
    transform: translateY(0%)

  to
    transform: translateY(1000%)

.fold-enter-active
  animation: show 0.4s

.fold-leave-active
  animation: hide 0.4s

*
  touch-action: pan-y

.page
  height: 100%

  .shop-header
    position: fixed
    top: 0
    width: 100%
    height: 2rem
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
      background-size: cover
      border-radius: 0.06rem
      z-index: 3

      .shop-type
        position: absolute
        top: 0
        left: 0
        padding: 0.02rem 0.04rem
        background: linear-gradient(90deg, #fff100, #ffe339)
        font-size: 0.12rem
        font-weight: 700
        color: #6f3f15
        border-top-left-radius: 0.06rem
        border-bottom-right-radius: 0.06rem

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
    background-color: #fff
    overflow: hidden
    z-index: 2

    .nav
      line-height: 0.8rem
      box-sizing: border-box
      display: flex

      .tag
        position: relative
        flex: 1
        color: #666
        text-align: center
        font-size: 0.28rem

        .tag-active
          color: #000
          font-weight: 700

        .line
          position: absolute
          bottom: 0
          width: 20%
          height: 0.04rem
          left: 40%
          background-color: $bgColor

    .plate
      position: relative
      height: calc(100% - 0.8rem)
      background-color: #eee

      &.plate0
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
        padding: 0 0.3rem 0 0.2rem
        min-width: 0
        overflow: hidden
        background-color: #fff

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
                width: 0.32rem
                line-height: 0.48rem
                margin: 0 0.04rem
                text-align: center

              .add-icon
                color: $bgColor
                font-size: 0.48rem

              .move-icon
                color: #fff
                color: $bgColor
                font-size: 0.48rem

      &.plate1
        overflow-y: scroll
        .evaluate-head
          width: 100%
          height: 1.68rem
          background-color: #fff
          display: flex

          .evaluate-head-left
            width: 45%
            display: flex

            .evaluate-head-wrap
              width: 100%
              margin: 0.4rem 0
              border-right: 0.02rem solid #eee
              box-sizing: border-box

              .evaluate-head-main
                display: flex
                justify-content: center

                .evaluate-rate0
                  font-size: 0.8rem
                  color: #f60

                .evaluate-desc
                  margin-left: 0.2rem
                  line-height: 0.4rem

                  .evaluate-desc0
                    font-size: 0.28rem

                  .evaluate-star
                    font-size: 0.28rem

          .evaluate-head-right
            width: 55%
            padding: 0.4rem 0
            text-align: center
            display: flex

            .evaluate-class
              flex: 1
              color: #666

              .evaluate-desc1
                font-size: 0.28rem

              .evaluate-rate1
                font-size: 0.4rem
                font-weight: 600
                margin-top: 0.2rem

        .evaluate-main
          width: 100%
          margin-top: 0.2rem
          background-color #fff
          color: #666

          .evaluate-tag-wrap
            padding: 0.3rem

            .evaluate-tag
              padding: 0.2rem
              margin: 0.1rem
              border-radius: 0.06rem
              display: inline-block

            .tag-pos
              background-color: #ebf5ff

            .tag-pos-active
              background-color: $bgColor
              color: #fff

            .tag-neg
              background-color: #eee

            .tag-neg-active
              background-color: #ccc
              color: #fff

          .evaluate-show
            line-height: 0.6rem
            padding: 0 0.3rem
            font-size: 0.28rem

            .evaluate-icon
              margin-right: 0.1rem

            .enEva
              color: #eee

            .disEva
              color: $bgColor

          .evaluate-list
            .evaluate-li
              padding: 0.3rem
              display: flex

              .list-left
                width: 0.8rem

                .list-pic
                  width: 0.6rem
                  height: 0.6rem
                  border-radius: 50%
                  background-size: 0.6rem

              .list-right
                flex: 1

                .list-info
                  font-size: 0.24rem
                  display: flex
                  justify-content: space-between

                  .list-date
                    color: #999

                .list-star
                  font-size: 0.24rem
                  margin-top: 0.1rem

                .list-desc
                  line-height: 0.36rem
                  margin-top: 0.2rem
                  font-size: 0.28rem
                  word-break: normal
                  word-wrap: break-word

      .brand-main
        padding: 0.3rem
        background-color: #fff

        .brand-pic
          width: 100%
          height: auto

        .brand-name
          line-height: 0.6rem
          margin-top: 0.1rem
          font-size: 0.32rem
          font-weight: 600

        .brand-desc
          font-size: 0.28rem
          color: #666

    .cart
      position: fixed
      bottom: 0
      width: 100%
      height: 1rem
      background-color: #555
      z-index: 9

      .cart-btn
        position: absolute
        width: 0.8rem
        height: 0.8rem
        line-height: 0.8rem
        margin: -0.2rem 0 0 0.4rem
        color: #666
        background-color: #333
        text-align: center
        border: 0.1rem solid #444
        border-radius: 50%
        z-index: 10

        .cart-icon
          font-size: 0.4rem

        .cart-dot
          position: absolute
          padding: 0.01rem 0.06rem
          line-height: 0.24rem
          top: -0.06rem
          right: -0.06rem
          color: #fff
          background-image: linear-gradient(-90deg, #ff7416, #ff3c15)
          font-size: 0.24rem
          text-align: center
          border-radius: 0.2rem

      .cart-full
        color: #fff
        background-color: $bgColor

      .cart-info0
        position: absolute
        margin: 0.2rem 0 0 1.7rem

        .price0
          color: #999
          font-size: 0.24rem

        .price1
          color: #fff
          font-size: 0.36rem

        .price2
          color: #999
          font-size: 0.24rem
          margin-left: 0.2rem
          text-decoration: line-through

      .cart-info1
        position: absolute
        margin: 0.6rem 0 0 1.7rem
        color: #999
        font-size: 0.2rem

      .pay-btn
        width: 30%
        line-height: 1rem
        text-align: center
        color: #999
        background-color: #555
        font-weight: 600
        float: right

        .pay0
          font-size: 0.28rem

        .pay1
          font-size: 0.32rem

      .enPay
        color: #fff
        background-color: $bgColor

    .cart-slide
      position: fixed
      bottom: 1rem
      width: 100%
      color: #666
      background-color: #fff
      font-size: 0.32rem
      z-index: 8

      .slide-title
        line-height: 0.8rem
        padding: 0 0.3rem
        background-color: #eee

        .silde-clear
          float: right
          font-size: 0.28rem

      .slide-li
        position: relative
        line-height: 0.8rem
        padding: 0.1rem 0.3rem
        font-size: 0.32rem

        .slide-price-wrap
          position: absolute
          right: 2rem
          color: #f30
          font-size: 0.24rem

          .slide-price
            font-size: 0.32rem

        .slide-amount-wrap
          float: right
          display: flex

          .slide-amount
            line-height: 0.8rem
            margin: 0 0.1rem

          .slide-add-icon
            color: $bgColor
            font-size: 0.48rem

          .slide-move-icon
            color: $bgColor
            font-size: 0.48rem

    .ball-container
      .ball
        position: fixed
        left: 0.7rem
        bottom: 0.48rem
        z-index: 999
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

        .inner
          width: 0.48rem
          height: 0.48rem
          line-height: 0.48rem
          font-size: 0.36rem
          text-align: center
          color: #fff
          background-color: $bgColor
          border-radius: 50%
          transition: all 0.4s linear

    .mask
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: 7
      background-color: #000
      opacity: 0.5
</style>
