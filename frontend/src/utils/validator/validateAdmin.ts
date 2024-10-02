import * as Yup from "yup";

export const adminValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string().trim().required("Password is required"),
});
