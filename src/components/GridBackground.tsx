'use client';

import React from 'react';
import { motion } from 'framer-motion';

type GridVariant = 'grid' | 'dots' | 'none';

interface GridBackgroundProps {
  variant?: GridVariant;
  opacity?: number;
  className?: string;
}

export function GridBackground({ variant = 'grid', opacity = 1, className }: GridBackgroundProps) {
  // 确定性伪随机，避免 SSR/CSR 不一致
  const particles = React.useMemo(() => {
    function mulberry32(a: number) {
      return function () {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(1337);
    return Array.from({ length: 12 }, (_, i) => ({
      left: 5 + i * 7.5,
      height: 30 + rand() * 60,
      duration: 3 + rand() * 4,
      delay: rand() * 5,
    }));
  }, []);
  if (variant === 'none') return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--bg-base)] ${className ?? ''}`}
      style={{ opacity }}
    >
      {/* 透视网格地面 */}
      {variant === 'grid' && (
        <div 
          className="absolute inset-0 grid-animated"
          style={{
            background: `
              linear-gradient(to bottom, transparent 0%, rgba(var(--bg-base-rgb),0.3) 50%, rgba(var(--bg-base-rgb),0.95) 100%),
              linear-gradient(rgba(var(--accent-rgb),0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb),0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top',
            top: '40%',
            height: '150%',
          }}
        />
      )}

      {variant === 'dots' && (
        <div
          className="absolute inset-0 grid-animated"
          style={{
            backgroundImage: 'radial-gradient(rgba(var(--accent-rgb),0.15) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* 水平扫描线 - 从上往下循环（CSS 动画，降低 JS 负担） */}
      {variant === 'grid' && (
        <div
          className="absolute left-0 right-0 h-[2px] grid-scan grid-animated"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb),0.6) 20%, rgba(var(--accent-rgb),0.8) 50%, rgba(var(--accent-rgb),0.6) 80%, transparent 100%)',
            boxShadow: '0 0 16px rgba(var(--accent-rgb),0.45), 0 0 28px rgba(var(--accent-rgb),0.25)',
            animationDuration: '8s',
          }}
        />
      )}

      {/* 数据流粒子 - 垂直下落（CSS 动画 + 确定性伪随机） */}
      {variant === 'grid' && particles.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-[rgba(var(--accent-rgb),0.8)] to-transparent grid-particle grid-animated"
          style={{
            left: `${p.left}%`,
            height: `${p.height}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 六边形装饰 */}
      {variant === 'grid' && (
        <>
          <svg className="absolute top-[15%] left-[8%] w-24 h-24 opacity-20 grid-animated" viewBox="0 0 100 100">
            <motion.polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
          
          <svg className="absolute bottom-[20%] right-[10%] w-32 h-32 opacity-15 grid-animated" viewBox="0 0 100 100">
            <motion.polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </>
      )}

      {/* 角落瞄准框 */}
      {variant === 'grid' && (
        <>
          <div className="absolute top-6 left-6">
            <motion.div 
              className="w-12 h-12 border-l-2 border-t-2 border-[var(--accent)] grid-animated"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="absolute top-6 right-6">
            <motion.div 
              className="w-12 h-12 border-r-2 border-t-2 border-[var(--accent)] grid-animated"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <div className="absolute bottom-6 left-6">
            <motion.div 
              className="w-12 h-12 border-l-2 border-b-2 border-[var(--accent)] grid-animated"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          <div className="absolute bottom-6 right-6">
            <motion.div 
              className="w-12 h-12 border-r-2 border-b-2 border-[var(--accent)] grid-animated"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </div>
        </>
      )}

      {/* 中心圆环雷达 */}
      {variant === 'grid' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* 外圈 */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[rgba(var(--accent-rgb),0.2)] grid-animated"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* 内圈 */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-[rgba(var(--accent-rgb),0.3)] grid-animated"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {/* 雷达扫描线 */}
            <div 
              className="absolute top-1/2 left-1/2 w-1/2 h-[1px] origin-left"
              style={{
                background: 'linear-gradient(90deg, rgba(var(--accent-rgb),0.8), transparent)',
              }}
            />
          </motion.div>
          {/* 中心点 */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)] grid-animated"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      )}

      {/* 边缘暗角 */}
      {variant === 'grid' && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(var(--bg-base-rgb),0.7) 80%, rgba(var(--bg-base-rgb),0.95) 100%)',
          }}
        />
      )}

      {/* 顶部渐变遮罩 */}
      {variant === 'grid' && (
        <div 
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, rgba(var(--bg-base-rgb),0.9) 0%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
}
