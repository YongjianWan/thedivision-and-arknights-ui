'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface SoftGlitchProps {
  text: string;
  className?: string;
}

export function SoftGlitch({ text, className }: SoftGlitchProps) {
  return (
    <span className={cn('soft-glitch', className)} data-text={text}>
      {text}
    </span>
  );
}
