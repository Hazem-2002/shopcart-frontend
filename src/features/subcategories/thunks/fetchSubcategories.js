import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubcategoriesRequest } from "../../../api/subcategory/subcategory";

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

      const response = await fetchSubcategoriesRequest(params);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
