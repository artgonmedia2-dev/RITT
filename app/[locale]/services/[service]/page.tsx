import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight, CheckCircle, ArrowLeft } from 'lucide-react'
import { services, serviceDetails } from '@/lib/data'
import { SERVICE_SLUGS } from '@/lib/constants'
import CTABanner from '@/components/sections/CTABanner'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship, Plane, Truck, ClipboardCheck, Warehouse, ArrowLeftRight,
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.flatMap((service) =>
    ['fr', 'en', 'ar'].map((locale) => ({ locale, service }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>
}): Promise<Metadata> {
  const { locale, service } = await params
  const t = await getTranslations({ locale })
  const serviceData = services.find((s) => s.id === service)
  if (!serviceData) return {}
  const title = t(serviceData.titleKey as Parameters<typeof t>[0])
  return {
    title: `${title} — RITT`,
    description: t(serviceData.descKey as Parameters<typeof t>[0]),
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>
}) {
  const { locale, service } = await params
  const t = await getTranslations({ locale })

  const serviceData = services.find((s) => s.id === service)
  const detail = serviceDetails[service]

  if (!serviceData || !detail) notFound()

  const Icon = iconMap[detail.icon]
  const features = t.raw(serviceData.featuresKey as Parameters<typeof t>[0]) as string[]
  const base = `/${locale}`

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt">
          <Link
            href={`${base}/services`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('services.title')}
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              {Icon && <Icon className="w-10 h-10 text-brand" />}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                {t(serviceData.titleKey as Parameters<typeof t>[0])}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                {t(serviceData.descKey as Parameters<typeof t>[0])}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Sub-services */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">Prestations incluses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.subServices.map((sub) => (
                    <div
                      key={sub}
                      className="flex items-center gap-3 p-4 rounded-xl bg-navy-50/50 border border-navy-50"
                    >
                      <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                      <span className="text-sm font-medium text-navy">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">Nos atouts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {detail.features.map((feat) => (
                    <div key={feat.title} className="p-6 rounded-2xl border border-navy-50 bg-white">
                      <h3 className="font-bold text-navy mb-2">{feat.title}</h3>
                      <p className="text-sm text-navy-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick info */}
              <div className="p-6 rounded-2xl bg-navy text-white">
                <h3 className="font-bold text-lg mb-4 text-brand">Points clés</h3>
                <ul className="space-y-3">
                  {Array.isArray(features) && features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA card */}
              <div className="p-6 rounded-2xl bg-brand/10 border border-brand/20">
                <h3 className="font-bold text-navy mb-3">Demander un devis</h3>
                <p className="text-sm text-navy-400 mb-4">Obtenez votre offre personnalisée sous 24h</p>
                <Link
                  href={`${base}/devis`}
                  className="block w-full text-center py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors"
                >
                  {t('services.discover')} →
                </Link>
              </div>

              {/* Other services */}
              <div className="p-6 rounded-2xl border border-navy-50">
                <h3 className="font-bold text-navy mb-4">Autres services</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.id !== service)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`${base}${s.href}`}
                          className="text-sm text-navy-400 hover:text-brand transition-colors"
                        >
                          → {t(s.titleKey as Parameters<typeof t>[0])}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
