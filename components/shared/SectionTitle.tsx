import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
  className?: string
}

export default function SectionTitle({ title, subtitle, light, center = true, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', light ? 'text-white' : 'text-navy')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-lg max-w-2xl', center && 'mx-auto', light ? 'text-white/70' : 'text-navy-400')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
