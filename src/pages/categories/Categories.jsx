import React, { useState, useEffect } from "react";
import { deleteCategory, getAllCategories, createCategory } from "../../services/categoryApi";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // fetch categories
  const fetchData = async () => {
    try {
      const response = await getAllCategories();
      if (response.data.success) {
        setCategories(response.data.categories || []);
      } else {
        setCategories([]);
      }
    } catch (error) {
      toast.error("Error fetching categories ❌");
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add category
  const handleAddCategory = async (formData) => {
    try {
      const response = await createCategory(formData); // sends FormData
      if (response.data.success) {
        toast.success("Category added successfully ✅");
        setShowModal(false);
        fetchData();
      } else {
        toast.error("Failed to add category ❌");
      }
    } catch (error) {
      toast.error("Error adding category ❌");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Category?")) return;
    try {
      const response = await deleteCategory(id);
      if (response.data.success) {
        toast.success("Category deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Error deleting categories ❌");
    }
  };

  return (
    <div className="categories-page p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold custom-font">📂 Categories</h3>
        <button className="btn btn-gradient" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="row g-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id} className="col-auto">
              <div className="category-card">
                <img
                  src={cat.cImage || "https://via.placeholder.com/80x60"}
                  alt={cat.cName}
                  className="category-img"
                //   style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                />

                <div className="overlay">
                  <h5 className="overlay-text">{cat.cName}</h5>
                  <div className="overlay-actions">
                    <button
                      className="btn btn-sm btn-light me-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>

              <div className="category-name-below">{cat.cName}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No categories available</p>
        )}
      </div>

      {/* Add Category Modal */}
      <AddCategory
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddCategory}
      />

      {/* Edit Category Modal */}
      <UpdateCategory
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        category={selectedCategory}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default Categories;
