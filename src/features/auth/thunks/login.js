import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, getCSRFTokenRequest } from "../../../api/auth/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const loginResponse = await loginRequest(credentials);

      const { accessToken } = loginResponse.data;

      const CSRFResponse = await getCSRFTokenRequest(accessToken);

      const CSRFToken = CSRFResponse.data.csrfToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("CSRFToken", CSRFToken);

      return {
        ...loginResponse,
        CSRFToken,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
