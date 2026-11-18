import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentUserRequest } from "../../../api/user/user";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCurrentUserRequest();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
