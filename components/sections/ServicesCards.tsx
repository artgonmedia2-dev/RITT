'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import SectionTitle from '@/components/shared/SectionTitle'
import { AnimatedList, AnimatedItem } from '@/components/shared/AnimatedSection'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight,
}

export default function ServicesCards() {
  const t = useTranslations()
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="py-20 bg-white">
      <div className="container-ritt">
        <SectionTitle
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            const features = t.raw(service.featuresKey as Parameters<typeof t>[0]) as string[]

            return (
              <AnimatedItem key={service.id}>
                <Link
                  href={`${base}${service.href}`}
                  className="group relative flex flex-col h-full p-6 rounded-2xl border-2 border-navy-50 bg-white card-hover hover:border-brand/50 transition-all overflow-hidden"
                  aria-label={`${t(service.titleKey as Parameters<typeof t>[0])} — ${t('services.discover')}`}
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center mb-5 group-hover:bg-brand/10 group-hover:shadow-lg group-hover:shadow-brand/20 transition-all duration-300">
                    {Icon && <Icon className="w-7 h-7 text-navy group-hover:text-brand transition-colors duration-300" />}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-xl font-bold text-navy mb-2 group-hover:text-brand transition-colors duration-300">
                    {t(service.titleKey as Parameters<typeof t>[0])}
                  </h3>

                  {/* Desc */}
                  <p className="relative text-navy-400 text-sm leading-relaxed mb-4">
                    {t(service.descKey as Parameters<typeof t>[0])}
                  </p>

                  {/* Features list */}
                  <ul className="relative flex flex-col gap-1.5 mb-6 flex-1">
                    {Array.isArray(features) && features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-navy/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="relative flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-300">
                    {t('services.discover')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </AnimatedItem>
            )
          })}
        </AnimatedList>
      </div>
    </section>
  )
}
