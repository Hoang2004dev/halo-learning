import axiosClient from './axiosClient'; 

import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  return await axiosClient.post('/auth/login', data);
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  return await axiosClient.post('/auth/register', data);
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  return await axiosClient.post('/auth/refresh', { refreshToken });
};

export default axiosClient;
