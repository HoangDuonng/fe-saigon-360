import Cookies from 'js-cookie';
import { AppDispatch } from '@/redux/store';
import axiosClientFe from '@/helpers/call-fe';
import axiosClient from '@/helpers/call-apis';
import { setUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export const getUser = async (dispatch: AppDispatch): Promise<void> => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
        const sessionId = Cookies.get('sessionId');
        try {
            const response = await axiosClientFe.get(
                `/profile/?pid=${sessionId}`
            );

            console.log('chekcrersssssss: ', response);

            if (response.status === 200) {
                const userData = response.data;
                console.log('User data saved to Redux:', userData.id);

                if (userData.status === false) {
                    toast.error('Cannot get User');
                    Cookies.remove('sessionId');
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    window.location.replace('/');
                } else {
                    dispatch(
                        setUser({
                            id: userData.id,
                            email: userData.email,
                            name: userData.name,
                            img: userData.imageUrl,
                            role: userData.role,
                        })
                    );
                }
            } else {
                throw new Error(`Can not get user's info`);
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    }
};
export const usersApi = {
    getUsers() {
        return axiosClient.get('/api/users');
    },
    getUserById(id: string) {
        return axiosClient.get(`/api/users/${id}`);
    },
    getHistoryById(id: string) {
        return axiosClient.get(`/api/history/${id}`);
    },
};
