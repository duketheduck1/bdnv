"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Server, Lock, Cpu } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const securityFeatures = [
  {
    title: "Smart Contract Safety",
    description: "BNS contracts are audited by top security firms and follow industry best practices.",
    icon: Shield,
    color: "from-chart-1 to-chart-2",
  },
  {
    title: "Validator Network",
    description: "Decentralized validators maintain the network, with new nodes added at every 8,000 FTN threshold.",
    icon: Server,
    color: "from-chart-2 to-chart-3",
  },
  {
    title: "Token Custody",
    description: "Your staked tokens remain under your control with no third-party custody risks.",
    icon: Lock,
    color: "from-chart-3 to-chart-4",
  },
  {
    title: "Bahamut Chain Security",
    description: "Built on Bahamut's high-performance blockchain with robust security protocols.",
    icon: Cpu,
    color: "from-chart-4 to-chart-5",
  },
];

export function SecuritySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="security"
      ref={ref}
      className={cn(
        "py-20 transition-all duration-1000 ease-in-out",
        inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Decentralization</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BNS is built on core principles of security, decentralization, and user sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="border border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r",
                  feature.color
                )}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card border border-border rounded-lg overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <h3 className="text-2xl font-bold mb-4">Validator Network Mechanics</h3>
              <p className="text-muted-foreground mb-6">
                BNS operates on a unique validator model where network growth directly impacts infrastructure:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-chart-1 flex items-center justify-center mt-1 mr-2">
                    <span className="text-xs text-white font-bold">1</span>
                  </div>
                  <p>Every 8,000 FTN staked activates a new validator node</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-chart-2 flex items-center justify-center mt-1 mr-2">
                    <span className="text-xs text-white font-bold">2</span>
                  </div>
                  <p>Domain registrations directly strengthen network security</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center mt-1 mr-2">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                  <p>Validators provide decentralized domain resolution</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-chart-4 flex items-center justify-center mt-1 mr-2">
                    <span className="text-xs text-white font-bold">4</span>
                  </div>
                  <p>Automatic scaling ensures optimal network performance</p>
                </li>
              </ul>
              <Button>Learn More About Validators</Button>
            </div>
            <div className="bg-muted p-8 lg:p-10 flex items-center justify-center">
              <div className="relative w-full h-64">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">47,382</p>
                    <p className="text-sm text-muted-foreground">Total FTN Staked</p>
                  </div>
                </div>
                
                {/* Animated validators */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * 60) * (Math.PI / 180);
                  const radius = 90;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  
                  return (
                    <div 
                      key={i} 
                      className="absolute w-12 h-12 bg-card border-2 border-primary rounded-lg flex items-center justify-center shadow-lg"
                      style={{
                        top: `calc(50% - 24px ${y > 0 ? '+' : '-'} ${Math.abs(y).toFixed(2)}px)`,
                        left: `calc(50% - 24px ${x > 0 ? '+' : '-'} ${Math.abs(x).toFixed(2)}px)`,
                        animation: `pulse 2s infinite ${i * 0.5}s`
                      }}
                    >
                      <Server className="h-6 w-6 text-primary" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}