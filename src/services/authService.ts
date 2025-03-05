// services/userService.ts
import { AppDispatch } from '../redux/store';
import { setUser } from '../redux/slices/authSlice';
import Cookies from 'js-cookie';
//import axiosClient from '@/helper/call-center';
import axiosClientFe from '@/helpers/call-fe';

export const handleLogin = async (
    accessToken: string,
    refreshToken: string,
    user_id: string,
    dispatch: AppDispatch
): Promise<string> => {
    try {
        Cookies.set('access_token', accessToken, {
            path: '/',
            secure: false,
            sameSite: 'strict',
        });
        Cookies.set('refresh_token', refreshToken, {
            path: '/',
            secure: false,
            sameSite: 'strict',
            httpOnly: false,
        });
        Cookies.set('sessionId', user_id);

        const response = await axiosClientFe.get(`/profile/?pid=${user_id}`);

        console.log('chekcrersssssss: ', response);

        if (response.status === 200) {
            const userData = response.data;
            console.log('User data saved to Redux:', userData);

            dispatch(
                setUser({
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    img: userData.imageUrl,
                    role: userData.role,
                })
            );
            Cookies.set('sessionId', user_id);
            return 'Login Succeed!';
        } else {
            throw new Error(`Can not get user's info`);
        }
    } catch (error) {
        console.error('Lỗi trong quá trình xử lý đăng nhập:', error);
        return 'Đăng nhập thất bại!';
    }
};