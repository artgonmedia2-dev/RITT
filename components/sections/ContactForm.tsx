'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Send, CheckCircle } from 'lucide-react'
import { contactSchema, ContactData } from '@/lib/schema'

export default function ContactForm() {
  const t = useTranslations()
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (values: ContactData) => {
    console.log('Contact form:', values)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    reset()
  }

  const fieldClass = 'w-full px-4 py-3 rounded-xl border border-navy-100 bg-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors'
  const labelClass = 'block text-sm font-medium text-navy mb-1.5'
  const errorClass = 'text-error text-xs mt-1'

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <p className="text-xl font-bold text-navy mb-2">{t('contact.successMsg')}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-brand hover:underline text-sm"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>{t('contact.name')} *</label>
        <input id="name" type="text" {...register('name')} className={fieldClass} placeholder="Votre nom complet" />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>{t('contact.email')} *</label>
          <input id="email" type="email" {...register('email')} className={fieldClass} placeholder="email@societe.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{t('contact.phone')}</label>
          <input id="phone" type="tel" {...register('phone')} className={fieldClass} placeholder="+212 6XX XX XX XX" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>{t('contact.subject')} *</label>
        <input id="subject" type="text" {...register('subject')} className={fieldClass} placeholder="Objet de votre message" />
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>{t('contact.message')} *</label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={fieldClass}
          placeholder="Décrivez votre besoin..."
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="animate-spin w-5 h-5 border-2 border-white/40 border-t-white rounded-full" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isSubmitting ? 'Envoi...' : t('contact.send')}
      </button>
    </form>
  )
}
