import "./navBar.css";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="dashboard-logo">FilmVault</div>

<div className="nav-links">
  {/* Conditional css for the active Navlink */}
  <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
    Home
  </NavLink>
  <NavLink to="/category/movies" className={({ isActive }) => isActive ? "active-link" : ""}>
    Movies
  </NavLink>
  <NavLink to="/category/tvshows" className={({ isActive }) => isActive ? "active-link" : ""}>
    TV Shows
  </NavLink>
  <NavLink to="/category/mylist" className={({ isActive }) => isActive ? "active-link" : ""}>
    My List
  </NavLink> 
</div>
    </div>

      <div className="nav-right">
        <FaSearch className="nav-icon" />
        <FaBell className="nav-icon" />
      </div>
    </div>
  );
}

