import './globals.css';

import localFront from 'next/font/local';

import Header from '@src/comments/ui/layout/Header';
import Footer from '@src/comments/ui/layout/Footer';
import ReactQueryProvider from '@src/comments/Provider';
import { Toaster } from 'react-hot-toast';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { Metadata, Viewport } from 'next';
import Navigation from '@src/comments/ui/nav/Navigation';

const pretendard = localFront({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const APP_NAME = '잔소리';
const APP_DEFAULT_TITLE = '잔소리';
const APP_TITLE_TEMPLATE = '%s - 잔소리';
const APP_DESCRIPTION = '애드센스 순수익 계산을 손쉽게 처리하고, 수익 신고를 간편하게!';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`dark ${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Header />
        <div className="flex justify-between">
          <Navigation />
          <Toaster />
          <main className="md:px-24 md:w-full w-auto px-5 py-14 justify-start flex min-h-screen  flex-col items-center dark:bg-black transition-colors">
            <ReactQueryProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
