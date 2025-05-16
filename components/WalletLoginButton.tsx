import { useLogin, usePrivy } from '@privy-io/react-auth';
import { Wallet2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";

interface WalletLoginButtonProps extends ButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function WalletLoginButton({variant, ...props}: WalletLoginButtonProps) {
    const { ready, authenticated } = usePrivy();
    const { login } = useLogin();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);

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
            Connect Wallet
        </Button>
    );
}