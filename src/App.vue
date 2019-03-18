<template>
  <div id="app">
    <keep-alive exclude="shop">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
*
  margin: 0
  padding: 0

html, body, #app
  height: 100%
</style>
