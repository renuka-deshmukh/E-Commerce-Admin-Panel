import axiosInstance from "./api";

export const getAllProducts = () => axiosInstance.get('/product/getAllProducts');

export const createProduct = (productData) => axiosInstance.post('/product/createProduct', productData);

export const deleteProduct = (id) => axiosInstance.delete(`/product/deleteProduct/${id}`);

export const updateProduct = (id, formData) => axiosInstance.put(`/product/updateProduct/${id}`, formData)