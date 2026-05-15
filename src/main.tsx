import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app/globals.css';

/**
 * Entry point for Vite/SPA environment.
 * Ensures the root element is present and renders the App.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element '#root' not found.");
}