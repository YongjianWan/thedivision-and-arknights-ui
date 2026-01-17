'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  TacticalPanel,
  Progress,
  Tabs,
  GridBackground,
  HUDMeter,
  Tooltip,
} from '../../components';
import { MOTION } from '../../lib/motion';

// 模拟干员数据
const operatorData = {
  name: 'EXUSIAI',
  codename: '能天使',
  class: 'SNIPER',
  rarity: 6,
  level: 90,
  elite: 2,
  trust: 200,
  potential: 6,
  stats: {
    hp: 1525,
    atk: 745,
    def: 152,
    res: 0,
    cost: 13,
    block: 1,
    atkInterval: 1.0,
  },
  skills: [
    { name: '充能', level: 7, mastery: 3, sp: 15, duration: 25 },
    { name: '过载', level: 7, mastery: 3, sp: 30, duration: 15 },
    { name: '天使之歌', level: 7, mastery: 3, sp: 35, duration: 20 },
  ],
  talents: [
    { name: '天使的加护', effect: '攻击速度+12' },
    { name: '向量突破', effect: '攻击力+6%，攻击间隔-0.15s' },
  ],
};

export default function OperatorPage() {
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [activeTab, setActiveTab] = useState('stats');

  const skill = operatorData.skills[selectedSkill];

  return (
    <div className="relative min-h-screen p-6 overflow-auto">
      <GridBackground variant="dots" opacity={0.03} />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* 顶部干员信息 */}
        <div className="flex gap-6">
          {/* 干员立绘区域 - 使用 clip-corner */}
          <div className="clip-corner-both bg-[var(--bg-elevated)] border border-[var(--border-weak)] w-80 h-96 relative overflow-hidden">
            {/* 稀有度星星 */}
            <div className="absolute top-4 left-4 flex gap-1">
              {Array.from({ length: operatorData.rarity }).map((_, i) => (
                <span key={i} className="text-[var(--warning)] text-lg">★</span>
              ))}
            </div>
            
            {/* 职业标签 */}
            <div className="absolute top-4 right-4 clip-chevron bg-[var(--accent)] px-4 py-1">
              <span className="font-hud text-xs tracking-widest">{operatorData.class}</span>
            </div>

            {/* 干员名称 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="font-tactical text-3xl tracking-wider">{operatorData.name}</h1>
              <p className="text-[var(--text-secondary)] text-sm">{operatorData.codename}</p>
            </div>

            {/* 等级/精英化标识 */}
            <div className="absolute bottom-4 right-4 text-right">
              <div className="font-hud text-2xl glow-accent">E{operatorData.elite}</div>
              <div className="text-[var(--text-secondary)] text-xs">LV.{operatorData.level}</div>
            </div>
          </div>

          {/* 右侧信息面板 */}
          <div className="flex-1 space-y-4">
            {/* 属性/技能/天赋 切换 */}
            <Tabs
              tabs={[
                { id: 'stats', label: '属性' },
                { id: 'skills', label: '技能' },
                { id: 'talents', label: '天赋' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <AnimatePresence mode="wait">
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: MOTION.duration.fast }}
                >
                  <TacticalPanel title="OPERATOR STATS" className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <StatRow label="生命" value={operatorData.stats.hp} max={3000} color="success" />
                      <StatRow label="攻击" value={operatorData.stats.atk} max={1000} color="danger" />
                      <StatRow label="防御" value={operatorData.stats.def} max={800} color="accent" />
                      <StatRow label="法抗" value={operatorData.stats.res} max={100} suffix="%" color="warning" />
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[var(--border-weak)] grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-[var(--text-secondary)] text-xs uppercase">部署费用</div>
                        <div className="font-hud text-xl">{operatorData.stats.cost}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-secondary)] text-xs uppercase">阻挡数</div>
                        <div className="font-hud text-xl">{operatorData.stats.block}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-secondary)] text-xs uppercase">攻击间隔</div>
                        <div className="font-hud text-xl">{operatorData.stats.atkInterval}s</div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: MOTION.duration.fast }}
                >
                  <TacticalPanel title="SKILLS" className="p-4">
                    {/* 技能选择 */}
                    <div className="flex gap-2 mb-4">
                      {operatorData.skills.map((s, i) => (
                        <Tooltip key={i} content={s.name}>
                          <button
                            onClick={() => setSelectedSkill(i)}
                            className={`
                              w-12 h-12 border-2 font-hud text-lg transition-all
                              ${selectedSkill === i 
                                ? 'border-[var(--accent-alt)] bg-[var(--accent-alt)]/20 glow-accent-alt' 
                                : 'border-[var(--border-strong)] hover:border-[var(--accent-alt)]'}
                            `}
                          >
                            {i + 1}
                          </button>
                        </Tooltip>
                      ))}
                    </div>

                    {/* 技能详情 - 使用 border-scan */}
                    <div className="border-scan bg-[var(--bg-base)] p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-tactical text-xl">{skill.name}</h3>
                          <div className="text-[var(--text-secondary)] text-sm">
                            等级 {skill.level} · 专精 {skill.mastery}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-hud text-[var(--accent-alt)]">SP {skill.sp}</div>
                          <div className="text-[var(--text-secondary)] text-xs">{skill.duration}s</div>
                        </div>
                      </div>
                      
                      {/* 专精进度 */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-secondary)]">专精</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((m) => (
                            <div
                              key={m}
                              className={`w-6 h-6 border flex items-center justify-center text-xs font-hud
                                ${m <= skill.mastery 
                                  ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]' 
                                  : 'border-[var(--border-weak)] text-[var(--text-disabled)]'}`}
                            >
                              M{m}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              )}

              {activeTab === 'talents' && (
                <motion.div
                  key="talents"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: MOTION.duration.fast }}
                >
                  <TacticalPanel title="TALENTS" className="p-4 space-y-3">
                    {operatorData.talents.map((talent, i) => (
                      <div 
                        key={i} 
                        className="clip-corner-tr bg-[var(--bg-base)] p-4 border-l-2 border-[var(--accent)]"
                      >
                        <h4 className="font-tactical text-lg text-[var(--accent)]">{talent.name}</h4>
                        <p className="text-[var(--text-secondary)] text-sm mt-1">{talent.effect}</p>
                      </div>
                    ))}
                  </TacticalPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 底部信赖/潜能 */}
        <div className="grid grid-cols-2 gap-6">
          <TacticalPanel title="TRUST" className="p-4">
            <HUDMeter
              value={operatorData.trust}
              max={200}
              label="信赖值"
              segments={10}
              color="var(--warning)"
            />
          </TacticalPanel>

          <TacticalPanel title="POTENTIAL" className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">潜能等级</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((p) => (
                  <div
                    key={p}
                    className={`w-8 h-8 border flex items-center justify-center font-hud
                      ${p <= operatorData.potential 
                        ? 'border-[var(--accent-alt)] bg-[var(--accent-alt)]/20 text-[var(--accent-alt)]' 
                        : 'border-[var(--border-weak)] text-[var(--text-disabled)]'}`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </TacticalPanel>
        </div>

        {/* 操作按钮 - 使用 tactical 和 inverted 变体 */}
        <div className="flex gap-4 justify-center">
          <Button variant="tactical" size="lg">
            强化
          </Button>
          <Button variant="primary" size="lg">
            编入队伍
          </Button>
          <Button variant="inverted" size="lg">
            查看档案
          </Button>
        </div>
      </div>
    </div>
  );
}

// 属性行组件
function StatRow({ 
  label, 
  value, 
  max, 
  suffix = '', 
  color 
}: { 
  label: string; 
  value: number; 
  max: number; 
  suffix?: string;
  color: 'accent' | 'success' | 'danger' | 'warning';
}) {
  const colorMap = {
    accent: 'var(--accent)',
    success: 'var(--success)',
    danger: 'var(--danger)',
    warning: 'var(--warning)',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className="font-hud">{value}{suffix}</span>
      </div>
      <Progress value={(value / max) * 100} color={colorMap[color]} size="sm" />
    </div>
  );
}
