'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  TacticalPanel,
  Select,
  Checkbox,
  Radio,
  Switch,
  Modal,
  Tabs,
  Progress,
  Card,
  Spinner,
  StatusBar,
  HUDMeter,
  ScanSweep,
  GridBackground,
  Typewriter,
  TypewriterLines,
  NodeGraph,
  NavLinkLine,
  Ping,
  SoftGlitch,
} from '@/components';

export default function ComponentShowcase() {
  const [selectValue, setSelectValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('a');
  const [switchOn, setSwitchOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [progress, setProgress] = useState(67);
  const [showScan, setShowScan] = useState(true);

  const selectOptions = [
    { value: 'option-a', label: 'ALPHA-NODE' },
    { value: 'option-b', label: 'BRAVO-NODE' },
    { value: 'option-c', label: 'CHARLIE-NODE' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'controls', label: 'CONTROLS' },
    { id: 'system', label: 'SYSTEM' },
    { id: 'effects', label: 'EFFECTS' },
  ];

  // 模块依次出现的动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col">
      {/* 战术网格背景 */}
      <GridBackground />

      {/* 入场扫描效果 */}
      {showScan && <ScanSweep onComplete={() => setShowScan(false)} />}

      {/* 顶部状态栏 */}
      <StatusBar />

      {/* 主内容区 */}
      <div className="flex-1 overflow-auto p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-1 bg-[var(--accent)]" />
              <h1
                className="text-[28px] tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                COMPONENT LIBRARY
              </h1>
            </div>
            <p className="text-[12px] text-[var(--text-secondary)] tracking-wide ml-4">
              TACTICAL INTERFACE SYSTEM v2.0 // MODULE SHOWCASE
            </p>
          </motion.header>

          {/* Tabs 导航 */}
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
            {activeTab === 'dashboard' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* HUD 读数行 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="SYSTEM METRICS" level="L2" statusIndicator="ok">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
                      <HUDMeter
                        value={12847}
                        max={20000}
                        label="REQUESTS"
                        unit="/min"
                        variant="accent"
                      />
                      <HUDMeter value={94} max={100} label="UPTIME" unit="%" variant="default" />
                      <HUDMeter value={47} max={100} label="CPU LOAD" unit="%" variant="warn" />
                      <HUDMeter
                        value={2.3}
                        max={10}
                        label="LATENCY"
                        unit="ms"
                        variant="accent"
                        size="md"
                      />
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 两列布局 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 按钮 */}
                  <motion.div variants={itemVariants}>
                    <TacticalPanel title="ACTIONS" level="L1">
                      <div className="space-y-4">
                        <div className="flex gap-3 flex-wrap">
                          <Button variant="primary">EXECUTE</Button>
                          <Button variant="secondary">STANDBY</Button>
                          <Button variant="ghost">BYPASS</Button>
                          <Button variant="danger">ABORT</Button>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <Button variant="tactical">TACTICAL</Button>
                          <Button variant="inverted">INVERTED</Button>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <Button variant="primary" size="sm">
                            SM
                          </Button>
                          <Button variant="primary" size="md">
                            MD
                          </Button>
                          <Button variant="primary" size="lg">
                            LG
                          </Button>
                        </div>
                        <div className="flex gap-3">
                          <Button loading>LOADING</Button>
                          <Button disabled>LOCKED</Button>
                        </div>
                      </div>
                    </TacticalPanel>
                  </motion.div>

                  {/* 面板层级 */}
                  <motion.div variants={itemVariants}>
                    <TacticalPanel title="PANEL HIERARCHY" level="L1">
                      <div className="space-y-3">
                        <TacticalPanel level="L1">
                          <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                            L1 // STANDARD CONTAINER
                          </div>
                        </TacticalPanel>
                        <TacticalPanel level="L2" statusIndicator="ok">
                          <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                            L2 // KEY MODULE — OUTER HEAVY BORDER
                          </div>
                        </TacticalPanel>
                        <TacticalPanel level="L3" statusIndicator="busy">
                          <div className="text-[11px] font-[var(--font-mono)] text-[var(--accent)]">
                            L3 // FOCUS/ALERT — ACCENT BORDER
                          </div>
                        </TacticalPanel>
                      </div>
                    </TacticalPanel>
                  </motion.div>

                  {/* 进度与加载 */}
                  <motion.div variants={itemVariants}>
                    <TacticalPanel title="LOADING STATES" level="L1">
                      <div className="space-y-5">
                        <div>
                          <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-2 uppercase">
                            PROGRESS BAR
                          </div>
                          <Progress value={progress} showLabel variant="accent" />
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              onClick={() => setProgress(Math.max(0, progress - 10))}
                            >
                              -10%
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setProgress(Math.min(100, progress + 10))}
                            >
                              +10%
                            </Button>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-2 uppercase">
                            SPINNERS
                          </div>
                          <div className="flex items-center gap-6">
                            <Spinner size={16} className="text-[var(--accent)]" />
                            <Spinner size={24} className="text-[var(--accent)]" />
                            <Spinner size={32} className="text-[var(--accent)]" />
                          </div>
                        </div>
                      </div>
                    </TacticalPanel>
                  </motion.div>

                  {/* 卡片 */}
                  <motion.div variants={itemVariants}>
                    <TacticalPanel title="NODE REGISTRY" level="L1">
                      <div className="space-y-3">
                        <Card
                          title="NODE-ALPHA"
                          meta="LAST SYNC: 00:02:14"
                          tags={['ACTIVE', 'HTTP']}
                          onClick={() => {}}
                        >
                          <div className="text-[11px] font-[var(--font-mono)] text-[var(--success)]">
                            STATUS: OPERATIONAL
                          </div>
                        </Card>
                        <Card
                          title="NODE-BRAVO"
                          meta="LAST SYNC: 00:05:47"
                          tags={['STANDBY']}
                          selected
                        >
                          <div className="text-[11px] font-[var(--font-mono)] text-[var(--warning)]">
                            STATUS: DEGRADED
                          </div>
                        </Card>
                      </div>
                    </TacticalPanel>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'controls' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Select */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="TARGET SELECTOR" level="L2">
                    <Select
                      options={selectOptions}
                      value={selectValue}
                      onChange={setSelectValue}
                      placeholder="SELECT TARGET..."
                    />
                    <div className="mt-3 text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                      CURRENT: {selectValue ? selectValue.toUpperCase() : 'NULL'}
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 表单控件 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="SYSTEM TOGGLES" level="L1">
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-2 uppercase">
                          CHECKBOX
                        </div>
                        <Checkbox
                          checked={checked}
                          onChange={setChecked}
                          label="ENABLE TELEMETRY"
                        />
                      </div>

                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-2 uppercase">
                          RADIO GROUP
                        </div>
                        <div className="space-y-2">
                          <Radio
                            checked={radioValue === 'a'}
                            onChange={() => setRadioValue('a')}
                            label="MODE: PASSIVE"
                          />
                          <Radio
                            checked={radioValue === 'b'}
                            onChange={() => setRadioValue('b')}
                            label="MODE: ACTIVE"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-2 uppercase">
                          SWITCH
                        </div>
                        <Switch checked={switchOn} onChange={setSwitchOn} label="AUTO-SYNC" />
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Modal Demo */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="DIALOG SYSTEM" level="L1">
                    <div className="flex items-center gap-4">
                      <Button variant="primary" onClick={() => setModalOpen(true)}>
                        OPEN DIALOG
                      </Button>
                      <span className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        MODAL OVERLAY WITH ESC/CLICK-OUTSIDE DISMISS
                      </span>
                    </div>

                    <Modal
                      isOpen={modalOpen}
                      onClose={() => setModalOpen(false)}
                      title="CONFIRM OPERATION"
                      footer={
                        <>
                          <Button variant="ghost" onClick={() => setModalOpen(false)}>
                            CANCEL
                          </Button>
                          <Button variant="primary" onClick={() => setModalOpen(false)}>
                            EXECUTE
                          </Button>
                        </>
                      }
                    >
                      <p className="text-[13px] text-[var(--text-primary)] font-[var(--font-mono)]">
                        AWAITING CONFIRMATION FOR OPERATION EXECUTION.
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-3 font-[var(--font-mono)]">
                        ALL BACKGROUND ANIMATIONS SUSPENDED.
                      </p>
                    </Modal>
                  </TacticalPanel>
                </motion.div>

                {/* 系统信息 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="INTERFACE SPECIFICATION" level="L2" statusIndicator="ok">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] font-[var(--font-mono)]">
                      <div>
                        <div className="text-[var(--text-secondary)] mb-1">VERSION</div>
                        <div className="text-[var(--text-primary)]">2.0.0</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-secondary)] mb-1">ACCENT</div>
                        <div className="text-[var(--accent)]">#FF6A00</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-secondary)] mb-1">GRID</div>
                        <div className="text-[var(--text-primary)]">8PT BASE</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-secondary)] mb-1">MOTION</div>
                        <div className="text-[var(--text-primary)]">220MS BASE</div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TacticalPanel title="GRAPH & NAV LINK" level="L1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <NodeGraph
                        nodes={[
                          { id: 'a', label: 'CORE', x: 0.2, y: 0.5, weight: 6 },
                          { id: 'b', label: 'NODE-1', x: 0.5, y: 0.2, weight: 4 },
                          { id: 'c', label: 'NODE-2', x: 0.75, y: 0.6, weight: 4 },
                          { id: 'd', label: 'NODE-3', x: 0.45, y: 0.8, weight: 3 },
                        ]}
                        edges={[
                          { from: 'a', to: 'b' },
                          { from: 'a', to: 'c' },
                          { from: 'a', to: 'd' },
                          { from: 'b', to: 'c' },
                        ]}
                      />
                      <div className="flex flex-col justify-center gap-4">
                        <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
                          Parent
                        </div>
                        <NavLinkLine />
                        <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
                          Child Panel
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              </motion.div>
            )}

            {/* Effects Tab - 新增效果展示 */}
            {activeTab === 'effects' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* 打字机效果 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="TYPEWRITER EFFECT" level="L1">
                    <div className="space-y-4">
                      <div className="text-[14px]">
                        <Typewriter
                          text="SYSTEM INITIALIZATION COMPLETE. ALL MODULES ONLINE."
                          speed={40}
                        />
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)]">
                        <TypewriterLines
                          lines={[
                            '> Loading tactical interface...',
                            '> Establishing secure connection...',
                            '> Calibrating sensor arrays...',
                            '> System ready.',
                          ]}
                          speed={30}
                          lineDelay={300}
                        />
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 切角效果 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="CLIPPED SHAPES" level="L1">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="clip-corner-tr bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-4 h-24 flex items-center justify-center">
                        <span className="text-[10px] text-[var(--text-secondary)]">CORNER TR</span>
                      </div>
                      <div className="clip-corner-both bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-4 h-24 flex items-center justify-center">
                        <span className="text-[10px] text-[var(--text-secondary)]">
                          CORNER BOTH
                        </span>
                      </div>
                      <div className="clip-diamond bg-[var(--accent-alt)] p-4 h-24 flex items-center justify-center">
                        <span className="text-[10px] text-black font-bold">DIAMOND</span>
                      </div>
                      <div className="clip-chevron bg-[var(--accent)] p-4 h-16 flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">CHEVRON</span>
                      </div>
                      <div className="clip-hexagon bg-[var(--warning)] p-4 h-24 flex items-center justify-center">
                        <span className="text-[10px] text-black font-bold">HEX</span>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 边框扫描与发光 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="BORDER EFFECTS" level="L1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-scan bg-[var(--bg-elevated)] border border-[var(--accent-alt)] p-6 h-32 flex items-center justify-center">
                        <span className="text-[12px] text-[var(--accent-alt)]">BORDER SCAN</span>
                      </div>
                      <div className="border-glow-pulse bg-[var(--bg-elevated)] border border-[var(--accent-alt)] p-6 h-32 flex items-center justify-center">
                        <span className="text-[12px] text-[var(--accent-alt)]">GLOW PULSE</span>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* Glitch & Ping */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="GLITCH & PING" level="L1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[var(--bg-base)] p-6 flex items-center justify-center">
                        <SoftGlitch
                          text="SOFT GLITCH"
                          className="text-[22px] font-bold tracking-wider"
                        />
                      </div>
                      <div className="bg-[var(--bg-elevated)] p-6 h-24 flex items-center justify-center">
                        <Ping size={72} />
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 字体展示 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="TYPOGRAPHY" level="L2" statusIndicator="ok">
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-1">
                          FONT-HUD (Orbitron)
                        </div>
                        <div className="font-hud text-[32px] text-[var(--accent)]">
                          12,847 / 20,000
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-1">
                          FONT-TACTICAL (Rajdhani)
                        </div>
                        <div className="font-tactical text-[24px] text-[var(--accent-alt)]">
                          TACTICAL OPERATIONS READY
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              </motion.div>
            )}
          </Tabs>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-[var(--border-weak)] flex items-center justify-between text-[10px] font-[var(--font-mono)] text-[var(--text-secondary)]">
            <span>PERSONAL INTERFACE SYSTEM v2.0</span>
            <span>TACTICAL UI COMPONENT LIBRARY</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
