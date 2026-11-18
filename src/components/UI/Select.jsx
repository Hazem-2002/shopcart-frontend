import React from "react";
import { Select, MenuItem } from "@mui/material";

const CustomSelect = ({
  name,
  id = name,
  label,
  value = "",
  onChange,
  options = [],
  placeholder,
  error = false,
  disabled = false,
  required = false,
  helperText,
  className = "",
  labelClassName = "",
  helperTextClassName = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 w-full min-w-45">
      {label && (
        <label
          htmlFor={id}
          className={`text-xs sm:text-sm font-medium text-text-primary ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        error={error}
        renderValue={(selected) => {
          if (selected === "") {
            return <span className="text-text-muted">{placeholder}</span>;
          }

          return options.find((option) => option.value === selected)?.label;
        }}
        MenuProps={{
          disableScrollLock: true,
          slotProps: {
            paper: {
              className: `
                !text-text-primary
                !bg-bg-surface
                !max-h-56 sm:!max-h-64
                !overflow-hidden
              `,
            },
            list: {
              className: `
                !max-h-56 sm:!max-h-64
                !overflow-y-auto
                !overflow-x-hidden
                overscroll-contain
                !p-1
                custom-scrollbar
              `,
            },
          },
        }}
        className={`
          !w-full !min-w-0 sm:!min-w-45
          h-10 sm:h-10.5
          !bg-primary/2
          !px-2.5 sm:!px-3
          !rounded-md
          !border !border-border
          !text-xs sm:!text-sm
          !text-text-primary

          [&_.MuiSelect-select]:!p-0
          [&_.MuiSelect-select]:!min-w-0
          [&_.MuiSelect-select]:!truncate
          [&_.MuiSelect-icon]:!text-text-secondary
          [&_.MuiOutlinedInput-notchedOutline]:!border-0

          focus-within:!ring-2
          focus-within:!ring-primary/30
          dark:focus-within:!ring-primary/70

          !transition !duration-200

          ${error ? "!border-red-500 focus-within:!ring-red-500/20" : ""}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={`
              !min-h-9 sm:!min-h-10
              !px-3
              !text-xs sm:!text-sm
              !bg-bg-surface
              !text-text-primary
              ${
                value === option.value
                  ? "!bg-primary !text-white"
                  : "hover:!bg-primary-light"
              }
            `}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <p
          className={`
            text-[11px] sm:text-xs
            leading-relaxed
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

export default React.memo(CustomSelect);
