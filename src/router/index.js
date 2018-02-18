import Vue from 'vue'
import Router from 'vue-router'
import WalkCountPage from '@/components/WalkCountPage'
import GoalSelectPage from '@/components/GoalSelectPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WalkCountPage',
      component: WalkCountPage
    },
    {
      path: '/goal',
      name: 'GoalSelectPage',
      component: GoalSelectPage
    }
  ]
})
