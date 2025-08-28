// --- Disease Alerts Tab Logic ---
// Backend-ready: Replace sample data with Supabase/PostGIS fetches

document.addEventListener('DOMContentLoaded', function () {
  // Sample alert data (replace with backend fetch)
  let alerts = [
    {
      id: 1,
      title: 'Maize Rust Outbreak',
      crop: 'Maize',
      disease: 'Maize Rust',
      severity: 'Critical',
      region: 'Western',
      time: '18 min ago',
      reportedAt: Date.now() - 18*60*1000,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80',
      location: [36.8, -0.9],
      farmers: ['John Doe', 'Jane Smith'],
      recommendations: 'Spray with recommended fungicide. Monitor closely.'
    },
    {
      id: 2,
      title: 'Wheat Rust Detected',
      crop: 'Wheat',
      disease: 'Wheat Rust',
      severity: 'Warning',
      region: 'Rift Valley',
      time: '1 hr ago',
      reportedAt: Date.now() - 60*60*1000,
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80',
      location: [35.3, -0.5],
      farmers: ['Mary W.', 'Paul K.'],
      recommendations: 'Scout nearby fields. Early intervention advised.'
    },
    {
      id: 3,
      title: 'Rice Blast Observation',
      crop: 'Rice',
      disease: 'Rice Blast',
      severity: 'Info',
      region: 'Central',
      time: '3 hrs ago',
      reportedAt: Date.now() - 3*60*60*1000,
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=80&q=80',
      location: [37.1, -0.2],
      farmers: ['Ali M.'],
      recommendations: 'Monitor for spread. No action needed yet.'
    }
  ];

  // Filters
  const cropFilter = document.getElementById('filter-crop');
  const severityFilter = document.getElementById('filter-severity');
  const timeFilter = document.getElementById('filter-time');
  const alertsCards = document.getElementById('alertsCards');

  function filterAlerts() {
    let filtered = alerts;
    if (cropFilter.value !== 'All') filtered = filtered.filter(a => a.crop === cropFilter.value);
    if (severityFilter.value !== 'All') filtered = filtered.filter(a => a.severity === severityFilter.value);
    if (timeFilter.value !== 'all') {
      const now = Date.now();
      let ms = 24*60*60*1000;
      if (timeFilter.value === '7d') ms = 7*24*60*60*1000;
      if (timeFilter.value === '30d') ms = 30*24*60*60*1000;
      filtered = filtered.filter(a => now - a.reportedAt <= ms);
    }
    renderAlerts(filtered);
    updateMap(filtered);
  }

  cropFilter.addEventListener('change', filterAlerts);
  severityFilter.addEventListener('change', filterAlerts);
  timeFilter.addEventListener('change', filterAlerts);

  // Render alert cards
  function renderAlerts(alertList) {
    alertsCards.innerHTML = '';
    if (!alertList.length) {
      alertsCards.innerHTML = '<div style="color:#aaa;text-align:center;padding:2rem;">No alerts found for selected filters.</div>';
      return;
    }
    alertList.forEach(alert => {
      const card = document.createElement('div');
      card.className = 'alert-card';
      card.innerHTML = `
        <img src="${alert.image}" class="alert-img" alt="Disease image">
        <div class="alert-info">
          <div class="alert-title">${alert.title}</div>
          <div class="alert-meta">${alert.crop} • ${alert.disease} • <span class="alert-region">${alert.region}</span></div>
          <div class="alert-badges">
            <span class="badge badge-${alert.severity.toLowerCase()}">${alert.severity}</span>
          </div>
          <div class="alert-time">${alert.time}</div>
        </div>
      `;
      card.addEventListener('click', () => showAlertDetails(alert));
      alertsCards.appendChild(card);
    });
  }

  // Banner (top urgent alert)
  function updateBanner() {
    const banner = document.getElementById('alertsBanner');
    const bannerTitle = document.getElementById('bannerTitle');
    const bannerMeta = document.getElementById('bannerMeta');
    // Find most recent critical alert
    const critical = alerts.filter(a => a.severity === 'Critical').sort((a,b) => b.reportedAt - a.reportedAt)[0];
    if (critical) {
      bannerTitle.textContent = `Critical: ${critical.title} in ${critical.region}`;
      bannerMeta.innerHTML = `${critical.time} • Severity: <span class="badge badge-critical">Critical</span> • ${critical.crop}`;
    } else {
      bannerTitle.textContent = 'No critical alerts currently.';
      bannerMeta.innerHTML = '';
    }
  }

  // Map View (clustered)
  let map;
  function updateMap(alertList) {
    if (!window.maplibregl) return;
    if (!map) {
      map = new maplibregl.Map({
        container: 'alertsMap',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=Get_your_own_D6rA4zTHduk6KOKTXzGB',
        center: [36.8, -1.0],
        zoom: 6
      });
    }
    // Remove old markers
    if (map._alertMarkers) map._alertMarkers.forEach(m => m.remove());
    map._alertMarkers = [];
    alertList.forEach(alert => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.background = alert.severity === 'Critical' ? '#e53e3e' : alert.severity === 'Warning' ? '#f59e42' : '#38a169';
      el.style.width = '18px';
      el.style.height = '18px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid #fff';
      el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.13)';
      el.title = `${alert.title} (${alert.severity})`;
      const marker = new maplibregl.Marker(el).setLngLat(alert.location).addTo(map);
      map._alertMarkers.push(marker);
    });
  }

  // Alert details modal (simple)
  function showAlertDetails(alert) {
    const modal = document.createElement('div');
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.25);z-index:1000;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:12px;max-width:420px;width:95vw;padding:2rem 1.5rem;box-shadow:0 4px 24px 0 rgba(0,0,0,0.13);position:relative;">
        <button style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b;" onclick="this.parentNode.parentNode.remove()"><i class="fas fa-times"></i></button>
        <img src="${alert.image}" alt="Disease image" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-bottom:1rem;">
        <div style="font-weight:700;font-size:1.1rem;color:#46602a;margin-bottom:0.3rem;">${alert.title}</div>
        <div style="color:#64748b;font-size:0.98rem;margin-bottom:0.3rem;">${alert.crop} • ${alert.disease} • <span style='color:#5D7C3A;font-weight:500;'>${alert.region}</span></div>
        <div style="margin-bottom:0.3rem;"><span class="badge badge-${alert.severity.toLowerCase()}">${alert.severity}</span> <span style="color:#a0aec0;font-size:0.95rem;">${alert.time}</span></div>
        <div style="margin-bottom:0.5rem;"><b>Reporting Farmers:</b> ${alert.farmers.join(', ')}</div>
        <div style="margin-bottom:0.5rem;"><b>Recommendations:</b> ${alert.recommendations}</div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Share banner (stub)
  document.getElementById('shareBanner').addEventListener('click', function () {
    alert('Share to WhatsApp/Telegram/Email coming soon!');
  });

  // Initial load
  updateBanner();
  filterAlerts();
});
