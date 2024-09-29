import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import deductifyLogo from "./assets/deductifyLogo.png";
import Upload from "./Upload";

const NavLinks = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubNav, setSelectedSubNav] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/");
    const category = path[1];
    const subCategory = path[2];

    if (category) {
      setSelectedCategory(category);
      setSelectedSubNav(subCategory || null);
    } else {
      setSelectedCategory(null);
      setSelectedSubNav(null);
    }
  }, [location]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubNav(null);
  };

  const handleSubNavClick = (subCategory) => {
    setSelectedSubNav(subCategory);
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
            className={selectedCategory === category ? "active" : ""}
          >
            <Link
              to={`/${category}`}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sub-nav">
        {selectedCategory && (
          <>
            <Link
              to={`/${selectedCategory}/upload`}
              className={selectedSubNav === "upload" ? "active" : ""}
              onClick={() => handleSubNavClick("upload")}
            >
              Upload
            </Link>
            <Link
              to={`/${selectedCategory}/view`}
              className={selectedSubNav === "view" ? "active" : ""}
              onClick={() => handleSubNavClick("view")}
            >
              View
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const Nav = () => (
  <Router>
    <NavLinks />
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

export default Nav;
