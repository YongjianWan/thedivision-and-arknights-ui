'use client';

import React from 'react';
import { cn } from '../lib/utils';

export type GraphNode = {
  id: string;
  label: string;
  x: number; // 0..1
  y: number; // 0..1
  type?: string;
  weight?: number;
  meta?: string;
};

export type GraphEdge = {
  from: string;
  to: string;
  kind?: string;
  strength?: number;
};

interface NodeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number;
  height?: number;
  className?: string;
}

export function NodeGraph({ nodes, edges, width = 480, height = 260, className }: NodeGraphProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto border border-[var(--border-weak)] bg-[var(--bg-base)]"
      >
        {/* edges */}
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const x1 = from.x * width;
          const y1 = from.y * height;
          const x2 = to.x * width;
          const y2 = to.y * height;
          return (
            <line
              key={`${edge.from}-${edge.to}-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--border-weak)"
              strokeWidth={1}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((node) => {
          const x = node.x * width;
          const y = node.y * height;
          const r = Math.max(3, Math.min(8, node.weight ?? 5));
          return (
            <g key={node.id}>
              <circle cx={x} cy={y} r={r + 2} fill="rgba(0,0,0,0.35)" />
              <circle cx={x} cy={y} r={r} fill="var(--accent)" />
              <text
                x={x + 10}
                y={y + 4}
                fill="var(--text-secondary)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
