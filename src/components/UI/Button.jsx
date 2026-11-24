import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  value,
  variant = "contained",
  startIcon,
  endIcon,
  iconSize,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      startIcon={
        loading ? (
          <CircularProgress size={iconSize || 13} color="inherit" />
        ) : startIcon ? (
          React.cloneElement(startIcon, {
            size: iconSize || 14,
          })
        ) : null
      }
      endIcon={
        !loading && endIcon
          ? React.cloneElement(endIcon, {
              size: iconSize || 14,
            })
          : null
      }
      disabled={disabled || loading}
      fullWidth={fullWidth}
      className={`
        group !flex !shrink-0 !items-center !justify-center !m-0
        !h-9.5 !rounded-lg
        !px-3 !py-0
        !text-[11px]
        min-[400px]:!h-10
        min-[400px]:!px-3.5
        min-[400px]:!text-xs
        sm:!h-10.5 sm:!px-4 sm:!text-sm
        md:!px-5
        lg:!px-5

        !font-semibold !capitalize
        !transition-all !duration-300

        ${
          variant === "contained"
            ? "!bg-gradient-to-tr from-primary to-primary-active hover:from-primary-active hover:to-primary !text-white/95"
            : variant === "outlined"
              ? "!border-primary !text-primary hover:!bg-primary-light"
              : ""
        }

        disabled:!cursor-not-allowed
        disabled:!opacity-50
        disabled:!shadow-none
        disabled:!scale-100

        ${
          variant === "contained"
            ? "disabled:!bg-none disabled:!bg-bg-hover disabled:!text-text-muted"
            : variant === "outlined"
              ? "disabled:!border-border disabled:!bg-transparent disabled:!text-text-muted"
              : ""
        }

        ${className}
      `}
      {...props}
    >
      {children || value}
    </Button>
  );
};

export default React.memo(CustomButton);
