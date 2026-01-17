'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOTION } from '../lib/motion';

interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  onTabChange?: (tabId: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, onTabChange, children, className }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab || tabs[0]?.id);

  React.useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);
  
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    onChange?.(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Tab 导航栏 */}
      <div className="relative flex items-center border-b border-[var(--border-weak)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              'relative px-6 py-3 text-[14px] tracking-wider uppercase transition-colors duration-150',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              tab.id === currentTab 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {tab.label}
            
            {/* 激活下划线 - 用 layoutId 自动跟随 */}
            {tab.id === currentTab && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            
            {/* Hover 下划线 */}
            {tab.id !== currentTab && !tab.disabled && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--text-secondary)] opacity-0"
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: MOTION.duration.fast }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab 内容区 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: MOTION.duration.base }}
          className="py-6"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
