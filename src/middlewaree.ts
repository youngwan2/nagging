// reference: https://authjs.dev/getting-started/installation
export { auth as middleware } from '../lib/auth';

// 미들웨어 실행 금지 경로 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
