import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PHONE, EMAIL, ADDRESS } from '@/lib/constants'
import ContactForm from '@/components/sections/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.contact' })
  return { title: t('title'), description: t('description') }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const contactInfo = [
    { icon: Phone, label: t('contact.phoneLabel'), value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
    { icon: Mail, label: t('contact.emailLabel'), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue'), href: undefined },
    { icon: Clock, label: t('contact.hoursLabel'), value: t('contact.hoursValue'), href: undefined },
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
            {t('contact.title')}
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-8">Nos coordonnées</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="p-5 rounded-2xl bg-navy-50/40 border border-navy-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-brand" />
                      <span className="text-xs font-semibold text-navy-300 uppercase tracking-wider">{label}</span>
                    </div>
                    {href ? (
                      <a href={href} className="text-navy font-medium hover:text-brand transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-navy font-medium">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden h-64 flex items-center justify-center text-white/50"
                style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}
                aria-label="Localisation RITT — Casablanca, Maroc"
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-brand mx-auto mb-2" />
                  <p className="font-medium text-white">Casablanca, Maroc</p>
                  <p className="text-sm text-white/50 mt-1">Zone portuaire, Casablanca</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-8">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
