'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

export interface HoldButtonProps {
  /** 按钮文字 */
  children: React.ReactNode;
  /** 长按完成后的回调 */
  onConfirm: () => void;
  /** 长按时长 (ms)，默认 1500ms */
  holdDuration?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 进度分段数（量化缓动），默认 10 */
  segments?: number;
  /** 确认时的闪烁效果 */
  flashOnComplete?: boolean;
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 图标 */
  icon?: React.ReactNode;
  /** 长按中的提示文字 */
  holdingText?: string;
}

const sizeStyles = {
  sm: 'h-8 px-3 text-xs min-w-[80px]',
  md: 'h-10 px-4 text-sm min-w-[100px]',
  lg: 'h-12 px-6 text-base min-w-[120px]',
};

export function HoldButton({
  children,
  onConfirm,
  holdDuration = 1500,
  disabled = false,
  className,
  segments = 10,
  flashOnComplete = true,
  size = 'md',
  icon,
  holdingText,
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const rawProgress = Math.min(elapsed / holdDuration, 1);
    
    // 量化进度 (steps)
    const quantizedProgress = Math.floor(rawProgress * segments) / segments;
    setProgress(quantizedProgress);

    if (rawProgress >= 1) {
      // 完成
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsComplete(true);
      setProgress(1);
      
      // 短暂延迟后触发回调，让用户看到完成状态
      setTimeout(() => {
        onConfirm();
        // 重置状态
        setTimeout(() => {
          setIsHolding(false);
          setIsComplete(false);
          setProgress(0);
        }, 200);
      }, 100);
    }
  }, [holdDuration, segments, onConfirm]);

  const handlePointerDown = useCallback(() => {
    if (disabled || isComplete) return;
    
    setIsHolding(true);
    setProgress(0);
    startTimeRef.current = Date.now();
    
    // 使用 interval 而不是 requestAnimationFrame，确保量化效果
    const intervalMs = holdDuration / segments;
    intervalRef.current = setInterval(updateProgress, intervalMs);
  }, [disabled, isComplete, holdDuration, segments, updateProgress]);

  const handlePointerUp = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (!isComplete) {
      setIsHolding(false);
      setProgress(0);
    }
  }, [isComplete]);

  const handlePointerLeave = useCallback(() => {
    handlePointerUp();
  }, [handlePointerUp]);

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerUp}
      className={cn(
        'hold-button relative overflow-hidden select-none',
        'border-2 border-[var(--danger)] bg-transparent',
        'text-[var(--danger)] font-medium uppercase tracking-wider',
        'transition-colors cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--danger)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
        disabled && 'opacity-50 cursor-not-allowed',
        sizeStyles[size],
        className
      )}
      animate={
        isComplete && flashOnComplete
          ? {
              backgroundColor: ['var(--danger)', 'transparent', 'var(--danger)'],
              color: ['white', 'var(--danger)', 'white'],
            }
          : {}
      }
      transition={
        isComplete
          ? { duration: 0.15, times: [0, 0.5, 1] }
          : {}
      }
    >
      {/* 进度填充层 */}
      <motion.div
        className="absolute inset-0 bg-[var(--danger)] origin-left"
        style={{
          scaleX: progress,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{
          duration: 0,
          ease: 'linear',
        }}
      />

      {/* 进度分段线 */}
      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: segments - 1 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-[var(--bg-base)] opacity-30"
            style={{ width: `${100 / segments}%` }}
          />
        ))}
      </div>

      {/* 内容层 */}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center gap-2',
          'transition-colors duration-75',
          progress > 0.5 && 'text-white'
        )}
      >
        {icon}
        <AnimatePresence mode="wait">
          {isHolding && holdingText ? (
            <motion.span
              key="holding"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: MOTION.duration.instant }}
            >
              {holdingText}
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: MOTION.duration.instant }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* 完成时的 glitch 效果 */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [0, -2, 2, 0],
          }}
          transition={{ duration: 0.1 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
      )}
    </motion.button>
  );
}

// 预设变体：确认删除
export function HoldToDelete({
  onConfirm,
  className,
  ...props
}: Omit<HoldButtonProps, 'children' | 'holdingText'>) {
  return (
    <HoldButton
      onConfirm={onConfirm}
      holdingText="CONFIRMING..."
      className={className}
      {...props}
    >
      HOLD TO DELETE
    </HoldButton>
  );
}

// 预设变体：确认重置
export function HoldToReset({
  onConfirm,
  className,
  ...props
}: Omit<HoldButtonProps, 'children' | 'holdingText'>) {
  return (
    <HoldButton
      onConfirm={onConfirm}
      holdingText="RESETTING..."
      className={className}
      {...props}
    >
      HOLD TO RESET
    </HoldButton>
  );
}
