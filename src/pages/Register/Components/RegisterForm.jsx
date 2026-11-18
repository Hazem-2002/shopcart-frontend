import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  ArrowRight,
  UserRound,
  ShieldCheck,
  Phone,
} from "lucide-react";

import Input from "../../../components/UI/Input";
import Password from "../../../components/UI/Password";
import Button from "../../../components/UI/Button";
import Checkbox from "../../../components/UI/Checkbox";

// Thunks & Actions
import { register } from "../../../features/auth/thunks/register";

// utils
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
} from "../../../utils/validation";

import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword,
      ),
      terms: formData.terms ? "" : "You must agree to the terms and conditions",
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) return;

    try {
      await dispatch(
        register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      ).unwrap();

      toast.success("Account created successfully! Please log in.", {
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/email-verification", { replace: true });
      }, 1800);
    } catch (error) {
      console.error("Register Error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className="flex w-full flex-col !order-2 md:!order-1 justify-center py-5.5 max-md:px-5 pl-8">
      {/* Heading */}
      <div className="mb-5 flex flex-col gap-2.5">
        <h2 className="bg-gradient-to-br from-primary via-primary/60 to-primary-hover bg-clip-text text-xl font-extrabold leading-tight tracking-tight text-transparent sm:text-2xl lg:text-3xl">
          Create Account
        </h2>

        <p className="text-xs leading-6 text-secondary sm:text-sm">
          Create your account and discover a smarter way to shop. Enjoy
          exclusive deals and a personalized shopping experience.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Full Name */}
          <Input
            id="name"
            label="Full Name"
            placeholder="Enter your full name"
            startIcon={
              <UserRound className="!size-3.5 sm:!size-4 text-text-placeholder" />
            }
            helperText={errors.name}
            error={errors.name}
            className="!h-10 !rounded-full"
            value={formData.name}
            onChange={(event) => {
              setErrors({ ...errors, name: "" });
              setFormData({ ...formData, name: event.target.value });
            }}
          />

          {/* Email */}
          <Input
            id="email"
            type="email"
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

          {/* Phone Number */}
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            startIcon={
              <Phone className="!size-3.5 sm:!size-4 text-text-placeholder" />
            }
            helperText={errors.phone}
            error={errors.phone}
            className="!h-10 !rounded-full"
            value={formData.phone}
            onChange={(event) => {
              setErrors({ ...errors, phone: "" });
              setFormData({ ...formData, phone: event.target.value });
            }}
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <Password
            id="confirmPassword"
            label="Confirm Password"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            startIcon={
              <ShieldCheck className="!size-3.5 sm:!size-4 text-text-placeholder" />
            }
            required={true}
            disabled={false}
            labelClassName=""
            helperTextClassName=""
            className="!h-10 !rounded-full"
            value={formData.confirmPassword}
            onChange={(event) => {
              setErrors({ ...errors, confirmPassword: "" });
              setFormData({
                ...formData,
                confirmPassword: event.target.value,
              });
            }}
          />

          {/* Terms & Conditions */}
          <Checkbox
            id="terms"
            label={
              <p
                className={`cursor-pointer text-[11px] leading-5 sm:text-xs ${
                  errors.terms ? "text-danger" : "text-secondary"
                }`}
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  Privacy Policy
                </button>
              </p>
            }
            checked={formData.terms}
            onChange={(event) => {
              setFormData({ ...formData, terms: event.target.checked });
              setErrors({ ...errors, terms: "" });
            }}
            helperText={errors.terms}
            error={errors.terms}
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
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-secondary">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Google Sign Up */}
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

      {/* Login */}
      <p className="mt-4 max-xs:mb-2 text-center text-xs text-secondary sm:text-sm">
        Already have an account?
        <Link
          to="/login"
          className="ml-1.5 font-bold text-primary transition-colors cursor-pointer hover:text-primary-hover"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default React.memo(LoginForm);
