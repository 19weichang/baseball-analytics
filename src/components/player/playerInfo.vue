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
      <el-tabs type="border-card">
        <el-tab-pane label="生涯數據">
          <div v-if="playerInfo">
            <el-table
              :data="[playerInfo]"
              height="250"
              style="width: 100%"
              empty-text="暫無數據"
            >
              <el-table-column fixed prop="year" label="球季" />
              <el-table-column prop="pa" label="打數" />
              <el-table-column prop="hit" label="安打" />
              <el-table-column prop="double" label="二壘安打" />
              <el-table-column prop="triple" label="三壘安打" />
              <el-table-column prop="hr" label="全壘打" />
              <el-table-column prop="rbi" label="打點" />
              <el-table-column prop="run" label="得分" />
              <el-table-column prop="bb" label="四壞" />
              <el-table-column prop="so" label="三振" />
            </el-table>
          </div>
          <div v-else>暫無選手資料</div>
        </el-tab-pane>
        <el-tab-pane label="進階數據"> </el-tab-pane>
        <el-tab-pane label="對戰成績">
          <BattleGame :games="games" :playerInfo="playerInfo" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Player } from '../../api/players/types'
import BattleGame from '../battle/battleGame.vue'

const props = defineProps<{
  isVisible: boolean
  playerInfo: Player | undefined
  infoLoading: boolean
  games: string[]
}>()
</script>
