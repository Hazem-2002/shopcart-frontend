import React from "react";

const Checkbox = ({
  id,
  label,
  helperText,
  error = false,
  checked,
  onChange,
  disabled = false,
  required = false,
  className = "",
  labelClassName = "",
  helperTextClassName = "",
  ...props
}) => {
  return (
    <div className="relative flex min-w-0 flex-col">
      {/* Checkbox & Label */}
      <div className="flex items-start gap-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error}
          aria-describedby={helperText ? `${id}-helper` : undefined}
          className={`
            mt-0.5 mb-0 size-4 shrink-0 cursor-pointer
            appearance-none rounded-[4px]
            border border-border bg-transparent
            checked:border-primary checked:bg-primary
            checked:bg-center checked:bg-no-repeat
            checked:bg-[length:12px_12px]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-primary/30
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-danger" : ""}
            ${className}`}
          style={{
            backgroundImage: checked
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m3 8 3 3 7-7'/%3E%3C/svg%3E")`
              : "none",
          }}
          {...props}
        />

        {label && (
          <label
            htmlFor={id}
            className={`
              min-w-0 cursor-pointer select-none
              text-xs leading-relaxed text-secondary
              sm:text-sm
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
              ${labelClassName}
            `}
          >
            {label}
            {required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={`
      absolute top-full left-0 z-10
      max-w-full text-xs leading-relaxed break-words
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

export default React.memo(Checkbox);
