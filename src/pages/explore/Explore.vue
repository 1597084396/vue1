<template>
  <div class="content">
    <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>
    <ul v-for="(item, $index) in list" :key="$index">
      <li>{{item}}</li>
    </ul>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
export default {
  name: 'explore',
  components: {
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      list: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      axios.get('/api/city.json')
        .then((res, { data }) => {
          res = res.data
          if (res.ret && res.data) {
            const data = res.data
            this.cities = data.cities
            this.name = this.cities.name
            this.list.push(this.name)
            $state.loaded()
          }
        })
    }
  }
}
</script>

<style lang='css' scoped>
.content {
  padding-bottom: 1rem;
}
li {
  height: 1rem;
  background-color: #eee;
}
</style>
