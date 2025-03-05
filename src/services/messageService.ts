import { handleLogin } from './authService';
import { AppDispatch } from '../redux/store';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface LoginMessage {
    type: 'login' | 'validToken';
    access_token: string;
    refresh_token: string;
    user_id: string;
    error_code: string;
    error_message: string;
    new_access_token: string;
}

type WebSocketMessage = LoginMessage;

export const handleMessage = async (
    message: string,
    dispatch: AppDispatch
): Promise<string | undefined> => {
    try {
        let parsedMessage: WebSocketMessage;

        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.log('Message is not a valid JSON:', error);
            return message;
        }

        switch (parsedMessage.type) {
            case 'login':
                const { access_token, refresh_token, user_id } = parsedMessage;
                console.log("PARSED_MESSAGE:", parsedMessage)
                if (user_id === 'null') {
                    toast.error('Login failed! Your account was unactive!');
                    break;
                }
                
                const result = await handleLogin(
                    access_token,
                    refresh_token,
                    user_id,
                    dispatch
                );
                console.log(result);
                break; 

            case 'validToken':
                const { error_code, error_message, new_access_token } =
                    parsedMessage;
                if (new_access_token) {
                    console.log('Received new access token:', new_access_token);
                    Cookies.set('access_token', new_access_token);
                } else {
                    console.log(
                        'Invalid new_access_token received:',
                        new_access_token
                    );
                }
                handleError(error_code, error_message);
                break;

            default:
                console.log('Unrecognized message type:', parsedMessage);
                return message;
        }
    } catch (error) {
        console.error('Error parsing message:', error);
        return 'Error parsing message';
    }
};

function handleError(errorCode: string, errorMessage: string) {
    switch (errorCode) {
        case 'TOKEN_EXPIRED':
            console.log(`Error: ${errorMessage} - Token has expired.`);
            break;
        case 'TOKEN_INVALID':
            console.log(`Error: ${errorMessage} - Token is invalid.`);

            break;
        case 'SERVER_ERROR':
            console.log(`Error: ${errorMessage} - Server error occurred.`);
            break;
        case 'UNKNOWN_ERROR':
            console.log(`Error: ${errorMessage} - Unknown error occurred.`);
            break;
        default:
            console.log(`Error: ${errorMessage} - Unrecognized error code.`);
            break;
    }
}
