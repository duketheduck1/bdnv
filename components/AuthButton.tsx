'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ReactNode } from "react";
import { ButtonProps } from "@/components/ui/button";

interface AuthButtonProps extends ButtonProps {
  children?: ReactNode;
}

export default function AuthButton({ children, variant, ...props }: AuthButtonProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <Button
      variant={variant || "outline"}
      className="hidden sm:flex items-center gap-2 text-sm border border-border/80 hover:bg-accent"
      onClick={handleLoginRedirect}
      {...props}
    >
      {children}
    </Button>
  );
}