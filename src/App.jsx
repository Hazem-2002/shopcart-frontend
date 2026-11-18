import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

const AuthInitializer = lazy(
  () => import("./components/providers/AuthInitializer.jsx"),
);
const Layout = lazy(() => import("./layout/Layout.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const EmailVerification = lazy(
  () => import("./pages/EmailVerification/EmailVerification.jsx"),
);
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword.jsx"),
);
const ResetPasswordVerification = lazy(
  () =>
    import("./pages/ResetPasswordVerification/ResetPasswordVerification.jsx"),
);
const ResetPassword = lazy(
  () => import("./pages/ResetPassword/ResetPassword.jsx"),
);

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthInitializer />}>
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
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/verify"
            element={<ResetPasswordVerification />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
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
