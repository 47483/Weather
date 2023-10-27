<script setup>
    import {onMounted, ref} from 'vue';
    import WeatherCard from '../components/WeatherCard.vue';

    const weatherAPI = ref('https://api.open-meteo.com/v1/forecast?latitude=60.1786&longitude=19.9024&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto');
    const weatherData = ref([]);

    onMounted(function() {
        fetch(weatherAPI.value)

        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
        })

        .then(data => {
            console.log(data);
            if (data.length === 0) {
                throw "Ingen data returnerades";
            }

            for (let day in data.daily.time) {
                let weather = {
                    'date':data.daily.time[day],
                    'code':data.daily.weathercode[day],
                    'tempmax':data.daily.temperature_2m_max[day],
                    'tempmin':data.daily.temperature_2m_min[day],
                    'winddir':data.daily.winddirection_10m_dominant[day],
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
        <WeatherCard v-for="day in weatherData" :key="day"/>
    </div>
</template>

<style scoped>
    #cardContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>