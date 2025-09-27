import React, { useEffect, useState } from "react";
import { updateBrand } from "../../services/brandApi";
import { toast } from "react-toastify";

const UpdateBrand = ({ show, onClose, brand, onUpdated }) => {
  const [formData, setFormData] = useState({ bName: "" });

  useEffect(() => {
    if (brand) {
      setFormData({
        bName: brand.bName || "",
      });
    }
  }, [brand]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBrand(brand.id, { bName: formData.bName });
      if (response.data.success) {
        toast.success("Brand updated successfully");
        onUpdated();
        onClose();
      } else {
        toast.error("Failed to update brand");
      }
    } catch (error) {
      toast.error("Error updating brand");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content p-4 shadow-lg"
          style={{ borderRadius: "16px", border: "none" }}
        >
          {/* Header */}
          <div
            className="mb-3 p-3 text-white"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
            }}
          >
            <h5 className="m-0">Edit Brand</h5>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="bName"
              value={formData.bName}
              onChange={handleChange}
              placeholder="Brand Name"
              className="form-control mb-4"
              required
            />

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  background: "linear-gradient(90deg, #43cea2, #185a9d)",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrand;
