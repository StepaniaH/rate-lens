import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GlossaryPanel } from '@/components/GlossaryPanel'
import { ModeSwitcher } from '@/components/ModeSwitcher'
import { StepIndicator } from '@/components/StepIndicator'
import { PresetButtons, type Preset } from '@/components/PresetButtons'
import { FundingInputs } from '@/components/FundingInputs'
import { ExchangeRateDisplay } from '@/components/ExchangeRateDisplay'
import { ForwardCalculator } from '@/components/ForwardCalculator'
import { ReverseCalculator } from '@/components/ReverseCalculator'
import { useTheme } from '@/hooks/use-theme'
import { useExchangeRate } from '@/hooks/use-exchange-rate'
import { parseNum } from '@/lib/utils'
import type { CalcMode, ModelProvider, PriceKind, ReversePaidInput } from '@/types'

const EMPTY_PAID: ReversePaidInput = {
  input: null,
  output: null,
  cacheWrite: null,
  cacheRead: null,
}

function App() {
  const { theme, toggle } = useTheme()
  const { rate, loading, source, setManual, refetch } = useExchangeRate(7.2)

  const [mode, setMode] = useState<CalcMode>('forward')
  const [recharge, setRecharge] = useState('')
  const [arrived, setArrived] = useState('')
  const [groupRate, setGroupRate] = useState('')
  const [provider, setProvider] = useState<ModelProvider>('claude')

  const [reverseModelId, setReverseModelId] = useState<string | null>(null)
  const [reversePaid, setReversePaid] = useState<ReversePaidInput>(EMPTY_PAID)
  const [cacheExpanded, setCacheExpanded] = useState(false)

  const onPreset = (p: Preset) => {
    if (p.recharge !== undefined) setRecharge(String(p.recharge))
    if (p.arrived !== undefined) setArrived(String(p.arrived))
    if (p.groupRate !== undefined) setGroupRate(String(p.groupRate))
  }

  const onPaidField = (kind: PriceKind, value: string) => {
    setReversePaid((prev) => ({ ...prev, [kind]: parseNum(value) }))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12">
      <Header theme={theme} onToggleTheme={toggle} />

      <div className="flex flex-col gap-4">
        <GlossaryPanel />

        <div className="flex justify-center">
          <ModeSwitcher mode={mode} onChange={setMode} />
        </div>

        <StepIndicator mode={mode} />

        <PresetButtons mode={mode} onPreset={onPreset} />

        <FundingInputs
          recharge={recharge}
          arrived={arrived}
          onRecharge={setRecharge}
          onArrived={setArrived}
        />

        <ExchangeRateDisplay
          rate={rate}
          loading={loading}
          source={source}
          onManual={setManual}
          onRefetch={refetch}
        />

        {mode === 'forward' ? (
          <ForwardCalculator
            recharge={recharge}
            arrived={arrived}
            groupRate={groupRate}
            onGroupRate={setGroupRate}
            rate={rate}
            provider={provider}
            onProvider={setProvider}
          />
        ) : (
          <ReverseCalculator
            recharge={recharge}
            arrived={arrived}
            rate={rate}
            reverseModelId={reverseModelId}
            onReverseModelId={setReverseModelId}
            reversePaid={reversePaid}
            onPaidField={onPaidField}
            cacheExpanded={cacheExpanded}
            onCacheExpanded={setCacheExpanded}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default App
