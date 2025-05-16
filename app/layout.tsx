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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}