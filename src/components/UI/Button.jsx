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
        group !shrink-0 !rounded-lg
        !px-3 !py-2
        !text-[11px] min-[400px]:!text-xs
        sm:!px-4 sm:!py-2.5 sm:!text-sm
        md:!px-5 md:!py-2.5
        lg:!px-5 lg:!py-3
        !font-semibold !capitalize
        !transition-all !duration-300

        ${
          variant === "contained"
            ? "!bg-gradient-to-tr from-primary to-primary-active hover:from-primary-active hover:to-primary !text-white/95 hover:!shadow-md hover:!shadow-primary/20"
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
