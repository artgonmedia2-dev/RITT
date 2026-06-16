import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import WizardDevis from '@/components/wizard/WizardDevis'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.quote' })
  return { title: t('title'), description: t('description') }
}

export default async function DevisPage({
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
        className="pt-32 pb-16"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('wizard.title')}
          </h1>
          <p className="text-white/70 text-lg">
            Réponse personnalisée sous 24h par notre équipe commerciale
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16 bg-white">
        <div className="container-ritt">
          <WizardDevis />
        </div>
      </section>
    </>
  )
}
