import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header()  {
  return (
    <header className="header">
      <div className="logo">ReelBoard</div>
      <nav className="nav">
        <Link to="/">Gallery</Link>
        <span className="divider"></span>
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
};

export default Header;
