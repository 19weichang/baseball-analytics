<template>
  <div>
    <!-- <el-button @click="getExcel">click</el-button> -->
    <el-button el-button @click="getData">click</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getSheetData } from './utils/googleSheet'
function getData() {
  const id = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
  getSheetData(id, 'player')
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
