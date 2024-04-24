<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="player"
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
  </el-card>
  <PlayerInfo
    :isVisible="isVisible"
    :playerInfo="playerInfo"
    :infoLoading="infoLoading"
    @close="closePlayerInfo"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getPlayers, getplayer } from '../api/players/index'
import { getGame, getAllGames } from '../api/games/index'
import { Player } from '../api/players/types'
import PlayerInfo from '../components/player/playerInfo.vue'

const player = ref<Player[]>([])
const loading = ref<boolean>(false)
const infoLoading = ref<boolean>(false)
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const isVisible = ref(false)
const playerInfo = ref<Player>()

function fetchPlayerSheet() {
  loading.value = true
  getPlayers(sheetId)
    .then((data) => {
      player.value = data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

function handlePlayer(row: Player) {
  isVisible.value = true
  infoLoading.value = true
  const sheetName = `${row.name}${row.number}`
  getplayer(sheetId, sheetName)
    .then((data) => {
      playerInfo.value = data
      infoLoading.value = false
    })
    .catch((err) => {
      console.log(err)
      infoLoading.value = false
    })
}

function closePlayerInfo() {
  isVisible.value = false
  playerInfo.value = undefined
}

function fetchAllGames() {
  getAllGames()
}

function fetchGame() {
  const sheetName = '2024-04-21-復仇者'
  getGame(sheetName)
    .then((data) => {
      console.log(data)
    })
    .finally(() => {
      loading.value = false
    })
}

fetchPlayerSheet()
fetchAllGames()
fetchGame()
</script>
