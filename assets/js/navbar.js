// navbar.js
// Handles navbar interactivity: hamburger toggle, active state, notification badge, and responsive behavior

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const hamburger = document.getElementById('navbar-hamburger');
  const navLinks = document.getElementById('navbar-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
  }

  // Close menu on link click (mobile)
  document.querySelectorAll('#navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });

  // Set active link based on current page
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('#navbar-links a').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });

  // Notification badge (simulate new alerts)
  const alertBadge = document.getElementById('alert-badge');
  if (alertBadge) {
    // TODO: Replace with backend logic for real alerts
    const hasNewAlerts = true; // Simulate
    alertBadge.style.display = hasNewAlerts ? 'inline-block' : 'none';
  }
});
