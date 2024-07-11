import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@src/comments/ui/layout/Header';
import Footer from '@src/comments/ui/layout/Footer';
import Navigation from '@src/comments/Navigation';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = '잔소리';
const APP_DEFAULT_TITLE = '잔소리';
const APP_TITLE_TEMPLATE = '%s - 잔소리';
const APP_DESCRIPTION =
  '애드센스 순수익 계산을 손쉽게 처리하고, 수익 신고를 간편하게!';

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
    <html lang="kr" className="dark">
      <body className={inter.className}>
        <Header />
        <div className="flex w-full">
          <Navigation />
          <main className="flex min-h-screen  w-full flex-col items-center justify-between p-24 dark:bg-black transition-colors">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
