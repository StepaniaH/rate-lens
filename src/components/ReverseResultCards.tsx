import { cn, formatCNY, formatNumber, formatPercent, formatUSD } from '@/lib/utils'
import type { ModelPricing, PriceKind, ReverseRowResult, ReverseSummary, Verdict } from '@/types'

interface ReverseResultCardsProps {
  summary: ReverseSummary
  model: ModelPricing | null
}

const KIND_LABEL: Record<PriceKind, string> = {
  input: '输入',
  output: '输出',
  cacheWrite: '缓存写入',
  cacheRead: '缓存读取',
}

const VERDICT_BADGE: Record<Verdict, string> = {
  cheaper: 'bg-green/15 text-green ring-green/30',
  flat: 'bg-yellow/15 text-yellow ring-yellow/30',
  expensive: 'bg-red/15 text-red ring-red/30',
  na: 'bg-surface/40 text-faint ring-line',
}

function RowCard({ row, ratio }: { row: ReverseRowResult; ratio: number | null }) {
  return (
    <div className="rounded-lg border border-line bg-card/40 px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-fg">{KIND_LABEL[row.kind]}实付</span>
        <span
          className={cn(
            'rounded-pill px-2 py-0.5 text-xs font-medium ring-1',
            VERDICT_BADGE[row.verdict],
          )}
        >
          {row.discountText}
        </span>
      </div>

      {row.officialUSD === null ? (
        <div className="mt-2 text-xs text-faint">该模型无此项，不适用</div>
      ) : (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-faint">真实分组倍率</div>
              <div className="tabular text-lg font-semibold text-blue">
                {row.groupRate !== null ? formatNumber(row.groupRate, 4) : '—'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-faint">1:1 等效倍率</div>
              <div className="tabular text-lg font-semibold text-mauve">
                {row.equivalentRate !== null ? formatNumber(row.equivalentRate, 4) : '—'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-faint">占官方成本</div>
              <div className="tabular text-lg font-semibold text-peach">
                {row.officialCostRatio !== null
                  ? formatPercent(row.officialCostRatio, 1)
                  : '—'}
              </div>
            </div>
          </div>
          <div className="mt-2 tabular text-[10px] text-overlay">
            {formatCNY(row.paidCNY ?? NaN)} ÷ {formatUSD(row.officialUSD)}
            {ratio !== null ? ` ÷ ${formatNumber(ratio, 4)}` : ''} = 倍率
          </div>
        </>
      )}
    </div>
  )
}

export function ReverseResultCards({ summary, model }: ReverseResultCardsProps) {
  const { rows, avgGroupRate, best, worst } = summary

  if (!model) {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-4 text-center text-sm text-faint">
        请选择参照模型并填写实付价格以查看反推结果
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-4 text-center text-sm text-faint">
        请至少填写一项实付价格（输入 / 输出 / 缓存）
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <RowCard key={r.kind} row={r} ratio={model ? null : null} />
        ))}
      </div>

      <div className="rounded-lg border border-line bg-surface/20 px-4 py-3">
        <div className="text-xs font-medium text-fg">汇总</div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-[10px] text-faint">平均反推倍率</div>
            <div className="tabular text-base font-semibold text-blue">
              {avgGroupRate !== null ? formatNumber(avgGroupRate, 4) : '—'}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-faint">最划算</div>
            <div className="text-xs font-medium text-green">
              {best ? KIND_LABEL[best.kind] : '—'}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-faint">最贵</div>
            <div className="text-xs font-medium text-red">
              {worst ? KIND_LABEL[worst.kind] : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
