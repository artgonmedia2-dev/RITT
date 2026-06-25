'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import SectionTitle from '@/components/shared/SectionTitle'

export default function Testimonials() {
  const t = useTranslations()
  const [current, setCurrent] = useState(0)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const visible = [
    testimonials[(current - 1 + testimonials.length) % testimonials.length],
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container-ritt relative">
        <SectionTitle
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        {/* Desktop: 3 visible */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8 py-4">
          {visible.map((t_item, i) => (
            <motion.div
              key={`${t_item.id}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                i === 1
                  ? 'border-brand bg-navy text-white scale-105 shadow-2xl shadow-navy/25 z-10'
                  : 'border-navy-50 bg-white text-navy opacity-75 hover:opacity-100 hover:shadow-lg hover:border-navy-100 hover:-translate-y-1'
              }`}
            >
              {/* Glow effect on center card */}
              {i === 1 && (
                <div className="absolute -inset-[1px] bg-gradient-to-br from-brand/20 to-navy rounded-2xl -z-10 blur-sm" />
              )}

              <Quote className={`w-8 h-8 mb-4 ${i === 1 ? 'text-brand' : 'text-navy-200 group-hover:text-brand/50 transition-colors'}`} />
              <p className={`text-sm leading-relaxed mb-6 ${i === 1 ? 'text-white/80' : 'text-navy-400'}`}>
                &ldquo;{t_item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  i === 1 ? 'bg-brand text-white' : 'bg-navy-50 text-navy'
                }`}>
                  {t_item.name.charAt(0)}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${i === 1 ? 'text-white' : 'text-navy'}`}>
                    {t_item.name}
                  </p>
                  <p className={`text-xs ${i === 1 ? 'text-white/60' : 'text-navy-400'}`}>
                    {t_item.role}, {t_item.company}
                  </p>
                </div>
              </div>
              {i === 1 && (
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t_item.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: single */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border-2 border-brand bg-navy text-white shadow-xl shadow-navy/20"
            >
              <Quote className="w-8 h-8 text-brand mb-4" />
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-bold text-sm text-white">
                  {testimonials[current].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{testimonials[current].name}</p>
                  <p className="text-xs text-white/60">{testimonials[current].role}, {testimonials[current].company}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mt-4">
                {Array.from({ length: testimonials[current].rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-brand text-brand" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-navy-100 flex items-center justify-center text-navy hover:border-brand hover:text-brand hover:scale-110 hover:shadow-md transition-all duration-300"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 h-3 bg-brand shadow-sm shadow-brand/30' : 'w-3 h-3 bg-navy-100 hover:bg-navy-200 hover:scale-125'
                }`}
                aria-label={`Aller au témoignage ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-navy-100 flex items-center justify-center text-navy hover:border-brand hover:text-brand hover:scale-110 hover:shadow-md transition-all duration-300"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
