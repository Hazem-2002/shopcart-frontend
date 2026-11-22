import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

// Thunks
import { fetchCurrentUser } from "../../features/auth/thunks/fetchCurrentUser";
import { fetchCart } from "../../features/cart/thunks/fetchCart";
import { fetchWishlist } from "../../features/wishlist/thunks/fetchWishlist.js";
import { logout } from "../../features/auth/thunks/logout.js";

// Components
import AuthLoader from "../UI/AuthLoader/AuthLoader";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { accessToken, user, CSRFToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const initialize = async () => {
      if (!accessToken || !CSRFToken) return;

      try {
        // Fetch current user only if not already available
        if (!user) {
          setLoading(true);
          await dispatch(fetchCurrentUser()).unwrap();
        }

        // Fetch cart and wishlist in background
        dispatch(fetchCart());
        dispatch(fetchWishlist());
      } catch (error) {
        console.error("Auth initialization failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initialize();

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  if (loading) {
    return <AuthLoader />;
  }

  return <Outlet />;
}
