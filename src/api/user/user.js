import api from "../axios";

export const fetchCurrentUserRequest = () => api.get("/users/me");
