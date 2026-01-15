'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

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
  className 
}: ModalProps) {
  // Esc 关闭
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 焦点锁定（简化版）
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
          
          {/* Modal 主体 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: MOTION.duration.base }}
              className={cn(
                'w-full max-w-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-2xl',
                'flex flex-col max-h-[90vh]',
                className
              )}
              onClick={(e) => e.stopPropagation()}
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
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
