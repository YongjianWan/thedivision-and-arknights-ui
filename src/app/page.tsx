'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Cpu, Zap, Wifi } from 'lucide-react';

// 通用战术面板组件
const TacticalPanel = ({ 
  title, 
  children, 
  level = 'L1', 
  className = '' 
}: { 
  title?: string, 
  children: React.ReactNode, 
  level?: 'L1' | 'L2' | 'L3',
  className?: string
}) => {
  const isL1 = level === 'L1';
  const isL2 = level === 'L2';
  const isL3 = level === 'L3';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${className}`}
    >
      {/* 标题栏 */}
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-accent" />
          <span className="font-display text-meta tracking-widest uppercase text-foreground-secondary italic">
            {title}
          </span>
          <div className="flex-1 h-[1px] bg-border-weak" />
        </div>
      )}

      {/* 边框逻辑 */}
      <div className={`
        ${isL1 ? 'border-thin border-border-weak' : ''}
        ${isL2 ? 'border-thick border-border-strong p-[2px]' : ''}
        ${isL3 ? 'border-thick border-accent p-[2px]' : ''}
        bg-background-elevated/50 backdrop-blur-sm
      `}>
        <div className={`
          ${(isL2 || isL3) ? 'border-thin border-border-weak' : ''}
          p-4
        `}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default function TerminalPage() {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
      {/* 顶栏：系统状态 (1.1 界面是"系统") */}
      <header className="flex justify-between items-end border-b-thin border-border-weak pb-2">
        <div className="flex flex-col">
          <h1 className="font-display text-h2 tracking-[0.2em] uppercase italic">
            Tactical <span className="text-accent">Interface</span>
          </h1>
          <div className="flex gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-micro uppercase tracking-tighter text-success-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              System Online
            </div>
            <div className="text-micro uppercase tracking-tighter text-foreground-disabled">
              Session ID: <span className="text-foreground-secondary">X-998-ALPHA</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-end">
            <span className="text-micro text-foreground-disabled uppercase font-mono">CPU Load</span>
            <span className="text-h3 font-mono text-accent">24.5%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-micro text-foreground-disabled uppercase font-mono">Sync Status</span>
            <Wifi size={16} className="text-accent" />
          </div>
        </div>
      </header>

      {/* 主布局 */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* 左侧：监控列表 */}
        <aside className="col-span-3 flex flex-col gap-4">
          <TacticalPanel title="Sector Monitoring" className="flex-1 overflow-auto">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center border-b-thin border-border-weak/30 pb-2">
                  <div className="flex flex-col">
                    <span className="text-meta font-mono">NODE-{1024 + i}</span>
                    <span className="text-micro text-foreground-disabled">ACTIVE PKT LOSS: 0.0{i}%</span>
                  </div>
                  <Activity size={14} className={i === 3 ? "text-danger" : "text-success-muted"} />
                </div>
              ))}
            </div>
          </TacticalPanel>
          
          <TacticalPanel title="Security Profile" level="L1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border-thin border-accent flex items-center justify-center">
                <Shield className="text-accent" />
              </div>
              <div>
                <div className="text-meta">PROTECTION LEVEL</div>
                <div className="text-h2 font-display text-accent">ULTRA</div>
              </div>
            </div>
          </TacticalPanel>
        </aside>

        {/* 中间：核心区域 (L2 级容器) */}
        <main className="col-span-6 flex flex-col gap-4">
          <TacticalPanel title="Central Tactical View" level="L2" className="flex-1 bg-background">
            <div className="h-full w-full border-thin border-border-weak/50 relative flex items-center justify-center overflow-hidden">
              {/* 这里可以放地图或大型图形 */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.05)_0%,transparent_70%)]" />
              <div className="flex flex-col items-center">
                <Zap size={64} className="text-accent animate-pulse mb-4" />
                <div className="text-display font-display tracking-[0.3em] font-bold text-foreground">AERIAL SCAN</div>
                <div className="text-meta tracking-[1em] text-foreground-secondary ml-[1em]">READY FOR COMMAND</div>
              </div>
              
              {/* 装饰性坐标轴 */}
              <div className="absolute top-4 left-4 text-micro font-mono text-foreground-disabled">LAT: 31.2304<br/>LON: 121.4737</div>
              <div className="absolute bottom-4 right-4 text-micro font-mono text-foreground-disabled">TIME: 2026-01-15<br/>14:02:33</div>
            </div>
          </TacticalPanel>
          
          <div className="grid grid-cols-2 gap-4">
            <TacticalPanel title="Quick Actions">
              <button className="w-full h-10 border-thick border-border-strong hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2 text-meta uppercase tracking-widest">
                <Cpu size={14} /> Re-Sync Grid
              </button>
            </TacticalPanel>
            <TacticalPanel title="Network Log">
              <div className="font-mono text-micro text-success-muted overflow-hidden h-10">
                &gt; CONNECTION SECURED...<br/>
                &gt; HANDSHAKE COMPLETE.
              </div>
            </TacticalPanel>
          </div>
        </main>

        {/* 右侧：属性/详情 */}
        <aside className="col-span-3 flex flex-col gap-4">
          <TacticalPanel title="Detail Analysis" level="L3" className="flex-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-meta text-foreground-secondary uppercase">Signature Recognition</div>
                <div className="h-40 bg-foreground/5 relative flex items-end">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent/40 border-t-thin border-accent" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-thin border-accent pl-2">
                  <div className="text-micro text-foreground-disabled uppercase">Probability</div>
                  <div className="text-h3 font-mono">98.4%</div>
                </div>
                <div className="border-l-thin border-border-strong pl-2">
                  <div className="text-micro text-foreground-disabled uppercase">Threat</div>
                  <div className="text-h3 font-mono text-danger">LOW</div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="text-micro text-foreground-disabled uppercase italic underline decoration-accent/50 underline-offset-4">Extended Parameters</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-micro font-mono">
                    <span>THERMAL SIG</span>
                    <span className="text-foreground-secondary">STABLE</span>
                  </div>
                  <div className="flex justify-between text-micro font-mono">
                    <span>VELOCITY</span>
                    <span className="text-foreground-secondary">0.02 m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </TacticalPanel>
        </aside>
      </div>
      
      {/* 底栏：快捷提示或警告 */}
      <footer className="h-6 flex items-center justify-between px-2 bg-accent/10 border-t-thin border-accent/30 text-micro">
        <div className="flex gap-4">
          <span className="text-accent font-bold uppercase tracking-widest">Operator: GITHUB_COPILOT</span>
          <span className="text-foreground-secondary italic">"Always maintain the system."</span>
        </div>
        <div className="font-mono text-foreground-disabled">V2.0.0-PROD</div>
      </footer>
    </div>
  );
}
