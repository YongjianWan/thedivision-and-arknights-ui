'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Typewriter, GridBackground, ScanSweep } from '../../components';
import { MOTION } from '../../lib/motion';

export default function LoginPage() {
  const [phase, setPhase] = useState<'boot' | 'login' | 'ready'>('boot');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 模拟启动序列
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    // 模拟登录
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setPhase('ready');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景效果 */}
      <GridBackground variant="grid" opacity={0.05} />
      <ScanSweep color="var(--accent)" interval={4000} />

      {/* 噪点叠加 */}
      <div className="noise-overlay fixed inset-0 pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* 启动阶段 */}
        {phase === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-8"
          >
            {/* LOGO */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-hud text-6xl tracking-[0.3em] text-[var(--accent)] glow-accent">
                RHODES ISLAND
              </h1>
            </motion.div>

            {/* 启动文本 */}
            <div className="font-mono text-sm text-[var(--text-secondary)] space-y-1">
              <Typewriter text="INITIALIZING TERMINAL INTERFACE..." speed={30} className="block" />
            </div>

            {/* 加载条 */}
            <div className="w-80 mx-auto">
              <div className="h-1 bg-[var(--border-weak)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-2 font-hud">
                <span>SYSTEM CHECK</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ▌
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 登录阶段 */}
        {phase === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: MOTION.duration.normal }}
            className="w-full max-w-md"
          >
            {/* 登录面板 - 使用 clip-corner 和 border-glow-pulse */}
            <div className="clip-corner-both border border-[var(--border-strong)] bg-[var(--bg-elevated)]/80 backdrop-blur-panel border-glow-pulse">
              <div className="p-8 space-y-6">
                {/* 标题 */}
                <div className="text-center">
                  <h2 className="font-tactical text-2xl tracking-wider">OPERATOR LOGIN</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    SECURE TERMINAL ACCESS
                  </p>
                </div>

                {/* 表单 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      OPERATOR ID
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-weak)] 
                               text-[var(--text-primary)] font-mono transition-colors focus-ring"
                      placeholder="Enter your ID"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      ACCESS CODE
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 px-4 bg-[var(--bg-base)] border border-[var(--border-weak)] 
                               text-[var(--text-primary)] font-mono transition-colors focus-ring"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* 登录按钮 - 使用 inverted 变体 */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleLogin}
                    loading={isLoading}
                  >
                    AUTHORIZE
                  </Button>

                  <Button variant="inverted" size="md" className="w-full">
                    GUEST ACCESS
                  </Button>
                </div>

                {/* 底部信息 */}
                <div className="text-center text-xs text-[var(--text-disabled)] font-mono">
                  <p>RHODES ISLAND PHARMACEUTICAL INC.</p>
                  <p className="mt-1">TERMINAL v2.1.0 // BUILD 20260116</p>
                </div>
              </div>
            </div>

            {/* 装饰性角标 */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)]" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)]" />
          </motion.div>
        )}

        {/* 登录成功 */}
        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto border-2 border-[var(--success)] flex items-center justify-center glow-accent">
                <motion.svg
                  className="w-10 h-10 text-[var(--success)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>
            </motion.div>

            <div>
              <h2 className="font-tactical text-2xl text-[var(--success)]">ACCESS GRANTED</h2>
              <p className="text-[var(--text-secondary)] mt-2">Welcome back, Doctor.</p>
            </div>

            <Typewriter
              text="LOADING COMMAND CENTER..."
              speed={40}
              className="text-sm text-[var(--text-secondary)] font-mono"
            />

            <Button
              variant="tactical"
              size="lg"
              onClick={() => (window.location.href = '/dashboard')}
            >
              ENTER TERMINAL
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部版本信息 */}
      <div className="fixed bottom-4 left-4 text-xs text-[var(--text-disabled)] font-mono">
        <span className="text-[var(--accent)]">■</span> RHODES ISLAND TERMINAL SYSTEM
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-[var(--text-disabled)] font-mono text-right">
        <div>SECURE CONNECTION</div>
        <div className="text-[var(--success)]">● ENCRYPTED</div>
      </div>
    </div>
  );
}
