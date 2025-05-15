"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import { 
  Search, 
  LockIcon, 
  VerifiedIcon, 
  RefreshCcwIcon 
} from "lucide-react";

const steps = [
  {
    title: "Search",
    description: "Find your perfect .ftn domain name using our search tool.",
    icon: Search,
    color: "from-chart-1 to-chart-2"
  },
  {
    title: "Stake",
    description: "Lock your FTN tokens to secure your domain (no fees, just staking).",
    icon: LockIcon,
    color: "from-chart-2 to-chart-3"
  },
  {
    title: "Register",
    description: "Complete registration to start using your .ftn domain.",
    icon: VerifiedIcon,
    color: "from-chart-3 to-chart-4"
  },
  {
    title: "Renew",
    description: "Maintain your stake to keep your domain active indefinitely.",
    icon: RefreshCcwIcon,
    color: "from-chart-4 to-chart-5"
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section 
      id="how-it-works"
      ref={ref}
      className={cn(
        "py-20 relative transition-all duration-1000 ease-in-out",
        inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BNS uses a staking model rather than a fee-based system. Your tokens remain yours while securing your domain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="flex flex-col space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "border rounded-lg p-6 cursor-pointer transition-all duration-300 transform",
                  activeStep === index 
                    ? "border-primary shadow-lg scale-105" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start">
                  <div 
                    className={cn(
                      "flex items-center justify-center h-12 w-12 rounded-full mr-4 bg-gradient-to-r",
                      step.color
                    )}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-96 w-full max-w-md border rounded-lg bg-card overflow-hidden">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 h-full w-full transition-all duration-500 p-6 flex flex-col items-center justify-center",
                    activeStep === index 
                      ? "opacity-100 transform translate-y-0" 
                      : "opacity-0 transform translate-y-10 pointer-events-none"
                  )}
                >
                  <div 
                    className={cn(
                      "h-24 w-24 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r",
                      step.color
                    )}
                  >
                    <step.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                  
                  {index === 0 && (
                    <div className="relative w-full max-w-xs">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <input 
                          type="text" 
                          className="w-full p-2 bg-transparent border-0 focus:outline-none" 
                          placeholder="yourdomain.ftn"
                        />
                        <Button size="sm" className="m-1">Search</Button>
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="space-y-4 text-center">
                      <p className="text-lg font-semibold">Stake 250 FTN</p>
                      <p className="text-muted-foreground text-sm">Your tokens remain in your custody</p>
                      <Button>Stake Tokens</Button>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-4">
                        <p className="text-green-500 font-semibold">Registration Complete!</p>
                        <p className="text-lg font-bold">yourdomain.ftn</p>
                      </div>
                      <Button>Manage Records</Button>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className="text-center space-y-3">
                      <p className="text-lg">Domain Valid Until:</p>
                      <p className="text-xl font-bold">June 15, 2026</p>
                      <p className="text-muted-foreground text-sm">
                        Your staked tokens secure your domain
                      </p>
                      <Button>Extend Staking Period</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}