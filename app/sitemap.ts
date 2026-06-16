import { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/constants'
import { SERVICE_SLUGS } from '@/lib/constants'
import { blogPosts } from '@/lib/data'

const BASE_URL = 'https://ritt.ma'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  LOCALES.forEach((locale) => {
    // Home
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })

    // Services index
    entries.push({
      url: `${BASE_URL}/${locale}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })

    // Service pages
    SERVICE_SLUGS.forEach((slug) => {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })

    // Other pages
    ;['reseau', 'tracking', 'devis', 'blog', 'contact', 'mentions-legales'].forEach((page) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })

    // Blog posts
    Object.keys(blogPosts).forEach((slug) => {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    })
  })

  return entries
}
