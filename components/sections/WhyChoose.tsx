'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Globe, Handshake, Zap, Settings, Shield, DollarSign } from 'lucide-react'
import { AnimatedList, AnimatedItem } from '@/components/shared/AnimatedSection'

const reasons = [
  { icon: Globe, titleKey: 'why.network.title', descKey: 'why.network.desc' },
  { icon: Handshake, titleKey: 'why.expertise.title', descKey: 'why.expertise.desc' },
  { icon: Zap, titleKey: 'why.reactivity.title', descKey: 'why.reactivity.desc' },
  { icon: Settings, titleKey: 'why.custom.title', descKey: 'why.custom.desc' },
  { icon: Shield, titleKey: 'why.security.title', descKey: 'why.security.desc' },
  { icon: DollarSign, titleKey: 'why.price.title', descKey: 'why.price.desc' },
]

export default function WhyChoose() {
  const t = useTranslations()

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative diagonal background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
          style={{ background: 'linear-gradient(135deg, #1a237e 0%, #00bcd4 100%)' }} />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container-ritt relative">
        {/* Split header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {t('why.badge') || 'Notre différence'}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy leading-tight tracking-tight">
              {t('why.title')}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-500 text-base leading-relaxed lg:max-w-sm"
          >
            {t('why.subtitle')}
          </motion.p>
        </div>

        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, titleKey, descKey }, i) => (
            <AnimatedItem key={titleKey}>
              <div className="group relative flex flex-col h-full p-7 rounded-2xl bg-white border border-gray-100 hover:border-brand/20 shadow-sm hover:shadow-xl hover:shadow-navy/8 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Background gradient reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0,188,212,0.04) 0%, rgba(26,35,126,0.03) 100%)' }} />

                {/* Number watermark */}
                <span className="absolute top-5 right-6 text-6xl font-black text-navy/5 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-2xl mb-5 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #1a237e, #283593)' }}>
                  <Icon className="w-7 h-7 text-brand" />
                </div>

                {/* Content */}
                <h3 className="relative font-bold text-navy text-lg mb-2.5 group-hover:text-brand transition-colors duration-300">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="relative text-gray-500 text-sm leading-relaxed">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: 'linear-gradient(90deg, #00bcd4, #4dd0e1)' }} />
              </div>
            </AnimatedItem>
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}
