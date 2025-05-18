'use client';

import { useLogin } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { PricingSection } from '@/components/pricing-section';
import { SecuritySection } from '@/components/security-section';
import { Footer } from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Home() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push('/dashboard'),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <PricingSection />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
}
