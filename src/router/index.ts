import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/OldHomeView.vue'
import JoinView from '../views/JoinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/creator',
    name: 'creator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/CreatorView.vue')
  },
  {
    path: '/participant',
    name: 'participant',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ParticipantView.vue')
  },
  {
    path: '/join/:id',
    name: 'join-id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: JoinView
    //component: () => import('../views/JoinView.vue')
  },
  {
    path: '/join',
    name: 'join',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: JoinView
    //component: () => import('../views/JoinView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
