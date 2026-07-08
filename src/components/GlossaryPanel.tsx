import { useState } from 'react'
import { ChevronDown, BookOpen } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface Term {
  term: string
  desc: string
}

const TERMS: Term[] = [
  { term: '充值金额', desc: '实际花费的人民币金额' },
  { term: '到账金额', desc: '充值后到账的美元余额' },
  { term: '分组倍率', desc: '平台对模型分组设置的计费倍数，越低扣费越少' },
  { term: '充值比例', desc: '充值金额 ÷ 到账金额，即每 1 美元实际成本' },
  { term: '占官方成本', desc: '实际成本相对于官网价的百分比' },
  { term: '输入 / 输出', desc: '输入 = 发给模型的内容，输出 = 模型回复，通常输出更贵' },
  { term: '缓存写入 / 读取', desc: '写入 = 存储可复用内容，读取 = 复用内容，读取更便宜' },
  { term: '1M tokens', desc: '计费用量单位，约一百万个文本片段' },
]

export function GlossaryPanel() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-lg border border-line bg-card/40">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface/40"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="size-4 text-blue" />
            名词解释
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-faint transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
          {TERMS.map((t) => (
            <div
              key={t.term}
              className="rounded-md bg-surface/30 px-3 py-2"
            >
              <div className="text-sm font-medium text-fg">{t.term}</div>
              <div className="mt-0.5 text-xs text-faint">{t.desc}</div>
            </div>
          ))}
        </div>
        <div className="mx-4 mb-4 rounded-md border border-blue/20 bg-blue/5 px-3 py-2 text-xs text-muted-foreground">
          为什么要算最终使用倍率？—— 平台显示的分组倍率会因充值比例（汇率加价）
          而被放大或缩小，换算成 1:1 等效倍率后才能与官方定价直接对比，判断是否划算。
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
