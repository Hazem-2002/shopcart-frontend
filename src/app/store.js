import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import subcategoryReducer from "../features/subcategories/subcategorySlice";
import brandReducer from "../features/brands/brandSlice";
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer,
    brands: brandReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});
