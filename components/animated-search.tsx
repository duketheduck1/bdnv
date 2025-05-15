"use client";

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
  const [showResults, setShowResults] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  
  useEffect(() => {
    if (searchTerm) return;
    
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % suggestedDomains.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(!!e.target.value);
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
        <div className="glass-effect rounded-lg flex items-center overflow-hidden shadow-xl">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={`${suggestedDomains[currentPlaceholder]}.ftn`}
            className="flex-1 bg-transparent border-none text-xl py-7 px-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors placeholder:text-muted-foreground/50"
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
        
        {showResults && (
          <div className="mt-2 glass-effect rounded-lg overflow-hidden animate-fade-in">
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