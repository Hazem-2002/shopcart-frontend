import React from "react";
import IconButton from "@mui/material/IconButton";

const customIconButton = ({
  ariaLabel = "Notifications",
  size = "medium",
  onClick,
  children,
  ...buttonProps
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      size={size}
      onClick={onClick}
      className="!text-text-primary"
      {...buttonProps}
    >
      {children}
    </IconButton>
  );
};

export default React.memo(customIconButton);
