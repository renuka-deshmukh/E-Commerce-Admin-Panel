import axiosInstance from "./api";

export const getAllCategories = () => axiosInstance.get('/category/getAllCategories');

export const createCategory = (formData) => 
    axiosInstance.post('/category/createCategory', formData,{
     headers: { "Content-Type": "multipart/form-data" },
});

export const deleteCategory = (id) => axiosInstance.delete(`/category/deleteCategory/${id}`);

export const updateCategory = (id, formData) => axiosInstance.put(`/category/updateCategory/${id}`, formData,{
    headers: { "Content-Type": "multipart/form-data" },
});