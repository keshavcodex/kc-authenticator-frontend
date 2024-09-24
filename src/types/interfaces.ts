export interface LOGIN {
  email?: string;
  devEmail: string;
  password: string;
}

export interface USER {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  devEmail: string;
  password: string;
  phone: string;
}

export interface RESPONSE {
  user?: USER;
  developer: USER;
  message: string;
  isSuccess: boolean;
}

export interface OTP {
  referenceId: string;
  otp: string;
}
