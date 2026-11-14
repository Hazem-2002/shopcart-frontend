import React from "react";
import { Slider } from "@mui/material";

const PriceRangeSlider = ({
  id,
  min = 0,
  max = 10000,
  step = 100,
  value,
  onChange,
  label,
  labelClassName,
}) => {
  const handleChange = (_, newValue) => {
    onChange?.(newValue);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium text-text-primary ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>

      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        disableSwap
        className="
        !text-primary !h-[5px]
        [&_.MuiSlider-thumb]:!size-[11px]
        [&_.MuiSlider-thumb]:!border-2
        [&_.MuiSlider-thumb]:!border-white
        [&_.MuiSlider-thumb]:!shadow-[0_0_0_2px_var(--color-primary)]
        [&_.MuiSlider-track]:!border-0
        [&_.MuiSlider-rail]:!opacity-20
        [&_.MuiSlider-valueLabel]:!bg-primary
        [&_.MuiSlider-valueLabel]:!rounded-md
        [&_.MuiSlider-valueLabel]:!text-[11px]
        "
      />
    </div>
  );
};

export default React.memo(PriceRangeSlider);
