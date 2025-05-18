import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Settings, TrendingUp, Coins, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

interface DomainCardProps {
  domain: {
    id: number;
    name: string;
    expiresAt: number;
    registeredAt?: number;
    stakingAmount?: number;
    stakingRewards?: number;
    estimatedValue?: number;
    valueGrowth?: number;
    records: {
      [key: string]: string;
    };
  };
}

export default function DomainCard({ domain }: DomainCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const timeRemaining = Math.floor((domain.expiresAt - Date.now()) / (1000 * 60 * 60 * 24));
  const timeRemainingPercent = domain.registeredAt 
    ? (100 - ((Date.now() - domain.registeredAt) / (365 * 24 * 60 * 60 * 1000) * 100))
    : 100;
  
  // Calculate time-based metrics
  const registrationAge = domain.registeredAt 
    ? Math.floor((Date.now() - domain.registeredAt) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect p-6 rounded-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{domain.name}</h3>
          <div className="flex items-center mt-2 text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{timeRemaining} days remaining</span>
            <Button 
              variant="link" 
              className="text-xs text-chart-1 p-0 h-auto ml-2"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="bg-chart-1/20 border border-chart-1 hover:bg-chart-1 hover:text-white"
            onClick={() => setIsUpdating(!isUpdating)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Update Records
          </Button>
          <Button 
            className="bg-chart-1 hover:bg-chart-1/90"
          >
            Renew Lease
          </Button>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 pt-4 border-t border-border/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Staking Information */}
            <Card className="bg-background/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Coins className="h-4 w-4 mr-2 text-chart-1" />
                  <h4 className="font-medium">Staking Details</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Staked Amount:</span>
                    <span className="font-medium">{domain.stakingAmount || 0} FTN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rewards Earned:</span>
                    <span className="font-medium text-green-500">+{domain.stakingRewards || 0} FTN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Registration Age:</span>
                    <span className="font-medium">{registrationAge} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Domain Value */}
            <Card className="bg-background/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-chart-1" />
                  <h4 className="font-medium">Domain Value</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Value:</span>
                    <span className="font-medium">{domain.estimatedValue || 0} FTN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Value Growth:</span>
                    <span className="font-medium text-green-500">+{domain.valueGrowth || 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ROI:</span>
                    <span className="font-medium">
                      {domain.stakingAmount && domain.estimatedValue 
                        ? ((domain.estimatedValue / domain.stakingAmount - 1) * 100).toFixed(2) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Lease Status */}
            <Card className="bg-background/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-chart-1" />
                  <h4 className="font-medium">Lease Status</h4>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time Remaining:</span>
                      <span className="font-medium">{timeRemaining} days</span>
                    </div>
                    <Progress value={timeRemainingPercent} className="h-1.5" />
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Renewal Date:</span>
                      <span className="font-medium">
                        {new Date(domain.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Auto-Renewal:</span>
                      <span className="font-medium text-green-500">Enabled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {isUpdating && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 pt-4 border-t border-border/10"
        >
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Address</label>
              <input
                type="text"
                defaultValue={domain.records.address}
                className="w-full mt-1 p-2 rounded-md bg-background border border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Content Hash</label>
              <input
                type="text"
                defaultValue={domain.records.contentHash}
                className="w-full mt-1 p-2 rounded-md bg-background border border-border"
              />
            </div>
            
            {/* Additional records */}
            {Object.entries(domain.records)
              .filter(([key]) => !['address', 'contentHash'].includes(key))
              .map(([key, value]) => (
                <div key={key}>
                  <label className="text-sm text-muted-foreground capitalize">{key}</label>
                  <input
                    type="text"
                    defaultValue={value}
                    className="w-full mt-1 p-2 rounded-md bg-background border border-border"
                  />
                </div>
              ))
            }
            
            <div className="flex justify-between">
              <Button className="w-fit">Save Changes</Button>
              <Button variant="outline" className="w-fit">
                <ArrowRight className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
