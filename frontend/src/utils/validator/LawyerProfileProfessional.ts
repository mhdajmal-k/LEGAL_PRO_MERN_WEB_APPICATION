import * as Yup from "yup";
export const lawyerProfileValidator = Yup.object().shape({
  userName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  practiceArea: Yup.array().min(1, "At least one practice area is required"),
  yearsOfExperience: Yup.string().required("Years of experience is required"),
  barCouncilNumber: Yup.string().required("Bar Council Number is required"),
  stateBarCouncilNumber: Yup.string(),
  designation: Yup.string().required("Designation is required"),
  courtPracticeArea: Yup.string().required("Court Practice Area is required"),
  languages: Yup.array().min(1, "At least one language is required"),
  aboutMe: Yup.string().required("About Me is required"),
});
