import React, { useState, useEffect } from "react";
import { deleteCategory, getAllCategories } from "../../services/categoryApi";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import "./Categories.css"; // ✅ custom CSS

const Categories = () => {

    const categoryImages = {
        "Fashion & Accessories": "https://media.istockphoto.com/id/613654620/photo/fashionable-big-red-handbag-on-the-arm-of-the-girl.jpg?s=612x612&w=0&k=20&c=dqLeJBiFSxhj-ZWgbrU5oeSftTCTQo6BEGxGgGMCiIo=",
        "Electronics & Gadgets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
        "Home & Living": "https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZSUyMCUyNiUyMExpdmluZ3xlbnwwfHwwfHx8MA%3D%3D",
        "Watches": "https://images.unsplash.com/photo-1511376777868-611b54f68947",
        "Jewelry": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
        "Kids & Toys": "https://plus.unsplash.com/premium_photo-1684623605109-263925d88106?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2lkcyUyMCUyNiUyMFRveXN8ZW58MHx8MHx8fDA%3D",
        "Books & Stationery": "https://media.istockphoto.com/id/696967312/photo/pupils-on-class-in-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=IXO3_BSxfBGLFZN4VGSJ4mqEV9FZ-z6VxF6Mt8rtQ9w=",
        "Sports & Outdoors": "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BvcnRzJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
        "Sunglasses & Eyewear": "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1bmdsYXNzfGVufDB8fDB8fHww",
        "Snacks": "https://images.unsplash.com/photo-1604908176997-3335a19fc5a5",
        "Beverages": "https://images.unsplash.com/photo-1606788075761-94d3b0db67a2",
    };

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
            const response = await deleteCategory(id);
            if (response.data.success) {
                toast.success("Category deleted successfully");
                fetchData();
            }
        } catch (error) {
            toast.error("Error deleting categories ❌");
        }
    };

    return (
        <div className="categories-page p-3">
            {/* Header with button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold custom-font">📂 Categories</h3>
                <button
                    className="btn btn-gradient"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="row g-4">
                {categories.length > 0 ? (
                    categories.map((cat, i) => (
                        <div key={cat.id || i} className="col-auto">
                            {/* Card */}
                            <div className="category-card">
                                <img
                                    src={categoryImages[cat.cName]}
                                    alt={cat.cName}
                                    className="category-img"
                                />

                                <div className="overlay">
                                    <h5 className="overlay-text">{cat.cName}</h5>
                                    <div className="overlay-actions">
                                        <button
                                            className="btn btn-sm btn-light me-2"
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteCategory(cat.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Name below card */}
                            <div className="category-name-below">{cat.cName}</div>
                        </div>
                    ))

                ) : (
                    <p className="text-center text-muted">No categories available</p>
                )}
            </div>

            {/* Add Category Modal */}
            <AddCategory
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={fetchData}
            />

            {/* Edit Category Modal */}
            <UpdateCategory
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                category={selectedCategory}
                onUpdated={fetchData}
            />
        </div>
    );
};

export default Categories;
