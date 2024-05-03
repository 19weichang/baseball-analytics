<template>
  <div>
    <el-table
      :data="props.games"
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
import { defineProps } from 'vue'
import { Game } from '../../api/games/types'

const props = defineProps<{
  games: Game[]
}>()
</script>
