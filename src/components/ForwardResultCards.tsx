import { cn, formatNumber, formatPercent } from '@/lib/utils'
import type { ForwardResult } from '@/types'

interface ForwardResultCardsProps {
  result: ForwardResult
}

interface CardDef {
  label: string
  value: string
  hint: string
  accent: string
  valueClass: string
}

export function ForwardResultCards({ result }: ForwardResultCardsProps) {
  const { rechargeRatio, equivalentRate, officialCostRatio, ready } = result

  const cards: CardDef[] = [
    {
      label: '充值比例',
      value: ready && rechargeRatio !== null ? `${formatNumber(rechargeRatio, 4)} ¥/$` : '—',
      hint: '每 1 美元实际成本',
      accent: 'text-teal',
      valueClass: 'tabular',
    },
    {
      label: '1:1 等效分组倍率',
      value: ready && equivalentRate !== null ? formatNumber(equivalentRate, 4) : '—',
      hint: '可与官方直接对比',
      accent: 'text-blue',
      valueClass: 'tabular',
    },
    {
      label: '占官方成本',
      value: ready && officialCostRatio !== null ? formatPercent(officialCostRatio, 1) : '—',
      hint: '越低越划算',
      accent: 'text-peach',
      valueClass: 'tabular',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className={cn(
            'card-glow rounded-lg border border-line bg-card/50 px-4 py-3',
            'transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card',
          )}
        >
          <div className="text-xs text-faint">{c.label}</div>
          <div className={cn('mt-1 text-2xl font-semibold', c.accent, c.valueClass)}>
            {c.value}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{c.hint}</div>
        </div>
      ))}
    </div>
  )
}
