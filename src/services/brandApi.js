import axiosInstance from "./api";

export const getAllBrands = () => axiosInstance.get('/brand/getAllBrands');

export const createBrands = (brandData) => axiosInstance.post('/brand/createBrand', brandData);