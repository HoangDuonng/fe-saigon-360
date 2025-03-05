import { AppDispatch } from '@/redux/store';
import { handleMessage } from './messageService';
import { env } from '@/env.mjs';

class WebSocketService {
    private ws: WebSocket | null = null;
    private onMessageReceived: (message: string | undefined) => void;
    private dispatch: AppDispatch;

    constructor(
        onMessageReceived: (message: string | undefined) => void,
        dispatch: AppDispatch
    ) {
        this.onMessageReceived = onMessageReceived;
        this.dispatch = dispatch;
    }

    connect(sessionId: string) {
        if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            this.disconnect();
        }

        this.ws = new WebSocket(
            `${env.NEXT_PUBLIC_WS_URL}?sessionId=${sessionId}`
        );

        this.ws.onopen = () => {
            console.log('WebSocket connected');
        };

        this.ws.onmessage = async (event: MessageEvent) => {
            console.log('Message received from server:', event.data);
            if (typeof event.data === 'string') {
                const result = await handleMessage(event.data, this.dispatch);
                this.onMessageReceived(result);
            } else {
                console.error('Message data is not a string:', event.data);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
        };
    }

    disconnect() {
        if (this.ws) {
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onerror = null;
            this.ws.onclose = null;

            if (
                this.ws.readyState === WebSocket.CONNECTING ||
                this.ws.readyState === WebSocket.OPEN
            ) {
                console.log('Closing WebSocket connection...');
                this.ws.close();
            } else {
                console.log('WebSocket already closed or in closing state.');
            }
            this.ws = null;
        }
    }

    sendMessage(message: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    }
}

export default WebSocketService;
