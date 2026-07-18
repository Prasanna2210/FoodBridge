export const validateRegister = (formData) => {
  if (!formData.name.trim()) {
    return "Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    return "Enter a valid email address";
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    return "Phone number must be exactly 10 digits";
  }

  if (!formData.role) {
    return "Please select a role";
  }

  if (
    formData.role === "donor" &&
    !formData.donorType
  ) {
    return "Please select donor type";
  }

  if (
    formData.role === "recipient" &&
    !formData.recipientType
  ) {
    return "Please select recipient type";
  }

  if (!formData.address.trim()) {
    return "Address is required";
  }

  if (formData.password.length < 6) {
    return "Password must contain at least 6 characters";
  }

  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};