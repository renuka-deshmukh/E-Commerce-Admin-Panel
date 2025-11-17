import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Products from "./pages/products/Products";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories";
import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import { useContext } from "react";
import Users from "./pages/users/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainApp() {
  const { loggedUser } = useContext(AuthContext); 

  return (
    <>
      <Navbar />
      <div className="d-flex">
        {loggedUser && <Sidebar />}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            {loggedUser ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/categories" element={<Navigate to="/login" replace />} />
                <Route path="/brands" element={<Navigate to="/login" replace />} />
                <Route path="/products" element={<Navigate to="/login" replace />} />
                <Route path="/users" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
