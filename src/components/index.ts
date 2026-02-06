// 导出所有组件
export { Button } from './Button';
export { TacticalPanel } from './TacticalPanel';
export { Select } from './Select';
export { Checkbox, Radio, Switch } from './FormControls';
export { Modal } from './Modal';
export { Tabs } from './Tabs';
export { Progress, Spinner } from './Progress';
export { Card } from './Card';
export { StatusBar } from './StatusBar';
export { HUDMeter } from './HUDMeter';
export { ScanSweep } from './ScanSweep';
export { GridBackground } from './GridBackground';
export { Typewriter, TypewriterLines } from './Typewriter';
export { Input } from './Input';
export { Divider } from './Divider';
export { Tag, Badge } from './Tag';
export { ListRow } from './ListRow';
export { ToastProvider, useToast } from './Toast';
export { NodeGraph } from './NodeGraph';
export { NavLinkLine } from './NavLinkLine';
export { Ping } from './Ping';
export { SoftGlitch } from './SoftGlitch';
export { TacticalPanel as Panel } from './TacticalPanel';

// 新增组件
export { Table } from './Table';
export type { TableColumn, TableRow } from './Table';
export { Tooltip } from './Tooltip';
export { Drawer } from './Drawer';
export { Breadcrumb } from './Breadcrumb';
export { ParticleField, type ParticleSource } from './ParticleField';
export type { BreadcrumbItem } from './Breadcrumb';


// P2: 装饰性技术文本
export { TechDecor, TechDecorBlock } from './TechDecor';
export { useTechDecor, TECH_DECOR_POOLS, type TechDecorVariant, type UseTechDecorOptions } from '../hooks/useTechDecor';

// 补丁包2: 交互增强
export { HoldButton, HoldToDelete, HoldToReset } from './HoldButton';
export { Schematic, ServerTopology, DataFlow } from './Schematic';

// 补丁包2: Hooks
export { usePerformanceMode, PerformanceProvider, usePerformanceContext, useScaledDuration } from '../hooks/usePerformanceMode';
export type { PerformanceMode, PerformanceConfig } from '../hooks/usePerformanceMode';

// 补丁包2: 临床文风词库
export * from '../lib/clinical-copy';

// 补丁包3: P3 受控故障效果
export { useGlitch, useErrorGlitch, type GlitchIntensity } from '../hooks/useGlitch';

// 补丁包3: P4 无障碍双重编码
export { 
  StatusIndicator, 
  StatusBadge,
  StatusOk, 
  StatusWarn, 
  StatusError, 
  StatusBusy, 
  StatusOffline,
  STATUS_CONFIG,
  type StatusType 
} from './StatusIndicator';

// 补丁包3: P5 战术图标
export { 
  TacticalIcons,
  TargetLockIcon,
  SignalIcon,
  RadarIcon,
  UplinkIcon,
  DownlinkIcon,
  SecureIcon,
  AlertIcon,
  BatteryIcon,
  CrosshairIcon,
  DataStreamIcon,
  NodeIcon,
  ServerIcon,
  LocationIcon,
  HexIcon,
  SyncIcon,
  DiamondIcon,
  type IconProps 
} from './TacticalIcons';
