import React from "react";

const AddProduct = ({
  show,
  onClose,
  onSubmit,
  newProduct,
  setNewProduct,
  categories,
  brands,
}) => {
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
          <form onSubmit={onSubmit}>
            {/* Modal Header */}
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                color: "white",
                borderBottom: "none",
              }}
            >
              <h5 className="modal-title">➕ Add New Product</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              {/* Product Name */}
              <input
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Product Name"
                value={newProduct.pName || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, pName: e.target.value })
                }
                required
                style={{ borderRadius: "8px" }}
              />

              {/* Description */}
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={newProduct.pDescription || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, pDescription: e.target.value })
                }
                rows="3"
                style={{ borderRadius: "8px" }}
              ></textarea>

              {/* Price */}
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                value={newProduct.price || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
                style={{ borderRadius: "8px" }}
              />

              {/* Quantity */}
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Quantity"
                value={newProduct.quentity || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quentity: e.target.value })
                }
                required
                style={{ borderRadius: "8px" }}
              />

              {/* Category Select */}
              <select
                className="form-control mb-3"
                value={newProduct.catID || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, catID: e.target.value })
                }
                required
                style={{ borderRadius: "8px" }}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.cName}
                  </option>
                ))}
              </select>

              {/* Brand Select */}
              <select
                className="form-control"
                value={newProduct.brandID || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brandID: e.target.value })
                }
                required
                style={{ borderRadius: "8px" }}
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bName}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Footer */}
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
