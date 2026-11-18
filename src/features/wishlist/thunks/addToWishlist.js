import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishlistRequest } from "../../../api/wishlist/wishlist";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await addToWishlistRequest(_id);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
