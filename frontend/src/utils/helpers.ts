import { LawyerProfessionalData } from "./type/userType";

export function convertToFormData(values: LawyerProfessionalData): FormData {
  const formData = new FormData();
  formData.append("practiceArea", JSON.stringify(values.practiceArea));
  formData.append("yearsOfExperience", values.yearsOfExperience);
  formData.append("barCouncilNumber", values.barCouncilNumber);
  formData.append("stateBarCouncilNumber", values.stateBarCouncilNumber || "");
  formData.append("designation", values.designation);
  formData.append("courtPracticeArea", values.courtPracticeArea);
  formData.append("languages", JSON.stringify(values.languages));
  formData.append("aboutMe", values.aboutMe);
  if (values.selectedImageIndia)
    formData.append("selectedImageIndia", values.selectedImageIndia);
  if (values.selectedImageKerala)
    formData.append("selectedImageKerala", values.selectedImageKerala);
  return formData;
}
