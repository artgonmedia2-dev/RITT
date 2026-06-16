'use client'

import { useTranslations } from 'next-intl'
import { Globe, Handshake, Zap, Settings, Shield, DollarSign } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { AnimatedList, AnimatedItem } from '@/components/shared/AnimatedSection'

const reasons = [
  { icon: Globe, titleKey: 'why.network.title', descKey: 'why.network.desc' },
  { icon: Handshake, titleKey: 'why.expertise.title', descKey: 'why.expertise.desc' },
  { icon: Zap, titleKey: 'why.reactivity.title', descKey: 'why.reactivity.desc' },
  { icon: Settings, titleKey: 'why.custom.title', descKey: 'why.custom.desc' },
  { icon: Shield, titleKey: 'why.security.title', descKey: 'why.security.desc' },
  { icon: DollarSign, titleKey: 'why.price.title', descKey: 'why.price.desc' },
]

export default function WhyChoose() {
  const t = useTranslations()

  return (
    <section className="py-20 bg-navy-50/40">
      <div className="container-ritt">
        <SectionTitle
          title={t('why.title')}
          subtitle={t('why.subtitle')}
        />

        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, titleKey, descKey }, i) => (
            <AnimatedItem key={titleKey}>
              <div className="flex gap-4 p-6 rounded-2xl bg-white border border-navy-50 card-hover h-full">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-2">
                    {t(titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed">
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}
