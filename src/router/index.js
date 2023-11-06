//Imports used for routing
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//Specifying the routing
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
