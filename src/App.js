import React, { useEffect, useContext } from "react";
import Characters from "./Pages/Characters";
import CharacterDetails from "./Pages/CharacterDetails";
import NavBar from "./Components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContext } from "./Components/ThemeProvider";
import "./app.css";

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
