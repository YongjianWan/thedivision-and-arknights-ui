'use client';

import React from 'react';
import { cn } from '../lib/utils';

type TagVariant = 'accent' | 'muted' | 'danger';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  accent: 'border-[var(--accent)] text-[var(--accent)]',
  muted: 'border-[var(--border-weak)] text-[var(--text-secondary)]',
  danger: 'border-[var(--danger)] text-[var(--danger)]',
};

export function Tag({ children, variant = 'muted', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-[11px] uppercase tracking-wider',
        'border bg-transparent',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Badge({ children, variant = 'muted', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider',
        'border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
