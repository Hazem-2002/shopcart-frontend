import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/refresh-token",
        {},
        {
          withCredentials: true,
        },
      );

      const { accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);

      return response.data;
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
