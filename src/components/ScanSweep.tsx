'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScanSweepProps {
  onComplete?: () => void;
  duration?: number;
}

export function ScanSweep({ onComplete, duration = 1.2 }: ScanSweepProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: duration, duration: 0.3 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[40px]"
        style={{
          background: 'linear-gradient(to bottom, rgba(var(--accent-rgb),0.15) 0%, rgba(var(--accent-rgb),0.05) 50%, transparent 100%)',
        }}
        initial={{ top: '-40px' }}
        animate={{ top: '100%' }}
        transition={{ duration, ease: 'linear' }}
      />
    </motion.div>
  );
}
