import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingPhone from '@/components/shared/FloatingPhone'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      template: '%s',
      default: 'RITT — Transport International Maroc | Freight Forwarder Casablanca',
    },
    description: 'RITT, Régie Internationale de Transport et Transit, expert en transport international au Maroc et en Afrique. Fret maritime, fret aérien, transport routier, dédouanement.',
    alternates: {
      canonical: `https://ritt.ma/${locale}`,
      languages: {
        'fr': 'https://ritt.ma/fr',
        'en': 'https://ritt.ma/en',
        'ar': 'https://ritt.ma/ar',
        'x-default': 'https://ritt.ma/fr',
      },
    },
    openGraph: {
      siteName: 'RITT — Transport International Maroc',
      locale: locale === 'fr' ? 'fr_MA' : locale === 'ar' ? 'ar_MA' : 'en_US',
      type: 'website',
      images: [{ url: '/images/logo.jpg', width: 400, height: 160, alt: 'RITT Freight Forwarder Maroc' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RITT_Maroc',
    },
    keywords: 'transport international maroc, freight forwarder casablanca, fret maritime maroc, transport routier maroc france, dédouanement maroc, transports aériens maroc, transitaire casablanca, logistique afrique',
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()
  const isRTL = locale === 'ar'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#fafbfc] text-navy antialiased">
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <FloatingPhone />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
