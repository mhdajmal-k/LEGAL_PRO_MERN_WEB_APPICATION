import bcryptjs from "bcryptjs";

export const validatePassword = (
  password: string,
  validatePassword: string
) => {
  return bcryptjs.compareSync(password, validatePassword);
};
