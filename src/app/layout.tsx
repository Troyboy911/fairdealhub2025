import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fairdeal Hub - Top Notch Affiliate Marketing',
  description: 'Affiliate marketing site with popular brands, discount codes, and products updated regularly.',
  keywords: 'affiliate marketing, discount codes, popular brands, products, sales funnel, analytics',
  authors: [{ name: 'Fairdeal Hub' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
