# CropGuard AI - Farmer App



- **`index.html`** - Main application with welcome banner and navigation
- **`login.html`** - Login page for existing users
- **`signup.html`** - Registration page for new users

### Demo Mode

This is a frontend-only demo application. The authentication system simulates login/signup processes without backend validation.


## Usage

1. Open `index.html` to see the welcome banner
2. Click "Login" to access the login page
3. Click "Sign Up" to create a new account
4. After successful login, you'll be redirected to the main app
5. Use the logout button in the header to return to the login page

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

