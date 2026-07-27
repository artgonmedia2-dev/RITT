'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { FileText, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { PHONE, EMAIL } from '@/lib/constants'

export default function CTABanner() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 60%, #283593 100%)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand/8 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,188,212,0.3), transparent)' }} />
      </div>

      <div className="container-ritt relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — main CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/15 border border-brand/25 text-brand text-sm font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {t('cta.badge') || 'Devis gratuit en 24h'}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-white/65 text-lg mb-8 leading-relaxed max-w-lg lg:max-w-none">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href={`/${locale}/devis`}
                className="btn-glow inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-navy hover:shadow-2xl hover:shadow-brand/30 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00bcd4, #4dd0e1)' }}
              >
                <FileText className="w-5 h-5" />
                {t('cta.quote')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-white/25 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {PHONE}
              </a>
            </div>
          </motion.div>

          {/* Right — contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-auto lg:min-w-[300px] flex flex-col gap-4"
          >
            {/* Phone card */}
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-brand/40 transition-all duration-300 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #00bcd4, #0097a7)' }}>
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{t('footer.phone') || 'Téléphone fixe'}</p>
                <p className="text-white font-bold text-lg tracking-wide">{PHONE}</p>
              </div>
            </a>

            {/* Email card */}
            <a href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-brand/40 transition-all duration-300 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #1a237e, #283593)' }}>
                <Mail className="w-5 h-5 text-brand" />
              </div>
              <div className="min-w-0">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{t('footer.email') || 'Email'}</p>
                <p className="text-white font-semibold text-sm truncate">{EMAIL}</p>
              </div>
            </a>

            {/* Hours card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,188,212,0.1)', border: '1px solid rgba(0,188,212,0.2)' }}>
                <Clock className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{t('footer.hoursLabel') || 'Horaires'}</p>
                <p className="text-white/80 text-sm font-medium">{t('footer.hours')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
