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
