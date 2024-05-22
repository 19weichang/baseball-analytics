<template>
  <div class="header">
    <div class="icon">
      <!-- <img src="/public/image/icon.jpeg" alt="Omega" class="OmegaIcon" /> -->
      <div class="omega" @click="goHomepage">Omega</div>
    </div>
    <div class=""></div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHomepage() {
  router.push({ name: 'HomePage' })
}
</script>

<style scoped>
.header {
  height: 60px;
  background-color: #862633;
  color: white;
  font-size: 40px;
  box-shadow: 0px 2px 5px #e9e9e9;
}

.omega {
  font-size: 40px;
  padding: 0px 10px;
  font-family: 'Lobster', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: white;
  cursor: pointer;
}

.icon {
  height: 100%;
}
</style>
