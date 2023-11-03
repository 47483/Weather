<script setup>
import { onMounted, ref } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'
import weatherCodes from '../assets/weatherCodes.js'
import LocationMap from '../components/LocationMap.vue'

const weatherData = ref([])

const weekday = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
const coordinates = {
  lat: 60.1786,
  long: 19.9024
}
let weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`

function Weather(code) {
  let weather = weatherCodes.find((item) => item.code == code)
  if (weather) {
    return weather.text
  }

  return 'Okänt väder'
}

function FetchAPI() {
  console.log(`Fetching ${weatherAPI}`)
  fetch(weatherAPI)
    .then((response) => {
      if (response.status == 200) {
        return response.json()
      }
    })

    .then((data) => {
      if (data.length === 0) {
        throw 'Ingen data returnerades'
      }

      weatherData.value = []

      for (let day in data.daily.time) {
        let date = new Date(data.daily.time[day])
        let weather = {
          date: `${weekday[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}`,
          code: Weather(data.daily.weathercode[day]),
          tempmax: data.daily.temperature_2m_max[day],
          tempmin: data.daily.temperature_2m_min[day],
          winddeg: data.daily.winddirection_10m_dominant[day],
          windspeed: data.daily.windspeed_10m_max[day],
          precipitation: data.daily.precipitation_sum[day]
        }
        weatherData.value.push(weather)
      }
    })
}

function UpdateLat() {
  let value = document.getElementById('lat').value
  let prevLat = coordinates.lat

  if (value != '') {
    coordinates.lat = parseFloat(value)
  } else {
    coordinates.lat = 60.1786
  }

  if (prevLat != coordinates.lat) {
    weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`
    FetchAPI()
  }
}

function UpdateLong() {
  let value = document.getElementById('long').value
  let prevLong = coordinates.long

  if (value != '') {
    coordinates.long = parseFloat(value)
  } else {
    coordinates.long = 19.9024
  }

  if (prevLong != coordinates.long) {
    weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`
    FetchAPI()
  }
}

onMounted(function () {
  FetchAPI()
})
</script>

<template>
  <div class="center">
    Latitud: <input class="coordField" type="number" id="lat" v-on:blur="UpdateLat()" /> Longitud:
    <input class="coordField" type="number" id="long" v-on:blur="UpdateLong()" />
  </div>
  <LocationMap />
  <div id="cardContainer">
    <WeatherCard v-for="day in weatherData" :key="day" :weather-data="day" />
  </div>
</template>

<style scoped>
#cardContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.coordField {
  border: 1px solid black;
}
</style>