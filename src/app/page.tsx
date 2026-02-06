'use client';

import React from 'react';
import { Activity, Shield, Radio, Crosshair, MapPin, Wifi, WifiOff } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { TacticalPanel } from '../components/TacticalPanel';
import { HUDMeter } from '../components/HUDMeter';
import { Button } from '../components/Button';
import { Progress } from '../components/Progress';
import { ListRow } from '../components/ListRow';
import { Tag, Badge } from '../components/Tag';
import { Divider } from '../components/Divider';

/* ─── Mock Data ─── */
const SECTORS = [
  { id: 'N-1024', name: 'Hudson Yards', status: 'ok' as const, pktLoss: '0.01%' },
  { id: 'N-1025', name: 'Chelsea', status: 'ok' as const, pktLoss: '0.03%' },
  { id: 'N-1026', name: 'Midtown West', status: 'err' as const, pktLoss: '12.8%' },
  { id: 'N-1027', name: 'Times Square', status: 'warn' as const, pktLoss: '3.2%' },
  { id: 'N-1028', name: 'Gramercy', status: 'ok' as const, pktLoss: '0.04%' },
];

const AGENTS = [
  { callsign: 'FAYE', role: 'Support', hp: 84, status: 'ok' as const },
  { callsign: 'RHODES', role: 'Point', hp: 100, status: 'ok' as const },
  { callsign: 'KEENER', role: 'Recon', hp: 0, status: 'err' as const },
];

/* ─── Page ─── */
export default function TerminalPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* System Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 min-h-0 overflow-hidden">

        {/* ── Left Column: Intelligence Feed ── */}
        <aside className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <TacticalPanel title="Sector Monitoring" statusIndicator="ok">
            <div className="space-y-0">
              {SECTORS.map((s) => (
                <ListRow
                  key={s.id}
                  title={s.name}
                  meta={`NODE ${s.id} · PKT LOSS ${s.pktLoss}`}
                  icon={<Radio size={14} />}
                  status={s.status}
                />
              ))}
            </div>
          </TacticalPanel>

          <TacticalPanel title="Agent Roster" level="L1">
            <div className="space-y-3">
              {AGENTS.map((a) => (
                <div key={a.callsign} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={14} className={a.status === 'err'
                      ? 'text-[var(--danger)]'
                      : 'text-[var(--accent)]'
                    } />
                    <div>
                      <div className="text-[13px] font-mono tracking-wider">{a.callsign}</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">{a.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={a.hp} size="sm" variant={a.hp === 0 ? 'danger' : 'accent'} className="w-16" />
                    <span className="text-[11px] font-mono text-[var(--text-secondary)] w-8 text-right">{a.hp}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TacticalPanel>

          <TacticalPanel title="Security Clearance" level="L1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center">
                <Shield className="text-[var(--accent)]" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">Protection Level</div>
                <div className="text-[20px] font-display text-[var(--accent)] tracking-widest">CLASSIFIED</div>
              </div>
              <Badge variant="accent">SHD</Badge>
            </div>
          </TacticalPanel>
        </aside>

        {/* ── Center: Tactical Overview (L2 emphasis) ── */}
        <main className="col-span-6 flex flex-col gap-4 min-h-0">
          <TacticalPanel title="Central Tactical View" level="L2" className="flex-1">
            <div className="h-full w-full border border-[var(--border-weak)]/30 relative flex items-center justify-center">
              {/* Radial glow — Division-style warm center */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.04)_0%,transparent_65%)]" />
              
              {/* Crosshair center */}
              <div className="flex flex-col items-center gap-3">
                <Crosshair size={48} className="text-[var(--accent)] opacity-60" strokeWidth={1} />
                <div className="text-[28px] font-display tracking-[0.25em] uppercase text-[var(--text-primary)]">
                  Aerial Scan
                </div>
                <div className="text-[12px] tracking-[0.6em] text-[var(--text-secondary)] uppercase ml-[0.6em]">
                  Awaiting Directive
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="primary" size="sm">Deploy Drone</Button>
                  <Button variant="secondary" size="sm">Mark Target</Button>
                </div>
              </div>

              {/* Coordinate overlay — Division style */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[var(--text-disabled)] leading-relaxed">
                LAT 40.7580<br />LON -73.9855
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[var(--text-disabled)] text-right leading-relaxed">
                GRID REF MN-04<br />ELEV 12m ASL
              </div>
              
              {/* Corner anchors (points & lines aesthetic) */}
              <span className="absolute top-2 left-2 w-4 h-px bg-[var(--accent)] opacity-30" />
              <span className="absolute top-2 left-2 w-px h-4 bg-[var(--accent)] opacity-30" />
              <span className="absolute bottom-2 right-2 w-4 h-px bg-[var(--accent)] opacity-30" />
              <span className="absolute bottom-2 right-2 w-px h-4 bg-[var(--accent)] opacity-30" />
            </div>
          </TacticalPanel>

          {/* Bottom row — HUD Meters (Division-style big numbers) */}
          <div className="grid grid-cols-4 gap-4">
            <TacticalPanel>
              <HUDMeter value={24} max={100} label="CPU Load" unit="%" variant="accent" size="sm" />
            </TacticalPanel>
            <TacticalPanel>
              <HUDMeter value={1847} max={4096} label="Bandwidth" unit="Mb/s" variant="default" size="sm" />
            </TacticalPanel>
            <TacticalPanel>
              <HUDMeter value={99} max={100} label="Uplink" unit="%" variant="accent" size="sm" />
            </TacticalPanel>
            <TacticalPanel>
              <HUDMeter value={3} max={50} label="Threats" variant="danger" size="sm" />
            </TacticalPanel>
          </div>
        </main>

        {/* ── Right Column: Detail Analysis (L3 focus) ── */}
        <aside className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <TacticalPanel title="Signal Analysis" level="L3" statusIndicator="busy">
            <div className="space-y-4">
              {/* Signature bars — Division behavioral infographic style */}
              <div className="flex items-end gap-px h-28">
                {[40, 70, 45, 90, 65, 80, 50, 35, 72, 88, 60, 42].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[var(--accent)] transition-all duration-300"
                    style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-[var(--accent)] pl-3">
                  <div className="text-[10px] text-[var(--text-disabled)] uppercase tracking-wider">Match</div>
                  <div className="text-[18px] font-mono text-[var(--accent)]">98.4%</div>
                </div>
                <div className="border-l-2 border-[var(--border-strong)] pl-3">
                  <div className="text-[10px] text-[var(--text-disabled)] uppercase tracking-wider">Threat</div>
                  <div className="text-[18px] font-mono text-[var(--success)]">LOW</div>
                </div>
              </div>
            </div>
          </TacticalPanel>

          <TacticalPanel title="Network Status" level="L1">
            <div className="space-y-2">
              {[
                { label: 'SHD Network', value: 'Connected', ok: true },
                { label: 'Dark Zone', value: 'Restricted', ok: false },
                { label: 'ISAC Uplink', value: 'Active', ok: true },
                { label: 'Rogue Protocol', value: 'Monitoring', ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-[12px] font-mono py-1">
                  <span className="text-[var(--text-secondary)]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={item.ok ? 'text-[var(--success)]' : 'text-[var(--warning)]'}>
                      {item.value}
                    </span>
                    {item.ok ? <Wifi size={10} className="text-[var(--success)]" /> : <WifiOff size={10} className="text-[var(--warning)]" />}
                  </div>
                </div>
              ))}
            </div>
          </TacticalPanel>

          <TacticalPanel title="Quick Actions">
            <div className="space-y-2">
              <Button variant="secondary" size="sm" className="w-full justify-start gap-3">
                <Activity size={14} /> Re-Sync Grid
              </Button>
              <Button variant="tactical" size="sm" className="w-full justify-start gap-3">
                <MapPin size={14} /> Mark Safe House
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-3">
                <Radio size={14} /> Broadcast Ping
              </Button>
            </div>
          </TacticalPanel>
        </aside>
      </div>

      {/* Footer — minimal operational strip */}
      <footer className="flex items-center justify-between px-4 py-1.5 border-t border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[11px]">
        <div className="flex items-center gap-4">
          <span className="text-[var(--accent)] font-display uppercase tracking-[0.2em]">
            SHD Operative
          </span>
          <Tag variant="muted">Manhattan</Tag>
        </div>
        <span className="font-mono text-[var(--text-disabled)]">v2.1.0-DIVISION</span>
      </footer>
    </div>
  );
}
