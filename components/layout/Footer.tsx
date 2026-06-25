import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { PHONE, EMAIL, ADDRESS } from '@/lib/constants'

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations()
  const base = `/${locale}`
  const year = new Date().getFullYear()

  const services = [
    { slug: 'sea-freight', key: 'nav.seaFreight' },
    { slug: 'air-freight', key: 'nav.airFreight' },
    { slug: 'road-freight', key: 'nav.roadFreight' },
    { slug: 'transit-customs', key: 'nav.transitCustoms' },
    { slug: 'supply-chain', key: 'nav.supplyChain' },
    { slug: 'import-export', key: 'nav.importExport' },
  ]

  const networkLinks = [
    { label: t('network.northAfrica') },
    { label: t('network.europe') },
    { label: t('network.asia') },
    { label: t('network.westAfrica') },
    { label: t('network.centralAfrica') },
    { label: t('network.americas') },
  ]

  return (
    <footer className="gradient-dark text-white relative overflow-hidden" role="contentinfo">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-brand/3 blur-3xl" />
      </div>

      <div className="container-ritt py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={base} className="inline-block mb-4 group">
              <div className="bg-white rounded-xl px-4 py-2 inline-block group-hover:shadow-lg group-hover:shadow-brand/10 transition-all duration-300">
                <Image
                  src="/images/logo.jpg"
                  alt="RITT — Régie Internationale de Transport et Transit"
                  width={160}
                  height={64}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="group flex items-center gap-2 text-white/70 hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4 text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-2 text-white/70 hover:text-brand transition-colors"
              >
                <Mail className="w-4 h-4 text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
                {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-brand flex-shrink-0" />
                {t('footer.hours')}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.services')}
            </h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${base}/services/${s.slug}`}
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors"
                  >
                    {t(s.key as Parameters<typeof t>[0])}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.network')}
            </h3>
            <ul className="flex flex-col gap-2">
              {networkLinks.map((n) => (
                <li key={n.label}>
                  <Link
                    href={`${base}/reseau`}
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors"
                  >
                    {n.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.legal')}
            </h3>
            <ul className="flex flex-col gap-2 mb-6">
              <li>
                <Link href={`${base}/mentions-legales`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('footer.mentions')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={`${base}/mentions-legales`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('footer.privacy')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={`${base}/contact`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('nav.contact')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={`${base}/blog`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('nav.blog')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={`${base}/tracking`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('nav.tracking')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={`${base}/devis`} className="group flex items-center gap-1 text-sm text-white/60 hover:text-brand transition-colors">
                  {t('nav.quote')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>

            {/* Certifications badges */}
            <div className="flex gap-2 flex-wrap">
              {['FIATA', 'IATA', 'ISO'].map((cert) => (
                <span
                  key={cert}
                  className="text-xs border border-white/20 text-white/50 px-3 py-1.5 rounded-lg hover:border-brand/40 hover:text-brand/70 transition-colors cursor-default"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {year} RITT — {t('footer.rights')}</p>
          <p>Régie Internationale de Transport et Transit — Casablanca, Maroc</p>
        </div>
      </div>
    </footer>
  )
}
