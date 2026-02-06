'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

// Z-Depth 层级系统
export type Elevation = 'base' | 'raised' | 'floating';
export type PanelLevel = 'L0' | 'L1' | 'L2' | 'L3';

interface TacticalPanelProps {
  children: React.ReactNode;
  title?: string;
  level?: PanelLevel;
  elevation?: Elevation;
  className?: string;
  statusIndicator?: 'ok' | 'warn' | 'err' | 'busy';
  headerRight?: React.ReactNode;
  /**
   * 是否使用 backdrop-blur
   * 默认：只有 floating elevation 开启
   */
  blur?: boolean;
}

// Z-Depth 配置：边框厚度 + 阴影 + Z轴位置
const elevationConfig: Record<Elevation, {
  zIndex: number;
  shadow?: string;
  shadowHover?: string;
  scaleHover?: number;
}> = {
  // Z-10: 贴地，无阴影，最稳定
  base: {
    zIndex: 10,
  },
  // Z-15: 凸起，基础阴影，轻微悬浮感
  raised: {
    zIndex: 15,
    shadow: '0 4px 20px rgba(0,0,0,0.5)',
    shadowHover: '0 8px 32px rgba(0,0,0,0.6)',
    scaleHover: 1.005,
  },
  // Z-20: 悬浮，强调阴影，明显脱离背景
  floating: {
    zIndex: 20,
    shadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,106,0,0.1)',
    shadowHover: '0 16px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,106,0,0.2)',
    scaleHover: 1.01,
  },
};

// 边框层级系统：厚度创造物理深度感
const levelStyles: Record<PanelLevel, {
  // 外层边框：创造"厚度"
  outer: string;
  // 内层边框：精细分隔
  inner?: string;
  // 背景变体
  bg: string;
}> = {
  L0: {
    outer: 'border-0',
    bg: 'bg-[var(--bg-elevated)]',
  },
  L1: {
    outer: 'border border-[var(--border-weak)]',
    bg: 'bg-[var(--bg-elevated)]',
  },
  // L2: 双层边框 = 2px 外框 + 1px 内框 + 2px 间隙 = 物理凹陷感
  L2: {
    outer: 'border-2 border-[var(--border-strong)] p-[2px]',
    inner: 'border border-[var(--border-weak)]',
    bg: 'bg-[var(--bg-elevated)]',
  },
  // L3: 强调边框 + 内发光
  L3: {
    outer: 'border-2 border-[var(--accent)] p-[2px]',
    inner: 'border border-[rgba(var(--accent-rgb),0.3)]',
    bg: 'bg-[var(--bg-elevated)]',
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
  elevation = 'base',
  className,
  statusIndicator,
  headerRight,
  blur,
}: TacticalPanelProps) {
  const { outer, inner, bg } = levelStyles[level];
  const { zIndex, shadow, shadowHover, scaleHover } = elevationConfig[elevation];
  
  const hasInner = !!inner;
  const hasAnchors = level === 'L2' || level === 'L3';
  const isL3 = level === 'L3';
  
  // blur 默认：只有 floating 开启
  const shouldBlur = blur ?? (elevation === 'floating');

  const content = <div className={cn('p-4', className)}>{children}</div>;
  const panelContent = hasInner ? <div className={inner}>{content}</div> : content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION.duration.base }}
      className="relative"
      style={{ zIndex }}
    >
      {/* 标题栏 - P1: Ghost Layer */}
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-[var(--accent)]" />
          <span
            className={cn(
              "font-display text-[12px] tracking-[0.15em] uppercase text-[var(--text-secondary)] italic",
              hasInner && 'ghost-title'
            )}
            data-text={hasInner ? title : undefined}
          >
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

      {/* 面板主体 - Z-Depth 核心 */}
      <motion.div
        className={cn(
          'relative overflow-hidden',
          bg,
          outer,
          shouldBlur && 'backdrop-blur-md'
        )}
        style={{
          boxShadow: shadow,
        }}
        whileHover={scaleHover ? {
          scale: scaleHover,
          boxShadow: shadowHover,
        } : undefined}
        transition={{ duration: 0.2 }}
      >
        {/* P3: Anchor Points 锚点系统 */}
        {hasAnchors && (
          <>
            <span className={cn('anchor anchor-tl', isL3 && 'anchor-accent')} />
            <span className={cn('anchor anchor-tr', isL3 && 'anchor-accent')} />
            <span className={cn('anchor anchor-bl', isL3 && 'anchor-accent')} />
            <span className={cn('anchor anchor-br', isL3 && 'anchor-accent')} />
          </>
        )}
        {panelContent}
      </motion.div>
    </motion.div>
  );
}

// 快捷导出：常用组合
export function PanelBase(props: Omit<TacticalPanelProps, 'elevation'>) {
  return <TacticalPanel {...props} elevation="base" />;
}

export function PanelRaised(props: Omit<TacticalPanelProps, 'elevation'>) {
  return <TacticalPanel {...props} elevation="raised" />;
}

export function PanelFloating(props: Omit<TacticalPanelProps, 'elevation'>) {
  return <TacticalPanel {...props} elevation="floating" />;
}
