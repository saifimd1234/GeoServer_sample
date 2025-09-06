// Sidebar interaction
const sidebar = document.getElementById("sidebar");
const menuTitle = document.getElementById("menu-title");
const menuBody = document.getElementById("menu-body");
const mapDiv = document.getElementById("map");

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.getAttribute("data-section");

    // Toggle sidebar: expand if collapsed, collapse if already expanded & same section
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      sidebar.classList.add("expanded");
    } else if (sidebar.classList.contains("expanded") && menuTitle.dataset.section === section) {
      sidebar.classList.remove("expanded");
      sidebar.classList.add("collapsed");
      return; // stop updating content
    }

    // Store current section in menuTitle for toggle logic
    menuTitle.dataset.section = section;

    // Update content dynamically
    if (section === "basemaps") {
      menuTitle.textContent = "Basemaps";
      menuBody.innerHTML = "<p>Switch between different basemaps using the control on the map.</p>";
    } else if (section === "daily") {
      menuTitle.textContent = "Daily";
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

    // Refresh Leaflet map after sidebar animation
    setTimeout(() => map.invalidateSize(), 300);
  });
});

mapDiv.addEventListener("click", () => {
  if (sidebar.classList.contains("expanded")) {
    sidebar.classList.remove("expanded");
    sidebar.classList.add("collapsed");
  }
});