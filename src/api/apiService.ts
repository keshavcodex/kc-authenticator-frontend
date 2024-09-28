import { CREATEAPP, EDITAPP, EDITUSER, LOGIN, OTP, PASSWORDRESET, UPDATEPASSWORD } from '@/types/interfaces';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getService: any = async (route: string) => {
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

export const putService: any = async (route: string, body: any) => {
  try {
    const response = await axios.put(`${baseUrl}${route}`, body);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService: any = async (route: string, body?: any) => {
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
export const getApps = async (id: string) => {
  return getService(`/app/getAllAppsByDevId?devId=${id}`);
};
export const getAllApps = async () => {
  return getService('/app/getAllApps');
};

export const createApp = async (body: CREATEAPP) => {
  return postService('/app/createApp', body);
};

export const editApp = async (body: EDITAPP) => {
  return putService('/app/editApp', body);
};

export const checkAppName = async (devId: string, appName: string) => {
  return getService(`/app/getAppByDevIdAndAppName?appName=${appName}&devId=${devId}`);
};

export const getApp = async (id: string) => {
  return getService(`/app/getApp?id=${id}`);
};
export const deleteApp = async (id: string) => {
  return deleteService(`/app/deleteApp?id=${id}`);
};

export const getUsersByAppId = async (appId: string) => {
  return getService(`/app/getAllUsers?appId=${appId}`);
};

export const checkServer = async () => {
  return getService(`/`);
};
