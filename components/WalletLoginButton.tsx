'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { Wallet2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";
import { useRouter } from 'next/navigation';

interface WalletLoginButtonProps extends ButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function WalletLoginButton({variant, ...props}: WalletLoginButtonProps) {
    const router = useRouter();
    const { ready, authenticated } = usePrivy();
    
    // Simple login with redirect to dashboard
    const { login } = useLogin({
        onComplete: () => router.push('/dashboard'),
    });

    // Development bypass for testing
    const handleDevBypass = () => {
        console.log('Using development bypass');
        router.push('/dashboard');
    };

    return (
        <div className="flex gap-2">
            {/* Connect wallet button */}
            <Button
                variant={variant || "outline"}
                disabled={!ready || (ready && authenticated)}
                onClick={() => login()}
                className="flex items-center gap-2 text-sm border border-border/80 hover:bg-accent"
                {...props}
            >
                <Wallet2 className="w-4 h-4" />
                {authenticated ? 'Connected' : 'Connect Wallet'}
            </Button>
            
            {/* Show development bypass button only in development mode */}
            {process.env.NODE_ENV === 'development' && (
                <Button
                    variant="default"
                    onClick={handleDevBypass}
                    className="flex items-center gap-2 text-sm bg-chart-1 hover:bg-chart-1/90"
                >
                    <Wallet2 className="w-4 h-4" />
                    Dev Mode
                </Button>
            )}
        </div>
    );
}
