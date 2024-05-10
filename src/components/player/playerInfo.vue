<template>
  <el-dialog
    title="Omega"
    :modelValue="props.isVisible"
    :fullscreen="true"
    @close="() => $emit('close')"
  >
    <div v-loading="infoLoading">
      <el-card>
        <el-row v-show="!infoLoading">
          <el-col :span="6">
            <el-avatar
              v-if="props.player?.img"
              shape="square"
              :size="50"
              :src="props.player?.img"
            />
            <el-avatar v-else shape="square" :size="50" :src="emptyImage" />
          </el-col>
          <el-col :span="18">
            <el-descriptions
              :title="`${props.player?.name} #${props.player?.number}`"
            >
              <el-descriptions-item label="年齡">
                {{ props.player?.age ? props.player?.age : '--' }}
              </el-descriptions-item>
              <el-descriptions-item label="身高/體重">
                {{ props.player?.height ? props.player?.height : '-'
                }}{{ props.player?.weight ? `/${props.player?.weight}` : '/-' }}
              </el-descriptions-item>
              <el-descriptions-item label="守備位置">
                {{ props.player?.position ? props.player?.position : '--' }}
              </el-descriptions-item>
              <el-descriptions-item label="投打習慣">
                {{
                  props.player?.pitchingAndHiterHabits
                    ? props.player?.pitchingAndHiterHabits
                    : '--'
                }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <el-tabs type="border-card">
          <el-tab-pane label="生涯數據">
            <div v-if="playerCareer">
              <el-table
                :data="playerCareer"
                height="250"
                style="width: 100%"
                empty-text="暫無數據"
                show-summary
                :summary-method="getSummary"
              >
                <el-table-column fixed prop="season" label="球季" />
                <el-table-column prop="PA" label="打席數" />
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
                <el-table-column prop="AVG" label="AVG" />
                <el-table-column prop="OBP" label="上壘率" />
                <el-table-column prop="SLG" label="長打率" />
                <el-table-column prop="OPS" label="OPS" />
              </el-table>
            </div>
            <div v-else>暫無選手資料</div>
          </el-tab-pane>
          <el-tab-pane label="進階數據"> </el-tab-pane>
          <el-tab-pane label="對戰成績">
            <BattleGame :games="games" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { Player, PlayerCareer } from '../../api/players/types'
import BattleGame from '../battle/battleGame.vue'
import { Game } from '../../api/games/types'
import { TableColumnCtx } from 'element-plus'

const props = defineProps<{
  isVisible: boolean
  player: Player | undefined
  playerCareer: PlayerCareer[]
  infoLoading: boolean
  games: Game[]
}>()

const emptyImage =
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

interface SummaryMethod<T> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummary = computed(() => {
  return (item: SummaryMethod<PlayerCareer>) => {
    const { columns, data } = item
    const sum: PlayerCareer[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sum[index] = '總計' as unknown as PlayerCareer
        return
      }

      const values = data.map((item) =>
        Number(item[column.property as keyof PlayerCareer])
      )

      if (
        column.property === 'AVG' ||
        column.property === 'OBP' ||
        column.property === 'SLG' ||
        column.property === 'OPS'
      ) {
        if (values.length === 0) {
          sum[index] = 0 as unknown as PlayerCareer
        } else {
          sum[index] = (values.reduce((a: number, b: number) => a + b) /
            values.length) as unknown as PlayerCareer
        }
      } else {
        if (values.length === 0) {
          sum[index] = 0 as unknown as PlayerCareer
        } else {
          sum[index] = values.reduce(
            (acc: number, cur: number) => acc + cur,
            0
          ) as unknown as PlayerCareer
        }
      }
      return
    })
    return sum
  }
})
</script>
