'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface NavLinkLineProps {
  className?: string;
}

export function NavLinkLine({ className }: NavLinkLineProps) {
  return (
    <div className={cn('relative w-full h-6', className)}>
      <div className="absolute left-0 top-0 h-full w-px bg-[var(--border-weak)]" />
      <div className="absolute left-0 top-1/2 h-px w-6 bg-[var(--border-weak)]" />
    </div>
  );
}
