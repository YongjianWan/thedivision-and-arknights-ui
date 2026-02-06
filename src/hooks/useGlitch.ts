'use client';

import { useState, useCallback, useRef } from 'react';

export type GlitchIntensity = 'light' | 'medium' | 'heavy';

export interface GlitchOptions {
  /** 故障强度 */
  intensity?: GlitchIntensity;
  /** 持续时间 (ms) */
  duration?: number;
}

export interface UseGlitchReturn {
  /** 是否正在故障中 */
  isGlitching: boolean;
  /** 触发故障效果 */
  triggerGlitch: (options?: GlitchOptions) => void;
  /** 获取当前应该应用的 CSS 类 */
  glitchClass: string;
  /** 获取文字故障 CSS 类 */
  textGlitchClass: string;
}

// 强度对应的默认时长
const DURATION_MAP: Record<GlitchIntensity, number> = {
  light: 150,
  medium: 250,
  heavy: 400,
};

/**
 * 受控故障效果 Hook
 * 
 * 严格限制触发规则：
 * - ✅ 网络断开、API Error
 * - ✅ Critical Alert
 * - ✅ 执行不可逆操作瞬间
 * - ❌ 常规 Hover
 * - ❌ 页面加载
 * - ❌ 常驻循环
 * 
 * @example
 * ```tsx
 * const { isGlitching, triggerGlitch, glitchClass } = useGlitch();
 * 
 * // 在 API 错误时触发
 * useEffect(() => {
 *   if (error) {
 *     triggerGlitch({ intensity: 'light' });
 *   }
 * }, [error]);
 * 
 * return <div className={glitchClass}>Content</div>;
 * ```
 */
export function useGlitch(): UseGlitchReturn {
  const [isGlitching, setIsGlitching] = useState(false);
  const [intensity, setIntensity] = useState<GlitchIntensity>('light');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = useCallback((options: GlitchOptions = {}) => {
    const { 
      intensity: newIntensity = 'light', 
      duration = DURATION_MAP[newIntensity] 
    } = options;

    // 如果已经在故障中，先清除
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIntensity(newIntensity);
    setIsGlitching(true);

    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
      timeoutRef.current = null;
    }, duration);
  }, []);

  // 根据强度返回对应的 CSS 类
  const glitchClass = isGlitching 
    ? `glitch-active glitch-${intensity}` 
    : '';
  
  const textGlitchClass = isGlitching 
    ? `glitch-text-active glitch-text-${intensity}` 
    : '';

  return {
    isGlitching,
    triggerGlitch,
    glitchClass,
    textGlitchClass,
  };
}

/**
 * 自动在错误状态时触发故障效果
 */
export function useErrorGlitch(hasError: boolean, options?: GlitchOptions): UseGlitchReturn {
  const glitch = useGlitch();
  const prevErrorRef = useRef(hasError);

  // 只在 error 状态从 false 变为 true 时触发
  if (hasError && !prevErrorRef.current) {
    glitch.triggerGlitch(options);
  }
  prevErrorRef.current = hasError;

  return glitch;
}
