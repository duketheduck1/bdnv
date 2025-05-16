import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg p-8 text-center"
    >
      <div className="mx-auto w-16 h-16 bg-chart-1/20 rounded-full flex items-center justify-center mb-4">
        <PlusCircle className="h-8 w-8 text-chart-1" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Domains Found</h3>
      <p className="text-muted-foreground mb-6">Start by registering your first .ftn domain name</p>
      <Link href="/">
        <Button className="bg-chart-1 hover:bg-chart-1/90">
          Register a Domain
        </Button>
      </Link>
    </motion.div>
  );
}