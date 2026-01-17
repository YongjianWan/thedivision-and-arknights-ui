'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScanSweepProps {
  onComplete?: () => void;
  duration?: number;
  color?: string;
  interval?: number;
}

export function ScanSweep({ 
  onComplete, 
  duration = 1.2, 
  color = 'var(--accent)',
  interval 
}: ScanSweepProps) {
  const isRepeating = typeof interval === 'number';
  const repeatDelay = isRepeating ? Math.max(0, interval / 1000 - duration) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isRepeating ? 1 : 0 }}
      transition={isRepeating ? undefined : { delay: duration, duration: 0.3 }}
      onAnimationComplete={isRepeating ? undefined : onComplete}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[40px]"
        style={{
          background: 'linear-gradient(to bottom, color-mix(in srgb, var(--scan-color) 15%, transparent) 0%, color-mix(in srgb, var(--scan-color) 5%, transparent) 50%, transparent 100%)',
          ['--scan-color' as any]: color,
        }}
        initial={{ top: '-40px' }}
        animate={{ top: '100%' }}
        transition={{ duration, ease: 'linear', repeat: isRepeating ? Infinity : 0, repeatDelay }}
      />
    </motion.div>
  );
}
