import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/components/UserContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'mObywatel Reborn',
  description: 'Cyfrowa tożsamość - wersja offline',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <UserProvider>
          {children}
          <Toaster position="top-center" />
        </UserProvider>
      </body>
    </html>
  );
}
