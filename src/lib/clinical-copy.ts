/**
 * 临床文风词库 (Clinical Copy)
 * 
 * 用于替代常规 UI 文案，制造"冷酷、精确、工业化"的信息呈现感
 * 
 * 参考：《全境封锁》、《明日方舟》、SCP 基金会
 */

// ============================================================
// 状态文案
// ============================================================

export const CLINICAL_STATUS = {
  // Loading 相关
  loading: 'ESTABLISHING UPLINK...',
  loadingData: 'RETRIEVING DATA STREAM...',
  loadingAuth: 'AUTHENTICATING CREDENTIALS...',
  loadingSync: 'SYNCHRONIZING NODES...',
  loadingInit: 'INITIALIZING SUBSYSTEMS...',
  loadingConnect: 'ESTABLISHING SECURE CHANNEL...',
  
  // Success 相关
  success: 'OPERATION COMPLETE',
  successSync: 'SYNC VERIFIED',
  successAuth: 'CREDENTIALS VALIDATED',
  successUpload: 'TRANSFER COMPLETE',
  successSave: 'DATA COMMITTED',
  
  // Error 相关
  error: 'FATAL EXCEPTION',
  errorNetwork: 'UPLINK SEVERED',
  errorTimeout: 'CONNECTION TIMEOUT: RETRY ABORTED',
  errorAuth: 'AUTHENTICATION FAILURE',
  errorData: 'DATA_STREAM_CORRUPTED',
  errorNotFound: 'TARGET NOT FOUND (NULL_PTR)',
  errorPermission: 'ACCESS DENIED: CLEARANCE INSUFFICIENT',
  errorServer: 'REMOTE HOST UNRESPONSIVE',
  
  // Warning 相关
  warning: 'ANOMALY DETECTED',
  warningLowBattery: 'POWER RESERVE CRITICAL',
  warningHighLoad: 'SYSTEM LOAD EXCEEDING THRESHOLD',
  warningExpiring: 'SESSION TIMEOUT IMMINENT',
  
  // Info 相关
  info: 'SYSTEM ADVISORY',
  infoUpdate: 'FIRMWARE UPDATE AVAILABLE',
  infoMaintenance: 'SCHEDULED MAINTENANCE WINDOW',
  
  // Empty 相关
  empty: 'NO_RECORDS_FOUND (NULL_PTR)',
  emptySearch: 'QUERY RETURNED ZERO RESULTS',
  emptyList: 'BUFFER EMPTY',
  emptyData: 'AWAITING DATA INPUT',
} as const;

// ============================================================
// 动作文案
// ============================================================

export const CLINICAL_ACTIONS = {
  // 基础动作
  submit: 'EXECUTE',
  cancel: 'ABORT',
  confirm: 'CONFIRM',
  save: 'COMMIT',
  delete: 'PURGE',
  edit: 'MODIFY',
  create: 'INITIALIZE',
  add: 'APPEND',
  remove: 'DETACH',
  
  // 导航
  back: 'RETURN',
  next: 'PROCEED',
  previous: 'REVERT',
  home: 'ROOT',
  
  // 登录相关
  login: 'INITIALIZE SESSION',
  logout: 'TERMINATE SESSION',
  register: 'CREATE IDENTITY',
  forgotPassword: 'RESET CREDENTIALS',
  
  // 数据操作
  search: 'QUERY',
  filter: 'FILTER',
  sort: 'REORDER',
  refresh: 'RESYNC',
  export: 'EXTRACT',
  import: 'INJECT',
  download: 'RETRIEVE',
  upload: 'TRANSMIT',
  
  // 危险操作
  deleteAll: 'PURGE ALL RECORDS',
  reset: 'FACTORY RESET',
  wipe: 'SECURE WIPE',
  terminate: 'FORCE TERMINATE',
} as const;

// ============================================================
// 标签文案
// ============================================================

export const CLINICAL_LABELS = {
  // 表单
  username: 'OPERATOR ID',
  password: 'ACCESS KEY',
  email: 'CONTACT NODE',
  phone: 'COMM LINK',
  name: 'DESIGNATION',
  description: 'ANNOTATION',
  
  // 状态
  status: 'SYSTEM STATUS',
  online: 'ONLINE',
  offline: 'OFFLINE',
  active: 'ACTIVE',
  inactive: 'STANDBY',
  pending: 'PENDING',
  processing: 'PROCESSING',
  
  // 时间
  createdAt: 'INIT TIMESTAMP',
  updatedAt: 'LAST MODIFIED',
  expiresAt: 'EXPIRY',
  lastSeen: 'LAST CONTACT',
  
  // 其他
  version: 'BUILD',
  count: 'COUNT',
  total: 'AGGREGATE',
  average: 'MEAN',
  id: 'REF_ID',
} as const;

// ============================================================
// 占位符文案
// ============================================================

export const CLINICAL_PLACEHOLDERS = {
  search: 'ENTER QUERY PARAMETERS...',
  username: 'OPERATOR_ID',
  password: '••••••••',
  email: 'NODE@DOMAIN.NET',
  input: 'AWAITING INPUT...',
  textarea: 'INPUT DATA STREAM...',
  select: 'SELECT TARGET',
} as const;

// ============================================================
// 确认对话框
// ============================================================

export const CLINICAL_DIALOGS = {
  deleteConfirm: {
    title: 'CONFIRM PURGE OPERATION',
    message: 'THIS ACTION IS IRREVERSIBLE. HOLD TO CONFIRM.',
    confirm: 'HOLD TO PURGE',
    cancel: 'ABORT',
  },
  logoutConfirm: {
    title: 'TERMINATE SESSION?',
    message: 'UNSAVED CHANGES WILL BE DISCARDED.',
    confirm: 'TERMINATE',
    cancel: 'CANCEL',
  },
  discardConfirm: {
    title: 'DISCARD CHANGES?',
    message: 'MODIFICATIONS WILL NOT BE COMMITTED.',
    confirm: 'DISCARD',
    cancel: 'CONTINUE EDITING',
  },
  resetConfirm: {
    title: 'SYSTEM RESET',
    message: 'ALL DATA WILL BE WIPED. THIS CANNOT BE UNDONE.',
    confirm: 'HOLD TO RESET',
    cancel: 'ABORT',
  },
} as const;

// ============================================================
// 系统消息
// ============================================================

export const CLINICAL_SYSTEM = {
  // 版本信息
  version: 'SYSTEM BUILD',
  copyright: 'CLASSIFIED // INTERNAL USE ONLY',
  
  // 页面标题
  dashboard: 'COMMAND CENTER',
  settings: 'SYSTEM CONFIGURATION',
  profile: 'OPERATOR PROFILE',
  help: 'DOCUMENTATION',
  
  // 导航
  menu: 'NAVIGATION',
  notifications: 'ALERTS',
  messages: 'COMM BUFFER',
  
  // 空状态
  noData: 'NO DATA AVAILABLE',
  noResults: 'QUERY RETURNED EMPTY',
  noAccess: 'ACCESS RESTRICTED',
  
  // 占位内容
  comingSoon: 'FEATURE IN DEVELOPMENT',
  maintenance: 'SYSTEM MAINTENANCE IN PROGRESS',
  underConstruction: 'MODULE UNDER CONSTRUCTION',
} as const;

// ============================================================
// 技术参数（用于 TechDecor）
// ============================================================

export const CLINICAL_TECH_PARAMS = {
  memory: 'MEM_USAGE',
  cpu: 'CPU_LOAD',
  network: 'NET_LATENCY',
  sync: 'SYNC_RATE',
  buffer: 'BUFFER_STATUS',
  cache: 'CACHE_HIT',
  queue: 'QUEUE_DEPTH',
  uptime: 'SYS_UPTIME',
} as const;

// ============================================================
// 辅助函数
// ============================================================

/**
 * 获取临床风格的加载文案（随机）
 */
export function getLoadingText(): string {
  const texts = [
    CLINICAL_STATUS.loading,
    CLINICAL_STATUS.loadingData,
    CLINICAL_STATUS.loadingSync,
    CLINICAL_STATUS.loadingInit,
    CLINICAL_STATUS.loadingConnect,
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

/**
 * 获取临床风格的错误文案
 */
export function getErrorText(type?: 'network' | 'timeout' | 'auth' | 'data' | 'permission' | 'server'): string {
  switch (type) {
    case 'network': return CLINICAL_STATUS.errorNetwork;
    case 'timeout': return CLINICAL_STATUS.errorTimeout;
    case 'auth': return CLINICAL_STATUS.errorAuth;
    case 'data': return CLINICAL_STATUS.errorData;
    case 'permission': return CLINICAL_STATUS.errorPermission;
    case 'server': return CLINICAL_STATUS.errorServer;
    default: return CLINICAL_STATUS.error;
  }
}

/**
 * 格式化时间戳为临床风格
 */
export function formatClinicalTimestamp(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${y}.${m}.${d} // ${h}:${min}:${s}`;
}

/**
 * 格式化数字为临床风格（带千位分隔符）
 */
export function formatClinicalNumber(num: number): string {
  return num.toLocaleString('en-US').replace(/,/g, ',');
}

/**
 * 格式化百分比
 */
export function formatClinicalPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// 导出所有词库的类型
export type ClinicalStatusKey = keyof typeof CLINICAL_STATUS;
export type ClinicalActionKey = keyof typeof CLINICAL_ACTIONS;
export type ClinicalLabelKey = keyof typeof CLINICAL_LABELS;
