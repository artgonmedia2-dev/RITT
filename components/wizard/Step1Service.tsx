'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WizardState } from './WizardDevis'

const serviceOptions = [
  { id: 'sea-freight', icon: Ship, labelKey: 'nav.seaFreight' },
  { id: 'air-freight', icon: Plane, labelKey: 'nav.airFreight' },
  { id: 'road-freight', icon: Truck, labelKey: 'nav.roadFreight' },
  { id: 'transit-customs', icon: ClipboardCheck, labelKey: 'nav.transitCustoms' },
  { id: 'supply-chain', icon: Warehouse, labelKey: 'nav.supplyChain' },
  { id: 'import-export', icon: ArrowLeftRight, labelKey: 'nav.importExport' },
]

interface Props {
  data: WizardState
  onNext: (data: Partial<WizardState>) => void
}

export default function Step1Service({ data, onNext }: Props) {
  const t = useTranslations()
  const [selected, setSelected] = useState(data.service || '')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!selected) {
      setError(t('wizard.selectService'))
      return
    }
    onNext({ service: selected })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">{t('wizard.step1')}</h2>
      <p className="text-navy-400 text-sm mb-8">Étape 1 sur 4 — Choisissez votre type de service</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {serviceOptions.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => { setSelected(id); setError('') }}
            className={cn(
              'flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center',
              selected === id
                ? 'border-brand bg-brand/5 shadow-md shadow-brand/10'
                : 'border-navy-50 bg-white hover:border-navy-100'
            )}
            aria-pressed={selected === id}
          >
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
              selected === id ? 'bg-brand text-white' : 'bg-navy-50 text-navy'
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <span className={cn(
              'text-sm font-semibold transition-colors',
              selected === id ? 'text-brand' : 'text-navy'
            )}>
              {t(labelKey as Parameters<typeof t>[0])}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="text-error text-sm mb-4">{error}</p>}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-navy text-white font-semibold rounded-full hover:bg-navy-light transition-colors"
        >
          {t('wizard.next')} →
        </button>
      </div>
    </div>
  )
}
