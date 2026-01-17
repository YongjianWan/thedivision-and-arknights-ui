'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';
import { lockOverlay, unlockOverlay } from '../lib/overlay';

type DrawerSide = 'left' | 'right';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  closeOnOverlay?: boolean;
  className?: string;
}

const slideVariants = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
};

export function Drawer({
  isOpen,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  width = '400px',
  closeOnOverlay = true,
  className,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Esc 关闭
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 焦点锁定
  const getFocusableElements = useCallback(() => {
    if (!drawerRef.current) return [];
    return Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));
  }, []);

  const handleTabKey = useCallback((e: KeyboardEvent) => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, [getFocusableElements]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        handleTabKey(e);
      }
    };

    // 保存当前焦点
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // 锁定 body 滚动 + 冻结背景动效
    document.body.style.overflow = 'hidden';
    lockOverlay();
    
    // 添加键盘监听
    window.addEventListener('keydown', handleKeyDown);

    // 聚焦到抽屉内第一个可聚焦元素
    setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);

    return () => {
      document.body.style.overflow = '';
      unlockOverlay();
      window.removeEventListener('keydown', handleKeyDown);
      // 恢复焦点
      previousActiveElement.current?.focus();
    };
  }, [isOpen, handleTabKey, getFocusableElements]);

  const variants = slideVariants[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.fast }}
            className="fixed inset-0 z-40 bg-[var(--bg-overlay)] backdrop-blur-sm"
            onClick={closeOnOverlay ? onClose : undefined}
          />

          {/* Drawer 主体 */}
          <motion.div
            ref={drawerRef}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: MOTION.duration.base, ease: MOTION.easing.default }}
            className={cn(
              'fixed top-0 bottom-0 z-50',
              'bg-[var(--bg-elevated)] border-[var(--border-strong)]',
              'flex flex-col shadow-2xl',
              side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
              className
            )}
            style={{ width }}
          >
            {/* 标题栏 */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-weak)]">
                <h2 className="text-[16px] font-medium text-[var(--text-primary)] tracking-wider uppercase">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>

            {/* 底部操作 */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-weak)]">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
