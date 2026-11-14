import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page, limit, sort, fields, search, ...productsFilters } = {},
    { rejectWithValue },
  ) => {
    console.log("fetchProducts called with:", {
      page,
      limit,
      sort,
      fields,
      search,
      ...productsFilters,
    });
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
      console.log("params", params.toString());
      const response = await axios.get(
        `https://e-commerce-backend-eight-umber.vercel.app/api/v1/products?${params.toString()}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
