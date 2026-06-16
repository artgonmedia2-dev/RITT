import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TrackingWidget from '@/components/sections/TrackingWidget'
import CTABanner from '@/components/sections/CTABanner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.tracking' })
  return { title: t('title'), description: t('description') }
}

export default async function TrackingPage({
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
        className="pt-32 pb-10"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('tracking.title')}
          </h1>
          <p className="text-white/70 text-lg">{t('tracking.subtitle')}</p>
        </div>
      </section>

      <TrackingWidget />

      {/* Info section */}
      <section className="py-16 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Numéro RITT', desc: 'Votre référence commence par RITT-YYYY-XXXXXX', example: 'RITT-2026-001234' },
              { title: 'Numéro BL', desc: 'Bill of Lading pour vos shipments maritimes', example: 'BL123456789' },
              { title: 'Numéro AWB', desc: 'Air Waybill pour vos expéditions aériennes', example: 'AWB 000-12345678' },
            ].map((info) => (
              <div key={info.title} className="p-6 rounded-2xl bg-navy-50/50 border border-navy-50">
                <h3 className="font-bold text-navy text-lg mb-2">{info.title}</h3>
                <p className="text-sm text-navy-400 mb-3">{info.desc}</p>
                <code className="text-xs bg-white text-brand px-3 py-1 rounded-lg font-mono border border-brand/20">
                  {info.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
