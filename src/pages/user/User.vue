<template>
  <div class="content">
    <ul v-for="(item, $index) in list" :key="$index">
      <li class="news border-bottom">{{item}}</li>
    </ul>
    <infinite-loading @infinite="infiniteHandler" force-use-infinite-wrapper="true">
      <div slot="no-more">No more message</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
export default {
  name: 'user',
  components: {
    InfiniteLoading
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      axios.get('/api/city.json').then(res => {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.cities = data.hotCities
          for (var i = 0; i < this.cities.length; i++) {
            this.name = this.cities[i].name
            this.list.push(this.name)
          }
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.content
  padding-bottom: 1rem

  .news
    height: 1rem
</style>
