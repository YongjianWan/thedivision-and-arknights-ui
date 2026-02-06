'use client';

import { useState, useEffect, useMemo } from 'react';

export type PerformanceMode = 'full' | 'reduced' | 'minimal';

export interface PerformanceConfig {
  /** 当前性能模式 */
  mode: PerformanceMode;
  /** 是否启用背景模糊 */
  enableBlur: boolean;
  /** 是否启用噪点层 */
  enableNoise: boolean;
  /** 粒子数量上限 */
  particleCount: number;
  /** 是否启用复杂动画 */
  enableComplexAnimations: boolean;
  /** 是否启用构建式动画 */
  enableConstructionAnimations: boolean;
  /** 动画时长倍数 (1 = 正常, 0 = 瞬时) */
  animationScale: number;
  /** 是否低端设备 */
  isLowEnd: boolean;
  /** 用户是否偏好减少动画 */
  prefersReducedMotion: boolean;
}

interface UsePerformanceModeOptions {
  /** 强制指定模式（覆盖自动检测） */
  forceMode?: PerformanceMode;
  /** 是否监听设备变化 */
  watchChanges?: boolean;
}

/**
 * 检测设备是否低端
 */
function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const nav = navigator as Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: { effectiveType?: string };
  };

  // CPU 核心数 <= 4
  const lowCPU = (nav.hardwareConcurrency ?? 8) <= 4;

  // 内存 <= 4GB
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;

  // 移动设备
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    nav.userAgent
  );

  // 慢速网络
  const slowNetwork = nav.connection?.effectiveType === '2g' || 
                      nav.connection?.effectiveType === 'slow-2g';

  return (lowCPU && lowMemory) || isMobile || slowNetwork;
}

/**
 * 检测用户是否偏好减少动画
 */
function detectReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 根据检测结果确定性能模式
 */
function determineMode(isLowEnd: boolean, prefersReducedMotion: boolean): PerformanceMode {
  if (prefersReducedMotion) return 'minimal';
  if (isLowEnd) return 'reduced';
  return 'full';
}

/**
 * 根据模式生成配置
 */
function generateConfig(
  mode: PerformanceMode,
  isLowEnd: boolean,
  prefersReducedMotion: boolean
): PerformanceConfig {
  switch (mode) {
    case 'full':
      return {
        mode: 'full',
        enableBlur: true,
        enableNoise: true,
        particleCount: 12,
        enableComplexAnimations: true,
        enableConstructionAnimations: true,
        animationScale: 1,
        isLowEnd,
        prefersReducedMotion,
      };
    case 'reduced':
      return {
        mode: 'reduced',
        enableBlur: false, // 用静态模糊图代替
        enableNoise: false,
        particleCount: 6,
        enableComplexAnimations: true,
        enableConstructionAnimations: false, // 简化为淡入
        animationScale: 0.7,
        isLowEnd,
        prefersReducedMotion,
      };
    case 'minimal':
      return {
        mode: 'minimal',
        enableBlur: false,
        enableNoise: false,
        particleCount: 0,
        enableComplexAnimations: false,
        enableConstructionAnimations: false,
        animationScale: 0, // 瞬时
        isLowEnd,
        prefersReducedMotion,
      };
  }
}

/**
 * 性能模式 Hook
 * 
 * 根据设备能力和用户偏好自动选择渲染模式
 * 
 * @example
 * ```tsx
 * const { mode, enableBlur, particleCount } = usePerformanceMode();
 * 
 * return (
 *   <div style={{ backdropFilter: enableBlur ? 'blur(12px)' : 'none' }}>
 *     <ParticleField count={particleCount} />
 *   </div>
 * );
 * ```
 */
export function usePerformanceMode(options: UsePerformanceModeOptions = {}): PerformanceConfig {
  const { forceMode, watchChanges = true } = options;

  const [isLowEnd, _setIsLowEnd] = useState(() => detectLowEndDevice());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => detectReducedMotion());

  // 监听 prefers-reduced-motion 变化
  useEffect(() => {
    if (!watchChanges || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [watchChanges]);

  // 计算最终模式和配置
  const config = useMemo(() => {
    const mode = forceMode ?? determineMode(isLowEnd, prefersReducedMotion);
    return generateConfig(mode, isLowEnd, prefersReducedMotion);
  }, [forceMode, isLowEnd, prefersReducedMotion]);

  return config;
}

/**
 * 获取调整后的动画时长
 */
export function useScaledDuration(baseDuration: number): number {
  const { animationScale } = usePerformanceMode();
  return baseDuration * animationScale;
}

/**
 * 性能模式上下文 Provider（可选，用于全局共享）
 */
import { createContext, useContext, ReactNode } from 'react';

const PerformanceContext = createContext<PerformanceConfig | null>(null);

export function PerformanceProvider({
  children,
  forceMode,
}: {
  children: ReactNode;
  forceMode?: PerformanceMode;
}) {
  const config = usePerformanceMode({ forceMode });

  return (
    <PerformanceContext.Provider value={config}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext(): PerformanceConfig {
  const context = useContext(PerformanceContext);
  if (!context) {
    // 如果没有 Provider，返回默认 full 配置
    return {
      mode: 'full',
      enableBlur: true,
      enableNoise: true,
      particleCount: 12,
      enableComplexAnimations: true,
      enableConstructionAnimations: true,
      animationScale: 1,
      isLowEnd: false,
      prefersReducedMotion: false,
    };
  }
  return context;
}
