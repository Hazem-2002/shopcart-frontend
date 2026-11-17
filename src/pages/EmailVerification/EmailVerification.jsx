import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, RefreshCw, CheckCircle2, Mail } from "lucide-react";

import { useNavigate } from "react-router-dom";
import OTPField from "../../components/OTPField";
import Button from "../../components/Button";

import { verifyEmail } from "../../features/auth/thunks/verifyEmail";
import { resendVerificationEmail } from "../../features/auth/thunks/resendVerificationEmail";

import { toast } from "react-toastify";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const { isLoading } = useSelector((state) => state.auth);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Resend OTP
  const handleResend = async () => {
    if (timeLeft > 0) return;

    setOtp(Array(6).fill(""));
    setTimeLeft(30);

    try {
      await dispatch(resendVerificationEmail()).unwrap();
    } catch (error) {
      console.error("Resend verification email failed:", error);
    }
  };

  // Verify Email
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => !digit)) return;

    try {
      await dispatch(verifyEmail(otp.join(""))).unwrap();
      toast.success("Email verified successfully!");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
    } catch (error) {
      setOtp(Array(6).fill(""));
      console.error("Email verification failed:", error);
      toast.error(error.message || "Email verification failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-[430px]">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-secondary cursor-pointer transition-colors hover:text-primary sm:mb-5 sm:gap-2 sm:text-sm"
        >
          <ArrowLeft
            size={15}
            className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1 sm:size-4"
          />
          <span>Back</span>
        </button>

        {/* Verification Card */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">
          {/* Heading */}
          <div className="mb-5 text-center sm:mb-7">
            {/* Verification Icon */}
            <div className="mb-3 flex justify-center sm:mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary sm:size-12 sm:rounded-2xl">
                <Mail className="size-5 sm:size-6" strokeWidth={1.7} />
              </div>
            </div>

            {/* Heading */}
            <h1 className="mb-2 text-xl font-bold tracking-tight text-text sm:text-2xl">
              Verify your email
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-[330px] text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
              We've sent a 6-digit verification code to your email. Enter the
              code below to activate your account.
            </p>
          </div>

          <form onSubmit={handleVerify}>
            {/* OTP */}
            <div className="mb-7">
              <OTPField otp={otp} setOtp={setOtp} />
            </div>

            {/* Resend */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs sm:mb-7 sm:text-sm">
              <span className="text-secondary">Didn't receive the code?</span>

              {timeLeft > 0 ? (
                <span className="font-semibold tabular-nums text-primary">
                  Resend in 00:{String(timeLeft).padStart(2, "0")}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1 font-semibold text-primary cursor-pointer transition-colors hover:text-primary-hover"
                >
                  <RefreshCw className="size-3 sm:size-3.5" />
                  Resend code
                </button>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={otp.some((digit) => !digit)}
              loading={isLoading}
              className="w-full"
            >
              Verify Email
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
          Need help?{" "}
          <a
            href="mailto:support@shopcart.com"
            className="font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            Contact Support
          </a>
        </p>
      </div>
    </main>
  );
};

export default React.memo(EmailVerification);
