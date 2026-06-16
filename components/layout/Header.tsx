'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PHONE } from '@/lib/constants'
import LanguageSwitcher from './LanguageSwitcher'

const serviceLinks = [
  { slug: 'sea-freight', key: 'nav.seaFreight' },
  { slug: 'air-freight', key: 'nav.airFreight' },
  { slug: 'road-freight', key: 'nav.roadFreight' },
  { slug: 'transit-customs', key: 'nav.transitCustoms' },
  { slug: 'supply-chain', key: 'nav.supplyChain' },
  { slug: 'import-export', key: 'nav.importExport' },
]

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const base = `/${locale}`

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 header-blur shadow-md border-b border-navy-50'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <div className="container-ritt">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={base}
            className="flex-shrink-0"
            aria-label="RITT — Accueil"
          >
            <div
              className={cn(
                'rounded-lg overflow-hidden transition-all duration-300',
                scrolled
                  ? 'bg-transparent p-0'
                  : 'bg-white/95 px-3 py-1 shadow-sm'
              )}
            >
              <Image
                src="/images/logo.jpg"
                alt="RITT — Régie Internationale de Transport et Transit"
                width={140}
                height={56}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            <Link
              href={base}
              className={cn('text-sm font-medium link-underline transition-colors', scrolled ? 'text-navy' : 'text-white')}
            >
              {t('nav.home')}
            </Link>

            {/* Services dropdown */}
            <div className="relative group">
              <button
                className={cn('flex items-center gap-1 text-sm font-medium link-underline transition-colors', scrolled ? 'text-navy' : 'text-white')}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                {t('nav.services')}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-navy-50 p-3 w-56">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.slug}
                      href={`${base}/services/${s.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-navy hover:bg-navy-50 hover:text-brand transition-colors"
                    >
                      {t(s.key as Parameters<typeof t>[0])}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`${base}/reseau`}
              className={cn('text-sm font-medium link-underline transition-colors', scrolled ? 'text-navy' : 'text-white')}
            >
              {t('nav.network')}
            </Link>
            <Link
              href={`${base}/tracking`}
              className={cn('text-sm font-medium link-underline transition-colors', scrolled ? 'text-navy' : 'text-white')}
            >
              {t('nav.tracking')}
            </Link>
            <Link
              href={`${base}/blog`}
              className={cn('text-sm font-medium link-underline transition-colors', scrolled ? 'text-navy' : 'text-white')}
            >
              {t('nav.blog')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className={cn('flex items-center gap-1.5 text-sm font-medium transition-colors', scrolled ? 'text-navy' : 'text-white/90')}
              aria-label={`Appeler RITT au ${PHONE}`}
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <Link
              href={`${base}/devis`}
              className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
            >
              {t('nav.quote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-navy' : 'text-white')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-navy-50 shadow-xl">
          <nav className="container-ritt py-4 flex flex-col gap-1" aria-label="Navigation mobile">
            <Link href={base} className="px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>
              {t('nav.home')}
            </Link>
            <button
              className="flex items-center justify-between px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy-50 w-full"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              {t('nav.services')}
              <ChevronDown className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')} />
            </button>
            {servicesOpen && (
              <div className="pl-4 flex flex-col gap-1">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.slug}
                    href={`${base}/services/${s.slug}`}
                    className="px-4 py-2 text-sm text-navy-light rounded-lg hover:bg-navy-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(s.key as Parameters<typeof t>[0])}
                  </Link>
                ))}
              </div>
            )}
            <Link href={`${base}/reseau`} className="px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>
              {t('nav.network')}
            </Link>
            <Link href={`${base}/tracking`} className="px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>
              {t('nav.tracking')}
            </Link>
            <Link href={`${base}/blog`} className="px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>
              {t('nav.blog')}
            </Link>
            <div className="pt-3 mt-2 border-t border-navy-50 flex flex-col gap-2">
              <LanguageSwitcher locale={locale} />
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-4 py-3 text-navy font-medium"
              >
                <Phone className="w-4 h-4 text-brand" />
                {PHONE}
              </a>
              <Link
                href={`${base}/devis`}
                className="mx-4 py-3 bg-brand text-white text-center font-semibold rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.quote')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
