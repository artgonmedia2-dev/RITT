'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, FileText, Search, Ship, CheckCircle } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'

const steps = [
  { numKey: 'process.step1.num', titleKey: 'process.step1.title', descKey: 'process.step1.desc', icon: Phone },
  { numKey: 'process.step2.num', titleKey: 'process.step2.title', descKey: 'process.step2.desc', icon: FileText },
  { numKey: 'process.step3.num', titleKey: 'process.step3.title', descKey: 'process.step3.desc', icon: Search },
  { numKey: 'process.step4.num', titleKey: 'process.step4.title', descKey: 'process.step4.desc', icon: Ship },
  { numKey: 'process.step5.num', titleKey: 'process.step5.title', descKey: 'process.step5.desc', icon: CheckCircle },
]

export default function Process() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="py-20 bg-white">
      <div className="container-ritt">
        <SectionTitle
          title={t('process.title')}
          subtitle={t('process.subtitle')}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 h-0.5 bg-gradient-to-r from-transparent via-navy-100 to-transparent" style={{ left: '8%', right: '8%' }} aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map(({ numKey, titleKey, descKey, icon: Icon }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-navy flex flex-col items-center justify-center mb-4 shadow-lg shadow-navy/20">
                  <Icon className="w-6 h-6 text-brand mb-0.5" />
                  <span className="text-xs font-bold text-white/60">
                    {t(numKey as Parameters<typeof t>[0])}
                  </span>
                </div>

                <h3 className="font-bold text-navy text-lg mb-2">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm text-navy-400 leading-relaxed">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>

                {/* Arrow (mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-navy-200" aria-hidden="true">▼</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href={`/${locale}/devis`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-bold rounded-full text-base hover:bg-navy-light transition-all hover:shadow-lg hover:shadow-navy/30"
          >
            <FileText className="w-5 h-5" />
            {t('process.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
