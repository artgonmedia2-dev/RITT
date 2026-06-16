import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import NetworkMap from '@/components/sections/NetworkMap'
import { networkRegions } from '@/lib/data'
import CTABanner from '@/components/sections/CTABanner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: `${t('nav.network')} — RITT`,
    description: t('network.subtitle'),
  }
}

export default async function ReseauPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('network.title')}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('network.subtitle')}
          </p>
        </div>
      </section>

      {/* Map section */}
      <NetworkMap />

      {/* Regions detail */}
      <section className="py-20 bg-navy-50/30">
        <div className="container-ritt">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Nos Régions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkRegions.map((region) => (
              <div
                key={region.id}
                className="p-6 rounded-2xl bg-white border border-navy-50 card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-lg">
                    {t(region.nameKey as Parameters<typeof t>[0])}
                  </h3>
                  <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-semibold">
                    {region.agents} {t('network.agents')}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {region.cities.map((city) => (
                    <div key={city} className="flex items-center gap-2 text-sm text-navy-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '6', label: 'Régions couvertes' },
              { value: '83', label: 'Agents affiliés' },
              { value: '50+', label: 'Pays desservis' },
              { value: '24/7', label: 'Support disponible' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-brand mb-2">{stat.value}</p>
                <p className="text-sm text-navy-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
