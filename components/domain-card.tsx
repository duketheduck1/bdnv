import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DomainCardProps {
  domain: {
    id: number;
    name: string;
    expiresAt: number;
    records: {
      address: string;
      contentHash: string;
    };
  };
}

export default function DomainCard({ domain }: DomainCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const timeRemaining = Math.floor((domain.expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

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
            <Button className="w-fit">Save Changes</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}