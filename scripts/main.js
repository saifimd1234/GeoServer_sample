// ================================
// 🔹 GeoServer Variables
// ================================
const geoserverUrl = "http://localhost:8080/geoserver";  // Base GeoServer URL
const workspace = "Files";                               // Your workspace
const layerKadma = "Kadma_2022";                         // Main layer

// ================================
// 🔹 Basemaps
// ================================
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

// ================================
// 🔹 Map Init
// ================================
const map = L.map('map', {
  center: [20.5937, 78.9629],
  zoom: 5,
  layers: [osm]
});

// ================================
// 🔹 GeoServer Overlay (Kadma 2022)
// ================================
const kadmaOverlay = L.tileLayer.wms(`${geoserverUrl}/${workspace}/wms`, {
  layers: `${workspace}:${layerKadma}`,
  format: "image/png",
  transparent: true
});

// ================================
// 🔹 Layer Controls
// ================================
const baseMaps = {
  "OpenStreetMap": osm,
  "Esri Satellite": esriSat,
  "Carto Light": cartoLight,
  "Stamen Toner Lite": stamenTonerLite
};

const overlayMaps = {
  "Kadma 2022": kadmaOverlay
};

L.control.layers(baseMaps, overlayMaps, { position: 'bottomright' }).addTo(map);

// ================================
// 🔹 FlyTo Function
// ================================
function flyToKadma() {
  // bbox from your WMS request: EPSG:32645
  const bounds = L.latLngBounds([
    [22.685, 85.820],  // approx SW corner (converted)
    [22.765, 86.010]   // approx NE corner
  ]);
  map.flyToBounds(bounds, { duration: 2 });
  kadmaOverlay.addTo(map); // ensure layer is added
}

// ================================
// 🔹 Sidebar Interaction
// ================================
const sidebar = document.getElementById("sidebar");
const menuTitle = document.getElementById("menu-title");
const menuBody = document.getElementById("menu-body");

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    const section = btn.getAttribute("data-section");

    if (section === "basemaps") {
      menuTitle.textContent = "Basemaps";
      menuBody.innerHTML = "<p>Switch between different basemaps using the control on the map.</p>";
    } else if (section === "daily") {
      menuTitle.textContent = "Daily Results";
      menuBody.innerHTML = "<p>Here you can display daily updated satellite results.</p>";
    } else if (section === "layers") {
      menuTitle.textContent = "Layers";
      menuBody.innerHTML = `
        <p>Manage custom overlays:</p>
        <button class="btn btn-sm btn-primary mt-2" onclick="flyToKadma()">Zoom to Kadma 2022</button>
      `;
    } else if (section === "settings") {
      menuTitle.textContent = "Settings";
      menuBody.innerHTML = "<p>Adjust your map preferences here.</p>";
    }
  });
});

// Collapse sidebar when clicking outside
map.on("click", () => {
  sidebar.classList.add("collapsed");
});
