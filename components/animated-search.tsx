import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const suggestedDomains = [
  'bahamut',
  'crypto',
  'defi',
  'nft',
  'stake',
  'blockchain',
  'web3',
];

const AnimatedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => (prev + 0.05) % 1);
    }, 100);
    
    return () => clearInterval(glowInterval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        if (!searchTerm) {
          setPlaceholder(suggestedDomains[currentIndex] + '.ftn');
        }
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % suggestedDomains.length);
            setIsTyping(true);
          }, 1000);
        }, 1500);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isTyping, searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setPlaceholder('');
      setShowResults(true);
    } else {
      setPlaceholder(suggestedDomains[currentIndex] + '.ftn');
      setShowResults(false);
    }
  };

  const MockResult = ({ name, available }: { name: string, available: boolean }) => (
    <div className="flex items-center justify-between p-4 border-b border-border/10 hover:bg-accent/5 transition-colors">
      <div className="flex items-center">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-lg font-medium text-muted-foreground">.ftn</span>
      </div>
      <div className="flex items-center">
        {available ? (
          <>
            <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
            <span className="text-green-400">Available</span>
            <Button size="sm" variant="outline" className="ml-4 bg-chart-1/20 border border-chart-1 hover:bg-chart-1 hover:text-white">
              Register
            </Button>
          </>
        ) : (
          <>
            <div className="h-3 w-3 rounded-full bg-destructive mr-2"></div>
            <span className="text-destructive">Taken</span>
          </>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div 
          className="bg-card/50 backdrop-blur-xl rounded-lg border border-border/50 flex items-center overflow-hidden shadow-xl transition-all duration-500"
          style={{
            boxShadow: `0 0 ${10 + glowIntensity * 15}px ${5 + glowIntensity * 10}px hsl(var(--chart-1) / ${0.3 + glowIntensity * 0.2})`,
          }}
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for your .ftn name"
            className="flex-1 bg-transparent border-none text-xl py-7 px-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
          />
          <div className="px-4">
            <Button 
              type="submit" 
              className="bg-chart-1 hover:bg-chart-1/90 text-white px-8 py-6 transition-all duration-300 hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
        
        {!searchTerm && placeholder && (
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <div className="typing-container">
              <span className="typing-text opacity-50 text-muted-foreground">{placeholder}</span>
            </div>
          </div>
        )}
        
        {showResults && (
          <div className="mt-2 bg-card/50 backdrop-blur-xl rounded-lg border border-border/50 overflow-hidden animate-fade-in">
            <MockResult name={searchTerm || "bahamut"} available={true} />
            <MockResult name="crypt0" available={false} />
            <MockResult name="defi" available={false} />
            <MockResult name="stake" available={true} />
            <MockResult name="blockchain" available={true} />
          </div>
        )}
      </form>
    </div>
  );
};

export default AnimatedSearch;