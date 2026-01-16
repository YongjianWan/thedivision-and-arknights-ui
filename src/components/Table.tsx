'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

// 类型定义
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableRow {
  id: string;
  [key: string]: unknown;
  _status?: 'ok' | 'warn' | 'err';
  _disabled?: boolean;
}

interface TableProps<T extends TableRow> {
  columns: TableColumn<T>[];
  data: T[];
  selectedId?: string;
  onSelect?: (row: T) => void;
  sortable?: boolean;
  loading?: boolean;
  emptyText?: string;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

const statusColors = {
  ok: 'text-[var(--success)]',
  warn: 'text-[var(--warning)]',
  err: 'text-[var(--danger)]',
};

export function Table<T extends TableRow>({
  columns,
  data,
  selectedId,
  onSelect,
  sortable = true,
  loading = false,
  emptyText = 'No data available',
  className,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 排序逻辑
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    if (!sortable) return;
    const column = columns.find(c => c.key === key);
    if (!column?.sortable) return;

    if (sortKey === key) {
      // 循环: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div className={cn('w-full overflow-hidden border border-[var(--border-weak)]', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* 表头 */}
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-strong)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-[12px] font-medium tracking-wider uppercase',
                    'text-[var(--text-secondary)]',
                    getAlignClass(column.align),
                    column.sortable && sortable && 'cursor-pointer hover:text-[var(--text-primary)] transition-colors'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className={cn(
                    'flex items-center gap-1',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    {column.label}
                    {column.sortable && sortable && (
                      <span className="flex flex-col -my-1">
                        <ChevronUp 
                          size={12} 
                          className={cn(
                            'transition-colors',
                            sortKey === column.key && sortDirection === 'asc' 
                              ? 'text-[var(--accent)]' 
                              : 'text-[var(--text-disabled)]'
                          )} 
                        />
                        <ChevronDown 
                          size={12} 
                          className={cn(
                            '-mt-1 transition-colors',
                            sortKey === column.key && sortDirection === 'desc' 
                              ? 'text-[var(--accent)]' 
                              : 'text-[var(--text-disabled)]'
                          )} 
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 */}
          <tbody>
            <AnimatePresence mode="wait">
              {loading ? (
                // 加载骨架
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-[var(--border-weak)]">
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3">
                        <motion.div
                          className="h-4 bg-[var(--border-weak)] rounded"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ width: `${40 + Math.random() * 40}%` }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : sortedData.length === 0 ? (
                // 空状态
                <tr>
                  <td 
                    colSpan={columns.length} 
                    className="px-4 py-12 text-center text-[var(--text-secondary)]"
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                // 数据行
                sortedData.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: MOTION.duration.fast, delay: index * 0.02 }}
                    onClick={() => !row._disabled && onSelect?.(row)}
                    className={cn(
                      'border-b border-[var(--border-weak)] transition-colors',
                      row._disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : onSelect && 'cursor-pointer hover:bg-[var(--bg-base)]',
                      selectedId === row.id && 'bg-[rgba(var(--accent-rgb),0.05)]'
                    )}
                  >
                    {/* 选中指示条 */}
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-3 text-[14px]',
                          getAlignClass(column.align),
                          row._status && statusColors[row._status],
                          // 第一列加左侧选中条
                          colIndex === 0 && selectedId === row.id && 'border-l-2 border-l-[var(--accent)]'
                        )}
                      >
                        {column.render 
                          ? column.render(row[column.key], row, index)
                          : String(row[column.key] ?? '')
                        }
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
