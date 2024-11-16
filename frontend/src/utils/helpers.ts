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

// export function checkCallAvailability(
//   appointmentTime: string | undefined,
//   appointmentDate: Date | undefined | any
// ) {
//   if (appointmentTime || appointmentDate) return false;
//   console.log("it called");
//   alert("called");
//   alert(appointmentDate);
//   alert(appointmentTime);
//   const convertedDate = new Date(appointmentDate!);
//   const [time, period] = appointmentTime!.split(" ");
//   const [hours, minutes] = time.split(":");
//   alert(convertedDate);
//   alert(time);
//   alert(period);
//   let hour = parseInt(hours);
//   if (period === "PM" && hour !== 12) hour += 12;
//   if (period === "AM" && hour === 12) hour = 0;

//   convertedDate.setHours(hour, parseInt(minutes), 0);

//   const now = new Date();
//   const timeDiff = convertedDate.getTime() - now.getTime();
//   const minutesDiff = Math.floor(timeDiff / (1000 * 60));

//   return minutesDiff >= -5 && minutesDiff <= 30;
// }
