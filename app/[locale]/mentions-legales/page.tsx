import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { COMPANY_FULL, PHONE, EMAIL, ADDRESS } from '@/lib/constants'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: `${t('legal.title')} — RITT`,
    description: 'Mentions légales et politique de confidentialité de RITT.',
  }
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const sections = [
    {
      title: t('legal.company'),
      content: [
        { label: t('legal.companyName'), value: COMPANY_FULL },
        { label: 'Forme juridique', value: 'SARL' },
        { label: t('legal.companyAddress'), value: ADDRESS },
        { label: t('contact.phoneLabel'), value: PHONE },
        { label: t('contact.emailLabel'), value: EMAIL },
      ],
    },
    {
      title: t('legal.editor'),
      content: [
        { label: 'Directeur de la publication', value: 'Direction RITT' },
        { label: 'Site web', value: 'https://ritt.ma' },
        { label: t('contact.emailLabel'), value: EMAIL },
      ],
    },
    {
      title: t('legal.host'),
      content: [
        { label: 'Hébergeur', value: 'Vercel Inc.' },
        { label: 'Adresse', value: '340 Pine Street, Suite 600, San Francisco, CA 94104, USA' },
        { label: 'Site', value: 'https://vercel.com' },
      ],
    },
    {
      title: t('legal.ip'),
      text: `Le site ritt.ma et l'ensemble de son contenu (textes, images, logos, graphiques) sont la propriété exclusive de RITT — ${COMPANY_FULL}. Toute reproduction, même partielle, est interdite sans l'accord préalable et écrit de RITT.`,
    },
    {
      title: t('legal.data'),
      text: `Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : ${EMAIL}`,
    },
    {
      title: t('legal.cookies'),
      text: `Le site ritt.ma utilise des cookies techniques nécessaires au bon fonctionnement du site. Ces cookies ne collectent pas de données personnelles et ne sont pas utilisés à des fins publicitaires. Vous pouvez configurer votre navigateur pour refuser les cookies.`,
    },
    {
      title: t('legal.law'),
      text: `Le présent site et ses mentions légales sont soumis au droit marocain. En cas de litige, les tribunaux de Casablanca seront seuls compétents.`,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('legal.title')}
          </h1>
          <p className="text-white/60 text-sm">Dernière mise à jour : Juin 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-ritt max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-navy-50 pb-8 last:border-0">
                <h2 className="text-xl font-bold text-navy mb-4">{section.title}</h2>
                {section.content ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.content.map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold text-navy-300 uppercase tracking-wider mb-0.5">{label}</dt>
                        <dd className="text-sm text-navy-400">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-navy-400 leading-relaxed">{section.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
