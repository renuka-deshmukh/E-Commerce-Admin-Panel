import React, { useState, useEffect } from "react";
import { deleteCategory, getAllCategories } from "../../services/categoryApi";
import { FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
            toast.error("Error fetching categories ❌");
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Category?")) return;
        try {
            const response = await deleteCategory(id)
            if (response.data.success) {
                toast.success("Category deleted successfully");
                fetchData();
            }
        } catch (error) {
            toast.error("Error deleting categories ❌");
        }
    }

    return (
        <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📂 Categories</h4>
                <button
                    className="btn"
                    style={{
                        background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                        color: "white",
                        borderRadius: "8px",
                    }}
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
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteCategory(cat.id)}
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

            {/* Add Category Modal */}
            
            <AddCategory
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={fetchData}
            />
        </div>
    );
};

export default Categories;
