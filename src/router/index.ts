import {
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw[] = []

export function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes
  })
}
