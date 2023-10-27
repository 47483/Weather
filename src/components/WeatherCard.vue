<script setup>
    
</script>

<template>
    <div id="card">
        <h3>dd.mm.yyyy</h3>
        <p>*VÄDERLÄGE</p>
        <p>*TEMPMIN °C - *TEMPMAX °C</p>
        <p>Nederbörd: *NEDERBÖRD mm</p>
        <p>Vind: *VIND m/s *VINDRIKTNING</p>
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
    }
</style>