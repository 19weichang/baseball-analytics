<template>
  <HeaderBar />
  <router-view v-slot="{ Component, route }">
    <transition name="router-fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import HeaderBar from '@/components/header/headerBar.vue'
</script>

<style scoped>
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter-from,
.router-fade-leave-to {
  opacity: 0;
}
</style>
