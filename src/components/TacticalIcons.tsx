'use client';

import React from 'react';

// ========================================
// P5: 战术图标规范
// 风格: Filled/Solid 优先，禁止纯线性
// 要求: 单色、锐利边角、通过眯眼测试
// ========================================

export interface IconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

// ========================================
// 通用战术图标
// ========================================

/** 锁定目标 - 四角框 + 中心点 */
export function TargetLockIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Target Lock"
      {...props}
    >
      {/* 四角框 */}
      <path d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 15v6h6v-2H5v-4H3zm18 0v6h-6v-2h4v-4h2z" />
      {/* 中心点 */}
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** 信号强度 - 3格显示 */
export function SignalIcon({ 
  level = 3, 
  size = 24, 
  className,
  ...props 
}: IconProps & { level?: 0 | 1 | 2 | 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label={`Signal Strength: ${level} of 3`}
      {...props}
    >
      <rect 
        x="4" y="14" width="4" height="8" 
        fill="currentColor" 
        opacity={level >= 1 ? 1 : 0.2} 
      />
      <rect 
        x="10" y="10" width="4" height="12" 
        fill="currentColor" 
        opacity={level >= 2 ? 1 : 0.2} 
      />
      <rect 
        x="16" y="6" width="4" height="16" 
        fill="currentColor" 
        opacity={level >= 3 ? 1 : 0.2} 
      />
    </svg>
  );
}

/** 雷达扫描 */
export function RadarIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Radar"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 12l6-6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** 上行链路 */
export function UplinkIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Uplink"
      {...props}
    >
      <path d="M12 4l-6 6h4v8h4v-8h4l-6-6z" />
      <rect x="4" y="18" width="16" height="2" />
    </svg>
  );
}

/** 下行链路 */
export function DownlinkIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Downlink"
      {...props}
    >
      <rect x="4" y="4" width="16" height="2" />
      <path d="M12 8v8h-4l6 6 6-6h-4V8h-4z" />
    </svg>
  );
}

/** 加密/安全 */
export function SecureIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Secure"
      {...props}
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </svg>
  );
}

/** 警报/警戒 */
export function AlertIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Alert"
      {...props}
    >
      <path d="M12 2L1 21h22L12 2zm0 3.47L19.53 19H4.47L12 5.47zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
  );
}

/** 电池状态 */
export function BatteryIcon({ 
  level = 100, 
  size = 24, 
  className,
  ...props 
}: IconProps & { level?: number }) {
  const barCount = Math.ceil((level / 100) * 4);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={`Battery: ${level}%`}
      {...props}
    >
      {/* 外框 */}
      <path d="M17 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H7V6h10v12z" />
      {/* 顶部接口 */}
      <rect x="10" y="2" width="4" height="2" />
      {/* 电量条 */}
      {barCount >= 1 && <rect x="8" y="15" width="8" height="2" />}
      {barCount >= 2 && <rect x="8" y="12" width="8" height="2" />}
      {barCount >= 3 && <rect x="8" y="9" width="8" height="2" />}
      {barCount >= 4 && <rect x="8" y="6" width="8" height="2" opacity="0.7" />}
    </svg>
  );
}

/** 十字准心 */
export function CrosshairIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Crosshair"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.93A8.001 8.001 0 0 1 4.07 13H7v-2H4.07A8.001 8.001 0 0 1 11 4.07V7h2V4.07A8.001 8.001 0 0 1 19.93 11H17v2h2.93A8.001 8.001 0 0 1 13 19.93z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/** 数据流 */
export function DataStreamIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Data Stream"
      {...props}
    >
      <rect x="4" y="4" width="4" height="4" />
      <rect x="10" y="4" width="4" height="4" />
      <rect x="16" y="4" width="4" height="4" />
      <rect x="4" y="10" width="4" height="4" />
      <rect x="10" y="10" width="4" height="4" />
      <rect x="16" y="10" width="4" height="4" opacity="0.5" />
      <rect x="4" y="16" width="4" height="4" />
      <rect x="10" y="16" width="4" height="4" opacity="0.5" />
      <rect x="16" y="16" width="4" height="4" opacity="0.3" />
    </svg>
  );
}

/** 节点/终端 */
export function NodeIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Node"
      {...props}
    >
      <rect x="8" y="8" width="8" height="8" />
      <rect x="11" y="2" width="2" height="6" />
      <rect x="11" y="16" width="2" height="6" />
      <rect x="2" y="11" width="6" height="2" />
      <rect x="16" y="11" width="6" height="2" />
    </svg>
  );
}

/** 服务器/机架 */
export function ServerIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Server"
      {...props}
    >
      <path d="M4 3h16v6H4V3zm0 8h16v6H4v-6zm0 8h16v2H4v-2z" />
      <circle cx="6" cy="6" r="1" fill="var(--bg-base, #0A0A0A)" />
      <circle cx="6" cy="14" r="1" fill="var(--bg-base, #0A0A0A)" />
      <rect x="8" y="5" width="8" height="2" fill="var(--bg-base, #0A0A0A)" opacity="0.5" />
      <rect x="8" y="13" width="8" height="2" fill="var(--bg-base, #0A0A0A)" opacity="0.5" />
    </svg>
  );
}

/** GPS/定位 */
export function LocationIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Location"
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

/** 六边形/蜂窝单元 */
export function HexIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Hex Cell"
      {...props}
    >
      <path d="M12 2l-8 4.5v9L12 20l8-4.5v-9L12 2zm0 2.3l5.5 3.1v6.2L12 16.7l-5.5-3.1V7.4L12 4.3z" />
    </svg>
  );
}

/** 时钟/同步 */
export function SyncIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Sync"
      {...props}
    >
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
    </svg>
  );
}

/** 菱形装饰 */
export function DiamondIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Diamond"
      {...props}
    >
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.41L18.59 12 12 18.59 5.41 12 12 5.41z" />
    </svg>
  );
}

// ========================================
// 图标集合导出
// ========================================

export const TacticalIcons = {
  TargetLock: TargetLockIcon,
  Signal: SignalIcon,
  Radar: RadarIcon,
  Uplink: UplinkIcon,
  Downlink: DownlinkIcon,
  Secure: SecureIcon,
  Alert: AlertIcon,
  Battery: BatteryIcon,
  Crosshair: CrosshairIcon,
  DataStream: DataStreamIcon,
  Node: NodeIcon,
  Server: ServerIcon,
  Location: LocationIcon,
  Hex: HexIcon,
  Sync: SyncIcon,
  Diamond: DiamondIcon,
};

export default TacticalIcons;
