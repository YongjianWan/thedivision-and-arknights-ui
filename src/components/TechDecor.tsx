'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useTechDecor, type TechDecorVariant } from '../hooks/useTechDecor';
import { MOTION } from '../lib/motion';

export interface TechDecorProps {
  /** 位置预设 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  /** 是否激活跳动（默认 hover 时激活） */
  active?: boolean;
  /** 词库变体 */
  variant?: TechDecorVariant;
  /** 组合多个词库 */
  combine?: TechDecorVariant[];
  /** 跳动间隔 (ms) */
  interval?: number;
  /** 自定义类名 */
  className?: string;
  /** 是否响应 hover */
  hoverActive?: boolean;
  /** 自定义前缀 */
  prefix?: string;
  /** 自定义后缀 */
  suffix?: string;
}

const positionClasses: Record<string, string> = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
  custom: '',
};

export function TechDecor({
  position = 'bottom-right',
  active: externalActive,
  variant = 'status',
  combine,
  interval = 150,
  className,
  hoverActive = true,
  prefix,
  suffix,
}: TechDecorProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 激活状态：外部控制 > hover 控制 > 默认 false
  const isActive = externalActive ?? (hoverActive && isHovered);

  // 根据激活状态调整间隔
  const activeInterval = isActive ? interval : 4000; // 非激活时极慢呼吸

  const text = useTechDecor({
    variant,
    combine,
    active: true, // 始终更新，只是频率不同
    interval: activeInterval,
  });

  return (
    <motion.span
      className={cn(
        'tech-decor absolute font-mono text-[10px] font-light',
        'uppercase tracking-wider select-none pointer-events-auto',
        'transition-opacity',
        isActive ? 'opacity-35' : 'opacity-20',
        position !== 'custom' && positionClasses[position],
        className
      )}
      style={{
        color: 'var(--text-secondary)',
        lineHeight: 1.2,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.35 : 0.2 }}
      transition={{ duration: MOTION.duration.fast }}
    >
      {prefix}
      {text}
      {suffix}
    </motion.span>
  );
}

// 多行装饰文本（用于边缘填充）
export interface TechDecorBlockProps {
  /** 行数 */
  lines?: number;
  /** 位置预设 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  /** 是否激活跳动 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 对齐方式 */
  align?: 'left' | 'right';
}

export function TechDecorBlock({
  lines = 3,
  position = 'bottom-right',
  active = false,
  className,
  align = 'right',
}: TechDecorBlockProps) {
  const variants: TechDecorVariant[] = ['status', 'hex', 'coord', 'dynamic'];

  return (
    <div
      className={cn(
        'tech-decor-block absolute flex flex-col gap-0.5',
        'font-mono text-[9px] font-light uppercase tracking-wider',
        'opacity-20 select-none pointer-events-none',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        position !== 'custom' && positionClasses[position],
        className
      )}
      style={{ color: 'var(--text-secondary)', lineHeight: 1.2 }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <TechDecorLine
          key={i}
          variant={variants[i % variants.length]}
          active={active}
          delay={i * 50}
        />
      ))}
    </div>
  );
}

// 单行装饰（内部使用）
function TechDecorLine({
  variant,
  active,
  delay,
}: {
  variant: TechDecorVariant;
  active: boolean;
  delay: number;
}) {
  const text = useTechDecor({
    variant,
    active,
    interval: active ? 150 + delay : 4000 + delay,
  });

  return <span>{text}</span>;
}
