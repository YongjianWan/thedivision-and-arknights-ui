'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
}

const placementStyles: Record<
  TooltipPlacement,
  {
    position: string;
    initial: { x?: number; y?: number; opacity: number };
    arrow: string;
  }
> = {
  top: {
    position: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    initial: { y: 4, opacity: 0 },
    arrow:
      'top-full left-1/2 -translate-x-1/2 border-t-[var(--bg-elevated)] border-x-transparent border-b-transparent',
  },
  bottom: {
    position: 'top-full left-1/2 -translate-x-1/2 mt-2',
    initial: { y: -4, opacity: 0 },
    arrow:
      'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--bg-elevated)] border-x-transparent border-t-transparent',
  },
  left: {
    position: 'right-full top-1/2 -translate-y-1/2 mr-2',
    initial: { x: 4, opacity: 0 },
    arrow:
      'left-full top-1/2 -translate-y-1/2 border-l-[var(--bg-elevated)] border-y-transparent border-r-transparent',
  },
  right: {
    position: 'left-full top-1/2 -translate-y-1/2 ml-2',
    initial: { x: -4, opacity: 0 },
    arrow:
      'right-full top-1/2 -translate-y-1/2 border-r-[var(--bg-elevated)] border-y-transparent border-l-transparent',
  },
};

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 500,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  // 清理
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const styles = placementStyles[placement];

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={styles.initial}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.fast }}
            className={cn(
              'absolute z-50 pointer-events-none',
              'px-3 py-2 text-[12px] text-[var(--text-primary)]',
              'bg-[var(--bg-elevated)] border border-[var(--border-weak)]',
              'whitespace-nowrap',
              styles.position,
              className
            )}
          >
            {content}
            {/* 箭头 */}
            <div className={cn('absolute w-0 h-0 border-[6px]', styles.arrow)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
