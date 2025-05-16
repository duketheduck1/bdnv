"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import AnimatedSearch from "./animated-search";
import WalletLoginButton from "./WalletLoginButton";

export function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={cn(
        "py-20 md:py-32 transition-all duration-1000 ease-in-out",
        inView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
      )}
    >
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-5 bg-clip-text text-transparent">
            Secure Your .ftn Domain
            <span className="block mt-2">Stake, Don&apos;t Pay</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The first domain service where you lock tokens instead of spending them. 
            Your tokens, your domain, forever.
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <AnimatedSearch />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <WalletLoginButton size="lg" variant="outline" />
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}