'use client';

import React from 'react';
import { cn } from '../lib/utils';

type InputState = 'default' | 'error';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  state?: InputState;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, state = 'default', className, wrapperClassName, disabled, ...props }, ref) => {
    const isError = state === 'error';

    return (
      <label className={cn('block w-full', wrapperClassName)}>
        {label && (
          <span className="block text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            {label}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full h-[44px] px-4',
            'bg-[var(--bg-base)] text-[var(--text-primary)] font-mono',
            'border transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-ring',
            isError
              ? 'border-[var(--danger)]'
              : 'border-[var(--border-weak)] hover:border-[var(--border-strong)]',
            className
          )}
          {...props}
        />
        {hint && (
          <span
            className={cn(
              'mt-2 block text-[12px]',
              isError ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'
            )}
          >
            {hint}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';
