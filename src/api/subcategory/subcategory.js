import api from "../axios";

export const fetchSubcategoriesRequest = (params) =>
  api.get("/subcategories", { params });
