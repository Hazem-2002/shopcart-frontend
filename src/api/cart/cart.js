import api from "../axios";

export const addToCartRequest = (cartData) => api.post("/carts/add", cartData);

export const fetchCartRequest = () => api.get("/carts/my-cart");
