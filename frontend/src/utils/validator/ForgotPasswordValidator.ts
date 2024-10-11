import * as Yup from "yup";
export const forgotpasswordValidatorSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password mustBe Strong one Alphabet Number,specialCharacter"
    )
    .required("Password is required"),

  conformPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
