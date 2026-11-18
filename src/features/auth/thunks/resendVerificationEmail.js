import { createAsyncThunk } from "@reduxjs/toolkit";
import { resendVerificationEmailRequest } from "../../../api/auth/auth";

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (_, { rejectWithValue }) => {
    try {
      return await resendVerificationEmailRequest();
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Something went wrong",
        },
      );
    }
  },
);
