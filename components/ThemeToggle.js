import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
