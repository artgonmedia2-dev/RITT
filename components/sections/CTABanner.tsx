'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { FileText, Phone } from 'lucide-react'
import { PHONE } from '@/lib/constants'

export default function CTABanner() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)' }}
    >
      <div className="container-ritt">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand font-bold rounded-full hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              {t('cta.quote')}
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
