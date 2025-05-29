import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import axios from 'axios';

// 🔐 Global Axios Interceptor: auto logout on 401 (token expired)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      alert("Session expired. Please login again.");
      window.location.href = "/author-login";
    }
    return Promise.reject(error);
  }
);

// 👇 Root render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ❌ Disable service worker to prevent caching issues (recommended unless using full PWA)
serviceWorkerRegistration.unregister(); // Use register() if PWA needed

// 📈 Optional: Performance monitoring
reportWebVitals();
