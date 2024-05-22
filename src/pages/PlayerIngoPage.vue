<template>
  <el-card v-loading="loading">
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
      <el-tab-pane label="生涯數據">
        <div v-if="player?.hitter">
          <el-table
            :data="player?.hitter"
            height="250"
            style="width: 100%"
            empty-text="暫無數據"
            show-summary
            :summary-method="getSummary"
          >
            <el-table-column fixed prop="season" label="球季" />
            <el-table-column prop="PA" label="打席" />
            <el-table-column prop="AB" label="打數" />
            <el-table-column prop="SingleB" label="安打" />
            <el-table-column prop="DoubleB" label="二壘安打" />
            <el-table-column prop="TripleB" label="三壘安打" />
            <el-table-column prop="HR" label="全壘打" />
            <el-table-column prop="RBI" label="打點" />
            <el-table-column prop="R" label="得分" />
            <el-table-column prop="BB" label="四壞" />
            <el-table-column prop="SO" label="三振" />
            <el-table-column prop="SF" label="高飛犧牲打" />
            <el-table-column prop="SH" label="犧牲觸擊" />
            <el-table-column prop="ERRCH" label="失誤" />
            <el-table-column prop="HBP" label="觸身球" />
            <el-table-column prop="SB" label="盜壘成功" />
            <el-table-column prop="CS" label="盜壘失敗" />
            <el-table-column
              prop="SBP"
              label="盜壘成功率"
              :formatter="rounding"
            />
            <el-table-column prop="AVG" label="AVG" :formatter="rounding" />
            <el-table-column prop="OBP" label="上壘率" :formatter="rounding" />
            <el-table-column prop="SLG" label="長打率" :formatter="rounding" />
            <el-table-column prop="OPS" label="OPS" :formatter="rounding" />
          </el-table>
        </div>
        <div v-else>暫無選手資料</div>
      </el-tab-pane>
      <el-tab-pane label="進階數據"></el-tab-pane>
      <el-tab-pane label="對戰成績">
        <BattleGame :games="games" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Hitter, Player, PlayerCareer } from '@/api/players/types'
import BattleGame from '@/components/battle/battleGame.vue'
import { TableColumnCtx } from 'element-plus'
import { useRouteQuery } from '@vueuse/router'
import { getGame } from '@/api/games/index'
import { Game } from '@/api/games/types'
import { getPlayer, getPlayerHitter } from '@/api/players/index'

const playerName = useRouteQuery('name')
const playerNumber = useRouteQuery('number')
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const games = ref<Game[]>([])
const player = ref<Player | undefined>()
const playersCareer = ref<PlayerCareer[]>([])
const loading = ref<boolean>(false)

if (playerNumber.value || playerName.value) {
  loading.value = true
  const number = Number(playerNumber.value)
  const name = playerName.value?.toString() as string
  fetchPlayer(name, number)
}

async function fetchPlayer(playerName: string, playerNumber: number) {
  const sheetName = `${playerName}${playerNumber}`

  await getPlayer(sheetId, playerNumber)
    .then((playerInfo) => {
      player.value = playerInfo
    })
    .catch((err) => {
      console.log(err)
    })
  await getGame(sheetId, sheetName)
    .then((gameSheet) => {
      games.value = gameSheet
    })
    .catch((err) => {
      console.log(err)
    })

  await getPlayerHitter(sheetId, sheetName)
    .then((data) => {
      if (player.value) {
        playersCareer.value.push(Object.assign(player.value, { hitter: data }))
      }
    })
    .catch((err) => {
      console.log(err)
    })

  loading.value = false
}

const emptyImage =
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

interface SummaryMethod<T> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummary = computed(() => {
  return (item: SummaryMethod<Player>) => {
    const { columns, data } = item
    const sum: Player[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sum[index] = '總計' as unknown as Player
        return
      }

      const values = data.map((item) =>
        Number(item[column.property as keyof Player])
      )

      if (
        column.property === 'AVG' ||
        column.property === 'OBP' ||
        column.property === 'SLG' ||
        column.property === 'OPS'
      ) {
        if (values.length === 0) {
          sum[index] = 0 as unknown as Player
        } else {
          sum[index] = (
            values.reduce((a: number, b: number) => a + b) / values.length
          ).toFixed(3) as unknown as Player
        }
      } else {
        if (values.length === 0) {
          sum[index] = 0 as unknown as Player
        } else {
          sum[index] = values.reduce(
            (acc: number, cur: number) => acc + cur,
            0
          ) as unknown as Player
        }
      }
      return
    })
    return sum
  }
})

function rounding(row: Hitter, column: TableColumnCtx<Hitter>, value: number) {
  if (!row) {
    console.log(row, column, value)
  }
  return value.toFixed(3)
}
</script>
