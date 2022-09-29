import type { App } from 'vue'
import type { AppRouteRecordRaw } from './types'
import NProgress from 'nprogress'

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// import { USER_INFO_KEY } from '@/enums/cacheEnum'

const modules: Object = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteRecordRaw[] = []

// 公共路由
const publicRoutes: any = []
Object.keys(modules).forEach((key) => {
  console.log(key, modules)
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  if (key == './modules/public.ts') {
    // 公共路由
    publicRoutes.push(...modList)
  } else {
    // 非公共路由
    routeModuleList.push(...modList)
  }
})

export const asyncRoutes = [...publicRoutes, ...routeModuleList]

const isHash = import.meta.env?.VITE_APP_ROUTE_MODE === 'hash'

const publicPath = import.meta.env.VITE_PUBLIC_PATH

const router = createRouter({
  history: isHash ? createWebHashHistory(publicPath) : createWebHistory(publicPath),
  routes: asyncRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, _, next) => {
  if (!NProgress.isStarted()) NProgress.start()
  next()
  // const isAuth = localStorage.getItem(USER_INFO_KEY)
  // if (isAuth) {
  //   if (to.path.startsWith('/login')) {
  //     next({ path: '/home' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.path.startsWith('/login')) {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // }
})
router.afterEach(() => {
  NProgress.done()
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
