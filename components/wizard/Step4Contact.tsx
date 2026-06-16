'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { step4Schema, Step4Data } from '@/lib/schema'
import { WizardState } from './WizardDevis'

interface Props {
  data: WizardState
  onSubmit: (data: Partial<WizardState>) => void
  onPrev: () => void
}

export default function Step4Contact({ data, onSubmit, onPrev }: Props) {
  const t = useTranslations()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      societe: data.societe || '',
      nom: data.nom || '',
      prenom: data.prenom || '',
      email: data.email || '',
      telephone: data.telephone || '',
      rgpd: data.rgpd ?? false,
    },
  })

  const handleFormSubmit = (values: Step4Data) => {
    onSubmit(values)
  }

  const fieldClass = 'w-full px-4 py-3 rounded-xl border border-navy-100 bg-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors'
  const labelClass = 'block text-sm font-medium text-navy mb-1.5'
  const errorClass = 'text-error text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="text-2xl font-bold text-navy mb-2">{t('wizard.step4')}</h2>
      <p className="text-navy-400 text-sm mb-8">Étape 4 sur 4 — Vos coordonnées</p>

      <div className="space-y-4">
        {/* Company */}
        <div>
          <label htmlFor="societe" className={labelClass}>{t('wizard.company')} *</label>
          <input
            id="societe"
            type="text"
            {...register('societe')}
            className={fieldClass}
            placeholder="Votre société"
          />
          {errors.societe && <p className={errorClass}>{errors.societe.message}</p>}
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className={labelClass}>{t('wizard.lastName')} *</label>
            <input
              id="nom"
              type="text"
              {...register('nom')}
              className={fieldClass}
              placeholder="Nom"
            />
            {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
          </div>
          <div>
            <label htmlFor="prenom" className={labelClass}>{t('wizard.firstName')} *</label>
            <input
              id="prenom"
              type="text"
              {...register('prenom')}
              className={fieldClass}
              placeholder="Prénom"
            />
            {errors.prenom && <p className={errorClass}>{errors.prenom.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>{t('wizard.email')} *</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={fieldClass}
            placeholder="email@societe.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="telephone" className={labelClass}>{t('wizard.phone')} *</label>
          <input
            id="telephone"
            type="tel"
            {...register('telephone')}
            className={fieldClass}
            placeholder="+212 6XX XX XX XX"
          />
          {errors.telephone && <p className={errorClass}>{errors.telephone.message}</p>}
        </div>

        {/* RGPD */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('rgpd')}
              className="mt-0.5 w-5 h-5 rounded border-navy-200 text-brand focus:ring-brand/30 cursor-pointer flex-shrink-0"
            />
            <span className="text-sm text-navy-400">
              {t('wizard.rgpd')}{' '}
              <a href="#" className="text-brand hover:underline">
                (Politique de confidentialité)
              </a>{' '}
              *
            </span>
          </label>
          {errors.rgpd && <p className={errorClass}>{errors.rgpd.message}</p>}
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
          disabled={isSubmitting}
          className="px-8 py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          📨 {t('wizard.submit')}
        </button>
      </div>
    </form>
  )
}
