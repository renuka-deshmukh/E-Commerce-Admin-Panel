import React, { useEffect, useState } from "react";
import { createProduct, getAllProducts } from "../../services/productApi";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { getAllCategories } from "../../services/categoryApi";
import { getAllBrands } from "../../services/brandApi";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4> Products</h4>
        <button
          className="btn"
          style={{
            background: "linear-gradient(90deg, #2575fc, #6a11cb)",
            color: "white",
            borderRadius: "8px",
          }}
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" /> Add New Product
        </button>
      </div>

      {/* Products Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Category</th>
            <th scope="col">Brand</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((Product, i) => (
              <tr key={Product.id || i}>
                <td>{i + 1}</td>
                <td>{Product.pName}</td>
                <td>{Product.pDescription}</td>
                <td>{Product.price}</td>
                <td>{Product.quentity}</td>
                <td>{getCategoryName(Product.catID)}</td>
                <td>{getBrandName(Product.brandID)}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">
                    <FaEdit />
                  </button>
                  {/* <button className="btn btn-sm btn-danger">
                    <FaTrash />
                  </button> */}
                  <DeleteProduct productID={Product.id}
                    onDelete={fetchData}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Product available
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
    </div>
  );
};

export default Products;
