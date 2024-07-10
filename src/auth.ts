// reference: https://authjs.dev/getting-started/installation
// reference: https://authjs.dev/getting-started/authentication/oauth
// reference: https://authjs.dev/getting-started/session-management/protecting
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    // 로그인한 사용자는 인증되며, 그렇지 않으면 로그인 페이지로 리디렉션
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
