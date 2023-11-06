<script setup>
//Importing necessary elements and components
import { onMounted, ref } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'
import weatherCodes from '../assets/weatherCodes.js'
import LocationMap from '../components/LocationMap.vue'
import MotivationalQuote from '../components/MotivationalQuote.vue';

//Specifying constants used for on-page elements
const weatherData = ref([])
const quote = ref('"När Kjell ger väder lyssnar man" - Kjell Hansen');

//Specifying constrants for backend usage
const weekday = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
const coordinates = {
  lat: 60.1786,
  long: 19.9024
}

//Specifying the paths to the different API:s
let weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`;
let locationAPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.lat}&lon=${coordinates.long}&apiKey=84a7743e967f4a4aad190a95d33d5a0a`;

//A function for getting a related text from the specified weather-code.
function Weather(code) {
  let weather = weatherCodes.find((item) => item.code == code);
  if (weather) {
    return weather.text;
  }

  return 'Okänt väder';
}

//A function that will fetch to the specified API, and call the correct follow-up function
function FetchAPI(api, method) {
  fetch(api)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })

    .then((data) => {
      if (data.length === 0) {
        throw 'Ingen data returnerades';
      }

      if (method == 'weather') {
        WeatherResponse(data);

      } else if (method == 'location') {
        LocationResponse(data);
      }
    })
}

//A function for converting the raw API response into usable weathercard data
function WeatherResponse(data) {
  weatherData.value = [];

  for (let day in data.daily.time) {
    let date = new Date(data.daily.time[day])
    let weather = {
      date: `${weekday[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}`,
      weather: Weather(data.daily.weathercode[day]),
      code: data.daily.weathercode[day],
      tempmax: data.daily.temperature_2m_max[day],
      tempmin: data.daily.temperature_2m_min[day],
      winddeg: data.daily.winddirection_10m_dominant[day],
      windspeed: data.daily.windspeed_10m_max[day],
      precipitation: data.daily.precipitation_sum[day]
    }
    weatherData.value.push(weather);
  }
}

//A function for turning raw location names into a dynamic 'quote'
function LocationResponse(data) {
  let dataLocation = data.features[0].properties.city;
  if (!dataLocation) {
    dataLocation = "någon";
  }
  quote.value = `"När Kjell ger väder lyssnar ${dataLocation}" - Kjell Hansen`;
}

//A function for updating the location to check for weather, and thus checking new weather
function UpdateLocation(e) {
  if (coordinates.lat != e.lat || coordinates.long != e.lng) {
    coordinates.lat = e.lat;
    coordinates.long = e.lng;
    weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`;
    FetchAPI(weatherAPI,'weather');
    locationAPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.lat}&lon=${coordinates.long}&apiKey=84a7743e967f4a4aad190a95d33d5a0a`;
    FetchAPI(locationAPI,'location');
  }
}

//A function that will call automatically on initial page load.
onMounted(function () {
  FetchAPI(weatherAPI,'weather');
  FetchAPI(locationAPI,'location');
})
</script>

<template>
  <MotivationalQuote :quote="quote" />
  <LocationMap @update-location="UpdateLocation" />
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