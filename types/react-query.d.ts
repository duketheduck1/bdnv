// Mock type definitions for @tanstack/react-query
declare module '@tanstack/react-query' {
  import * as React from 'react';

  export interface QueryClientConfig {
    defaultOptions?: {
      queries?: {
        retry?: boolean | number | ((failureCount: number, error: Error) => boolean);
        staleTime?: number;
        cacheTime?: number;
        refetchOnWindowFocus?: boolean;
        refetchOnReconnect?: boolean;
        refetchOnMount?: boolean;
        [key: string]: any;
      };
      mutations?: {
        retry?: boolean | number | ((failureCount: number, error: Error) => boolean);
        [key: string]: any;
      };
    };
  }

  export class QueryClient {
    constructor(config?: QueryClientConfig);
    clear(): void;
    invalidateQueries(options?: any): Promise<void>;
    resetQueries(options?: any): Promise<void>;
    refetchQueries(options?: any): Promise<void>;
    [key: string]: any;
  }

  export interface QueryClientProviderProps {
    client: QueryClient;
    children: React.ReactNode;
  }

  export const QueryClientProvider: React.FC<QueryClientProviderProps>;
}
