import React, { useEffect, useState } from 'react'
import { updateCategory } from '../../services/categoryApi';
import { toast } from 'react-toastify';

const UpdateCategory = ({show, onClose, category, onUpdated}) => {

    const [formData, setFormData] = useState({ cName: ""});

  useEffect(()=>{
    if(category){
        setFormData({
            cName: category.cName || ""
        })
    }
  }, [category])

  const handleChange = (e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await updateCategory(category.id, { cName: formData.cName });

    if (response.data.success) {
      toast.success("Category updated successfully");
      onUpdated();
      onClose();
    } else {
      toast.error("Failed to update category");
    }
  } catch (error) {
    toast.error("Error updating category");
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
              background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            }}
          >
            <h5 className="m-0">Edit Category</h5>
          </div>

          {/* Form */}
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
                  background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
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
  )
}

export default UpdateCategory