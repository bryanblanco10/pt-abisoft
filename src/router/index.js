import Vue from 'vue'
import VueRouter from 'vue-router'
import CrudAbisoft from '@/views/CrudAbisoft'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CrudAbisoft
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
