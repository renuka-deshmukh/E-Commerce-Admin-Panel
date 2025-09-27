import axiosInstance from "./api";

export const getAllCategories = () => axiosInstance.get('/category/getAllCategories');

export const createCategory = (data) => axiosInstance.post('/category/createCategory', data);

export const deleteCategory = (id) => axiosInstance.delete(`/category/deleteCategory/${id}`);