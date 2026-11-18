import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Components
import AuthLoader from "../components/UI/AuthLoader";

// Thunk & Actions
import { logout } from "../features/auth/authSlice";
import { fetchCurrentUser } from "../../features/auth/thunks/fetchCurrentUser";

export default function ProtectedRoute() {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && !user) {
        try {
          await dispatch(fetchCurrentUser()).unwrap();
        } catch (error) {
          console.log(error);
          dispatch(logout());
        }
      }
    };

    fetchUser();
  }, [dispatch, user, accessToken]);

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
