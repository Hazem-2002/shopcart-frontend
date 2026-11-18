import api from "../axios";

export const addToWishlistRequest = (_id) =>
  api.patch(`/wishlists/${_id}/add`, {});

export const deleteFromWishlistRequest = (_id) =>
  api.patch(`/wishlists/${_id}/delete`, {});

export const fetchWishlistRequest = (params) =>
  api.get("/users/me/wishlist", { params });

export const toggleWishlistRequest = (_id) =>
  api.patch(`/wishlists/${_id}/toggle`, {});
