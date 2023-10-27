<script setup>
    import {onMounted, ref} from 'vue';
    import WeatherCard from '../components/WeatherCard.vue';

    const weatherAPI = ref('https://api.open-meteo.com/v1/forecast?latitude=60.1786&longitude=19.9024&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto');
    const weatherData = ref([]);

    let WMOCodes = [
        "Molnfritt",
        "Avtagande Molnigt",
        "Stabilt",
        "Ökande Molnighet",
        "Försämrad Sikt, Rök",
        "Disigt",
        "Dammigt",
        "Dammiga Vindar",
        "Dammiga Virvelvindar",
        "Damm/Sandstorm",
        "Dimmigt",
        "Lätt Dimma",
        "Dimma",
        "Blixtoväder",
        "Ytterst Distant Regn",
        "Distant Regn",
        "Närliggande Regn",
        "Blixtstorm",
        "Näraliggande Stormar",
        "Orkaner",
        "Duggregn",
        "Regnigt",
        "Snöfall",
        "Hagel",
        "Kallt Regn",
        "Regnskurar",
        "Snö Blandat Regn",
        "Hagel Blandat Regn",
        "Snöyra",
        "Åskstorm",
        "Avtagande Damm/Sandstorm",
        "Damm/Sandstorm",
        "Ökande Damm/Sandstorm",
        "Avtagande Grov Damm/Sandstorm",
        "Grov Damm/Sandstorm",
        "Ökande Grov Damm/Sandstorm",
        "Lätt Snöyra",
        "Snöyra",
        "Grov Snöyra",
        "Kraftig Snöyra",
        "Distant Snödimma",
        "Snödimma",
        "Avtagande Snödimma",
        "Avtagande Tjock Snödimma",
        "Snödimma",
        "Tjock Snödimma",
        "Ökande Snödimma",
        "Ökande Tjock Snödimma",
        "Dimma Och Rimfrost",
        "Tjock Dimma Och Rimfrost",
        "Duggregnsskurar",
        "Duggregn",
        "Lätta Regnskurar",
        "Lätt Regn",
        "Regnskurar",
        "Regnigt",
        "Kallt Duggregn",
        "Kallt Regn",
        "Lätt Regnigt",
        "Regnigt",
        "Lätta Regnskurar",
        "Lätt Regn",
        "Regnskurar",
        "Regn",
        "Stora Regnskurar",
        "Mycket Regn",
        "Kallt Duggregn",
        "Kallt Regn",
        "Lätt Regn Och Snöfall",
        "Regn Och Snöfall",
        "Risk För Lätt Snöfall",
        "Lätt Snöfall",
        "Risk För Snöfall",
        "SnöFall",
        "Risk För Stort Snöfall",
        "Stort Snöfall",
        "Snödimma",
        "Grov Snödimma",
        "Grövre Snödimma",
        "Iskornslandskap",
        "Lätta Regnduschar",
        "Regndushar",
        "Skyfall",
        "Lätta Regn Och Snöduschar",
        "Regn Och Snöduschar",
        "Lätt Snö Och Regnoväder",
        "Snö Och Regnoväder",
        "Lätt Snöoväder",
        "Snöoväder",
        "Lätt Snöhagel",
        "Snöhagel",
        "Lätt Regnoväder",
        "Regnoväder",
        "Lätt Regn Och Snöoväder",
        "Regn Och Snöoväder",
        "Mindre Åskoväder",
        "Mindre Åskoväder Med Hagel",
        "Åskoväder",
        "Åskoväder Med Damm/Sandstorm",
        "Åskoväder Med Hagel"
    ]

    onMounted(function() {
        fetch(weatherAPI.value)

        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
        })

        .then(data => {
            if (data.length === 0) {
                throw "Ingen data returnerades";
            }

            for (let day in data.daily.time) {
                let weather = {
                    'date':data.daily.time[day],
                    'code':WMOCodes[data.daily.weathercode[day]],
                    'tempmax':data.daily.temperature_2m_max[day],
                    'tempmin':data.daily.temperature_2m_min[day],
                    'winddeg':data.daily.winddirection_10m_dominant[day],
                    'windspeed':data.daily.windspeed_10m_max[day],
                    'precipitation':data.daily.precipitation_sum[day]
                }
                weatherData.value.push(weather);
            }
        })
    })
</script>

<template>
    <div id="cardContainer">
        <WeatherCard v-for="day in weatherData" :key="day" :weather-data="day"/>
        <WeatherCard v-for="day in weatherData" :key="day" :weather-data="day"/>
        <WeatherCard v-for="day in weatherData" :key="day" :weather-data="day"/>
    </div>
</template>

<style scoped>
    #cardContainer {
        margin-top: 1em;
        border-top: 0.125em solid black;
        border-bottom: 0.125em solid black;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        overflow-y: auto;
        height: 75vh;
    }
</style>