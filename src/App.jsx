import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./features/categories/thunks/fetchCategories.js";
import { fetchWishlist } from "./features/wishlist/thunks/fetchWishlist.js";
import { fetchCart } from "./features/cart/thunks/fetchCart.js";
import { ToastContainer } from "react-toastify";

const Layout = lazy(() => import("./layout/Layout.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const EmailVerification = lazy(
  () => import("./pages/EmailVerification/EmailVerification.jsx"),
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all[
      ((dispatch(fetchCategories()), dispatch(fetchWishlist())),
      dispatch(fetchCart()))
    ];
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Main Pages */}
            <Route index element={<Home />} />
            <Route path="shop" element={<></>} />
            <Route path="categories" element={<></>} />
            <Route path="brands" element={<></>} />
            <Route path="blog" element={<></>} />
            <Route path="hot-deals" element={<></>} />

            {/* Support Pages */}
            <Route path="help" element={<></>} />
            <Route path="contact" element={<></>} />
            <Route path="about" element={<></>} />

            {/* Shopping Pages */}
            <Route path="cart" element={<></>} />
            <Route path="wishlist" element={<></>} />
            <Route path="checkout" element={<></>} />
            <Route path="profile" element={<></>} />

            {/* Product Details */}
            <Route path="product/:productId" element={<></>} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<></>} />
          <Route path="/verify-otp" element={<EmailVerification />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        rtl={false}
        theme={localStorage.getItem("theme") || "light"}
        limit={3}
      />
    </>
  );
};

export default App;
