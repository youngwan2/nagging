// install: https://authjs.dev/getting-started/installation
// oauth: https://authjs.dev/getting-started/authentication/oauth
// session-management: https://authjs.dev/getting-started/session-management/protecting
// db adapter: https://authjs.dev/getting-started/adapters/prisma
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
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
    // signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    // 로그인한 사용자는 인증되며, 그렇지 않으면 로그인 페이지로 리디렉션
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
