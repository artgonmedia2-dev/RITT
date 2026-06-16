'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Search, Package, MapPin, CheckCircle, Clock, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackingDatabase, TrackingData, TrackingEvent } from '@/lib/data'
import { PHONE } from '@/lib/constants'

function TimelineStep({ event, isLast }: { event: TrackingEvent; isLast: boolean }) {
  const statusConfig = {
    completed: { color: 'text-success', bg: 'bg-success', icon: CheckCircle, line: 'bg-success' },
    current: { color: 'text-brand', bg: 'bg-brand', icon: Clock, line: 'bg-brand' },
    pending: { color: 'text-gray-400', bg: 'bg-gray-200', icon: Clock, line: 'bg-gray-200' },
  }
  const config = statusConfig[event.status]
  const Icon = config.icon

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 ${event.status === 'current' ? 'pulse-current' : ''}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 min-h-[2rem] ${config.line} opacity-40`} aria-hidden="true" />
        )}
      </div>
      <div className="pb-6 flex-1">
        <p className={`font-semibold text-sm ${config.color}`}>{event.label}</p>
        <p className="text-white/50 text-xs mt-0.5">{event.location}</p>
        <p className="text-white/40 text-xs">{event.date}</p>
      </div>
    </div>
  )
}

export default function TrackingWidget() {
  const t = useTranslations()
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<TrackingData | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleTrack = () => {
    const data = trackingDatabase[query.trim().toUpperCase()]
    if (data) {
      setResult(data)
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  const statusLabel = result
    ? result.status === 'in-transit'
      ? t('tracking.statusInTransit')
      : result.status === 'delivered'
      ? t('tracking.statusDelivered')
      : t('tracking.statusPending')
    : ''

  const statusColor = result
    ? result.status === 'in-transit' ? 'bg-brand/20 text-brand'
    : result.status === 'delivered' ? 'bg-success/20 text-success'
    : 'bg-warning/20 text-warning'
    : ''

  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      id="tracking"
    >
      <div className="container-ritt">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/20 text-brand text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            Shipment Tracking
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('tracking.title')}
          </h2>
          <p className="text-white/60">{t('tracking.subtitle')}</p>
        </div>

        {/* Search box */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder={t('tracking.placeholder')}
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand focus:bg-white/15 transition-colors text-sm"
              aria-label={t('tracking.subtitle')}
            />
            <button
              onClick={handleTrack}
              className="px-6 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors flex items-center gap-2 flex-shrink-0"
              aria-label={t('tracking.btn')}
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">{t('tracking.btn')}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/40">
            <span>{t('tracking.example')} <button onClick={() => setQuery('RITT-2026-001234')} className="text-brand hover:underline">RITT-2026-001234</button></span>
            <span>{t('tracking.support')} <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-brand hover:underline">{PHONE}</a></span>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <p className="text-white font-bold text-xl mb-1">{result.id}</p>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4 text-brand" />
                    {result.origin} → {result.destination}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${statusColor}`}>
                    {statusLabel}
                  </span>
                  <p className="text-white/50 text-xs">{t('tracking.estimated')}: {result.estimatedDelivery}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                {result.timeline.map((event, i) => (
                  <TimelineStep
                    key={i}
                    event={event}
                    isLast={i === result.timeline.length - 1}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                <a
                  href={`mailto:contact@ritt.ma?subject=Suivi ${result.id}`}
                  className="px-4 py-2 text-sm bg-brand/20 text-brand border border-brand/30 rounded-lg hover:bg-brand/30 transition-colors"
                >
                  {t('tracking.receiveUpdates')}
                </a>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="px-4 py-2 text-sm bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                >
                  {t('tracking.contactSupport')}
                </a>
              </div>
            </motion.div>
          )}

          {notFound && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-white/10 border border-white/20 rounded-2xl p-6 text-center text-white/60"
            >
              <Package className="w-12 h-12 mx-auto mb-3 text-white/30" />
              <p>{t('tracking.notFound')}</p>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="mt-3 inline-block text-brand hover:underline text-sm">
                {t('tracking.contactSupport')} — {PHONE}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
