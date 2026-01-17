'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  TacticalPanel,
  Progress,
  Modal,
  Select,
  Tooltip,
  GridBackground,
  ScanSweep,
  HUDMeter,
  Card,
} from '../../components';
import { MOTION } from '../../lib/motion';

// 模拟关卡数据
const stageData = {
  code: 'H8-4',
  name: '魔王',
  type: 'BOSS',
  difficulty: 4,
  sanity: 21,
  recommended: 'LV. 90 / E2',
  enemies: [
    { name: '萨卡兹剑士', count: 12, threat: 2 },
    { name: '萨卡兹术师', count: 8, threat: 3 },
    { name: '帝国先锋', count: 6, threat: 3 },
    { name: '塔露拉', count: 1, threat: 5 },
  ],
  objectives: [
    { type: 'primary', text: '击杀所有敌人' },
    { type: 'secondary', text: '不使用急救物资' },
    { type: 'hidden', text: '????' },
  ],
};

// 模拟编队数据
const squadSlots = [
  { id: 1, operator: { name: 'EXUSIAI', class: 'SNIPER', elite: 2 } },
  { id: 2, operator: { name: 'SILVERASH', class: 'GUARD', elite: 2 } },
  { id: 3, operator: { name: 'SARIA', class: 'DEFENDER', elite: 2 } },
  { id: 4, operator: { name: 'EYJA', class: 'CASTER', elite: 2 } },
  { id: 5, operator: { name: 'MYRTLE', class: 'VANGUARD', elite: 2 } },
  { id: 6, operator: { name: 'SURTR', class: 'GUARD', elite: 2 } },
  { id: 7, operator: null },
  { id: 8, operator: null },
  { id: 9, operator: null },
  { id: 10, operator: null },
  { id: 11, operator: null },
  { id: 12, operator: null },
];

export default function BattlePrepPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [supportUnit, setSupportUnit] = useState('');
  const [autoSkill, setAutoSkill] = useState('manual');

  const totalPower = squadSlots.filter(s => s.operator).length * 1200;
  const recommendedPower = 8000;

  return (
    <div className="relative min-h-screen p-6 overflow-auto">
      <GridBackground variant="dots" opacity={0.03} />
      
      {/* 右上角扫描效果 */}
      <ScanSweep color="var(--accent-alt)" interval={6000} />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* 顶部关卡信息 */}
        <div className="flex items-start gap-6">
          {/* 关卡标识 - 使用 border-scan */}
          <div className="border-scan clip-corner-both bg-[var(--bg-elevated)] p-6 min-w-[200px]">
            <div className="font-hud text-4xl text-[var(--accent)]">{stageData.code}</div>
            <div className="font-tactical text-xl mt-1">{stageData.name}</div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-[var(--text-secondary)]">THREAT</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={`w-2 h-4 ${i <= stageData.difficulty ? 'bg-[var(--danger)]' : 'bg-[var(--border-weak)]'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 任务目标 */}
          <TacticalPanel title="MISSION OBJECTIVES" className="flex-1 p-4">
            <div className="space-y-2">
              {stageData.objectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${
                    obj.type === 'primary' ? 'bg-[var(--accent)]' :
                    obj.type === 'secondary' ? 'bg-[var(--warning)]' :
                    'bg-[var(--text-disabled)]'
                  }`} />
                  <span className={obj.type === 'hidden' ? 'text-[var(--text-disabled)]' : ''}>
                    {obj.text}
                  </span>
                  {obj.type === 'primary' && (
                    <span className="text-xs text-[var(--accent)] font-hud ml-auto">REQUIRED</span>
                  )}
                </div>
              ))}
            </div>
          </TacticalPanel>

          {/* 消耗/推荐 */}
          <div className="space-y-3">
            <Card className="p-4 text-center">
              <div className="text-xs text-[var(--text-secondary)]">SANITY COST</div>
              <div className="font-hud text-2xl text-[var(--warning)]">{stageData.sanity}</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-xs text-[var(--text-secondary)]">RECOMMENDED</div>
              <div className="font-tactical text-sm">{stageData.recommended}</div>
            </Card>
          </div>
        </div>

        {/* 敌人情报 */}
        <TacticalPanel title="ENEMY INTEL" className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {stageData.enemies.map((enemy, i) => (
              <div 
                key={i} 
                className={`
                  p-3 border bg-[var(--bg-base)]
                  ${enemy.threat >= 4 ? 'border-[var(--danger)] glow-accent' : 'border-[var(--border-weak)]'}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className="font-tactical">{enemy.name}</span>
                  <span className="font-hud text-[var(--text-secondary)]">×{enemy.count}</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-xs text-[var(--text-secondary)]">威胁</span>
                  {[1, 2, 3, 4, 5].map(t => (
                    <div
                      key={t}
                      className={`w-1.5 h-3 ${
                        t <= enemy.threat 
                          ? enemy.threat >= 4 ? 'bg-[var(--danger)]' : 'bg-[var(--warning)]'
                          : 'bg-[var(--border-weak)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TacticalPanel>

        {/* 编队区域 */}
        <TacticalPanel 
          title="SQUAD DEPLOYMENT" 
          headerRight={
            <div className="flex items-center gap-4">
              <HUDMeter
                value={totalPower}
                max={recommendedPower}
                label="战力"
                size="sm"
                color={totalPower >= recommendedPower ? 'var(--success)' : 'var(--warning)'}
              />
              <span className="font-hud text-sm">
                {squadSlots.filter(s => s.operator).length}/12
              </span>
            </div>
          }
          className="p-4"
        >
          <div className="grid grid-cols-6 gap-3">
            {squadSlots.map((slot) => (
              <Tooltip key={slot.id} content={slot.operator?.name || '空位'}>
                <motion.div
                  className={`
                    aspect-square border-2 flex flex-col items-center justify-center cursor-pointer
                    transition-colors relative
                    ${slot.operator 
                      ? 'border-[var(--accent)] bg-[var(--bg-base)] hover:bg-[var(--bg-elevated)]' 
                      : 'border-[var(--border-weak)] border-dashed hover:border-[var(--text-secondary)]'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {slot.operator ? (
                    <>
                      <div className="font-hud text-lg">{slot.id}</div>
                      <div className="text-xs text-[var(--text-secondary)] truncate w-full text-center px-1">
                        {slot.operator.name}
                      </div>
                      <div className="absolute top-1 right-1 text-[10px] text-[var(--accent)]">
                        E{slot.operator.elite}
                      </div>
                    </>
                  ) : (
                    <span className="text-[var(--text-disabled)] text-2xl">+</span>
                  )}
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </TacticalPanel>

        {/* 设置区域 */}
        <div className="grid grid-cols-2 gap-6">
          <TacticalPanel title="SUPPORT UNIT" className="p-4">
            <Select
              value={supportUnit}
              onChange={setSupportUnit}
              options={[
                { value: '', label: '不使用助战' },
                { value: 'friend1', label: 'THORNS [E2 LV90]' },
                { value: 'friend2', label: 'MUDROCK [E2 LV80]' },
                { value: 'friend3', label: 'CHALTER [E2 LV90]' },
              ]}
              placeholder="选择助战干员"
            />
          </TacticalPanel>

          <TacticalPanel title="AUTO SKILL" className="p-4">
            <Select
              value={autoSkill}
              onChange={setAutoSkill}
              options={[
                { value: 'manual', label: '手动释放技能' },
                { value: 'auto', label: '自动释放技能' },
              ]}
            />
          </TacticalPanel>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border-weak)]">
          <Button variant="ghost" onClick={() => window.history.back()}>
            ← 返回
          </Button>

          <div className="flex gap-4">
            <Button variant="secondary">
              演习模式
            </Button>
            <Button 
              variant="tactical" 
              size="lg"
              onClick={() => setShowConfirm(true)}
              className="min-w-[160px]"
            >
              开始行动
            </Button>
          </div>
        </div>

        {/* 确认弹窗 */}
        <Modal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          title="OPERATION CONFIRM"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="font-hud text-2xl text-[var(--accent)]">{stageData.code}</div>
              <div className="text-[var(--text-secondary)]">{stageData.name}</div>
            </div>

            <div className="flex justify-between py-4 border-y border-[var(--border-weak)]">
              <div>
                <div className="text-xs text-[var(--text-secondary)]">理智消耗</div>
                <div className="font-hud text-xl text-[var(--warning)]">-{stageData.sanity}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[var(--text-secondary)]">编入干员</div>
                <div className="font-hud text-xl">{squadSlots.filter(s => s.operator).length}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowConfirm(false)}>
                取消
              </Button>
              <Button variant="primary" className="flex-1">
                确认出击
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
