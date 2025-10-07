import React, { useState } from "react";

const AddBrand = ({ show, onClose, onSubmit }) => {
  const [bName, setBName] = useState("");
  const [bImage, setBImage] = useState(null);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bName.trim()) return alert("Please enter a brand name");

    const formData = new FormData();
    formData.append("bName", bName);
    if (bImage) formData.append("myfile", bImage); // must match backend multer field name

    onSubmit(formData);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-3 border-0">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add New Brand</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <div className="modal-body p-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Brand Name"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                required
              />

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setBImage(e.target.files[0])}
              />
            </div>

            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Brand
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
