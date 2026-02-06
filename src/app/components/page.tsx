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
  // 补丁包1.1组件
  TechDecor,
  TechDecorBlock,
  // 补丁包2组件
  HoldButton,
  Schematic,
  ServerTopology,
  DataFlow,
  // 补丁包3组件
  StatusIndicator,
  StatusBadge,
  TargetLockIcon,
  SignalIcon,
  RadarIcon,
  CrosshairIcon,
  SecureIcon,
  AlertIcon,
  BatteryIcon,
  ServerIcon,
  NodeIcon,
  SyncIcon,
  HexIcon,
  DiamondIcon,
} from '@/components';
import { CLINICAL_STATUS, CLINICAL_ACTIONS, getLoadingText, getErrorText } from '@/lib/clinical-copy';

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
    { id: 'patch1', label: 'PATCH1.1' },
    { id: 'patch2', label: 'PATCH2' },
    { id: 'patch3', label: 'PATCH3' },
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

            {/* Patch1.1 Tab - 美学补丁包组件展示 */}
            {activeTab === 'patch1' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Ghost Layer 演示 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="GHOST LAYER // P1 三层投影" level="L2" statusIndicator="ok">
                    <div className="space-y-6">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        Ghost Layer 系统：主体 + Shadow (::before) + Ghost (::after)
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="ghost-text text-[48px] font-hud text-[var(--accent)]">
                          12,847
                        </div>
                        <div className="ghost-title text-[24px] font-bold tracking-wider text-[var(--text-primary)]">
                          TACTICAL DISPLAY
                        </div>
                      </div>
                      <div className="text-[10px] text-[var(--text-secondary)]">
                        HUDMeter 和 L2/L3 面板标题自动应用 Ghost Layer
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 锚点系统 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="ANCHOR SYSTEM // P3 四角锚点" level="L1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">L2 锚点 (3×3px border.strong)</div>
                        <TacticalPanel level="L2">
                          <div className="h-24 flex items-center justify-center text-[var(--text-secondary)] text-[11px]">
                            四角有 3×3px 锚点
                          </div>
                        </TacticalPanel>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">L3 锚点 (4×4px accent + 动画)</div>
                        <TacticalPanel level="L3">
                          <div className="h-24 flex items-center justify-center text-[var(--accent)] text-[11px]">
                            四角有 4×4px accent 锚点
                          </div>
                        </TacticalPanel>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* TechDecor 装饰性技术文本 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="TECH DECOR // P2 装饰性技术文本" level="L1">
                    <div className="space-y-6">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        四种词库变体：status / hex / coord / dynamic
                      </div>
                      <div className="relative bg-[var(--bg-elevated)] border border-[var(--border-weak)] p-8 h-48">
                        <TechDecor position="top-left" variant="status" />
                        <TechDecor position="top-right" variant="hex" />
                        <TechDecor position="bottom-left" variant="coord" />
                        <TechDecor position="bottom-right" variant="dynamic" />
                        <div className="h-full flex items-center justify-center text-[var(--text-secondary)] text-[12px]">
                          面板四角的装饰性技术文本
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">TechDecorBlock 多行装饰</div>
                        <TechDecorBlock lines={4} align="left" className="text-left" />
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 量化 Progress */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="QUANTIZED PROGRESS // P9 量化缓动" level="L1">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-2 uppercase">Quantized (steps(8))</div>
                          <Progress value={progress} easing="quantized" />
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-2 uppercase">Smooth (default)</div>
                          <Progress value={progress} easing="smooth" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="secondary" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                        <Button variant="secondary" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                        <span className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                          VALUE: {progress}%
                        </span>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>
              </motion.div>
            )}

            {/* Patch2 Tab - 补丁包2组件展示 */}
            {activeTab === 'patch2' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* HoldButton 长按确认 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="HOLD BUTTON // 危险操作确认" level="L3" statusIndicator="warn">
                    <div className="space-y-4">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        长按 1.5 秒确认执行危险操作。进度条采用 10 格量化分段。
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <HoldButton onConfirm={() => alert('OPERATION CONFIRMED')}>
                          HOLD TO CONFIRM
                        </HoldButton>
                        <HoldButton 
                          onConfirm={() => alert('DELETED')} 
                          holdDuration={2000}
                        >
                          HOLD 2S TO DELETE
                        </HoldButton>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* Clinical Copy 临床文风 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="CLINICAL COPY // 临床文风词库" level="L2" statusIndicator="ok">
                    <div className="space-y-6">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        机器般的非人格化语言，用于状态消息、按钮文本、占位符等。
                      </div>
                      
                      {/* 状态词库 */}
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">CLINICAL_STATUS (状态消息)</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[11px] font-[var(--font-mono)]">
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">loading:</span> <span className="text-[var(--text-primary)]">{CLINICAL_STATUS.loading}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">success:</span> <span className="text-[var(--success)]">{CLINICAL_STATUS.success}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">error:</span> <span className="text-[var(--danger)]">{CLINICAL_STATUS.error}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">loadingSync:</span> <span className="text-[var(--accent)]">{CLINICAL_STATUS.loadingSync}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">errorNetwork:</span> <span className="text-[var(--text-disabled)]">{CLINICAL_STATUS.errorNetwork}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">errorTimeout:</span> <span className="text-[var(--warning)]">{CLINICAL_STATUS.errorTimeout}</span>
                          </div>
                        </div>
                      </div>

                      {/* 动作词库 */}
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">CLINICAL_ACTIONS (按钮文本)</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(CLINICAL_ACTIONS).slice(0, 8).map(([key, value]) => (
                            <Button key={key} variant="secondary" size="sm">
                              {value}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* 辅助函数 */}
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">辅助函数</div>
                        <div className="space-y-2 text-[11px] font-[var(--font-mono)]">
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">getLoadingText():</span> <span className="text-[var(--accent)]">{getLoadingText()}</span>
                          </div>
                          <div className="bg-[var(--bg-elevated)] p-2 border border-[var(--border-weak)]">
                            <span className="text-[var(--text-secondary)]">getErrorText():</span> <span className="text-[var(--danger)]">{getErrorText()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* Schematic 行为信息图 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="SCHEMATIC // 行为信息图" level="L1">
                    <div className="space-y-6">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        SVG 节点拓扑图，支持流动光点动画。
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">ServerTopology 预设</div>
                          <div className="bg-[var(--bg-elevated)] border border-[var(--border-weak)] p-4">
                            <ServerTopology className="w-full h-48" />
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-3 uppercase">DataFlow 预设</div>
                          <div className="bg-[var(--bg-elevated)] border border-[var(--border-weak)] p-4">
                            <DataFlow className="w-full h-48" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 自定义 Schematic */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="CUSTOM SCHEMATIC // 自定义拓扑" level="L1">
                    <div className="bg-[var(--bg-elevated)] border border-[var(--border-weak)] p-4">
                      <Schematic
                        className="w-full h-64"
                        nodes={[
                          { id: 'gateway', x: 50, y: 130, label: 'GATEWAY', type: 'source' },
                          { id: 'firewall', x: 180, y: 80, label: 'FIREWALL', type: 'active' },
                          { id: 'loadbalancer', x: 180, y: 180, label: 'LB', type: 'default' },
                          { id: 'server1', x: 320, y: 60, label: 'SRV-01', type: 'default' },
                          { id: 'server2', x: 320, y: 130, label: 'SRV-02', type: 'default' },
                          { id: 'server3', x: 320, y: 200, label: 'SRV-03', type: 'error' },
                          { id: 'database', x: 450, y: 130, label: 'DATABASE', type: 'target' },
                        ]}
                        edges={[
                          { from: 'gateway', to: 'firewall' },
                          { from: 'gateway', to: 'loadbalancer' },
                          { from: 'firewall', to: 'server1' },
                          { from: 'firewall', to: 'server2' },
                          { from: 'loadbalancer', to: 'server2' },
                          { from: 'loadbalancer', to: 'server3' },
                          { from: 'server1', to: 'database' },
                          { from: 'server2', to: 'database' },
                        ]}
                      />
                    </div>
                  </TacticalPanel>
                </motion.div>
              </motion.div>
            )}

            {/* Patch3 Tab - 补丁包3组件展示 */}
            {activeTab === 'patch3' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* StatusIndicator 状态指示器 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="STATUS INDICATOR // P4 双重编码" level="L2" statusIndicator="ok">
                    <div className="space-y-6">
                      {/* 基础状态 */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          基础状态 (颜色+图标)
                        </div>
                        <div className="flex items-center gap-6 flex-wrap">
                          <StatusIndicator status="ok" showLabel />
                          <StatusIndicator status="warn" showLabel />
                          <StatusIndicator status="err" showLabel />
                          <StatusIndicator status="busy" showLabel />
                          <StatusIndicator status="offline" showLabel />
                        </div>
                      </div>

                      {/* 尺寸变体 */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          尺寸变体
                        </div>
                        <div className="flex items-center gap-6">
                          <StatusIndicator status="ok" size="sm" showLabel />
                          <StatusIndicator status="ok" size="md" showLabel />
                          <StatusIndicator status="ok" size="lg" showLabel />
                        </div>
                      </div>

                      {/* StatusBadge */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          STATUS BADGE (表格/列表用)
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <StatusBadge status="ok" />
                          <StatusBadge status="warn" />
                          <StatusBadge status="err" />
                          <StatusBadge status="busy" />
                          <StatusBadge status="offline" />
                        </div>
                      </div>

                      {/* dotOnly 向后兼容 */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          DOT ONLY 模式 (向后兼容)
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusIndicator status="ok" dotOnly />
                          <StatusIndicator status="warn" dotOnly />
                          <StatusIndicator status="err" dotOnly />
                          <StatusIndicator status="busy" dotOnly />
                          <StatusIndicator status="offline" dotOnly />
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* TacticalIcons 战术图标 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="TACTICAL ICONS // P5 Filled风格" level="L1">
                    <div className="space-y-6">
                      {/* 图标网格 */}
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                        {[
                          { Icon: TargetLockIcon, name: 'TARGET' },
                          { Icon: CrosshairIcon, name: 'CROSSHAIR' },
                          { Icon: RadarIcon, name: 'RADAR' },
                          { Icon: SecureIcon, name: 'SECURE' },
                          { Icon: AlertIcon, name: 'ALERT' },
                          { Icon: ServerIcon, name: 'SERVER' },
                          { Icon: NodeIcon, name: 'NODE' },
                          { Icon: SyncIcon, name: 'SYNC' },
                          { Icon: HexIcon, name: 'HEX' },
                          { Icon: DiamondIcon, name: 'DIAMOND' },
                        ].map(({ Icon, name }) => (
                          <div key={name} className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-[var(--bg-elevated)] border border-[var(--border-weak)] flex items-center justify-center">
                              <Icon size={24} className="text-[var(--text-primary)]" />
                            </div>
                            <span className="text-[9px] text-[var(--text-secondary)] uppercase">{name}</span>
                          </div>
                        ))}
                      </div>

                      {/* 动态图标 */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          动态图标 (Signal / Battery)
                        </div>
                        <div className="flex items-center gap-6 flex-wrap">
                          <div className="flex items-center gap-2">
                            <SignalIcon level={0} size={24} className="text-[var(--danger)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">0/3</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SignalIcon level={1} size={24} className="text-[var(--warning)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">1/3</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SignalIcon level={2} size={24} className="text-[var(--text-primary)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">2/3</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SignalIcon level={3} size={24} className="text-[var(--success)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">3/3</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 mt-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <BatteryIcon level={10} size={24} className="text-[var(--danger)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">10%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BatteryIcon level={50} size={24} className="text-[var(--warning)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">50%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BatteryIcon level={100} size={24} className="text-[var(--success)]" />
                            <span className="text-[10px] text-[var(--text-secondary)]">100%</span>
                          </div>
                        </div>
                      </div>

                      {/* 强调色图标 */}
                      <div>
                        <div className="text-[10px] font-[var(--font-display)] tracking-[0.15em] text-[var(--text-secondary)] mb-3 uppercase">
                          ACCENT 强调色
                        </div>
                        <div className="flex items-center gap-4">
                          <TargetLockIcon size={32} className="text-[var(--accent)]" />
                          <div className="animate-spin" style={{ animationDuration: '3s' }}>
                            <RadarIcon size={32} className="text-[var(--accent)]" />
                          </div>
                          <SyncIcon size={32} className="text-[var(--accent-alt)]" />
                        </div>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* HoldButton 长按确认 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="HOLD BUTTON // P2 危险操作" level="L3" statusIndicator="warn">
                    <div className="space-y-4">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)] mb-4">
                        长按 1.5 秒确认执行危险操作。进度条采用 10 格量化分段。
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <HoldButton onConfirm={() => alert('OPERATION CONFIRMED')}>
                          HOLD TO CONFIRM
                        </HoldButton>
                        <HoldButton 
                          onConfirm={() => alert('DELETED')} 
                          holdDuration={2000}
                          className="min-w-[160px]"
                        >
                          HOLD TO DELETE
                        </HoldButton>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* 量化缓动 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="QUANTIZED EASING // P6 量化动效" level="L1">
                    <div className="space-y-4">
                      <div className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                        使用 steps() 缓动模拟数字信号的阶梯感。
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-2 uppercase">Quantized Progress</div>
                          <Progress value={progress} easing="quantized" />
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--text-secondary)] mb-2 uppercase">Smooth Progress</div>
                          <Progress value={progress} easing="smooth" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="secondary" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                        <Button variant="secondary" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                        <span className="text-[11px] font-[var(--font-mono)] text-[var(--text-secondary)]">
                          CURRENT: {progress}%
                        </span>
                      </div>
                    </div>
                  </TacticalPanel>
                </motion.div>

                {/* CSS 动画类 */}
                <motion.div variants={itemVariants}>
                  <TacticalPanel title="CSS ANIMATIONS" level="L1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[var(--bg-elevated)] p-4 h-24 flex flex-col items-center justify-center gap-2">
                        <div className="skeleton-pulse-quantized w-full h-4 bg-[var(--border-weak)] rounded" />
                        <span className="text-[9px] text-[var(--text-secondary)] uppercase">SKELETON PULSE</span>
                      </div>
                      <div className="bg-[var(--bg-elevated)] p-4 h-24 flex flex-col items-center justify-center gap-2">
                        <div className="hud-value-update text-[24px] font-hud text-[var(--accent)]">1,234</div>
                        <span className="text-[9px] text-[var(--text-secondary)] uppercase">HUD VALUE FLASH</span>
                      </div>
                      <div className="bg-[var(--bg-elevated)] p-4 h-24 flex flex-col items-center justify-center gap-2 fade-quantized hover:opacity-50">
                        <div className="text-[14px] text-[var(--text-primary)]">HOVER ME</div>
                        <span className="text-[9px] text-[var(--text-secondary)] uppercase">FADE QUANTIZED</span>
                      </div>
                      <div className="bg-[var(--bg-elevated)] p-4 h-24 flex flex-col items-center justify-center gap-2">
                        <div className="number-tick text-[24px] font-mono text-[var(--accent-alt)]">42</div>
                        <span className="text-[9px] text-[var(--text-secondary)] uppercase">NUMBER TICK</span>
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
