import axiosInstance from "./api";

export const getAllBrands = () => axiosInstance.get('/brand/getAllBrands');

export const createBrands = (formData) =>
  axiosInstance.post("/brand/createBrand", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getBrandById = (id) =>
  axiosInstance.get(`/brand/getBrandsById/${id}`);

export const deleteBrand = (id) => axiosInstance.delete(`/brand/deleteBrands/${id}`);

export const updateBrand = (id, formData) => axiosInstance.put(`/brand/updateBrand/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });