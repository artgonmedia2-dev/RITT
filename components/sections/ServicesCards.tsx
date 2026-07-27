'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import SectionTitle from '@/components/shared/SectionTitle'
import { AnimatedList, AnimatedItem } from '@/components/shared/AnimatedSection'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight,
}

// Per-service accent colors — inline styles to avoid dynamic Tailwind class issues
const SERVICE_COLORS = [
  { a: '#1565C0', b: '#0D47A1' }, // Sea freight — deep blue
  { a: '#0277BD', b: '#01579B' }, // Air freight — ocean blue
  { a: '#E65100', b: '#BF360C' }, // Road freight — orange
  { a: '#1A237E', b: '#0D1642' }, // Customs — RITT navy
  { a: '#00695C', b: '#004D40' }, // Supply chain — teal
  { a: '#2E7D32', b: '#1B5E20' }, // Import/export — green
]

export default function ServicesCards() {
  const t = useTranslations()
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#f8f9fc' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(#c5cae9 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container-ritt relative">
        <SectionTitle
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            const features = t.raw(service.featuresKey as Parameters<typeof t>[0]) as string[]
            const col = SERVICE_COLORS[i] ?? SERVICE_COLORS[0]
            const gradStyle = { background: `linear-gradient(135deg, ${col.a}, ${col.b})` }

            return (
              <AnimatedItem key={service.id}>
                <Link
                  href={`${base}${service.href}`}
                  className="group relative flex flex-col h-full rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent"
                  aria-label={`${t(service.titleKey as Parameters<typeof t>[0])} — ${t('services.discover')}`}
                >
                  {/* Top gradient accent bar */}
                  <div className="h-1.5 w-full flex-shrink-0 transition-all duration-300" style={gradStyle} />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + number row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={gradStyle}
                      >
                        {Icon && <Icon className="w-7 h-7 text-white" />}
                      </div>
                      <span className="text-5xl font-black leading-none select-none"
                        style={{ color: col.a, opacity: 0.08 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-brand transition-colors duration-300">
                      {t(service.titleKey as Parameters<typeof t>[0])}
                    </h3>

                    {/* Desc */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {t(service.descKey as Parameters<typeof t>[0])}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-2 mb-6 flex-1">
                      {Array.isArray(features) && features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.a }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ color: col.a }}>
                      {t('services.discover')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
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
