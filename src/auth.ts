// install: https://authjs.dev/getting-started/installation
// oauth: https://authjs.dev/getting-started/authentication/oauth
// session-management: https://authjs.dev/getting-started/session-management/protecting
// db adapter: https://authjs.dev/getting-started/adapters/prisma
// Auth.js google : https://authjs.dev/getting-started/providers/google
// rotation token: https://authjs.dev/guides/refresh-token-rotation
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          // 이렇게 설정하면 구글에서 리프레쉬 토큰을 제공합니다.
          access_type: 'offline',
          prompt: 'consent',
          // 주의!) 스코프는 , 아니라 공백으로 구분 됩니다
          scope:
            'https://www.googleapis.com/auth/adsense.readonly https://www.googleapis.com/auth/userinfo.profile openid profile email',
        },
      },
    }),
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_USER,
    }),
  ],
  pages: {
    signOut: '/auth/signout',
  },
  callbacks: {
    /* >>>>>>> 세션 <<<<<<<<<<< */
    async session({ session, user }) {
      const [googleAccount] = await prisma.account.findMany({
        where: { userId: user.id, provider: 'google' },
      });

      // 로그인 시 받은 액세스 토큰 저장
      session.access_token = googleAccount.access_token! as string;

      // 현재 시간 보다 토큰 만료 날짜가 작다면 새 토큰 발급
      if (googleAccount.expires_at! * 1000 < Date.now()) {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: googleAccount.refresh_token as string,
            }),
            method: 'POST',
          });

          const responseTokens = await response.json();

          if (!response.ok) throw responseTokens;

          await prisma.account.update({
            data: {
              access_token: responseTokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + responseTokens.expires_in,
              ),
              refresh_token:
                responseTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          });

          // 새로 발급 받은 토큰 세션에 저장
          session.access_token = googleAccount.access_token! as string;
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property can be used client-side to handle the refresh token error
          session.error = 'RefreshAccessTokenError';
        }
      }
      return session;
    },
  },
  trustHost: true,
});
