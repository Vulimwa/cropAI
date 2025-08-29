# CropGuard AI - Farmer App

CropGuard AI is a modular, backend-ready analytics dashboard and plant disease detection platform for small-scale farmers. The app leverages AI-powered image recognition to diagnose plant diseases, provides treatment recommendations, and offers a suite of analytics and geotagging tools. The design emphasizes a professional, earthy aesthetic, mobile responsiveness, and ease of use for farmers in diverse regions.

---

## Features

- **AI Disease Detection**: Upload or capture plant leaf photos for instant AI-powered diagnosis (frontend demo logic)
- **Treatment & Advice**: Get practical recommendations and farming tips after analysis
- **Scan History**: LocalStorage-based scan history for offline access (demo)
- **Geotagging**: Geotagging page for mapping disease occurrences (frontend structure ready for backend integration)
- **Analytics Dashboard**: Dashboard with disease analytics, comparison tool, and export/share features; advanced grid layouts for analytics and comparison; responsive analytics navigation and filter bar
- **Alerts**: Alerts page for disease/weather notifications (frontend structure, backend-ready)
- **Community Forum**: Local farmers can post issues and share experiences (structure ready, backend integration pending)
- **Community Reports**: View and generate community reports
- **Internationalization**: Language selector with support for English, Swahili, French, Hindi, and Spanish
- **Offline Mode**: Store past results locally for access in low-connectivity areas
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive UI/UX**: Modern, mobile-friendly layouts using Tailwind CSS and custom styles; consistent branding and navigation across all pages
- **Modular Components**: Dynamic navbar with language selector, notifications, and global settings modal accessible from the navbar on every page
- **Styling**: Earthy, leafy pattern backgrounds and professional card layouts; FontAwesome icons and Google Fonts for a friendly, modern look

---

## Authentication

The app uses separate pages for authentication:

- **`index.html`** - Main application with welcome banner and navigation
- **`login.html`** - Login page for existing users
- **`signup.html`** - Registration page for new users

### Demo Mode

This is a frontend-only demo application. The authentication system simulates login/signup processes without backend validation.

---

## Usage

1. Open `index.html` to see the welcome banner
2. Click "Login" to access the login page
3. Click "Sign Up" to create a new account
4. After successful login, you'll be redirected to the main app
5. Use the logout button in the header to return to the login page

---

## Technical Details

- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Font**: Quicksand (Google Fonts)
- **Icons**: Font Awesome
- **Theme**: Green and white color scheme
- **Storage**: LocalStorage for theme preferences and scan history

## File Structure

```
cropAI/
├── index.html          # Main application
├── login.html          # Login page
├── signup.html         # Sign up page
└── README.md           # This file
```

## Browser Support

- Modern browsers with ES6+ support
- LocalStorage support required
- Camera API support for photo capture (optional)

---

## Pending / In Progress

- **Backend Integration:**
  - Connect disease detection to a real AI backend/API
  - Integrate real geotagging/map data and analytics from backend
  - Implement real-time alerts and notifications from backend
- **User Authentication:**
  - Add user accounts, login, and personalized history
- **Community Forum:**
  - Enable posting, commenting, and discussion features
- **Advanced Data Export:**
  - Enable export of analytics and scan history to CSV/PDF
- **Accessibility Improvements:**
  - Further optimize for screen readers and keyboard navigation
- **Testing & QA:**
  - Add automated tests and conduct cross-browser/device QA

---

## Project Status

- **Frontend:** 90% complete (all main features demo-ready, pending backend integration and advanced features)
- **Backend:** Integration points and comments provided; backend/API work pending
- **Design:** Fully responsive, branded, and user-friendly
- **Next Steps:** Backend integration, user auth, community features, and QA

---

For more details, see code comments and individual page documentation.
