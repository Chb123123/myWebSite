import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user',
    component: () => import('@/views/user/userAbout')
  },
  {
    path: '/main',
    name: 'main',
    meta: { title: '初始页' },
    component: () => import('@/views/main/index.vue')
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
  },
  {
    path: '/imageList',
    name: 'imageList',
    meta: { title: '图片列表' },
    component: () => import('@/views/home/imageList/index.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: { title: '文章发布' },
    component: () => import('@/views/home/article/index.vue')
  },
  {
    path: '/works',
    name: 'works',
    meta: { title: '用户作品' },
    component: () => import('@/views/home/works/showWorks.vue')
  },
  {
    path: '/homeCharts',
    name: 'homeCharts',
    meta: { title: '首页图表' },
    component: () => import('@/views/home/charts/homeView.vue')
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
