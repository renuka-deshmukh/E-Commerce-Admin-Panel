import React, { useEffect, useState } from "react";
import { createProduct, getAllProducts } from "../../services/productApi";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { getAllCategories } from "../../services/categoryApi";
import { getAllBrands } from "../../services/brandApi";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import "./Products.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    pName: "",
    pDescription: "",
    price: "",
    quentity: "",
    catID: "",
    brandID: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  async function fetchData() {
    try {
      const prodRes = await getAllProducts();
      const catRes = await getAllCategories();
      const brandRes = await getAllBrands();

      setProducts(prodRes.data.products || []);
      setCategories(catRes.data.categories || []);
      setBrands(brandRes.data.brands || []);
    } catch (error) {
      toast.error("Error fetching Products");
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.cName : "-";
  };

  const getBrandName = (id) => {
    const brand = brands.find((b) => b.id === id);
    return brand ? brand.bName : "-";
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.pName.trim()) {
      toast.error("Product Name is required");
      return;
    }
    try {
      const response = await createProduct(newProduct);
      if (response.data.success) {
        toast("Product created successfully");
        setNewProduct({
          pName: "",
          pDescription: "",
          price: "",
          quentity: "",
          catID: "",
          brandID: "",
        });
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error("Error creating Product:", error);
    }
  };



  return (
    <div className="card shadow-sm p-3">
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

        {/* ✅ Styled Table */}
        <table className="table align-middle custom-table">
          <thead>
            <tr>
              <th>Product Name & Details</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((Product, i) => (
                <tr key={Product.id || i}>
                  <td className="fw-semibold">
                    {Product.pName}
                    <div className="text-muted small">{Product.pDescription}</div>
                  </td>
                  <td>${Product.price}</td>
                  <td>
                    <span className="fw-bold">{Product.quentity} Item left</span>
                  </td>
                  <td>{getCategoryName(Product.catID)}</td>
                  <td>{getBrandName(Product.brandID)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => {
                        setSelectedProduct(Product);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <DeleteProduct productID={Product.id} onDelete={fetchData} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No Product available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* ✅ Separate AddProductModal Component */}
      <AddProduct
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={categories}
        brands={brands}
      />

      {/* Edit Modal */}
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
