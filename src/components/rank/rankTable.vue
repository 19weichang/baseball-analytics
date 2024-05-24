<template>
  <el-table
    v-loading="rankLoading || loading"
    class="rankTable"
    :data="props.filterData"
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
          @click="emits('handlePlayer', row)"
        >
          {{ row.name }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column :prop="props.rank" :label="rankName()" />
  </el-table>
</template>

<script lang="ts" setup>
import { Player } from '@/api/players/types'
import { defineProps } from 'vue'

const props = defineProps<{
  rank: string
  loading: boolean
  filterData: {
    name: string
    number: number
    image: string
    hit?: number
    rbi?: number
    hr?: number
  }[]
  rankLoading: boolean
}>()

const emits = defineEmits<{
  (n: 'handlePlayer', s: Player): void
}>()

function numberOne({ rowIndex }: { rowIndex: number }) {
  if (rowIndex === 0) {
    return {
      background: '#f0f9eb',
      color: '#67c23a',
      fontWeight: 'bold'
    }
  }
}

function rankName() {
  switch (props.rank) {
    case 'hit':
      return '安打'
    case 'rbi':
      return '打點'
    case 'hr':
      return '全壘打'
  }
}
</script>

<style lang="scss" scoped>
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
</style>
