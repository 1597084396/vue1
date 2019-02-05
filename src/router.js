import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index/Index'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import Zone from './pages/zone/Zone'
import City from './pages/city/City'
import Detail from './pages/detail/Detail'
import Error from './pages/error/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        }, {
          path: 'explore',
          name: 'explore',
          component: Explore
        }, {
          path: 'zone',
          name: 'zone',
          component: Zone
        }
      ]
    }, {
      path: '/city',
      name: 'city',
      component: City
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    }, {
      path: '*',
      name: 'error',
      component: Error
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
