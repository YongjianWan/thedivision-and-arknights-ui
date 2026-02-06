'use client';

import { useState, useEffect, useCallback } from 'react';

// 词库
const POOLS = {
  status: [
    'SYSTEM_OK',
    'BUFFER_READY',
    'NODE_ACTIVE',
    'LINK_STABLE',
    'NOMINAL',
    'PROXY_INIT',
    'CACHE_HIT',
    'AUTH_VALID',
    'SYNC_DONE',
    'STANDBY',
  ],
  hex: [
    '0x7F3A2E',
    '0xAB12CF',
    '0x00FF91',
    '0xE7D4B2',
    '0x1A2B3C',
    '0xDEADBEEF',
    '0xCAFEBABE',
    '0xFF6A00',
  ],
  coord: [
    'LAT 31.2304',
    'LNG 121.4737',
    'ALT 4.2M',
    'ZONE_7',
    'SEC_LEVEL_3',
    'CLEARANCE_ALPHA',
    'NODE_ID:7F3A',
  ],
  dynamic: [
    '127.0.0.1:8080',
    '[OK]',
    '████░░',
    'REF#4A2F',
    'T+00:42:17',
    '98.7%',
    '>>',
    '...',
  ],
};

export type TechDecorVariant = keyof typeof POOLS;

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface UseTechDecorOptions {
  /** 词库类型 */
  variant?: TechDecorVariant;
  /** 是否激活跳动 */
  active?: boolean;
  /** 跳动间隔 (ms) */
  interval?: number;
  /** 组合多个词库 */
  combine?: TechDecorVariant[];
}

export function useTechDecor(options: UseTechDecorOptions = {}): string {
  const { variant = 'status', active = false, interval = 150, combine } = options;

  const getRandomText = useCallback(() => {
    if (combine && combine.length > 0) {
      // 从多个词库随机选一个
      const selectedVariant = randomFrom(combine);
      return randomFrom(POOLS[selectedVariant]);
    }
    return randomFrom(POOLS[variant]);
  }, [variant, combine]);

  const [text, setText] = useState(() => getRandomText());

  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setText(getRandomText());
    }, interval);

    return () => clearInterval(timer);
  }, [active, interval, getRandomText]);

  // 非激活状态下也可以手动刷新（通过改变 variant）
  useEffect(() => {
    setText(getRandomText());
  }, [variant, combine, getRandomText]);

  return text;
}

// 导出词库供外部扩展
export { POOLS as TECH_DECOR_POOLS };
