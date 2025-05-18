'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Card } from './ui/card';
import { Wallet, CreditCard } from 'lucide-react';

export default function WalletInfo() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  
  // Get the primary wallet if available
  const primaryWallet = wallets[0];
  const address = primaryWallet?.address || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  
  // Mock balance data for demonstration
  const balance = { formatted: '1000', symbol: 'FTN' };
  const chainName = 'Bahamut';
  const chainId = 1;

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <Card className="p-6 flex items-start space-x-4">
        <div className="p-2 bg-chart-1/10 rounded-lg">
          <Wallet className="h-6 w-6 text-chart-1" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Wallet Address</h3>
          <p className="text-sm text-muted-foreground font-mono">
            {address ? 
              `${address.slice(0, 6)}...${address.slice(-4)}` : 
              'Not Connected'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Network: {chainName}</p>
        </div>
      </Card>

      <Card className="p-6 flex items-start space-x-4">
        <div className="p-2 bg-chart-1/10 rounded-lg">
          <CreditCard className="h-6 w-6 text-chart-1" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Balance</h3>
          <p className="text-2xl font-bold">{balance?.formatted || '0'} {balance?.symbol}</p>
          <p className="text-sm text-muted-foreground mt-2">Chain ID: {chainId}</p>
        </div>
      </Card>
    </div>
  );
}
