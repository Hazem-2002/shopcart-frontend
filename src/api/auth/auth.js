import api from "../axios";

export const loginRequest = (credentials) =>
  api.post("/auth/login", credentials);

export const logoutRequest = () => api.post("/auth/logout");

export const getCSRFTokenRequest = (accessToken) =>
  api.get("/auth/csrf-token", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const forgotPasswordRequest = (email) =>
  api.post("/auth/password/forgot", { email });

export const registerRequest = (userData) =>
  api.post("/auth/register", userData);

export const resendResetOTPRequest = () =>
  api.post("/auth/password/forgot/resend", {});

export const resendVerificationEmailRequest = () =>
  api.post("/auth/resend-verification-email", {});

export const resetPasswordRequest = ({ password, confirmPassword }) =>
  api.post("/auth/password/reset", {
    newPassword: password,
    confirmPassword,
  });

export const verifyEmailRequest = (otp) =>
  api.post("/auth/verify-email", { otp });

export const verifyResetOTPRequest = (otp) =>
  api.post("/auth/password/verify-otp", { otp });
