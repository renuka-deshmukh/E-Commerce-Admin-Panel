import React, { useEffect, useState } from "react";
import { updateCategory } from "../../services/categoryApi";
import { toast } from "react-toastify";

const UpdateCategory = ({ show, onClose, category, onUpdated }) => {
  const [formData, setFormData] = useState({
    cName: "",
    cImage: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        cName: category.cName || "",
        cImage: null,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cImage") {
      setFormData({ ...formData, cImage: files[0] }); // store file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Properly build FormData
      const data = new FormData();
      data.append("myfile", formData.cName);
      if (formData.cImage) data.append("myfile", formData.cImage);

      const response = await updateCategory(category.id, data);

      if (response.data.success) {
        toast.success("Category updated successfully");
        onUpdated();
        onClose();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating category ❌");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 shadow-lg" style={{ borderRadius: "16px" }}>
          <div
            className="mb-3 p-3 text-white"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            }}
          >
            <h5 className="m-0">Edit Category</h5>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="cName"
              value={formData.cName}
              onChange={handleChange}
              placeholder="Category Name"
              className="form-control mb-4"
              required
            />

            <input
              type="file"
              name="cImage"
              onChange={handleChange}
              className="form-control mb-4"
              accept="image/*"
            />

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
                className="btn text-white"
                style={{
                  background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
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

export default UpdateCategory;
