import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import CTABanner from '@/components/sections/CTABanner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.blog' })
  return { title: t('title'), description: t('description') }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const base = `/${locale}`
  const posts = Object.values(blogPosts)

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`${base}/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-navy-50 overflow-hidden card-hover bg-white"
              >
                {/* Placeholder image */}
                <div
                  className="h-48 flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)' }}
                  aria-hidden="true"
                >
                  {post.category === 'Guide' ? '📚' : post.category === 'Tendances' ? '📊' : '💡'}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-navy-300">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>

                  <h2 className="font-bold text-navy text-lg leading-snug mb-3 group-hover:text-brand transition-colors flex-1">
                    {post.title}
                  </h2>

                  <p className="text-sm text-navy-400 leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-navy-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
