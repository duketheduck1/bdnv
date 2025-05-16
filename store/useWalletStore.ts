import { create } from 'zustand'
import { ConnectedWallet } from '@privy-io/react-auth'

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