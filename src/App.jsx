import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content Area */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/products" element={<Products />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
