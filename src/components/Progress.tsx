'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

interface ProgressProps {
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'danger';
  className?: string;
}

const sizeStyles = {
  sm: 'h-[2px]',
  md: 'h-[3px]',
  lg: 'h-[4px]',
};

const variantColors = {
  default: 'bg-[var(--border-strong)]',
  accent: 'bg-[var(--accent)]',
  danger: 'bg-[var(--danger)]',
};

export function Progress({ 
  value, 
  showLabel = false, 
  size = 'md', 
  variant = 'accent',
  className 
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {/* 进度条容器 */}
      <div className={cn(
        'relative w-full bg-[var(--border-weak)] overflow-hidden',
        sizeStyles[size]
      )}>
        {/* 填充条 */}
        <motion.div
          className={cn('h-full', variantColors[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ 
            duration: MOTION.duration.slow, 
            ease: MOTION.easing.default 
          }}
        />
      </div>
      
      {/* 百分比标签 */}
      {showLabel && (
        <div className="mt-2 text-[12px] text-[var(--text-secondary)] font-mono text-right">
          {clampedValue.toFixed(0)}%
        </div>
      )}
    </div>
  );
}

// Spinner 加载器
interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <motion.div
      className={cn('border-2 border-current border-t-transparent rounded-full', className)}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}
