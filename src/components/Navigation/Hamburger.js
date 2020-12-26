import React from "react";
import { Link } from "react-router-dom";


// https://react-bootstrap.github.io/components/navbar/#navbar-toggle-props
// https://github.com/Anita-Kozlak/Verti/blob/master/index.html

const Hamburger = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" href="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-Link" href="#">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-Link" href="#">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-Link" href="#">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-Link disabled" href="#">
                Disabled
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Hamburger;
