import React, { useContext } from "react";
import "./_styles.css";
import { ThemeContext } from "./ThemeProvider";
const NavBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navBar">
      <div className="logo">
        <img
          src="https://cdn.dribbble.com/users/2982586/screenshots/18798877/media/254e07b9212cd99155c361cc34b9e568.jpg"
          alt="Logo"
        />
      </div>
      <ul className="nav-links">
        <li className="link-dark">
          <a href="/characters">Characters</a>
          <button onClick={toggleTheme} className="theme-button">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
