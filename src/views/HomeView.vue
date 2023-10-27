<script setup>
    import {onMounted, ref} from 'vue';
    import WeatherCard from '../components/WeatherCard.vue';

    const weatherAPI = ref('https://api.open-meteo.com/v1/forecast?latitude=60.1786&longitude=19.9024&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto');
    const weatherData = ref([]);

    function ToCompass(deg) {
        let segment = 360 / 16
        if (0-segment < deg && deg <= 0+segment) {
            return "Nordligt";
        } else if (45-segment < deg && deg <= 45+segment) {
            return "Nordöstligt";
        } else if (90-segment < deg && deg <= 90+segment) {
            return "Östligt";
        } else if (135-segment < deg && deg <= 135+segment) {
            return "Sydöstligt";
        } else if (180-segment < deg && deg <= 180+segment) {
            return "Sydligt";
        } else if (225-segment < deg && deg <= 225+segment) {
            return "Sydvästligt";
        } else if (270-segment < deg && deg <= 270+segment) {
            return "Västligt";
        } else if (235-segment < deg && deg <= 235+segment) {
            return "Nordvästligt";
        } else if (360-segment < deg && deg <= 360+segment) {
            return "Nordligt";
        } else {
            return "";
        }
    }

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
                    'code':data.daily.weathercode[day],
                    'tempmax':data.daily.temperature_2m_max[day],
                    'tempmin':data.daily.temperature_2m_min[day],
                    'winddir':ToCompass(data.daily.winddirection_10m_dominant[day]),
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
    </div>
</template>

<style scoped>
    #cardContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>