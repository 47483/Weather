<script setup>
//Necessary leaflet imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

//Defining emits for updating the location
const emit = defineEmits(["update-location"]);
//Defining map and markers
let locationMap;
let marker;

//Create a dynamic and interactable map using element 'map' on load
window.onload = function() {
    locationMap = L.map('map').setView([60.1786,19.9024], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(locationMap);

    UpdateMap();
    marker = L.marker({'lat':60.1786,'lng':19.9024}).addTo(locationMap);
    locationMap.on('click', MapMarker);

    document.body.onresize = function() {
      UpdateMap();
    }
}

//A function for updating the map size
function UpdateMap() {
  let mapRef = document.getElementById("map");
  let mapWrapRef = document.getElementById("mapWrapper");
  mapRef.style.width = mapWrapRef.clientWidth+"px";
  mapRef.style.height = mapWrapRef.clientHeight+"px";

  locationMap.invalidateSize();
}

//A function for changing the map marker, and emitting update
function MapMarker(e) {
  if (marker) {
    locationMap.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(locationMap);
  emit("update-location",e.latlng);
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
