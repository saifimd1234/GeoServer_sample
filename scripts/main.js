// ======================
// GeoServer & Map Setup
// ======================

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

// Overlays
const kadmaOverlay = L.tileLayer.wms(`${geoserverUrl}/${workspace}/wms`, {
  layers: `${workspace}:${layerKadma}`,
  format: "image/png",
  transparent: true
});

// Map Init
const map = L.map('map', {
  center: [20.5937, 78.9629],
  zoom: 5,
  layers: [osm] // default base
});

// ======================
// Sidebar Setup
// ======================

const sidebar = document.getElementById("sidebar");
const menuTitle = document.getElementById("menu-title");
const menuBody = document.getElementById("menu-body");
const mapDiv = document.getElementById("map");

// Basemaps and overlays
const basemaps = { "OpenStreetMap": osm, "Esri Satellite": esriSat, "Carto Light": cartoLight, "Stamen Toner Lite": stamenTonerLite };
const overlays = { "Kadma 2022": kadmaOverlay };

// Keep track of current base
let currentBase = osm;

// ======================
// Functions
// ======================

// Switch basemap
function switchBaseMap(name) {
  map.removeLayer(currentBase);
  currentBase = basemaps[name];
  map.addLayer(currentBase);
}

// Toggle overlay
function toggleOverlay(name) {
  const layer = overlays[name];
  if (map.hasLayer(layer)) map.removeLayer(layer);
  else map.addLayer(layer);
}

// Fly to Kadma
function flyToKadma() {
  const bounds = L.latLngBounds([
    [22.685, 85.820],
    [22.765, 86.010]
  ]);
  map.flyToBounds(bounds, { duration: 2 });
  kadmaOverlay.addTo(map);
}

// ======================
// Sidebar Interaction
// ======================

// Function to switch basemap
function switchBaseMap(name, btn) {
  map.removeLayer(currentBase);
  currentBase = basemaps[name];
  map.addLayer(currentBase);

  // Highlight selected button
  document.querySelectorAll('#menu-body button').forEach(b => {
    b.classList.remove('btn-primary');
    b.classList.add('btn-outline-primary');
  });
  btn.classList.remove('btn-outline-primary');
  btn.classList.add('btn-primary');
}

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.getAttribute("data-section");

    // Toggle sidebar
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      sidebar.classList.add("expanded");
    } else if (sidebar.classList.contains("expanded") && menuTitle.dataset.section === section) {
      sidebar.classList.remove("expanded");
      sidebar.classList.add("collapsed");
      return;
    }

    menuTitle.dataset.section = section;

    // Update sidebar content
    menuBody.innerHTML = ""; // Clear previous content

    if (section === "basemaps") {
      menuTitle.textContent = "Basemaps";
      const p = document.createElement("p");
      p.textContent = "Select a basemap:";
      menuBody.appendChild(p);

      Object.keys(basemaps).forEach(name => {
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-outline-primary m-1";
        btn.textContent = name;
        btn.onclick = () => switchBaseMap(name);
        menuBody.appendChild(btn);
      });

    } else if (section === "daily") {
      menuTitle.textContent = "Daily";
      menuBody.innerHTML = "<p>Here you can display daily updated satellite results.</p>";

    } else if (section === "layers") {
      menuTitle.textContent = "Layers";
      const p = document.createElement("p");
      p.textContent = "Toggle overlays:";
      menuBody.appendChild(p);

      Object.keys(overlays).forEach(name => {
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-outline-success m-1";
        btn.textContent = name;
        btn.onclick = () => toggleOverlay(name);
        menuBody.appendChild(btn);
      });

      // Fly button
      const flyBtn = document.createElement("button");
      flyBtn.className = "btn btn-sm btn-primary mt-2";
      flyBtn.textContent = "Zoom to Kadma 2022";
      flyBtn.onclick = flyToKadma;
      menuBody.appendChild(flyBtn);

    } else if (section === "settings") {
      menuTitle.textContent = "Settings";
      menuBody.innerHTML = "<p>Adjust your map preferences here.</p>";
    }

    setTimeout(() => map.invalidateSize(), 300);
  });
});

// Collapse sidebar when clicking on map
mapDiv.addEventListener("click", () => {
  if (sidebar.classList.contains("expanded")) {
    sidebar.classList.remove("expanded");
    sidebar.classList.add("collapsed");
  }
});
