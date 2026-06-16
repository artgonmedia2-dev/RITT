'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MapPin, Users } from 'lucide-react'
import { networkRegions, NetworkRegion } from '@/lib/data'
import SectionTitle from '@/components/shared/SectionTitle'

// Morocco HQ anchor — percentage coordinates within the world map
const MOROCCO = { x: 42, y: 32 }

// Convert % coords to world-map-dots.svg viewBox (0 0 2100 1312.5)
const toSvg = (x: number, y: number) => ({ x: x * 21, y: y * 13.125 })

export default function NetworkMap() {
  const t = useTranslations()
  const [hovered, setHovered] = useState<NetworkRegion | null>(null)

  const ma = toSvg(MOROCCO.x, MOROCCO.y)

  return (
    <section className="py-20 bg-white">
      <div className="container-ritt">
        <SectionTitle
          title={t('network.title')}
          subtitle={t('network.subtitle')}
        />

        {/* Outer wrapper: relative, NOT overflow-hidden — lets tooltips escape the map bounds */}
        <div className="relative">

          {/* Visual clipping layer: clips the dots map to rounded corners */}
          <div
            className="relative rounded-2xl overflow-hidden border border-navy-50 shadow-md"
            style={{ background: 'linear-gradient(145deg, #edf2fb 0%, #f4f6ff 100%)' }}
          >
            {/* World map dots background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/world-map-dots.svg"
              alt="Réseau mondial RITT"
              className="w-full h-auto block select-none"
              style={{ opacity: 0.3, mixBlendMode: 'multiply' }}
              draggable={false}
            />

            {/* Connection lines from Morocco to each region */}
            <svg
              viewBox="0 0 2100 1312.5"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              {networkRegions.map((region, i) => {
                const r = toSvg(region.x, region.y)
                const isActive = hovered?.id === region.id
                return (
                  <motion.line
                    key={region.id}
                    x1={ma.x} y1={ma.y}
                    x2={r.x} y2={r.y}
                    stroke={isActive ? '#00bcd4' : '#1a237e'}
                    strokeWidth={isActive ? 5 : 2.5}
                    strokeDasharray="16 10"
                    opacity={isActive ? 0.8 : 0.3}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isActive ? 0.8 : 0.3,
                      strokeWidth: isActive ? 5 : 2.5,
                    }}
                    transition={{
                      pathLength: { duration: 1.5, delay: i * 0.2, ease: 'easeOut' },
                      opacity: { duration: 0.3 },
                      strokeWidth: { duration: 0.2 },
                    }}
                  />
                )
              })}

              {/* Morocco HQ — pulsing brand dot */}
              <motion.circle
                cx={ma.x} cy={ma.y} r={24}
                fill="#00bcd4"
                animate={{ r: [24, 42, 24], opacity: [0.28, 0, 0.28] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <circle cx={ma.x} cy={ma.y} r={15} fill="#00bcd4" stroke="white" strokeWidth={4} />
              <text
                x={ma.x} y={ma.y - 24}
                textAnchor="middle"
                fontSize={16}
                fontWeight={800}
                fill="#0d1642"
                style={{ letterSpacing: '0.04em' }}
              >
                RITT HQ
              </text>
            </svg>
          </div>

          {/* Interactive hotspot layer — sits above map, tooltips can overflow */}
          <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
            {networkRegions.map((region) => {
              const isActive = hovered?.id === region.id
              const flipY = region.y > 52
              const flipX = region.x > 68

              return (
                <div
                  key={region.id}
                  className="absolute"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'auto',
                    zIndex: isActive ? 20 : 10,
                  }}
                >
                  {/* Hotspot button */}
                  <button
                    className="relative flex items-center justify-center w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full"
                    onMouseEnter={() => setHovered(region)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(region)}
                    onBlur={() => setHovered(null)}
                    aria-label={t(region.nameKey as Parameters<typeof t>[0])}
                    aria-expanded={isActive}
                  >
                    {/* Glow ring */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-200 ${
                        isActive ? 'bg-brand/25 scale-150' : 'bg-navy/10 scale-100'
                      }`}
                    />
                    {/* Dot */}
                    <span
                      className={`relative z-10 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold transition-all duration-150 ${
                        isActive ? 'bg-brand scale-125' : 'bg-navy'
                      }`}
                      style={{ fontSize: 8 }}
                    >
                      {region.agents}
                    </span>
                  </button>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: flipY ? 6 : -6, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: flipY ? 6 : -6, scale: 0.93 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 bg-navy text-white rounded-xl shadow-2xl p-3 w-52"
                        style={{
                          ...(flipY ? { bottom: '120%' } : { top: '120%' }),
                          ...(flipX
                            ? { right: 0 }
                            : { left: '50%', transform: 'translateX(-50%)' }),
                        }}
                      >
                        <p className="font-bold text-sm mb-1.5">
                          {t(region.nameKey as Parameters<typeof t>[0])}
                        </p>
                        <div className="flex items-center gap-1.5 text-brand text-xs mb-2.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{region.agents} {t('network.agents')}</span>
                        </div>
                        <div className="space-y-1">
                          {region.cities.slice(0, 3).map((city) => (
                            <div key={city} className="flex items-center gap-1.5 text-white/70 text-xs">
                              <MapPin className="w-3 h-3 text-brand flex-shrink-0" />
                              {city}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Region legend — also triggers map hover */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {networkRegions.map((region) => {
            const isActive = hovered?.id === region.id
            return (
              <button
                key={region.id}
                onMouseEnter={() => setHovered(region)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(region)}
                onBlur={() => setHovered(null)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'border-brand bg-brand/10 shadow-sm'
                    : 'border-navy-50 bg-white hover:border-brand/40 hover:bg-navy-50/30'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'bg-brand' : 'bg-navy/60'
                  }`}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-navy text-xs truncate leading-tight">
                    {t(region.nameKey as Parameters<typeof t>[0])}
                  </p>
                  <p className={`text-xs font-bold transition-colors duration-200 ${isActive ? 'text-brand' : 'text-navy-light'}`}>
                    {region.agents} agents
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
