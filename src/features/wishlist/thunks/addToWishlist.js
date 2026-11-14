import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (_id, { getState, rejectWithValue }) => {
    try {
      const { accessToken, CSRFToken } = getState().auth;

      const response = await axios.patch(
        `https://e-commerce-backend-eight-umber.vercel.app/api/v1/wishlists/${_id}/add`,
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
