'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { step3Schema, Step3Data } from '@/lib/schema'
import { INCOTERMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { WizardState } from './WizardDevis'

interface Props {
  data: WizardState
  onNext: (data: Partial<WizardState>) => void
  onPrev: () => void
}

export default function Step3Incoterm({ data, onNext, onPrev }: Props) {
  const t = useTranslations()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      incoterm: (data.incoterm as Step3Data['incoterm']) || undefined,
      urgence: (data.urgence as Step3Data['urgence']) || 'standard',
      assurance: data.assurance ?? false,
      notes: data.notes || '',
    },
  })

  const incoterm = watch('incoterm')
  const urgence = watch('urgence')
  const assurance = watch('assurance')

  const onSubmit = (values: Step3Data) => {
    onNext(values)
  }

  const fieldClass = 'w-full px-4 py-3 rounded-xl border border-navy-100 bg-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors'
  const labelClass = 'block text-sm font-medium text-navy mb-3'
  const errorClass = 'text-error text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-navy mb-2">{t('wizard.step3')}</h2>
      <p className="text-navy-400 text-sm mb-8">Étape 3 sur 4 — Conditions de livraison</p>

      <div className="space-y-7">
        {/* Incoterm */}
        <div>
          <label className={labelClass}>{t('wizard.incoterm')} *</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {INCOTERMS.map((inc) => (
              <button
                key={inc}
                type="button"
                onClick={() => setValue('incoterm', inc, { shouldValidate: true })}
                className={cn(
                  'py-2 px-3 rounded-lg border-2 text-sm font-bold transition-all',
                  incoterm === inc
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-navy-50 text-navy hover:border-navy-200'
                )}
              >
                {inc}
              </button>
            ))}
          </div>
          {errors.incoterm && <p className={errorClass}>{errors.incoterm.message}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label className={labelClass}>{t('wizard.urgency')}</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: 'standard', label: t('wizard.standard'), color: 'border-success/30 bg-success/5 text-success' },
              { val: 'express', label: t('wizard.express'), color: 'border-warning/30 bg-warning/5 text-warning' },
              { val: 'urgent', label: t('wizard.urgent'), color: 'border-error/30 bg-error/5 text-error' },
            ].map(({ val, label, color }) => (
              <button
                key={val}
                type="button"
                onClick={() => setValue('urgence', val as Step3Data['urgence'])}
                className={cn(
                  'py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all',
                  urgence === val ? color : 'border-navy-50 text-navy hover:border-navy-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div>
          <label className={labelClass}>{t('wizard.insurance')}</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: true, label: t('wizard.yes') },
              { val: false, label: t('wizard.no') },
            ].map(({ val, label }) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setValue('assurance', val)}
                className={cn(
                  'py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all',
                  assurance === val
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-navy-50 text-navy hover:border-navy-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className={labelClass}>{t('wizard.notes')}</label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={3}
            className={fieldClass}
            placeholder="Instructions spéciales, contraintes particulières..."
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border-2 border-navy-100 text-navy font-semibold rounded-full hover:border-navy transition-colors"
        >
          ← {t('wizard.prev')}
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-navy text-white font-semibold rounded-full hover:bg-navy-light transition-colors"
        >
          {t('wizard.next')} →
        </button>
      </div>
    </form>
  )
}
