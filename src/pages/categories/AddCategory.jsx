import React, { useState } from "react";
import { toast } from "react-toastify";

const AddCategory = ({ show, onClose, onSubmit }) => {
  const [cName, setCName] = useState("");
  const [cImage, setCImage] = useState(null);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cName.trim()) {
      return toast.error("Please enter category name ❌");
    }

    const formData = new FormData();
    formData.append("cName", cName);
    if (cImage) formData.append("myfile", cImage); // must match backend multer field name

    onSubmit(formData);

    // Reset fields after submit
    setCName("");
    setCImage(null);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-3 border-0">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">➕ Add New Category</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Category Name"
                value={cName}
                onChange={(e) => setCName(e.target.value)}
                required
              />

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setCImage(e.target.files[0])}
              />
            </div>

            {/* Footer */}
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
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
