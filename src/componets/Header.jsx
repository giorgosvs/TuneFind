import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="logo"><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          TuneFind
        </Link></div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/favorites">My Favorites</Link></li>
        </ul>
      </nav>
    </header>
  );
};
