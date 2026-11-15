import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const API_URL = "/api/v1";

      const loginResponse = await axios.post(
        `${API_URL}/auth/login`,
        credentials,
        {
          withCredentials: true,
        },
      );

      const { accessToken } = loginResponse.data.data;

      const CSRFResponse = await axios.get(`${API_URL}/auth/csrf-token`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const csrfToken = CSRFResponse.data.data.csrfToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("csrfToken", csrfToken);

      toast.success("Login successful!");

      return {
        ...loginResponse.data,
        csrfToken,
      };
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
