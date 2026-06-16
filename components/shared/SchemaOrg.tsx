import { PHONE, EMAIL, ADDRESS, SITE_URL, COMPANY_NAME, COMPANY_FULL } from '@/lib/constants'

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    alternateName: COMPANY_FULL,
    description: 'Freight forwarder Morocco — Sea, Air, Road freight, Transit, Customs, Supply Chain',
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    areaServed: ['MA', 'Africa', 'EU', 'Worldwide'],
    sameAs: [
      'https://linkedin.com/company/ritt',
      'https://facebook.com/ritt.ma',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services RITT',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight', description: 'FCL, LCL, Breakbulk maritime freight' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Freight', description: 'Express, Charter, Air consolidation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Freight', description: 'National and international road transport' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transit & Customs', description: 'Customs clearance and transit advisory' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Supply Chain', description: 'Warehousing, distribution, inventory management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Import/Export', description: 'Import and export logistics and trade consulting' } },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
