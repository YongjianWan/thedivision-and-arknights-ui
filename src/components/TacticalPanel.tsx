'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

export type PanelLevel = 'L0' | 'L1' | 'L2' | 'L3';

interface TacticalPanelProps {
  children: React.ReactNode;
  title?: string;
  level?: PanelLevel;
  className?: string;
  statusIndicator?: 'ok' | 'warn' | 'err' | 'busy';
  headerRight?: React.ReactNode;
}

const levelStyles: Record<PanelLevel, { outer: string; inner?: string }> = {
  L0: { outer: 'border-0' },
  L1: { outer: 'border border-[var(--border-weak)]' },
  L2: {
    outer:
      'border-2 border-[var(--border-strong)] shadow-[inset_0_0_0_1px_rgba(var(--border-strong-rgb),0.3)]',
    inner: 'border border-[var(--border-weak)]',
  },
  L3: {
    outer:
      'border-2 border-[var(--accent)] shadow-[0_0_12px_rgba(var(--accent-rgb),0.15),inset_0_0_0_1px_rgba(var(--accent-rgb),0.2)]',
    inner: 'border border-[rgba(var(--accent-rgb),0.3)]',
  },
};

const statusColors = {
  ok: 'bg-[var(--success)]',
  warn: 'bg-[var(--warning)]',
  err: 'bg-[var(--danger)]',
  busy: 'bg-[var(--accent)]',
};

export function TacticalPanel({
  children,
  title,
  level = 'L1',
  className,
  statusIndicator,
  headerRight,
}: TacticalPanelProps) {
  const { outer, inner } = levelStyles[level];
  const hasInner = level === 'L2' || level === 'L3';

  const content = <div className={cn('p-4', className)}>{children}</div>;

  const panelContent = hasInner ? <div className={inner}>{content}</div> : content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: MOTION.duration.base }}
      className="relative"
    >
      {/* 标题栏 */}
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-[var(--accent)]" />
          <span className="font-['DIN_Alternate','Roboto_Condensed',sans-serif] text-[12px] tracking-[0.15em] uppercase text-[var(--text-secondary)] italic">
            {title}
          </span>
          <div className="flex-1 h-[1px] bg-[var(--border-weak)]" />
          {headerRight}
          {statusIndicator && (
            <motion.div
              className={cn('w-2 h-2 rounded-full', statusColors[statusIndicator])}
              animate={statusIndicator === 'busy' ? { opacity: [1, 0.4, 1] } : {}}
              transition={statusIndicator === 'busy' ? { duration: 1.5, repeat: Infinity } : {}}
            />
          )}
        </div>
      )}

      {/* 面板主体 */}
      <div
        className={cn('relative overflow-hidden bg-[var(--bg-overlay)] backdrop-blur-sm', outer)}
      >
        {panelContent}
      </div>
    </motion.div>
  );
}
