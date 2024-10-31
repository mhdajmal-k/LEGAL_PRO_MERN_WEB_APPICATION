import { isNullOrEmpty } from "./validationHelpers";

export const validatePracticeArea = (practiceArea: string[]): string | null => {
  return !practiceArea || practiceArea.length === 0
    ? "At least one practice area is required"
    : null;
};

export const validateUserName = (userName: string): string | null =>
  isNullOrEmpty(userName) ? "userName is required" : null;
export const validateGender = (gender: string): string | null =>
  isNullOrEmpty(gender) ? "gender is required" : null;
export const validateCity = (city: string): string | null =>
  isNullOrEmpty(city) ? "city is required" : null;
export const validateState = (State: string): string | null =>
  isNullOrEmpty(State) ? "State is required" : null;
export const validateYearsOfExperience = (years: string): string | null =>
  isNullOrEmpty(years) ? "Years of experience is required" : null;

export const validateBarCouncilNumber = (number: string): string | null =>
  isNullOrEmpty(number) ? "Bar Council Number is required" : null;

export const validateDesignation = (designation: string): string | null =>
  isNullOrEmpty(designation) ? "Designation is required" : null;

export const validateCourtPracticeArea = (area: string): string | null =>
  isNullOrEmpty(area) ? "Court Practice Area is required" : null;

export const validateLanguages = (languages: string[]): string | null =>
  !languages || languages.length === 0
    ? "At least one language is required"
    : null;

export const validateAboutMe = (aboutMe: string): string | null =>
  isNullOrEmpty(aboutMe)
    ? "About Me is required"
    : aboutMe.length < 10
    ? "About Me should be at least 10 characters long"
    : null;

export const validateProfessionalDataInput = (data: {
  practiceArea: string[];
  yearsOfExperience: string;
  barCouncilNumber: string;
  stateBarCouncilNumber: string;
  designation: string;
  courtPracticeArea: string;
  languages: string[];
  aboutMe: string;
}): string | null => {
  const practiceAreaError = validatePracticeArea(data.practiceArea);
  if (practiceAreaError) return practiceAreaError;

  const yearsOfExperienceError = validateYearsOfExperience(
    data.yearsOfExperience
  );
  if (yearsOfExperienceError) return yearsOfExperienceError;

  const barCouncilNumberError = validateBarCouncilNumber(data.barCouncilNumber);
  if (barCouncilNumberError) return barCouncilNumberError;

  const designationError = validateDesignation(data.designation);
  if (designationError) return designationError;

  const courtPracticeAreaError = validateCourtPracticeArea(
    data.courtPracticeArea
  );
  if (courtPracticeAreaError) return courtPracticeAreaError;

  const languagesError = validateLanguages(data.languages);
  if (languagesError) return languagesError;

  const aboutMeError = validateAboutMe(data.aboutMe);
  if (aboutMeError) return aboutMeError;

  return null;
};
export const validateProfileDataInput = (data: {
  practice_area: string[];
  years_of_experience: string;
  userName: string;
  gender: string;
  city: string;
  state: string;
  designation: string;
  courtPracticeArea: string;
  languages: string[];
  about: string;
}): string | null => {
  const practiceAreaError = validatePracticeArea(data.practice_area);
  if (practiceAreaError) return practiceAreaError;

  const yearsOfExperienceError = validateYearsOfExperience(
    data.years_of_experience
  );
  if (yearsOfExperienceError) return yearsOfExperienceError;

  const validateUserNameError = validateUserName(data.userName);
  if (validateUserNameError) return validateUserNameError;
  const validateGenderError = validateGender(data.gender);
  if (validateGenderError) return validateGenderError;
  const validateCityNameError = validateCity(data.city);
  if (validateCityNameError) return validateCityNameError;
  const validateStateError = validateState(data.state);
  if (validateStateError) return validateStateError;

  const designationError = validateDesignation(data.designation);
  if (designationError) return designationError;

  const courtPracticeAreaError = validateCourtPracticeArea(
    data.courtPracticeArea
  );
  if (courtPracticeAreaError) return courtPracticeAreaError;

  const languagesError = validateLanguages(data.languages);
  if (languagesError) return languagesError;

  const aboutMeError = validateAboutMe(data.about);
  if (aboutMeError) return aboutMeError;

  return null;
};
