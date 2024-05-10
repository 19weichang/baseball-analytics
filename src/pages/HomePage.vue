<template>
  <div class="homePage">
    <el-row>
      <!-- 安打王 -->
      <el-col :xs="24" :sm="8" style="padding: 10px 0px">
        <el-table class="rankTable" :data="[]" style="width: 100%">
          <el-table-column fixed prop="number" label="No" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="" label="安打" />
        </el-table>
      </el-col>
      <!-- 打點王 -->
      <el-col :xs="24" :sm="8" style="padding: 10px 0px">
        <el-table class="rankTable" :data="[]" style="width: 100%">
          <el-table-column fixed prop="number" label="No" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="" label="打點" />
        </el-table>
      </el-col>
      <!-- 全壘打王 -->
      <el-col :xs="24" :sm="8" style="padding: 10px 0px">
        <el-table class="rankTable" :data="[]" style="width: 100%">
          <el-table-column fixed prop="number" label="No" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="" label="全壘打" />
        </el-table>
      </el-col>
    </el-row>
    <el-divider />
    <el-tabs type="border-card">
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
            @row-click="handlePlayer"
          >
            <el-table-column fixed prop="number" label="No" width="50" />
            <el-table-column prop="name" label="姓名" />
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
import { ref } from 'vue'
import { getPlayers, getPlayerHitter } from '../api/players/index'
import { Player, PlayerCareer } from '../api/players/types'
import PlayerInfo from '../components/player/playerInfo.vue'
import { getGame } from '../api/games/index'
import { Game } from '../api/games/types'

const players = ref<Player[]>([])
const loading = ref<boolean>(false)
const infoLoading = ref<boolean>(false)
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const isVisible = ref(false)
const playersCareer = ref<PlayerCareer[]>([])
const playerCareer = ref<PlayerCareer>()
const games = ref<Game[]>([])
const player = ref<Player>()

function fetchPlayerSheet() {
  loading.value = true
  getPlayers(sheetId)
    .then((data) => {
      players.value = data
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
        console.log('playersCareer', playersCareer.value)
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
  playerCareer.value =
    playersCareer.value[
      playersCareer.value.map((item) => item.name).indexOf(row.name)
    ]

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

function closePlayerInfo() {
  isVisible.value = false
  playerCareer.value = undefined
}

fetchPlayerSheet()
</script>

<style scoped>
.homePage {
  padding: 20px;
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
</style>
