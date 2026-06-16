'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, FileText, Globe, Anchor, Clock } from 'lucide-react'
import { PHONE } from '@/lib/constants'

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()
  const base = `/${locale}`

  const badges = [
    { icon: Globe, key: 'hero.badge_network' },
    { icon: Anchor, key: 'hero.badge_modes' },
    { icon: Clock, key: 'hero.badge_support' },
  ]

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark navy overlay — assure la lisibilité du texte */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(105deg, rgba(13,22,66,0.92) 0%, rgba(26,35,126,0.82) 50%, rgba(40,53,147,0.65) 100%)',
        }}
      />

      {/* Animated SVG connection lines (kept as subtle overlay) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <g stroke="#00bcd4" strokeWidth="1" fill="none">
            <motion.line x1="505" y1="205" x2="550" y2="145"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }} />
            <motion.line x1="505" y1="205" x2="200" y2="210"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }} />
            <motion.line x1="505" y1="205" x2="800" y2="165"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5 }} />
            <motion.line x1="505" y1="205" x2="490" y2="290"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }} />
          </g>
          {[[550, 145], [200, 210], [800, 165], [490, 290]].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r="5" fill="#00bcd4"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.4, delay: 1.5 + i * 0.2 }} />
          ))}
          <circle cx="505" cy="205" r="8" fill="#00bcd4" />
          <motion.circle cx="505" cy="205" r="18" fill="none" stroke="#00bcd4" strokeWidth="2"
            initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }} />
        </svg>
      </div>

      {/* Content */}
      <div className="relative container-ritt pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/40 bg-brand/15 text-brand text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4" />
            Freight Forwarder — Maroc &amp; Afrique
          </motion.div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-bold rounded-full text-base hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/40 hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              {t('hero.cta_quote')}
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/25 text-white font-bold rounded-full text-base hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/85 text-sm backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 text-brand" />
                {t(key as Parameters<typeof t>[0])}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" fill="#fafbfc">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}
