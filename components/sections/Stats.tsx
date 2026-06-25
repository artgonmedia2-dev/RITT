'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Calendar, Globe, Package, CheckCircle } from 'lucide-react'
import { stats } from '@/lib/data'

const statIcons = [Calendar, Globe, Package, CheckCircle]

function AnimatedCounter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    let frame = 0
    const timer = setInterval(() => {
      frame++
      current = increment * frame
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(parseFloat(current.toFixed(decimal ? 1 : 0)))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target, decimal])

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const t = useTranslations()

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}>
      {/* Decorative background circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="container-ritt relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-14 tracking-tight"
        >
          {t('stats.title')}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = statIcons[i]
            const isLast = i === stats.length - 1
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`group flex flex-col items-center text-center px-6 py-8 ${
                  !isLast ? 'lg:border-r border-white/10' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl glass-card-dark flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <Icon className="w-7 h-7 text-brand group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Number */}
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient mb-2 tabular-nums">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimal={stat.decimal}
                  />
                </div>
                {/* Label */}
                <p className="text-white/70 text-sm md:text-base font-medium leading-snug max-w-[140px]">
                  {t(stat.labelKey as Parameters<typeof t>[0])}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
