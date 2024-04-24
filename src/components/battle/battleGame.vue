<template>
  <div>
    {{ props.games }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  games: string[]
}>()
</script>
