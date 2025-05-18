import { create } from 'zustand'
// Define ConnectedWallet type since it's not exported from the type definitions
interface ConnectedWallet {
    address: string;
    chainId: string;
    [key: string]: any;
}

interface WalletState {
    wallets: ConnectedWallet[]
    setWalletData: (wallets: ConnectedWallet[]) => void
    clearWalletData: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
    wallets: [],
    setWalletData: (wallets) => set({ wallets }),
    clearWalletData: () => set({ wallets: [] })
}))
