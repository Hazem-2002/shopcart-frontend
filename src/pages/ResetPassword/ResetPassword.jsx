import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";

import Password from "../../components/UI/Password";
import Button from "../../components/UI/Button";

// utils
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";

import { resetPassword } from "../../features/auth/thunks/resetPassword";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const { isLoading } = useSelector((state) => state.auth);

  // Reset Password
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword,
      ),
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) return;

    try {
      await dispatch(resetPassword(formData)).unwrap();

      toast.success("Your password has been reset successfully!");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Reset password failed:", error);
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-[430px]">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-secondary transition-colors hover:text-primary sm:mb-5 sm:gap-2 sm:text-sm"
        >
          <ArrowLeft
            size={15}
            className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1 sm:size-4"
          />
          <span>Back</span>
        </button>

        {/* Reset Password Card */}
        <div className="rounded-2xl border border-border bg-bg-surface p-6 shadow-sm sm:p-7">
          {/* Heading */}
          <div className="mb-6 text-center sm:mb-7">
            {/* Icon */}
            <div className="mb-3 flex justify-center sm:mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary sm:size-12 sm:rounded-2xl">
                <LockKeyhole className="size-5 sm:size-6" strokeWidth={1.7} />
              </div>
            </div>

            <h1 className="mb-2 text-xl font-bold capitalize tracking-tight text-text-primary sm:text-2xl">
              Reset Password
            </h1>

            <p className="mx-auto max-w-[330px] text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
              Create a new password for your account. Make sure it's strong and
              easy for you to remember.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Password Fields */}
            <div className="mb-7 flex flex-col gap-5.5">
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
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!formData.password || !formData.confirmPassword}
              loading={isLoading}
              className="w-full"
            >
              Reset Password
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-border pt-4 sm:mt-7 sm:gap-2 sm:pt-5">
            <CheckCircle2 className="size-3.5 shrink-0 text-primary sm:size-4" />

            <span className="text-center text-[10px] leading-5 text-secondary sm:text-xs">
              Your account security is our priority.
            </span>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-4 text-center text-[11px] leading-5 text-secondary sm:mt-6 sm:text-xs">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
};

export default React.memo(ResetPassword);
