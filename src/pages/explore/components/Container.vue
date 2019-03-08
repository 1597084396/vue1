<template>
  <div class="scroll-wrap" ref="wrapper">
    <div class="container">
      <div class="main border-bottom" v-for="(item, index) of list" :key="index">
        <div class="left">
          <div class="head-pic" :style="{backgroundImage: 'url(' + item.userHead + ')'}"></div>
        </div>
        <div class="right">
          <div class="user-name">{{item.userName}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="sudoku">
            <div
              class="sudoku-wrap"
              v-for="(img, page) of item.pyqImg"
              :key="page"
              :style="{backgroundImage: 'url(' + img + ')'}"
              :class="{'sudoku-4': item.pyqImg.length == 4}"
              @click="handleBannerClick(item.pyqImg, page)"
            >
            </div>
          </div>
          <div class="time">
            {{item.time}}
            <div class="tool-wrap">
              <div class="tool border-right" v-if="!item.isPraise" @click="praise(item)">
                <span class="iconfont icon-tool">&#xe644;</span>赞
              </div>
              <div class="tool tool-active border-right" v-if="item.isPraise" @click="praise(item)">
                <span class="iconfont icon-tool">&#xe6e3;</span>赞
              </div>
              <div class="tool" @click="handleChatBoxClick($event)">
                <span class="iconfont icon-tool">&#xe741;</span>评论
              </div>
            </div>
          </div>
          <div class="comment-wrap" v-show="item.comment || item.praise">
            <div class="triangle"></div>
            <div class="comment">
              <div class="praise" :class="{'border-bottom' : item.comment && item.praise}">
                <span class="iconfont icon-tool">&#xe644;</span>
                <span v-for="(praise, index) of item.praise" :key="index">
                  {{praise.praiseName}}
                  <span v-if="item.praise[index+1]">,</span>
                </span>
              </div>
              <ul class="comment-ul">
                <li class="comment-li" v-for="(comment, index) of item.comment" :key="index">
                  <span class="comment-name">{{comment.commentName}}</span>
                  <span>：</span>
                  <span class="comment-desc">{{comment.commentDesc}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fade-animation>
      <common-gallary :imgs="imgs" :page="this.page" v-if="showGallary" @close="handleGallaryClose"></common-gallary>
    </fade-animation>
    <chat-box v-show="showChatBox" @close="handleChatBoxClose"></chat-box>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/FadeAnimation'
import ChatBox from 'common/box/ChatBox'
import BScroll from 'better-scroll'
export default {
  name: 'PyqContainer',
  components: {
    CommonGallary,
    FadeAnimation,
    ChatBox
  },
  data () {
    return {
      imgs: [],
      page: 0,
      showGallary: false,
      showChatBox: false
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  props: {
    list: Array
  },
  methods: {
    handleBannerClick (imgs, page) {
      this.imgs = imgs
      this.page = page
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    },
    handleChatBoxClick ($event) {
      this.scroll.scrollToElement(event.currentTarget, 1000, 0, -100)
      this.showChatBox = true
    },
    handleChatBoxClose () {
      this.showChatBox = false
    },
    praise (item) {
      item.isPraise = !item.isPraise
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrap
  position: absolute
  top: 0.86rem
  left: 0
  right: 0
  bottom: 1rem
  overflow: hidden

  .container
    width: 100%

    .main
      width: 100%
      padding-bottom: 0.4rem
      display: flex
      display: -webkit-flex

      .left
        width: 1.4rem

        .head-pic
          width: 1rem
          height: 1rem
          margin: 0.2rem
          background-color: #eee
          background-size: 100% 100%

      .right
        margin-right: 0.5rem
        flex-grow: 1

        .user-name
          margin-top: 0.3rem
          color: #369
          font-size: 0.32rem
          font-weight: 500

        .desc
          margin-top: 0.16rem
          font-size: 0.36rem
          line-height: 0.4rem

        .sudoku
          width: 100%
          margin-top: 0.16rem
          display: flex
          display: -webkit-flex
          flex-wrap: wrap

          .sudoku-wrap
            width: 32%
            height: 0
            padding-bottom: 32%
            margin: 0 2% 2% 0
            background: #eee
            background-size: cover
            background-position: center

          .sudoku-wrap:nth-child(3n)
            margin-right: 0

          .sudoku-4
            margin-right: 2% !important

        .time
          margin-top: 0.2rem
          font-size: 0.28rem
          color: #666
          line-height: 0.5rem

          .tool-wrap
            padding: 0.06rem 0
            margin-top: -0.1rem
            float: right
            color: #666
            background-color: #f8f8f8
            border-radius: 0.06rem
            display: flex

            .tool
              width: 1.2rem
              text-align: center

              .icon-tool
                padding: 0 0.06rem

            .tool-active
              color: #369

        .comment-wrap
          width: 100%

          .triangle
            width: 0
            height: 0
            margin-left: 0.3rem
            border: 0.2rem solid
            border-color: transparent transparent #f8f8f8 transparent

          .comment
            width: 100%
            background-color: #f8f8f8
            font-size: 0.32rem
            line-height: 0.4rem

            .praise
              padding: 0.16rem 0.2rem 0.08rem
              color: #369
              font-weight: 500

            .comment-ul
              padding: 0.08rem 0.2rem

              .comment-li
                padding-bottom: 0.08rem

                .comment-name
                  color: #369
                  font-weight: 500
</style>
