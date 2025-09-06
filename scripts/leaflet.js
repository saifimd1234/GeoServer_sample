// GeoServer Variables
const geoserverUrl = "http://localhost:8080/geoserver";
const workspace = "Files";
const layerKadma = "Kadma_2022";

// Basemaps
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});
const esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles © Esri' }
);
const cartoLight = L.tileLayer(
  'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',
  { attribution: '© CARTO' }
);
const stamenTonerLite = L.tileLayer(
  'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png',
  { attribution: '© Stamen, OSM' }
);

// Map Init
const map = L.map('map', {
  center: [20.5937, 78.9629],
  zoom: 5,
  layers: [osm]
});

// GeoServer Overlay
const kadmaOverlay = L.tileLayer.wms(`${geoserverUrl}/${workspace}/wms`, {
  layers: `${workspace}:${layerKadma}`,
  format: "image/png",
  transparent: true
});

// Layer Controls
const baseMaps = {
  "OpenStreetMap": osm,
  "Esri Satellite": esriSat,
  "Carto Light": cartoLight,
  "Stamen Toner Lite": stamenTonerLite
};
const overlayMaps = { "Kadma 2022": kadmaOverlay };

L.control.layers(baseMaps, overlayMaps, { position: 'bottomright' }).addTo(map);

// FlyTo function
function flyToKadma() {
  const bounds = L.latLngBounds([
    [22.685, 85.820],
    [22.765, 86.010]
  ]);
  map.flyToBounds(bounds, { duration: 2 });
  kadmaOverlay.addTo(map);
}
