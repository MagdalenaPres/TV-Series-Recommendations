import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <section className="navBar">
        <nav>
          <ul>
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/TvSeries">TV series</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/EmployeeForm">Form</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Cart">Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}
export default Navbar;
