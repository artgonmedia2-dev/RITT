'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Step1Service from './Step1Service'
import Step2Shipment from './Step2Shipment'
import Step3Incoterm from './Step3Incoterm'
import Step4Contact from './Step4Contact'

const STORAGE_KEY = 'ritt-wizard-data'

export type WizardState = {
  service?: string
  origine?: string
  destination?: string
  poids?: string
  longueur?: string
  largeur?: string
  hauteur?: string
  typeMarchandise?: string
  incoterm?: string
  urgence?: string
  assurance?: boolean
  notes?: string
  societe?: string
  nom?: string
  prenom?: string
  email?: string
  telephone?: string
  rgpd?: boolean
}

export default function WizardDevis() {
  const t = useTranslations()
  const locale = useLocale()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<WizardState>({})
  const [submitted, setSubmitted] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setData(JSON.parse(saved))
    } catch {}
  }, [])

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {}
  }, [data])

  const updateData = (newData: Partial<WizardState>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const handleSubmit = (finalData: Partial<WizardState>) => {
    const completeData = { ...data, ...finalData }
    console.log('RITT Devis submitted:', completeData)
    setData(completeData)
    setSubmitted(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  const steps = [
    t('wizard.step1'),
    t('wizard.step2'),
    t('wizard.step3'),
    t('wizard.step4'),
  ]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">{t('wizard.successTitle')}</h2>
        <p className="text-navy-400 text-lg mb-8">{t('wizard.successDesc')}</p>

        {/* Summary */}
        <div className="bg-navy-50/50 rounded-2xl p-6 text-left mb-8">
          <h3 className="font-semibold text-navy mb-4">Récapitulatif de votre demande :</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.service && (
              <><span className="text-navy-400">Service :</span><span className="text-navy font-medium">{data.service}</span></>
            )}
            {data.origine && data.destination && (
              <><span className="text-navy-400">Route :</span><span className="text-navy font-medium">{data.origine} → {data.destination}</span></>
            )}
            {data.poids && (
              <><span className="text-navy-400">Poids :</span><span className="text-navy font-medium">{data.poids} kg</span></>
            )}
            {data.incoterm && (
              <><span className="text-navy-400">Incoterm :</span><span className="text-navy font-medium">{data.incoterm}</span></>
            )}
            {data.societe && (
              <><span className="text-navy-400">Société :</span><span className="text-navy font-medium">{data.societe}</span></>
            )}
            {data.email && (
              <><span className="text-navy-400">Email :</span><span className="text-navy font-medium">{data.email}</span></>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+2125XXXXXXXX"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-colors"
          >
            📞 Urgence ? Appelez-nous
          </a>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
          >
            ← {t('wizard.backHome')}
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="mb-10">
        {/* Step labels */}
        <div className="flex justify-between mb-3">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`text-xs font-medium transition-colors ${
                i + 1 <= step ? 'text-navy' : 'text-navy-200'
              } ${i === 0 ? 'text-left' : i === steps.length - 1 ? 'text-right' : 'text-center'} flex-1`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-navy-50 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        {/* Step indicator */}
        <div className="flex justify-between mt-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i + 1 < step ? 'bg-brand' : i + 1 === step ? 'bg-navy ring-2 ring-navy/20 ring-offset-2' : 'bg-navy-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Step1Service
              data={data}
              onNext={(d) => { updateData(d); setStep(2) }}
            />
          )}
          {step === 2 && (
            <Step2Shipment
              data={data}
              onNext={(d) => { updateData(d); setStep(3) }}
              onPrev={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3Incoterm
              data={data}
              onNext={(d) => { updateData(d); setStep(4) }}
              onPrev={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4Contact
              data={data}
              onSubmit={handleSubmit}
              onPrev={() => setStep(3)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
