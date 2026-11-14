import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./thunks/fetchCart";
import { addToCart } from "./thunks/addToCart";

const initialState = {
  cart: [],
  count: 0,
  isLoading: false,
  success: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.count = 0;
      state.error = null;
      state.success = false;
    },

    // Optimistic Count Update
    optimisticAddToCart: (
      state,
      { payload: { productId, quantity, variants = null } },
    ) => {
      let cartItem = state.cart?.cartItems.find(
        (item) => item.product._id === productId,
      );

      // Add product if not exists
      if (!cartItem) {
        cartItem = {
          _id: `temp-${productId}`,
          product: { _id: productId },
          quantity: 0,
          variants: [],
        };

        state.cart.cartItems.push(cartItem);
      }

      // Handle variants
      if (variants?.length) {
        const { variantId } = variants[0];

        let variantInCart = cartItem.variants.find(
          (item) => item.variantId === variantId,
        );

        if (!variantInCart) {
          variantInCart = {
            variantId,
            quantity: 0,
          };

          cartItem.variants.push(variantInCart);
        }

        variantInCart.quantity += quantity;
      }

      cartItem.quantity += quantity;
      state.count += quantity;
    },

    // Rollback Count Update
    rollbackAddToCart: (
      state,
      { payload: { productId, quantity, variants = null } },
    ) => {
      const cartItem = state.cart?.cartItems.find(
        (item) => item.product._id === productId,
      );

      if (!cartItem) return;

      // Handle variants
      if (variants?.length) {
        const { variantId } = variants[0];

        const variantIndex = cartItem.variants.findIndex(
          (item) => item.variantId === variantId,
        );

        if (variantIndex !== -1) {
          const variantInCart = cartItem.variants[variantIndex];

          variantInCart.quantity -= quantity;

          if (variantInCart.quantity <= 0) {
            cartItem.variants.splice(variantIndex, 1);
          }
        }
      }

      cartItem.quantity -= quantity;

      // Remove product if quantity is zero
      if (cartItem.quantity <= 0) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.product._id !== productId,
        );
      }

      state.count = Math.max(0, state.count - quantity);
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.cart = action.payload.data?.cart;
        state.count = action.payload.data?.cart?.quantity || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Add To Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;

        const cartItem = action.payload.data?.cartItem;

        if (!cartItem) return;

        // Find optimistic item by product ID
        const existingItemIndex = state.cart.cartItems.findIndex(
          (item) => item.product._id === cartItem.product._id,
        );

        if (existingItemIndex !== -1) {
          const existingItem = state.cart.cartItems[existingItemIndex];

          // Preserve optimistic quantities
          state.cart.cartItems[existingItemIndex] = {
            ...cartItem,
            quantity: existingItem.quantity,
            variants:
              cartItem.variants?.map((variant) => {
                const existingVariant = existingItem.variants?.find(
                  (item) => item.variantId === variant.variantId,
                );

                return {
                  ...variant,
                  quantity: existingVariant?.quantity ?? 0,
                };
              }) || [],
          };
        } else {
          state.cart.cartItems.unshift(cartItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, optimisticAddToCart, rollbackAddToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
