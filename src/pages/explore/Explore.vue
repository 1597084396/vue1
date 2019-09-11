<template>
  <div>
    <pyq-header></pyq-header>
    <pyq-container :list="pyqList"></pyq-container>
  </div>
</template>

<script>
import PyqHeader from './components/Header'
import PyqContainer from './components/Container'
import axios from 'axios'
export default {
  name: 'explore',
  components: {
    PyqHeader,
    PyqContainer
  },
  data () {
    return {
      pyqList: []
    }
  },
  methods: {
    getPyqInfo () {
      axios.get('https://www.wzbus.xyz/set/api/pyq.json').then(this.getPyqInfoSucc)
    },
    getPyqInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.pyqList = data.pyqList
      }
    }
  },
  mounted () {
    this.getPyqInfo()
  }
}
</script>
