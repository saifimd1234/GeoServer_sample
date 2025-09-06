// Sidebar interaction
const sidebar = document.getElementById("sidebar");
const menuTitle = document.getElementById("menu-title");
const menuBody = document.getElementById("menu-body");

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("expanded"); // expand when clicked
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

// Collapse when clicking map
map.on("click", () => {
  sidebar.classList.remove("expanded");
});
