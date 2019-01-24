<template>
    <div class="icons">
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
        <div class="icon">
          <div class="icon-img-content">
            <img class="icon-img" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png">
          </div>
          <p class="icon-desc">热门景点</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeIcons'
}
</script>

<style lang='stylus' scoped>
@import '../../../assets/style/varibles.styl';

.icons
  height: 0
  margin-top .1rem
  padding-bottom: 50%
  overflow: hidden

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
      padding: .15rem
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
      ellipsis()
</style>