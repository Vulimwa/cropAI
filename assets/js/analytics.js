// --- Analytics Dashboard JS ---
// Handles sidebar tab switching, dashboard panel loading, and backend integration points

document.addEventListener('DOMContentLoaded', function () {
  // Sidebar tab switching
  const tabs = document.querySelectorAll('.sidebar-tab');
  const dashboardPanels = document.getElementById('dashboard-panels');
  const emptyState = document.getElementById('emptyState');

  // Tab content loaders (modular, backend-ready)
  const tabLoaders = {
    overview: loadOverviewPanels,
    disease: loadDiseasePanels,
    yield: loadYieldPanels,
    engagement: loadEngagementPanels,
    compare: loadComparePanels,
    export: loadExportPanels
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const tabKey = this.getAttribute('data-tab');
      loadTab(tabKey);
    });
  });

  // Initial load
  loadTab('overview');

  function loadTab(tabKey) {
    dashboardPanels.innerHTML = '';
    emptyState.classList.add('hidden');
    if (tabLoaders[tabKey]) {
      tabLoaders[tabKey]();
    } else {
      showEmptyState();
    }
  }

  function showEmptyState() {
    dashboardPanels.innerHTML = '';
    emptyState.classList.remove('hidden');
  }

  // --- Modular Panel Loaders ---
  function loadOverviewPanels() {
    // Example: 3 summary cards + AI Insights
    dashboardPanels.innerHTML = `
      <div class="dashboard-card">
        <div class="dashboard-card-title">Total Reports</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold" id="totalReports">--</span>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Active Outbreaks</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold" id="activeOutbreaks">--</span>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Avg. Yield (t/ha)</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold" id="avgYield">--</span>
        </div>
      </div>
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">AI Insights</div>
        <div class="dashboard-card-content">
          <span id="aiInsights">AI-powered insights will appear here.</span>
        </div>
      </div>
    `;
    // TODO: Fetch and update data from backend
    document.getElementById('totalReports').textContent = '1,245';
    document.getElementById('activeOutbreaks').textContent = '7';
    document.getElementById('avgYield').textContent = '3.2';
    document.getElementById('aiInsights').textContent = 'No major outbreaks detected. Yields are above average.';
  }

  function loadDiseasePanels() {
    dashboardPanels.innerHTML = `
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">Disease Trends</div>
        <div class="dashboard-card-content">
          <canvas id="diseaseTrendsChart" style="width:100%;max-width:420px;"></canvas>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Disease Heatmap</div>
        <div class="dashboard-card-content" style="height:260px;">
          <div id="diseaseHeatmap" style="width:100%;height:100%;border-radius:8px;overflow:hidden;"></div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Top Diseases</div>
        <div class="dashboard-card-content">
          <ul id="topDiseasesList" style="width:100%"></ul>
        </div>
      </div>
    `;
    // Example chart (replace with backend data)
    const ctx = document.getElementById('diseaseTrendsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Disease Reports',
          data: [12, 19, 14, 22, 18, 25],
          borderColor: '#5D7C3A',
          backgroundColor: 'rgba(93,124,58,0.12)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
    // Example list
    document.getElementById('topDiseasesList').innerHTML = `
      <li>Maize Lethal Necrosis (MLN) - 45%</li>
      <li>Wheat Rust - 30%</li>
      <li>Rice Blast - 15%</li>
      <li>Other - 10%</li>
    `;
    // --- Heatmap (MapLibre/MapTiler) ---
    // Placeholder map for now, backend-ready
    if (window.maplibregl) {
      const map = new maplibregl.Map({
        container: 'diseaseHeatmap',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=Get_your_own_D6rA4zTHduk6KOKTXzGB',
        center: [36.8219, -1.2921], // Nairobi
        zoom: 6
      });
      // TODO: Add heatmap layer with backend data
    } else {
      document.getElementById('diseaseHeatmap').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#aaa;">Heatmap coming soon</div>';
    }
  }

  function loadYieldPanels() {
    dashboardPanels.innerHTML = `
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">Yield Prediction</div>
        <div class="dashboard-card-content">
          <canvas id="yieldPredictionChart" style="width:100%;max-width:420px;"></canvas>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Yield by Region</div>
        <div class="dashboard-card-content">
          <ul id="yieldByRegionList" style="width:100%"></ul>
        </div>
      </div>
    `;
    // Example chart
    const ctx = document.getElementById('yieldPredictionChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Maize', 'Wheat', 'Rice'],
        datasets: [{
          label: 'Predicted Yield (t/ha)',
          data: [3.2, 2.7, 4.1],
          backgroundColor: ['#5D7C3A', '#8DB255', '#B7D77A']
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
    // Example list
    document.getElementById('yieldByRegionList').innerHTML = `
      <li>Western: 3.5 t/ha</li>
      <li>Rift Valley: 3.0 t/ha</li>
      <li>Central: 2.8 t/ha</li>
    `;
  }

  function loadEngagementPanels() {
    dashboardPanels.innerHTML = `
      <div class="dashboard-card">
        <div class="dashboard-card-title">Active Farmers</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold">312</span>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Reports Submitted</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold">1,245</span>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Avg. Response Time</div>
        <div class="dashboard-card-content">
          <span class="text-2xl font-bold">2.1 hrs</span>
        </div>
      </div>
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">Engagement Trends</div>
        <div class="dashboard-card-content">
          <canvas id="engagementTrendsChart" style="width:100%;max-width:420px;"></canvas>
        </div>
      </div>
    `;
    // Example chart
    const ctx = document.getElementById('engagementTrendsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Reports',
          data: [22, 19, 25, 18, 24, 20, 21],
          borderColor: '#5D7C3A',
          backgroundColor: 'rgba(93,124,58,0.12)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  function loadComparePanels() {
    dashboardPanels.innerHTML = `
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">Comparison Tool</div>
        <div class="dashboard-card-content" style="flex-direction: column; align-items: stretch;">
          <div class="flex gap-4 mb-3" style="justify-content:center;">
            <select id="compareA" class="analytics-filter">
              <option value="Maize">Maize</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
            </select>
            <span style="align-self:center;">vs</span>
            <select id="compareB" class="analytics-filter">
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Rice">Rice</option>
            </select>
          </div>
          <div class="flex gap-4" style="justify-content:center;">
            <div style="flex:1; min-width:0;">
              <div class="dashboard-card-title" id="compareA-title">Maize</div>
              <ul id="compareA-data">
                <li>Disease: 45 cases</li>
                <li>Yield: 3.2 t/ha</li>
                <li>Engagement: 120 farmers</li>
              </ul>
            </div>
            <div style="flex:1; min-width:0;">
              <div class="dashboard-card-title" id="compareB-title">Wheat</div>
              <ul id="compareB-data">
                <li>Disease: 30 cases</li>
                <li>Yield: 2.7 t/ha</li>
                <li>Engagement: 90 farmers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
    // TODO: Replace with backend data
    const cropData = {
      Maize: { disease: '45 cases', yield: '3.2 t/ha', engagement: '120 farmers' },
      Wheat: { disease: '30 cases', yield: '2.7 t/ha', engagement: '90 farmers' },
      Rice: { disease: '15 cases', yield: '4.1 t/ha', engagement: '60 farmers' }
    };
    function updateCompare() {
      const a = document.getElementById('compareA').value;
      const b = document.getElementById('compareB').value;
      document.getElementById('compareA-title').textContent = a;
      document.getElementById('compareB-title').textContent = b;
      document.getElementById('compareA-data').innerHTML = `
        <li>Disease: ${cropData[a].disease}</li>
        <li>Yield: ${cropData[a].yield}</li>
        <li>Engagement: ${cropData[a].engagement}</li>
      `;
      document.getElementById('compareB-data').innerHTML = `
        <li>Disease: ${cropData[b].disease}</li>
        <li>Yield: ${cropData[b].yield}</li>
        <li>Engagement: ${cropData[b].engagement}</li>
      `;
    }
    document.getElementById('compareA').addEventListener('change', updateCompare);
    document.getElementById('compareB').addEventListener('change', updateCompare);
  }

  function loadExportPanels() {
    dashboardPanels.innerHTML = `
      <div class="dashboard-card" style="grid-column: 1 / -1;">
        <div class="dashboard-card-title">Reports & Export</div>
        <div class="dashboard-card-content" style="flex-direction:column;align-items:flex-start;">
          <button class="btn-secondary px-4 py-2 rounded mb-2" id="exportPDF2"><i class="fas fa-file-pdf mr-2"></i>Export as PDF</button>
          <button class="btn-secondary px-4 py-2 rounded mb-2" id="exportCSV2"><i class="fas fa-file-csv mr-2"></i>Export as CSV</button>
          <button class="btn-secondary px-4 py-2 rounded" id="shareDashboard"><i class="fas fa-share-alt mr-2"></i>Share Dashboard</button>
          <div class="mt-4 text-gray-700" style="font-size:0.98rem;">Export analytics for reporting or share with stakeholders. More formats coming soon.</div>
        </div>
      </div>
    `;
    document.getElementById('exportPDF2').addEventListener('click', function () {
      alert('Export to PDF coming soon!');
    });
    document.getElementById('exportCSV2').addEventListener('click', function () {
      alert('Export to CSV coming soon!');
    });
    document.getElementById('shareDashboard').addEventListener('click', function () {
      alert('Share dashboard coming soon!');
    });
  }

  // --- Export Buttons (stub) ---
  document.getElementById('exportPDF').addEventListener('click', function () {
    alert('Export to PDF coming soon!');
  });
  document.getElementById('exportCSV').addEventListener('click', function () {
    alert('Export to CSV coming soon!');
  });
});
