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
      {/* Accent pill */}
      <div className={cn('flex items-center gap-3 mb-4', center && 'justify-center')}>
        <div className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #00bcd4)' }} />
        <div className="w-2 h-2 rounded-full bg-brand" />
        <div className="h-px w-8 rounded-full" style={{ background: 'linear-gradient(90deg, #00bcd4, transparent)' }} />
      </div>

      <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight', light ? 'text-white' : 'text-navy')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-base md:text-lg max-w-2xl leading-relaxed', center && 'mx-auto', light ? 'text-white/70' : 'text-gray-500')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
