<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-avatar
          v-if="player?.img"
          shape="square"
          :size="50"
          :src="player?.img"
        />
        <el-avatar v-else shape="square" :size="50" :src="emptyImage" />
      </el-col>
      <el-col :span="18">
        <el-descriptions :title="`${player?.name} #${player?.number}`">
          <el-descriptions-item label="年齡">
            {{ player?.age ? player?.age : '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="身高/體重">
            {{ player?.height ? player?.height : '-'
            }}{{ player?.weight ? `/${player?.weight}` : '/-' }}
          </el-descriptions-item>
          <el-descriptions-item label="守備位置">
            {{ player?.position ? player?.position : '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="投打習慣">
            {{
              player?.pitchingAndHiterHabits
                ? player?.pitchingAndHiterHabits
                : '--'
            }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="生涯數據"></el-tab-pane>
      <el-tab-pane label="進階數據"></el-tab-pane>
      <el-tab-pane label="對戰成績"></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { getGame } from '@/api/games/index'
import { Game } from '@/api/games/types'

const playerRouteQuery = useRouteQuery('player')
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const games = ref<Game[]>([])
const player = ref<undefined>()

if (typeof playerRouteQuery.value === 'string') {
  fetchPlayerInfo(playerRouteQuery.value)
}

function fetchPlayerInfo(playerRouteQuery: string) {
  const playerInfo = JSON.parse(playerRouteQuery)
  console.log(playerInfo)
  const { name, number } = playerInfo
  const sheetName = `${name}${number}`
  player.value = playerInfo
  getGame(sheetId, sheetName)
    .then((gameSheet) => {
      console.log(gameSheet)
      games.value = gameSheet
    })
    .catch((err) => {
      console.log(err)
    })
}

const emptyImage =
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
</script>
