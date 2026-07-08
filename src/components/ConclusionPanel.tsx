import { cn, classifyVerdict, formatDiscount, formatNumber, formatPercent } from '@/lib/utils'
import type { ForwardResult } from '@/types'

interface ConclusionPanelProps {
  result: ForwardResult
}

export function ConclusionPanel({ result }: ConclusionPanelProps) {
  const { equivalentRate, officialCostRatio, ready } = result

  if (!ready || officialCostRatio === null || equivalentRate === null) {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-4 text-center text-sm text-faint">
        请填写充值金额、到账金额、分组倍率与汇率以查看结论
      </div>
    )
  }

  // 占官方成本 < 1 → 比官方便宜; > 1 → 贵
  const verdict = classifyVerdict(officialCostRatio - 1, 0.005)
  const { text } = formatDiscount(officialCostRatio - 1, 1)
  const verdictColor =
    verdict === 'cheaper'
      ? 'text-green'
      : verdict === 'expensive'
        ? 'text-red'
        : 'text-yellow'

  const verdictBorder =
    verdict === 'cheaper'
      ? 'border-green/40'
      : verdict === 'expensive'
        ? 'border-red/40'
        : 'border-yellow/40'

  const verdictBg =
    verdict === 'cheaper'
      ? 'from-green/10'
      : verdict === 'expensive'
        ? 'from-red/10'
        : 'from-yellow/10'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border bg-gradient-to-r to-transparent px-5 py-4',
        verdictBorder,
        verdictBg,
      )}
    >
      <div className="text-xs text-faint">结论</div>
      <p className="mt-1 text-sm text-fg sm:text-base">
        当前 1:1 等效倍率为{' '}
        <span className="tabular font-semibold text-blue">
          {formatNumber(equivalentRate, 4)}
        </span>
        ，占官方成本{' '}
        <span className="tabular font-semibold text-peach">
          {formatPercent(officialCostRatio, 1)}
        </span>
        ，<span className={cn('font-semibold', verdictColor)}>{text}</span>
        。
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        价格表展示各模型实付 ¥ 与官方 ¥ 的逐项对比。
      </p>
    </div>
  )
}
