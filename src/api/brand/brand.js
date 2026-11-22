import api from "../axios";

export const fetchBrandsRequest = (params) => api.get("/brands", { params });
