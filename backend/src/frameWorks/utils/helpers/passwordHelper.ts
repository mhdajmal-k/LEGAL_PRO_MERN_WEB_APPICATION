import bcryptjs from "bcryptjs";
export const hashPassword = (pass: string): string => {
  return bcryptjs.hashSync(pass);
};

export const comparePassword = (
  password: string,
  validUser: string
): boolean => {
  return bcryptjs.compareSync(password, validUser);
};
