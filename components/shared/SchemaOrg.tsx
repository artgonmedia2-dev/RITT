import { PHONE, EMAIL, ADDRESS, SITE_URL, COMPANY_NAME, COMPANY_FULL } from '@/lib/constants'

export default function SchemaOrg() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: [COMPANY_FULL, 'RITT Maroc', 'RITT Casablanca'],
    description: 'Freight forwarder et transitaire au Maroc — Transport international : fret maritime, transports aériens, transport routier Maroc-France, dédouanement et supply chain.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.jpg`,
    },
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '84 Bd Bahmad, Rce Salam, 3ème étage, appt 6',
      addressLocality: 'Casablanca',
      postalCode: '20000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.5731,
      longitude: -7.5898,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    areaServed: ['MA', 'DZ', 'TN', 'SN', 'CI', 'CM', 'FR', 'ES', 'IT', 'CN', 'AE', 'US', 'BR'],
    knowsAbout: [
      'Transport international Maroc',
      'Fret maritime FCL LCL',
      'Transport routier Maroc France',
      'Dédouanement Maroc',
      'Transports aériens',
      'Supply chain logistique',
      'Transit douanier',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Transport & Logistique RITT',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transport Maritime', description: 'Fret maritime FCL, LCL, Breakbulk — transport maritime international depuis Casablanca', url: `${SITE_URL}/fr/services/sea-freight` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transport Aérien', description: 'Transports aériens express, charter, consolidation aérienne depuis Casablanca', url: `${SITE_URL}/fr/services/air-freight` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transport Routier', description: 'Transport routier Maroc-France-Europe, FTL, LTL, groupage international', url: `${SITE_URL}/fr/services/road-freight` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dédouanement & Transit', description: 'Dédouanement Maroc, transit douanier, conseil douanier, régimes suspensifs', url: `${SITE_URL}/fr/services/transit-customs` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Supply Chain', description: 'Warehousing, distribution, gestion des stocks, cross-docking Maroc', url: `${SITE_URL}/fr/services/supply-chain` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Import / Export', description: 'Logistique import-export Maroc, conseil trade international, incoterms', url: `${SITE_URL}/fr/services/import-export` } },
      ],
    },
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment fonctionne le transport international depuis le Maroc ?',
        acceptedAnswer: { '@type': 'Answer', text: 'RITT gère votre transport international de A à Z : collecte de la marchandise, choix du mode de transport (maritime, aérien ou routier), dédouanement et livraison finale. Contactez-nous pour un devis gratuit sous 24h.' },
      },
      {
        '@type': 'Question',
        name: 'Quel est le délai pour un transport maritime Maroc-France ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Un transport maritime entre Casablanca et la France prend généralement 3 à 5 jours en LCL ou FCL via le détroit de Gibraltar. RITT optimise les routes pour réduire les délais.' },
      },
      {
        '@type': 'Question',
        name: 'RITT propose-t-il le dédouanement au Maroc ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, RITT est expert en dédouanement au Maroc. Notre équipe gère toutes les formalités douanières import et export, la documentation, les régimes suspensifs et le conseil douanier.' },
      },
      {
        '@type': 'Question',
        name: 'Comment obtenir un devis de transport international ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Remplissez notre formulaire de devis en ligne ou appelez le 05 22 35 68 35. RITT vous répond sous 24h avec une offre personnalisée pour votre transport maritime, aérien ou routier.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  )
}
