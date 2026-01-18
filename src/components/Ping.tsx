'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

interface PingProps {
  size?: number;
  color?: string;
  className?: string;
}

export function Ping({ size = 80, color = 'var(--accent)', className }: PingProps) {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${color}` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: MOTION.duration.fast, repeat: Infinity }}
      />
      <div className="absolute inset-1 rounded-full" style={{ border: `1px solid ${color}` }} />
      <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: color }} />
    </div>
  );
}
