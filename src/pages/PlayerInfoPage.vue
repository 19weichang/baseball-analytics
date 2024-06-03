<template>
  <div class="playerInfoPage">
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
              <el-table-column prop="GO" label="滾地球出局" />
              <el-table-column prop="AO" label="飛球出局" />
              <el-table-column prop="SF" label="高飛犧牲打" />
              <el-table-column prop="SH" label="犧牲觸擊" />
              <el-table-column prop="ERRCH" label="失誤上壘" />
              <el-table-column prop="HBP" label="觸身球" />
              <el-table-column prop="SB" label="盜壘" />
              <el-table-column prop="CS" label="盜壘失敗" />
              <el-table-column
                prop="SBP"
                label="盜壘成功率"
                :formatter="rounding"
              />
              <el-table-column prop="AVG" label="AVG" :formatter="rounding" />
              <el-table-column
                prop="OBP"
                label="上壘率"
                :formatter="rounding"
              />
              <el-table-column
                prop="SLG"
                label="長打率"
                :formatter="rounding"
              />
              <el-table-column prop="OPS" label="OPS" :formatter="rounding" />
              <el-table-column prop="E" label="守備失誤" />
            </el-table>
          </div>
          <div v-else>暫無選手資料</div>
        </el-tab-pane>
        <el-tab-pane label="對戰成績">
          <BattleGame :games="games" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card v-loading="loading">
      <el-tabs type="border-card">
        <el-tab-pane label="打擊數據">
          <div class="hitChart">
            <div class="hitChartTool">
              <div class="hitChartTitle">打擊指數</div>
              <el-select
                v-model="gameLength"
                placeholder="比賽場數"
                size="small"
                style="width: 80px"
              >
                <el-option
                  v-for="item in gameLengthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <HitAdvanced :games="games" :gameLength="gameLength" />
            </div>
          </div>
          <div class="hitChart">
            <div class="hitChartTool">
              <div class="hitChartTitle">打擊表現</div>
              <div>
                <el-select
                  v-model="gameLength"
                  placeholder="比賽場數"
                  size="small"
                  style="width: 80px"
                >
                  <el-option
                    v-for="item in gameLengthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div>
              <PerformanceChart :games="games" :gameLength="gameLength" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="投球數據">
          <el-empty description="暫時無資料..." />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Hitter, Player, PlayerCareer } from '@/api/players/types'
import BattleGame from '@/components/battle/battleGame.vue'
import HitAdvanced from '@/components/advanced/hitAdvanced.vue'
import PerformanceChart from '@/components/advanced/performanceChart.vue'
import { TableColumnCtx } from 'element-plus'
import { useRouteQuery } from '@vueuse/router'
import { getGame } from '@/api/games/index'
import { Game } from '@/api/games/types'
import { getPlayer, getPlayerHitter } from '@/api/players/index'

const playerName = useRouteQuery('name')
const playerNumber = useRouteQuery('number')
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

  await getPlayer(playerNumber)
    .then((playerInfo) => {
      player.value = playerInfo
    })
    .catch((err) => {
      console.log(err)
    })
  await getGame(sheetName)
    .then((gameSheet) => {
      games.value = gameSheet
    })
    .catch((err) => {
      console.log(err)
    })

  await getPlayerHitter(sheetName)
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
  return (item: SummaryMethod<Hitter>) => {
    const { columns, data } = item
    const sum: Hitter[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sum[index] = '總計' as unknown as Hitter
        return
      }

      const values = data.map((item) =>
        Number(item[column.property as keyof Hitter])
      )

      if (column.property === 'SBP') {
        const sb = data.map((item) => item.SB)
        const cs = data.map((item) => item.CS)
        const sbp =
          sb.reduce((a, b) => a + b) /
          (sb.reduce((a, b) => a + b) + cs.reduce((a, b) => a + b))
        sum[index] = sbp.toFixed(3) as unknown as Hitter
        return
      }

      if (
        column.property === 'AVG' ||
        column.property === 'OBP' ||
        column.property === 'SLG' ||
        column.property === 'OPS'
      ) {
        if (values.length === 0) {
          sum[index] = 0 as unknown as Hitter
        } else {
          sum[index] = (
            values.reduce((a: number, b: number) => a + b) / values.length
          ).toFixed(3) as unknown as Hitter
        }
      } else {
        if (values.length === 0) {
          sum[index] = 0 as unknown as Hitter
        } else {
          sum[index] = values.reduce(
            (acc: number, cur: number) => acc + cur,
            0
          ) as unknown as Hitter
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

const gameLength = ref('5')
const gameLengthOptions = [
  { value: '5', label: '近五場' },
  { value: '10', label: '近十場' },
  { value: 'all', label: '全部' }
]
</script>

<style scoped>
.playerInfoPage {
  height: 100%;
  background-image: url('/baseball-analytics/image/redBackground.jpg');
  background-size: cover;
  padding: 20px;
}

.hitChart {
  background-color: #b15560;
  padding: 20px;
}

.hitChartTool {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  background-color: #862633;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.hitChartTitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
}

.el-table {
  border-radius: 5px;
  border: 2px solid black;
  background-color: lightgrey;
}

.el-card {
  background-color: rgba(0, 0, 0, 0.3);
}

/* descriptions style */
.el-descriptions:deep .el-descriptions__body {
  background-color: rgba(0, 0, 0, 0);
}

.el-descriptions:deep .el-descriptions__title {
  color: white !important;
}

.el-descriptions:deep .el-descriptions__label:not(.is-bordered-label) {
  color: white !important;
}

.el-descriptions:deep .el-descriptions__content:not(.is-bordered-label) {
  color: white !important;
}

/* tabs style */
.el-tabs {
  background-color: #b15560;
}

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
  background-color: lightgrey !important;
  color: black !important;
  font-size: 1.1rem;
  font-weight: 500;
}

.el-table:deep th {
  border-bottom: 1px solid #862633 !important;
}
</style>
