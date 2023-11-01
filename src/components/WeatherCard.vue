<script setup>
    const props = defineProps(['weatherData']);
    const windPointerRotation = `rotate(${props.weatherData.winddeg}deg)`
</script>

<template>
    <div id="card">
        <h2>{{props.weatherData.date}}</h2>
        <p id="weatherType">{{props.weatherData.code}}</p>
        <p>{{props.weatherData.tempmin}} °C till {{props.weatherData.tempmax}} °C</p>
        <p>Nederbörd: {{props.weatherData.precipitation}} mm</p>
        <div class="flexElem" id="wind">
            <div id="windText">Vind: {{props.weatherData.windspeed}} m/s</div>
            <svg :style="{transform: windPointerRotation}" id="windPointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" stroke-width="0" fill="currentColor"></path>
            </svg>
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
        margin-bottom: 0.5em;
    }

    #wind {
        margin-top: 0.5em;
    }

    #windText {
        height: fit-content;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 0.5em;
    }

    #windPointer {
        height: 1.5em;
    }
</style>