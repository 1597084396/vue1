<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <div class="bscroll-container">
        <div class="top-tip">
          <span class="refresh-hook">{{pulldownMsg}}</span>
        </div>
        <ul class="content">
          <li v-for="(item,index) in list" :key="index">{{item}}</li>
        </ul>
        <div class="bottom-tip">
          <span class="loading-hook">{{pullupMsg}}</span>
        </div>
      </div>
    </div>
    <div class="alert-hook" v-show="freshsucc">刷新成功</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'test',
  data () {
    return {
      list: ['长春', '沈阳', '济南', '南京', '杭州', '福州'],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      freshsucc: false,
      temp: []
    }
  },
  methods: {
    getData () {
      return new Promise(function (resolve, reject) {
        axios.get('/api/city.json').then((res) => {
          res = res.data
          if (res.ret && res.data) {
            const data = res.data
            const arr = []
            for (let i = 0; i < 2; i++) {
              arr.push(data.hotCities[i].name)
            }
            this.temp = arr
          }
        })
      })
    },
    refreshalert () {
      this.freshsucc = true
      setTimeout(() => {
        this.freshsucc = false
      }, 1000)
    }
  },
  // mounted () {
  //   this.getData()
  // },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 30) {
          this.pulldownMsg = '释放立即刷新'
        }
      })
      this.scroll.on('touchEnd', (pos) => {
        const that = this
        if (pos.y > 30) {
          setTimeout(() => {
            this.getData().then((res) => {
              this.list = this.list.concat(that.temp)
              this.pulldownMsg = '下拉刷新'
              this.refreshalert()
              this.scroll.refresh()
            })
          }, 1000)
        } else if (pos.y < (this.scroll.maxScrollY - 30)) {
          this.pullupMsg = '加载中。。。'
          setTimeout(() => {
            this.getData().then((res) => {
              this.pullupMsg = '加载更多'
              this.list = this.list.concat('哈尔滨')
              this.scroll.refresh()
            })
          }, 1000)
        }
      })
    })
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 222px;
  background: #ccc;
  overflow: hidden;
  position: relative;
}

li {
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

.top-tip {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #555;
}

.bottom-tip {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #777;
  background: #f2f2f2;
  position: absolute;
  bottom: -35px;
  left: 0;
}

.alert-hook {
  position: fixed;
  top: 62px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  background: rgba(7, 17, 27, 0.5);
}
</style>
