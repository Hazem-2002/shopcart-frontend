// Email Validation
export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required";

  if (/\s/.test(email)) return "Email cannot contain spaces";

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address";
  }

  return "";
};

// Password Validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.length > 64) {
    return "Password cannot exceed 64 characters";
  }

  return "";
};

// Required Field Validation
export const validateRequired = (value, fieldName = "This field") => {
  if (!value?.trim()) return `${fieldName} is required`;

  return "";
};

// Confirm Password Validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};
