'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

// Checkbox
interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled,
  label,
  className,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer min-w-[44px] min-h-[44px]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          'relative w-5 h-5 flex items-center justify-center',
          'border transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
          checked || indeterminate
            ? 'bg-[var(--accent)] border-[var(--accent)]'
            : 'bg-transparent border-[var(--border-weak)] hover:border-[var(--border-strong)]'
        )}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {checked && !indeterminate && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: MOTION.duration.instant }}
          >
            <Check size={14} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
        {indeterminate && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: MOTION.duration.instant }}
          >
            <Minus size={14} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.button>
      {label && <span className="text-[14px] text-[var(--text-primary)]">{label}</span>}
    </label>
  );
}

// Radio
interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: string;
  className?: string;
}

export function Radio({
  checked = false,
  onChange,
  disabled,
  label,
  name,
  value,
  className,
}: RadioProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer min-w-[44px] min-h-[44px]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <motion.button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(true)}
        className={cn(
          'relative w-5 h-5 rounded-full flex items-center justify-center',
          'border transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
          checked
            ? 'border-[var(--accent)]'
            : 'border-[var(--border-weak)] hover:border-[var(--border-strong)]'
        )}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: MOTION.duration.fast }}
            className="w-3 h-3 rounded-full bg-[var(--accent)]"
          />
        )}
      </motion.button>
      {label && <span className="text-[14px] text-[var(--text-primary)]">{label}</span>}
      {name && value && (
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => {}}
          className="sr-only"
        />
      )}
    </label>
  );
}

// Switch
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Switch({ checked = false, onChange, disabled, label, className }: SwitchProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer min-h-[44px]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
          checked ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
        )}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white"
          animate={{ x: checked ? 24 : 4 }}
          transition={{ duration: MOTION.duration.fast, ease: MOTION.easing.default }}
        />
      </motion.button>
      {label && <span className="text-[14px] text-[var(--text-primary)]">{label}</span>}
    </label>
  );
}
