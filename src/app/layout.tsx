import type {Metadata} from 'next';
import {Geist, Geist_Mono, Cormorant_Garamond} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Lyriqa',
  description: 'Craft immersive, structured poetry using advanced AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
