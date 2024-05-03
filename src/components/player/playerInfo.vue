<template>
  <el-dialog
    :modelValue="props.isVisible"
    :fullscreen="true"
    @close="() => $emit('close')"
  >
    <div v-loading="infoLoading">
      <el-tabs type="border-card">
        <el-tab-pane label="生涯數據">
          <div v-if="playerCareer">
            <el-table
              :data="playerCareer"
              height="250"
              style="width: 100%"
              empty-text="暫無數據"
            >
              <el-table-column fixed prop="season" label="球季" />
              <el-table-column prop="PA" label="打席數" />
              <el-table-column prop="SingleB" label="安打" />
              <el-table-column prop="DoubleB" label="二壘安打" />
              <el-table-column prop="TripleB" label="三壘安打" />
              <el-table-column prop="HR" label="全壘打" />
              <el-table-column prop="RBI" label="打點" />
              <el-table-column prop="R" label="得分" />
              <el-table-column prop="BB" label="四壞" />
              <el-table-column prop="SO" label="三振" />
              <el-table-column prop="SF" label="高飛犧牲打" />
              <el-table-column prop="SH" label="犧牲觸擊" />
              <el-table-column prop="ERRCH" label="失誤" />
              <el-table-column prop="AVG" label="AVG" />
              <el-table-column prop="OBP" label="上壘率" />
              <el-table-column prop="SLG" label="高飛犧牲打" />
              <el-table-column prop="OPS" label="OPS" />
            </el-table>
          </div>
          <div v-else>暫無選手資料</div>
        </el-tab-pane>
        <el-tab-pane label="進階數據"> </el-tab-pane>
        <el-tab-pane label="對戰成績">
          <!-- <BattleGame :games="games" :playerInfo="playerInfo" /> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { PlayerCareer } from '../../api/players/types'
// import BattleGame from '../battle/battleGame.vue'

const props = defineProps<{
  isVisible: boolean
  playerCareer: PlayerCareer[]
  infoLoading: boolean
  games: string[]
}>()
</script>
