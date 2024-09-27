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
export interface EDITUSER {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface OTP {
  referenceId: string;
  otp: string;
}

export interface PASSWORDRESET {
  email: string;
  frontendUrl: string;
}
export interface UPDATEPASSWORD {
  token: string;
  password: string;
}

export interface APPDATA{
  appName: string;
}