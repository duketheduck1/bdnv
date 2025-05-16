'use client';

import { useAccount, useBalance } from 'wagmi';
import { Card } from './ui/card';
import { Wallet, CreditCard } from 'lucide-react';

export default function WalletInfo() {
  const { address, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <Card className="p-6 flex items-start space-x-4">
        <div className="p-2 bg-chart-1/10 rounded-lg">
          <Wallet className="h-6 w-6 text-chart-1" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Wallet Address</h3>
          <p className="text-sm text-muted-foreground font-mono">{address}</p>
          <p className="text-sm text-muted-foreground mt-2">Network: {chain?.name || 'Not Connected'}</p>
        </div>
      </Card>

      <Card className="p-6 flex items-start space-x-4">
        <div className="p-2 bg-chart-1/10 rounded-lg">
          <CreditCard className="h-6 w-6 text-chart-1" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Balance</h3>
          <p className="text-2xl font-bold">{balance?.formatted || '0'} {balance?.symbol}</p>
          <p className="text-sm text-muted-foreground mt-2">Chain ID: {chain?.id || 'Unknown'}</p>
        </div>
      </Card>
    </div>
  );
}