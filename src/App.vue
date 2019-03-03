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

<style>
html, body, #app{
  height: 100%;
}
</style>
