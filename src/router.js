import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Rovers from './views/Rovers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/curiosity',
      name: 'curiosity',
      component: Rovers
    },
    {
      path: '/opportunity',
      name: 'opportunity',
      component: Rovers
    },
    {
      path: '/spirit',
      name: 'spirit',
      component: Rovers
    }
  ]
})
