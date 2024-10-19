import * as Yup from "yup";

export const loginValidator = Yup.object({
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
      "Password mustBe Strong one Alphabet,Number,specialCharacter"
    )
    .required("Password is required"),
});

export const userDataUpdateValidator = Yup.object({
  // email: Yup.string()
  //   .trim()
  //   .email("Invalid email format")
  //   .matches(
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //     "Invalid email format"
  //   )
  //   .required("Email is required"),

  userName: Yup.string()
    .trim()
    .min(3, "Username is too short")
    .required("Username is required"),

  phoneNumber: Yup.string()
    .trim()
    .matches(/^\d+$/, "Phone number must be numeric")
    .min(10, "Phone number is too short")
    .nullable(),
});
