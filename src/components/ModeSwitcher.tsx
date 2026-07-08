import { cn } from '@/lib/utils'
import type { CalcMode } from '@/types'

interface ModeSwitcherProps {
  mode: CalcMode
  onChange: (mode: CalcMode) => void
}

const MODES: { value: CalcMode; label: string }[] = [
  { value: 'forward', label: '倍率正算' },
  { value: 'reverse', label: '扣费反推' },
]

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="计算模式"
      className="inline-flex rounded-pill bg-surface/50 p-1"
    >
      {MODES.map((m) => {
        const active = mode === m.value
        return (
          <button
            key={m.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(m.value)}
            className={cn(
              'rounded-pill px-4 py-1.5 text-sm font-medium transition-all',
              active
                ? 'bg-blue text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-fg',
            )}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
