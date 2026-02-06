'use client';

import React, { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

// ============================================================
// 类型定义
// ============================================================

export interface SchematicNode {
  id: string;
  label?: string;
  x: number;
  y: number;
  /** 节点类型 */
  type?: 'default' | 'source' | 'target' | 'active' | 'error';
  /** 节点大小 */
  size?: number;
}

export interface SchematicEdge {
  from: string;
  to: string;
  /** 是否显示流动动画 */
  animated?: boolean;
  /** 线条样式 */
  style?: 'solid' | 'dashed';
}

export interface SchematicProps {
  /** 节点列表 */
  nodes: SchematicNode[];
  /** 连线列表 */
  edges: SchematicEdge[];
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 是否显示节点标签 */
  showLabels?: boolean;
  /** 流动动画速度 (秒) */
  flowSpeed?: number;
  /** 自定义类名 */
  className?: string;
  /** 是否暂停动画 */
  paused?: boolean;
}

// ============================================================
// 节点样式配置
// ============================================================

const nodeStyles: Record<string, { fill: string; stroke: string; glow?: string }> = {
  default: {
    fill: 'var(--bg-elevated)',
    stroke: 'var(--border-strong)',
  },
  source: {
    fill: 'var(--accent)',
    stroke: 'var(--accent)',
    glow: 'var(--accent)',
  },
  target: {
    fill: 'var(--bg-elevated)',
    stroke: 'var(--accent)',
  },
  active: {
    fill: 'var(--accent)',
    stroke: 'var(--accent)',
    glow: 'var(--accent)',
  },
  error: {
    fill: 'var(--danger)',
    stroke: 'var(--danger)',
    glow: 'var(--danger)',
  },
};

// ============================================================
// Schematic 组件
// ============================================================

export function Schematic({
  nodes,
  edges,
  width = 300,
  height = 200,
  showLabels = true,
  flowSpeed = 2,
  className,
  paused = false,
}: SchematicProps) {
  const uniqueId = useId();

  // 构建节点查找表
  const nodeMap = useMemo(() => {
    const map = new Map<string, SchematicNode>();
    nodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [nodes]);

  // 计算连线路径
  const edgePaths = useMemo(() => {
    return edges.map((edge, index) => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      
      if (!fromNode || !toNode) return null;

      // 直角折线路径
      const midX = (fromNode.x + toNode.x) / 2;
      const path = `M ${fromNode.x} ${fromNode.y} L ${midX} ${fromNode.y} L ${midX} ${toNode.y} L ${toNode.x} ${toNode.y}`;
      
      // 计算路径长度（近似）
      const dx = Math.abs(toNode.x - fromNode.x);
      const dy = Math.abs(toNode.y - fromNode.y);
      const length = dx + dy;

      return {
        ...edge,
        path,
        length,
        index,
      };
    }).filter(Boolean);
  }, [edges, nodeMap]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('schematic', className)}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* 流动光点渐变 */}
        <linearGradient id={`flow-gradient-${uniqueId}`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        {/* 发光滤镜 */}
        <filter id={`glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 连线层 */}
      <g className="schematic-edges">
        {edgePaths.map((edge) => {
          if (!edge) return null;
          
          return (
            <g key={`edge-${edge.from}-${edge.to}`}>
              {/* 底层线条 */}
              <path
                d={edge.path}
                fill="none"
                stroke="var(--border-weak)"
                strokeWidth="1"
                strokeDasharray={edge.style === 'dashed' ? '4 4' : undefined}
              />
              
              {/* 流动光点 */}
              {edge.animated && !paused && (
                <motion.circle
                  r="3"
                  fill="var(--accent)"
                  filter={`url(#glow-${uniqueId})`}
                  initial={{ offsetDistance: '0%' }}
                  animate={{ offsetDistance: '100%' }}
                  transition={{
                    duration: flowSpeed,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: edge.index * 0.3,
                  }}
                  style={{
                    offsetPath: `path('${edge.path}')`,
                  }}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* 节点层 */}
      <g className="schematic-nodes">
        {nodes.map((node) => {
          const style = nodeStyles[node.type || 'default'];
          const size = node.size || 8;

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* 发光效果 */}
              {style.glow && (
                <circle
                  r={size + 4}
                  fill="none"
                  stroke={style.glow}
                  strokeWidth="1"
                  opacity="0.3"
                  filter={`url(#glow-${uniqueId})`}
                />
              )}
              
              {/* 节点主体 */}
              <rect
                x={-size / 2}
                y={-size / 2}
                width={size}
                height={size}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1.5"
              />

              {/* 中心点 */}
              {node.type === 'source' || node.type === 'active' ? (
                <motion.circle
                  r="2"
                  fill="white"
                  animate={paused ? {} : { opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ) : null}

              {/* 标签 */}
              {showLabels && node.label && (
                <text
                  y={size / 2 + 12}
                  textAnchor="middle"
                  className="text-[9px] font-mono uppercase fill-[var(--text-secondary)]"
                  style={{ opacity: 0.7 }}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ============================================================
// 预设：服务器拓扑图
// ============================================================

export interface ServerTopologyProps {
  /** 服务器列表 */
  servers?: Array<{ id: string; label: string; status: 'online' | 'offline' | 'busy' }>;
  /** 中心节点标签 */
  centerLabel?: string;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  className?: string;
}

export function ServerTopology({
  servers = [
    { id: 'srv1', label: 'NODE_A', status: 'online' },
    { id: 'srv2', label: 'NODE_B', status: 'busy' },
    { id: 'srv3', label: 'NODE_C', status: 'online' },
    { id: 'srv4', label: 'NODE_D', status: 'offline' },
  ],
  centerLabel = 'HUB',
  width = 240,
  height = 180,
  className,
}: ServerTopologyProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35;

  // 计算节点位置（圆形分布）
  const nodes: SchematicNode[] = [
    { id: 'center', label: centerLabel, x: centerX, y: centerY, type: 'source', size: 12 },
    ...servers.map((srv, i) => {
      const angle = (i / servers.length) * Math.PI * 2 - Math.PI / 2;
      return {
        id: srv.id,
        label: srv.label,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        type: srv.status === 'online' ? 'target' : srv.status === 'busy' ? 'active' : 'error',
        size: 8,
      } as SchematicNode;
    }),
  ];

  // 从中心连接到所有服务器
  const edges: SchematicEdge[] = servers.map((srv) => ({
    from: 'center',
    to: srv.id,
    animated: srv.status !== 'offline',
    style: srv.status === 'offline' ? 'dashed' : 'solid',
  }));

  return (
    <Schematic
      nodes={nodes}
      edges={edges}
      width={width}
      height={height}
      flowSpeed={1.5}
      className={className}
    />
  );
}

// ============================================================
// 预设：数据流图
// ============================================================

export interface DataFlowProps {
  /** 阶段列表 */
  stages?: string[];
  /** 当前激活阶段（0-based） */
  activeStage?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  className?: string;
}

export function DataFlow({
  stages = ['INPUT', 'PROCESS', 'VALIDATE', 'OUTPUT'],
  activeStage = 1,
  width = 320,
  height = 60,
  className,
}: DataFlowProps) {
  const padding = 40;
  const stageWidth = (width - padding * 2) / (stages.length - 1);

  const nodes: SchematicNode[] = stages.map((label, i) => ({
    id: `stage-${i}`,
    label,
    x: padding + i * stageWidth,
    y: height / 2,
    type: i < activeStage ? 'active' : i === activeStage ? 'source' : 'default',
    size: 10,
  }));

  const edges: SchematicEdge[] = stages.slice(0, -1).map((_, i) => ({
    from: `stage-${i}`,
    to: `stage-${i + 1}`,
    animated: i === activeStage - 1 || i === activeStage,
    style: i >= activeStage ? 'dashed' : 'solid',
  }));

  return (
    <Schematic
      nodes={nodes}
      edges={edges}
      width={width}
      height={height}
      flowSpeed={1}
      className={className}
    />
  );
}
