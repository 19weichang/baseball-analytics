<template>
  <el-table
    class="rankTable"
    stripe
    v-loading="rankLoading"
    :data="props.playersLeagueCareer"
    height="250"
    style="width: 100%"
    empty-text="暫無數據"
  >
    <el-table-column fixed prop="number" label="No" width="70" sortable />
    <el-table-column prop="name" label="球員" width="100" />
    <el-table-column prop="hitter" label="AVG" sortable>
      <template #default="{ row }">
        {{ getPlayerAVG(row.hitter) }}
      </template>
    </el-table-column>
    <el-table-column prop="hitter" label="OPS">
      <template #default="{ row }">
        {{ getPlayerOPS(row.hitter) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Hitter, PlayerCareer } from '@/api/players/types'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  playersLeagueCareer: PlayerCareer[]
  playerLength: number
}>()

function getPlayerAVG(hitter: Hitter[] | undefined) {
  if (Array.isArray(hitter)) {
    const playerTotalAvg = hitter.reduce((acc, cur) => acc + cur.AVG, 0)
    const avg = (playerTotalAvg / hitter.length).toFixed(3)
    if (avg === 'NaN') {
      return (0).toFixed(3)
    } else {
      return avg
    }
  } else {
    return 0
  }
}

function getPlayerOPS(hitter: Hitter[] | undefined) {
  if (Array.isArray(hitter)) {
    const playerTotalOPS = hitter.reduce((acc, cur) => acc + cur.OPS, 0)
    const ops = (playerTotalOPS / hitter.length).toFixed(3)
    if (ops === 'NaN') {
      return (0).toFixed(3)
    } else {
      return ops
    }
  } else {
    return 0
  }
}

const rankLoading = computed(() => {
  return props.playersLeagueCareer.length !== props.playerLength
})
</script>

<style lang="scss" scoped>
.rankTable {
  margin: 10px 0px;
}
</style>
