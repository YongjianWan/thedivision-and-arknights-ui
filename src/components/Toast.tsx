'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

export type ToastLevel = 'info' | 'accent' | 'warn' | 'err';

export type ToastItem = {
  id: string;
  level: ToastLevel;
  title: string;
  detail?: string;
  action?: { label: string; onClick: () => void };
  durationMs?: number;
};

type ToastContextValue = {
  push: (toast: Omit<ToastItem, 'id'> & { id?: string }) => void;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const levelStyles: Record<ToastLevel, string> = {
  info: 'border-[var(--border-strong)] text-[var(--text-primary)]',
  accent: 'border-[var(--accent)] text-[var(--accent)]',
  warn: 'border-[var(--warning)] text-[var(--warning)]',
  err: 'border-[var(--danger)] text-[var(--danger)]',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const api = useMemo<ToastContextValue>(() => ({
    push: (toast) => {
      const id = toast.id ?? crypto.randomUUID();
      const durationMs = toast.durationMs ?? 4500;
      setItems((prev) => [toastWithId({ ...toast, id }), ...prev].slice(0, 3));
      if (durationMs > 0) {
        setTimeout(() => {
          setItems((prev) => prev.filter((t) => t.id !== id));
        }, durationMs);
      }
    },
    remove: (id) => setItems((prev) => prev.filter((t) => t.id !== id)),
  }), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport items={items} onDismiss={api.remove} />
    </ToastContext.Provider>
  );
}

function toastWithId(toast: Omit<ToastItem, 'id'> & { id: string }): ToastItem {
  return { ...toast, id: toast.id };
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

function ToastViewport({ items, onDismiss }: { items: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[320px] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {items.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: MOTION.duration.fast }}
            className={cn(
              'pointer-events-auto bg-[var(--bg-elevated)] border px-4 py-3',
              'backdrop-blur-panel shadow-lg',
              levelStyles[toast.level]
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-[12px] uppercase tracking-widest">{toast.title}</div>
                {toast.detail && (
                  <div className="text-[12px] text-[var(--text-secondary)] mt-1">{toast.detail}</div>
                )}
              </div>
              <button
                className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                onClick={() => onDismiss(toast.id)}
              >
                Close
              </button>
            </div>
            {toast.action && (
              <button
                className="mt-2 text-[11px] uppercase tracking-widest text-[var(--accent)]"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss(toast.id);
                }}
              >
                {toast.action.label}
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
