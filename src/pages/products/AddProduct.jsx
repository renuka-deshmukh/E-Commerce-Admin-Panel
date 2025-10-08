import React, { useEffect, useState } from "react";

const AddProduct = ({ show, onClose, onSubmit, categories, brands }) => {
  const [pName, setPName] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quentity, setQuentity] = useState("");
  const [catID, setCatID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [pImage, setPImage] = useState([]);

  useEffect(() => {
    if (show) {
      setPName("");
      setPDescription("");
      setPrice("");
      setQuentity("");
      setCatID("");
      setBrandID("");
      setPImage([]);
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pName.trim()) return alert("Please enter product name");
    if (!price) return alert("Please enter price");
    if (!brandID) return alert("Please select brand");

    const formData = new FormData();
    formData.append("pName", pName);
    formData.append("pDescription", pDescription);
    formData.append("price", price);
    formData.append("quentity", quentity);
    formData.append("catID", catID);
    formData.append("brandID", brandID);
   if(pImage) formData.append("myfile", pImage);

    onSubmit(formData);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-3 border-0">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">➕ Add New Product</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <div className="modal-body p-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Product Name"
                value={pName}
                onChange={(e) => setPName(e.target.value)}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={pDescription}
                onChange={(e) => setPDescription(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Quantity"
                value={quentity}
                onChange={(e) => setQuentity(e.target.value)}
              />
              <select
                className="form-control mb-3"
                value={catID}
                onChange={(e) => setCatID(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.cName}</option>
                ))}
              </select>
              <select
                className="form-control mb-3"
                value={brandID}
                onChange={(e) => setBrandID(e.target.value)}
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.bName}</option>
                ))}
              </select>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => setPImage(e.target.files[0])}
              />
            </div>

            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
