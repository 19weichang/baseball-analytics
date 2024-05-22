<template>
  <div class="homePage">
    <el-row class="block">
      <!-- 安打 -->
      <el-col :xs="24" :sm="8" style="padding: 10px">
        <el-card>
          <p class="title">安打 Top5</p>
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
        </el-card>
      </el-col>
      <!-- 打點 -->
      <el-col :xs="24" :sm="8" style="padding: 10px">
        <el-card>
          <p class="title">打點 Top5</p>
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
      </el-col>
      <!-- 全壘打 -->
      <el-col :xs="24" :sm="8" style="padding: 10px">
        <el-card>
          <p class="title">全壘打 Top5</p>
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
      </el-col>
    </el-row>
    <el-divider />
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getPlayers, getPlayerHitter } from '../api/players/index'
import { Player, PlayerCareer, Hitter } from '../api/players/types'
import { useRouter } from 'vue-router'

const players = ref<Player[]>([])
const playerLength = ref<number>(0)
const loading = ref<boolean>(false)
const playersCareer = ref<PlayerCareer[]>([])
const router = useRouter()

const filterPlayerHit = computed(() => {
  if (playersCareer.value.length !== playerLength.value) return []
  return playersCareer.value
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
        number: player.number
      }
    })
    .sort((a, b) => b.hit - a.hit)
    .slice(0, 5)
})

const rankHitLoading = computed(() => {
  return playersCareer.value.length == playerLength.value ? false : true
})

const filterPlayerRBI = computed(() => {
  return playersCareer.value
    .map((player) => {
      return {
        name: player.name,
        rbi: Array.isArray(player.hitter)
          ? player.hitter.reduce((acc: number, cur: Hitter) => acc + cur.RBI, 0)
          : 0,
        number: player.number
      }
    })
    .sort((a, b) => b.rbi - a.rbi)
    .slice(0, 5)
})

const rankRBILoading = computed(() => {
  return playersCareer.value.length == playerLength.value ? false : true
})

const filterPlayerHR = computed(() => {
  return playersCareer.value
    .map((player) => {
      return {
        name: player.name,
        hr: Array.isArray(player.hitter)
          ? player.hitter.reduce((acc: number, cur: Hitter) => acc + cur.HR, 0)
          : 0,
        number: player.number
      }
    })
    .sort((a, b) => b.hr - a.hr)
    .slice(0, 5)
})

const rankHRLoading = computed(() => {
  return playersCareer.value.length == playerLength.value ? false : true
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

function fetchPlayersCareer(players: Player[]) {
  players.forEach((player) => {
    getPlayerHitter(`${player.name}${player.number}`)
      .then((data) => {
        playersCareer.value.push(Object.assign(player, { hitter: data }))
      })
      .catch((err) => {
        console.log(err)
      })
  })
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lobster&display=swap');

.homePage {
  height: 100%;
  /* background-image: url('/baseball-analytics/image/backgroundImage.jpg'); */
  background-image: url('/baseball-analytics/image/redBackground.jpg');
  background-size: cover;
  padding: 30px;
}

.homePage .el-card {
  background-color: #b15560;
}

.homePage .el-tabs {
  background-color: #b15560;
}

/* tabs style */
.el-tabs:deep .el-tabs__header {
  background-color: #b15560 !important;
}

.el-tabs:deep .el-tabs__header .is-top {
  background-color: #862633 !important;
  color: grey !important;
}

.el-tabs:deep .el-tabs__header .is-active {
  background-color: #b15560 !important;
  color: white !important;
}

.block {
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-radius: 20px;
  padding: 10px 20px;
}

/* .header {
  height: 60px;
  background-color: #862633;
  color: white;
  font-size: 40px;
  box-shadow: 0px 2px 5px #e9e9e9;
} */

/* .omega {
  font-size: 40px;
  padding: 0px 10px;
  font-family: 'Lobster', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: white;
} */

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

.tabsCard {
  margin: 10px 0px;
}

/* .icon {
  height: 100%;
} */

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
</style>
