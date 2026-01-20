'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface HUDMeterProps {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  variant?: 'default' | 'accent' | 'warn' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  segments?: number;
  color?: string;
  className?: string;
}

const variantColors = {
  default: {
    text: 'text-[var(--text-primary)]',
    bar: 'bg-[var(--border-strong)]',
    fill: 'bg-[var(--text-primary)]',
  },
  accent: {
    text: 'text-[var(--accent)]',
    bar: 'bg-[var(--border-strong)]',
    fill: 'bg-[var(--accent)]',
  },
  warn: {
    text: 'text-[var(--warning)]',
    bar: 'bg-[var(--border-strong)]',
    fill: 'bg-[var(--warning)]',
  },
  danger: {
    text: 'text-[var(--danger)]',
    bar: 'bg-[var(--border-strong)]',
    fill: 'bg-[var(--danger)]',
  },
};

const sizeStyles = {
  sm: { num: 'text-[24px]', unit: 'text-[10px]', label: 'text-[9px]', bar: 'h-[2px]' },
  md: { num: 'text-[36px]', unit: 'text-[12px]', label: 'text-[10px]', bar: 'h-[3px]' },
  lg: { num: 'text-[48px]', unit: 'text-[14px]', label: 'text-[11px]', bar: 'h-[4px]' },
};

export function HUDMeter({
  value,
  max = 100,
  label,
  unit = '',
  variant = 'accent',
  size = 'md',
  segments,
  color,
  className,
}: HUDMeterProps) {
  const colors = variantColors[variant];
  const styles = sizeStyles[size];
  const percent = Math.min((value / max) * 100, 100);

  const formattedValue = new Intl.NumberFormat('en-US').format(value);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* 数值 - P1: Ghost Layer 三层投影 */}
      <div className="flex items-baseline gap-1">
        <motion.span
          key={value}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={cn(
            'tabular-nums leading-none font-hud ghost-text',
            styles.num,
            colors.text
          )}
          style={color ? { color } : undefined}
          data-text={formattedValue}
        >
          {formattedValue}
        </motion.span>
        {unit && (
          <span className={cn('text-[var(--text-secondary)] uppercase', styles.unit)}>{unit}</span>
        )}
      </div>

      {/* 进度条 */}
      <div
        className={cn('w-full mt-2 rounded-sm overflow-hidden', styles.bar, colors.bar)}
        style={
          segments
            ? {
                backgroundImage: `repeating-linear-gradient(to right, transparent, transparent calc(100% / ${segments} - 1px), rgba(var(--border-strong-rgb),0.4) calc(100% / ${segments} - 1px), rgba(var(--border-strong-rgb),0.4) calc(100% / ${segments}))`,
              }
            : undefined
        }
      >
        <motion.div
          className={cn('h-full', colors.fill)}
          style={color ? { backgroundColor: color } : undefined}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* 标签 */}
      <span
        className={cn(
          'mt-2 font-[var(--font-display)] tracking-[0.2em] uppercase text-[var(--text-secondary)]',
          styles.label
        )}
      >
        {label}
      </span>
    </div>
  );
}
