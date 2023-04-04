import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/user/userAbout')
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登入页' },
    component: () => import('@/views/login/login')
  },
  {
    path: '/user',
    name: 'userABout',
    meta: { title: '用户详情页' },
    component: () => import('@/views/user/userAbout')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('myWebiteUser')
  if (to.name !== 'login' && !userInfo) next({ name: 'login' })
  else next()
})

export default router
