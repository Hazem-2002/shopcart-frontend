import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleWishlistRequest } from "../../../api/wishlist/wishlist";

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await toggleWishlistRequest(_id);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
