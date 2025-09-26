import React, { useEffect, useState } from 'react'
import { createBrands, getAllBrands } from '../services/brandApi';
import { FaTrash, FaPlus } from "react-icons/fa";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBrand, setNewBrand] = useState("");


    async function fetchData() {
        try {
            const response = await getAllBrands();
            if (response.data.success) {
                setBrands(response.data.brands || [])
            }
            else {
                setBrands([]);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            setBrands([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleAddBrand = async (e) => {
        e.preventDefault();
        if (!newBrand.trim()) return;

        try {
           const response = await createBrands({ bName: newBrand });
            if (response.data.success) {
                alert("Brand created successfully");
                setNewBrand("");
                setShowModal(false);
                fetchData();
            } else {
                alert("Failed to create brand");
            }
        } catch (error) {
            console.error("Error creating brans:", error);
            alert("Error creating brand");
        }
    };


    return (
        <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4> Brands</h4>
                <button
                    className="btn"
                    style={{
                        background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                        color: "white",
                        borderRadius: "8px",
                    }}
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add New Brand
                </button>
            </div>

            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.length > 0 ? (
                        brands.map((brand, i) => (
                            <tr key={brand.id || i}>
                                <td>{i + 1}</td>
                                <td>{brand.bName}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                    // onClick={() => handleDelete(brand.id)} 
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No brand available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && (
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
                            <form onSubmit={handleAddBrand}>
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
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

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
                                        onClick={() => setShowModal(false)}
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
            )}


        </div>
    );

}

export default Brands