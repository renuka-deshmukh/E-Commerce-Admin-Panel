import React, { useEffect, useState } from "react";
import { createBrands, deleteBrand, getAllBrands } from "../../services/brandApi";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import AddBrand from "./AddBrand";
import UpdateBrand from "./UpdateBrand";

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
                toast("Brand created successfully");
                setNewBrand("");
                setShowModal(false);
                fetchData();
            } else {
                toast("Failed to create brand");
            }
        } catch (error) {
            toast.error("Error creating brand:", error);
        }
    };

    const handleDeleteBrand = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            const response = await deleteBrand(id);
            if (response.data.success) {
                toast.success("Brand deleted successfully");
                fetchData();
            }
        } catch (error) {
            toast.error("Error deleting brand:", error);
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

            {/* Brands Table */}
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
                                    <button className="btn btn-sm btn-primary me-2"
                                        onClick={() => {
                                            setSelectedBrand(brand);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteBrand(brand.id)} // pass the actual id
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

            {/* ✅ Separate AddBrandModal Component */}

            <AddBrand
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddBrand}
                newBrand={newBrand}
                setNewBrand={setNewBrand}
            />

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
