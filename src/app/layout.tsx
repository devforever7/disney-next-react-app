import type { Metadata } from 'next';
import './globals.css';
import { Lato } from 'next/font/google';
import { Footer } from '@/app/components/layout/Footer/Footer';

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Disney Character Explorer',
  description: 'Explore Disney characters and their stories',
};

/**
 * Root layout implementing:
 * - Global font configuration
 * - Base HTML structure
 * - Footer integration
 * @component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${lato.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
