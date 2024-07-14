// memo: 이러한 타입선언이 가능한 이유 -> https://authjs.dev/getting-started/typescript#module-augmentation
import { DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    access_token?: string;
    expires_at?: number;
    error?: 'RefreshAccessTokenError';
    userId?: string;
  }

  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
  }
}
