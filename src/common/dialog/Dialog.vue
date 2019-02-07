 <template>
  <div class="dialog">
    <div class="cover" v-if="isShow" @click="close"></div>
    <transition name="drop">
      <div class="content" :style="{top:top+'%',width:width+'%',left:left+'%'}" v-if="isShow">
        <div class="header">
          <slot name="header">提示信息</slot>
        </div>
        <div class="main" :style="{paddingTop:pdt+'rem',paddingBottom:pdb+'rem'}">
          <slot name="main">弹窗内容</slot>
        </div>
        <div class="foot" @click="close">
          <span class="btn">取消</span>
          <span class="btn">确认</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    width: {
      type: Number
    },
    left: {
      type: Number
    },
    top: {
      type: Number
    },
    pdt: {
      type: Number
    },
    pdb: {
      type: Number
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/varibles.styl';

.drop-enter-active
  transition: all 0.5s ease

.drop-leave-active
  transition: all 0.3s ease

.drop-enter
  transform: translateY(-10rem)

.drop-leave-active
  transform: translateY(-10rem)

.dialog
  position: relative
  color: #2e2c2d
  font-size: 0.32rem

.cover
  background: rgba(0, 0, 0, 0.8)
  position: fixed
  z-index: 200
  top: 0
  left: 0
  width: 100%
  height: 100%

.content
  position: fixed
  top: 30%
  width: 70%
  left: 7.5%
  padding: 0.1rem 7.5%
  background: #fff
  border-radius: 3%
  z-index: 300

  .header
    height: 1rem
    line-height: 1rem
    text-align: center
    font-weight: 700

  .main
    width: 100%

  .foot
    float: right
    margin-right: -0.2rem

    .btn
      padding: 0 0.2rem
      color: $bgColor
</style>
