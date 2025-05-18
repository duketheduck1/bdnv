"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis as RechartsXAxis, 
  YAxis as RechartsYAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

// Domain examples with staking amounts based on length and popularity
const domainExamples = [
  { name: "crypto.ftn", length: 6, stake: 2000, popularity: "Very High" },
  { name: "bitcoin.ftn", length: 7, stake: 1800, popularity: "High" },
  { name: "nft.ftn", length: 3, stake: 5000, popularity: "Very High" },
  { name: "metaverse.ftn", length: 9, stake: 1200, popularity: "Medium" },
  { name: "dao.ftn", length: 3, stake: 5500, popularity: "Very High" },
  { name: "stake.ftn", length: 5, stake: 2500, popularity: "High" },
  { name: "web3.ftn", length: 4, stake: 3500, popularity: "High" },
  { name: "blockchain.ftn", length: 10, stake: 950, popularity: "Medium" },
  { name: "defi.ftn", length: 4, stake: 3200, popularity: "High" },
  { name: "hodl.ftn", length: 4, stake: 2800, popularity: "Medium" },
];

// Data for length-based pricing chart
const lengthPricingData = [
  { length: "2-3 letters", baseCost: 5000 },
  { length: "4 letters", baseCost: 3000 },
  { length: "5 letters", baseCost: 2000 },
  { length: "6-7 letters", baseCost: 1500 },
  { length: "8+ letters", baseCost: 800 },
];

// Custom tooltip for chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-bold">{payload[0].payload.length}</p>
        <p>Base Cost: <span className="font-medium">{payload[0].value} FTN</span></p>
        <p className="text-xs text-muted-foreground mt-1">Actual price may vary based on demand</p>
      </div>
    );
  }
  return null;
};

export function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [selectedExample, setSelectedExample] = useState<(typeof domainExamples)[0] | null>(null);
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#fff' : 'var(--muted-foreground)';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'var(--border)';
  const barColor = theme === 'dark' ? '#fff' : 'var(--primary)';

  return (
    <section
      id="pricing"
      ref={ref}
      className={cn(
        "py-20 transition-all duration-1000 ease-in-out",
        inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Shorter and more memorable domains have higher stake requirements. 
            Your tokens are locked, not spent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Length-Based Pricing</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lengthPricingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <RechartsXAxis 
                    dataKey="length" 
                    tick={{ fill: axisColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                    height={70}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    dx={-8}
                    dy={8}
                  />
                  <RechartsYAxis 
                    tick={{ fill: axisColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                    tickFormatter={(value) => `${value} FTN`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="baseCost" radius={[4, 4, 0, 0]} fill={barColor} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                Auction-Based Model
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 ml-2 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Popular domains may have increased staking requirements based on demand.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </h4>
              <p className="text-muted-foreground">
                Our pricing adjusts based on real-time market demand. The more 
                interest in a domain, the higher the stake requirement.
              </p>
              <div className="pt-4">
                <Button>View Auction Details</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Domain Examples</h3>
            
            <Card className={cn(
              "transition-all duration-300 mb-8",
              selectedExample ? "border-primary shadow-lg" : "border-border"
            )}>
              <CardHeader>
                <CardTitle className="text-xl">
                  {selectedExample ? selectedExample.name : "Select a Domain"}
                </CardTitle>
                <CardDescription>
                  {selectedExample 
                    ? `${selectedExample.length} characters, ${selectedExample.popularity} popularity` 
                    : "Click an example to see details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedExample ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Staking Amount:</span>
                      <span className="text-xl font-bold">{selectedExample.stake} FTN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Your Tokens Spent:</span>
                      <span className="text-green-500 font-medium">0 FTN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Unstake After:</span>
                      <span>Any time (lose domain)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a domain example to see detailed pricing
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {selectedExample && (
                  <Button className="w-full">
                    Search for Similar Domains
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              {domainExamples.map((domain, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 px-4",
                    selectedExample?.name === domain.name && "border-primary bg-primary/5"
                  )}
                  onClick={() => setSelectedExample(domain)}
                >
                  <div className="text-left">
                    <p className="font-bold">{domain.name}</p>
                    <p className="text-xs text-muted-foreground">{domain.stake} FTN</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}