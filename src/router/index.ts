import {
  createRouter as createVueRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: '首頁' }
  },
  {
    path: '/playerInfo',
    name: 'PlayerInfoPage',
    component: () => import('@/pages/PlayerInfoPage.vue'),
    meta: { title: '球員資訊' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: '找不到頁面' }
  }
]

export function createRouter() {
  return createVueRouter({
    history: createWebHashHistory(),
    routes
  })
}
