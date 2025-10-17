import React, { useEffect, useState } from "react";
import { createBrands, deleteBrand, getAllBrands } from "../../services/brandApi";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import AddBrand from "./AddBrand";
import UpdateBrand from "./UpdateBrand";
import "./Brands.css";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAllBrands();
      if (response.data.success) {
        setBrands(response.data.brands);
      } else {
        toast.error("Failed to load brands ❌");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Error fetching brands ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBrand = async (formData) => {
    try {
      const response = await createBrands(formData);
      if (response.data.success) {
        toast.success("Brand added successfully ✅");
        setShowModal(false);
        fetchData();
      } else {
        toast.error("Failed to add brand ❌");
      }
    } catch (error) {
      console.error("Error creating brand:", error);
      toast.error("Error creating brand ❌");
    }
  };

  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      const response = await deleteBrand(id);
      if (response.data.success) {
        toast.success("Brand deleted successfully ✅");
        fetchData();
      }
    } catch (error) {
      toast.error("Error deleting brand ❌");
    }
  };

  return (
    <div className="brands-page p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">🏷️ Brands</h3>
        <button className="btn btn-gradient" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Brand
        </button>
      </div>

      <div className="row g-5">
        {brands.length > 0 ? (
          brands.map((brand, i) => (
            <div key={brand.id || i} className="col-auto">
              <div className="category-card">
                <img
                  src={
                    brand.bImage ||
                    "https://via.placeholder.com/150x100?text=No+Image"
                  }
                  alt={brand.bName}
                  className="category-img"
                />
                <div className="overlay">
                  <h5 className="overlay-text">{brand.bName}</h5>
                  <div className="overlay-actions">
                    <button
                      className="btn btn-sm btn-light me-2"
                      onClick={() => {
                        setSelectedBrand(brand);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteBrand(brand.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
              <div className="category-name-below">{brand.bName}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No brands available</p>
        )}
      </div>

      <AddBrand show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddBrand} />
      <UpdateBrand
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        brand={selectedBrand}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default Brands;
