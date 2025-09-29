// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTags, FaCubes, FaBox } from "react-icons/fa";
import "./Dashboard.css"; // ✅ custom styling

const Dashboard = () => {
  return (
    <div className="p-4" style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Attractive Top Banner */}
      <div className="dashboard-banner text-center mb-5 p-4 rounded shadow-sm">
        <h2 className="fw-bold text-white mb-2">
          Welcome Back, Admin!
        </h2>
        <p className="text-light mb-0">
          Your control center is ready 🚀 — manage <strong>Categories</strong>, <strong>Brands</strong>, and <strong>Products</strong> with ease.
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="row g-4">
        {/* Categories */}
        <div className="col-md-4">
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <div className="card shadow-lg border-0 h-100 text-center p-4 dashboard-card">
              <FaTags className="text-primary mb-3" size={50} />
              <h5 className="fw-bold text-dark">Categories</h5>
              <p className="text-muted">Manage all product categories</p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbaBKD4O6R9DmW90wtIA7hM3tC5XzpA3CQjQ&s"
                alt="Categories"
                className="mx-auto d-block mb-2"
                style={{ width: "90px", height: "90px", objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>

        {/* Brands */}
        <div className="col-md-4">
          <Link to="/brands" style={{ textDecoration: "none" }}>
            <div className="card shadow-lg border-0 h-100 text-center p-4 dashboard-card">
              <FaCubes className="text-success mb-3" size={50} />
              <h5 className="fw-bold text-dark">Brands</h5>
              <p className="text-muted">Organize brands effectively</p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIVL0bQmr4Bg4jAT4wQw6lpHoBRzKvl3jcw&s"
                alt="Brands"
                className="mx-auto d-block mb-2"
                style={{ width: "90px", height: "90px", objectFit: "contain" }}
              />

            </div>
          </Link>
        </div>

        {/* Products */}
        <div className="col-md-4">
          <Link to="/products" style={{ textDecoration: "none" }}>
            <div className="card shadow-lg border-0 h-100 text-center p-4 dashboard-card">
              <FaBox className="text-danger mb-3" size={50} />
              <h5 className="fw-bold text-dark">Products</h5>
              <p className="text-muted">View and manage all products</p>
              <img
                src="https://img.icons8.com/color/96/null/product.png"
                alt="Products"
                className="mx-auto d-block mb-2"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
