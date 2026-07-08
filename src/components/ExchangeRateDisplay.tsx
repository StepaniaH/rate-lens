import { useState } from 'react'
import { Pencil, Check, Loader2, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn, formatNumber } from '@/lib/utils'
import type { ExchangeSource } from '@/hooks/use-exchange-rate'

interface ExchangeRateDisplayProps {
  rate: number | null
  loading: boolean
  source: ExchangeSource
  onManual: (n: number) => void
  onRefetch: () => void
}

const SOURCE_LABEL: Record<ExchangeSource, string> = {
  auto: '自动获取',
  manual: '手动',
  default: '默认（离线）',
}

export function ExchangeRateDisplay({
  rate,
  loading,
  source,
  onManual,
  onRefetch,
}: ExchangeRateDisplayProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const startEdit = () => {
    setDraft(rate !== null ? String(rate) : '')
    setEditing(true)
  }
  const commit = () => {
    const n = Number(draft)
    if (Number.isFinite(n) && n > 0) onManual(n)
    setEditing(false)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-card/40 px-4 py-3">
      <div className="flex flex-1 items-baseline gap-2">
        <span className="text-sm text-muted-foreground">实时汇率</span>
        {editing ? (
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
              if (e.key === 'Escape') setEditing(false)
            }}
            className="h-7 w-24 tabular"
          />
        ) : (
          <span
            className={cn(
              'tabular text-lg font-semibold text-teal',
              loading && 'opacity-50',
            )}
          >
            {loading ? '—' : rate !== null ? formatNumber(rate, 4) : '—'}
          </span>
        )}
        <span className="text-xs text-faint">¥/USD · {SOURCE_LABEL[source]}</span>
      </div>

      <div className="flex items-center gap-1">
        {editing ? (
          <Button variant="ghost" size="icon-sm" onClick={commit} aria-label="确认">
            <Check className="size-4 text-green" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon-sm" onClick={startEdit} aria-label="编辑汇率">
            <Pencil className="size-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRefetch}
          disabled={loading}
          aria-label="重新获取"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCw className="size-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
