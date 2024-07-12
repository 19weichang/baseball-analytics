<template>
  <el-table
    :data="props.pitcher"
    height="250"
    style="width: 100%"
    empty-text="暫無數據"
    show-summary
    :summary-method="getSummary"
  >
    <el-table-column fixed prop="season" label="球季" />
    <el-table-column prop="pitcherGameLength" label="出賽" />
    <el-table-column prop="W" label="勝場" />
    <el-table-column prop="L" label="敗場" />
    <el-table-column prop="S" label="救援" />
    <el-table-column prop="HLD" label="中繼" />
    <el-table-column prop="PC" label="球數" />
    <el-table-column prop="IP" label="投球局數" />
    <el-table-column prop="K" label="三振" />
    <el-table-column prop="strike" label="好球" />
    <el-table-column prop="ball" label="壞球" />
    <el-table-column prop="BBPitcher" label="四壞" />
    <el-table-column prop="hits" label="被安打" />
    <el-table-column prop="ER" label="自責分" />
    <el-table-column prop="RA" label="失分" />
    <el-table-column prop="PE" label="投手守備失誤" width="120" />
    <el-table-column prop="BS" label="救援失敗" />
    <el-table-column
      prop="K9"
      label="9局平均三振"
      width="120"
      :formatter="rounding"
    />
    <el-table-column
      prop="KBB"
      label="三振保送比"
      width="120"
      :formatter="rounding"
    />
    <el-table-column
      prop="PIP"
      label="每局投球數"
      width="120"
      :formatter="rounding"
    />
    <el-table-column
      prop="R9"
      label="9局平均失分"
      width="120"
      :formatter="rounding"
    />
    <el-table-column
      prop="BB9"
      label="9局平均保送"
      width="120"
      :formatter="rounding"
    />
    <el-table-column prop="OBA" label="被上壘率" :formatter="rounding" />
    <el-table-column
      prop="WHIP"
      label="每局被上壘率"
      width="120"
      :formatter="rounding"
    />
    <el-table-column prop="ERA" label="防禦率" :formatter="rounding" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { Pitcher } from '@/api/players/types'
import { TableColumnCtx } from 'element-plus'

const props = defineProps<{
  pitcher: Pitcher[] | Pitcher
}>()

interface SummaryMethod<T> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummary = computed(() => {
  return (item: SummaryMethod<Pitcher>) => {
    const { columns, data } = item
    const sum: Pitcher[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sum[index] = '總計' as unknown as Pitcher
        return
      }
      const values = data.map((item) =>
        Number(item[column.property as keyof Pitcher])
      )

      if (
        column.property === 'ERA' ||
        column.property === 'WHIP' ||
        column.property === 'OBA' ||
        column.property === 'BB9' ||
        column.property === 'R9' ||
        column.property === 'PIP' ||
        column.property === 'KBB' ||
        column.property === 'K9'
      ) {
        if (values.length === 0) {
          sum[index] = 0 as unknown as Pitcher
        } else {
          sum[index] = (
            values.reduce((a: number, b: number) => a + b) / values.length
          ).toFixed(3) as unknown as Pitcher
        }
        return
      }

      sum[index] = values.reduce(
        (acc: number, cur: number) => acc + cur,
        0
      ) as unknown as Pitcher
    })
    return sum
  }
})

function rounding(
  row: Pitcher,
  column: TableColumnCtx<Pitcher>,
  value: number
) {
  if (!row) {
    console.log(row, column, value)
  }
  if (value === 0) {
    return 0
  }
  return value.toFixed(3)
}
</script>
