'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ label, orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('w-px h-full bg-[var(--border-weak)]', className)} aria-hidden="true" />;
  }

  if (!label) {
    return <div className={cn('w-full h-px bg-[var(--border-weak)] my-4', className)} aria-hidden="true" />;
  }

  return (
    <div className={cn('flex items-center gap-3 my-4', className)} aria-hidden="true">
      <div className="flex-1 h-px bg-[var(--border-weak)]" />
      <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--border-weak)]" />
    </div>
  );
}
