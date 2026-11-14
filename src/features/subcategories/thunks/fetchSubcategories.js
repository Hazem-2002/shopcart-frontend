import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async ({ page, limit, fields, search, sort } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (fields) params.append("fields", fields);
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);

      const response = await axios.get(
        `/api/v1/subcategories?${params.toString()}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
