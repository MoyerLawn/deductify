import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import deductifyLogo from "./assets/deductifyLogo.png";
import Upload from "./Upload";
import DataTable from "./DataTable";
import Intro from "./Intro";

const NavLinks = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubNav, setSelectedSubNav] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const subNavs = {
    business: ["Upload", "View"],
    donations: ["Upload", "View"],
    travel: ["Receipt", "Mileage"],
  };

  // Effect to update state based on URL
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const category = pathParts[1];
    const subCategory = pathParts[2];

    if (category && subNavs[category]) {
      setSelectedCategory(category);
      setSelectedSubNav(subCategory || subNavs[category][0].toLowerCase()); // Default to first subNav
    } else if (category === "home") {
      setSelectedCategory(null);
      setSelectedSubNav(null);
    } else {
      setSelectedCategory(null);
      setSelectedSubNav(null);
    }
  }, [location, subNavs]);

  // Set both category and default first subNav when category is clicked
  const handleCategoryClick = (category) => {
    if (category === "home") {
      setSelectedCategory(null);
      setSelectedSubNav(null);
      navigate("/home"); // Navigate to the home route
    } else if (category !== selectedCategory) {
      setSelectedCategory(category);
      const firstSubNav = subNavs[category][0].toLowerCase();
      setSelectedSubNav(firstSubNav);
      navigate(`/${category}/${firstSubNav}`); // Redirect to the first subNav
    }
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
        {["home", "business", "travel", "donations"].map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            <Link
              to={`/${category}`}
              className={selectedCategory === category ? "active" : ""}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
            {selectedCategory === category && category !== "home" && (
              <div className="sub-nav">
                {subNavs[category].map((sub) => (
                  <Link
                    key={sub}
                    to={`/${category}/${sub.toLowerCase()}`}
                    className={
                      selectedSubNav === sub.toLowerCase() ? "active" : ""
                    }
                    onClick={() => handleSubNavClick(sub.toLowerCase())}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Nav = () => (
  <Router>
    <NavLinks />
    <Routes>
      <Route path="/home" element={<Intro />} />
      <Route path="/business/upload" element={<Upload />} />
      <Route path="/business/view" element={<DataTable />} />
      <Route path="/travel/receipt" element={<Upload />} />
      <Route path="/travel/mileage" element={<div>Travel Mileage</div>} />
      <Route path="/donations/upload" element={<Upload />} />
      <Route path="/donations/view" element={<div>Donations View</div>} />
      <Route path="/" element={<Intro />} />
    </Routes>
  </Router>
);

export default Nav;