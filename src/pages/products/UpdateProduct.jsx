import React, { useEffect, useState } from 'react'
import { updateProduct } from '../../services/productApi';
import { toast } from 'react-toastify';

const UpdateProduct = ({ show, onClose, product, categories, brands, onUpdated }) => {

    const [formData, setFormData] = useState({
        pName: "",
        pDescription: "",
        price: "",
        quentity: "",
        catID: "",
        brandID: "",

    });

    useEffect(() => {
        if (product) {
            setFormData({
                pName: product.pName || "",
                pDescription: product.pDescription || "",
                price: product.price || "",
                quentity: product.quentity || "",
                catID: product.catID || "",
                brandID: product.brandID || "",
            })
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateProduct(product.id, formData)
            if (response.data.success) {
                toast.success("Product added successfully")
                onUpdated();
                onClose();
            } else {
                toast.error("Failed to update product")
            }

        } catch (error) {
            toast.error("Error updating product");
        }
    }

    if (!show) return null;


    return (
        <div
  className="modal show d-block"
  tabIndex="-1"
  role="dialog"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // ✅ dark background overlay
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
          background: "linear-gradient(90deg, #8dace2ff, #6a11cb)",
        }}
      >
        <h5 className="m-0">Edit Product</h5>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pName"
          value={formData.pName}
          onChange={handleChange}
          placeholder="Product Name"
          className="form-control mb-3"
        />

        <textarea
          name="pDescription"
          value={formData.pDescription}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-3"
          rows="3"
        />

        <div className="d-flex gap-3 mb-3">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="form-control"
          />
          <input
            type="number"
            name="quentity"
            value={formData.quentity}
            onChange={handleChange}
            placeholder="Quantity"
            className="form-control"
          />
        </div>

        <select
          name="catID"
          value={formData.catID}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.cName}
            </option>
          ))}
        </select>

        <select
          name="brandID"
          value={formData.brandID}
          onChange={handleChange}
          className="form-control mb-4"
        >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.bName}
            </option>
          ))}
        </select>

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
              background: "linear-gradient(90deg, #2575fc, #6a11cb)",
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

export default UpdateProduct