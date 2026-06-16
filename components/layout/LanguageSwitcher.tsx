'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const langs = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
]

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()

  const getHref = (targetLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1 border border-navy-100 rounded-full px-2 py-1">
      {langs.map((lang, i) => (
        <span key={lang.code} className="flex items-center">
          <Link
            href={getHref(lang.code)}
            className={cn(
              'text-xs font-semibold px-1.5 py-0.5 rounded-full transition-colors',
              locale === lang.code
                ? 'bg-navy text-white'
                : 'text-navy hover:text-brand'
            )}
            aria-label={`Changer la langue en ${lang.label}`}
            aria-current={locale === lang.code ? 'true' : undefined}
          >
            {lang.label}
          </Link>
          {i < langs.length - 1 && (
            <span className="text-navy-100 text-xs ml-1">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
