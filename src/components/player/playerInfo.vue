<template>
  <el-dialog
    :title="
      playerInfo?.name ? `${playerInfo.name} ${playerInfo.number}號` : '選手'
    "
    :modelValue="props.isVisible"
    width="90%"
    @close="() => $emit('close')"
  >
    <div v-loading="infoLoading">
      <div v-if="playerInfo">{{ playerInfo }}</div>
      <div v-else>暫無選手資料</div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Player } from '../../api/players/types'

const props = defineProps<{
  isVisible: boolean
  playerInfo: Player | undefined
  infoLoading: boolean
}>()
</script>
