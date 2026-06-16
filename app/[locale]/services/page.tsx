import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import SectionTitle from '@/components/shared/SectionTitle'
import CTABanner from '@/components/sections/CTABanner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.services' })
  return { title: t('title'), description: t('description') }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight,
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const base = `/${locale}`

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('services.title')}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon]
              const features = t.raw(service.featuresKey as Parameters<typeof t>[0]) as string[]

              return (
                <Link
                  key={service.id}
                  href={`${base}${service.href}`}
                  className="group flex flex-col p-8 rounded-2xl border-2 border-navy-50 bg-white card-hover hover:border-brand transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-navy-50 flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors">
                    {Icon && <Icon className="w-8 h-8 text-navy group-hover:text-brand transition-colors" />}
                  </div>
                  <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-brand transition-colors">
                    {t(service.titleKey as Parameters<typeof t>[0])}
                  </h2>
                  <p className="text-navy-400 leading-relaxed mb-5">
                    {t(service.descKey as Parameters<typeof t>[0])}
                  </p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {Array.isArray(features) && features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-navy/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                    {t('services.discover')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
