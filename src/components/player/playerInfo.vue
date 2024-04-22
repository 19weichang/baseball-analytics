<template>
  <el-dialog
    :title="
      playerInfo?.name ? `${playerInfo.name} ${playerInfo.number}號` : '選手'
    "
    :modelValue="props.isVisible"
    :fullscreen="true"
    @close="() => $emit('close')"
  >
    <div v-loading="infoLoading">
      <div v-if="playerInfo">
        <el-table
          :data="playerInfo"
          height="250"
          style="width: 100%"
          empty-text="暫無數據"
        >
          <el-table-column fixed prop="number" label="No" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="age" label="年齡" />
        </el-table>
      </div>
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
