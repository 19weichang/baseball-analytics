import {
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: '首頁' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { title: '找不到頁面' }
  }
]

export function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes
  })
}
