import React from "react";

const AddBrand = ({ show, onClose, onSubmit, newBrand, setNewBrand }) => {
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
                        {/* Header */}
                        <div
                            className="modal-header"
                            style={{
                                background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                                color: "white",
                                borderBottom: "none",
                            }}
                        >
                            <h5 className="modal-title">➕ Add New Brand</h5>
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
                                className="form-control form-control-lg"
                                placeholder="Brand Name"
                                value={newBrand}
                                onChange={(e) => setNewBrand(e.target.value)}
                                required
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid #ced4da",
                                    padding: "10px 14px",
                                }}
                            />
                        </div>

                        {/* Footer */}
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
