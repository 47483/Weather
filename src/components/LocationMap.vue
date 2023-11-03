<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let locationMap;
let marker;

window.onload = function() {
    locationMap = L.map('map').setView([15,15], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(locationMap);
    UpdateMap();
    locationMap.on('click', MapMarker);

    document.body.onresize = function() {
      UpdateMap();
    }
}

function UpdateMap() {
  let mapRef = document.getElementById("map");
  let mapWrapRef = document.getElementById("mapWrapper");
  mapRef.style.width = mapWrapRef.clientWidth+"px";
  mapRef.style.height = mapWrapRef.clientHeight+"px";

  locationMap.invalidateSize();
}

function MapMarker(e) {
  if (marker) {
    locationMap.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(locationMap);
}
</script>

<template>
    <div id="mapWrapper"><div id="map"></div></div>
</template>

<style scoped>
#mapWrapper {
  margin: 0.5em;
  height: 15em;
  overflow: hidden;
}

#map {
  border-radius: 0.5em;
}
</style>
