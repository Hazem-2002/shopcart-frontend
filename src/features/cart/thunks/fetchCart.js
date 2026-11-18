import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartRequest } from "../../../api/cart/cart";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCartRequest();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
