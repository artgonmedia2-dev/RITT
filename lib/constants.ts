export const PHONE = '+212 661 71 84 18'
export const EMAIL = 'elbijri.othmane@gmail.com'
export const ADDRESS = '84 Bd Bahmad, Rce Salam, 3ème étage, appt 6, Casablanca 20000 MA'
export const SITE_URL = 'https://ritt.ma'
export const COMPANY_NAME = 'RITT'
export const COMPANY_FULL = 'Régie Internationale de Transport et Transit'

export const LOCALES = ['fr', 'en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

export const SERVICE_SLUGS = [
  'sea-freight',
  'air-freight',
  'road-freight',
  'transit-customs',
  'supply-chain',
  'import-export',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const INCOTERMS = ['FOB', 'CIF', 'DDP', 'EXW', 'DAP', 'CFR'] as const
