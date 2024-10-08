<template>
  <div id="performanceChart">
    <ApexCharts
      height="350"
      type="donut"
      :options="performance.chartOptions"
      :series="performance.series"
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
    const H = props.games.map(
      (game) => game.SingleB + game.DoubleB + game.TripleB + game.HR
    )
    const BB = props.games.map((game) => game.BB)
    const SO = props.games.map((game) => game.SO)
    const AO = props.games.map((game) => game.AO)
    const GO = props.games.map((game) => game.GO)
    const HBP = props.games.map((game) => game.HBP)
    const ERRCH = props.games.map((game) => game.ERRCH)

    performance.value.series = [
      H.slice(-5).reduce((a, b) => a + b || 0),
      BB.slice(-5).reduce((a, b) => a + b || 0),
      SO.slice(-5).reduce((a, b) => a + b || 0),
      AO.slice(-5).reduce((a, b) => a + b || 0),
      GO.slice(-5).reduce((a, b) => a + b || 0),
      HBP.slice(-5).reduce((a, b) => a + b || 0),
      ERRCH.slice(-5).reduce((a, b) => a + b || 0)
    ]
  }
)

watch(
  () => props.gameLength,
  () => {
    const H = props.games.map(
      (game) => game.SingleB + game.DoubleB + game.TripleB + game.HR
    )
    const BB = props.games.map((game) => game.BB)
    const SO = props.games.map((game) => game.SO)
    const AO = props.games.map((game) => game.AO)
    const GO = props.games.map((game) => game.GO)
    const HBP = props.games.map((game) => game.HBP)
    const ERRCH = props.games.map((game) => game.ERRCH)

    if (props.gameLength === '5') {
      performance.value.series = [
        H.slice(-5).reduce((a, b) => a + b || 0),
        BB.slice(-5).reduce((a, b) => a + b || 0),
        SO.slice(-5).reduce((a, b) => a + b || 0),
        AO.slice(-5).reduce((a, b) => a + b || 0),
        GO.slice(-5).reduce((a, b) => a + b || 0),
        HBP.slice(-5).reduce((a, b) => a + b || 0),
        ERRCH.slice(-5).reduce((a, b) => a + b || 0)
      ]
    } else if (props.gameLength === '10') {
      performance.value.series = [
        H.slice(-10).reduce((a, b) => a + b || 0),
        BB.slice(-10).reduce((a, b) => a + b || 0),
        SO.slice(-10).reduce((a, b) => a + b || 0),
        AO.slice(-10).reduce((a, b) => a + b || 0),
        GO.slice(-10).reduce((a, b) => a + b || 0),
        HBP.slice(-10).reduce((a, b) => a + b || 0),
        ERRCH.slice(-10).reduce((a, b) => a + b || 0)
      ]
    } else {
      performance.value.series = [
        H.reduce((a, b) => a + b || 0),
        BB.reduce((a, b) => a + b || 0),
        SO.reduce((a, b) => a + b || 0),
        AO.reduce((a, b) => a + b || 0),
        GO.reduce((a, b) => a + b || 0),
        HBP.reduce((a, b) => a + b || 0),
        ERRCH.reduce((a, b) => a + b || 0)
      ]
    }
  }
)

const performance = ref({
  series: [0],
  chartOptions: {
    labels: ['安打', '四壞', '三振', '滾地球', '飛球', '觸身球', '失誤上壘'],
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
    colors: [
      '#CE0000',
      '#0072e3',
      '#ff5809',
      '#9F35FF',
      '#FFD700',
      '#00A600',
      '#FF00FF'
    ]
  }
})
</script>

<style scoped>
#performanceChart {
  background-color: white;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
