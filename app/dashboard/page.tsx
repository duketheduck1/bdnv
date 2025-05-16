'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Loader2 } from 'lucide-react';
import DomainCard from '@/components/domain-card';
import EmptyState from '@/components/empty-state';
import DashboardHeader from '@/components/dashboard-header';
import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth";
import WalletInfo from "@/components/wallet-info";

// Mock data - replace with actual API calls
const mockDomains = [
  { id: 1, name: 'vitalik.ftn', expiresAt: Date.now() + 2592000000, records: { address: '0x123...', contentHash: 'ipfs://...' } },
  { id: 2, name: 'ethereum.ftn', expiresAt: Date.now() + 5184000000, records: { address: '0x456...', contentHash: 'ipfs://...' } },
];

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [domains, setDomains] = useState(mockDomains);

  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { login } = useLogin();

  // useEffect(() => {
  //   if (!authenticated && !ready) {
  //     router.push('/');
  //   }
  // }, [authenticated, ready, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-chart-1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <WalletInfo />
        <h1 className="text-3xl font-bold mb-8">Your Domains</h1>
        
        {domains.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:gap-6">
            {domains.map((domain) => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}