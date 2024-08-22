<template>
  <el-collapse v-model="activeNames" accordion>
    <el-collapse-item title="安打 Top5" name="1">
      <el-card class="rankCard">
        <el-row>
          <el-col :md="8">
            <el-card v-loading="rankLoading || loading" class="playerCard">
              <div class="playerCardBox">
                <img
                  class="playerCardImg"
                  :src="
                    filterPlayerHit[0]?.image
                      ? filterPlayerHit[0]?.image
                      : '/baseball-analytics/image/emptyPlayer.png'
                  "
                />
                <div class="playerCardText">
                  <div class="playerCardTitle">
                    {{
                      `${filterPlayerHit[0]?.name} #${filterPlayerHit[0]?.number}`
                    }}
                  </div>
                  <div class="playerCardInfo">
                    {{ `目前安打數: ${filterPlayerHit[0]?.hit}` }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :md="16">
            <RankTable
              :rank="'hit'"
              :loading="loading"
              :rankLoading="rankLoading"
              :filterData="filterPlayerHit"
              @handlePlayer="emits('handlePlayer', $event)"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-collapse-item>
    <el-collapse-item title="打點 Top5" name="2">
      <el-card class="rankCard">
        <el-row>
          <el-col :md="8">
            <el-card v-loading="rankLoading || loading" class="playerCard">
              <div class="playerCardBox">
                <img
                  class="playerCardImg"
                  :src="
                    filterPlayerRBI[0]?.image
                      ? filterPlayerRBI[0]?.image
                      : '/baseball-analytics/image/emptyPlayer.png'
                  "
                />
                <div class="playerCardText">
                  <div class="playerCardTitle">
                    {{
                      `${filterPlayerRBI[0]?.name} #${filterPlayerRBI[0]?.number}`
                    }}
                  </div>
                  <div class="playerCardInfo">
                    {{ `目前打點: ${filterPlayerRBI[0]?.rbi}` }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :md="16">
            <RankTable
              :rank="'rbi'"
              :loading="loading"
              :rankLoading="rankLoading"
              :filterData="filterPlayerRBI"
              @handlePlayer="emits('handlePlayer', $event)"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-collapse-item>
    <el-collapse-item title="全壘打 Top5" name="3">
      <el-card class="rankCard">
        <el-row>
          <el-col :md="8">
            <el-card v-loading="rankLoading || loading" class="playerCard">
              <div class="playerCardBox">
                <img
                  class="playerCardImg"
                  :src="
                    filterPlayerHR[0]?.image
                      ? filterPlayerHR[0]?.image
                      : '/baseball-analytics/image/emptyPlayer.png'
                  "
                />
                <div class="playerCardText">
                  <div class="playerCardTitle">
                    {{
                      `${filterPlayerHR[0]?.name} #${filterPlayerHR[0]?.number}`
                    }}
                  </div>
                  <div class="playerCardInfo">
                    {{ `目前全壘打: ${filterPlayerHR[0]?.hr}` }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :md="16">
            <RankTable
              :rank="'hr'"
              :loading="loading"
              :rankLoading="rankLoading"
              :filterData="filterPlayerHR"
              @handlePlayer="emits('handlePlayer', $event)"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-collapse-item>
    <el-collapse-item title="打擊率 Top5" name="4">
      <el-card class="rankCard">
        <el-row>
          <el-col :md="8">
            <el-card v-loading="rankLoading || loading" class="playerCard">
              <div class="playerCardBox">
                <img
                  class="playerCardImg"
                  :src="
                    filterPlayerAVG[0]?.image
                      ? filterPlayerAVG[0]?.image
                      : '/baseball-analytics/image/emptyPlayer.png'
                  "
                />
                <div class="playerCardText">
                  <div class="playerCardTitle">
                    {{
                      `${filterPlayerAVG[0]?.name} #${filterPlayerAVG[0]?.number}`
                    }}
                  </div>
                  <div class="playerCardInfo">
                    {{ `目前打擊率: ${filterPlayerAVG[0]?.avg.toFixed(3)}` }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :md="16">
            <RankTable
              :rank="'avg'"
              :loading="loading"
              :rankLoading="rankLoading"
              :filterData="filterPlayerAVG"
              @handlePlayer="emits('handlePlayer', $event)"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-collapse-item>
    <el-collapse-item title="盜壘 Top5" name="5">
      <el-card class="rankCard">
        <el-row>
          <el-col :md="8">
            <el-card v-loading="rankLoading || loading" class="playerCard">
              <div class="playerCardBox">
                <img
                  class="playerCardImg"
                  :src="
                    filterPlayerSB[0]?.image
                      ? filterPlayerSB[0]?.image
                      : '/baseball-analytics/image/emptyPlayer.png'
                  "
                />
                <div class="playerCardText">
                  <div class="playerCardTitle">
                    {{
                      `${filterPlayerSB[0]?.name} #${filterPlayerSB[0]?.number}`
                    }}
                  </div>
                  <div class="playerCardInfo">
                    {{ `目前盜壘: ${filterPlayerSB[0]?.sb}` }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :md="16">
            <RankTable
              :rank="'sb'"
              :loading="loading"
              :rankLoading="rankLoading"
              :filterData="filterPlayerSB"
              @handlePlayer="emits('handlePlayer', $event)"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { Hitter, Player, PlayerCareer } from '@/api/players/types'
import { ref, computed, defineProps } from 'vue'
import RankTable from '@/components/rank/rankTable.vue'

const props = defineProps<{
  loading: boolean
  playersLeagueCareer: PlayerCareer[]
  playerLength: number
}>()

const emits = defineEmits<{
  (n: 'handlePlayer', s: Player): void
  (s: 'totalHits', n: number): void
  (s: 'totalRbis', n: number): void
  (s: 'totalHrs', n: number): void
  (s: 'totalAvg', n: number): void
  (s: 'totalSb', n: number): void
}>()

const totalHits = ref<number>(0)
const totalRbis = ref<number>(0)
const totalHrs = ref<number>(0)
const totalAvg = ref<number>(0)
const totalSb = ref<number>(0)
const activeNames = ref(['1'])

const filterPlayerHit = computed(() => {
  if (props.playersLeagueCareer.length !== props.playerLength) return []
  const hit = props.playersLeagueCareer
    .map((player) => {
      return {
        name: player.name,
        hit: Array.isArray(player.hitter)
          ? player.hitter.reduce(
              (acc: number, cur: Hitter) =>
                acc + cur.SingleB + cur.DoubleB + cur.TripleB + cur.HR,
              0
            )
          : 0,
        number: player.number,
        image: player.img
      }
    })
    .sort((a, b) => b.hit - a.hit)
  countTotolHit(hit)
  return hit.slice(0, 5)
})

function countTotolHit(hit: { name: string; hit: number; number: number }[]) {
  totalHits.value = hit.reduce((acc, cur) => acc + cur.hit, 0)
  emits('totalHits', totalHits.value)
}

const filterPlayerRBI = computed(() => {
  const rbi = props.playersLeagueCareer
    .map((player) => {
      return {
        name: player.name,
        rbi: Array.isArray(player.hitter)
          ? player.hitter.reduce((acc: number, cur: Hitter) => acc + cur.RBI, 0)
          : 0,
        number: player.number,
        image: player.img
      }
    })
    .sort((a, b) => b.rbi - a.rbi)
  countTotalRbi(rbi)
  return rbi.slice(0, 5)
})

function countTotalRbi(rbi: { name: string; rbi: number; number: number }[]) {
  totalRbis.value = rbi.reduce((acc, cur) => acc + cur.rbi, 0)
  emits('totalRbis', totalRbis.value)
}

const filterPlayerHR = computed(() => {
  const hr = props.playersLeagueCareer
    .map((player) => {
      return {
        name: player.name,
        hr: Array.isArray(player.hitter)
          ? player.hitter.reduce((acc: number, cur: Hitter) => acc + cur.HR, 0)
          : 0,
        number: player.number,
        image: player.img
      }
    })
    .sort((a, b) => b.hr - a.hr)
  countTotalHr(hr)
  return hr.slice(0, 5)
})

function countTotalHr(hr: { name: string; hr: number; number: number }[]) {
  totalHrs.value = hr.reduce((acc, cur) => acc + cur.hr, 0)
  emits('totalHrs', totalHrs.value)
}

const filterPlayerAVG = computed(() => {
  const avg = props.playersLeagueCareer
    .map((player) => {
      return {
        name: player.name,
        avg: Array.isArray(player.hitter)
          ? player.hitter.reduce(
              (acc: number, cur: Hitter) => acc + cur.AVG,
              0
            ) / player.hitter.length
          : 0,
        number: player.number,
        image: player.img
      }
    })
    .sort((a, b) => b.avg - a.avg)
  countTotalAvg(avg)
  return avg.slice(0, 5)
})

function countTotalAvg(avg: { name: string; avg: number; number: number }[]) {
  totalAvg.value = avg.reduce((acc, cur) => acc + cur.avg, 0)
}

const filterPlayerSB = computed(() => {
  const sb = props.playersLeagueCareer
    .map((player) => {
      return {
        name: player.name,
        sb: Array.isArray(player.hitter)
          ? player.hitter.reduce((acc: number, cur: Hitter) => acc + cur.SB, 0)
          : 0,
        number: player.number,
        image: player.img
      }
    })
    .sort((a, b) => b.sb - a.sb)
  countTotalSb(sb)
  return sb.slice(0, 5)
})

function countTotalSb(sb: { name: string; sb: number; number: number }[]) {
  totalSb.value = sb.reduce((acc, cur) => acc + cur.sb, 0)
}

const rankLoading = computed(() => {
  return props.playersLeagueCareer.length == props.playerLength ? false : true
})
</script>

<style lang="scss" scoped>
.rankTable {
  border-radius: 5px;
  border: 2px solid black;
}

.rankCard {
  background-color: #b15560;

  .playerCard {
    height: 100%;
    background-color: lightgray;
    border: 1px solid #862633;

    .playerCardBox {
      display: flex;
    }

    .playerCardImg {
      border-radius: 5px;
      border: 1px solid black;
      height: 100px;
    }

    .playerCardText {
      margin-left: 10px;

      .playerCardTitle {
        font-size: 1.1rem;
        font-weight: 500;
        color: black;
      }

      .playerCardInfo {
        font-size: 1rem;
        font-weight: 400;
        margin: 5px 0px;
        color: black;
      }
    }
  }
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
