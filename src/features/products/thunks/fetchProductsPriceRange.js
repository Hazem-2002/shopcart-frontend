import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsPriceRange = createAsyncThunk(
  "products/fetchProductsPriceRange",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params.append(`${key}[]`, item);
          });
        } else if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await axios.get(
        `/api/v1/products/price-range?${params.toString()}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
