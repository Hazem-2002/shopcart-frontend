import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWishlistRequest } from "../../../api/wishlist/wishlist";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async ({ page, limit, sort, fields, search } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (sort) params.append("sort", sort);
      if (fields) params.append("fields", fields);
      if (search) params.append("search", search);

      const response = await fetchWishlistRequest(params);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
