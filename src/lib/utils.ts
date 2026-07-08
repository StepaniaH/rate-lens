import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conditional logic. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Parse a value into a finite number, returning null when invalid/empty. */
export function parseNum(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

/** Format a number with up to `digits` fractional digits, trimming trailing zeros. */
export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—'
  const fixed = value.toFixed(digits)
  return fixed.replace(/\.?0+$/, '') || '0'
}

/** Format a 0-1 ratio as a percentage string with given digits. */
export function formatPercent(ratio: number, digits = 1): string {
  if (!Number.isFinite(ratio)) return '—'
  return `${formatNumber(ratio * 100, digits)}%`
}

/** Format a signed percentage, e.g. "便宜 12.3%" / "贵 12.3%" / "持平". */
export function formatDiscount(ratio: number, digits = 1): {
  text: string
  sign: 'cheaper' | 'expensive' | 'flat'
} {
  if (!Number.isFinite(ratio)) return { text: '—', sign: 'flat' }
  const pct = formatNumber(Math.abs(ratio) * 100, digits)
  if (Math.abs(ratio) < 0.0005) return { text: '与官方持平', sign: 'flat' }
  if (ratio < 0) return { text: `比官方便宜 ${pct}%`, sign: 'cheaper' }
  return { text: `比官方贵 ${pct}%`, sign: 'expensive' }
}

/** Format a CNY price like "¥25" / "¥12.34". */
export function formatCNY(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—'
  return `¥${formatNumber(value, digits)}`
}

/** Format a USD price like "$5" / "$6.25". */
export function formatUSD(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—'
  return `$${formatNumber(value, digits)}`
}
