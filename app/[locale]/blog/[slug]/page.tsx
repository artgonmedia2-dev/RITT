import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import CTABanner from '@/components/sections/CTABanner'

export async function generateStaticParams() {
  return Object.keys(blogPosts).flatMap((slug) =>
    ['fr', 'en', 'ar'].map((locale) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return {}
  return {
    title: `${post.title} — RITT`,
    description: post.excerpt,
  }
}

function renderContent(content: string) {
  const lines = content.split('\n\n')
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={i} className="text-xl font-bold text-navy mt-8 mb-3">{line.replace(/\*\*/g, '')}</h3>
    }
    if (line.includes('**')) {
      const parts = line.split(/\*\*([^*]+)\*\*/)
      return (
        <p key={i} className="text-navy-400 leading-relaxed mb-4">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-navy font-semibold">{part}</strong> : part
          )}
        </p>
      )
    }
    if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.')) {
      const items = line.split('\n').filter(Boolean)
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 mb-4 text-navy-400">
          {items.map((item, j) => (
            <li key={j}>{item.replace(/^\d+\.\s/, '')}</li>
          ))}
        </ol>
      )
    }
    return line.trim() ? <p key={i} className="text-navy-400 leading-relaxed mb-4">{line}</p> : null
  }).filter(Boolean)
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const post = blogPosts[slug]

  if (!post) notFound()

  const base = `/${locale}`
  const otherPosts = Object.values(blogPosts).filter((p) => p.slug !== slug)

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16"
        style={{ background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 100%)' }}
      >
        <div className="container-ritt">
          <Link
            href={`${base}/blog`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand/20 text-brand text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min de lecture
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 bg-white">
        <div className="container-ritt">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <article className="lg:col-span-2">
              <p className="text-lg text-navy-400 leading-relaxed mb-8 font-medium border-l-4 border-brand pl-5">
                {post.excerpt}
              </p>
              <div className="prose-ritt">
                {renderContent(post.content)}
              </div>

              {/* Author */}
              <div className="mt-12 pt-6 border-t border-navy-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-brand font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-navy">{post.author}</p>
                  <p className="text-sm text-navy-400">Experts en logistique internationale</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              {/* CTA */}
              <div className="p-6 rounded-2xl bg-navy text-white mb-6">
                <h3 className="font-bold text-lg mb-3">Besoin d&apos;un devis ?</h3>
                <p className="text-white/60 text-sm mb-4">Notre équipe répond sous 24h</p>
                <Link
                  href={`${base}/devis`}
                  className="block text-center py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors"
                >
                  Demander un devis →
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="font-bold text-navy mb-4">Articles récents</h3>
                <div className="flex flex-col gap-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`${base}/blog/${p.slug}`}
                      className="group"
                    >
                      <p className="text-sm font-medium text-navy group-hover:text-brand transition-colors leading-snug mb-1">
                        {p.title}
                      </p>
                      <p className="text-xs text-navy-300">{p.readTime} min · {p.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
