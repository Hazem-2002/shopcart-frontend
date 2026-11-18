import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsRequest } from "../../../api/product/product";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page, limit, sort, fields, search, ...productsFilters } = {},
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();

      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (sort) params.append("sort", sort);
      if (fields) params.append("fields", fields);
      if (search) params.append("search", search);

      Object.entries(productsFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params.append(`${key}[]`, item);
          });
        } else if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await fetchProductsRequest(params);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
