import Providers from "@/components/Providers";
import '@/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bahamut Name Service | Stake, Don\'t Pay',
  description: 'The first domain service where you lock tokens instead of spending them. Your tokens, your domain, forever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://res.cloudinary.com/dlyw0o11c/image/upload/v1747408803/bns-icon-logo-2025-05-14_m6cyzx.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}