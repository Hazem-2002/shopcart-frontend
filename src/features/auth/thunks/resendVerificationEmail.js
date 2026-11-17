import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (_, { rejectWithValue }) => {
    try {
      const API_URL = "/api/v1";

      const { data } = await axios.post(
        `${API_URL}/auth/resend-verification-email`,
        {},
        {
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Something went wrong",
        },
      );
    }
  },
);
