import React from "react";
import { Link, useLocation } from "react-router-dom";


function Nav() {
  const location = useLocation();


  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-4">
      <a className="navbar-brand text-dark" >Google Books Search</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Search</Link>
          <Link to="/portfolio" className={location.pathname === "/saved" ? "nav-link active" : "nav-link"}>Saved</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
