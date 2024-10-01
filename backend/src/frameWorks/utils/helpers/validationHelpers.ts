import e from "express";

export const isNullOrEmpty = (value: string | null | undefined): boolean =>
  value == null || value == undefined || value.trim() == "";

export const validateEmail = (email: string): string | null =>
  isNullOrEmpty(email)
    ? "Email is required"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? "Invalid email format"
    : null;

export const validatePassword = (password: string): string | null =>
  isNullOrEmpty(password)
    ? "Password is required"
    : password.length < 8
    ? "Password must be at least 8 characters long"
    : null;

export const validateUsername = (userName: string): string | null =>
  isNullOrEmpty(userName) ? "Username is required" : null;

export const validateGender = (gender: string): string | null =>
  isNullOrEmpty(gender) ? "Gender is required" : null;

export const validateCity = (city: string): string | null =>
  isNullOrEmpty(city) ? "City is required" : null;

export const validateState = (state: string): string | null =>
  isNullOrEmpty(state) ? "State is required" : null;

export const validateZipCode = (zipCode: string): string | null =>
  isNullOrEmpty(zipCode)
    ? "Zip code is required"
    : !/^\d{5,6}$/.test(zipCode)
    ? "Invalid zip code format"
    : null;

export const validateUserInput = (data: {
  email: string;
  password: string;
  userName: string;
}): string | null => {
  const emailError = validateEmail(data.email);
  const validateUsernameError = validateUsername(data.userName);
  return emailError
    ? emailError
    : validateUsernameError
    ? validateUsernameError
    : validatePassword(data.password);
};

export const validateLawyerInput = (data: {
  email: string;
  userName: string;
  gender: string;
  city: string;
  state: string;
  zipCode: string;
  password: string;
}): string | null => {
  const emailError = validateEmail(data.email);
  const usernameError = validateUsername(data.userName);
  const passwordError = validatePassword(data.password);
  if (emailError) return emailError;
  if (usernameError) return usernameError;
  if (passwordError) return passwordError;

  const genderError = validateGender(data.gender);
  const cityError = validateCity(data.city);
  const stateError = validateState(data.state);
  const zipCodeError = validateZipCode(data.zipCode);
  return genderError
    ? genderError
    : cityError
    ? cityError
    : stateError
    ? stateError
    : zipCodeError;
};
