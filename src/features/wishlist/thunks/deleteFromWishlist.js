import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFromWishlistRequest } from "../../../api/wishlist/wishlist";

export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await deleteFromWishlistRequest(_id);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
