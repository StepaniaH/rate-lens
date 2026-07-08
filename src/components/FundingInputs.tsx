import { Input } from '@/components/ui/input'

interface FundingInputsProps {
  recharge: string
  arrived: string
  onRecharge: (v: string) => void
  onArrived: (v: string) => void
}

export function FundingInputs({
  recharge,
  arrived,
  onRecharge,
  onArrived,
}: FundingInputsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-fg">
          充值金额 <span className="text-faint">（¥）</span>
        </span>
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          placeholder="例如 100"
          value={recharge}
          onChange={(e) => onRecharge(e.target.value)}
          className="tabular"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-fg">
          到账金额 <span className="text-faint">（$）</span>
        </span>
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          placeholder="例如 100"
          value={arrived}
          onChange={(e) => onArrived(e.target.value)}
          className="tabular"
        />
      </label>
    </div>
  )
}
