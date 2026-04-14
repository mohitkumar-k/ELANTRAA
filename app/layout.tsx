import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AppProviders } from '@/components/providers';
import { BottomNav } from '@/components/bottom-nav';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ProcessingOverlay } from '@/components/processing-overlay';
import { Toaster } from 'sonner';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700']
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'ELANTRAA | Premium Ethnic Fashion',
  description: 'Luxury lehenga choli, sarees, and designer ethnic wear from ELANTRAA.',
  metadataBase: new URL('https://elantraa.com'),
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} font-sans`}>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
          <ProcessingOverlay />
          <Toaster richColors position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
}
