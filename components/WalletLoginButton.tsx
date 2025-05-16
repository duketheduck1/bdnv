'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { Wallet2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";
import { useWalletStore } from '@/store/useWalletStore';
import { useEffect } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

interface WalletLoginButtonProps extends ButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function WalletLoginButton({variant, ...props}: WalletLoginButtonProps) {
    const { ready, authenticated } = usePrivy();
    const { wallets } = useWallets();
    const router = useRouter();
    const { login } = useLogin({
        onComplete: (params) => {
            console.log('Login successful:', params);
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Login error:', error);
        },
    });
    const setWalletData = useWalletStore(state => state.setWalletData);
    const clearWalletData = useWalletStore(state => state.clearWalletData);
    
    const disableLogin = !ready || (ready && authenticated);

    useEffect(() => {        
        if (authenticated && wallets.length > 0) {
            setWalletData(wallets);
        } else {
            clearWalletData();
        }
    }, [authenticated, wallets, setWalletData, clearWalletData]);

    const primaryWallet = wallets[0];

    return (
        <Button
            variant={variant || "outline"}
            disabled={disableLogin}
            onClick={() => login({
                loginMethods: ['wallet'],
                walletChainType: 'ethereum-and-solana',
                disableSignup: false
            })}
            className="hidden sm:flex items-center gap-2 text-sm border border-border/80 hover:bg-accent"
            {...props}
        >
            <Wallet2 className="w-4 h-4" />
            {authenticated ? primaryWallet?.address?.slice(0, 6) + '...' + primaryWallet?.address?.slice(-4) : 'Connect Wallet'}
        </Button>
    );
}