// src/components/LandingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`landing-container ${isDarkMode ? 'dark-mode' : ''}`}
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <h1 className="landing-title">Welcome to Chat App!</h1>
      <p className="landing-text">
        Please{' '}
        <Link to="/signup" className="landing-link">
          Sign Up
        </Link>{' '}
        or{' '}
        <Link to="/login" className="landing-link">
          Login
        </Link>{' '}
        to continue.
      </p>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default LandingPage;