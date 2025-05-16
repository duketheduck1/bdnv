"use client";

import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import WalletLoginButton from "./WalletLoginButton";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b border-border/40">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-1">
              <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center">
                <span className="text-primary font-bold text-sm">BNS</span>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Bahamut Name Service
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    How It Works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#security" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Security
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <WalletLoginButton />
        </div>
      </div>
    </div>
  );
}