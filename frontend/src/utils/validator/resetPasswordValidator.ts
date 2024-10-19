import * as Yup from "yup";

export const resetPasswordValidator = Yup.object({
  currentPassword: Yup.string().trim().required("current password is required"),

  newPassword: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password mustBe Strong one Alphabet Number,specialCharacter"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], "newPassword must match")
    .required("Confirm Password is required"),
});
