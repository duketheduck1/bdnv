'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, TrendingUp, Clock, Coins, Shield, BarChart3 } from 'lucide-react';
import DomainCard from '@/components/domain-card';
import EmptyState from '@/components/empty-state';
import DashboardHeader from '@/components/dashboard-header';
import { usePrivy } from "@privy-io/react-auth";
import WalletInfo from "@/components/wallet-info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

// Enhanced mock data with staking information - replace with actual API calls
const mockDomains = [
  { 
    id: 1, 
    name: 'vitalik.ftn', 
    expiresAt: Date.now() + 2592000000, // ~30 days
    registeredAt: Date.now() - 9 * 30 * 24 * 60 * 60 * 1000, // ~9 months ago
    stakingAmount: 1200,
    stakingRewards: 108,
    estimatedValue: 1500,
    valueGrowth: 25, // percentage
    records: { 
      address: '0x123...', 
      contentHash: 'ipfs://...',
      email: 'contact@example.com',
      url: 'https://example.com'
    } as { [key: string]: string }
  },
  { 
    id: 2, 
    name: 'ethereum.ftn', 
    expiresAt: Date.now() + 5184000000, // ~60 days
    registeredAt: Date.now() - 6 * 30 * 24 * 60 * 60 * 1000, // ~6 months ago
    stakingAmount: 2400,
    stakingRewards: 144,
    estimatedValue: 3200,
    valueGrowth: 33, // percentage
    records: { 
      address: '0x456...', 
      contentHash: 'ipfs://...',
      twitter: '@example',
      discord: 'example#1234'
    } as { [key: string]: string }
  },
  { 
    id: 3, 
    name: 'bahamut.ftn', 
    expiresAt: Date.now() + 7776000000, // ~90 days
    registeredAt: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, // ~3 months ago
    stakingAmount: 3600,
    stakingRewards: 81,
    estimatedValue: 4000,
    valueGrowth: 11, // percentage
    records: { 
      address: '0x789...', 
      contentHash: 'ipfs://...',
      avatar: 'ipfs://...',
      description: 'Official Bahamut domain'
    } as { [key: string]: string }
  },
];

// Mock data for staking rewards chart
const stakingRewardsData = [
  { month: 'Jan', rewards: 20 },
  { month: 'Feb', rewards: 42 },
  { month: 'Mar', rewards: 65 },
  { month: 'Apr', rewards: 89 },
  { month: 'May', rewards: 112 },
  { month: 'Jun', rewards: 138 },
  { month: 'Jul', rewards: 160 },
  { month: 'Aug', rewards: 185 },
  { month: 'Sep', rewards: 210 },
  { month: 'Oct', rewards: 235 },
  { month: 'Nov', rewards: 262 },
  { month: 'Dec', rewards: 290 },
];

// Mock data for domain value chart
const domainValueData = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 1350 },
  { month: 'Apr', value: 1500 },
  { month: 'May', value: 1800 },
  { month: 'Jun', value: 2100 },
  { month: 'Jul', value: 2400 },
  { month: 'Aug', value: 2700 },
  { month: 'Sep', value: 3000 },
  { month: 'Oct', value: 3400 },
  { month: 'Nov', value: 3800 },
  { month: 'Dec', value: 4200 },
];

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [domains, setDomains] = useState(mockDomains);
  const [verifyResult, setVerifyResult] = useState<any>(null);

  // Use Privy hooks for authentication
  const { ready, authenticated } = usePrivy();

  // Calculate total staking stats
  const totalStaked = domains.reduce((sum, domain) => sum + domain.stakingAmount, 0);
  const totalRewards = domains.reduce((sum, domain) => sum + domain.stakingRewards, 0);
  const totalValue = domains.reduce((sum, domain) => sum + domain.estimatedValue, 0);
  
  // Calculate average time remaining
  const avgTimeRemaining = domains.length > 0 
    ? domains.reduce((sum, domain) => sum + (domain.expiresAt - Date.now()), 0) / domains.length / (1000 * 60 * 60 * 24)
    : 0;

  // Verify token on server
  async function verifyToken() {
    try {
      const result = await fetch('/api/verify');
      const data = await result.json();
      setVerifyResult(data);
      return data;
    } catch (error) {
      console.error('Error verifying token:', error);
      return { error: 'Failed to verify token' };
    }
  }

  // Handle authentication - redirect to home if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      console.log('User not authenticated, redirecting to home page');
      router.push('/');
    }
  }, [authenticated, ready, router]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Verify token when component mounts
  useEffect(() => {
    if (authenticated) {
      verifyToken();
    }
  }, [authenticated]);

  if (!ready || isLoading) {
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
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
              <Coins className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaked} FTN</div>
              <p className="text-xs text-muted-foreground">
                Locked in 12-month staking contracts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staking Rewards</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRewards} FTN</div>
              <p className="text-xs text-muted-foreground">
                +{(totalRewards / totalStaked * 100).toFixed(2)}% APY
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Domain Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalValue} FTN</div>
              <p className="text-xs text-muted-foreground">
                +{((totalValue - totalStaked) / totalStaked * 100).toFixed(2)}% growth
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time Remaining</CardTitle>
              <Clock className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgTimeRemaining)} days</div>
              <p className="text-xs text-muted-foreground">
                Until renewal needed
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Staking Rewards Growth</CardTitle>
              <CardDescription>
                Accumulated rewards from your staked domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-80" 
                config={{
                  rewards: {
                    label: 'Rewards',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
              >
                <AreaChart data={stakingRewardsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rewards" 
                    name="rewards"
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1)/0.2)" 
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Domain Value Appreciation</CardTitle>
              <CardDescription>
                Estimated value growth of your domains over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-80" 
                config={{
                  value: {
                    label: 'Value',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
              >
                <AreaChart data={domainValueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="value"
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1)/0.2)" 
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Domains</h1>
          <div className="text-sm text-muted-foreground">
            {domains.length} domains registered
          </div>
        </div>
        
        {domains.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:gap-6">
            {domains.map((domain) => (
              <DomainCard 
                key={domain.id} 
                domain={{
                  ...domain,
                  id: domain.id,
                  name: domain.name,
                  expiresAt: domain.expiresAt,
                  records: domain.records
                }} 
              />
            ))}
          </div>
        )}
        
        {/* Validator Node Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-chart-1" />
              Validator Node Status
            </CardTitle>
            <CardDescription>
              When staking pool reaches 8000 FTN, a new validator node is launched
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Staking Pool Progress</div>
                  <div className="text-xs text-muted-foreground">
                    {totalStaked} / 8000 FTN
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {Math.round(totalStaked / 8000 * 100)}%
                </div>
              </div>
              <Progress value={totalStaked / 8000 * 100} className="h-2" />
              
              <div className="text-sm mt-4">
                <div className="font-medium mb-1">Current Staking Strategy:</div>
                <div className="text-muted-foreground">
                  {totalStaked >= 8000 ? (
                    <span className="text-green-500 font-medium">Validator Node Active</span>
                  ) : (
                    <span>DeFi Staking Pool (until 8000 FTN threshold reached)</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Server Verification Result */}
        {verifyResult && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Server Verification</CardTitle>
              <CardDescription>
                Result of server-side token verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md overflow-auto">
                {JSON.stringify(verifyResult, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
