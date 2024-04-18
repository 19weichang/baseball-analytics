<template>
  <div>{{ playSheet }}</div>
  <div>{{ allSheet }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getSheetData } from './utils/googleSheet'

const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID
const playSheet = ref()
const allSheet = ref()

function fetchPlayerSheet() {
  getSheetData(sheetId, 'player')
    .then((data) => {
      playSheet.value = data
    })
    .catch((err) => {
      console.log(err)
    })
}

function fetchAllSheet() {
  getSheetData(sheetId, 'all')
    .then((data) => {
      allSheet.value = data
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchPlayerSheet()
fetchAllSheet()
</script>
