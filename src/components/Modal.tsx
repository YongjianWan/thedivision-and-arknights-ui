'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';
import { lockOverlay, unlockOverlay } from '../lib/overlay';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlay = true,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // 获取可聚焦元素
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }, []);

  // Tab 键处理 - 焦点陷阱
  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements]
  );

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        handleTabKey(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleTabKey]);

  // 焦点管理和滚动锁定
  useEffect(() => {
    if (isOpen) {
      // 保存当前焦点
      previousActiveElement.current = document.activeElement as HTMLElement;

      // 锁定 body 滚动 + 冻结背景动效
      document.body.style.overflow = 'hidden';
      lockOverlay();

      // 聚焦到 Modal 内第一个可聚焦元素
      setTimeout(() => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          // 如果没有可聚焦元素，聚焦到 Modal 容器本身
          modalRef.current?.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
      // 恢复之前的焦点
      previousActiveElement.current?.focus();
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = '';
        unlockOverlay();
      }
    };
  }, [isOpen, getFocusableElements]);

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
            aria-hidden="true"
          />

          {/* Modal 主体 */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: MOTION.duration.base }}
              className={cn(
                'w-full max-w-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-2xl',
                'flex flex-col max-h-[90vh]',
                'focus:outline-none',
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 标题栏 */}
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-weak)]">
                  <h2
                    id="modal-title"
                    className="text-[16px] font-medium text-[var(--text-primary)] tracking-wider uppercase"
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* 内容区 */}
              <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

              {/* 底部操作 */}
              {footer && (
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-weak)]">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
