import api from "../axios";

export const fetchProductsRequest = (params) =>
  api.get("/products", { params });

export const fetchProductsPriceRangeRequest = (params) =>
  api.get("/products/price-range", { params });
