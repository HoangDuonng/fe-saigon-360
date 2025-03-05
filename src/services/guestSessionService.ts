import axiosClientFe from '@/helpers/call-fe';
import Cookies from 'js-cookie';
export const getOrCreateGuestSession = async (): Promise<void> => {
    const sessionIdKey = 'sessionId';
    let guestSessionId = Cookies.get('sessionId');
    if (!guestSessionId) {
        try {
            const response = axiosClientFe.get('/api/guest-session');
            console.log('sess: ', response);
            guestSessionId = '' + (await response).data.sessionId;
            Cookies.set(sessionIdKey, guestSessionId, { expires: 7 });
        } catch (error) {
            console.error('Error fetching guest session ID:', error);
            throw new Error('Unable to create guest session.');
        }
    }
};