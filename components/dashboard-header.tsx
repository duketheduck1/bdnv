import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogout } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const { address } = useAccount();
  const { logout } = useLogout();
  const router = useRouter();
  
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="border-b border-border/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          {address && (
            <span className="text-muted-foreground">
              {shortenAddress(address)}
            </span>
          )}
        </div>
        
        <Button
          variant="outline"
          onClick={() => { logout(); router.push('/') }}
          className="border-border/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    </header>
  );
}