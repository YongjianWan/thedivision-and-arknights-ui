'use client';

/**
 * Dashboard 页面 - 服务器监控面板
 *
 * 目的：验证哪些组件真正被使用，哪些是多余的
 *
 * 使用记录：
 * ✓ 使用的组件：
 * ✓ 未使用的组件：
 * ✓ 缺少的功能：
 */

import React, { useState } from 'react';
import {
  Button,
  TacticalPanel,
  Select,
  Modal,
  Tabs,
  Progress,
  Card,
  StatusBar,
  HUDMeter,
  Table,
  Tooltip,
  Drawer,
  Breadcrumb,
  GridBackground,
  ScanSweep,
} from '@/components';
import type { TableColumn, TableRow, BreadcrumbItem } from '@/components';
import { Server, AlertTriangle, CheckCircle } from 'lucide-react';

// 模拟数据
interface NodeData extends TableRow {
  id: string;
  name: string;
  type: string;
  status: string;
  cpu: number;
  memory: number;
  _status?: 'ok' | 'warn' | 'err';
}

const mockNodes: NodeData[] = [
  {
    id: '001',
    name: 'web-prod-01',
    type: 'HTTP',
    status: 'Online',
    cpu: 45,
    memory: 62,
    _status: 'ok',
  },
  {
    id: '002',
    name: 'web-prod-02',
    type: 'HTTP',
    status: 'Online',
    cpu: 38,
    memory: 55,
    _status: 'ok',
  },
  {
    id: '003',
    name: 'api-gateway',
    type: 'WS',
    status: 'Warning',
    cpu: 78,
    memory: 81,
    _status: 'warn',
  },
  {
    id: '004',
    name: 'db-primary',
    type: 'TCP',
    status: 'Online',
    cpu: 52,
    memory: 73,
    _status: 'ok',
  },
  { id: '005', name: 'cache-01', type: 'TCP', status: 'Error', cpu: 0, memory: 0, _status: 'err' },
  {
    id: '006',
    name: 'worker-01',
    type: 'GRPC',
    status: 'Online',
    cpu: 23,
    memory: 41,
    _status: 'ok',
  },
];

const columns: TableColumn<NodeData>[] = [
  { key: 'name', label: 'Node', sortable: true },
  { key: 'type', label: 'Type', width: 80 },
  {
    key: 'status',
    label: 'Status',
    render: (value, row) => (
      <span
        className={
          row._status === 'ok'
            ? 'text-[var(--success)]'
            : row._status === 'warn'
              ? 'text-[var(--warning)]'
              : 'text-[var(--danger)]'
        }
      >
        {value as string}
      </span>
    ),
  },
  {
    key: 'cpu',
    label: 'CPU',
    align: 'right',
    render: (value) => `${value}%`,
  },
  {
    key: 'memory',
    label: 'Memory',
    align: 'right',
    render: (value) => `${value}%`,
  },
];

const regionOptions = [
  { value: 'all', label: 'All Regions' },
  { value: 'us-east', label: 'US East' },
  { value: 'us-west', label: 'US West' },
  { value: 'eu-central', label: 'EU Central' },
];

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'nodes', label: 'Nodes' },
  { id: 'alerts', label: 'Alerts' },
];

export default function DashboardPage() {
  const [showScan, setShowScan] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', onClick: () => {} },
    { id: 'infra', label: 'Infrastructure', onClick: () => {} },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  // 计算统计数据
  const totalNodes = mockNodes.length;
  const onlineNodes = mockNodes.filter((n) => n._status === 'ok').length;
  const warningNodes = mockNodes.filter((n) => n._status === 'warn').length;
  const errorNodes = mockNodes.filter((n) => n._status === 'err').length;
  const avgCpu = Math.round(mockNodes.reduce((sum, n) => sum + n.cpu, 0) / totalNodes);
  const avgMemory = Math.round(mockNodes.reduce((sum, n) => sum + n.memory, 0) / totalNodes);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      {/* 背景 */}
      <GridBackground />

      {/* 入场扫描 */}
      {showScan && <ScanSweep onComplete={() => setShowScan(false)} />}

      {/* 顶部状态栏 */}
      <StatusBar />

      {/* 主内容区 */}
      <main className="flex-1 p-6 relative z-10">
        {/* 面包屑 */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* 页面标题 + 操作 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-medium tracking-wider uppercase text-[var(--text-primary)]">
            System Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-[200px]">
              <Select options={regionOptions} value={selectedRegion} onChange={setSelectedRegion} />
            </div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Deploy Node
            </Button>
          </div>
        </div>

        {/* 标签页 */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* HUD 读数区 */}
              <div className="grid grid-cols-4 gap-6">
                <TacticalPanel title="Total Nodes" level="L1">
                  <HUDMeter value={totalNodes} max={20} label="NODES" variant="default" />
                </TacticalPanel>

                <TacticalPanel title="Online" level="L1" statusIndicator="ok">
                  <HUDMeter value={onlineNodes} max={totalNodes} label="ONLINE" variant="accent" />
                </TacticalPanel>

                <TacticalPanel title="CPU Usage" level="L1">
                  <HUDMeter
                    value={avgCpu}
                    max={100}
                    label="AVG CPU"
                    unit="%"
                    variant={avgCpu > 70 ? 'warn' : 'accent'}
                  />
                </TacticalPanel>

                <TacticalPanel title="Memory" level="L1">
                  <HUDMeter
                    value={avgMemory}
                    max={100}
                    label="AVG MEM"
                    unit="%"
                    variant={avgMemory > 80 ? 'warn' : 'accent'}
                  />
                </TacticalPanel>
              </div>

              {/* 状态概览卡片 */}
              <div className="grid grid-cols-3 gap-4">
                <Card
                  title="Healthy Services"
                  meta={`${onlineNodes} of ${totalNodes} nodes`}
                  onClick={() => setActiveTab('nodes')}
                >
                  <div className="flex items-center gap-2 text-[var(--success)]">
                    <CheckCircle size={20} />
                    <span className="text-[24px] font-mono">{onlineNodes}</span>
                  </div>
                </Card>

                <Card
                  title="Warnings"
                  meta="Needs attention"
                  onClick={() => setActiveTab('alerts')}
                >
                  <div className="flex items-center gap-2 text-[var(--warning)]">
                    <AlertTriangle size={20} />
                    <span className="text-[24px] font-mono">{warningNodes}</span>
                  </div>
                </Card>

                <Card
                  title="Critical"
                  meta="Immediate action required"
                  onClick={() => setActiveTab('alerts')}
                >
                  <div className="flex items-center gap-2 text-[var(--danger)]">
                    <Server size={20} />
                    <span className="text-[24px] font-mono">{errorNodes}</span>
                  </div>
                </Card>
              </div>

              {/* 快速进度指示 */}
              <TacticalPanel title="System Health" level="L2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[var(--text-secondary)]">CPU Cluster Load</span>
                      <span>{avgCpu}%</span>
                    </div>
                    <Progress value={avgCpu} variant={avgCpu > 70 ? 'danger' : 'accent'} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[var(--text-secondary)]">Memory Utilization</span>
                      <span>{avgMemory}%</span>
                    </div>
                    <Progress value={avgMemory} variant={avgMemory > 80 ? 'danger' : 'accent'} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[var(--text-secondary)]">Network Throughput</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} variant="accent" />
                  </div>
                </div>
              </TacticalPanel>
            </div>
          )}

          {activeTab === 'nodes' && (
            <div className="space-y-4">
              <TacticalPanel title="Node List" level="L2">
                <Table
                  columns={columns}
                  data={mockNodes}
                  selectedId={selectedNode?.id}
                  onSelect={(node) => {
                    setSelectedNode(node);
                    setIsDrawerOpen(true);
                  }}
                />
              </TacticalPanel>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <TacticalPanel title="Active Alerts" level="L2" statusIndicator="warn">
                <div className="space-y-3">
                  {mockNodes
                    .filter((n) => n._status !== 'ok')
                    .map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between p-3 border border-[var(--border-weak)] bg-[var(--bg-base)]"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              node._status === 'warn' ? 'bg-[var(--warning)]' : 'bg-[var(--danger)]'
                            }`}
                          />
                          <div>
                            <div className="text-[14px]">{node.name}</div>
                            <div className="text-[12px] text-[var(--text-secondary)]">
                              {node._status === 'warn' ? 'High resource usage' : 'Node unreachable'}
                            </div>
                          </div>
                        </div>
                        <Tooltip content="View details">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSelectedNode(node);
                              setIsDrawerOpen(true);
                            }}
                          >
                            Details
                          </Button>
                        </Tooltip>
                      </div>
                    ))}
                </div>
              </TacticalPanel>
            </div>
          )}
        </Tabs>
      </main>

      {/* 节点详情抽屉 */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedNode?.name || 'Node Details'}
      >
        {selectedNode && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[12px] text-[var(--text-secondary)] uppercase">Status</div>
                <div
                  className={`text-[16px] ${
                    selectedNode._status === 'ok'
                      ? 'text-[var(--success)]'
                      : selectedNode._status === 'warn'
                        ? 'text-[var(--warning)]'
                        : 'text-[var(--danger)]'
                  }`}
                >
                  {selectedNode.status}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[var(--text-secondary)] uppercase">Type</div>
                <div className="text-[16px]">{selectedNode.type}</div>
              </div>
            </div>

            <div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase mb-2">
                CPU Usage
              </div>
              <Progress value={selectedNode.cpu} showLabel />
            </div>

            <div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase mb-2">
                Memory Usage
              </div>
              <Progress value={selectedNode.memory} showLabel />
            </div>

            <div className="pt-4 border-t border-[var(--border-weak)]">
              <Button variant="danger" className="w-full">
                Restart Node
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* 部署确认弹窗 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Deploy New Node"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Deploy
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)]">
            Configure and deploy a new node to the cluster.
          </p>
          <div>
            <label className="block text-[12px] text-[var(--text-secondary)] uppercase mb-2">
              Region
            </label>
            <Select options={regionOptions} value={selectedRegion} onChange={setSelectedRegion} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
