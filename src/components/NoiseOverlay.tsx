'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface NoiseOverlayProps {
  /** 透明度 0.01-0.05，默认 0.03 */
  opacity?: number;
  /** 是否启用，默认 true */
  enabled?: boolean;
  className?: string;
}

/**
 * P4: 全局噪点层组件
 * 
 * 模拟显示器像素颗粒感，让界面看起来像是显示在真实硬件上。
 * 应在 App 根组件中使用，位于所有内容之上。
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <NoiseOverlay />
 *       {children}
 *     </>
 *   );
 * }
 * ```
 */
export function NoiseOverlay({
  opacity = 0.03,
  enabled = true,
  className,
}: NoiseOverlayProps) {
  if (!enabled) return null;

  return (
    <div
      className={cn('noise-global', className)}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
