export const userColumns: string[] = [
  "PROFILEPIC",
  "NAME",
  "EMAIL",
  "PHONE NUMBER",
  "BLOCK",
];
export const AppointmentColumns = {
  user: ["Date", "Time", "Lawyer", "Fee", "Payment", "View"],
  lawyer: ["Date", "Time", "User", "Fee", "Payment", "View"],
  admin: [
    "Date",
    "Time",
    "User",
    "lawyer",
    "consultationFee",
    "Convenience Fee",
    "Payment",
    "View",
  ],
};
export const lawyerColumns: string[] = [
  "PROFILE",
  "NAME",
  "EMAIL",
  "DESIGNATION",
  "EXPERIENCE",
  "VERIFY",
  "BLOCK",
  "VIEW",
];
