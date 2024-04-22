<template>
  <el-dialog :title="`name`" :modelValue="props.isVisible" :close="false">
    {{ playerInfo }}</el-dialog
  >
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Player } from '../../api/players/types'

const props = defineProps<{
  isVisible: boolean
  playerInfo: Player | undefined
}>()
</script>
