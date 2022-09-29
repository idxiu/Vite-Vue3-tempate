import type { AppRouteRecordRaw } from '../types'

const publicRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'default',
    path: '/',
    meta: {
      title: '',
      hideMenu: true
    },
    component: () => import('@/views/home/index.vue')
  },
  // 园区动态列表
  {
    path: '/news',
    name: 'news',
    meta: {},
    component: () => import('@/views/news/index.vue')
  },
  // 列表详情
  {
    path: '/news/detail/:id',
    name: 'news-detail',
    meta: {},
    component: () => import('@/views/news/detail.vue')
  },
  // 租赁信息
  {
    path: '/rent',
    name: 'rent',
    meta: {},
    component: () => import('@/views/rent/index.vue')
  },
  // 租赁详情
  {
    path: '/rent/detail/:id',
    name: 'rent-detail',
    meta: {},
    component: () => import('@/views/rent/detail.vue')
  },
  // 园区招商
  {
    path: '/investment',
    name: 'investment',
    meta: {},
    component: () => import('@/views/investment/index.vue')
  },
  // api
  {
    path: '/api',
    name: 'api',
    meta: {},
    component: () => import('@/views/api/index.vue')
  },
  // api详情
  {
    path: '/api/detail/:id',
    name: 'api-detail',
    meta: {},
    component: () => import('@/views/api/detail.vue')
  },
  // store
  {
    path: '/store',
    name: 'store',
    meta: {},
    component: () => import('@/views/store/index.vue')
  },
  {
    path: '/404',
    name: 'ErrorPage',
    meta: {},
    component: () => import('@/views/errorPages/index.vue')
  },
  {
    name: '404',
    meta: {},
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export default publicRoutes
