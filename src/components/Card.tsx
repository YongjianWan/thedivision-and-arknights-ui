'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  meta?: string;
  tags?: string[];
  footer?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({
  children,
  title,
  meta,
  tags,
  footer,
  selected = false,
  onClick,
  className,
}: CardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: MOTION.duration.base }}
      onClick={onClick}
      className={cn(
        'relative bg-[var(--bg-overlay)] backdrop-blur-sm',
        'border transition-all duration-100',
        'overflow-hidden',
        selected && 'border-l-[2px] border-l-[var(--accent)]',
        !selected && 'border-[0.5px] border-[var(--border-weak)]',
        isClickable &&
          'cursor-pointer hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]',
        className
      )}
      whileHover={isClickable ? { y: -2 } : {}}
      whileTap={isClickable ? { scale: 0.99 } : {}}
    >
      {/* 标题区 */}
      {(title || meta) && (
        <div className="px-4 pt-4 pb-2">
          {title && (
            <h3 className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{title}</h3>
          )}
          {meta && <p className="text-[12px] text-[var(--text-secondary)]">{meta}</p>}
        </div>
      )}

      {/* 内容区 */}
      <div className="px-4 pb-4">{children}</div>

      {/* 标签或底部操作 */}
      {(tags || footer) && (
        <div className="px-4 pb-4 pt-2 border-t border-[var(--border-weak)] flex items-center justify-between">
          {tags && (
            <div className="flex gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[11px] text-[var(--text-secondary)] border border-[var(--border-weak)] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {footer}
        </div>
      )}
    </motion.div>
  );
}
