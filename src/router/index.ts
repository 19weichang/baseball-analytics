import {
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/baseball-analytics/',
    name: 'HomePage',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: '首頁', hide: false }
  },
  {
    path: '/baseball-analytics/',
    name: 'Game',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: '比賽', hide: false }
  },
  {
    path: '/baseball-analytics/playerInfo',
    name: 'PlayerInfoPage',
    component: () => import('@/pages/PlayerInfoPage.vue'),
    meta: { title: '球員資訊', hide: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: '找不到頁面', hide: true }
  }
]
export function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes
  })
}
