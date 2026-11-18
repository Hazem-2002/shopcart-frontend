import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Eye, EyeOff, Lock } from "lucide-react";

import Input from "./Input";

const Password = ({
  startIcon = false,
  iconSize = 17,
  endAdornment,
  value,
  ...props
}) => {
  // Control Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      value={value}
      type={showPassword ? "text" : value ? "password" : "text"}
      placeholder={props.placeholder || "Min. 6 characters"}
      required={false}
      startIcon={
        startIcon ? (
          React.isValidElement(startIcon) ? (
            startIcon
          ) : (
            <Lock />
          )
        ) : (
          false
        )
      }
      iconSize={iconSize}
      endAdornment={
        endAdornment ||
        (value && (
          <IconButton
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            disableRipple
            type="button"
            className="!text-text-muted hover:!text-text-primary !bg-transparent"
          >
            {showPassword ? (
              <Eye
                size={18}
                strokeWidth={1.8}
                className="text-text-muted/50 hover:text-text-muted/70"
              />
            ) : (
              <EyeOff
                size={18}
                strokeWidth={1.8}
                className="text-text-muted/50 hover:text-text-muted/70"
              />
            )}
          </IconButton>
        ))
      }
    />
  );
};

export default React.memo(Password);
