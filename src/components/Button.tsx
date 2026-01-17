'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'tactical' | 'inverted';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white border-[var(--accent)]',
  secondary:
    'bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-strong)]',
  ghost:
    'bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border-transparent',
  danger: 'bg-[var(--danger)] hover:bg-[var(--danger-muted)] text-white border-[var(--danger)]',
  // 明日方舟风格：青蓝科技色
  tactical:
    'bg-[var(--accent-alt)] hover:bg-[var(--accent-alt-hover)] text-black border-[var(--accent-alt)]',
  // 明日方舟风格：hover 时反色
  inverted: 'bg-transparent text-white border-white hover:bg-white hover:text-black',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[44px] px-3 text-[12px] min-w-[44px]',
  md: 'h-[44px] px-4 text-[14px] min-w-[44px]',
  lg: 'h-[44px] px-6 text-[14px]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'secondary', size = 'md', children, loading, className, disabled, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'font-medium tracking-wider uppercase',
          'border transition-colors duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        transition={{ duration: MOTION.duration.instant }}
        {...props}
      >
        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Spinner />
          </motion.span>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// 简单的旋转加载器
function Spinner() {
  return (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}
