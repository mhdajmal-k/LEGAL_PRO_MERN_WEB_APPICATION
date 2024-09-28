interface SignUpResult {
  tempToken: string;
}

export interface LawyerSignUpResponse {
  status: number;
  message: string;
  result: SignUpResult | null;
}
