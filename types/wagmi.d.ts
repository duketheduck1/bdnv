// Mock type definitions for wagmi
declare module 'wagmi' {
  export function useAccount(): {
    address?: string;
    chain?: {
      id?: number;
      name?: string;
    };
  };

  export function useBalance(params: { address?: string }): {
    data?: {
      formatted: string;
      symbol: string;
    };
  };

  export function useDisconnect(): {
    disconnect: () => void;
  };

  export function createConfig(config: any): any;
  export function http(): any;
  export const WagmiProvider: React.FC<{ config: any; children: React.ReactNode }>;

  export const chains: {
    mainnet: {
      id: number;
      name: string;
    };
  };
}

declare module 'wagmi/chains' {
  export const mainnet: {
    id: number;
    name: string;
  };
}
