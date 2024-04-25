<template>
  <div>
    <el-table
      :data="history"
      height="250"
      style="width: 100%"
      empty-text="暫無數據"
    >
      <el-table-column fixed prop="team" label="隊伍" />
      <el-table-column prop="PA" label="打席" />
      <el-table-column prop="SingleB" label="安打" />
      <el-table-column prop="DoubleB" label="二壘安打" />
      <el-table-column prop="TripleB" label="三壘安打" />
      <el-table-column prop="HR" label="全壘打" />
      <el-table-column prop="RBI" label="打點" />
      <el-table-column prop="R" label="得分" />
      <el-table-column prop="BB" label="四壞" />
      <el-table-column prop="SO" label="三振" />
      <el-table-column prop="AVG" label="AVG" />
      <el-table-column prop="OBP" label="上壘率" />
      <el-table-column prop="SLG" label="長打率" />
      <el-table-column prop="OPS" label="OPS" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { getGame } from '../../api/games/index'
import { Player } from '../../api/players/types'
import { Game } from '../../api/games/types'

const props = defineProps<{
  games: string[]
  playerInfo: Player | undefined
}>()

const history = ref<Game[]>([])

function filterGame(sheetName: string) {
  getGame(sheetName).then((gameSheet) => {
    gameSheet.forEach((game) => {
      if (game.player === props.playerInfo?.name) {
        console.log('match', game.position)
        history.value.push(game)
      }
    })
  })
}

function getPlayerGame() {
  const games = props.games
  games.forEach((game) => {
    filterGame(game)
  })
}

getPlayerGame()
</script>
