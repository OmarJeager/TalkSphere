// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import App from "./App";

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot()

// Render the app using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
