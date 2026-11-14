import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  value,
  variant = "contained",
  startIcon,
  endIcon,
  iconSize = 15,
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
          <CircularProgress size={iconSize} color="inherit" />
        ) : startIcon ? (
          React.cloneElement(startIcon, { size: iconSize })
        ) : null
      }
      endIcon={
        !loading && endIcon
          ? React.cloneElement(endIcon, { size: iconSize })
          : null
      }
      disabled={disabled}
      fullWidth={fullWidth}
      className={`!rounded-lg !px-4 !capitalize !py-2 !font-semibold !transition !shrink-0 ${
        variant === "contained"
          ? "!bg-gradient-to-tr from-primary hover:from-primary-active to-primary-active !text-white/95"
          : variant === "outlined"
            ? "!border-primary !text-primary hover:!bg-primary-light"
            : ""
      } disabled:!cursor-not-allowed disabled:!opacity-50 disabled:!shadow-none disabled:!scale-100 ${
        variant === "contained"
          ? "disabled:!bg-none disabled:!bg-bg-hover disabled:!text-text-muted"
          : variant === "outlined"
            ? "disabled:!border-border disabled:!bg-transparent disabled:!text-text-muted"
            : ""
      } ${className}`}
      {...props}
    >
      {children || value}
    </Button>
  );
};

export default React.memo(CustomButton);
