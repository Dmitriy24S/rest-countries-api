import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    setDarkMode(!darkMode);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <div className="logo">Where in the world?</div>
        </Link>
        {/* Theme toggle */}
        <button
          className="theme-toggle"
          aria-label="toggle page theme"
          onClick={handleThemeToggle}
        >
          {darkMode ? (
            <div className="theme-text">
              <IoSunnyOutline />
              Light Theme
            </div>
          ) : (
            <div className="theme-text">
              <IoMoonOutline />
              Dark Theme
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
