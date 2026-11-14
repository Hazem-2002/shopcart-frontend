import React from "react";
import IconButton from "./IconButton";
import Badge from "@mui/material/Badge";
import { twMerge } from "tailwind-merge";

const CustomBadge = ({
  icon,
  value = 0,
  max = 99,
  variant = "standard",
  showZero = false,
  invisible = false,
  ariaLabel = "Notifications",
  size = "medium",
  onClick,
  badgeProps = {},
  badgeClassName,
  buttonProps,
}) => {
  if (!icon) return null;

  return (
    <IconButton
      aria-label={ariaLabel}
      size={size}
      onClick={onClick}
      {...buttonProps}
    >
      <Badge
        badgeContent={value}
        max={max}
        variant={variant}
        showZero={showZero}
        invisible={invisible}
        slotProps={{
          badge: {
            className: twMerge(
              "!bg-primary !font-bold !text-white !text-[11px] !w-0 !h-0 !size-auto !p-1",
              badgeClassName,
            ),
          },
        }}
        {...badgeProps}
      >
        {icon}
      </Badge>
    </IconButton>
  );
};

export default React.memo(CustomBadge);
