<template>
  <el-card class="statistical">
    <el-row>
      <el-col :sm="12" :md="6">
        <div class="statisticalCard">
          <div>團隊戰績</div>
          <div class="teamData">{{}}</div>
          <div>{{}}</div>
        </div>
      </el-col>
      <el-col :sm="12" :md="6">
        <div class="statisticalCard">
          <div>團隊安打數</div>
          <div class="teamData">{{ totalHits }}</div>
          <div>本年度安打數</div>
          <div>{{ thisYeatHits }}</div>
        </div>
      </el-col>
      <el-col :sm="12" :md="6">
        <div class="statisticalCard">
          <div>團隊打點數</div>
          <div class="teamData">{{ totalRbis }}</div>
          <div>本年度打點數</div>
          <div>{{ thisYearRbi }}</div>
        </div>
      </el-col>
      <el-col :sm="12" :md="6">
        <div class="statisticalCard">
          <div>團隊全壘打數</div>
          <div class="teamData">{{ totalHrs }}</div>
          <div>本年度全壘打數</div>
          <div>{{ thisYearHr }}</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { Game } from '@/api/games/types'

const props = defineProps<{
  totalHits: number
  totalRbis: number
  totalHrs: number
  thisYearLeagueGame: Game[]
}>()

const thisYeatHits = computed(() => {
  return Array.isArray(props.thisYearLeagueGame)
    ? props.thisYearLeagueGame.reduce(
        (acc: number, cur: Game) =>
          acc + cur.SingleB + cur.DoubleB + cur.TripleB + cur.HR,
        0
      )
    : 0
})

const thisYearRbi = computed(() => {
  return Array.isArray(props.thisYearLeagueGame)
    ? props.thisYearLeagueGame.reduce(
        (acc: number, cur: Game) => acc + cur.RBI,
        0
      )
    : 0
})

const thisYearHr = computed(() => {
  return Array.isArray(props.thisYearLeagueGame)
    ? props.thisYearLeagueGame.reduce(
        (acc: number, cur: Game) => acc + cur.HR,
        0
      )
    : 0
})
</script>

<style lang="scss" scoped>
.statistical {
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid black;
  border-radius: 20px;
  // padding: 10px 10px;
  margin-top: 10px;

  .statisticalCard {
    height: 80px;
    display: flex;
    background-color: #b15560;
    border: 1px solid white;
    padding: 10px;
    margin-bottom: 10px;
    div {
      margin-bottom: 10px;
    }
    color: white;

    .teamData {
      font-size: 1.5rem;
    }
  }
}
</style>
