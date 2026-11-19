import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import subcategoryReducer from "../features/subcategories/subcategorySlice";
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});
