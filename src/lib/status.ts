export type StatusLevel =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'active'
  | 'loading'
  | 'warning'
  | 'error'
  | 'critical';

export const STATUS_PRIORITY: StatusLevel[] = [
  'idle',
  'hover',
  'focus',
  'active',
  'loading',
  'warning',
  'error',
  'critical',
];

export function compareStatus(a: StatusLevel, b: StatusLevel) {
  return STATUS_PRIORITY.indexOf(a) - STATUS_PRIORITY.indexOf(b);
}
