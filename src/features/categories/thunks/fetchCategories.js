import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesRequest } from "../../../api/category/category";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriesRequest();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
