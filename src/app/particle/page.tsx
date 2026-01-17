'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleField, Button, Tabs, type ParticleSource } from '../../components';

type DemoType = 'image' | 'text' | 'grid' | 'random';

const demos: Record<DemoType, { label: string; source: ParticleSource; color?: string | ((i: number, t: number) => string) }> = {
  image: {
    label: '图片',
    source: {
      type: 'image',
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/transparentMap.png',
      sampleStep: 2,
    },
    color: '#FF6A00',
  },
  text: {
    label: '文字',
    source: {
      type: 'text',
      text: 'RHODES',
      fontSize: 120,
      fontFamily: 'Arial Black',
    },
    color: '#18D1FF',
  },
  grid: {
    label: '网格',
    source: {
      type: 'grid',
      cols: 40,
      rows: 25,
      spacing: 8,
    },
    // 渐变色
    color: (i, total) => {
      const hue = (i / total) * 60 + 15; // 橙色到黄色
      return `hsl(${hue}, 100%, 50%)`;
    },
  },
  random: {
    label: '随机',
    source: {
      type: 'random',
      count: 2000,
      spread: 200,
    },
    // 随机暖色
    color: () => {
      const hue = Math.random() * 40 + 10;
      return `hsl(${hue}, 100%, 50%)`;
    },
  },
};

export default function ParticleDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('image');
  const [key, setKey] = useState(0);
  const [settled, setSettled] = useState(false);

  const handleDemoChange = (id: string) => {
    setActiveDemo(id as DemoType);
    setKey(k => k + 1);
    setSettled(false);
  };

  const currentDemo = demos[activeDemo];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)]">
      {/* 粒子背景 */}
      <ParticleField
        key={key}
        source={currentDemo.source}
        color={currentDemo.color}
        backgroundColor="#0B0E12"
        particleSize={activeDemo === 'random' ? 3 : 2}
        speed={0.02}
        enableSwap={activeDemo !== 'text'}
        swapInterval={150}
        cameraSwaySpeed={activeDemo === 'random' ? 3000 : 6000}
        cameraSwayAmount={activeDemo === 'random' ? 50 : 80}
        scale={activeDemo === 'text' ? 1.5 : 1}
        onSettled={() => setSettled(true)}
      />

      {/* UI层 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部控制 */}
        <div className="p-6">
          <div className="max-w-md mx-auto">
            <Tabs
              tabs={Object.entries(demos).map(([id, { label }]) => ({ id, label }))}
              activeTab={activeDemo}
              onTabChange={handleDemoChange}
            />
          </div>
        </div>

        {/* 中间内容 */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: settled ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="font-hud text-4xl tracking-[0.2em] text-[var(--accent)]">
              PARTICLE FIELD
            </h1>
            <p className="text-[var(--text-secondary)] max-w-md">
              {activeDemo === 'image' && '从透明PNG图片提取粒子点阵'}
              {activeDemo === 'text' && '将文字转换为粒子效果'}
              {activeDemo === 'grid' && '规则网格排列的粒子'}
              {activeDemo === 'random' && '球形随机分布的粒子云'}
            </p>
            {settled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[var(--success)] font-mono"
              >
                ● PARTICLES SETTLED
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 底部代码示例 */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto clip-corner-both bg-[var(--bg-elevated)]/80 backdrop-blur-panel border border-[var(--border-weak)] p-4">
            <div className="text-xs text-[var(--text-secondary)] mb-2 font-mono">USAGE</div>
            <pre className="text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
              {activeDemo === 'image' && `<ParticleField
  source={{ type: 'image', src: '/your-image.png', sampleStep: 2 }}
  color="#FF6A00"
/>`}
              {activeDemo === 'text' && `<ParticleField
  source={{ type: 'text', text: 'RHODES', fontSize: 120 }}
  color="#18D1FF"
/>`}
              {activeDemo === 'grid' && `<ParticleField
  source={{ type: 'grid', cols: 40, rows: 25, spacing: 8 }}
  color={(i, total) => \`hsl(\${(i/total)*60+15}, 100%, 50%)\`}
/>`}
              {activeDemo === 'random' && `<ParticleField
  source={{ type: 'random', count: 2000, spread: 200 }}
  color={() => \`hsl(\${Math.random()*40+10}, 100%, 50%)\`}
/>`}
            </pre>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="absolute bottom-4 left-4 text-xs text-[var(--text-disabled)] font-mono">
          <span className="text-[var(--accent)]">●</span> THREE.JS + REACT
        </div>
      </div>
    </div>
  );
}
