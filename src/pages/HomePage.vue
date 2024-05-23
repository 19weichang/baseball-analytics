<template>
  <div class="homePage">
    <div class="block">
      <el-tabs type="border-card" class="tabsCard">
        <el-tab-pane label="打者">
          <el-row>
            <el-table
              class="homePageTable"
              stripe
              v-loading="loading"
              :data="players"
              height="250"
              style="width: 100%"
              empty-text="暫無數據"
            >
              <el-table-column fixed prop="number" label="No" width="50" />
              <el-table-column prop="name" label="姓名" width="100">
                <template #default="{ row }">
                  <el-button
                    class="playerNameBtn"
                    text
                    size="small"
                    @click="handlePlayer(row)"
                  >
                    {{ row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="age" label="年齡" />
              <el-table-column prop="position" label="守備位置" />
              <el-table-column prop="gradeIndex" label="總評" />
              <el-table-column prop="hit" label="打擊" />
              <el-table-column prop="speed" label="速度" />
              <el-table-column prop="defense" label="守備" />
              <el-table-column prop="arm" label="傳球" />
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="投手">coming soon...</el-tab-pane>
      </el-tabs>
    </div>
    <div class="block">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="安打 Top5" name="1">
          <el-card class="rankCard">
            <el-row>
              <el-col :md="6">
                <el-card
                  v-loading="rankHitLoading || loading"
                  class="playerCard"
                >
                  <div class="playerCardBox">
                    <img
                      class="playerCardImg"
                      :src="
                        filterPlayerHit[0]?.image
                          ? filterPlayerHit[0]?.image
                          : 'public/image/emptyPlayer.png'
                      "
                    />
                    <div class="playerCardText">
                      <div class="playerCardTitle">
                        {{
                          `${filterPlayerHit[0]?.name} / ${filterPlayerHit[0]?.number}`
                        }}
                      </div>
                      <div class="playerCardInfo">
                        {{ `目前安打數: ${filterPlayerHit[0]?.hit}` }}
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :md="18">
                <el-table
                  v-loading="rankHitLoading || loading"
                  class="rankTable"
                  :data="filterPlayerHit"
                  style="width: 100%"
                  :cell-style="numberOne"
                >
                  <el-table-column fixed type="index" label="Top" width="50" />
                  <el-table-column prop="name" label="姓名">
                    <template #default="{ row }">
                      <el-button
                        class="playerNameBtn"
                        text
                        size="small"
                        @click="handlePlayer(row)"
                      >
                        {{ row.name }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="hit" label="安打" />
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="打點 Top5" name="2">
          <el-card class="rankCard">
            <el-table
              v-loading="rankRBILoading || loading"
              class="rankTable"
              :data="filterPlayerRBI"
              style="width: 100%"
            >
              <el-table-column fixed type="index" label="Top" width="50" />
              <el-table-column prop="name" label="姓名">
                <template #default="{ row }">
                  <el-button
                    class="playerNameBtn"
                    text
                    size="small"
                    @click="handlePlayer(row)"
                  >
                    {{ row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="rbi" label="打點" />
            </el-table>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="全壘打 Top5" name="3">
          <el-card class="rankCard">
            <el-table
              v-loading="rankHRLoading || loading"
              class="rankTable"
              :data="filterPlayerHR"
              style="width: 100%"
            >
              <el-table-column fixed type="index" label="Top" width="50" />
              <el-table-column prop="name" label="姓名">
                <template #default="{ row }">
                  <el-button
                    class="playerNameBtn"
                    text
                    size="small"
                    @click="handlePlayer(row)"
                  >
                    {{ row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="hr" label="全壘打" />
            </el-table>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
    <StatisticalData
      :totalHits="totalHits"
      :totalRbis="totalRbis"
      :totalHrs="totalHrs"
      :thisYearLeagueGame="thisYearLeagueGame"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getPlayers, getPlayerHitter } from '../api/players/index'
import { Player, PlayerCareer, Hitter } from '../api/players/types'
import { useRouter } from 'vue-router'
import { getGameByType } from '@/api/games/index'
import StatisticalData from '@/components/statistical/statisticalData.vue'
import { Game } from '@/api/games/types'

const players = ref<Player[]>([])
const playerLength = ref<number>(0)
const loading = ref<boolean>(false)
const playersCareer = ref<PlayerCareer[]>([])
const router = useRouter()
const totalHits = ref<number>(0)
const totalRbis = ref<number>(0)
const totalHrs = ref<number>(0)
const thisYearLeagueGame = ref<Game[]>([])
const nowYear = new Date().getFullYear().toString()
const playersLeagueCareer = ref<PlayerCareer[]>([])
const activeNames = ref(['1'])

const filterPlayerHit = computed(() => {
  if (playersLeagueCareer.value.length !== playerLength.value) return []
  const hit = playersLeagueCareer.value
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
  totolHit(hit)
  return hit.slice(0, 5)
})

function totolHit(hit: { name: string; hit: number; number: number }[]) {
  totalHits.value = hit.reduce((acc, cur) => acc + cur.hit, 0)
}

const rankHitLoading = computed(() => {
  return playersLeagueCareer.value.length == playerLength.value ? false : true
})

const filterPlayerRBI = computed(() => {
  const rbi = playersLeagueCareer.value
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
  totalRbi(rbi)
  return rbi.slice(0, 5)
})

function totalRbi(rbi: { name: string; rbi: number; number: number }[]) {
  totalRbis.value = rbi.reduce((acc, cur) => acc + cur.rbi, 0)
}

const rankRBILoading = computed(() => {
  return playersLeagueCareer.value.length == playerLength.value ? false : true
})

const filterPlayerHR = computed(() => {
  const hr = playersLeagueCareer.value
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
  totalHr(hr)
  return hr.slice(0, 5)
})

function totalHr(hr: { name: string; hr: number; number: number }[]) {
  totalHrs.value = hr.reduce((acc, cur) => acc + cur.hr, 0)
}

const rankHRLoading = computed(() => {
  return playersLeagueCareer.value.length == playerLength.value ? false : true
})

function fetchPlayerSheet() {
  loading.value = true
  getPlayers()
    .then((data) => {
      players.value = data
      playerLength.value = data.length
      fetchPlayersCareer(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

async function fetchPlayersCareer(players: Player[]) {
  players.forEach((player) => {
    const sheetName = `${player.name}${player.number}`
    getPlayerHitter(sheetName)
      .then((data) => {
        playersCareer.value.push(Object.assign(player, { hitter: data }))
      })
      .catch((err) => {
        console.log(err)
      })
    getGameByType(sheetName, '季賽')
      .then((data) => {
        playersLeagueCareer.value.push(Object.assign(player, { hitter: data }))
        thisYearLeagueSeason(data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function thisYearLeagueSeason(data: Game[]) {
  thisYearLeagueGame.value.push(
    ...data.filter((n) => n.season === nowYear).map((hitter) => hitter)
  )
}

function handlePlayer(row: Player) {
  if (row.name) {
    router.push({
      name: 'PlayerInfoPage',
      query: { name: row.name, number: row.number }
    })
  }
}

function numberOne({ rowIndex }: { rowIndex: number }) {
  if (rowIndex === 0) {
    return {
      background: '#f0f9eb',
      color: '#67c23a',
      fontWeight: 'bold'
    }
  }
}

fetchPlayerSheet()
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lobster&display=swap');

.homePage {
  height: 100%;
  /* background-image: url('/baseball-analytics/image/backgroundImage.jpg'); */
  background-image: url('/baseball-analytics/image/redBackground.jpg');
  background-size: cover;
  padding: 30px;

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
        margin-left: 5px;

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
  /* tabs style */

  .tabsCard {
    margin: 10px 0px;
    background-color: #b15560;
  }

  .tabsCard:deep .el-tabs__header {
    background-color: #b15560 !important;
  }

  .tabsCard:deep .el-tabs__header .is-top {
    background-color: #862633 !important;
    color: grey !important;
  }

  .tabsCard:deep .el-tabs__header .is-active {
    background-color: #b15560 !important;
    color: white !important;
  }

  .block {
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid;
    border-radius: 20px;
    padding: 10px 20px;
  }

  .rankTable {
    border-radius: 5px;
    border: 2px solid black;
  }

  .homePageTable {
    border: 2px solid #862633;
    border-radius: 5px;
    margin: 10px 0px;
  }

  .title {
    font-size: 1.2rem;
    font-family: 'Lobster', sans-serif;
    font-weight: 400;
    margin: 5px 0px;
    color: white;
  }

  .el-collapse {
    background-color: #862633 !important;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid white;
  }
  .el-collapse:deep .el-collapse-item__header {
    font-size: 1.2rem;
    font-family: 'Lobster', sans-serif;
    font-weight: 400;
    margin: 5px 0px;
    color: white;
    background-color: #862633 !important;
  }

  .el-collapse:deep .el-collapse-item__wrap {
    background-color: #862633 !important;
  }

  .playerNameBtn {
    padding: 0px;
    font-size: 1.1rem;
    cursor: pointer;
    color: black !important;

    &:hover {
      text-decoration: underline;
      color: #862633;
    }
  }

  .OmegaIcon {
    height: 100%;
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
}
</style>
