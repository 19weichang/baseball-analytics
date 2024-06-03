<template>
  <div class="homePage">
    <div class="block">
      <div class="blockTitle">球員列表</div>
      <el-tabs type="border-card" class="tabsCard">
        <el-tab-pane label="球員">
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
              <el-table-column
                fixed
                prop="number"
                label="No"
                width="70"
                sortable
              />
              <el-table-column prop="name" label="球員" width="150">
                <template #default="{ row }">
                  <el-button
                    class="playerNameBtn"
                    text
                    size="small"
                    @click="handlePlayer(row)"
                  >
                    <img
                      :src="
                        row.img
                          ? row.img
                          : '/baseball-analytics/image/icon.jpeg'
                      "
                      alt="player"
                      class="playerImg"
                    />
                    {{ row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="age" label="年齡" />
              <el-table-column prop="position" label="守備位置" />
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="block">
      <div class="blockTitle">排行榜</div>
      <el-tabs type="border-card" class="rankTabsCard">
        <el-tab-pane label="打擊">
          <el-select
            v-model="gameType"
            placeholder="賽事類型"
            size="small"
            style="width: 80px"
            @change="changeGameType"
          >
            <el-option
              v-for="item in gameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <HitterRank
            :playersLeagueCareer="playersLeagueCareer"
            :playerLength="playerLength"
          />
          <PlayerRank
            :loading="loading"
            :playersLeagueCareer="playersLeagueCareer"
            :playerLength="playerLength"
            @handlePlayer="handlePlayer"
            @totalHits="handleTotalHits"
            @totalRbis="handleTotalRbis"
            @totalHrs="handleTotalHrs"
          />
        </el-tab-pane>
        <el-tab-pane label="投手">
          <el-empty description="暫時無資料..." />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="block">
      <div class="blockTitle">團隊</div>
      <StatisticalData
        :totalHits="totalHits"
        :totalRbis="totalRbis"
        :totalHrs="totalHrs"
        :thisYearLeagueGame="thisYearLeagueGame"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getPlayers, getPlayerHitter } from '../api/players/index'
import { Player, PlayerCareer } from '../api/players/types'
import { Game } from '@/api/games/types'
import { useRouter } from 'vue-router'
import { getGameByType } from '@/api/games/index'
import StatisticalData from '@/components/statistical/statisticalData.vue'
import PlayerRank from '@/components/rank/playerRank.vue'
import HitterRank from '@/components/rank/hitterRank.vue'

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
const gameType = ref('seasonGame')
const gameOptions = [{ value: 'seasonGame', label: '季賽' }]

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

function handleTotalHits(n: number) {
  totalHits.value = n
}

function handleTotalRbis(n: number) {
  totalRbis.value = n
}

function handleTotalHrs(n: number) {
  totalHrs.value = n
}

function changeGameType() {
  console.log(gameType.value)
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

  .rankTabsCard {
    margin: 10px 0px;
    background-color: #b15560;
  }
  .rankTabsCard:deep .el-tabs__header {
    background-color: #b15560 !important;
  }

  .rankTabsCard:deep .el-tabs__header .is-top {
    background-color: #862633 !important;
    color: grey !important;
  }

  .rankTabsCard:deep .el-tabs__header .is-active {
    background-color: #b15560 !important;
    color: white !important;
  }

  .block {
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid;
    border-radius: 20px;
    padding: 10px 20px;
    margin: 10px 0px;

    .blockTitle {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 10px 0px;
      color: white;
    }
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

  .playerImg {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid black;
    margin: 0px 6px;
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

@media screen and (max-width: 768px) {
  .homePage {
    padding: 30px 5px;
  }
}
</style>
