import api from "../axios";

export const fetchCategoriesRequest = () => api.get("/categories");
