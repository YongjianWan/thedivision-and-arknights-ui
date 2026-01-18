'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { Tag } from './Tag';

export type ListRowStatus = 'ok' | 'warn' | 'err' | 'busy' | 'offline';

interface ListRowProps {
  title: string;
  meta?: string;
  icon?: React.ReactNode;
  value?: string | number;
  status?: ListRowStatus;
  tags?: string[];
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const statusColors: Record<ListRowStatus, string> = {
  ok: 'text-[var(--success)]',
  warn: 'text-[var(--warning)]',
  err: 'text-[var(--danger)]',
  busy: 'text-[var(--accent)]',
  offline: 'text-[var(--text-disabled)]',
};

export function ListRow({
  title,
  meta,
  icon,
  value,
  status,
  tags,
  disabled,
  selected,
  onClick,
  className,
}: ListRowProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'flex items-center gap-4 py-3 px-4 border-b border-[var(--border-weak)]',
        onClick && !disabled && 'cursor-pointer hover:bg-[var(--bg-base)]',
        selected && 'border-l-2 border-l-[var(--accent)] bg-[rgba(var(--accent-rgb),0.04)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && (
        <div className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)]">
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="text-[14px] truncate">{title}</span>
          {status && (
            <span className={cn('text-[11px] uppercase tracking-widest', statusColors[status])}>
              {status}
            </span>
          )}
        </div>
        {meta && (
          <div className="text-[12px] text-[var(--text-secondary)] truncate mt-1">
            {meta}
          </div>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      {value !== undefined && (
        <div className={cn('text-[14px] font-mono', status ? statusColors[status] : '')}>
          {value}
        </div>
      )}
    </div>
  );
}
