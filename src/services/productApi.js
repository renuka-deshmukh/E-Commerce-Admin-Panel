import axiosInstance from "./api";

export const getAllProducts = () => axiosInstance.get('/product/getAllProducts');

export const createProduct = (formData) =>  axiosInstance.post("/product/createProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
});

export const deleteProduct = (id) => axiosInstance.delete(`/product/deleteProduct/${id}`);

export const updateProduct = (id, formData) => axiosInstance.put(`/product/updateProduct/${id}`, formData)