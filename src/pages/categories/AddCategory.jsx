import React, { useState } from "react";
import { createCategory } from "../../services/categoryApi";
import { toast } from "react-toastify";

const AddCategory = ({ show, onClose, onSuccess }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const response = await createCategory({ cName: newCategory });
      if (response.data.success) {
        toast.success("Category created successfully ✅");
        setNewCategory("");
        onSuccess(); // refresh categories
        onClose();   // close modal
      } else {
        toast.error("Failed to create category ❌");
      }
    } catch (error) {
      toast.error("Error creating category ❌");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content shadow-lg"
          style={{
            borderRadius: "12px",
            border: "none",
            overflow: "hidden",
          }}
        >
          <form onSubmit={handleAddCategory}>
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                color: "white",
                borderBottom: "none",
              }}
            >
              <h5 className="modal-title">➕ Add New Category</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body p-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  padding: "10px 14px",
                }}
              />
            </div>

            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #dee2e6",
                padding: "15px 20px",
              }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                style={{ borderRadius: "8px", minWidth: "100px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "8px",
                  minWidth: "120px",
                  background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                  border: "none",
                }}
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
