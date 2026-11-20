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
    <div className="relative flex w-full min-w-0 flex-col gap-1.5 sm:gap-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block max-w-full break-words text-[11px] font-medium text-text-primary/80 min-[400px]:text-xs sm:text-sm ${labelClassName}`}
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
          box-border !h-9.5 !w-full !min-w-0
          !border !border-border !bg-primary/2
          !px-2.5 !py-2
          !text-xs !text-text-primary
          rounded-md
          min-[400px]:!h-10 min-[400px]:!px-3
          min-[400px]:!text-[13px]
          sm:!h-10.5 sm:!px-3.5 sm:!text-sm
          dark:!bg-primary/4

          [&_.MuiInputBase-input]:!w-full
          [&_.MuiInputBase-input]:!min-w-0
          [&_.MuiInputBase-input]:!p-0
          [&_.MuiInputBase-input]:!text-xs
          [&_.MuiInputBase-input]:placeholder:!text-[11px]
          [&_.MuiInputBase-input]:placeholder:!text-text-placeholder
          [&_.MuiInputBase-input]:placeholder:!opacity-100
          [&_.MuiInputBase-input]:placeholder:!capitalize
          min-[400px]:[&_.MuiInputBase-input]:!text-[13px]
          min-[400px]:[&_.MuiInputBase-input]:placeholder:!text-xs
          sm:[&_.MuiInputBase-input]:!text-sm
          sm:[&_.MuiInputBase-input]:placeholder:!text-sm

          focus-within:!ring-2
          !transition !duration-200
          ${
            error
              ? "!ring-2 !ring-danger"
              : "focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70"
          }
          ${className}
        `}
        startAdornment={
          hasStartAdornment ? (
            <InputAdornment
              position="start"
              className="!mr-1.5 !shrink-0 px-0.5 min-[400px]:!mr-2 min-[400px]:px-0.75"
            >
              <span className="flex shrink-0 items-center">
                {startAdornment ||
                  (search ? (
                    <Search
                      size={iconSize}
                      strokeWidth={1.8}
                      className="size-3.5 shrink-0 text-text-secondary min-[400px]:!size-[15px] sm:!size-4"
                    />
                  ) : (
                    React.cloneElement(startIcon, {
                      size: iconSize,
                      className:
                        startIcon.props.className ||
                        "size-3.5 shrink-0 text-secondary/55 min-[400px]:!size-[15px] sm:!size-4",
                    })
                  ))}
              </span>
            </InputAdornment>
          ) : null
        }
        endAdornment={
          hasEndAdornment ? (
            <InputAdornment
              position="end"
              className="!mr-1 !shrink-0 min-[400px]:!mr-1.5"
            >
              <span className="flex shrink-0 items-center">
                {endAdornment ||
                  React.cloneElement(endIcon, {
                    size: iconSize,
                    className:
                      endIcon.props.className ||
                      "size-3.5 shrink-0 text-secondary/55 min-[400px]:!size-[15px] sm:!size-4",
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
            absolute left-0 top-full z-10 mt-0.5
            max-w-full break-words text-[10px] leading-relaxed
            min-[400px]:text-[11px] sm:text-xs
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

export default React.memo(Input);
