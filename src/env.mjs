import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
        NEXT_PUBLIC_BACKEND_CHATBOT: z.string().min(1),
        NEXT_PUBLIC_BACKEND_DOMAIN: z.string().min(1),
        NEXT_PUBLIC_IMAGE: z.string().min(1),
        NEXT_PUBLIC_HOST: z.string().min(1),
        NEXT_PUBLIC_WS_URL: z.string().min(1),
        NEXT_PUBLIC_GOOGLE_LOGIN: z.string().min(1), 
    },
    runtimeEnv: {
        NEXT_PUBLIC_APP_URL:
            process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        NEXT_PUBLIC_BACKEND_DOMAIN:
            process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:8386', 
        NEXT_PUBLIC_BACKEND_CHATBOT:
            process.env.NEXT_PUBLIC_BACKEND_CHATBOT || 'http://localhost:5000', 
           
        NEXT_PUBLIC_WS_URL:
            process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8386/ws',
        NEXT_PUBLIC_IMAGE:
            process.env.NEXT_PUBLIC_IMAGE || '/assets/images',
        NEXT_PUBLIC_GOOGLE_LOGIN:
            process.env.NEXT_PUBLIC_GOOGLE_LOGIN || 'http://localhost:8386/oauth2/authorization/google',
        NEXT_PUBLIC_HOST: 
                process.env.NEXT_PUBLIC_HOST || "localhost"
    }
})