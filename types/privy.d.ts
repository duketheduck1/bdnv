// Mock type definitions for @privy-io/react-auth
declare module '@privy-io/react-auth' {
  import * as React from 'react';

  export function usePrivy(): {
    ready: boolean;
    authenticated: boolean;
    user?: {
      id: string;
      email?: string;
    };
  };

  export function useWallets(): {
    wallets: Array<{
      address: string;
      chainId: string;
    }>;
  };

  export interface LoginOptions {
    loginMethods?: string[];
    walletChainType?: string;
    disableSignup?: boolean;
    [key: string]: any;
  }

  export interface LoginCallbacks {
    onComplete?: (params: any) => void;
    onError?: (error: any) => void;
  }

  export function useLogin(callbacks?: LoginCallbacks): {
    login: (options?: LoginOptions) => Promise<void>;
  };

  export function useLogout(): {
    logout: () => Promise<void>;
  };

  export interface PrivyProviderProps {
    appId: string;
    clientId: string;
    config?: {
      loginMethods?: string[];
      appearance?: {
        theme?: string;
        accentColor?: string;
        logo?: string;
      };
      [key: string]: any;
    };
    children: React.ReactNode;
  }

  export const PrivyProvider: React.FC<PrivyProviderProps>;
}
