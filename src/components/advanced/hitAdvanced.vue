<template>
  <div id="chart">
    <ApexCharts
      id="id"
      type="line"
      height="350"
      :options="hit.chartOptions"
      :series="hit.series"
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
    hit.value.series[0].data = props.games.map((game) => game.AVG).slice(-5)
    hit.value.series[1].data = props.games.map((game) => game.OBP).slice(-5)
    hit.value.series[2].data = props.games.map((game) => game.SLG).slice(-5)
    hit.value.series[3].data = props.games.map((game) => game.OPS).slice(-5)
  }
)

watch(
  () => props.gameLength,
  () => {
    if (props.gameLength === '5') {
      hit.value.series[0].data = props.games.map((game) => game.AVG).slice(-5)
      hit.value.series[1].data = props.games.map((game) => game.OBP).slice(-5)
      hit.value.series[2].data = props.games.map((game) => game.SLG).slice(-5)
      hit.value.series[3].data = props.games.map((game) => game.OPS).slice(-5)
    } else if (props.gameLength === '10') {
      hit.value.series[0].data = props.games.map((game) => game.AVG).slice(-10)
      hit.value.series[1].data = props.games.map((game) => game.OBP).slice(-10)
      hit.value.series[2].data = props.games.map((game) => game.SLG).slice(-10)
      hit.value.series[3].data = props.games.map((game) => game.OPS).slice(-10)
    } else {
      hit.value.series[0].data = props.games.map((game) => game.AVG)
      hit.value.series[1].data = props.games.map((game) => game.OBP)
      hit.value.series[2].data = props.games.map((game) => game.SLG)
      hit.value.series[3].data = props.games.map((game) => game.OPS)
    }
  }
)

interface Opts {
  w: {
    globals: {
      series: number[][]
    }
  }
  seriesIndex: number
  dataPointIndex: number
}

const hit = ref({
  series: [
    {
      name: 'AVG',
      data: [0]
    },
    {
      name: '上壘率',
      data: [0]
    },
    {
      name: '長打率',
      data: [0]
    },
    {
      name: 'OPS',
      data: [0]
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5, 3],
      curve: 'straight',
      dashArray: [0, 8, 5, 0]
    },
    title: {
      text: '',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val: string, opts: Opts) {
        return (
          val +
          ' - <strong>' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          '</strong>'
        )
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: []
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: string) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val: string) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val: string) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val: string) {
              return val
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1'
    },
    colors: ['#CE0000', '#0072e3', '#ff5809', '#9F35FF']
  }
})
</script>

<style scoped>
#chart {
  background-color: white;
}
</style>
