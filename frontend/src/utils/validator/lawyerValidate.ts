// <<<<<<< HEAD
// =======
// // src/validation/SignupValidation.js
// >>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
import * as Yup from "yup";

export const lawyerValidationSchema = Yup.object({
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
  city: Yup.string().trim().required("city is required").min(3, "invalid city"),
  state: Yup.string().trim().required("required State"),
  zipCode: Yup.string()
    .trim()
    .required("required zipCode")
    .max(6, "invalid zipCode"),
  gender: Yup.string().required("Gender is required"),
});

export const lawyerProfessionalValidate = Yup.object({
  barCouncilNumber: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 letters")
    .max(20, "Username must be less than 20 letters")
    .required("barCouncilNumber is required"),
  designation: Yup.string().trim().required("designation is required"),
  aboutMe: Yup.string()
    .trim()
    .min(10, " must be at least 10 letters")
    .max(300, " must be less than 50 letters")
    .required("aboutMe is required"),
  yearsOfExperience: Yup.string()
    .trim()
    .required("yearsOfExperience is required"),
  practiceArea: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Please select at least one practice area"),
  languages: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one language"),
  courtPracticeArea: Yup.string().required("Court Practice Area is required"),
});
export const lawyerLoginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string().trim().required("Password is required"),
});
