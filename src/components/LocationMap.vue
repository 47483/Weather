<script setup>
const props = defineProps(['lat', 'long'])
</script>

<template>
  <div id="mapWrapper">
    <iframe
      id="map"
      src="https://www.google.com/maps/embed/v1/place?q=5,5"
      allowfullscreen=""
    ></iframe>
  </div>
</template>

<style scoped>
#mapWrapper {
  position: relative;
  height: 16em;
  padding: 0.5em;
}

#map {
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
}
</style>
