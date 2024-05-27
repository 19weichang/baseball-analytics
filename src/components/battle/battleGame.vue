<template>
  <div class="battleGame">
    <el-table
      :data="props.games"
      height="250"
      style="width: 100%"
      empty-text="暫無數據"
    >
      <el-table-column prop="gameType" label="賽事" />
      <el-table-column prop="group" label="組別" />
      <el-table-column fixed prop="team" label="隊伍" />
      <el-table-column prop="PA" label="打席" />
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
      <el-table-column prop="ERRCH" label="失誤上壘" />
      <el-table-column prop="HBP" label="觸身球" />
      <el-table-column prop="SB" label="盜壘成功" />
      <el-table-column prop="CS" label="盜壘失敗" />
      <el-table-column prop="SBP" label="盜壘成功率" :formatter="changeWord" />
      <el-table-column prop="AVG" label="AVG" />
      <el-table-column prop="OBP" label="上壘率" />
      <el-table-column prop="SLG" label="長打率" />
      <el-table-column prop="OPS" label="OPS" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Game } from '../../api/games/types'
import { Hitter } from '../../api/players/types'

const props = defineProps<{
  games: Game[]
}>()

function changeWord(row: Hitter) {
  if (typeof row.SBP === 'number') {
    return row.SBP
  } else {
    return 0
  }
}
</script>

<style scoped>
.el-table {
  border-radius: 5px;
  border: 2px solid black;
  background-color: lightgrey;
}

/* table style */
.el-table:deep thead th {
  background-color: #862633 !important;
  color: white !important;
}

.el-table:deep tbody td {
  background-color: lightgrey !important;
  color: black !important;
  font-size: 1.1rem;
  font-weight: 500;
}

.el-table:deep ::before {
  border-bottom: #862633 !important;
}

.el-table:deep td {
  border-bottom: 1px solid #862633 !important;
}

.el-table:deep th {
  border-bottom: 1px solid #862633 !important;
}
</style>
