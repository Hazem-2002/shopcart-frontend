import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://e-commerce-backend-eight-umber.vercel.app/api/v1/categories",
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
