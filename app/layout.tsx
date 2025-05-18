'use client';

import './globals.css';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create Wagmi config
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

// Create React Query client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get Privy credentials from environment variables
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
  const privyClientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || '';
  
  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId={privyAppId}
          clientId={privyClientId}
          config={{
            embeddedWallets: {
              createOnLogin: "all-users",
            },
            loginMethods: ['wallet', 'email', 'google'],
            appearance: {
              theme: 'light',
              accentColor: '#3B82F6'
            }
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
