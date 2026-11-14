import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (_id, { getState, rejectWithValue }) => {
    try {
      const { accessToken, CSRFToken } = getState().auth;

      const response = await axios.patch(
        `/api/v1/wishlists/${_id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${
              accessToken || localStorage.getItem("accessToken")
            }`,
            "x-csrf-token": CSRFToken || localStorage.getItem("csrfToken"),
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
