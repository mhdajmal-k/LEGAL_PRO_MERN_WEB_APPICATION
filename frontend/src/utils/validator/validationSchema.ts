import * as Yup from "yup";

export const validationSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 letters")
    .max(20, "Username must be less than 20 letters")
    .required("Username is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password mustBe Strong one Alphabet Number,specialCharacter"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
