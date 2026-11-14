import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue, getState }) => {
    try {
      const { accessToken, CSRFToken } = getState().auth;

      const response = await axios.post("/api/v1/carts/add", cartData, {
        headers: {
          Authorization: `Bearer ${
            accessToken || localStorage.getItem("accessToken")
          }`,
          "x-csrf-token": CSRFToken || localStorage.getItem("csrfToken"),
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
