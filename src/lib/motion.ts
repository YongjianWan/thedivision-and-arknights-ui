// 动效配置常量
export const MOTION = {
  duration: {
    instant: 0.08,
    fast: 0.14,
    base: 0.22,
    normal: 0.22,
    slow: 0.32,
    slower: 0.48,
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    enter: [0, 0, 0.2, 1],
    exit: [0.4, 0, 1, 1],
  },
} as const;

// Framer Motion 动效预设
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: MOTION.duration.fast },
};

export const slideInFromRight = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { duration: MOTION.duration.base },
};

export const lineDraw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: MOTION.duration.base, ease: MOTION.easing.default },
};

export const ping = {
  scale: [1, 1.1, 1],
  opacity: [1, 0.8, 1],
  transition: { duration: MOTION.duration.fast },
};

export const scaleIn = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.96, opacity: 0 },
  transition: { duration: MOTION.duration.base },
};

// ========================================
// P6: 量化缓动 (Quantized Easing)
// 模拟数字信号的阶梯式过渡
// ========================================

/** 6步量化缓动函数 */
export const quantizedEase6 = (t: number) => Math.floor(t * 6) / 6;

/** 10步量化缓动函数 */
export const quantizedEase10 = (t: number) => Math.floor(t * 10) / 10;

/** 4步量化缓动函数 (用于快速反馈) */
export const quantizedEase4 = (t: number) => Math.floor(t * 4) / 4;

/** 量化过渡配置 - 标准 */
export const quantizedTransition = {
  duration: MOTION.duration.base,
  ease: quantizedEase6,
};

/** 量化过渡配置 - 快速 */
export const quantizedTransitionFast = {
  duration: MOTION.duration.fast,
  ease: quantizedEase4,
};

/** 量化过渡配置 - 精细 */
export const quantizedTransitionFine = {
  duration: MOTION.duration.base,
  ease: quantizedEase10,
};

/** 量化淡入 */
export const quantizedFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: quantizedTransition,
};

/** 数值跳变动画 (用于 HUD 数字) */
export const numberTick = {
  transition: {
    duration: MOTION.duration.base,
    ease: quantizedEase10,
  },
};
