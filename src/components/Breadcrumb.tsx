'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = <ChevronRight size={14} className="text-[var(--text-disabled)]" />,
  className,
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-2', className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isClickable = !isLast && (item.href || item.onClick);

        return (
          <React.Fragment key={item.id}>
            <motion.span
              initial={index > 0 ? { opacity: 0, x: -10 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: MOTION.duration.fast, delay: index * 0.05 }}
              className="flex items-center"
            >
              {isClickable ? (
                item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      'text-[12px] tracking-wider uppercase',
                      'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      'transition-colors duration-150',
                      'hover:underline underline-offset-2'
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      'text-[12px] tracking-wider uppercase',
                      'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      'transition-colors duration-150',
                      'hover:underline underline-offset-2'
                    )}
                  >
                    {item.label}
                  </button>
                )
              ) : (
                <span
                  className={cn(
                    'text-[12px] tracking-wider uppercase',
                    isLast 
                      ? 'text-[var(--text-primary)] border-b border-[var(--accent)]' 
                      : 'text-[var(--text-secondary)]'
                  )}
                >
                  {item.label}
                </span>
              )}
            </motion.span>

            {!isLast && (
              <span className="flex items-center">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
