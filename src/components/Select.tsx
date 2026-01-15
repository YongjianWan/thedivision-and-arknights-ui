'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select...', 
  disabled,
  className 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* 触发器 */}
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full h-[36px] px-4 flex items-center justify-between',
          'bg-transparent text-[var(--text-primary)] text-[14px]',
          'border transition-colors duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen 
            ? 'border-[var(--accent)] border-l-[2px]' 
            : 'border-[var(--border-weak)] hover:border-[var(--border-strong)]'
        )}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        <span className={selectedOption ? '' : 'text-[var(--text-secondary)]'}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: MOTION.duration.fast }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* 下拉面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 选项列表 */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: MOTION.duration.fast }}
              className="absolute z-20 w-full mt-1 bg-[var(--bg-elevated)] border border-[var(--border-weak)] backdrop-blur-sm overflow-hidden"
              style={{ transformOrigin: 'top' }}
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: MOTION.duration.fast, 
                    delay: index * 0.04 
                  }}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full px-4 py-2 flex items-center gap-3 text-left text-[14px]',
                    'transition-colors duration-100',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                    option.value === value 
                      ? 'bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent)]' 
                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-base)]'
                  )}
                  whileHover={!option.disabled ? { x: 4 } : {}}
                  whileTap={!option.disabled ? { scale: 0.98 } : {}}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {option.value === value && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[var(--accent)]"
                      />
                    )}
                  </span>
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
