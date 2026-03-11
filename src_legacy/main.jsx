import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace "YOUR_GOOGLE_CLIENT_ID" with your actual Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "248657155647-s4387m8tiqphje9eui6cm25m2n5kq82d.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);