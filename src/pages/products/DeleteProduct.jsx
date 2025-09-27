
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteProduct } from '../../services/productApi';

const DeleteProduct = ({ productID, onDelete }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this Product?")) return;
        try {
            const response = await deleteProduct(productID);
            if (response.data.success) {
                toast.success("Product deleted successfully");
                onDelete();
            }
        } catch (error) {
            toast.error("Error deleting Product:", error);
        }
    };
    return (
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            <FaTrash />
        </button>
    )
}

export default DeleteProduct