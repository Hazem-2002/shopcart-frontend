import React from "react";
import { InputBase, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const Input = ({
  type = "text",
  id,
  label,
  helperText,
  error = false,
  value,
  onChange,
  placeholder,
  search = false,
  startIcon,
  endIcon,
  iconSize = 16,
  className = "",
  labelClassName = "",
  helperTextClassName = "",
  startAdornment,
  endAdornment,
  ...props
}) => {
  const hasStartAdornment = startAdornment || search || startIcon;
  const hasEndAdornment = endAdornment || endIcon;

  return (
    <div className="relative flex flex-col gap-2 w-full min-w-0">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block max-w-full text-xs font-medium text-text-primary break-words sm:text-sm ${labelClassName}`}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <InputBase
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        {...props}
        className={`
          box-border !w-full !min-w-0 !h-10.5
          !bg-primary/2 dark:!bg-primary/4 !px-3 !py-2.5
          !border !border-border rounded-md
          !text-sm !text-text-primary
          [&_.MuiInputBase-input]:!min-w-0
          [&_.MuiInputBase-input]:!w-full
          [&_.MuiInputBase-input]:!p-0
          [&_.MuiInputBase-input]:!text-ellipsis
          [&_.MuiInputBase-input]:placeholder:!opacity-100
          [&_.MuiInputBase-input]:placeholder:!text-text-placeholder
          [&_.MuiInputBase-input]:placeholder:!capitalize

          focus-within:!ring-2
          focus-within:!ring-primary/30
          dark:focus-within:!ring-primary/70
          !transition !duration-200
          ${error ? "!border-red-500 focus-within:!ring-red-500/20" : ""}
          ${className}
        `}
        startAdornment={
          hasStartAdornment ? (
            <InputAdornment
              position="start"
              className="!mr-2 !shrink-0 px-0.75"
            >
              <span className="flex items-center shrink-0">
                {startAdornment ||
                  (search ? (
                    <Search
                      size={iconSize}
                      strokeWidth={1.8}
                      className="text-text-secondary shrink-0"
                    />
                  ) : (
                    React.cloneElement(startIcon, {
                      size: iconSize,
                      className:
                        startIcon.props.className ||
                        "shrink-0 text-secondary/55",
                    })
                  ))}
              </span>
            </InputAdornment>
          ) : null
        }
        endAdornment={
          hasEndAdornment ? (
            <InputAdornment position="end" className="!mr-2 !shrink-0">
              <span className="flex items-center shrink-0">
                {endAdornment ||
                  React.cloneElement(endIcon, {
                    size: iconSize,
                    className:
                      endIcon.props.className || "shrink-0 text-secondary/55",
                  })}
              </span>
            </InputAdornment>
          ) : null
        }
      />

      {/* Helper Text */}
      {helperText && (
        <p
          className={`
      absolute top-full left-0 mt-1
      max-w-full text-xs leading-relaxed break-words
      z-10
      ${error ? "text-red-500" : "text-text-secondary"}
      ${helperTextClassName}
    `}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default React.memo(Input);
