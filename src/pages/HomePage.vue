<template>
  <div class="homePageBg">
    <div class="header">
      <div class="icon">
        <img src="/public/image/icon.jpeg" alt="Omega" class="OmegaIcon" />
      </div>
      <div class=""></div>
    </div>
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
            >
              <el-table-column fixed type="index" label="Top" width="50" />
              <el-table-column prop="name" label="姓名" />
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
              <el-table-column prop="name" label="姓名" />
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
              <el-table-column prop="name" label="姓名" />
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
  </div>
  <PlayerInfo
    :isVisible="isVisible"
    :player="player"
    :playerCareer="playerCareer"
    :infoLoading="infoLoading"
    :games="games"
    @close="closePlayerInfo"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getPlayers, getPlayerHitter } from '../api/players/index'
import { Player, PlayerCareer, Hitter } from '../api/players/types'
import PlayerInfo from '../components/player/playerInfo.vue'
import { getGame } from '../api/games/index'
import { Game } from '../api/games/types'

const players = ref<Player[]>([])
const playerLength = ref<number>(0)
const loading = ref<boolean>(false)
const infoLoading = ref<boolean>(false)
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const isVisible = ref(false)
const playersCareer = ref<PlayerCareer[]>([])
const playerCareer = ref<PlayerCareer>()
const games = ref<Game[]>([])
const player = ref<Player>()

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
          : 0
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
          : 0
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
          : 0
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
  getPlayers(sheetId)
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
    getPlayerHitter(sheetId, `${player.name}${player.number}`)
      .then((data) => {
        playersCareer.value.push(Object.assign(player, { hitter: data }))
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function handlePlayer(row: Player) {
  isVisible.value = true
  infoLoading.value = true
  const sheetName = `${row.name}${row.number}`
  const CareerList = playersCareer.value
  playerCareer.value =
    CareerList[CareerList.map((item) => item.name).indexOf(row.name)]
  if (playerCareer.value) {
    getGame(sheetId, sheetName)
      .then((gameSheet) => {
        games.value = gameSheet
        player.value = row
        infoLoading.value = false
      })
      .catch((err) => {
        console.log(err)
        infoLoading.value = false
      })
  }
}

function closePlayerInfo() {
  isVisible.value = false
  playerCareer.value = undefined
}

fetchPlayerSheet()
</script>

<style scoped>
.homePageBg {
  height: 100%;
  background-image: url('public/image/backgroundImage.jpg');
  background-size: cover;
}

.homePage {
  height: 100%;
  padding: 30px;
}

.block {
  background-color: rgba(161, 47, 47, 0.95);
  border-radius: 20px;
  padding: 10px 20px;
}

.header {
  height: 60px;
  background-color: #862633;
  color: white;
  font-size: 40px;
  box-shadow: 0px 2px 5px #e9e9e9;
}

.rankTable {
  border-radius: 5px;
  border: 2px solid #e9e9e9;
}

.homePageTable {
  border: 2px solid #e9e9e9;
  border-radius: 5px;
  margin: 10px 0px;
}

.title {
  font-size: 20px;
  font-weight: 400;
  margin: 10px 0px;
}

.playerNameBtn {
  padding: 0px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #409eff;
  }
}

.tabsCard {
  margin: 10px 0px;
}

.icon {
  height: 100%;
}

.OmegaIcon {
  height: 100%;
}
</style>
