export enum MessageError {
  UserAlreadyExists = "User already exists",
  UserNotFound = "User not found",
  LawyerNotFound = "Lawyer not found",
  SlotNotFound = "Slot not found",
  AppointmentNotFound = "Appointment not found",
  Blocked = "Oops You Have been Blocked",
  FeeChanged = "Consultation fee has increased. Please confirm the new fee.",
  AlreadyBooked = "Time slot is already booked",
  AppointmentCreationError = "Filed to Create Appointment",
  AppointmentCreated = "Appointment created SuccessFull",
  AppointmentGot = "Appointment Fetched SuccessFull",
  cancelAppointment = "Appointment Cancelled SuccessFully Refund Initiated",
  lawyerCancelAppointment = "Appointment Cancelled SuccessFully",
  PaymentSuccessFull = "Payment Created SuccessFull",
  paymentFiled = "Payment Filed Appointment was Cancelled ",
  AppointmentCompleted = "Appointment Has been completed SuccessFully",
  RefundInitiatedFiled = "Refund initiation failed",
  InvalidPassword = "Invalid password",
  TokenExpired = "Token has expired",
  Unauthorized = "Unauthorized",
  DadRequest = "Bad Request Entered Invalid Data",
  BadPrams = "Bad Request Not Found Data",
  ServerError = "Internal Server Error",
}

export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export enum UserRole {
  User = "user",
  Lawyer = "lawyer",
  Admin = "admin",
}
