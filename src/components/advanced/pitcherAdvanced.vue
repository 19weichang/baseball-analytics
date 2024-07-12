<template>
  <div id="chart">
    <ApexCharts
      type="bar"
      height="350"
      :options="pitcher.chartOptions"
      :series="pitcher.series"
    ></ApexCharts>
  </div>
</template>

<script lang="ts" setup>
import { Game } from '@/api/games/types'
import { defineProps, ref, watch } from 'vue'
import ApexCharts from 'vue3-apexcharts'

const props = defineProps<{
  games: Game[]
  gameLength: string
}>()

watch(
  () => props.games,
  () => {
    pitcher.value.series[0].data = props.games
      .map((game) => game.strike)
      .slice(-5)
    pitcher.value.series[1].data = props.games
      .map((game) => game.ball)
      .slice(-5)
  }
)

watch(
  () => props.gameLength,
  () => {
    if (props.gameLength === '5') {
      pitcher.value.series[1].data = props.games
        .map((game) => game.strike)
        .slice(-5)
      pitcher.value.series[2].data = props.games
        .map((game) => game.ball)
        .slice(-5)
    } else if (props.gameLength === '10') {
      pitcher.value.series[1].data = props.games
        .map((game) => game.strike)
        .slice(-10)
      pitcher.value.series[2].data = props.games
        .map((game) => game.ball)
        .slice(-10)
    } else {
      pitcher.value.series[1].data = props.games.map((game) => game.strike)
      pitcher.value.series[2].data = props.games.map((game) => game.ball)
    }
  }
)

const pitcher = ref({
  series: [
    {
      name: '好球',
      data: [0]
    },
    {
      name: '壞球',
      data: [0]
    }
  ],
  chartOptions: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: '好壞球數'
    },
    xaxis: {
      categories: [],
      labels: {
        formatter: function (val: number) {
          return val
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      }
    },
    colors: ['#CE0000', '#00A600'],
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + '球'
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }
})
</script>

<style scoped>
#chart {
  background-color: white;
}
</style>
