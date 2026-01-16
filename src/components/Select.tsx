'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const selectedOption = options.find(opt => opt.value === value);
  const enabledOptions = options.filter(opt => !opt.disabled);

  // 找到下一个可用选项
  const getNextEnabledIndex = useCallback((currentIndex: number, direction: 'up' | 'down'): number => {
    const step = direction === 'down' ? 1 : -1;
    let nextIndex = currentIndex + step;
    
    while (nextIndex >= 0 && nextIndex < options.length) {
      if (!options[nextIndex].disabled) {
        return nextIndex;
      }
      nextIndex += step;
    }
    return currentIndex;
  }, [options]);

  const handleSelect = useCallback((optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [onChange]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    // 打开时高亮当前选中项，或第一个可用项
    const currentIndex = options.findIndex(opt => opt.value === value);
    if (currentIndex >= 0 && !options[currentIndex].disabled) {
      setHighlightedIndex(currentIndex);
    } else {
      const firstEnabled = options.findIndex(opt => !opt.disabled);
      setHighlightedIndex(firstEnabled >= 0 ? firstEnabled : 0);
    }
  }, [disabled, options, value]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else if (highlightedIndex >= 0 && !options[highlightedIndex].disabled) {
          handleSelect(options[highlightedIndex].value);
        }
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          const nextIndex = getNextEnabledIndex(highlightedIndex, 'down');
          setHighlightedIndex(nextIndex);
          optionRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
        }
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          const prevIndex = getNextEnabledIndex(highlightedIndex, 'up');
          setHighlightedIndex(prevIndex);
          optionRefs.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
      
      case 'Tab':
        // Tab 时关闭下拉，让焦点自然移动
        if (isOpen) {
          handleClose();
        }
        break;
      
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          const firstEnabled = options.findIndex(opt => !opt.disabled);
          if (firstEnabled >= 0) {
            setHighlightedIndex(firstEnabled);
            optionRefs.current[firstEnabled]?.scrollIntoView({ block: 'nearest' });
          }
        }
        break;
      
      case 'End':
        if (isOpen) {
          e.preventDefault();
          for (let i = options.length - 1; i >= 0; i--) {
            if (!options[i].disabled) {
              setHighlightedIndex(i);
              optionRefs.current[i]?.scrollIntoView({ block: 'nearest' });
              break;
            }
          }
        }
        break;
    }
  }, [disabled, isOpen, highlightedIndex, options, handleOpen, handleClose, handleSelect, getNextEnabledIndex]);

  // 点击外部关闭
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

  return (
    <div 
      ref={containerRef}
      className={cn('relative w-full', className)}
      onKeyDown={handleKeyDown}
    >
      {/* 触发器 */}
      <motion.button
        type="button"
        onClick={() => isOpen ? handleClose() : handleOpen()}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
        className={cn(
          'w-full h-[44px] px-4 flex items-center justify-between',
          'bg-transparent text-[var(--text-primary)] text-[14px]',
          'border transition-colors duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
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
          className="text-[var(--text-secondary)]"
        >
          ▼
        </motion.span>
      </motion.button>

      {/* 下拉面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.95 }}
            transition={{ duration: MOTION.duration.fast }}
            className="absolute z-20 w-full mt-1 bg-[var(--bg-elevated)] border border-[var(--border-weak)] backdrop-blur-sm overflow-hidden max-h-[240px] overflow-y-auto"
            style={{ transformOrigin: 'top' }}
            role="listbox"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                ref={el => { optionRefs.current[index] = el; }}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: MOTION.duration.fast, 
                  delay: index * 0.04 
                }}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                disabled={option.disabled}
                role="option"
                aria-selected={option.value === value}
                className={cn(
                  'w-full px-4 py-2 flex items-center gap-3 text-left text-[14px]',
                  'transition-colors duration-100',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  option.value === value && 'text-[var(--accent)]',
                  highlightedIndex === index 
                    ? 'bg-[rgba(var(--accent-rgb),0.15)]' 
                    : option.value === value 
                      ? 'bg-[rgba(var(--accent-rgb),0.05)]'
                      : 'text-[var(--text-primary)]'
                )}
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
        )}
      </AnimatePresence>
    </div>
  );
}
