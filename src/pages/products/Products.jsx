import React, { useEffect, useState } from "react";
import { createProduct, getAllProducts } from "../../services/productApi";
import { toast } from "react-toastify";
import { FaEdit, FaPlus } from "react-icons/fa";
import { getAllCategories } from "../../services/categoryApi";
import { getAllBrands } from "../../services/brandApi";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // ✅ Fetch all data
  const fetchData = async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
        getAllBrands(),
      ]);
      setProducts(prodRes.data.products || []);
      setCategories(catRes.data.categories || []);
      setBrands(brandRes.data.brands || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching products");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Helper functions
  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.cName : "-";
  };

  const getBrandName = (id) => {
    const brand = brands.find((b) => b.id === id);
    return brand ? brand.bName : "-";
  };

  // ✅ Add product handler
  const handleAddProduct = async (formData) => {
    try {
      const response = await createProduct(formData);
      toast.success(response.data.msg || "Product added successfully!");
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="card shadow-sm p-3 bg-white rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">All Product List</h4>
        <button
          className="btn btn-primary d-flex align-items-center"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            borderRadius: "10px",
            padding: "8px 16px",
          }}
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" /> Add Product
        </button>
      </div>

      {/* ✅ Table */}
      <table className="table align-middle custom-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, i) => (
              <tr key={product.id || i}>
                <td className="fw-semibold">
                  {product.pName}
                  <div className="text-muted small">{product.pDescription}</div>
                </td>
                <td>
                  <img
                  src={
                    product.pImage
                  }
                  alt={product.pImage}
                  className="category-img img-fluid"
                  style={{width:"90px", height:"60px"}} 
                />

                </td>
                <td>₹{product.price}</td>
                <td>{product.quentity} pcs</td>
                <td>{getCategoryName(product.catID)}</td>
                <td>{getBrandName(product.brandID)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <DeleteProduct productID={product.id} onDelete={fetchData} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Add Product Modal */}
      <AddProduct
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
        categories={categories}
        brands={brands}
      />

      {/* ✅ Edit Modal */}
      <UpdateProduct
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={selectedProduct}
        categories={categories}
        brands={brands}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default Products;
