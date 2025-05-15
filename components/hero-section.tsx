"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

export function HeroSection() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | {
    available: boolean;
    price: string;
  }>(null);
  const [demoText, setDemoText] = useState("");
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Demo text typing effect
  useEffect(() => {
    const texts = ["satoshi", "vitalik", "web3", "bahamut", "crypto"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let pauseTime = 1500;

    const type = () => {
      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        setDemoText(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setDemoText(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = pauseTime;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
      }

      setTimeout(type, typingSpeed);
    };

    const typingTimeout = setTimeout(type, 1000);
    return () => clearTimeout(typingTimeout);
  }, []);

  const handleSearch = () => {
    if (!searchValue) return;
    
    setIsSearching(true);
    
    // Simulate API search with a delay
    setTimeout(() => {
      // Mock domain availability based on length
      const isAvailable = Math.random() > 0.5;
      
      // Calculate mock price - shorter domains cost more
      const basePriceInFTN = searchValue.length <= 3 ? 1000 : 
                            searchValue.length <= 5 ? 500 : 
                            searchValue.length <= 7 ? 200 : 100;
      
      // Add some randomness to price
      const finalPrice = basePriceInFTN + Math.floor(Math.random() * 100);
      
      setSearchResult({
        available: isAvailable,
        price: `${finalPrice} FTN`
      });
      
      setIsSearching(false);
    }, 1500);
  };

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
            <span className="block mt-2">Stake, Don't Pay</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The first domain service where you lock tokens instead of spending them. 
            Your tokens, your domain, forever.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 to-chart-5 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex bg-background border border-border rounded-lg p-2">
                <div className="flex items-center bg-muted px-3 rounded-md text-muted-foreground">
                  <span className="hidden sm:inline">bahamut.ftn/</span>
                  <span className="sm:hidden">bns/</span>
                </div>
                <Input
                  type="text"
                  placeholder={demoText || "Search for a name"}
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button 
                  size="sm" 
                  className="ml-2 bg-primary hover:bg-primary/90" 
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    <SearchIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {searchResult && (
              <div 
                className={cn(
                  "mt-4 p-4 rounded-lg border border-border animate-fade-in", 
                  searchResult.available ? "bg-green-500/10" : "bg-destructive/10"
                )}
              >
                <p className="flex items-center justify-center gap-2 font-medium">
                  {searchResult.available ? (
                    <>
                      <span className="text-green-500">"{searchValue}.ftn" is available!</span>
                      <span className="text-muted-foreground">Stake {searchResult.price} to claim it</span>
                    </>
                  ) : (
                    <span className="text-destructive-foreground">"{searchValue}.ftn" is already taken</span>
                  )}
                </p>
                
                {searchResult.available && (
                  <Button 
                    className="mt-3 bg-chart-1 hover:bg-chart-1/90"
                  >
                    Stake & Claim
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Connect Wallet
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}