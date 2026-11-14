import React from "react";
import { InputAdornment } from "@mui/material";
import { ChevronUp, ChevronDown } from "lucide-react";

const NumericStepper = ({
  id,
  label,
  helperText,
  error = false,
  value,
  onChange,
  incrementHandler,
  decrementHandler,
  placeholder,
  min,
  max,
  step = 1,
  disabled = false,
  startAdornment,
  endAdornment,
  className = "",
  labelClassName = "",
  helperTextClassName = "",
  ...props
}) => {
  const numericValue = Number(value);

  const isMinReached = min !== undefined && numericValue <= Number(min);
  const isMaxReached = max !== undefined && numericValue >= Number(max);

  const handleIncrement = () => {
    if (disabled || isMaxReached) return;

    if (incrementHandler) {
      incrementHandler();
    } else {
      onChange?.({
        target: {
          value: String((Number(value) || 0) + Number(step)),
        },
      });
    }
  };

  const handleDecrement = () => {
    if (disabled || isMinReached) return;

    if (decrementHandler) {
      decrementHandler();
    } else {
      onChange?.({
        target: {
          value: String((Number(value) || 0) - Number(step)),
        },
      });
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full min-w-0`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-xs sm:text-sm font-medium text-text-primary ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center w-full min-w-0
          h-10 sm:h-10.5
          !bg-primary/2 dark:!bg-primary/4
          border rounded-md
          transition duration-200
          ${
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-border focus-within:ring-2 focus-within:ring-primary/30 dark:focus-within:ring-primary/70"
          }
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {startAdornment && (
          <InputAdornment position="start" className="!h-full !ml-3 !mr-1">
            {startAdornment}
          </InputAdornment>
        )}

        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperText && id ? `${id}-helper` : undefined}
          className={`
            w-full min-w-0 h-full
            bg-transparent
            px-3 py-2
            text-xs sm:text-sm
            text-text-primary
            placeholder:text-text-muted/50
            outline-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [appearance:textfield]
            ${className}
          `}
          {...props}
        />

        {endAdornment && (
          <InputAdornment position="end" className="!h-full !mr-2 !ml-1">
            {endAdornment}
          </InputAdornment>
        )}

        <div className="flex flex-col shrink-0 mr-1 py-1">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || isMaxReached}
            aria-label="Increase value"
            className="
              flex w-7 grow
              items-center justify-center
              rounded-sm
              text-text-muted
              hover:bg-primary/10 hover:text-primary
              active:bg-primary/20
              disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed
              disabled:hover:bg-transparent disabled:hover:text-text-muted
              transition duration-200
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-primary/30
            "
          >
            <ChevronUp size={15} strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || isMinReached}
            aria-label="Decrease value"
            className="
              flex w-7 grow
              items-center justify-center
              rounded-sm
              text-text-muted
              hover:bg-primary/10 hover:text-primary
              active:bg-primary/20
              disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed
              disabled:hover:bg-transparent disabled:hover:text-text-muted
              transition-all duration-200
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-primary/30
            "
          >
            <ChevronDown size={15} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {helperText && (
        <p
          id={id ? `${id}-helper` : undefined}
          className={`
            text-[11px] sm:text-xs
            leading-relaxed break-words
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

export default React.memo(NumericStepper);
