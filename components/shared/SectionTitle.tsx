'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
  className?: string
}

export default function SectionTitle({ title, subtitle, light, center = true, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('mb-14', center && 'text-center', className)}
    >
      {/* Accent line */}
      <div className={cn('section-accent', !center && 'mx-0')} />

      <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight', light ? 'text-white' : 'text-navy')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-lg max-w-2xl leading-relaxed', center && 'mx-auto', light ? 'text-white/70' : 'text-navy-400')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
