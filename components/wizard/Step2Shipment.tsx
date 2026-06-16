'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { step2Schema, Step2Data } from '@/lib/schema'
import { countries, goodsTypes } from '@/lib/data'
import { WizardState } from './WizardDevis'

interface Props {
  data: WizardState
  onNext: (data: Partial<WizardState>) => void
  onPrev: () => void
}

export default function Step2Shipment({ data, onNext, onPrev }: Props) {
  const t = useTranslations()

  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      origine: data.origine || '',
      destination: data.destination || '',
      poids: data.poids || '',
      longueur: data.longueur || '',
      largeur: data.largeur || '',
      hauteur: data.hauteur || '',
      typeMarchandise: data.typeMarchandise || '',
    },
  })

  const onSubmit = (values: Step2Data) => {
    onNext(values)
  }

  const fieldClass = 'w-full px-4 py-3 rounded-xl border border-navy-100 bg-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors'
  const labelClass = 'block text-sm font-medium text-navy mb-1.5'
  const errorClass = 'text-error text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-navy mb-2">{t('wizard.step2')}</h2>
      <p className="text-navy-400 text-sm mb-8">Étape 2 sur 4 — Détails de votre shipment</p>

      <div className="space-y-5">
        {/* Origine / Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origine" className={labelClass}>{t('wizard.origin')} *</label>
            <select id="origine" {...register('origine')} className={fieldClass}>
              <option value="">— Sélectionner —</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.origine && <p className={errorClass}>{errors.origine.message}</p>}
          </div>
          <div>
            <label htmlFor="destination" className={labelClass}>{t('wizard.destination')} *</label>
            <select id="destination" {...register('destination')} className={fieldClass}>
              <option value="">— Sélectionner —</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
          </div>
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="poids" className={labelClass}>{t('wizard.weight')} *</label>
          <input
            id="poids"
            type="number"
            min="0"
            {...register('poids')}
            className={fieldClass}
            placeholder="Ex: 5000"
          />
          {errors.poids && <p className={errorClass}>{errors.poids.message}</p>}
        </div>

        {/* Dimensions */}
        <div>
          <label className={labelClass}>{t('wizard.dimensions')}</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'longueur', label: t('wizard.length') },
              { name: 'largeur', label: t('wizard.width') },
              { name: 'hauteur', label: t('wizard.height') },
            ].map(({ name, label }) => (
              <div key={name}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register(name as 'longueur' | 'largeur' | 'hauteur')}
                  className={fieldClass}
                  placeholder={`${label} (m)`}
                  aria-label={`${t('wizard.dimensions')} — ${label}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Goods type */}
        <div>
          <label htmlFor="typeMarchandise" className={labelClass}>{t('wizard.goodsType')} *</label>
          <select id="typeMarchandise" {...register('typeMarchandise')} className={fieldClass}>
            <option value="">— Sélectionner —</option>
            {goodsTypes.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.typeMarchandise && <p className={errorClass}>{errors.typeMarchandise.message}</p>}
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
