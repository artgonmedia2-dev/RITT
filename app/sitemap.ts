import { MetadataRoute } from 'next'
import { LOCALES, SERVICE_SLUGS, SITE_URL } from '@/lib/constants'
import { blogPosts } from '@/lib/data'

const BASE = SITE_URL
const NOW = new Date()
export const dynamic = 'force-static'

// Build hreflang alternates for a given path
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE}/${l}${path}`])
    ) as Record<string, string>,
  }
}

// Service slug → SEO priority weight (higher = more important keyword traffic)
const SERVICE_PRIORITY: Record<string, number> = {
  'sea-freight': 0.85,
  'road-freight': 0.85,
  'transit-customs': 0.82,
  'air-freight': 0.80,
  'supply-chain': 0.78,
  'import-export': 0.78,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  LOCALES.forEach((locale) => {
    const localePriority = locale === 'fr' ? 1 : locale === 'en' ? 0.85 : 0.7

    // Home — highest priority
    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: localePriority,
      alternates: alternates(''),
    })

    // Services index
    entries.push({
      url: `${BASE}/${locale}/services`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.9 * localePriority,
      alternates: alternates('/services'),
    })

    // Individual service pages — prioritized by keyword volume
    SERVICE_SLUGS.forEach((slug) => {
      entries.push({
        url: `${BASE}/${locale}/services/${slug}`,
        lastModified: NOW,
        changeFrequency: 'monthly',
        priority: (SERVICE_PRIORITY[slug] ?? 0.78) * localePriority,
        alternates: alternates(`/services/${slug}`),
      })
    })

    // High-value pages
    entries.push({
      url: `${BASE}/${locale}/devis`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.82 * localePriority,
      alternates: alternates('/devis'),
    })

    entries.push({
      url: `${BASE}/${locale}/reseau`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.75 * localePriority,
      alternates: alternates('/reseau'),
    })

    entries.push({
      url: `${BASE}/${locale}/tracking`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.72 * localePriority,
      alternates: alternates('/tracking'),
    })

    entries.push({
      url: `${BASE}/${locale}/blog`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.70 * localePriority,
      alternates: alternates('/blog'),
    })

    entries.push({
      url: `${BASE}/${locale}/contact`,
      lastModified: NOW,
      changeFrequency: 'yearly',
      priority: 0.65 * localePriority,
      alternates: alternates('/contact'),
    })

    entries.push({
      url: `${BASE}/${locale}/mentions-legales`,
      lastModified: NOW,
      changeFrequency: 'yearly',
      priority: 0.2,
    })

    // Blog posts
    Object.keys(blogPosts).forEach((slug) => {
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}`,
        lastModified: NOW,
        changeFrequency: 'yearly',
        priority: 0.60 * localePriority,
        alternates: alternates(`/blog/${slug}`),
      })
    })
  })

  return entries
}
