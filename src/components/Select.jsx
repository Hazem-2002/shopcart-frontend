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
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-text-primary ${labelClassName}`}
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
              className: "!text-text-primary !bg-bg-surface",
            },
          },
        }}
        className={`
          w-full h-10.5 !bg-primary/2 min-w-45
          !px-3 !rounded-md
          !border !border-border
          !text-sm !text-text-primary
          [&_.MuiSelect-select]:!p-0
          [&_.MuiSelect-icon]:!text-text-secondary
          [&_.MuiOutlinedInput-notchedOutline]:!border-0
          focus-within:!ring-2 focus-within:!ring-primary/30
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
            className={`!bg-bg-surface !text-sm !text-text-primary ${
              value === option.value
                ? "!bg-primary !text-white"
                : "hover:!bg-primary-light"
            }`}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <p
          className={`text-xs ${
            error ? "text-red-500" : "text-text-secondary"
          } ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default React.memo(CustomSelect);
