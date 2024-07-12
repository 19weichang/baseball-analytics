<template>
  <div id="pitcherPerformanceChart">
    <ApexCharts
      height="350"
      type="donut"
      :options="pitcherPerformanceChart.chartOptions"
      :series="pitcherPerformanceChart.series"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { Game } from '@/api/games/types'
import ApexCharts from 'vue3-apexcharts'

const props = defineProps<{
  games: Game[]
  gameLength: string
}>()

watch(
  () => props.games,
  () => {
    const K = props.games.map((game) => game.K)
    const BBPitcher = props.games.map((game) => game.BBPitcher)
    const hits = props.games.map((game) => game.hits)

    pitcherPerformanceChart.value.series = [
      BBPitcher.slice(-5).reduce((a, b) => a + b || 0),
      hits.slice(-5).reduce((a, b) => a + b || 0),
      K.slice(-5).reduce((a, b) => a + b || 0)
    ]
  }
)

watch(
  () => props.gameLength,
  () => {
    const K = props.games.map((game) => game.K)
    const BBPitcher = props.games.map((game) => game.BBPitcher)
    const hits = props.games.map((game) => game.hits)

    if (props.gameLength === '5') {
      pitcherPerformanceChart.value.series = [
        BBPitcher.slice(-5).reduce((a, b) => a + b || 0),
        hits.slice(-5).reduce((a, b) => a + b || 0),
        K.slice(-5).reduce((a, b) => a + b || 0)
      ]
    } else if (props.gameLength === '10') {
      pitcherPerformanceChart.value.series = [
        BBPitcher.slice(-10).reduce((a, b) => a + b || 0),
        hits.slice(-10).reduce((a, b) => a + b || 0),
        K.slice(-10).reduce((a, b) => a + b || 0)
      ]
    } else {
      pitcherPerformanceChart.value.series = [
        BBPitcher.reduce((a, b) => a + b || 0),
        hits.reduce((a, b) => a + b || 0),
        K.reduce((a, b) => a + b || 0)
      ]
    }
  }
)

const pitcherPerformanceChart = ref({
  series: [0],
  chartOptions: {
    labels: ['四壞', '被安打', '三振'],
    chart: {
      type: 'donut'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    colors: ['#00A600', '#0072e3', '#CE0000']
  }
})
</script>
<style scoped>
#pitcherPerformanceChart {
  background-color: white;
}
</style>
