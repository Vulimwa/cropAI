// geotagging.js
// Handles map, FABs, sidebar, and geotagging logic for geotagging.html
// All backend integration points are clearly commented for backend team

// --- Navbar toggle logic ---
function setupNavbar() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const sidebarNav = document.getElementById('sidebar-nav');
  const overlay = document.getElementById('nav-overlay');
  const closeSidebar = document.getElementById('close-sidebar');

  if (navbarToggle && sidebarNav && overlay) {
    navbarToggle.addEventListener('click', () => {
      sidebarNav.classList.toggle('open');
      overlay.classList.toggle('show');
    });
    overlay.addEventListener('click', () => {
      sidebarNav.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
  if (closeSidebar && sidebarNav && overlay) {
    closeSidebar.addEventListener('click', () => {
      sidebarNav.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// --- Dark/Light mode toggle ---
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // Optionally persist theme in localStorage
    });
  }
}

// --- Maplibre map initialization ---
// Placeholder: Replace with backend-provided user region/coordinates
const defaultCoords = [36.8219, -1.2921]; // Nairobi, Kenya
const defaultZoom = 7;

// Basemap styles
const basemaps = [
  { name: 'Street', url: 'https://api.maptiler.com/maps/streets/style.json?key=nejBaczk5JFmHmXR9bjG' },
  { name: 'Satellite', url: 'https://api.maptiler.com/maps/hybrid/style.json?key=nejBaczk5JFmHmXR9bjG' },
  { name: 'Terrain', url: 'https://api.maptiler.com/maps/terrain/style.json?key=nejBaczk5JFmHmXR9bjG' },
  { name: 'Dark', url: 'https://api.maptiler.com/maps/darkmatter/style.json?key=nejBaczk5JFmHmXR9bjG' },
  { name: 'Light', url: 'https://api.maptiler.com/maps/positron/style.json?key=nejBaczk5JFmHmXR9bjG' },
  { name: 'Custom', url: 'https://api.maptiler.com/tiles/v3/style.json?key=nejBaczk5JFmHmXR9bjG' },
];

let map;
let currentBasemap = basemaps[0].url;

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: currentBasemap,
    center: defaultCoords,
    zoom: defaultZoom,
  });
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  setupBasemapSwitcher();
}

// --- Basemap Switcher ---
function setupBasemapSwitcher() {
  const switcher = document.getElementById('basemap-switcher');
  if (!switcher) return;
  switcher.innerHTML = '';
  basemaps.forEach((bm, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-secondary';
    btn.textContent = bm.name;
    btn.style.marginBottom = '4px';
    btn.onclick = () => {
      map.setStyle(bm.url);
      currentBasemap = bm.url;
    };
    switcher.appendChild(btn);
  });
}

// --- FABs logic ---
function setupFABs() {
  document.getElementById('fab-add').innerHTML = '+';
  document.getElementById('fab-locate').innerHTML = '📍';
  document.getElementById('fab-filters').innerHTML = '☰';
  // Add event listeners for FABs
  document.getElementById('fab-add').onclick = () => openAddOutbreakModal();
  document.getElementById('fab-locate').onclick = () => locateFarm();
  document.getElementById('fab-filters').onclick = () => toggleSidePanel();
}

// --- Side Panel Interactivity ---
function toggleSidePanel() {
  const panel = document.getElementById('side-panel');
  panel.classList.toggle('open');
}

// --- Outbreaks List (Sidebar) ---
function renderOutbreaksList(outbreaks) {
  const list = document.getElementById('outbreaks-list');
  list.innerHTML = '';
  if (!outbreaks.length) {
    list.innerHTML = '<div style="color:#888;">No outbreaks found.</div>';
    return;
  }
  outbreaks.forEach(ob => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '1rem';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><b>${ob.location || ob.coords}</b></div>
        <span class="severity-badge severity-${ob.severity}">${ob.severity}</span>
      </div>
      <div style="margin-top:0.5rem;">${ob.diseaseType}</div>
      <div style="font-size:0.95em;color:#888;">${ob.date}</div>
      <div style="margin-top:0.5rem;">${ob.notes || ''}</div>
      <button class="btn-secondary" style="margin-top:0.7rem;" onclick="openOutbreakDetails('${ob.id}')">More</button>
    `;
    list.appendChild(card);
  });
}

// --- Placeholder: Outbreak Data (to be replaced by backend) ---
const sampleOutbreaks = [
  { id: '1', location: 'Field A', coords: '36.8,-1.29', diseaseType: 'Maize Rust', severity: 'high', date: '2025-08-25', notes: 'Spotted near river.' },
  { id: '2', location: 'Field B', coords: '36.9,-1.30', diseaseType: 'Blight', severity: 'medium', date: '2025-08-26', notes: 'Early signs.' },
];

// --- Severity Badge Colors ---
const style = document.createElement('style');
style.innerHTML = `
  .severity-high { background: #FF6B6B; color: #fff; padding: 2px 10px; border-radius: 12px; }
  .severity-medium { background: #FFD93D; color: #333; padding: 2px 10px; border-radius: 12px; }
  .severity-low { background: #8BAA61; color: #fff; padding: 2px 10px; border-radius: 12px; }
`;
document.head.appendChild(style);

// --- FAB Actions (UI + Backend placeholders) ---
function openAddOutbreakModal() {
  // Show a modal for adding outbreak (UI only, backend will handle save)
  // Backend: Save new outbreak to database/API
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="modal-bg" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:2000;display:flex;align-items:center;justify-content:center;">
      <div class="card p-6" style="max-width:400px;width:100%;position:relative;">
        <button onclick="document.getElementById('modal-container').innerHTML=''" style="position:absolute;top:1rem;right:1rem;font-size:1.3rem;background:none;border:none;">&times;</button>
        <h3 class="font-bold mb-3">Add New Outbreak</h3>
        <form id="addOutbreakForm">
          <label>Disease Type</label>
          <input type="text" class="w-full mb-2" required placeholder="e.g. Maize Rust" />
          <label>Severity</label>
          <select class="w-full mb-2">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label>Notes</label>
          <textarea class="w-full mb-2" placeholder="Short note..."></textarea>
          <button type="submit" class="btn-primary w-full mt-2">Save Outbreak</button>
        </form>
        <div class="text-xs text-gray-500 mt-2">* Backend will save this outbreak and update the map & sidebar.</div>
      </div>
    </div>
  `;
  // Backend: On submit, send data to backend and close modal
  document.getElementById('addOutbreakForm').onsubmit = function(e) {
    e.preventDefault();
    // TODO: Backend developer will handle form submission
    document.getElementById('modal-container').innerHTML = '';
  };
}

function locateFarm() {
  // Use geolocation API to get user location and center map
  // Backend: Optionally store/update farm location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      const lng = pos.coords.longitude;
      const lat = pos.coords.latitude;
      map.flyTo({ center: [lng, lat], zoom: 15 });
      // Backend: Optionally update farm location in DB
    }, function() {
      // Could not get location
      // Optionally show a message to user
    });
  }
}

function openOutbreakDetails(id) {
  // Show a modal with outbreak details (UI only, backend will provide data)
  // Backend: Fetch outbreak details by ID
  const outbreak = (window.sampleOutbreaks || []).find(o => o.id === id);
  const modal = document.getElementById('modal-container');
  if (!outbreak) {
    modal.innerHTML = '';
    return;
  }
  modal.innerHTML = `
    <div class="modal-bg" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:2000;display:flex;align-items:center;justify-content:center;">
      <div class="card p-6" style="max-width:400px;width:100%;position:relative;">
        <button onclick="document.getElementById('modal-container').innerHTML=''" style="position:absolute;top:1rem;right:1rem;font-size:1.3rem;background:none;border:none;">&times;</button>
        <h3 class="font-bold mb-3">Outbreak Details</h3>
        <div><b>Disease:</b> ${outbreak.diseaseType}</div>
        <div><b>Severity:</b> <span class="severity-badge severity-${outbreak.severity}">${outbreak.severity}</span></div>
        <div><b>Date:</b> ${outbreak.date}</div>
        <div><b>Notes:</b> ${outbreak.notes || ''}</div>
        <div class="text-xs text-gray-500 mt-2">* Backend will provide more details, images, and actions here.</div>
      </div>
    </div>
  `;
}

// --- INIT ---
window.onload = () => {
  setupNavbar();
  setupThemeToggle();
  initMap();
  setupFABs();
  renderOutbreaksList(sampleOutbreaks); // Replace with backend data
};
