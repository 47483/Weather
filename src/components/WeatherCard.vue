<script setup>
    const props = defineProps(['weatherData']);
</script>

<template>
    <div id="card">
        <h2>{{props.weatherData.date}}</h2>
        <p>{{props.weatherData.code}}</p>
        <p>{{props.weatherData.tempmin}} °C till {{props.weatherData.tempmax}} °C</p>
        <p>Nederbörd: {{props.weatherData.precipitation}} mm</p>
        <p>Vind: {{props.weatherData.windspeed}} m/s - {{props.weatherData.winddir}}</p>
    </div>
</template>

<style scoped>
    #card {
        width: 10em;
        background-color: lightblue;
        flex-grow: 1;
        margin: 0.5em;
        padding: 1em;
        border-radius: 0.5em;
        border-bottom: 0.25em solid lightsteelblue;
        border-right: 0.25em solid lightsteelblue;
    }
</style>