<script setup>
const props = defineProps(['weatherData'])
const windPointerRotation = `rotate(${props.weatherData.winddeg}deg)`
</script>

<template>
  <div id="card">
    <h2>{{ props.weatherData.date }}</h2>
    <h3 id="weatherType">{{ props.weatherData.code }}</h3>
    <div class="flexElem">
      <svg class="cardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
        <path d="M10 9l4 0" />
      </svg>
      <p class="cardText">{{ props.weatherData.tempmin }} °C till {{ props.weatherData.tempmax }} °C</p>
    </div>
    <div class="flexElem">
      <svg class="cardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 12a8 8 0 0 1 16 0z" />
        <path d="M12 12v6a2 2 0 0 0 4 0" />
      </svg>
      <p class="cardText">Nederbörd: {{ props.weatherData.precipitation }} mm</p>
    </div>
    <div class="flexElem">
      <svg :style="{ transform: windPointerRotation }" class="cardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M8 12l4 4" />
        <path d="M12 8v8" />
        <path d="M16 12l-4 4" />
      </svg>
      <div class="cardText">Vind: {{ props.weatherData.windspeed }} m/s</div>
    </div>
  </div>
</template>

<style scoped>
#card {
  width: 10em;
  background-color: #94d2a5;
  flex-grow: 1;
  margin: 0.5em;
  padding: 1em;
  border-radius: 0.5em;
  border-top: 0.25em solid #bbe2c6;
  border-right: 0.25em solid #bbe2c6;
}

#weatherType {
  text-align: left;
  font-weight: normal;
}

.cardText {
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0.5em;
}

.cardIcon {
  height: 1.5em;
}
</style>
