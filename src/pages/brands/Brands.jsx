import React, { useEffect, useState } from "react";
import { createBrands, deleteBrand, getAllBrands } from "../../services/brandApi";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import AddBrand from "./AddBrand";
import UpdateBrand from "./UpdateBrand";
import "./Brands.css"; 

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBrand, setNewBrand] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    async function fetchData() {
        try {
            const response = await getAllBrands();
            if (response.data.success) {
                setBrands(response.data.brands || []);
            } else {
                setBrands([]);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            setBrands([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddBrand = async (e) => {
        e.preventDefault();
        if (!newBrand.trim()) return;

        try {
            const response = await createBrands({ bName: newBrand });
            if (response.data.success) {
                toast.success("Brand created successfully ✅");
                setNewBrand("");
                setShowModal(false);
                fetchData();
            } else {
                toast.error("Failed to create brand ❌");
            }
        } catch (error) {
            toast.error("Error creating brand ❌");
        }
    };

    const handleDeleteBrand = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            const response = await deleteBrand(id);
            if (response.data.success) {
                toast.success("Brand deleted successfully ✅");
                fetchData();
            }
        } catch (error) {
            toast.error("Error deleting brand ❌");
        }
    };

    return (
        <div className="brands-page p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold custom-font">🏷️ Brands</h3>
                <button
                    className="btn btn-gradient"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add Brand
                </button>
            </div>

            {/* Brands Grid */}
            <div className="row g-4">
                {brands.length > 0 ? (
                    brands.map((brand, i) => (
                        <div key={brand.id || i} className="col-auto">
                            {/* Card */}
                            <div className="category-card">
                                <img
                                    src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60" 
                                    alt={brand.bName}
                                    className="category-img"
                                />

                                <div className="overlay">
                                    <h5 className="overlay-text">{brand.bName}</h5>
                                    <div className="overlay-actions">
                                        <button
                                            className="btn btn-sm btn-light me-2"
                                            onClick={() => {
                                                setSelectedBrand(brand);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteBrand(brand.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Name below card */}
                            <div className="category-name-below">{brand.bName}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No brands available</p>
                )}
            </div>

            {/* Add Brand Modal */}
            <AddBrand
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddBrand}
                newBrand={newBrand}
                setNewBrand={setNewBrand}
            />

            {/* Update Brand Modal */}
            <UpdateBrand
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                brand={selectedBrand}
                onUpdated={fetchData}
            />
        </div>
    );
};

export default Brands;
