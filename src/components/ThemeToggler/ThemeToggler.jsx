import './ThemeToggler.scss';
import { useEffect, useState } from 'react';

function ThemeToggler() {
  const [darkModeOn, setDarkModeOn] = useState(null);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('isDarkMode');
    if (localStorage.getItem('isDarkMode')) {
      setDarkModeOn(JSON.parse(isDarkMode));
    } else if (window.matchMedia) {
      setDarkModeOn(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (darkModeOn !== null) {
      const bodyClasses = document.body.classList;
      if (darkModeOn) {
        bodyClasses.add('theme-dark');
        bodyClasses.remove('theme-light');
      } else {
        bodyClasses.remove('theme-dark');
        bodyClasses.add('theme-light');
      }
    }
  }, [darkModeOn]);

  const handleClick = () => {
    setDarkModeOn((prevDarkModeOn) => {
      const newDarkModeOn = !prevDarkModeOn;
      localStorage.setItem('isDarkMode', newDarkModeOn);
      return newDarkModeOn;
    });
  };

  return (
    <button onClick={handleClick}>
      {darkModeOn !== null ? (darkModeOn ? '☀️' : '🌒') : '💀'}
    </button>
  );
}

export default ThemeToggler;
