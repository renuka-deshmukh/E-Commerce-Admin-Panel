import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory } from "../services/categoryApi";
import { FaTrash, FaPlus } from "react-icons/fa";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false); // modal state
    const [newCategory, setNewCategory] = useState(""); // input value

    // fetch categories
    async function fetchData() {
        try {
            const response = await getAllCategories();
            if (response.data.success) {
                setCategories(response.data.categories || []);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // handle add category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const response = await createCategory({ cName: newCategory });
            if (response.data.success) {
                alert("Category created successfully");
                setNewCategory("");
                setShowModal(false);
                fetchData();
            } else {
                alert("Failed to create category");
            }
        } catch (error) {
            console.error("Error creating category:", error);
            alert("Error creating category");
        }
    };

    return (
        <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📂 Categories</h4>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add Category
                </button>
            </div>

            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((cat, i) => (
                            <tr key={cat.id || i}>
                                <td>{i + 1}</td>
                                <td>{cat.cName}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                    // onClick={() => handleDelete(cat.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No category available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Bootstrap Modal */}
            {showModal && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)", // slightly darker overlay
                        backdropFilter: "blur(3px)", // blur background for depth
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
                            <form onSubmit={handleAddCategory}>
                                <div
                                    className="modal-header"
                                    style={{
                                        background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                                        color: "white",
                                        borderBottom: "none",
                                    }}
                                >
                                    <h5 className="modal-title">➕ Add New Category</h5>
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
                                        placeholder="Category Name"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
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
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Categories;
