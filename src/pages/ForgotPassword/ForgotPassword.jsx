import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

// utils
import { validateEmail } from "../../utils/validation";

// Thunks
import { forgotPassword } from "../../features/auth/thunks/forgotPassword";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    try {
      await dispatch(forgotPassword(email)).unwrap();

      toast.success(
        "Password reset instructions have been sent to your email!",
      );

      setTimeout(() => {
        navigate("/reset-password/verify", { replace: true });
      }, 1000);
    } catch (error) {
      setEmailError(error.message || "Failed to send reset instructions");
      console.error(error.message || "Failed to send reset instructions");
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

        {/* Forgot Password Card */}
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
              Forgot Password?
            </h1>

            <p className="mx-auto max-w-[330px] text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
              No worries! Enter your registered email address and we'll send you
              instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-7">
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={emailError}
                helperText={emailError}
                startIcon={<Mail />}
                iconSize={18}
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!email.trim()}
              error={emailError}
              loading={isLoading}
              className="w-full"
            >
              Send Reset Instructions
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-border pt-4 sm:mt-7 sm:gap-2 sm:pt-5">
            <LockKeyhole className="size-3.5 shrink-0 text-primary sm:size-4" />

            <span className="text-center text-[10px] leading-5 text-secondary sm:text-xs">
              Your account security is our priority.
            </span>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-4 text-center text-[11px] leading-5 text-secondary sm:mt-6 sm:text-xs">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default React.memo(ForgotPassword);
