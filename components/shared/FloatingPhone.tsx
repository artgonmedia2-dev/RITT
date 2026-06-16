'use client'

import { Phone } from 'lucide-react'
import { PHONE } from '@/lib/constants'

export default function FloatingPhone() {
  return (
    <a
      href={`tel:${PHONE.replace(/\s/g, '')}`}
      className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center justify-center w-14 h-14 bg-brand text-white rounded-full shadow-lg hover:bg-brand-dark transition-all hover:scale-110 active:scale-95"
      aria-label={`Appeler RITT au ${PHONE}`}
    >
      <Phone className="w-6 h-6" />
    </a>
  )
}
