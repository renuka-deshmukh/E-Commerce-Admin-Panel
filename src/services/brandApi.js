import axiosInstance from "./api";

export const getAllBrands = () => axiosInstance.get('/brand/getAllBrands');

export const createBrands = (brandData) => axiosInstance.post('/brand/createBrand', brandData);

export const deleteBrand = (id) => axiosInstance.delete(`/brand/deleteBrands/${id}`);

export const updateBrand = (id, formData) => axiosInstance.put(`/brand/updateBrand/${id}`, formData)