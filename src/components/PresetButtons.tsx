import { cn } from '@/lib/utils'
import type { CalcMode } from '@/types'

export interface Preset {
  label: string
  recharge?: number
  arrived?: number
  groupRate?: number
}

interface PresetButtonsProps {
  mode: CalcMode
  onPreset: (p: Preset) => void
}

const FUNDING_PRESETS: Preset[] = [
  { label: '充值100到账100', recharge: 100, arrived: 100 },
  { label: '充值100到账50', recharge: 100, arrived: 50 },
]

const RATE_PRESETS: Preset[] = [
  { label: '倍率 0.6', groupRate: 0.6 },
  { label: '倍率 1.1', groupRate: 1.1 },
]

export function PresetButtons({ mode, onPreset }: PresetButtonsProps) {
  const presets = mode === 'forward' ? [...FUNDING_PRESETS, ...RATE_PRESETS] : FUNDING_PRESETS
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <button
          key={p.label}
          type="button"
          onClick={() => onPreset(p)}
          className={cn(
            'rounded-pill border border-line bg-surface/40 px-3 py-1 text-xs font-medium text-muted-foreground',
            'transition-all hover:border-blue/40 hover:bg-blue/10 hover:text-blue',
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
