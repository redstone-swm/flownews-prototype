import axiosInstance from './axiosInstance';
import type User from '@/types/user.ts';

export const fetchUserMe = async (): Promise<User> => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
};
