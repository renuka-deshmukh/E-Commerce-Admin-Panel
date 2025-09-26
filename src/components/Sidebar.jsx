import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"

import {
  FaHome,
  FaTags,
  FaCubes,
  FaBox,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/categories", label: "Categories", icon: <FaTags /> },
    { path: "/brands", label: "Brands", icon: <FaCubes /> },
    { path: "/products", label: "Products", icon: <FaBox /> },
    { path: "/users", label: "Users", icon: <FaUsers /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        minHeight: "100vh",
        width: "240px",
        background: "#f4f6f9", // soft background
        borderRight: "1px solid #dee2e6",
      }}
    >
      {/* Profile Section */}
      <div className="text-center mb-4 mt-5">
       
        <h6 className="fw-bold">Admin User</h6>
        <small className="text-muted">Administrator</small>
      </div>

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        {links.map((link) => (
          <li className="nav-item mb-1" key={link.path}>
            <Link
              to={link.path}
              className={`nav-link d-flex align-items-center ${
                location.pathname === link.path
                  ? "active-link"
                  : "text-dark"
              }`}
              style={{
                borderRadius: "8px",
                padding: "10px 14px",
                fontWeight: 500,
                transition: "0.3s",
              }}
            >
              <span className="me-2">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout at Bottom */}
      <div className="mt-auto">
        <Link
          to="/logout"
          className="nav-link text-danger d-flex align-items-center"
          style={{
            borderRadius: "8px",
            padding: "10px 14px",
            fontWeight: 500,
          }}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </Link>
      </div>

      {/* Extra footer info */}
      <div className="text-center mt-3 text-muted" style={{ fontSize: "12px" }}>
        © 2025 E-commerce Admin
      </div>
    </div>
  );
}

export default Sidebar;
