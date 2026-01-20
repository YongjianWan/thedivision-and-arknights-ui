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
  /** P9: 缓动模式 - quantized(硬件感) 或 smooth(流畅) */
  easing?: 'quantized' | 'smooth';
  color?: string;
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
  easing = 'quantized',
  color,
  className,
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const fillStyle = color ? { backgroundColor: color } : undefined;

  // P9: 量化缓动 - steps(8) 模拟数据传输的离散感
  const easingConfig = easing === 'quantized' 
    ? { duration: 0.3, ease: 'linear' } // CSS transition 会用 steps(8)
    : { duration: MOTION.duration.slow, ease: MOTION.easing.default };

  return (
    <div className={cn('w-full', className)}>
      {/* 进度条容器 */}
      <div
        className={cn('relative w-full bg-[var(--border-weak)] overflow-hidden', sizeStyles[size])}
      >
        {/* 填充条 - P9: 根据 easing 模式选择动画方式 */}
        <motion.div
          className={cn(
            'h-full',
            variantColors[variant],
            easing === 'quantized' && 'progress-quantized'
          )}
          style={{ 
            ...fillStyle,
            width: `${clampedValue}%`,
          }}
          initial={false}
          animate={{ opacity: 1 }}
          transition={easingConfig}
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
