<template>
<div>
  <router-view/>
  <bottom-nav></bottom-nav>
</div>
</template>

<script>
import BottomNav from './components/BottomNav'
export default {
  name: 'home',
  components: {
    BottomNav
  }
}
</script>
