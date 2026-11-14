import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (
    { page, limit, sort, fields, search } = {},
    { getState, rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();

      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (sort) params.append("sort", sort);
      if (fields) params.append("fields", fields);
      if (search) params.append("search", search);

      const { accessToken } = getState().auth;

      const response = await axios.get(
        `/api/v1/users/me/wishlist?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${
              accessToken || localStorage.getItem("accessToken")
            }`,
          },
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
