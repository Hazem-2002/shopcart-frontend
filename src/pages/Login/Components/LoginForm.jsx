import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Mail, Lock, ArrowRight } from "lucide-react";

import Input from "../../../components/Input";
import Password from "../../../components/Password";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";

// Thunks & Actions
import { login } from "../../../features/auth/thunks/login";

// utils
import { validateEmail, validatePassword } from "../../../utils/validation";

import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) return;

    try {
      await dispatch(
        login({
          email: formData.email.trim(),
          password: formData.password,
        }),
      ).unwrap();

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1800);

      toast.success("Login successful!");
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className="flex w-full flex-col justify-center py-5.5 max-md:px-5 pr-8">
      {/* Heading */}
      <div className="mb-5 flex flex-col gap-2.5">
        <h2 className="bg-gradient-to-br from-primary via-primary/60 to-primary-hover bg-clip-text text-xl font-extrabold leading-tight tracking-tight text-transparent sm:text-2xl lg:text-3xl">
          Sign In
        </h2>

        <p className="text-xs leading-6 text-secondary sm:text-sm">
          Enter your credentials to access your account and continue enjoying
          your shopping experience.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4.5" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Input
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            startIcon={
              <Mail className="!size-3.5 sm:!size-4 text-text-placeholder" />
            }
            helperText={errors.email}
            error={errors.email}
            className="!h-10 !rounded-full"
            value={formData.email}
            onChange={(event) => {
              setErrors({ ...errors, email: "" });
              setFormData({ ...formData, email: event.target.value });
            }}
          />

          <Password
            id="password"
            label="Password"
            helperText={errors.password}
            error={errors.password}
            placeholder="Enter your password"
            startIcon={
              <Lock className="!size-3.5 sm:!size-4 text-text-placeholder" />
            }
            required={true}
            disabled={false}
            labelClassName=""
            helperTextClassName=""
            className="!h-10 !rounded-full"
            value={formData.password}
            onChange={(event) => {
              setErrors({ ...errors, password: "" });
              setFormData({ ...formData, password: event.target.value });
            }}
          />

          {/* Remember Me & Forgot Password */}
          <Checkbox
            id="remember-me"
            label={
              <span className="text-xs text-secondary sm:text-sm">
                Remember me
              </span>
            }
            checked={formData.rememberMe}
            onChange={(event) => {
              setFormData({ ...formData, rememberMe: event.target.checked });
            }}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="group w-full !h-9.5 sm:!h-10"
          endIcon={
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          }
          loading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-secondary">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        className="flex !h-9.5 sm:!h-11 w-full items-center justify-center gap-3 rounded-full border border-border bg-bg-surface text-xs font-semibold text-text-primary transition duration-200 cursor-pointer hover:border-primary/10 hover:bg-primary-light active:scale-[0.99] sm:text-sm"
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.13 13.22l7.98 6.19C12.9 13.72 18.01 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.98 6.19c4.66-4.3 6.79-10.62 6.79-17.84z"
          />
          <path
            fill="#FBBC05"
            d="M11.11 28.59A14.4 14.4 0 0 1 10.35 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.93 7.51 3.13 10.78l7.98-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.47 0 11.9-2.13 15.86-5.61l-7.98-6.19c-2.13 1.43-4.86 2.27-7.88 2.27-5.99 0-11.1-4.22-12.89-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Register */}
      <p className="mt-4.5 max-xs:mb-2 text-center text-xs text-secondary sm:text-sm">
        Don't have an account?
        <Link
          to="/register"
          className="ml-1.5 font-bold text-primary transition-colors cursor-pointer hover:text-primary-hover"
        >
          Create Account
        </Link>
      </p>
    </section>
  );
};

export default React.memo(LoginForm);
