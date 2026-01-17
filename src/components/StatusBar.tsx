'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function StatusBar() {
  const [time, setTime] = useState<string>('--:--:--');
  const [date, setDate] = useState<string>('----/--/--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
      setDate(now.toLocaleDateString('en-CA')); // YYYY-MM-DD format
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-weak)] backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(var(--bg-base-rgb),0.8)' }}
    >
      {/* 左侧：系统状态 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[var(--success)]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-[var(--font-display)] text-[11px] tracking-[0.2em] uppercase text-[var(--success)]">
            SYSTEM ONLINE
          </span>
        </div>
        <div className="h-3 w-[1px] bg-[var(--border-weak)]" />
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--text-secondary)]">
          NODE: LOCAL-DEV
        </span>
      </div>

      {/* 中间：标识 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[var(--accent)]" />
        <span className="font-[var(--font-display)] text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]">
          TACTICAL INTERFACE
        </span>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[var(--accent)]" />
      </div>

      {/* 右侧：时间 */}
      <div className="flex items-center gap-4">
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--text-secondary)]">
          {date}
        </span>
        <div className="h-3 w-[1px] bg-[var(--border-weak)]" />
        <span className="font-[var(--font-mono)] text-[12px] text-[var(--text-primary)] tabular-nums">
          {time}
        </span>
      </div>
    </motion.div>
  );
}
