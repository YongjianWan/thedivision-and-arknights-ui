'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ========================================
// P4: 无障碍双重编码 StatusIndicator
// 规则: 状态变化必须同时有 颜色 + 图标
// ========================================

export type StatusType = 'ok' | 'warn' | 'err' | 'busy' | 'offline';

interface StatusConfig {
  icon: React.FC<{ size: number; className?: string }>;
  colorClass: string;
  bgClass: string;
  label: string;
  ariaLabel: string;
}

// Filled 风格图标 (P5 规范: 禁止纯线性)
const CheckIconFilled: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.78 4.97a.75.75 0 0 0-1.06 0L7 8.69 5.28 6.97a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0 0-1.06z" />
  </svg>
);

const AlertTriangleFilled: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575zM8 5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5zm1 6a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
  </svg>
);

const XCircleFilled: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm2.22 4.72a.75.75 0 0 0-1.06 0L8 5.94 6.84 4.72a.75.75 0 1 0-1.06 1.06L6.94 7 5.78 8.22a.75.75 0 1 0 1.06 1.06L8 8.06l1.16 1.22a.75.75 0 1 0 1.06-1.06L9.06 7l1.16-1.22a.75.75 0 0 0 0-1.06z" />
  </svg>
);

const LoaderIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0zm0 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12zm8-4a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8zM4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8zm9.657-5.657a.75.75 0 0 1 0 1.06l-1.768 1.768a.75.75 0 1 1-1.06-1.06l1.767-1.768a.75.75 0 0 1 1.061 0zm-9.9 9.9a.75.75 0 0 1 0 1.06l-1.768 1.768a.75.75 0 1 1-1.06-1.06l1.767-1.768a.75.75 0 0 1 1.061 0zm9.9 0l1.768 1.768a.75.75 0 1 1-1.06 1.06l-1.768-1.767a.75.75 0 0 1 1.06-1.061zM4.222 4.222l-1.768-1.768a.75.75 0 1 1 1.06-1.06l1.768 1.767a.75.75 0 0 1-1.06 1.061z" />
  </svg>
);

const WifiOffFilled: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M1.5 1.5a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06z" />
    <path d="M8 2c1.981 0 3.82.614 5.33 1.656a.75.75 0 1 1-.882 1.216A7.98 7.98 0 0 0 8 3.5a7.98 7.98 0 0 0-1.893.227L4.836 2.455C5.81 2.162 6.876 2 8 2zm-3.39 2.85A6.48 6.48 0 0 1 8 4c1.697 0 3.256.65 4.418 1.716a.75.75 0 1 1-.988 1.13A4.99 4.99 0 0 0 8 5.5c-.736 0-1.44.159-2.07.443zM8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

// 状态配置表 - 颜色 + 图标双重编码
const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  ok: {
    icon: CheckIconFilled,
    colorClass: 'text-[var(--success)]',
    bgClass: 'bg-[var(--success)]',
    label: 'OK',
    ariaLabel: 'Status: Online and operational',
  },
  warn: {
    icon: AlertTriangleFilled,
    colorClass: 'text-[var(--warning)]',
    bgClass: 'bg-[var(--warning)]',
    label: 'WARN',
    ariaLabel: 'Status: Warning, attention required',
  },
  err: {
    icon: XCircleFilled,
    colorClass: 'text-[var(--danger)]',
    bgClass: 'bg-[var(--danger)]',
    label: 'ERR',
    ariaLabel: 'Status: Error, action required',
  },
  busy: {
    icon: LoaderIcon,
    colorClass: 'text-[var(--accent)]',
    bgClass: 'bg-[var(--accent)]',
    label: 'BUSY',
    ariaLabel: 'Status: Processing, please wait',
  },
  offline: {
    icon: WifiOffFilled,
    colorClass: 'text-[var(--text-disabled)]',
    bgClass: 'bg-[var(--text-disabled)]',
    label: 'OFFLINE',
    ariaLabel: 'Status: Disconnected',
  },
};

interface StatusIndicatorProps {
  status: StatusType;
  /** 显示文字标签 */
  showLabel?: boolean;
  /** 尺寸: sm=12px, md=16px, lg=20px */
  size?: 'sm' | 'md' | 'lg';
  /** 仅显示圆点（向后兼容 TacticalPanel 的简化模式） */
  dotOnly?: boolean;
  /** 脉冲动画（busy 状态默认开启） */
  pulse?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: 12,
  md: 16,
  lg: 20,
};

export function StatusIndicator({
  status,
  showLabel = false,
  size = 'sm',
  dotOnly = false,
  pulse,
  className,
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status];
  const iconSize = SIZE_MAP[size];
  const Icon = config.icon;

  // 默认: busy 状态自动脉冲
  const shouldPulse = pulse ?? status === 'busy';

  // dotOnly 模式 - 向后兼容 TacticalPanel
  if (dotOnly) {
    return (
      <motion.span
        className={cn(
          'rounded-full',
          config.bgClass,
          size === 'sm' && 'w-2 h-2',
          size === 'md' && 'w-2.5 h-2.5',
          size === 'lg' && 'w-3 h-3',
          className
        )}
        animate={shouldPulse ? { opacity: [1, 0.4, 1] } : {}}
        transition={shouldPulse ? { duration: 1.5, repeat: Infinity } : {}}
        role="status"
        aria-label={config.ariaLabel}
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        config.colorClass,
        className
      )}
      role="status"
      aria-label={config.ariaLabel}
    >
      <motion.span
        className="inline-flex"
        animate={status === 'busy' ? { rotate: 360 } : {}}
        transition={status === 'busy' ? { 
          duration: 1, 
          repeat: Infinity, 
          ease: 'linear'
        } : {}}
      >
        <Icon size={iconSize} />
      </motion.span>
      
      {showLabel && (
        <span 
          className={cn(
            'font-mono uppercase tracking-wider',
            size === 'sm' && 'text-[10px]',
            size === 'md' && 'text-xs',
            size === 'lg' && 'text-sm'
          )}
        >
          {config.label}
        </span>
      )}
    </span>
  );
}

// ========================================
// Preset 快捷组件
// ========================================

export const StatusOk = (props: Omit<StatusIndicatorProps, 'status'>) => (
  <StatusIndicator status="ok" {...props} />
);

export const StatusWarn = (props: Omit<StatusIndicatorProps, 'status'>) => (
  <StatusIndicator status="warn" {...props} />
);

export const StatusError = (props: Omit<StatusIndicatorProps, 'status'>) => (
  <StatusIndicator status="err" {...props} />
);

export const StatusBusy = (props: Omit<StatusIndicatorProps, 'status'>) => (
  <StatusIndicator status="busy" {...props} />
);

export const StatusOffline = (props: Omit<StatusIndicatorProps, 'status'>) => (
  <StatusIndicator status="offline" {...props} />
);

// ========================================
// 内联状态标签 (用于 Table 等场景)
// ========================================

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm',
        'text-[10px] font-mono uppercase tracking-wider',
        config.colorClass,
        'bg-current/10',
        className
      )}
      role="status"
      aria-label={config.ariaLabel}
    >
      <motion.span
        className="inline-flex"
        animate={status === 'busy' ? { rotate: 360 } : {}}
        transition={status === 'busy' ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
      >
        <Icon size={10} />
      </motion.span>
      {config.label}
    </span>
  );
}

// 导出配置供外部使用
export { STATUS_CONFIG };
