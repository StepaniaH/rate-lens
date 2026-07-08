import { Moon, Sun, Telescope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Theme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-xl bg-blue/15 text-blue"
          aria-hidden
        >
          <Telescope className="size-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
            RateLens
          </h1>
          <p className="text-xs text-faint sm:text-sm">
            AI 模型价格倍率计算器
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleTheme}
        aria-label="切换主题"
        title={theme === 'dark' ? '切换到浅色' : '切换到深色'}
      >
        <Sun className={cn('size-4', theme === 'dark' ? 'hidden' : '')} />
        <Moon className={cn('size-4', theme === 'light' ? 'hidden' : '')} />
      </Button>
    </header>
  )
}
