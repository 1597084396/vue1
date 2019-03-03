<template>
<div>
  <div class="mask" @click="handleChatBoxClose"></div>
  <div class="box">
    <input type="text" class="chat" placeholder="评论" autofocus v-model="word">
    <span class="iconfont emoji-icon">&#xe64a;</span>
    <button :class="word?'enSend':'disSend'" :disabled="!word" @click="send">发送</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ChatBox',
  data () {
    return {
      word: ''
    }
  },
  methods: {
    handleChatBoxClose () {
      this.$emit('close')
    },
    send () {
      this.word = ''
      this.$emit('close')
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~style/varibles.styl'
.mask
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 9999
  opacity: 0

.box
  position: fixed
  bottom: 0
  width: 100%
  height: 1rem
  background-color: #eee
  z-index: 9999
  display: flex
  justify-content: flex-end

  .chat
    height: 0.8rem
    margin: 0.1rem 0.3rem
    padding: 0 0.2rem
    border: 0
    border-radius: 0.1rem
    flex: 1

  .chat::-webkit-input-placeholder
    color: #999
    font-size: 0.32rem

  .emoji-icon
    font-size: 0.6rem
    margin-top: 0.2rem
    color: #333

  .disSend
    line-height: 0.72rem
    margin: 0.14rem 0.2rem
    padding: 0 0.1rem
    border: 0.02rem solid #999
    border-radius: 0.1rem
    box-sizing: border-box
    color: #999
    background-color: #eee

  .enSend
    line-height: 0.72rem
    margin: 0.14rem 0.2rem
    padding: 0 0.1rem
    border: 0.02rem solid $bgColor
    border-radius: 0.1rem
    box-sizing: border-box
    color: #fff
    background-color: $bgColor
</style>
