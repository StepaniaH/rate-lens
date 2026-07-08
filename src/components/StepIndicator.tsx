import { cn } from '@/lib/utils'
import type { CalcMode } from '@/types'

interface StepIndicatorProps {
  mode: CalcMode
}

const FORWARD_STEPS = [
  '输入充值金额、到账金额与分组倍率',
  '换算充值比例与 1:1 等效倍率',
  '对比官方成本，查看价格表',
]

const REVERSE_STEPS = [
  '选择参照模型，输入实付价格',
  '反推真实分组倍率与等效倍率',
  '判定比官方便宜 / 贵 / 持平',
]

export function StepIndicator({ mode }: StepIndicatorProps) {
  const steps = mode === 'forward' ? FORWARD_STEPS : REVERSE_STEPS
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      {steps.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={cn(
              'flex size-6 items-center justify-center rounded-full text-xs font-semibold tabular',
              'bg-blue/15 text-blue ring-1 ring-blue/30',
            )}
          >
            {i + 1}
          </span>
          <span className="text-muted-foreground">{label}</span>
          {i < steps.length - 1 && (
            <span className="mx-1 text-faint" aria-hidden>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
