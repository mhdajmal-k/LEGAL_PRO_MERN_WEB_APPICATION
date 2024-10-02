interface SignUpResult {
  tempToken: string;
}

export interface LawyerSignUpResponse {
  status: number;
  message: string;
  result: SignUpResult | null | string;
}

export interface response {
  status: number;
  message: string;
  result: null | string | any;
}
