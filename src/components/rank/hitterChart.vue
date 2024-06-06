<template>
  <div id="hitterScatterChart">
    <ApexCharts
      type="scatter"
      height="350"
      :options="chartValue.chartOptions"
      :series="chartValue.series"
    ></ApexCharts>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ApexCharts from 'vue3-apexcharts'
import { defineProps, computed } from 'vue'
import { Hitter, PlayerCareer } from '../../api/players/types'

const props = defineProps<{
  playersLeagueCareer: PlayerCareer[]
  playerLength: number
}>()

const playersImg = ref<string[]>([])

const series = computed(() => {
  if (props.playersLeagueCareer.length === props.playerLength) {
    return props.playersLeagueCareer.map((player) => {
      const avg = getPlayerAVG(player.hitter)
      const pa = getPlayerPA(player.hitter)
      getPlayerImage(player)
      return {
        name: player.name,
        data: [[pa, avg]]
      }
    })
  } else {
    return []
  }
})

function getPlayerImage(player: PlayerCareer) {
  if (player.img) {
    playersImg.value.push(player.img)
  } else {
    playersImg.value.push(
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    )
  }
}

function getPlayerAVG(hitter: Hitter | undefined) {
  if (Array.isArray(hitter)) {
    const playerTotalAvg = hitter.reduce((acc, cur) => acc + cur.AVG, 0)
    const avg = (playerTotalAvg / hitter.length).toFixed(3)
    if (avg === 'NaN') {
      return (0).toFixed(3)
    } else {
      return avg
    }
  } else {
    return 0
  }
}

function getPlayerPA(hitter: Hitter | undefined) {
  if (Array.isArray(hitter)) {
    const playerTotalPA = hitter.reduce((acc, cur) => acc + cur.PA, 0)
    return playerTotalPA
  } else {
    return 0
  }
}

const chartValue = ref({
  series: series,
  chartOptions: {
    chart: {
      height: 350,
      type: 'scatter',
      animations: {
        enabled: false
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['black'],
    xaxis: {
      tickAmount: 10,
      min: 0.0
    },
    yaxis: {
      tickAmount: 7
    },
    markers: {
      colors: ['green'],
      size: 15,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 1,
          fillColor: '#111',
          strokeColor: '#eee',
          size: 8
        }
      ]
    },
    fill: {
      type: 'image',
      opacity: 1,
      image: {
        src: playersImg.value,
        width: 30,
        height: 30
      }
    },
    legend: {
      labels: {
        useSeriesColors: true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#hitterScatterChart {
  background-color: lightgrey;
  border-radius: 20px;
  border: 1px solid white;
  margin: 10px 0px;

  .tspan {
    color: white !important;
  }
}
</style>
