import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Products from "./pages/products/Products";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <div className="d-flex">    
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>

    
      <ToastContainer
        position="top-right" autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;
