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

// Confirm Password Validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

// Name Validation
export const validateName = (name) => {
  if (!name?.trim()) return "Name is required";

  if (name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  if (name.trim().length > 50) {
    return "Name cannot exceed 50 characters";
  }

  if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(name.trim())) {
    return "Name can only contain letters";
  }

  return "";
};

// Phone Validation
export const validatePhone = (phone) => {
  if (!phone?.trim()) return "Phone number is required";

  const normalizedPhone = phone.trim().replace(/[\s-]/g, "");

  const phoneRegex = /^(?:\+20|0020|20)?01[0125]\d{8}$/;

  if (!phoneRegex.test(normalizedPhone)) {
    return "Please enter a valid Egyptian phone number";
  }

  return "";
};
