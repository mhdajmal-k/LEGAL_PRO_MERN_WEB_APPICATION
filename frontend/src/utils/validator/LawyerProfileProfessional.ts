import * as Yup from "yup";
export const lawyerProfileValidator = Yup.object({
  userName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  practiceArea: Yup.array().min(1, "Select at least one practice area"),
  yearsOfExperience: Yup.number()
    .positive("Must be positive")
    .required("Years of experience is required"),
  designation: Yup.string().required("Designation is required"),
  courtPracticeArea: Yup.string().required("Court practice area is required"),
  languages: Yup.array().min(1, "Select at least one language"),
  aboutMe: Yup.string().required("About me is required"),
});
