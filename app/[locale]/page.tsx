import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import NetworkMap from '@/components/sections/NetworkMap'
import ServicesCards from '@/components/sections/ServicesCards'
import WhyChoose from '@/components/sections/WhyChoose'
import Process from '@/components/sections/Process'
import TrackingWidget from '@/components/sections/TrackingWidget'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import SchemaOrg from '@/components/shared/SchemaOrg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg />
      <Hero />
      <Stats />
      <NetworkMap />
      <ServicesCards />
      <WhyChoose />
      <Process />
      <TrackingWidget />
      <Testimonials />
      <CTABanner />
    </>
  )
}
