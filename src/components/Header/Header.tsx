import React from "react";
import { Link } from "react-router-dom";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import "./Header.css";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
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
          onClick={() => setDarkMode(!darkMode)}
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
