import React, { useRef } from "react";
import { InputBase } from "@mui/material";

const OTPField = ({
  otp,
  setOtp,
  error = false,
  helperText,
  className = "",
  helperTextClassName = "",
}) => {
  const inputRefs = useRef([]);
  const length = otp.length;

  // Handle Input Change
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];

    setOtp(newOtp);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Keyboard Navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }

    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (newOtp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newOtp = Array(length).fill("");

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="relative flex flex-col gap-2">
      {/* OTP Inputs */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <InputBase
            key={index}
            value={digit}
            inputRef={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
              className:
                "!text-center !text-[22px] !font-bold !text-text-primary",
            }}
            className={`
              !box-border !size-10 sm:!size-12
              !rounded-xl !border !px-2 !py-2
              !text-text-primary
              !transition !duration-200

              !bg-primary/2 dark:!bg-primary/4
              ${error ? "!border-danger !ring-2 !ring-danger" : "!border-border"}

              focus-within:!ring-2
              ${error ? "!ring-danger" : "focus-within:!border-primary focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70"}

              ${className}
            `}
          />
        ))}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={`
            text-center text-xs leading-relaxed
            break-words
            ${error ? "text-danger" : "text-text-secondary"}
            ${helperTextClassName}
          `}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default React.memo(OTPField);
