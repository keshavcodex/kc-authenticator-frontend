import { EDITUSER, LOGIN, OTP, PASSWORDRESET, UPDATEPASSWORD } from '@/types/interfaces';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getService = async (route: string) => {
  try {
    const response = await axios.get(`${baseUrl}${route}`);
    return response?.data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export const postService: any = async (route: string, body?: any) => {
  try {
    const response = await axios.post(`${baseUrl}${route}`, body);
    return response?.data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};

export const putService = async (route: string, body: any) => {
  try {
    const response = await axios.put(`${baseUrl}${route}`, body);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (route: string, body: any) => {
  try {
    const response = await axios.delete(`${baseUrl}${route}`, body);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (body: LOGIN) => {
  return postService('/dev/login', body);
};
export const register = async (body: LOGIN) => {
  return postService('/dev/signup', body);
};
export const otpValidation = async (body: OTP) => {
  return postService('/dev/validate-signup', body);
};
export const resendOtp = async (referenceId: string) => {
  return postService('/dev/resend-otp?referenceId=' + referenceId);
};
export const passwordReset = async (body: PASSWORDRESET) => {
  return postService('/dev/password-reset-link', body);
};
export const updatePassword = async (body: UPDATEPASSWORD) => {
  return postService('/dev/update-password', body);
};
export const editUser = async (body: EDITUSER) => {
  return putService('/dev/editDeveloper', body);
};
