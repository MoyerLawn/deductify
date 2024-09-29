import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import deductifyLogo from "./assets/deductifyLogo.png";
import Upload from "./Upload";

const NavComponent = () => {
  const [openSubNav, setOpenSubNav] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Set the submenu to open based on the current path
    const path = location.pathname.split("/")[1]; // Get the first part of the path
    setOpenSubNav(path || null);
  }, [location]);

  const handleMouseEnter = (category) => {
    setOpenSubNav(category);
  };

  const handleMouseLeave = () => {
    setOpenSubNav(null);
  };

  return (
    <nav className="main-nav">
      <div className="deductify-logo">
        <img src={deductifyLogo} alt="deductify" />
      </div>
      <ul className="nav-list">
        {["business", "travel", "office", "donations"].map((category) => (
          <li
            key={category}
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
            className={openSubNav === category ? "active" : ""}
          >
            <Link to={`/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Link>
            {openSubNav === category && (
              <ul className="sub-nav">
                <li>
                  <Link to={`/${category}/upload`}>Upload</Link>
                </li>
                <li>
                  <Link to={`/${category}/view`}>View</Link>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const App = () => (
  <Router>
    <NavComponent />
    <Routes>
      <Route path="/business/upload" element={<Upload/>} />
      <Route path="/business/view" element={<div>Business View</div>} />
      <Route path="/travel/upload" element={<Upload/>} />
      <Route path="/travel/view" element={<div>Travel View</div>} />
      <Route path="/office/upload" element={<Upload/>} />
      <Route path="/office/view" element={<div>Office View</div>} />
      <Route path="/donations/upload" element={<Upload/>} />
      <Route path="/donations/view" element={<div>Donations View</div>} />

      <Route path="/" element={<div>Welcome! Select a category.</div>} />
    </Routes>
  </Router>
);

export default App;
