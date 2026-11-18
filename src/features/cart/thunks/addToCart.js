import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartRequest } from "../../../api/cart/cart";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await addToCartRequest(cartData);

      return response;
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
