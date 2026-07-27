import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ritt.ma'),
  title: 'RITT — Transport International Maroc | Freight Forwarder Casablanca',
  description: 'RITT, Régie Internationale de Transport et Transit, expert en transport international au Maroc et en Afrique.',
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
